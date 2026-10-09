"use client";
import React, { useState, useEffect, useRef } from 'react';
import { CONTAINER_FILL_VIDEOS } from 'lib/cart/videoManifest';

export default function VideoSequencePlayer({ fillPercent }) {
    const [visualStep, setVisualStep] = useState(0);
    const [playbackQueue, setPlaybackQueue] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
    const videoRef = useRef(null);

    // Calculate the target step based on fill percent (0 to 20)
    // 1-5% = step 1, 6-10% = step 2, etc.
    const targetStep = fillPercent > 0 ? Math.min(Math.ceil(fillPercent / 5), 20) : 0;

    // Load initial state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('containerVisualState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed && typeof parsed.visualStep === 'number') {
                    setVisualStep(parsed.visualStep);
                }
            } catch (e) {}
        } else {
            setVisualStep(targetStep); // If no saved state, just snap to target
        }
    }, []);

    // Save state to localStorage whenever visualStep changes
    useEffect(() => {
        localStorage.setItem('containerVisualState', JSON.stringify({ visualStep }));
    }, [visualStep]);

    // Handle cart changes (targetStep changes)
    useEffect(() => {
        if (targetStep > visualStep) {
            // Forward progression: queue up missing steps
            const newQueue = [];
            for (let s = visualStep + 1; s <= targetStep; s++) {
                newQueue.push(s);
            }
            // Append to existing queue
            setPlaybackQueue(prev => {
                // Filter out duplicates just in case
                const combined = [...prev, ...newQueue];
                return [...new Set(combined)].sort((a,b)=>a-b);
            });
        } else if (targetStep < visualStep) {
            // Removal: instantly snap back, clear queue
            setPlaybackQueue([]);
            setIsPlaying(false);
            setVisualStep(targetStep);
            setCurrentVideoUrl(targetStep > 0 ? CONTAINER_FILL_VIDEOS[targetStep].file : null);
        }
    }, [targetStep]);

    // Process the queue
    useEffect(() => {
        if (!isPlaying && playbackQueue.length > 0) {
            const nextStep = playbackQueue[0];
            const videoData = CONTAINER_FILL_VIDEOS[nextStep];
            
            if (videoData) {
                setIsPlaying(true);
                setCurrentVideoUrl(videoData.file);
                setVisualStep(nextStep); // optimistically set visual step
            } else {
                // Invalid step, remove it
                setPlaybackQueue(prev => prev.slice(1));
            }
        }
    }, [playbackQueue, isPlaying]);

    // Ensure video plays when URL is set for a queued item
    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.currentTime = 0;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log("Playback failed", e);
                    handleVideoEnd(); // Skip if fails
                });
            }
        }
    }, [currentVideoUrl, isPlaying]);

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setPlaybackQueue(prev => prev.slice(1)); // Remove the finished step
    };

    const handleLoadedMetadata = () => {
        if (!isPlaying && videoRef.current) {
            // If we are not playing (i.e. static state), jump to end of video to use as a "poster frame"
            videoRef.current.currentTime = videoRef.current.duration > 0 ? videoRef.current.duration - 0.1 : 0;
        }
    };

    // If step is 0, show empty state
    if (visualStep === 0 && !isPlaying && playbackQueue.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a]">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <span className="text-white/20 text-2xl font-black">0%</span>
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Container Empty</p>
            </div>
        );
    }

    // Determine what URL to show when static (fallback to the current visual step)
    const staticUrl = visualStep > 0 ? CONTAINER_FILL_VIDEOS[visualStep]?.file : null;
    const displayUrl = isPlaying ? currentVideoUrl : staticUrl;

    return (
        <video 
            ref={videoRef}
            src={displayUrl || ""}
            muted 
            playsInline 
            onEnded={handleVideoEnd}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover mix-blend-screen opacity-90 transition-opacity duration-300"
        />
    );
}
