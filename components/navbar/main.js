"use client";

import React, { useState } from 'react';
import { House, Library, Search, Shapes, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './cartBtn';
import SearchFrom from './search';
import Logo from 'My_UI/logo';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';
import MegaMenu from './MegaMenu';

const navItems = [
    { label: 'Home', id: 'home', href: '/', icon: <Logo size={50} className={'min-w-10'} />, onlyIcon: true },
    {
        label: 'Products List',
        id: 'productList',
        icon: <Library className=' text-inherit h-5' />,
        href: '/collections',
        megaMenu: true
    },
    {
        label: 'Institutional',
        id: 'institutional',
        href: '/about',
        submenu: [
            { label: 'whoWeAre', href: '/about/who-we-are' },
            { label: 'ourMission', href: '/about/mission' },
            { label: 'ourVision', href: '/about/vision' },
            { label: 'qualityCommitment', href: '/about/quality' },
            { label: 'businessModels', href: '/about/business-models' },
        ]
    },
    { label: 'Contact', id: 'contact', href: '/contact' }
];

const BrandToggle = () => {
    const { activeBrand, toggleBrand } = useBrand();
    return (
        <button
            onClick={toggleBrand}
            className="text-xs font-bold px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition-colors uppercase ml-2"
        >
            {activeBrand === 'binw' ? 'UNITEC' : 'BINW'}
        </button>
    )
}

const NavBar = ({ searchParams }) => {
    const { t } = useLanguage();
    const q = searchParams?.q
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-primary/75 shadow-accent2 border-b border-gray-300 shadow-sm backdrop-blur-md text-black  pr-8 pl-5 py-2.5">
            <div className="max-w-400 mx-auto flex items-center justify-between">

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Navigation Links - Desktop */}
                <nav className="items-center flex hidden lg:flex">
                    {navItems.map((item, index) => (
                        <div key={item.id} className={`${item.megaMenu ? "static" : "relative"} group mx-5 first-of-type:mx-0`}>
                            <Link
                                href={item.href}
                                aria-label={`Go To ${item.href}`}
                                className="text-sm uppercase tracking-widest font-semibold flex items-center transition-all whitespace-nowrap cursor-pointer"
                            >
                                {
                                    item.onlyIcon
                                        ? item.icon
                                        :
                                        <>
                                            {
                                                item.icon ?
                                                    <span className={`lg:inline-flex ${index > 1 ? "hidden" : "inline-flex"}`} >{item.icon}</span>
                                                    : null
                                            }
                                            <span className={`lg:block ${index > 1 ? "hidden" : ""}`}> {t(`nav.${item.id}`)}</span>
                                        </>
                                }
                            </Link>

                            {/* Dropdown Menu */}
                            {item.submenu && (
                                <div className="absolute left-5 top-full pt-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                                    <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-md border border-gray-100 overflow-hidden flex flex-col min-w-[200px]">
                                        {/* Dropdown Header if needed */}
                                        {/* <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                            {item.label}
                                        </div> */}
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50 text-gray-700 hover:text-black"
                                            >
                                                {t(`nav.${subItem.label}`)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mega Menu */}
                            {item.megaMenu && <MegaMenu />}
                        </div>
                    ))}
                </nav>

                {/* Actions Area */}
                <div className="flex items-center gap-2 flex-1 justify-end ml-2 md:ml-12">

                    {/* Search Bar - Matching the rounded pill design from screenshot */}
                    <div className="hidden sm:block">
                        <SearchFrom query={q} />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1">
                        <CartButton />
                        <LanguageToggle />
                        <BrandToggle />
                        {/* <div className="px-2 hover:bg-white/5 rounded-full transition-all group">
                            <User className="w-fit h-full text-inherit" />
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 py-4 px-6">
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <div key={item.id}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm uppercase tracking-widest font-semibold flex items-center py-2 hover:text-primary transition-colors"
                                >
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {t(`nav.${item.id}`)}
                                </Link>
                                {item.submenu && (
                                    <div className="pl-6 mt-2 space-y-2">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-sm text-gray-600 hover:text-black py-1"
                                            >
                                                {t(`nav.${subItem.label}`)}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden">
                        <SearchFrom query={q} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavBar;
