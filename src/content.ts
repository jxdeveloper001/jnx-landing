/** All editable copy lives here. */
export const content = {
  brand: 'JNX',
  nav: {
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Service', href: '#service' },
      { label: 'Our Works', href: '#our-works' },
      { label: 'How We Work', href: '#how-we-work' },
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
    { value: 6, suffix: '', decimals: 0, label: 'Years of Experience' },
    { value: 100, suffix: '+', decimals: 0, label: 'Projects' },
    { value: 350, suffix: '+', decimals: 0, label: 'Happy Customers' },
    { value: 4.2, suffix: '', decimals: 1, label: 'Overall Rating' },
  ],
  services: {
    title: 'Meet Our Services',
    subtitle:
      'Everything your brand needs to look sharp and grow online, built by people who care about the details.',
    rowGaps: {
      desktop: 440,
      tablet: 360,
      mobile: 220,
    },
    cols: {
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    items: [
      {
        icon: 'website-design',
        title: 'Website Design',
        text: 'Bespoke, high-converting digital experiences tailored to your brand and audience.',
      },
      {
        icon: 'website-development',
        title: 'Website Development',
        text: 'Fast, responsive modern websites built with clean code and cutting-edge web tech.',
      },
      {
        icon: 'app-development',
        title: 'App Development',
        text: 'Scalable cross-platform mobile and web apps built for speed and reliability.',
      },
      {
        icon: 'ui-ux-design',
        title: 'UI/UX Design',
        text: 'User-centric wireframes and design systems focused on frictionless journeys.',
      },
      {
        icon: 'branding-logo',
        title: 'Branding & Logo',
        text: 'Memorable logos, typography systems, and visual assets that leave a lasting mark.',
      },
      {
        icon: 'maintenance-support',
        title: 'Maintenance & Support',
        text: 'Continuous optimisation, security monitoring, and dedicated technical care.',
      },
    ],
  },
  works: {
    title: 'Our Works',
    subtitle: {
      line1: 'Websites and apps we are proud of,',
      line2: 'built for brands that want to grow.',
    },
    projects: [
      {
        id: 1,
        name: 'Fanzio',
        type: 'E-Commerce Website',
        url: 'https://fanzioweb7.vercel.app/',
        image: '/images/fanzio-preview.png',
        favicon: '/images/fanzio-favicon.ico',
        description: 'Modern football jersey showroom and e-commerce platform with liquid matchwear drops.',
      },
      {
        id: 2,
        name: 'QR Toolkit',
        type: 'Web Application',
        url: 'https://devxub-qr-toolkit.vercel.app/',
        image: '/images/qr-toolkit-preview.png',
        favicon: 'https://devxub-qr-toolkit.vercel.app/favicon.svg',
        description: 'Fast, privacy-focused generator and scanner to create, customize, and export QR codes.',
      },
      {
        id: 3,
        name: 'Imeju',
        type: 'Web Application',
        url: 'https://imeju.vercel.app/',
        image: '/images/imeju-preview.png',
        favicon: 'https://imeju.vercel.app/favicon.ico',
        description: 'Browser-based image compression tool to reduce JPG, PNG, and WebP files to exact sizes.',
      },
      {
        id: 4,
        name: 'NexFlow',
        type: 'AI Automation Platform',
        url: 'https://dx-nex-flow.vercel.app/',
        image: '/images/nexflow-preview.png',
        favicon: 'https://dx-nex-flow.vercel.app/favicon.ico',
        description: 'Intelligent workflow automation and AI worker management platform to streamline operations.',
      },
      {
        id: 5,
        name: 'Jiyax',
        type: 'Workflow Automation Suite',
        url: 'https://jiyax.vercel.app/',
        image: '/images/jiyax-preview.png',
        favicon: 'https://jiyax.vercel.app/favicon.ico',
        description: 'Visual workflow builder to connect tools and automate work with human approval.',
      },
      {
        id: 6,
        name: 'Devxub',
        type: 'Developer Portfolio',
        url: 'https://portfolio-me-nine-beige.vercel.app/',
        image: '/images/devxub-preview.png',
        favicon: 'https://portfolio-me-nine-beige.vercel.app/vite.svg',
        description: 'Personal developer portfolio showcasing modern web applications, frontend skills, and digital experiences.',
      },
    ],
  },
  howWeWork: {
    eyebrow: 'HOW WE WORK',
    headline: "Good Work Doesn't Happen by Accident.",
    description:
      'From the first conversation to the final launch, we combine thoughtful design and solid development to build digital experiences that move businesses forward.',
    steps: [
      {
        number: '01',
        name: 'DISCOVER',
        title: 'Understand Before We Build.',
        description:
          "Learn about the client's business, audience, goals, and challenges to establish a clear project strategy.",
      },
      {
        number: '02',
        name: 'DESIGN',
        title: 'Turn Ideas Into Experiences.',
        description:
          'Create intuitive user journeys, polished UI/UX, wireframes, and responsive visual designs.',
      },
      {
        number: '03',
        name: 'BUILD',
        title: 'Make Every Detail Count.',
        description:
          'Develop fast, responsive websites, landing pages, e-commerce stores, and React/Next.js applications with clean, reliable code.',
      },
      {
        number: '04',
        name: 'LAUNCH',
        title: 'Ready for the Real World.',
        description:
          'Test across devices, fix issues, optimize performance, and deploy smoothly.',
      },
      {
        number: '05',
        name: 'EVOLVE',
        title: "Better Doesn't Stop at Launch.",
        description:
          'Provide website maintenance, security improvements, ongoing optimization, and enhancements as businesses grow.',
      },
    ],
    closing: 'Great websites start with a good conversation.',
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
