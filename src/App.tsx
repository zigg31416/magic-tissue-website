import { useEffect, useState } from 'react';

const PHONE = 'tel:01336580900';
const WHATSAPP = 'https://wa.me/message/RN4HQHNW4GLSG1';
const FACEBOOK = 'https://www.facebook.com/share/1CRYF44Qed/';
const WEB3FORMS_ACCESS_KEY = 'dd8953a3-7f95-4583-8dc5-3e4977d2c6eb';

const PACKAGES = {
  starter: { label: 'Starter Pack — ১০ পিস', price: 490 },
  premier: { label: 'Premier Pack — ২০ পিস', price: 900 },
} as const;

const DELIVERY_OPTIONS = {
  inside: { label: 'ঢাকার ভিতরে', price: 60 },
  outside: { label: 'ঢাকার বাইরে', price: 120 },
} as const;

const PRODUCT_IMAGES = [
  '/assets/product-1.jpg',
  '/assets/product-2.jpg',
  '/assets/product-3.jpg',
  '/assets/product-4.jpg',
];

type CountdownState = { hours: number; minutes: number; seconds: number };
type PackageKey = keyof typeof PACKAGES;
type DeliveryKey = keyof typeof DELIVERY_OPTIONS;

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function useCountdown(initial: CountdownState): CountdownState {
  const [time, setTime] = useState<CountdownState>(initial);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours -= 1;
        } else {
          hours = 5;
          minutes = 47;
          seconds = 31;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function PromoBar() {
  return (
    <div className="promo-bar">
      <span>অফার সীমিত সময়ের জন্য! আজই অর্ডার করুন — ক্যাশ অন ডেলিভারি</span>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Magic Tissue">
          <img src={PRODUCT_IMAGES[0]} alt="" className="brand-thumb" />
          <span className="brand-text">
            <span className="brand-name">Magic Tissue</span>
            <span className="brand-sub">ম্যাজিক টিস্যু</span>
          </span>
        </a>
        <nav className="header-cta" aria-label="যোগাযোগ">
          <a className="btn btn-blue" href={PHONE}>
            <span aria-hidden="true">📞</span> কল করুন
          </a>
          <a className="btn btn-green" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">💬</span> WhatsApp
          </a>
          <a className="btn btn-fb" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">📘</span> Facebook
          </a>
        </nav>
      </div>
    </header>
  );
}

function CountdownCard() {
  const time = useCountdown({ hours: 5, minutes: 47, seconds: 31 });
  return (
    <section className="container countdown-section">
      <div className="countdown-card">
        <h2 className="countdown-title">⚡ অফার শেষ হওয়ার আগে অর্ডার করুন!</h2>
        <div className="countdown-blocks" role="timer" aria-live="polite">
          <div className="countdown-unit">
            <div className="countdown-box">{pad(time.hours)}</div>
            <span className="countdown-label">ঘণ্টা</span>
          </div>
          <span className="countdown-sep" aria-hidden="true">:</span>
          <div className="countdown-unit">
            <div className="countdown-box">{pad(time.minutes)}</div>
            <span className="countdown-label">মিনিট</span>
          </div>
          <span className="countdown-sep" aria-hidden="true">:</span>
          <div className="countdown-unit">
            <div className="countdown-box">{pad(time.seconds)}</div>
            <span className="countdown-label">সেকেন্ড</span>
          </div>
        </div>
        <p className="countdown-foot">স্টক সীমিত — এখনই সুযোগ নিন!</p>
      </div>
    </section>
  );
}

const BENEFITS = [
  'সহবাসে ৩০–৪০ মিনিট দীর্ঘস্থায়িত্বের গ্যারান্টি',
  'ভিটামিন E সমৃদ্ধ — কোনো ক্ষতি ছাড়াই কাজ করে',
  'জার্মান ল্যাব টেস্টেড — পার্শ্বপ্রতিক্রিয়ামুক্ত',
  'ডায়াবেটিস ও হার্টের রোগীরাও ব্যবহার করতে পারবেন',
  'মাত্র ২ মিনিটে কাজ শুরু করে',
  'পকেট সাইজ — সহজে বহনযোগ্য',
];

function Stars() {
  return (
    <span className="stars" aria-label="৪.৮ তারকা রেটিং">
      {'★★★★★'}
    </span>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="container hero-section">
      <div className="hero-grid">
        <div className="hero-image-card">
          <div className="hero-image-frame">
            <img
              src={PRODUCT_IMAGES[active]}
              alt="Magic Tissue Product"
              className="hero-image"
            />
          </div>
          <div className="hero-thumbs" role="tablist" aria-label="পণ্যের ছবি">
            {PRODUCT_IMAGES.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`hero-thumb ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img src={src} alt={`Magic Tissue ছবি ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badges">
            <span className="badge badge-pink">অরিজিনাল জার্মান প্রোডাক্ট</span>
            <span className="badge badge-mint">১০০% কার্যকর</span>
          </div>
          <h1 className="hero-title">ম্যাজিক টিস্যু</h1>
          <p className="hero-subtitle">পুরুষদের আত্মবিশ্বাসের সেরা সঙ্গী</p>
          <div className="hero-rating">
            <Stars />
            <span className="rating-value">4.8</span>
            <span className="rating-count">(2,847 রিভিউ)</span>
          </div>
          <ul className="benefits">
            {BENEFITS.map((b) => (
              <li key={b} className="benefit-row">
                <span className="benefit-check" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: '🔬', label: 'জার্মান ল্যাব টেস্টেড' },
    { icon: '🛡️', label: 'সাইড ইফেক্ট মুক্ত' },
    { icon: '📦', label: 'গোপন প্যাকেজিং' },
  ];
  return (
    <section className="container trust-section">
      <div className="trust-grid">
        {items.map((it) => (
          <div className="trust-card" key={it.label}>
            <span className="trust-icon" aria-hidden="true">{it.icon}</span>
            <span className="trust-label">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const [selected, setSelected] = useState<'starter' | 'premier'>('starter');
  return (
    <section className="container pricing-section" id="order">
      <h2 className="section-title-center">প্যাকেজ বেছে নিন:</h2>

      <div className="pricing-grid">
        <button
          type="button"
          className={`pricing-card ${selected === 'starter' ? 'is-selected' : ''}`}
          onClick={() => setSelected('starter')}
          aria-pressed={selected === 'starter'}
        >
          <div className="pricing-head">
            <span className="pricing-name">Starter Pack</span>
            <span className="pricing-qty">১০ পিস</span>
          </div>
          <div className="pricing-price">৳490</div>
          <p className="pricing-note">প্রতি পিস মাত্র ৳৪৯</p>
        </button>

        <button
          type="button"
          className={`pricing-card pricing-card-featured ${selected === 'premier' ? 'is-selected' : ''}`}
          onClick={() => setSelected('premier')}
          aria-pressed={selected === 'premier'}
        >
          <span className="pricing-ribbon">সর্বোচ্চ সাশ্রয়</span>
          <div className="pricing-head">
            <span className="pricing-name">Premier Pack</span>
            <span className="pricing-qty">২০ পিস</span>
          </div>
          <div className="pricing-price">৳900</div>
          <p className="pricing-note">ডাবল কোয়ান্টিটি, ডাবল ভ্যালু</p>
        </button>
      </div>

      <div className="delivery-card">
        <div className="delivery-row">
          <span>🚚 ঢাকার ভিতরে ডেলিভারি:</span>
          <strong>৳60</strong>
        </div>
        <div className="delivery-row">
          <span>🚚 ঢাকার বাইরে ডেলিভারি:</span>
          <strong>৳120</strong>
        </div>
        <div className="delivery-cod">
          <span aria-hidden="true">💵</span>
          <span>ক্যাশ অন ডেলিভারি — পণ্যটি হাতে নিয়ে চেক করে পেমেন্ট করুন।</span>
        </div>
      </div>

      <div className="order-cta-stack">
        <a href="#order-form" className="btn btn-order">
          এখনই অর্ডার করুন
        </a>
        <div className="order-cta-row">
          <a className="btn btn-blue" href={PHONE}>
            <span aria-hidden="true">📞</span> কল করুন
          </a>
          <a className="btn btn-green" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">💬</span> WhatsApp
          </a>
          <a className="btn btn-fb" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">📘</span> Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function OrderForm() {
  const [packageKey, setPackageKey] = useState<PackageKey>('starter');
  const [deliveryKey, setDeliveryKey] = useState<DeliveryKey>('inside');
  const [quantity, setQuantity] = useState(1);

  const selectedPackage = PACKAGES[packageKey];
  const selectedDelivery = DELIVERY_OPTIONS[deliveryKey];
  const total = selectedPackage.price * quantity + selectedDelivery.price;

  return (
    <section className="container order-form-section" id="order-form">
      <div className="order-form-card">
        <div className="order-form-copy">
          <span className="order-form-badge">ক্যাশ অন ডেলিভারি</span>
          <h2 className="section-title">অর্ডার ফর্ম</h2>
          <p className="order-form-text">
            আপনার তথ্য দিন। অর্ডার সাবমিট হলেই বিস্তারিত ইমেইলে চলে যাবে।
          </p>
          <div className="order-summary">
            <div>
              <span>প্যাকেজ</span>
              <strong>{selectedPackage.label}</strong>
            </div>
            <div>
              <span>পরিমাণ</span>
              <strong>{quantity}</strong>
            </div>
            <div>
              <span>ডেলিভারি</span>
              <strong>৳{selectedDelivery.price}</strong>
            </div>
            <div className="order-summary-total">
              <span>মোট</span>
              <strong>৳{total}</strong>
            </div>
          </div>
        </div>

        <form className="order-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="New Magic Tissue Order" />
          <input type="hidden" name="from_name" value="Magic Tissue Website" />
          <input type="hidden" name="package" value={selectedPackage.label} />
          <input type="hidden" name="package_price" value={`৳${selectedPackage.price}`} />
          <input type="hidden" name="quantity" value={quantity} />
          <input type="hidden" name="delivery_area" value={selectedDelivery.label} />
          <input type="hidden" name="delivery_charge" value={`৳${selectedDelivery.price}`} />
          <input type="hidden" name="total_amount" value={`৳${total}`} />
          <input type="checkbox" name="botcheck" className="hidden-field" tabIndex={-1} autoComplete="off" />

          <label>
            নাম
            <input name="name" type="text" placeholder="আপনার নাম" required />
          </label>

          <label>
            ফোন নম্বর
            <input name="phone" type="tel" placeholder="01XXXXXXXXX" required />
          </label>

          <label>
            সম্পূর্ণ ঠিকানা
            <textarea name="address" rows={3} placeholder="বাসা/রোড/এলাকা/জেলা" required />
          </label>

          <div className="form-grid-two">
            <label>
              প্যাকেজ
              <select
                name="selected_package"
                value={packageKey}
                onChange={(event) => setPackageKey(event.target.value as PackageKey)}
              >
                <option value="starter">Starter Pack — ১০ পিস — ৳490</option>
                <option value="premier">Premier Pack — ২০ পিস — ৳900</option>
              </select>
            </label>

            <label>
              পরিমাণ
              <input
                name="selected_quantity"
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                required
              />
            </label>
          </div>

          <label>
            ডেলিভারি এলাকা
            <select
              name="selected_delivery_area"
              value={deliveryKey}
              onChange={(event) => setDeliveryKey(event.target.value as DeliveryKey)}
            >
              <option value="inside">ঢাকার ভিতরে — ৳60</option>
              <option value="outside">ঢাকার বাইরে — ৳120</option>
            </select>
          </label>

          <label>
            নোট / অতিরিক্ত তথ্য
            <textarea name="note" rows={2} placeholder="ঐচ্ছিক" />
          </label>

          <div className="form-total-row">
            <span>মোট পেমেন্ট</span>
            <strong>৳{total}</strong>
          </div>

          <button className="btn btn-order form-submit" type="submit">
            অর্ডার সাবমিট করুন
          </button>

          <p className="form-message form-message-info">
            সাবমিট করার পর Web3Forms অর্ডারটি সরাসরি আপনার ইমেইলে পাঠাবে।
          </p>
        </form>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: '🚚', title: 'দ্রুত ডেলিভারি', sub: '২৪-৭২ ঘণ্টা' },
    { icon: '🔒', title: 'গোপন প্যাকেজ', sub: '১০০% প্রাইভেট' },
    { icon: '💵', title: 'ক্যাশ অন ডেলিভারি', sub: 'পেয়ে পেমেন্ট' },
  ];
  return (
    <section className="container services-section">
      <div className="services-grid">
        {items.map((it) => (
          <div className="service-card" key={it.title}>
            <span className="service-icon" aria-hidden="true">{it.icon}</span>
            <div>
              <div className="service-title">{it.title}</div>
              <div className="service-sub">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    {
      icon: '🧼',
      label: 'ধাপ ১',
      title: 'পরিষ্কার করুন',
      body: 'সহবাসের ২-৩ মিনিট আগে ভালো করে ধুয়ে শুকনো করুন।',
    },
    {
      icon: '✋',
      label: 'ধাপ ২',
      title: 'টিস্যু লাগান',
      body:
        'লিঙ্গের আগা থেকে মাঝ পর্যন্ত ২-৩ বার মুছুন এবং চারপাশে মালিশ করুন। ৩০ সেকেন্ডে শুকিয়ে যাবে।',
    },
    {
      icon: '⏰',
      label: 'ধাপ ৩',
      title: '২ মিনিট অপেক্ষা করুন',
      body:
        '২ মিনিট অপেক্ষার পর সহবাসে যান এবং ৩০-৪০ মিনিটের সুখময় অভিজ্ঞতা উপভোগ করুন।',
    },
  ];
  return (
    <section className="container steps-section">
      <h2 className="section-title-center">কিভাবে ব্যবহার করবেন?</h2>
      <p className="section-sub-center">মাত্র ৩টি সহজ ধাপে ব্যবহার করুন</p>
      <div className="steps-grid">
        {steps.map((s) => (
          <article className="step-card" key={s.label}>
            <span className="step-icon" aria-hidden="true">{s.icon}</span>
            <span className="step-label">{s.label}</span>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-body">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: '🏆', title: 'জার্মান মানের নিশ্চয়তা', body: 'আন্তর্জাতিক মানের পরীক্ষায় উত্তীর্ণ, প্রামাণিত ফলাফল' },
    { icon: '🛡️', title: '১০০% নিরাপদ', body: 'কোনো রাসায়নিক পার্শ্বপ্রতিক্রিয়া নেই, ডাক্তারদের পরীক্ষিত' },
    { icon: '⚡', title: 'দ্রুত ফলাফল', body: 'মাত্র ২ মিনিটে কার্যকর, দীর্ঘস্থায়ী প্রভাব ৩০-৪০ মিনিট' },
    { icon: '🔐', title: 'গোপনীয়তা নিশ্চিত', body: 'সম্পূর্ণ গোপন প্যাকেজিং, কেউ বুঝতে পারবে না' },
  ];
  return (
    <section className="container why-section">
      <h2 className="section-title-center">কেন ম্যাজিক টিস্যু বেছে নেবেন?</h2>
      <p className="section-sub-center">হাজার হাজার সন্তুষ্ট গ্রাহকের বিশ্বস্ত পছন্দ</p>
      <div className="why-grid">
        {items.map((it) => (
          <article className="why-card" key={it.title}>
            <span className="why-icon" aria-hidden="true">{it.icon}</span>
            <h3 className="why-title">{it.title}</h3>
            <p className="why-body">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      initial: 'র',
      name: 'রহিম সরকার',
      meta: 'ঢাকা • ২ দিন আগে',
      body: 'অসাধারণ প্রোডাক্ট! সত্যিই কাজ করে। ৩৫ মিনিট পর্যন্ত পার্থক্য টের পাই। রেকমেন্ড করছি।',
      color: 'rev-blue',
    },
    {
      initial: 'ম',
      name: 'মো. করিম',
      meta: 'চট্টগ্রাম • ৫ দিন আগে',
      body: '২ বছর ধরে ব্যবহার করছি। কোনো সাইড ইফেক্ট নেই, অরিজিনাল প্রোডাক্ট। ডেলিভারিও দ্রুত।',
      color: 'rev-green',
    },
    {
      initial: 'জ',
      name: 'জুলফিকার আলী',
      meta: 'সিলেট • ১ সপ্তাহ আগে',
      body: 'প্রথমে সন্দেহ ছিল, কিন্তু ব্যবহার করে সত্যিই অবাক হলাম। দারুণ কাজ করে।',
      color: 'rev-orange',
    },
    {
      initial: 'ম',
      name: 'মাহমুদুল হাসান',
      meta: 'রাজশাহী • ১০ দিন আগে',
      body: 'গোপনীয় প্যাকেজিংয়ে ডেলিভারি পেয়েছি, খুব ভালো লাগলো। প্রোডাক্টও অরিজিনাল।',
      color: 'rev-purple',
    },
  ];
  return (
    <section className="container reviews-section">
      <h2 className="section-title-center">গ্রাহকদের মতামত</h2>
      <p className="section-sub-center">
        <Stars /> <strong>4.8/5</strong> <span className="muted">(2,847)</span>
      </p>
      <div className="reviews-grid">
        {reviews.map((r) => (
          <article className="review-card" key={r.name}>
            <header className="review-head">
              <span className={`review-avatar ${r.color}`} aria-hidden="true">
                {r.initial}
              </span>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-meta">{r.meta}</div>
              </div>
            </header>
            <div className="review-stars" aria-hidden="true">
              <Stars />
            </div>
            <p className="review-body">{r.body}</p>
            <span className="review-verified">✓ যাচাইকৃত ক্রয়</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'কিভাবে ব্যবহার করব?',
    a: 'প্রতিবার সহবাসের ২-৩ মিনিট আগে লিঙ্গ ধুয়ে শুকনো কাপড় বা টিস্যু দিয়ে মুছে নেবেন। তারপর লিঙ্গের আগা থেকে অর্ধেক পর্যন্ত ২-৩ বার মুছবেন টিস্যুটি দিয়ে এবং চারপাশে একটু মালিশ করবেন। ৩০ সেকেন্ডের মধ্যে শুকিয়ে যাবে। ২ মিনিট অপেক্ষা করে সহবাসে যাবেন।',
  },
  {
    q: 'এটা কি অরিজিনাল প্রোডাক্ট?',
    a: 'হ্যাঁ। ম্যাজিক টিস্যু অরিজিনাল জার্মানির প্রোডাক্ট। প্যাকেটের নিচে বারকোড স্ক্যানার থাকবে — চেক করে নিতে পারবেন। মেয়াদ ৩ বছর থাকবে।',
  },
  {
    q: 'কোনো সাইড ইফেক্ট আছে কি?',
    a: 'না। এটি জার্মান ল্যাব থেকে পরীক্ষিত এবং সম্পূর্ণ পার্শ্বপ্রতিক্রিয়ামুক্ত। এটি শুধু বাইরে ব্যবহার করার জন্য, শরীরের ভিতরে যায় না। তাই কোনো ধরনের সমস্যার ঝুঁকি নেই।',
  },
  {
    q: 'ডেলিভারি কতদিনে পাব?',
    a: 'ঢাকার ভিতরে ২৪-৭২ ঘণ্টার মধ্যে। ঢাকার বাইরে ২-৪ কার্যদিবস। প্যাকেজিং সম্পূর্ণ গোপনীয় এবং নিরাপদ। ডেলিভারি চার্জ: ঢাকার ভিতরে ৳৬০, ঢাকার বাইরে ৳১২০।',
  },
  {
    q: 'পেমেন্ট কিভাবে করব?',
    a: 'ক্যাশ অন ডেলিভারি — পণ্যটি হাতে নিয়ে চেক করে তারপর পেমেন্ট করতে পারবেন। আগে কোনো টাকা দিতে হবে না।',
  },
  {
    q: 'অর্ডার কিভাবে করব?',
    a: 'এই পেজ থেকে সরাসরি অর্ডার করতে পারবেন, অথবা আমাদের হটলাইন নম্বরে কল করুন। WhatsApp বা Facebook-এও অর্ডার নেওয়া হয়।',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container faq-section">
      <h2 className="section-title-center">সাধারণ প্রশ্নোত্তর</h2>
      <p className="section-sub-center">আপনার সকল প্রশ্নের উত্তর এখানে</p>
      <div className="faq-list">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={f.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{f.q}</span>
                <span className="faq-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="faq-a">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <h2 className="final-title">আজই আত্মবিশ্বাস ফিরে পান!</h2>
        <p className="final-sub">হাজার হাজার পুরুষ ইতিমধ্যে উপকৃত হয়েছেন — আপনার পালা!</p>
        <div className="final-line">এখনই অর্ডার করুন — Starter Pack মাত্র ৳490</div>
        <p className="final-meta">ক্যাশ অন ডেলিভারি | গোপন প্যাকেজিং | ১০০% অরিজিনাল</p>
        <div className="final-btns">
          <a className="btn btn-blue btn-lg" href={PHONE}>
            📞 কল
          </a>
          <a className="btn btn-green btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp
          </a>
          <a className="btn btn-order btn-lg" href="#order-form">
            অর্ডার — ৳490
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-name">Magic Tissue</div>
          <p className="footer-tag">সেরা মানের ব্যক্তিগত পরিচর্যা পণ্য</p>
        </div>
        <div className="footer-links">
          <a href={PHONE}>📞 +880 1336-580900</a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">📘 Facebook</a>
        </div>
        <div className="footer-meta">
          ডেলিভারি চার্জ: ঢাকার ভিতরে ৳৬০ | ঢাকার বাইরে ৳১২০
        </div>
        <div className="footer-policy">
          <a href="#">গোপনীয়তা নীতি</a>
          <span aria-hidden="true">|</span>
          <a href="#">শর্তাবলী</a>
        </div>
        <div className="footer-copy">© 2026 Magic Tissue. সকল অধিকার সংরক্ষিত।</div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top" className="app">
      <PromoBar />
      <Header />
      <main>
        <CountdownCard />
        <Hero />
        <TrustStrip />
        <Pricing />
        <OrderForm />
        <Services />
        <Steps />
        <WhyChoose />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
