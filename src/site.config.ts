// كل البيانات العامة للموقع في مكان واحد — عدّلها لما تيجي من الشيخ
export const SITE = {
  name: 'الشيخ جهاد منير',
  sheikhName: 'فضيلة الشيخ جهاد منير',
  tagline: 'مهتم بالتربية — دورات علمية وخطب',
  description: 'الموقع الرسمي لفضيلة الشيخ جهاد منير: السيرة الذاتية والدورات والخطب والفوائد.',
  // اترك أي حساب فاضي لو مش موجود — مش هيظهر في الموقع
  social: {
    telegram: '',
    youtube: '',
    facebook: '',
    whatsapp: '',
    x: '',
    email: '',
  },
};

export const CATEGORIES = ['تربية', 'أسرة ومجتمع', 'عقيدة', 'فقه', 'تفسير', 'حديث', 'سيرة', 'رقائق'] as const;

// نوع السلسلة: سلسلة خطب أو دورة علمية
export const SERIES_KINDS = ['خطب', 'دورة'] as const;

export const NAV = [
  { href: '/', label: 'السيرة الذاتية' },
  { href: '/courses/', label: 'الدورات' },
  { href: '/khutab/', label: 'الخطب' },
  { href: '/fawaid/', label: 'الفوائد' },
  { href: '/schedule/', label: 'الجدول' },
];
