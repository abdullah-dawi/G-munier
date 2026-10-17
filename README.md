# موقع الشيخ — MVP

موقع ثابت (Astro + Tailwind) لمكتبة دروس الشيخ. المحتوى الحالي **خانات نموذجية** (`placeholder: true`) لحد ما يوصل المحتوى الحقيقي.

## التشغيل محليًا

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # الناتج في dist/
```

## إضافة المحتوى

| المطلوب | الملف |
| --- | --- |
| اسم الموقع والشيخ والسوشيال | `src/site.config.ts` |
| سلسلة جديدة | ملف في `src/content/series/<slug>.md` |
| درس جديد | ملف في `src/content/lessons/<series>-lesson-<n>.md` |
| النبذة | `src/pages/about.astro` |
| الجدول | `src/pages/schedule.astro` |

مثال درس:

```md
---
title: "شرح كتاب التوحيد - الدرس 3"
series: kitab-al-tawheed      # لازم يطابق اسم ملف السلسلة
order: 3
date: 2026-10-17
youtube_id: "xxxxxxxxxxx"     # اختياري
audio_url: "https://archive.org/download/<item>/lesson-03.mp3"  # اختياري
---
ملخص أو تفريغ (اختياري)
```

لما تحط المحتوى الحقيقي: امسح ملفات `series-1*` و `series-2*` أو شيل منها `placeholder: true`.
الـ schema في `src/content.config.ts`، والـ build هيفشل لو في حقل ناقص أو سلسلة مش موجودة.

## الـ Deploy على Cloudflare Pages

1. ارفع الريبو على GitHub Organization.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: **Astro** · Build command: `npm run build` · Output: `dist`.
4. بعد أول deploy حدّث `site` في `astro.config.mjs` بالرابط الفعلي.
5. GitHub → Settings → Branches: فعّل protection على `main` واشترط نجاح الـ CI.

## لوحة التحكم (Decap CMS) — اختياري

الملفات في `public/admin/` جاهزة، بس محتاجة:
1. تغيير `repo` في `public/admin/config.yml`.
2. GitHub OAuth App + OAuth proxy (لأن Cloudflare Pages مفيهاش auth جاهز زي Netlify). ممكن نأجلها لحد ما حد غير تقني يحتاج يضيف محتوى.

## الهيكل

```
src/
├── site.config.ts        # بيانات الموقع العامة + التصنيفات
├── content.config.ts     # schema السلاسل والدروس
├── content/{series,lessons}/
├── components/           # AudioPlayer (يتذكر مكان التوقف), YouTube (lite embed), SeriesCard
├── layouts/Base.astro    # RTL + الخطوط + SEO
└── pages/                # الرئيسية، السلاسل، الدرس، عن الشيخ، الجدول، 404
```

تفاصيل الـ infra في `docs/infra.md`.
