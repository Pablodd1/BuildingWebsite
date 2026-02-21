"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
    Phone,
    Mail,
    MapPin,
    Boxes,
    Clock,
    Truck,
    ShieldCheck,
    Container,
    Send,
} from "lucide-react"
import Stylish_H2 from "My_UI/stylish_h2"
import Map from "./map";
import { useLanguage } from "lib/LanguageContext";


export default function ContactPage() {
    const { t } = useLanguage();
    
    return (
        <main className="w-full">
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden py-20 text-white min-h-fit">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/containes.avif"
                        alt="Containers background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                
                <div className="mx-auto max-w-6xl px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl text-2xl sm:text-3xl font-bold leading-tight md:text-4xl"
                    >
                        {t('contact.hero.title')}
                        <span className="text-gray-300"> {t('contact.hero.subtitle')}</span>
                    </motion.h1>

                    <p className="my-4 max-w-2xl text-sm text-gray-300">
                        {t('contact.hero.description')}
                    </p>

                    {/* Trust signals */}
                    <div className="my-8 grid gap-4 grid-cols-2 md:grid-cols-4">
                        <TrustItem icon={Container} label={t('contact.hero.bulkOrders')} value={t('contact.hero.containerBased')} />
                        <TrustItem icon={Truck} label={t('contact.hero.logistics')} value={t('contact.hero.optimizedPacking')} />
                        <TrustItem icon={Clock} label={t('contact.hero.responseTime')} value={t('contact.hero.within24h')} />
                        <TrustItem icon={ShieldCheck} label={t('contact.hero.handling')} value={t('contact.hero.secureTracked')} />
                    </div>
                </div>
            </section>

            {/* ================= CONTACT MAP ================= */}
            <Map />

            {/* ================= CONTACT CONTENT ================= */}
            <section className="py-12 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 px-4 lg:grid-cols-5">
                    <Stylish_H2 h2={t('contact.talkTeam')} className="col-span-full tracking-widest uppercase text-xs md:text-sm lg:text-lg " />
                    {/* LEFT INFO */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold">

                        </h2>

                        <p className="mt-3 text-sm text-gray-600">
                            {t('contact.whether')}
                        </p>

                        {/* Contact cards */}
                        <div className="mt-8 space-y-4">
                            <InfoCard
                                icon={MapPin}
                                title={t('contact.headquarters')}
                                value="6120 NW 74th Ave, Doral, Miami, FL 33166"
                                hint="United States"
                            />
                            <InfoCard
                                icon={Phone}
                                title={t('contact.generalInquiries')}
                                value="+1 (786) 968-5783"
                                hint="@building.innovation"
                            />

                            <h3 className="text-lg font-semibold mt-6 mb-2">{t('contact.activeStaff')}</h3>

                            <InfoCard
                                icon={Phone}
                                title="Juan David Garcia (CEO)"
                                value="+1 (786) 657-5441"
                                hint="General inquiries through main line"
                            />
                            <InfoCard
                                icon={Phone}
                                title="Alexander Gomez Zapata (Global)"
                                value="+57 311 3017763"
                                hint="International Account Manager"
                            />
                            <InfoCard
                                icon={Phone}
                                title="Johana Mesa (Distribution)"
                                value="+1 (786) 968-5783"
                                hint="Distribution Sales Manager"
                            />
                            <InfoCard
                                icon={Phone}
                                title="Antonio Borjas (Sales)"
                                value="+1 (786) 546-9051"
                                hint="Sales Representative"
                            />
                            <InfoCard
                                icon={Phone}
                                title="Marlon Moncada (SW Florida)"
                                value="+1 (239) 878-9299"
                                hint="Sales Representative"
                            />
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold">
                                {t('contact.requestQuote')}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {t('contact.provideDetails')}
                            </p>

                            <form className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Input label={t('contact.fullName')} placeholder="John Doe" />
                                <Input label={t('contact.companyName')} placeholder="Your Company LLC" />
                                <Input label={t('contact.email')} placeholder="your-name@example.com" />
                                <Input label={t('contact.phone')} placeholder="+1 234 567 890" />

                                <div className="sm:col-span-2">
                                    <Input
                                        label={t('contact.estimatedVolume')}
                                        placeholder="e.g. 1x 40ft container"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Textarea
                                        label={t('contact.projectDetails')}
                                        placeholder="Describe product types, quantities, destination, and timeline..."
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit" aria-label="Submit Form"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.98]"
                                    >
                                        <Send size={16} />
                                        {t('contact.sendInquiry')}
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs text-gray-500">
                                {t('contact.responseTimeText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

/* ================= SUB COMPONENTS ================= */

function TrustItem({ icon: Icon, label, value }) {
    return (
        <div className="rounded-xl bg-white/5 p-3 md:p-4 text-center">
            <Icon strokeWidth={0.5} className="mx-auto mb-3 md:mb-5 h-10 md:h-18 w-auto text-gray-300" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-xs md:text-sm font-thin tracking-widest uppercase my-2">{value}</p>
        </div>
    )
}

function InfoCard({ icon: Icon, title, value, hint }) {
    return (
        <div className="flex items-start gap-4 rounded-xl border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm">{value}</p>
                <p className="text-xs text-gray-500">{hint}</p>
            </div>
        </div>
    )
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
            />
        </div>
    )
}

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <textarea
                {...props}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
            />
        </div>
    )
}
