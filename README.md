# موقع الشيخ جهاد منير — MVP

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
| اسم الموقع وروابط التواصل والقائمة | `src/site.config.ts` |
| سلسلة خطب أو دورة | `src/content/series/<slug>.md` (`kind: خطب` أو `kind: دورة`) |
| خطبة أو درس | `src/content/lessons/<series>-<n>.md` |
| مقال (مخفي من القائمة حاليًا) | `src/content/articles/<slug>.md` |
| فائدة | `src/content/fawaid/<id>.md` — النص في الـ body، و `source` اختياري (فاضي = من كتابة الشيخ) |
| السيرة الذاتية (الصفحة الرئيسية) | `src/resume.ts` + صورة الشيخ في `public/images/` |
| الجدول | `src/pages/schedule.astro` |

مثال خطبة:

```md
---
title: "حقوق الجار"
series: khutab-akhlaq       # لازم يطابق اسم ملف السلسلة
order: 3
date: 2026-10-17
youtube_id: "xxxxxxxxxxx"
audio_url: "https://archive.org/download/<item>/khutba-03.mp3"
---
ملخص أو تفريغ (اختياري)
```

لما تحط المحتوى الحقيقي: امسح الملفات اللي فيها `placeholder: true`.

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
└── pages/                # الرئيسية، الخطب، الدورات، المقالات، الفوائد، السيرة، الجدول
```

تفاصيل الـ infra في `docs/infra.md`.
