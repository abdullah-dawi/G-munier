# Infra — موقع الشيخ (MVP)

> الهدف: إطلاق الموقع بتكلفة **0$**. أي حاجة مدفوعة مؤجلة لبعد الـ MVP.

---

## 1. الحسابات

| الحساب | الغرض | ملاحظات |
| --- | --- | --- |
| Gmail جديد للمشروع | حساب المالك (Owner) لكل الخدمات + الفواتير لاحقًا + الاسترجاع | فعّل 2FA. **محدش يشتغل بيه يوميًا** |
| GitHub Organization (Free) | الكود والـ issues | كل عضو يدخل بحسابه الشخصي ويتضاف للـ org |
| Cloudflare Account (Free) | الاستضافة + DNS + Analytics | ضيف الأعضاء كـ Members |
| Bitwarden (Free) | حفظ الباسوردات وأكواد الـ 2FA recovery | ممنوع تتبعت على واتساب |

---

## 2. الـ Stack

| الطبقة | الأداة | التكلفة | السبب |
| --- | --- | --- | --- |
| Framework | **Astro** | مجاني | Static، سريع، يدعم RTL والـ Markdown/MDX |
| Styling | Tailwind CSS (مع `dir="rtl"`) | مجاني | أسرع في التنفيذ، ويدعم الـ logical properties |
| الخطوط | IBM Plex Sans Arabic + Amiri (Google Fonts / self-host) | مجاني | قراءة مريحة للنصوص والعناوين |
| الاستضافة | **Cloudflare Pages** | مجاني | CDN + HTTPS + preview لكل PR، ويدعم التيم مجانًا |
| الدومين | `*.pages.dev` مؤقتًا | مجاني | الدومين الحقيقي بعد الـ MVP |
| الفيديو | YouTube embed (lite-youtube) | مجاني | مفيش رفع فيديو على الموقع، والصفحة تفضل خفيفة |
| الصوت | **Archive.org** | مجاني | تخزين دائم للـ MP3 + رابط مباشر |
| البحث | **Pagefind** | مجاني | بحث داخل الموقع وقت الـ build، من غير سيرفر، وبيدعم العربي |
| إدارة المحتوى | **Decap CMS** (Git-based) | مجاني | لوحة تحكم لغير التقنيين، والمحتوى يتحفظ Markdown في الريبو |
| Analytics | Cloudflare Web Analytics | مجاني | من غير cookies ولا banner |
| CI/CD | Cloudflare Pages Git integration (+ GitHub Actions للـ checks) | مجاني | deploy تلقائي على `main` و preview لكل PR |

### مش محتاجينه في الـ MVP
Supabase، Clerk، Stripe، Pinecone، Upstash، Resend، Vercel.
الموقع محتوى ثابت: مفيش مستخدمين ولا مدفوعات ولا Backend.

> ملحوظة: Vercel Hobby مخصص للاستخدام الشخصي ولمستخدم واحد، وفتح تيم يحتاج Pro. علشان كده اخترنا Cloudflare Pages.

---

## 3. هيكل الريبو

```
sheikh-site/
├── src/
│   ├── content/
│   │   ├── series/        # سلسلة = ملف md (العنوان، الوصف، التصنيف)
│   │   ├── lessons/       # درس = ملف md (السلسلة، الترتيب، youtube_id، audio_url)
│   │   ├── fatwas/        # المرحلة الثانية
│   │   └── config.ts      # Content Collections schema (zod)
│   ├── layouts/
│   ├── components/        # AudioPlayer, LessonCard, SeriesList ...
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── schedule.astro
│       ├── series/[slug].astro
│       └── lessons/[slug].astro
├── public/
│   └── admin/             # Decap CMS (index.html + config.yml)
├── astro.config.mjs
└── package.json
```

### مثال ملف درس

```md
---
title: "شرح كتاب التوحيد - الدرس 3"
series: kitab-al-tawheed
order: 3
category: عقيدة
youtube_id: "xxxxxxxxxxx"
audio_url: "https://archive.org/download/<item>/lesson-03.mp3"
date: 2026-10-17
---
ملخص أو تفريغ الدرس (اختياري)
```

---

## 4. الـ Deploy Flow

1. أي تعديل يتعمل على branch ويتفتح بيه PR.
2. Cloudflare Pages تعمل **Preview URL** للـ PR تلقائي.
3. GitHub Actions تشغّل `astro check` و `npm run build`.
4. Merge على `main` ← deploy على production.
5. المحتوى اللي بيتضاف من Decap CMS بيعمل commit (أو PR في وضع `editorial_workflow`) فيمشي في نفس الـ flow.

**Branch protection على `main`:** ممنوع push مباشر، ولازم الـ checks تعدي.

---

## 5. ملاحظات تشغيلية

- **Backup:** المحتوى كله في Git، والصوت على Archive.org، فمفيش database محتاجة backup.
- **Secrets:** مفيش secrets في الـ MVP. لو ظهرت بعد كده، تتحط في Cloudflare/GitHub secrets، مش في الكود.
- **Performance budget:** الصفحة أقل من 200KB JS، و Lighthouse أعلى من 90 على الموبايل.
- **SEO:** `@astrojs/sitemap` + Open Graph لكل درس + `lang="ar" dir="rtl"`.

---

## 6. بعد الـ MVP (مدفوع / لاحقًا)

| البند | التكلفة التقريبية | إمتى |
| --- | --- | --- |
| دومين (من Cloudflare Registrar) | ~10–12$ سنويًا | أول ما الموقع يثبت |
| إيميل على الدومين (Cloudflare Email Routing) | مجاني بعد الدومين | مع الدومين |
| Cloudflare R2 للصوت | مجاني لحد 10GB | لو Archive.org بقى بطيء أو محدود |
| قناة تيليجرام / قائمة بريدية للتنبيهات | مجاني | المرحلة الثانية |
