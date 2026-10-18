// ينشر الخطب/الدروس والفوائد الجديدة على قناة تيليجرام بعد كل deploy
// الاستخدام: node scripts/notify-telegram.mjs <before-sha>
// المتغيرات: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (مثل @jihadmunir), SITE_URL
// بدون TELEGRAM_BOT_TOKEN يطبع الرسائل فقط (dry run)
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

const before = process.argv[2];
const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat, SITE_URL = 'https://jihad-munir.pages.dev' } = process.env;
const SHEIKH = 'فضيلة الشيخ جهاد منير';

if (!before || /^0+$/.test(before)) {
  console.log('No previous commit to compare against; skipping.');
  process.exit(0);
}

const added = execFileSync(
  'git',
  ['diff', '--name-only', '--diff-filter=A', `${before}..HEAD`, '--', 'src/content/lessons', 'src/content/fawaid'],
  { encoding: 'utf8' }
)
  .split('\n')
  .filter((f) => f.endsWith('.md'));

// قراءة frontmatter بسيطة (key: value) + الـ body
function parse(file) {
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: (m ? m[2] : raw).trim() };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tag = (s) => '#' + s.replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_]/gu, '');

const messages = [];
for (const file of added) {
  const id = basename(file, '.md');
  const { data, body } = parse(file);
  if (data.placeholder === 'true') continue;

  if (file.includes('/lessons/')) {
    const seriesFile = `src/content/series/${data.series}.md`;
    const series = existsSync(seriesFile) ? parse(seriesFile).data : {};
    const unit = series.kind === 'خطب' ? 'الخطبة' : 'الدرس';
    const lines = [
      `🎙 <b>${esc(series.title ?? data.series)}</b> — ${unit} ${data.order}`,
      esc(data.title ?? ''),
      '',
      data.summary ? esc(data.summary) + '\n' : '',
      `🌐 الاستماع والتفريغ: ${SITE_URL}/lessons/${id}/`,
      data.youtube_id ? `▶️ يوتيوب: https://youtu.be/${data.youtube_id}` : '',
      '',
      series.title ? tag(series.title) : '',
    ];
    messages.push(lines.filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n').trim());
  } else {
    const text = body.replace(/^#+\s*/gm, '');
    messages.push(
      [`💡 <b>فائدة</b>`, '', esc(text), '', `— ${SHEIKH}`, '', `${SITE_URL}/fawaid/#${id}`, data.category ? tag(data.category) : '']
        .join('\n')
        .trim()
    );
  }
}

if (messages.length === 0) {
  console.log('Nothing new to announce.');
  process.exit(0);
}

for (const text of messages) {
  if (!token || !chat) {
    console.log('--- dry run ---\n' + text + '\n');
    continue;
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: false }),
  });
  const json = await res.json();
  if (!json.ok) {
    console.error('Telegram error:', json.description);
    process.exitCode = 1;
  } else {
    console.log('Posted message', json.result.message_id);
  }
  await new Promise((r) => setTimeout(r, 1500)); // تجنب حد الإرسال
}
