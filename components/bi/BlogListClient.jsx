'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, CheckCircle2, Mail } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';

export default function BlogListClient({ blogs = [] }) {
  const { bi, isEs } = useLanguage();
  const b = bi.blogPage;

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [subEmail, setSubEmail] = useState('');
  const [subHp, setSubHp] = useState('');
  const [subState, setSubState] = useState('idle');

  const featured = blogs[0] || null;
  const remainingBlogs = blogs.slice(1);

  const filteredBlogs = useMemo(() => {
    const source = selectedCategory === 'ALL' ? remainingBlogs : blogs;
    if (selectedCategory === 'ALL') return source;
    return source.filter((item) => item.category === selectedCategory);
  }, [blogs, remainingBlogs, selectedCategory]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubState('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail.trim(), _hp: subHp }),
      });
      if (res.ok) {
        setSubState('success');
        setSubEmail('');
      } else {
        setSubState('error');
      }
    } catch {
      setSubState('error');
    }
  };

  return (
    <main className="w-full bg-white">
      {/* 1. Banner */}
      <section className="bg-[#f4f1eb] border-b border-[#e5e7e5] py-16">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.eyebrow}</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#17242e] mt-2 max-w-3xl">
            {b.title}
          </h1>
          <p className="text-[#66737c] mt-3 max-w-2xl text-base">{b.subtitle}</p>
        </div>
      </section>

      {/* 2. Artículo Destacado */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="bi-wrap">
            <Link
              href={`/blog/${featured.slug}`}
              className="bi-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 group hover:border-[#d68a50] transition-colors"
            >
              <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[360px] bg-[#142d3d]">
                <Image
                  src={featured.image}
                  alt={isEs ? featured.title : featured.title_en || featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#f6e7da] text-[#d68a50] text-xs font-bold uppercase tracking-wider">
                    {b.featuredLabel} · {isEs ? featured.category : featured.category_en || featured.category}
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e] mt-4 group-hover:text-[#245b77]">
                    {isEs ? featured.title : featured.title_en || featured.title}
                  </h2>
                  <p className="text-[#66737c] mt-3 leading-relaxed text-sm sm:text-base">
                    {isEs ? featured.excerpt : featured.excerpt_en || featured.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#e5e7e5]">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#66737c] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featured.date}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#142d3d]">
                    <span>{b.readMore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. Categorías + 4. Grilla de Artículos */}
      <section className="py-10 pb-20 bg-white">
        <div className="bi-wrap">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#142d3d] text-white border-[#142d3d]'
                  : 'bg-white text-[#66737c] border-[#e5e7e5] hover:text-[#17242e]'
              }`}
            >
              {b.allCategories}
            </button>
            {b.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#142d3d] text-white border-[#142d3d]'
                    : 'bg-white text-[#66737c] border-[#e5e7e5] hover:text-[#17242e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bi-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="relative h-52 w-full bg-[#142d3d]">
                    <Image
                      src={post.image}
                      alt={isEs ? post.title : post.title_en || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#d68a50]">
                      {isEs ? post.category : post.category_en || post.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#17242e] mt-2 line-clamp-2 group-hover:text-[#245b77]">
                      {isEs ? post.title : post.title_en || post.title}
                    </h3>
                    <p className="text-sm text-[#66737c] mt-2 line-clamp-2">
                      {isEs ? post.excerpt : post.excerpt_en || post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#e5e7e5]/70 text-xs">
                  <span className="text-[#66737c]">{post.date}</span>
                  <span className="font-bold text-[#142d3d] inline-flex items-center gap-1">
                    <span>{b.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Suscripción Mensual */}
      <section className="py-16 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <div className="bi-card p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d68a50] mb-2">
                <Mail className="w-4 h-4" />
                <span>Newsletter</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e]">
                {b.subscribeTitle}
              </h2>
              <p className="text-sm text-[#66737c] mt-2">{b.subscribeDesc}</p>
            </div>
            <div className="lg:col-span-6">
              {subState === 'success' ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#278d62]/10 text-[#278d62] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{b.subscribeSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={subHp}
                    onChange={(e) => setSubHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder={b.subscribePlaceholder}
                    className="flex-1 px-4 py-3 rounded-full border border-[#d9dfe0] bg-white text-sm text-[#17242e] focus:outline-none focus:border-[#245b77]"
                  />
                  <button
                    type="submit"
                    disabled={subState === 'loading'}
                    className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer shrink-0 disabled:opacity-60"
                  >
                    {subState === 'loading' ? b.subscribing : b.subscribeBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
