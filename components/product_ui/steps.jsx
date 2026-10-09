"use client"

import React from "react"
import { motion } from "framer-motion"
import { ClipboardList, Package, TrendingUp } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"

export default function HowShippingWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: "01",
      title: t('steps.items.select.title'),
      desc: t('steps.items.select.desc'),
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "02",
      title: t('steps.items.fill.title'),
      desc: t('steps.items.fill.desc'),
      icon: Package,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "03",
      title: t('steps.items.ship.title'),
      desc: t('steps.items.ship.desc'),
      icon: TrendingUp,
      color: "bg-pink-50 text-pink-600",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Helper to parse markdown bold (**) and newlines (\n) to render HTML beautifully
  const renderFormattedText = (text) => {
    if (!text) return "";
    
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIdx) => {
      const parts = [];
      const regex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          parts.push(paragraph.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-gray-900">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < paragraph.length) {
        parts.push(paragraph.substring(lastIndex));
      }
      
      return (
        <p key={pIdx} className={pIdx > 0 ? "mt-3 text-gray-500 text-[13px] leading-relaxed" : "text-gray-500 text-[13px] leading-relaxed"}>
          {parts}
        </p>
      );
    });
  };

  return (
    <section className="w-full bg-white overflow-hidden pb-20" id="como-funciona">
      
      {/* Header Container with Solid Blue Background */}
      <div className="bg-[#132c3f] text-white py-16 px-6 text-center w-full flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide max-w-4xl mx-auto leading-tight">
          {t('steps.title')}
        </h2>
        <p className="text-white/80 text-lg md:text-xl italic font-normal tracking-wide max-w-2xl mx-auto">
          {t('steps.subtitle')}
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
            >
              {/* Step Index Faded Backdrop */}
              <div className="absolute top-8 right-10 text-6xl font-black text-gray-100/60 italic tracking-tighter select-none pointer-events-none">
                {step.id}
              </div>

              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm`}>
                <step.icon size={26} />
              </div>

              {/* Title */}
              <h3 className="text-md font-extrabold text-slate-900 tracking-wider text-center uppercase leading-snug mb-5 w-4/5 mx-auto">
                {step.title}
              </h3>

              {/* Description */}
              <div className="text-center text-gray-500">
                {renderFormattedText(step.desc)}
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
