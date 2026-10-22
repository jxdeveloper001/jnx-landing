export const GLITCH_INTERVAL_MS = 12000;
export const GLITCH_DURATION_MS = 850;

/** All editable copy lives here. */
export const content = {
  brand: 'JNX',
  nav: {
    glitch: {
      intervalMs: GLITCH_INTERVAL_MS,
      durationMs: GLITCH_DURATION_MS,
    },
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Service', href: '#service' },
      { label: 'Our Works', href: '#our-works' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    lines: [['Build', 'Your', 'Brand'], ['But', 'In', 'A'], ['Good', 'Way!']],
    sub: 'JNX turns scattered ideas into a brand people remember, with tools, guides and a community that keep you moving.',
    cta: 'Get Started',
    phone: {
      title: 'Create Your Own Story.',
      recommended: ['Brand Kit', 'Launch Plan'],
      schedule: 'My Schedule',
      scheduleSub: 'Brand review, 10:30 AM',
      scheduleBtn: 'Open',
    },
  },
  stats: [
    { value: 10, suffix: '', decimals: 0, label: 'Years of Experience' },
    { value: 1, suffix: 'K+', decimals: 0, label: 'Projects' },
    { value: 8, suffix: 'K', decimals: 0, label: 'Happy Customers' },
    { value: 4.2, suffix: '', decimals: 1, label: 'Overall Rating' },
  ],
  services: {
    title: 'Meet Our Services',
    subtitle: 'Everything your brand needs to look sharp and grow online, built by people who care about the details.',
    items: [
      {
        icon: '💻',
        title: 'Website Design',
        text: 'Bespoke, high-converting digital experiences tailored to your brand identity, aesthetics, and target audience.',
      },
      {
        icon: '⚡',
        title: 'Website Development',
        text: 'Fast, responsive, and accessible modern websites engineered with clean code and cutting-edge web technologies.',
      },
      {
        icon: '📱',
        title: 'App Development',
        text: 'Scalable and intuitive cross-platform mobile and web applications built for optimal speed and reliability.',
      },
      {
        icon: '✨',
        title: 'UI/UX Design',
        text: 'User-centric wireframes, prototypes, and design systems focused on frictionless journeys and engagement.',
      },
      {
        icon: '🖋️',
        title: 'Branding & Logo',
        text: 'Memorable brand guidelines, distinct logos, typography systems, and visual assets that leave a lasting mark.',
      },
      {
        icon: '🛠️',
        title: 'Maintenance & Support',
        text: 'Continuous performance optimization, security monitoring, regular updates, and dedicated technical care.',
      },
    ],
  },
  works: {
    lines: [['Our'], ['Works']],
    seeMore: 'Show more',
    showLess: 'Show less',
    rowGaps: {
      desktop: 400,
      tablet: 340,
      mobile: 240,
    },
    cols: {
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    projects: [
      {
        id: 1,
        name: 'JNX',
        type: 'Website',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '01 / WEB',
      },
      {
        id: 2,
        name: 'JNX',
        type: 'App',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '02 / DEV',
      },
      {
        id: 3,
        name: 'JNX',
        type: 'Website',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '03 / APP',
      },
      {
        id: 4,
        name: 'JNX',
        type: 'App',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '04 / UX',
      },
      {
        id: 5,
        name: 'JNX',
        type: 'Website',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '05 / BRAND',
      },
      {
        id: 6,
        name: 'JNX',
        type: 'App',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '06 / SHOP',
      },
      {
        id: 7,
        name: 'JNX',
        type: 'Website',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '07 / SAAS',
      },
      {
        id: 8,
        name: 'JNX',
        type: 'App',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '08 / MOB',
      },
      {
        id: 9,
        name: 'JNX',
        type: 'Website',
        url: 'https://fanzioweb7.vercel.app/',
        badge: '09 / BRAND',
      },
    ],
  },
  community: {
    title: "Great Brands Are Built Together, Let's Build Yours.",
    text: 'Join a growing circle of founders and creators who trust JNX to turn ideas into polished websites and apps.',
    cta: 'Start a Project',
    bubbles: ['Top craft!', 'Pixel perfect!', 'Shipped fast!', 'Love it!'],
    socials: {
      github: 'https://github.com/jxdeveloper001',
      facebook: 'https://www.facebook.com/profile.php?id=61595395020235',
    },
  },
  testimonials: {
    title: 'Satisfied Customers Are Our Best Ads.',
    row1: [
      {
        quote: 'JNX transformed our web platform completely. Our inbound demo requests skyrocketed within two weeks of launch.',
        name: 'Amelia Vance',
        role: 'Startup Founder',
        rating: 5,
      },
      {
        quote: 'The level of craftsmanship and speed is unmatched. Clean code, flawless design, and exceptional communication.',
        name: 'Marcus Chen',
        role: 'Marketing Lead',
        rating: 5,
      },
      {
        quote: 'Our online storefront conversion increased by 42% after the redesign. They truly care about the finer details.',
        name: 'Elena Rostova',
        role: 'Shop Owner',
        rating: 5,
      },
      {
        quote: 'Working with JNX was the smoothest agency experience we have ever had. They nailed our SaaS aesthetic right away.',
        name: 'David Okafor',
        role: 'SaaS Co-founder',
        rating: 4.5,
      },
      {
        quote: 'The team delivered our complex design system ahead of deadline without cutting a single corner.',
        name: 'Sophia Sterling',
        role: 'Product Director',
        rating: 5,
      },
      {
        quote: 'They brought our brand identity to life with interactive animations that our users constantly praise.',
        name: 'Liam Gallagher',
        role: 'Creative Director',
        rating: 5,
      },
    ],
    row2: [
      {
        quote: 'The responsive performance on mobile is blazing fast. JNX is our go-to engineering partner for every new feature.',
        name: 'Tomas Silva',
        role: 'Tech Lead',
        rating: 5,
      },
      {
        quote: 'From wireframes to final deployment, every milestone was executed with precision and polish.',
        name: 'Priya Nair',
        role: 'E-Commerce Director',
        rating: 5,
      },
      {
        quote: 'Rarely do you find an agency that understands both beautiful design and rock-solid code equally well.',
        name: 'Julian Hayes',
        role: 'Brand Strategist',
        rating: 5,
      },
      {
        quote: 'Our customer retention jumped after JNX redesigned our customer onboarding flow. Highly recommended!',
        name: 'Mira Lindqvist',
        role: 'Operations Lead',
        rating: 4.5,
      },
      {
        quote: 'The interactive experience they built gave our boutique agency an undeniable edge over competitors.',
        name: 'Arthur Pendelton',
        role: 'Agency Founder',
        rating: 5,
      },
      {
        quote: 'Reliable, creative, and proactive. JNX turned our rough product concept into an award-worthy application.',
        name: 'Chloe Bennett',
        role: 'Growth Lead',
        rating: 5,
      },
    ],
  },
  faq: {
    title: 'Got A Question For JNX?',
    text: 'Leave your email and we will send answers, project insights, and tips to scale your digital presence.',
    placeholder: 'Enter your email',
    submit: 'Submit',
    sideTitle: 'Maybe your question has been answered, check this out.',
    items: [
      {
        q: 'What is JNX?',
        a: 'JNX is a digital agency specializing in bespoke website design, high-performance web development, mobile apps, and branding for forward-thinking companies.',
      },
      {
        q: 'How do I start a project?',
        a: 'Simply click "Get Started" or "Start a Project", leave your details, and our team will get in touch to schedule a discovery call within 24 hours.',
      },
      {
        q: 'What services will I get?',
        a: 'We offer full-cycle solutions including custom UI/UX design, full-stack development, mobile apps, brand identity, performance tuning, and ongoing support.',
      },
      {
        q: 'What is your typical project timeline?',
        a: 'Most website and branding projects take between 2 to 6 weeks depending on project scope, custom requirements, and feedback cycles.',
      },
    ],
  },
  footer: {
    tagline: 'Designing and engineering standout digital experiences that elevate modern brands.',
    columns: [
      { title: 'Company', links: ['About Us', 'Features', 'News', 'FAQ'] },
      { title: 'Services', links: ['Website Design', 'Website Development', 'App Development', 'UI/UX Design'] },
      { title: 'Support', links: ['Support Center', 'Feedback', 'Contact Us'] },
    ],
    contactTitle: 'Contact Info',
    email: 'jnx.webcraft@gmail.com',
    socials: {
      github: 'https://github.com/jxdeveloper001',
      facebook: 'https://www.facebook.com/profile.php?id=61595395020235',
    },
    copyright: 'Copyright © 2026 JNX. All rights reserved.',
  },
};
