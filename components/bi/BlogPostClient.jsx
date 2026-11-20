'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  MessageCircle,
  Share2,
  User,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings, getWhatsappLink } from '../../utils/siteSettings';

export default function BlogPostClient({ blog, relatedProducts = [] }) {
  const { bi, isEs } = useLanguage();
  const b = bi.blogPage;
  const [openFaq, setOpenFaq] = useState(0);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${siteSettings.domain}/blog/${blog.slug}/`;
  const titleText = isEs ? blog.title : blog.title_en || blog.title;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <main className="w-full bg-white pb-20">
      <div className="bg-[#f4f1eb] border-b border-[#e5e7e5] py-4">
        <div className="bi-wrap flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245b77] hover:text-[#d68a50]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{b.backToBlog}</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d68a50]">
            {isEs ? blog.category : blog.category_en || blog.category}
          </span>
        </div>
      </div>

      <article className="bi-wrap max-w-4xl pt-12">
        <header className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[#f6e7da] text-[#d68a50] text-xs font-bold uppercase tracking-wider mb-4">
            {isEs ? blog.category : blog.category_en || blog.category}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#17242e] leading-[1.1]">
            {titleText}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-semibold text-[#66737c]">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#d68a50]" />
              <span>{blog.author}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#d68a50]" />
              <span>{blog.date}</span>
            </span>
          </div>
        </header>

        <div className="relative h-[300px] sm:h-[460px] w-full rounded-[24px] overflow-hidden mb-10 bg-[#142d3d] shadow-[0_18px_50px_rgba(16,36,50,0.1)]">
          <Image
            src={blog.image}
            alt={titleText}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Rich Content */}
        <div
          className="bi-prose"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* CTA & Share Bar */}
        <div className="mt-12 p-6 rounded-[20px] bg-[#f4f1eb] border border-[#e5e7e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a
            href={getWhatsappLink(
              isEs
                ? `Hola Building Innovation, leí el artículo "${titleText}" y quiero cotizar.`
                : `Hello Building Innovation, I read "${titleText}" and would like a quote.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{bi.common.quoteWhatsapp}</span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66737c] mr-1 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>{b.shareLabel}:</span>
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${titleText} ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white border border-[#e5e7e5] text-xs font-bold text-[#17242e] hover:border-[#d68a50]"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white border border-[#e5e7e5] text-xs font-bold text-[#17242e] hover:border-[#d68a50]"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full bg-[#142d3d] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              {copied && <Check className="w-3.5 h-3.5" />}
              <span>{copied ? b.copied : b.copyLink}</span>
            </button>
          </div>
        </div>

        {/* Related Products (NO prices) */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#e5e7e5]">
            <h2 className="font-heading font-extrabold text-2xl text-[#17242e] mb-6">
              {b.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/catalogo/${item.id}`}
                  className="bi-card overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  <div className="relative h-44 w-full bg-[#f4f1eb]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-[#d68a50]">
                      {item.subcategory}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#17242e] mt-1 line-clamp-2 group-hover:text-[#245b77]">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#66737c] mt-1">
                      {item.formattedDims?.metricLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Article FAQs */}
        {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#e5e7e5]">
            <h2 className="font-heading font-extrabold text-2xl text-[#17242e] mb-6">
              {b.faqsTitle}
            </h2>
            <div className="space-y-3">
              {blog.faqs.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={idx} className="bi-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-[#17242e] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d68a50] shrink-0 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-6 pb-5 text-sm text-[#66737c] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
