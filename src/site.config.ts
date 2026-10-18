// كل البيانات العامة للموقع في مكان واحد — عدّلها لما تيجي من الشيخ
export const SITE = {
  name: 'الشيخ جهاد منير',
  sheikhName: 'فضيلة الشيخ جهاد منير',
  tagline: 'خطب ودورات علمية متسلسلة',
  description: 'الموقع الرسمي لفضيلة الشيخ جهاد منير: الخطب والدورات العلمية والمقالات والفوائد.',
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

export const CATEGORIES = ['عقيدة', 'فقه', 'تفسير', 'حديث', 'سيرة', 'رقائق', 'أسرة ومجتمع'] as const;

// نوع السلسلة: سلسلة خطب أو دورة علمية
export const SERIES_KINDS = ['خطب', 'دورة'] as const;

export const NAV = [
  { href: '/khutab/', label: 'الخطب' },
  { href: '/courses/', label: 'الدورات' },
  { href: '/articles/', label: 'المقالات' },
  { href: '/fawaid/', label: 'الفوائد' },
  { href: '/schedule/', label: 'الجدول' },
  { href: '/about/', label: 'السيرة الذاتية' },
];
