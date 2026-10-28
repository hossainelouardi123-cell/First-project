/* =====================================================================
   عقلك الرقمي — DigitalMind AI Platform
   ملف JavaScript الرئيسي: التفاعلات + تكامل Groq API + الأتمتة الكاملة
   ===================================================================== */

/* =========================================================
   ⚙️ قسم الإعدادات CONFIG — ضع مفاتيحك وروابطك هنا فقط!
   ========================================================= */

// ضع مفتاح Groq API الخاص بك هنا (من https://console.groq.com)
const GROQ_API_KEY = "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";

// رابط Groq API (لا تغيّره إلا إذا أراد Groq تحديثه)
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// اسم النموذج المستخدم — llama3-8b-8192 (أسرع) أو llama3-70b-8192 (أذكى)
const GROQ_MODEL = "llama-3.1-8b-instant"; // ← يمكنك تغييره إلى llama3-70b-8192

// ضع رابط حسابك في Buy Me a Coffee هنا
const BMC_URL = "https://buymeacoffee.com/YOUR_USERNAME";

// ضع رابط حسابك في Ko-fi هنا
const KOFI_URL = "https://ko-fi.com/hossaine";

// ضع رابط حسابك في Patreon هنا
const PATREON_URL = "https://patreon.com/YOUR_USERNAME";

// ضع رابط PayPal Donation هنا
const PAYPAL_URL = "https://paypal.me/YOUR_USERNAME";

// ضع رابط نموذج Mailchimp للاشتراك في النشرة البريدية هنا (لاحقاً)
const MAILCHIMP_URL = "https://YOUR_MAILCHIMP_FORM_URL";

// ضع مفاتيح Stripe للمدفوعات الشهرية هنا (عند تفعيل الاشتراكات لاحقاً)
const STRIPE_PUBLISHABLE_KEY = "pk_live_YOUR_STRIPE_KEY"; // المفتاح العام فقط! لا تضع السري أبداً

// إعدادات نظام Freemium: عدد الاستخدامات المجانية يومياً
const FREE_DAILY_LIMIT = 5;

// إعدادات Rate Limiting المحلية (حماية من إغراق الطلبات)
const MIN_MS_BETWEEN_REQUESTS = 1500; // أقل مدة بين طلبين متتاليين (مللي ثانية)

/* =========================================================
   🧠 بيانات الخدمات العشر (تُعرض في الرئيسية وصفحة الخدمات)
   ========================================================= */
const SERVICES = [
  { id: "assistant-svc", icon: "🤖", title: "المساعد الذكي الشامل", desc: "محادثة ذكية تفهم العربية والإنجليزية، تحل المشاكل التقنية والقانونية والتسويقية والإدارية، استشارات فورية 24/7.", promptType: "chat" },
  { id: "generator", icon: "📝", title: "مولد المحتوى التلقائي", desc: "مقالات SEO احترافية، منشورات سوشيال ميديا، أوصاف منتجات، إيميلات تسويقية، سير ذاتية CV، وخطابات عمل وعروض أسعار.", promptType: "article" },
  { id: "design", icon: "🎨", title: "التصاميم والهوية البصرية", desc: "اقتراحات لوجوهات نصية، بوسترات، بطاقات عمل، عروض تقديمية، ولوحات ألوان وخطوط متكاملة لبراندك.", promptType: "colors" },
  { id: "business", icon: "📊", title: "محلل الأعمال الذكي", desc: "تحليل خطة عمل، دراسة جدوى مبدئية، تحليل SWOT تلقائي، اقتراحات تحسين، وتحليل المنافسين في سوقك.", promptType: "swot" },
  { id: "profiles", icon: "💼", title: "منشئ البروفايلات المهنية", desc: "بروفايل LinkedIn احترافي، بروفايل شركات، صفحات من نحن، صفحات خدمات، وصفحات هبوط كاملة جاهزة للنشر.", promptType: "landing" },
  { id: "marketing", icon: "📈", title: "مساعد التسويق الرقمي", desc: "خطة تسويقية تلقائية، استراتيجية محتوى شهرية، تحليل كلمات مفتاحية، اقتراحات إعلانات مدفوعة، وتحليل الأداء.", promptType: "marketing" },
  { id: "legal", icon: "📄", title: "المستندات القانونية والتجارية", desc: "عقود عمل، اتفاقيات سرية NDA، فواتير احترافية، عروض أسعار، وشروط وأحكام للمواقع والمتاجر.", promptType: "contract" },
  { id: "education", icon: "🎓", title: "المساعد التعليمي", desc: "شرح مفاهيم تقنية ومالية ببساطة، دورات مصغرة تلقائية، اختبارات تقييم، وشهادات إتمام قابلة للطباعة PDF.", promptType: "lesson" },
  { id: "automation", icon: "🔄", title: "أدوات الأتمتة", desc: "اقتراحات لأتمتة مهامك المتكررة، جدولة المنشورات، رسائل بريدية تلقائية، وربط أدواتك عبر Workflows.", promptType: "automation" },
  { id: "search", icon: "🔍", title: "محرك البحث الذكي", desc: "بحث متقدم في أرشيف الحلول السابقة، توصيات مخصصة لقطاعك، ومكتبة مشاكل وحلول تتوسع باستمرار.", promptType: "search" },
];

/* =========================================================
   📝 محتوى المدونة (5 مقالات SEO كاملة — تُعرض ديناميكياً)
   ========================================================= */
const BLOG_POSTS = [
  {
    slug: "ai-business-automation-2026", cat: "أتمتة", emoji: "🤖", readTime: 6, date: "2026-09-12",
    title: "كيف أتمّت أعمالك بالذكاء الاصطناعي في 2026: دليل عملي شامل",
    excerpt: "من الرد على العملاء إلى كتابة الفواتير — تعرّف على 7 مهام يمكنك تسليمها للذكاء الاصطناعي اليوم وتوفير 20 ساعة أسبوعياً.",
    body: [
      ["لماذا الأتمتة الآن؟", "لم تعد الأتمتة حكراً على الشركات الكبرى. بفضل نماذج اللغة السريعة مثل Llama 3 المستضافة على Groq، يستطيع أي صاحب متجر أو مستقل أن يوظف 'مساعداً رقمياً' يعمل 24/7 بتكلفة شبه صفرية. الفرق الحقيقي لم يعد في من يملك الموظفين، بل في من يملك الـ Workflows."],
      ["7 مهام ابدأ بأتمتتها فوراً", "1) الردود الأولى على استفسارات العملاء بنموذج مخصص لمنتجاتك.\n2) كتابة وصف المنتجات للمتاجر الإلكترونية.\n3) مسودات الفواتير وعروض الأسعار.\n4) جدول محتوى شهري لمنصات التواصل.\n5) فرز رسائل البريد الإلكتروني والرد على الشائعة.\n6) تلخيص اجتماعات الفريق في نقاط تنفيذية.\n7) تقارير أداء أسبوعية آلية."],
      ["خطة التنفيذ في 3 خطوات", "الخطوة الأولى: سجل مهامك المتكررة لمدة أسبوع وقس وقت كل منها. الخطوة الثانية: ابدأ بالمهمة الأكثر تكراراً والأقل خطورة (مثل وصف المنتجات). الخطوة الثالثة: راجع مخرجات الذكاء الاصطناعي يدوياً أول أسبوعين، ثم قلّل المراجعة تدريجياً كلما تحسنت جودة الأوامر (Prompts)."],
      ["الأخطاء الشائعة", "أكبر خطأ هو أتمتة التواصل الحساس مع العملاء الكبار — اتركه بشرياً دائماً. الخطأ الثاني: استخدام Prompt عام بدلاً من حقنه بسياق شركتك (نبرة البراند، الأسئلة المتكررة، معلومات المنتج). الجودة في السياق، ليس في النموذج."]
    ]
  },
  {
    slug: "seo-content-ai-guide", cat: "تسويق", emoji: "🔍", readTime: 7, date: "2026-08-28",
    title: "كتابة محتوى SEO بالذكاء الاصطناعي: من الصفر إلى الصفحة الأولى في Google",
    excerpt: "الطريقة الصحيحة لاستخدام AI في كتابة المقالات دون عقوبات جوجل: نية البحث، E-E-A-T، والتنسيق الاحترافي خطوة بخطوة.",
    body: [
      ["القاعدة الذهبية: جوجل يكافئ الفائدة لا المصدر", "جوجل لا يعاقب المحتوى المولّد بالذكاء الاصطناعي بذاته، بل يعاقب المحتوى منخفض القيمة (Scaled Content Abuse). لذلك مهمتك ليست 'توليد مقال' بل 'حل مشكلة الباحث'. ابدأ دائماً بتحليل نية البحث: هل يبحث عن معلومة؟ مقارنة؟ شراء؟"],
      ["هيكل المقال المتصدر", "عنوان يحتوي الكلمة المفتاحية في أول 60 حرفاً، مقدمة تجيب عن السؤال في أول فقرتين (Featured Snippet)، عناوين H2 فرعية تغطي الأسئلة المرتبطة (PAA)، جدول مقارنة عندما يناسب، وخاتمة فيها CTA واضح. أضف Schema.org من نوع Article و FAQPage لرفع نسبة الظهور."],
      ["Workflow مقترح يعمل آلياً", "1) اختر الكلمة المفتاحية وحلل أعلى 3 نتائج.\n2) اطلب من الذكاء الاصطناعي Outline يغطي فراغات المنافسين.\n3) ولّد كل قسم على حدة مع أمثلة محلية وأرقام.\n4) مرّر الناتج بمراجعة بشرية لإضافة تجربة حقيقية (E-E-A-T).\n5) انشر مع Meta Tags و Open Graph كاملين."],
      ["أدوات قياس النتائج", "تابع ترتيب الكلمات كل أسبوعين عبر Search Console، وقِس معدل التحويل من المقال وليس الزيارات فقط. المقال الناجح في 2026 هو الذي يولّد Leads، لا الذي يجمع Views."]
    ]
  },
  {
    slug: "startup-feasibility-study", cat: "أعمال", emoji: "📊", readTime: 8, date: "2026-08-10",
    title: "دراسة الجدوى لمشروع صغير: كيف تعرف إن كانت فكرتك مربحة قبل أن تخسر مالك",
    excerpt: "إطار مبسط لخمس ساعات فقط يجيبك عن السؤال الأخطر: هل مشروعي سينجح؟ مع نموذج SWOT وتحليل منافسين قابل للتكرار.",
    body: [
      ["لماذا تفشل 70% من المشاريع الصغيرة؟", "معظمها لا يفشل بسبب ضعف الفكرة، بل بسبب غياب التحقق: منتج بلا سوق مستعد للدفع. دراسة الجدوى ليست ملفاً بنكياً طويلاً — هي سلسلة تجارب صغيرة سريعة تجيب عن 3 أسئلة: هل المشكلة حقيقية؟ هل حلي أفضل؟ هل سيدفع أحد سعري؟"],
      ["تحليل SWOT في 30 دقيقة", "النقاط القوة: ما تتفوق به فعلاً (مهارة، وصول، تكلفة). الضعف: كن قاسياً — رأس المال المحدود وضعف العلامة ليس عيباً بل معلومة. الفرص: اتجاهات السوق والفجوات التي يتركها الكبار. التهديدات: منافسون محتملون، تغير الأنظمة، واعتمادك على منصة واحدة. اطلب من مساعدنا الذكي توليد SWOT مبدئي لقطاعك ثم خصصه بخبراتك."],
      ["الأرقام الدنيا التي يجب أن تعرفها", "احسب: تكلفة اكتساب العميل (CAC) = مجموع تسويق ÷ عدد العملاء الجدد. القيمة الدائمة للعميل (LTV) = متوسط الفاتورة × مرات الشراء × سنوات البقاء. القاعدة: LTV يجب أن تكون 3 أضعاف CAC على الأقل. وإن كان هامش مساهمتك لكل وحدة سلبياً فلا شيء آخر يهم."],
      ["اختبار السوق قبل الإطلاق", "لا تصنع المنتج أولاً. اصنع صفحة هبوط بعرض قيمة واضح + زر حجز، وأنفق مبلغاً بسيطاً على إعلانات مستهدفة. نسبة تحويل فوق 5% على صفحة الهبوط إشارة قوية؛ تحت 2% تعيد التفكير في العرض لا في التصميم."]
    ]
  },
  {
    slug: "personal-brand-linkedin", cat: "مهنة", emoji: "💼", readTime: 5, date: "2026-07-22",
    title: "ابنِ علامتك الشخصية على LinkedIn في 30 يوماً: خطة يومية بسيطة",
    excerpt: "من بروفايل مهمل إلى آلة فرص: العنوان، النبذة، جدول المحتوى، وكيف تستخدم AI في الكتابة دون أن تبدو آلياً.",
    body: [
      ["البروفايل هو Landing Page الخاصة بك", "صورة احترافية، عنوان بصيغة 'أساعد [من] في [ماذا] عبر [كيف]'، نبذة أولى 3 أسطر تجذب الانتباه قبل زر 'المزيد'، وخبرة مكتوبة بالإنجازات بالأرقام لا بالمسميات. خصص 20 دقيقة فقط لتحديث هذه العناصر وسترتفع ظهوراتك في نتائج البحث بشكل ملحوظ."],
      ["جدول محتوى 30 يوماً", "12 منشور خبرة عملية (ماذا تعلمت بالطريقة الصعبة)، 8 دراسات حالة قصيرة بأرقام، 5 منشورات رأي في أخبار مجالك، 3 أسئلة تفاعلية، ومنشوران شخصيان يبنيان الثقة. انتظام 4 مرات أسبوعياً أهم من الإبداع المتقطع."],
      ["استخدام AI بذكاء وبصدق", "استخدم الذكاء الاصطناعي للعصف الذهني وتحسين الصياغة، لكن الحق دائماً قصة أو رقماً حقيقياً من عملك — هذا ما يجعل المحتوى 'إنسانياً' ويمنع تأثير القوالب المكررة. راجع كل منشور واقرأه بصوت عالٍ قبل النشر."]
    ]
  },
  {
    slug: "ecommerce-product-descriptions", cat: "تجارة", emoji: "🛒", readTime: 5, date: "2026-07-05",
    title: "أوصاف منتجات تبيع: الصيغة النفسية التي تحوّل الزائر إلى مشترٍ",
    excerpt: "لماذا تفشل أوصاف المتاجر العربية؟ وكيف تكتب وصفاً يمزج المنفعة بالعاطفة والكلمات المفتاحية — بقوالب جاهزة.",
    body: [
      ["الزائر لا يشتري المنتج، يشتري نسخة أفضل من نفسه", "الفارق بين 'حقيبة جلدية 30×40 سم' و'حقيبة ترافقك من اجتماع الصباح إلى سهرة المساء دون أن تبدلها' هو الفارق بين مواصفات ومُخيَّلة. ابدأ بجملة تطرح حياة أفضل، ثم ادعمها بالمواصفات كإثبات."],
      ["الصيغة المجربة: PAS + تفاصيل حسية", "Problem (ما الذي يزعج العميل؟) → Agitate (ضاعف الألم بموقف ملموس) → Solution (منتجك هو الخلاصة). ثم أضف تفاصيل حسية: ملمس، صوت، رائحة، وزن — لأنها تفعّل 'الملكية النفسية' قبل الدفع."],
      ["SEO داخل الوصف", "الكلمة المفتاحية الرئيسية في العنوان وأول جملة، ومرادفات طبيعية في التفاصيل (بدون حشو). أضف Schema.org من نوع Product مع السعر والتوفر — فهو يظهر نجوم التقييم مباشرة في نتائج جوجل ويرفع نقراتك 30%."],
      ["قالب سريع بالذكاء الاصطناعي", "Prompt جاهز: 'اكتب وصفاً لمنتج [اسم] لجمهور [وصف الجمهور] بأسلوب [نبرة البراند]، افتح بموقف يومي مؤلم، ثم 3 منافع رئيسية، ثم مواصفات في نقاط، واختم بضمان ودعوة للشراء.' ولّد 10 نسخ واختبر أعلاها تحويلاً."]
    ]
  },
  {
    slug: "freemium-pricing-psychology", cat: "نمو", emoji: "💰", readTime: 6, date: "2026-06-18",
    title: "سيكولوجية التسعير Freemium: كيف تحول المستخدمين المجانيين إلى مشتركين يدفعون",
    excerpt: "حد الاستخدام اليومي، هندسة القيمة، ولحظة الترقية المثالية — دروس تطبيقية لمنصة تعمل بنظام Freemium فعلياً.",
    body: [
      ["لماذا Freemium يعمل؟", "النسخة المجانية تزيل حاجز التجربة وتبني عادة يومية. لكن المجاني ليس صدقة: كل استخدام مجاني هو عملية تسويق مجانية لك. الشرط الوحيد للنجاح: أن يجد المجاني قيمة كافية للعودة، ونقصاً كافياً للترقية."],
      ["هندسة حدود النسخة المجانية", "قاعدة الحد اليومي (مثل 5 استخدامات): يجب أن تسمح بإكمال مهمة حقيقية كاملة، لا أن تقطعها في المنتصف — القطع في المنتصف يولد إحباطاً، والنقص بعد الإشباع يولد رغبة ترقية. ضع زر الترقية يظهر لحظة الوصول للحد، وليس قبلها."],
      ["ثلاث طبقات سعرية تكفي", "طبقة دخول منخفضة (9$) تزيل قراراً كبيراً من الطريق، طبقة وسطى (29$) مصممة لتبدو 'الصفقة الذكية' بجانب الأعلى، وطبقة مؤسسات (99$+) تجعل الوسطى معقولة. أظهر الطبقة الوسطى كموصى بها دائماً — هذا يرفع متوسط الإيراد لكل مستخدم."]
    ]
  }
];

/* =========================================================
   ❓ الأسئلة الشائعة (FAQ)
   ========================================================= */
const FAQS = [
  { q: "هل المنصة مجانية فعلاً؟", a: "نعم! يمكنك استخدام المساعد الذكي والأدوات مجاناً بواقع 5 استخدامات يومياً بدون بطاقة بنكية. الاشتراكات المدفوعة اختيارية تماماً وتفتح استخدامات غير محدودة وميزات إضافية." },
  { q: "ما هو Groq API ولماذا تستخدمونه؟", a: "Groq منصة تشغيل ذكاء اصطناعي فائقة السرعة (توليد النص بسرعة آلاف الكلمات في الثانية). نستخدمها لتشغيل نماذج Llama 3، مما يعني حلولاً تصلك خلال ثوانٍ معدودة." },
  { q: "هل الحلول المقدمة دقيقة وموثوقة؟", a: "الذكاء الاصطناعي يقدم حلولاً احترافية مبنية على كمّ هائل من المعرفة، لكنها تبقى إرشادية. للمستندات القانونية والمالية الكبيرة ننصح دائماً بمراجعة مختص بشري قبل الاعتماد النهائي." },
  { q: "هل بياناتي محفوظة؟ مع من تشاركونها؟", a: "محادثاتك تُحفظ محلياً في متصفحك (LocalStorage) فقط — لا نرفعها لأي خادم. طلبات API تذهب مباشرة إلى Groq لمعالجتها، ولا نبيع بياناتك لأي جهة إطلاقاً." },
  { q: "كيف يتم الدفع في الباقات المدفوعة؟", a: "عبر Stripe أو PayPal بطرق دفع آمنة ومشفرة (HTTPS). يمكنك إلغاء اشتراكك في أي لحظة بدون رسوم إلغاء." },
  { q: "هل يمكن استخدام المنصة من الهاتف؟", a: "بالتأكيد. المنصة متجاوبة 100% مع جميع الشاشات، ويمكنك أيضاً تثبيتها كتطبيق PWA على شاشة هاتفك للعمل بوضع شبه متصل." },
  { q: "هل تدعم المنصة اللغة الإنجليزية؟", a: "نعم — المحرك يفهم العربية والإنجليزية معاً، ويمكنك التبديل بين واجهة عربية (RTL) وإنجليزية (LTR) بضغطة زر." },
  { q: "ماذا لو تجاوزت الـ 5 استخدامات اليومية؟", a: "يمكنك الانتظار حتى منتصف الليل (بتوقيت جهازك) ليتجدد رصيدك المجاني تلقائياً، أو الترقية لأي باقة مدفوعة للحصول على استخدام غير محدود فوراً." },
  { q: "هل يمكنني استخدام النصوص المولّدة تجارياً؟", a: "نعم، كل ما تنتجه المنصة ملكك بالكامل ويمكنك استخدامه تجارياً في موقعك وإعلاناتك ومتجرك دون قيود." },
  { q: "كيف أدعم المنصة دون اشتراك؟", a: "عبر أزرار Buy Me a Coffee وKo-fi وPatreon وPayPal في قسم 'ادعم المنصة'، أو باستخدام روابط الأدوات الموصى بها (تسويق بالعمولة) — كلها تدعم استمرار الخدمة مجانيتها للجميع." },
  { q: "هل تقدمون حلولاً مخصصة للشركات؟", a: "باقة الشركات (99$/شهر) تشمل حسابات متعددة للفريق، تقارير أداء، مدير حساب مخصص، واتفاقية مستوى خدمة SLA. تواصل معنا لعرض مخصص أكبر." },
];

/* =========================================================
   💬 System Prompts لكل نوع خدمة — وجّه النموذج ليحل المشكلة تلقائياً
   ========================================================= */
const SYSTEM_PROMPTS = {
  chat: "أنت 'عقلك الرقمي'، مساعد أعمال ذكي عربي. قدّم حلاً عملياً منظماً (خطوات numbered) لأي مشكلة تقنية أو قانونية أو تسويقية أو إدارية. أجب بنفس لغة سؤال المستخدم (عربية أو إنجليزية). كن مختصراً ومفيداً.",
  article: "أنت كاتب محتوى SEO محترف. اكتب مقالاً عربياً كاملاً عن الموضوع المطلوب: عنوان جذاب، مقدمة قوية، عناوين H2 فرعية، نقاط عملية، وخاتمة مع دعوة لاتخاذ إجراء. طول مناسب 500-700 كلمة.",
  social: "أنت خبير سوشيال ميديا. اكتب 3 منشورات جذابة عن الموضوع المعطى: واحد لفيسبوك/انستغرام بانبعاثات وإيموجي، واحد تويتر/X قصير، واحد LinkedIn مهني. أضف هاشتاقات عربية مناسبة لكل منشور.",
  swot: "أنت محلل أعمال استراتيجي. قدّم تحليلاً كاملاً: SWOT (نقاط قوة/ضعف/فرص/تهديدات) ثم 5 توصيات عملية مرتبة بالأولوية ثم ملخص تنفيذي من 3 أسطر.",
  colors: "أنت مدير إبداع (Creative Director). اقترح هوية بصرية: 3 لوحات ألوان (بالhex مع أسماء عربية واستخدامات)، خطوط عربية وإنجليزية مقترحة، فكرة شعار نصية، وأسلوب صور مناسب للبراند.",
  landing: "أنت خبير تحويل وتسويق. ابنِ صفحة هبوط كاملة نصياً: Hero بعنوان ووصف وCTA، 3 مميزات، شهادة عملاء مقترحة، أسئلة شائعة، وخاتمة CTA — بصيغة Markdown جاهزة للنشر.",
  contract: "أنت مساعد قانوني. اكتب مسودة مستند احترافية منظمة بالبنود والعناوين مع فراغات [بين أقواس] للتخصيص، وأضف تنبيهاً في النهاية بأن الوثيقة تحتاج مراجعة محامٍ.",
  lesson: "أنت معلم صبور. اشرح المفهوم المبين على 3 مستويات (مبسّط، متوسط، متقدم) ثم مثال تطبيقي ثم 3 أسئلة اختبار مع إجاباتها في النهاية.",
  marketing: "أنت مدير تسويق رقمي. قدم خطة لشهر كامل: أهداف SMART، جمهور مستهدف، قنوات مع ميزانية نسبية، تقويم محتوى أسبوعي، أفكار إعلانات، وKPIs للقياس.",
  automation: "أنت خبير أتمتة. حلل المهمة المتكررة الموصوفة واقترح Workflow عملياً بأدوات مجانية/رخيصة (Zapier, Make, cron…) مع خطوات إعداد مرتبة وتقدير الوقتوفير.",
  profile: "أنت خبير علامة شخصية. أنشئ البروفايل المطلوب كاملاً: عنوان، نبذة، خبرات بصيغة إنجازات رقمية، مهارات، ودعوة تواصل — بصيغة جاهزة للنسخ المباشر.",
  search: "أنت محرك معرفة. اعرض حلولاً سابقة مشابهة للمشكلة المطروحة في نقاط، مع توصية مخصصة وخطوات تنفيذ فورية.",
};

/* =========================================================
   🔐 أدوات مساعدة عامة (Validation / Sanitize / Utils)
   ========================================================= */

// تنظيف المدخلات من HTML لمنع XSS (Input Validation + Security)
function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// إشعار Toast سريع
function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3200);
}

// إعادة Lucide Icons بعد أي حقن DOM جديد
function refreshIcons() {
  if (window.lucide && lucide.createIcons) lucide.createIcons();
}

/* =========================================================
   📊 نظام عداد الاستخدامات اليومي (Freemium) — LocalStorage
   ========================================================= */
const QuotaManager = {
  KEY: "dm_daily_quota",
  _today() { return new Date().toISOString().slice(0, 10); },
  get() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY));
      if (!d || d.date !== this._today()) return { date: this._today(), used: 0 };
      return d;
    } catch { return { date: this._today(), used: 0 }; }
  },
  canUse() { return this.get().used < FREE_DAILY_LIMIT; },
  consume() {
    const d = this.get(); d.used++; localStorage.setItem(this.KEY, JSON.stringify(d));
    this.renderBadge();
  },
  remaining() { return Math.max(0, FREE_DAILY_LIMIT - this.get().used); },
  renderBadge() {
    const badge = document.getElementById("quotaBadge");
    if (!badge) return;
    const rem = this.remaining();
    badge.textContent = rem > 0 ? `${rem} محاولات مجانية اليوم` : "الرصيد المجاني انتهى 😔 — قم بالترقية";
    badge.classList.toggle("exhausted", rem === 0);
  }
};

/* =========================================================
   💾 حفظ واسترجاع المحادثات + أرشيف الحلول (LocalStorage)
   ========================================================= */
const Storage = {
  CHAT_KEY: "dm_chat_history",
  ARCHIVE_KEY: "dm_solution_archive",
  loadChat() { try { return JSON.parse(localStorage.getItem(this.CHAT_KEY)) || []; } catch { return []; } },
  saveChat(msgs) { localStorage.setItem(this.CHAT_KEY, JSON.stringify(msgs.slice(-60))); },
  clearChat() { localStorage.removeItem(this.CHAT_KEY); },
  // أرشيف المشاكل والحلول — يغذي محرك البحث الذكي
  archive(entry) {
    const list = this.loadArchive();
    list.unshift({ ...entry, at: Date.now() });
    localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(list.slice(0, 100)));
  },
  loadArchive() { try { return JSON.parse(localStorage.getItem(this.ARCHIVE_KEY)) || []; } catch { return []; } },
};

/* =========================================================
   ⚡ التكامل مع Groq API — قلب المنصة الآلي
   ========================================================= */
let _lastRequestAt = 0; // للحماية المحلية من إغراق الطلبات (Rate Limiting)

async function callGroq(userPrompt, promptType = "chat", history = []) {
  // 1) حماية Rate Limiting: منع أكثر من طلب كل فترة محددة
  const now = Date.now();
  if (now - _lastRequestAt < MIN_MS_BETWEEN_REQUESTS) {
    throw new Error("انتظر لحظة من فضلك… طلباتك سريعة جداً ⏳");
  }
  _lastRequestAt = now;

  // 2) التحقق من إدخال المفتاح (حتى لا تظهر أخطاء غريبة للمستخدم)
  if (GROQ_API_KEY === "YOUR_GROQ_API_KEY_HERE") {
    throw new Error("⚠️ لم يتم ضبط مفتاح Groq API بعد! افتح script.js وضع مفتاحك مكان YOUR_GROQ_API_KEY_HERE");
  }

  // 3) بناء الرسائل: System Prompt الخاص بالخدمة + تاريخ المحادثة + السؤال الجديد
  const messages = [
    { role: "system", content: SYSTEM_PROMPTS[promptType] || SYSTEM_PROMPTS.chat },
    ...history.slice(-8), // آخر 8 رسائل فقط للحفاظ على سرعة الاستجابة
    { role: "user", content: userPrompt },
  ];

  // 4) استدعاء Groq عبر Fetch API
  const res = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  // 5) معالجة الأخطاء بدقة حسب رمز الحالة
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const detail = errBody?.error?.message || "";
    if (res.status === 401) throw new Error("مفتاح API غير صالح — تحقق منه في console.groq.com 🔑");
    if (res.status === 429) throw new Error("وصلت لحد Groq المجاني المؤقت — أعد المحاولة بعد دقيقة 🕐");
    throw new Error(`خطأ من الخدمة (${res.status}) ${detail}`);
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) throw new Error("لم يصل رد من النموذج — حاول مجدداً 🔁");
  return reply.trim();
}

/* =========================================================
   🤖 منطق الشات بوت (المساعد الذكي)
   ========================================================= */
function initChatbot() {
  const form = document.getElementById("chatForm");
  const box = document.getElementById("chatMessages");
  const input = document.getElementById("chatInput");
  if (!form || !box || !input) return;

  // استرجاع المحادثة المحفوظة عند فتح الصفحة (تجاهل رسالة الترحيب الافتراضية المخزنة)
  const saved = Storage.loadChat().filter(m => m.content && !m.content.startsWith("مرحباً! 👋"));
  if (saved.length) {
    saved.forEach(m => appendMessage(m.role, m.content, false));
  }

  function appendMessage(role, text, persist = true) {
    const wrap = document.createElement("div");
    wrap.className = `msg ${role === "user" ? "msg-user" : "msg-ai"}`;
    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text; // textContent = حماية من XSS
    wrap.appendChild(bubble);
    box.appendChild(wrap);
    box.scrollTop = box.scrollHeight;
    if (persist) {
      const hist = Storage.loadChat();
      hist.push({ role, content: text });
      Storage.saveChat(hist);
    }
    return wrap;
  }

  function showTyping() {
    const w = document.createElement("div");
    w.className = "msg msg-ai"; w.id = "typingRow";
    w.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    box.appendChild(w); box.scrollTop = box.scrollHeight;
  }

  async function send(text) {
    const clean = sanitize(text).slice(0, 2000);
    if (!clean.trim()) return;

    // فحص الرصيد المجاني اليومي (Freemium Counter)
    if (!QuotaManager.canUse()) {
      showToast("انتهت استخداماتك المجانية اليوم — عد غدًا أو اشترِ باقة 💎");
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    appendMessage("user", clean);
    input.value = "";
    input.style.height = "auto";
    showTyping();
    QuotaManager.consume();

    try {
      const history = Storage.loadChat().slice(0, -1); // كل ما عدا الرسالة الحالية
      const reply = await callGroq(clean, "chat", history);
      document.getElementById("typingRow")?.remove();
      appendMessage("assistant", reply);
      Storage.archive({ type: "chat", question: clean, answer: reply });
    } catch (err) {
      document.getElementById("typingRow")?.remove();
      appendMessage("assistant", "❌ " + err.message + "\n\nحاول مرة أخرى بعد لحظات.");
    }
  }

  form.addEventListener("submit", e => { e.preventDefault(); send(input.value); });

  // Enter = إرسال | Shift+Enter = سطر جديد
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input.value); }
  });

  // توسيع تلقائي لمربع النص
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 130) + "px";
  });

  // مسح المحادثة
  document.getElementById("clearChatBtn")?.addEventListener("click", () => {
    Storage.clearChat();
    box.querySelectorAll(".msg").forEach(m => m.remove());
    appendMessage("assistant", "تم مسح المحادثة 🧹 اسألني عن أي شيء جديد!");
  });

  // ربط شريط البحث في الـ Hero بالشات
  document.getElementById("heroSearchForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const v = document.getElementById("heroSearchInput").value;
    if (v.trim()) {
      document.getElementById("assistant").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => send(v), 600);
    }
  });
}

/* =========================================================
   🧪 العروض الحية (Live Demos) — مقال/سوشيال/SWOT/ألوان
   ========================================================= */
function initDemos() {
  const tabs = document.querySelectorAll(".demo-tab");
  const form = document.getElementById("demoForm");
  const input = document.getElementById("demoInput");
  const output = document.getElementById("demoOutput");
  const runBtn = document.getElementById("demoRunBtn");
  const copyBtn = document.getElementById("copyDemoBtn");
  const shareRow = document.getElementById("demoShareRow");
  if (!form || !output) return;

  let activeDemo = "article";
  const placeholders = {
    article: "مثال: أفضل 10 أفكار مشاريع صغيرة في 2026",
    social: "مثال: إطلاق قهوة مختصة جديدة بالرياض",
    swot: "مثال: تطبيق توصيل طعام محلي",
    colors: "مثال: براند ملابس رياضية نسائية",
  };

  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeDemo = tab.dataset.demo;
    input.placeholder = placeholders[activeDemo];
  }));

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const topic = sanitize(input.value).trim();
    if (!topic) return;

    if (!QuotaManager.canUse()) {
      showToast("انتهت استخداماتك المجانية اليوم — عد غدًا أو اشترِ باقة 💎");
      return;
    }

    runBtn.disabled = true;
    runBtn.textContent = "جارٍ التوليد… ⚡";
    output.innerHTML = '<div class="shimmer" style="height:100px">…</div>';
    QuotaManager.consume();

    try {
      const result = await callGroq(topic, activeDemo, []);
      output.textContent = result;
      Storage.archive({ type: activeDemo, question: topic, answer: result });
      copyBtn.hidden = false;
      shareRow.hidden = false;
      refreshIcons();
    } catch (err) {
      output.textContent = "❌ " + err.message;
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = "شغّل العرض ⚡";
    }
  });

  // نسخ النتيجة
  copyBtn?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.textContent);
    showToast("✅ تم نسخ النتيجة!");
  });

  // مشاركة سوشيال ميديا للنتيجة
  shareRow?.querySelectorAll(".share-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const net = btn.dataset.network;
      const text = encodeURIComponent(output.textContent.slice(0, 200) + "… — عبر عقلك الرقمي");
      const url = encodeURIComponent(location.href);
      const links = {
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      };
      window.open(links[net], "_blank", "width=600,height=500");
    });
  });
}

/* =========================================================
   🗂️ توليد بطاقات الخدمات (الرئيسية + صفحة الخدمات)
   ========================================================= */
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map((s, i) => `
    <article class="service-card glass reveal" style="transition-delay:${i * 40}ms" id="${s.id}">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <a href="${location.pathname.includes('services') ? '#tool-' + s.id : 'index.html#assistant'}" class="btn btn-ghost btn-sm">جرّب الآن ✨</a>
    </article>`).join("");
  refreshIcons();
}

/* =========================================================
   🛠️ مولّد الخدمات التفاعلي (صفحة services.html)
   ========================================================= */
function initServiceTools() {
  const mount = document.getElementById("serviceTools");
  if (!mount) return;

  // بناء أداة تفاعلية لكل نوع خدمة
  const toolDefs = [
    { id: "generator", title: "📝 مولّد المحتوى", type: "article", label: "موضوع المقال / المنتج / البريد:", sample: "اكتب وصف منتج سماعات بلوتوث رياضية" },
    { id: "design", title: "🎨 مستشار الهوية البصرية", type: "colors", label: "صف براندك (الاسم + المجال + الجمهور):", sample: "براند عطور شرقية فاخرة للشباب" },
    { id: "business", title: "📊 محلل الأعمال", type: "swot", label: "صف مشروعك أو الصق خطة عملك:", sample: "مغسلة سيارات متنقلة في جدة" },
    { id: "profiles", title: "💼 منشئ البروفايلات", type: "profile", label: "اسمك + تخصصك + أبرز خبراتك:", sample: "محمد أحمد — محاسب — 5 سنوات في الشركات الناشئة" },
    { id: "marketing", title: "📈 مساعد التسويق", type: "marketing", label: "نشاطك + هدفك التسويقي هذا الشهر:", sample: "متجر ورود — أريد مضاعفة الطلبات في عيد الحب" },
    { id: "legal", title: "📄 مولّد المستندات", type: "contract", label: "نوع المستند وأطرافه وتفاصيله:", sample: "عقد عمل لمصمم جرافيك بدوام جزئي براتب 3000 ريال" },
    { id: "education", title: "🎓 المساعد التعليمي", type: "lesson", label: "ما المفهوم الذي تريد فهمه؟", sample: "شرح مفهوم التضخم وكيفية تأثيره على تسعير منتجي" },
    { id: "automation", title: "🔄 مستشار الأتمتة", type: "automation", label: "صف المهمة المتكررة التي تستهلك وقتك:", sample: "أرد يدوياً على 30 رسالة إنستغرام يومياً بنفس الأسئلة" },
  ];

  mount.innerHTML = toolDefs.map(t => `
    <section class="service-tool glass" id="tool-${t.id}">
      <h3>${t.title}</h3>
      <p class="st-desc">${SERVICES.find(s => s.id === t.id)?.desc || ""}</p>
      <textarea class="st-input" rows="3" placeholder="${t.sample}" maxlength="2000" aria-label="${t.label}"></textarea>
      <div class="st-row">
        <button class="btn btn-gradient st-run" data-type="${t.type}">ولّد الحل ⚡</button>
        <button class="btn btn-ghost btn-sm st-copy" hidden>📋 نسخ</button>
        <span class="st-price">💵 ضمن الباقة المدفوعة: $1–$10/عملية</span>
      </div>
      <pre class="st-output" hidden></pre>
    </section>`).join("");

  // ربط الأحداث لكل أداة
  mount.querySelectorAll(".service-tool").forEach(card => {
    const runBtn = card.querySelector(".st-run");
    const input = card.querySelector(".st-input");
    const out = card.querySelector(".st-output");
    const copyBtn = card.querySelector(".st-copy");

    runBtn.addEventListener("click", async () => {
      const val = sanitize(input.value).trim();
      if (!val) { showToast("اكتب وصف طلبك أولاً ✍️"); return; }
      if (!QuotaManager.canUse()) { showToast("انتهت الاستخدامات المجانية اليوم 💎"); return; }

      runBtn.disabled = true; runBtn.textContent = "جارٍ العمل…";
      out.hidden = false; out.textContent = ""; out.classList.add("shimmer");
      QuotaManager.consume();
      try {
        const res = await callGroq(val, runBtn.dataset.type, []);
        out.classList.remove("shimmer"); out.textContent = res;
        copyBtn.hidden = false;
        Storage.archive({ type: runBtn.dataset.type, question: val, answer: res });
      } catch (err) {
        out.classList.remove("shimmer"); out.textContent = "❌ " + err.message;
      } finally { runBtn.disabled = false; runBtn.textContent = "ولّد الحل ⚡"; }
    });

    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(out.textContent);
      showToast("✅ تم النسخ!");
    });
  });
}

/* =========================================================
   🔍 محرك البحث الذكي (في أرشيف الحلول المحلية)
   ========================================================= */
function initSmartSearch() {
  const searchBox = document.getElementById("archiveSearch");
  const resultsEl = document.getElementById("archiveResults");
  if (!searchBox || !resultsEl) return;

  function renderResults(query) {
    const archive = Storage.loadArchive();
    const q = query.trim().toLowerCase();
    const found = q
      ? archive.filter(a => (a.question + " " + a.answer).toLowerCase().includes(q))
      : archive;
    if (!found.length) {
      resultsEl.innerHTML = `<p class="empty-note">🔍 لا توجد نتائج في أرشيفك بعد. جرّب إحدى الأدوات أعلاه وستُحفظ حلولك هنا تلقائياً!</p>`;
      return;
    }
    resultsEl.innerHTML = found.slice(0, 10).map(a => `
      <div class="archive-item glass">
        <small>🗂️ ${a.type} • ${new Date(a.at).toLocaleDateString("ar")}</small>
        <strong>${sanitize(a.question).slice(0, 90)}</strong>
        <p>${sanitize(a.answer).slice(0, 160)}…</p>
      </div>`).join("");
  }

  searchBox.addEventListener("input", () => renderResults(searchBox.value));
  renderResults("");
}

/* =========================================================
   📰 المدونة: عرض البطاقات + فتح المقال + بحث + تصفية
   ========================================================= */
function renderBlogCards(containerId, limit = 0) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  el.innerHTML = posts.map(p => `
    <a class="blog-card glass reveal" href="blog.html#${p.slug}">
      <div class="blog-cover" style="background:linear-gradient(135deg,#2563eb,#7c3aed)">${p.emoji}</div>
      <div class="blog-body">
        <div class="blog-meta"><span class="blog-cat">${p.cat}</span><span>${p.date}</span></div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <span class="read-time">⏱️ ${p.readTime} دقائق قراءة</span>
      </div>
    </a>`).join("");
}

function initBlogPage() {
  const listEl = document.getElementById("blogList");
  if (!listEl) return;
  const search = document.getElementById("blogSearch");
  const filters = document.querySelectorAll(".filter-chip");
  let activeCat = "all";

  function draw() {
    const q = (search?.value || "").trim().toLowerCase();
    const filtered = BLOG_POSTS.filter(p =>
      (activeCat === "all" || p.cat === activeCat) &&
      (!q || (p.title + p.excerpt).toLowerCase().includes(q))
    );
    listEl.innerHTML = filtered.length ? filtered.map(p => `
      <article class="blog-card glass" data-slug="${p.slug}" tabindex="0" role="button" aria-label="اقرأ: ${p.title}">
        <div class="blog-cover" style="background:linear-gradient(135deg,#2563eb,#7c3aed)">${p.emoji}</div>
        <div class="blog-body">
          <div class="blog-meta"><span class="blog-cat">${p.cat}</span><span>${p.date}</span></div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <span class="read-time">⏱️ ${p.readTime} دقائق</span>
        </div>
      </article>`).join("")
      : '<p class="empty-note center-row">لا توجد مقالات مطابقة 🔍</p>';
  }

  // فتح المقال عند النقر (SPA-style داخل نفس الصفحة)
  listEl.addEventListener("click", e => {
    const card = e.target.closest(".blog-card[data-slug]");
    if (card) openArticle(card.dataset.slug);
  });
  listEl.addEventListener("keydown", e => {
    if (e.key === "Enter") { const c = e.target.closest(".blog-card[data-slug]"); if (c) openArticle(c.dataset.slug); }
  });

  function openArticle(slug) {
    const p = BLOG_POSTS.find(x => x.slug === slug);
    if (!p) return;
    location.hash = slug;
    document.getElementById("blogIndex").hidden = true;
    const art = document.getElementById("blogArticle");
    art.hidden = false;
    art.innerHTML = `
      <div class="article-shell glass" style="padding:2.4rem">
        <button class="btn btn-ghost btn-sm back-btn">← رجوع للمقالات</button>
        <div class="blog-meta" style="margin:1rem 0"><span class="blog-cat">${p.cat}</span><span>${p.date}</span><span>⏱️ ${p.readTime} دقائق</span></div>
        <h1>${p.title}</h1>
        <p><em>${p.excerpt}</em></p>
        ${p.body.map(([h, txt]) => `<h2>${h}</h2><p>${txt.replaceAll("\n", "<br>")}</p>`).join("")}
        <hr style="border-color:var(--border);margin:2rem 0">
        <div class="share-row">
          <span>شارك المقال:</span>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" class="share-btn">𝕏</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" class="share-btn">in</a>
          <a href="https://wa.me/?text=${encodeURIComponent(p.title + " " + location.href)}" target="_blank" rel="noopener" class="share-btn">واتساب</a>
        </div>
      </div>`;
    art.querySelector(".back-btn").addEventListener("click", () => {
      art.hidden = true; document.getElementById("blogIndex").hidden = false;
      history.replaceState(null, "", "blog.html");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  search?.addEventListener("input", draw);
  filters.forEach(f => f.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    f.classList.add("active");
    activeCat = f.dataset.cat;
    draw();
  }));

  draw();
  // دعم الروابط المباشرة blog.html#slug
  if (location.hash.length > 1) openArticle(location.hash.slice(1));
}

/* =========================================================
   ❓ بناء قسم الأسئلة الشائعة (Accordion)
   ========================================================= */
function renderFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item glass">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${f.q}</span>
        <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region"><p>${f.a}</p></div>
    </div>`).join("");

  list.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const ans = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("open");
      // إغلاق الباقي (سلوك Accordion كلاسيكي)
      list.querySelectorAll(".faq-item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* =========================================================
   🧮 العداد الحيّ Animated Counters
   ========================================================= */
function initCounters() {
  const nums = document.querySelectorAll(".stat-number");
  if (!nums.length) return;
  const animate = el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const dur = 1800, start = performance.now();
    const tick = t => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString("en") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
  }), { threshold: .6 });
  nums.forEach(n => io.observe(n));
}

/* =========================================================
   ✨ خلفية الجسيمات المتحركة (Particles Canvas)
   ========================================================= */
function initParticles() {
  const canvas = document.getElementById("particlesCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, pts = [];
  const COLORS = ["#2563eb", "#7c3aed", "#fbbf24"];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function seed() {
    pts = Array.from({ length: Math.min(60, Math.floor(W / 22)) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
      r: Math.random() * 2.4 + 1, c: COLORS[Math.floor(Math.random() * 3)],
    }));
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = p.c; ctx.globalAlpha = .5; ctx.fill();
    });
    // وصلات بين النقاط المتقاربة (تأثير الشبكة العصبية)
    ctx.globalAlpha = .12; ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      if (dx * dx + dy * dy < 12000) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = "#7c3aed"; ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  resize(); seed(); frame();
  addEventListener("resize", () => { resize(); seed(); });
}

/* =========================================================
   🌗 الوضع الليلي + 🌍 تبديل اللغة + 📱 القائمة
   ========================================================= */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const saved = localStorage.getItem("dm_theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
  btn.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("dm_theme", "light"); }
    else { document.documentElement.setAttribute("data-theme", "dark"); localStorage.setItem("dm_theme", "dark"); }
    showToast(dark ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي");
  });
}

// ترجمة عناصر الواجهة الأساسية (EN ⇄ AR) — نموذج دعم لغات خفيف
const I18N = {
  en: { "nav.home": "Home", "nav.services": "Services", "nav.pricing": "Pricing", "nav.blog": "Blog", "nav.about": "About", "nav.contact": "Contact" },
  ar: { "nav.home": "الرئيسية", "nav.services": "الخدمات", "nav.pricing": "التسعير", "nav.blog": "المدونة", "nav.about": "عن المنصة", "nav.contact": "تواصل معنا" },
};
function initLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const html = document.documentElement;
    const toEn = html.lang === "ar";
    html.lang = toEn ? "en" : "ar";
    html.dir = toEn ? "ltr" : "rtl";
    btn.textContent = toEn ? "EN" : "AR";
    localStorage.setItem("dm_lang", html.lang);
    // ترجمة روابط التنقل
    const map = I18N[html.lang];
    document.querySelectorAll(".nav-links a").forEach((a, i) => {
      const key = ["nav.home", "nav.services", "nav.pricing", "nav.blog", "nav.about", "nav.contact"][i];
      if (map[key]) a.textContent = map[key];
    });
    showToast(toEn ? "Switched to English 🇬🇧" : "تم التبديل إلى العربية 🇸🇦");
  });
  // استرجاع اللغة المحفوظة
  const saved = localStorage.getItem("dm_lang");
  if (saved === "en") btn.click();
}

function initMobileNav() {
  const burger = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    links.classList.toggle("open");
    burger.classList.toggle("open");
    burger.setAttribute("aria-expanded", links.classList.contains("open"));
  });
  links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); burger.classList.remove("open"); } });
}

/* =========================================================
   📜 سلوكيات عامة: Header Scroll / Reveal / BackToTop / Year
   ========================================================= */
function initScrollBehaviors() {
  const header = document.getElementById("siteHeader");
  const btt = document.getElementById("backToTop");
  addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", scrollY > 24);
    btt?.classList.toggle("visible", scrollY > 600);
  }, { passive: true });
  btt?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  // ظهور العناصر عند التمرير (Reveal on Scroll)
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // السنة التلقائية في الفوتر
  const y = document.getElementById("yearNow");
  if (y) y.textContent = new Date().getFullYear();

  // تعبئة شريط تقدم الهدف (Support Section)
  const fill = document.getElementById("goalFill");
  if (fill) setTimeout(() => fill.style.width = "64%", 400); // 640$ من 1000$ — Placeholder
}

/* =========================================================
   📬 النشرة البريدية + نموذج الاتصال
   ========================================================= */
function initForms() {
  // النشرة البريدية (Mailchimp Placeholder)
  document.getElementById("newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const msg = document.getElementById("newsletterMsg");
    if (!isValidEmail(input.value)) { msg.textContent = "⚠️ بريد غير صحيح"; msg.style.color = "#f87171"; return; }
    // TODO: عند ربط Mailchimp استخدم MAILCHIMP_URL أعلاه عبر fetch POST
    msg.textContent = "✅ تم تسجيلك! تفقد بريدك للتأكيد.";
    msg.style.color = "#34d399";
    input.value = "";
    showToast("📬 شكراً لاشتراكك في النشرة!");
  });

  // نموذج صفحة الاتصال — تحقق كامل ثم إرسال (Placeholder endpoint)
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", async e => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value;
    const message = contactForm.message.value.trim();
    const errors = {};

    if (name.length < 2) errors.name = "الاسم قصير جداً";
    if (!isValidEmail(email)) errors.email = "البريد الإلكتروني غير صحيح";
    if (message.length < 10) errors.message = "اكتب رسالة أوضح (10 أحرف على الأقل)";

    contactForm.querySelectorAll(".field-error").forEach(el => el.textContent = "");
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([k, v]) => {
        const el = contactForm.querySelector(`[data-error="${k}"]`);
        if (el) el.textContent = v;
      });
      return;
    }

    const submitBtn = contactForm.querySelector("button[type=submit]");
    submitBtn.disabled = true; submitBtn.textContent = "جارٍ الإرسال…";
    try {
      // ضع نقطة استقبال رسائلك هنا (Formspree / EmailJS / Backend URL)
      // await fetch("YOUR_FORM_ENDPOINT", { method: "POST", body: new FormData(contactForm) });
      await new Promise(r => setTimeout(r, 900)); // محاكاة نجاح مؤقتة
      contactForm.innerHTML = `<div class="form-success">✅ وصلت رسالتك! سنرد عليك خلال 24 ساعة.</div>`;
    } catch {
      submitBtn.disabled = false; submitBtn.textContent = "أرسل الرسالة 📨";
      showToast("تعذر الإرسال — حاول مجدداً");
    }
  });
}

/* =========================================================
   💛 أزرار الدعم (BMC / Ko-fi / Patreon / PayPal)
   ========================================================= */
function initSupportButtons() {
  document.getElementById("bmcBtn")?.setAttribute("href", BMC_URL);
  document.getElementById("kofiBtn")?.setAttribute("href", KOFI_URL);
  document.getElementById("patreonBtn")?.setAttribute("href", PATREON_URL);
  document.getElementById("paypalBtn")?.setAttribute("href", PAYPAL_URL);
}

/* =========================================================
   💳 أزرار الاشتراك (Stripe — Placeholder للربط لاحقاً)
   ========================================================= */
function initCheckoutButtons() {
  document.querySelectorAll("[data-plan]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const plan = btn.dataset.plan;
      // TODO: وجّه المستخدم لصفحة Checkout لدى Stripe:
      // location.href = `https://buy.stripe.com/YOUR_CHECKOUT_LINK_${plan}`;
      showToast(`💎 اخترت باقة "${plan}" — سيتم تحويلك للدفع الآمن (يتطلب ربط Stripe)`);
    });
  });
}

/* =========================================================
   📱 PWA: تسجيل Service Worker (تثبيت التطبيق + Cache)
   ========================================================= */
function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("✅ PWA Service Worker active"))
      .catch(err => console.warn("SW registration failed:", err));
  }
}

/* =========================================================
   🚀 الإقلاع: تهيئة كل الوحدات حسب الصفحة الحالية
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  refreshIcons();                 // الأيقونات
  initMobileNav();                // قائمة الموبايل
  initThemeToggle();              // الوضع الليلي
  initLangToggle();               // تبديل اللغة
  initScrollBehaviors();          // سلوكيات التمرير
  initSupportButtons();           // روابط التبرعات
  initCheckoutButtons();          // أزرار الاشتراك
  initForms();                    // النماذج
  renderFAQ();                    // الأسئلة الشائعة (Accordion)
  QuotaManager.renderBadge();     // شارة الرصيد المجاني

  renderServices();               // شبكة الخدمات
  initChatbot();                  // المساعد الذكي
  initDemos();                    // العروض الحية
  initServiceTools();             // أدوات صفحة الخدمات
  initSmartSearch();              // محرك البحث في الأرشيف
  renderBlogCards("blogPreviewGrid", 3); // 3 مقالات في الرئيسية
  initBlogPage();                 // صفحة المدونة الكاملة
  initCounters();                 // العدادات الحية
  initParticles();                // خلفية الجسيمات
  registerSW();                   // PWA
});
