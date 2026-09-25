import type { Project, Experience, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Arif Ahmad Muzakky',
  role: 'UI/UX & Graphic Designer',
  avatar: '/Foto.webp',
  avatarFormal: '/projects/Foto_Formal.png',
  tagline: 'Crafting intuitive UI/UX design systems, bespoke brand identities, and modern digital product experiences.',
  location: 'Indonesia (GMT+7)',
  bio: 'Specializing in intuitive UI/UX design systems, bespoke brand visual identities, and modern digital product experiences that seamlessly blend aesthetic luxury with functional clarity.',
  status: 'Available for UI/UX & Design Projects',
  email: 'arif.muzakky@gmail.com',
  whatsapp: 'https://wa.me/6281234567890?text=Hello%20Arif,%20I%20am%20interested%20in%20discussing%20a%20design%20project',
  instagram: 'https://instagram.com/arifmuzakky',
  tiktok: 'https://tiktok.com/@arifmuzakky',
  github: 'https://github.com/arifmuzakky',
  linkedin: 'https://linkedin.com/in/arifmuzakky',
  twitter: 'https://x.com/arifmuzakky',
  stats: [
    { label: 'Years Experience', value: '4+' },
    { label: 'Completed Projects', value: '35+' },
    { label: 'Design Systems', value: '12+' },
    { label: 'Client Satisfaction', value: '100%' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'spatial-nexus',
    title: 'Spatial Nexus — 3D Telemetry Platform',
    tagline: 'Interactive 3D WebGL data visualization with zero-latency spatial nodes.',
    category: '3d-web',
    categoryLabel: '3D & WebGL',
    description: 'An executive telemetry dashboard built for spatial computing and IoT clusters. Features real-time volumetric point clouds, GPU-accelerated particle flow, and dynamic viewport LOD (Level of Detail) that dynamically scales to maintain 60 FPS on low-tier mobile devices.',
    image: '/projects/spatial-nexus.jpg',
    tags: ['Three.js', 'React', 'TypeScript', 'GLSL Shaders', 'Web Workers', 'Supabase'],
    metrics: [
      { label: 'FPS on Low-end Mobile', value: '60 FPS' },
      { label: 'Bundle Footprint', value: '< 180kb' },
      { label: 'Real-time Points', value: '50,000+' }
    ],
    liveUrl: 'https://spatial-nexus-demo.vercel.app',
    githubUrl: 'https://github.com/zulfa/spatial-nexus',
    featured: true,
    highlights: [
      'Custom WebGL shader pipeline with bloom post-processing toggle',
      'Adaptive polygon decimation based on device concurrency detection',
      'Integrated with Supabase Realtime for collaborative live cursor tracking'
    ]
  },
  {
    id: 'nexus-asset',
    title: 'Nexus Asset — Luxury FinTech Suite',
    tagline: 'Ultra-fast cryptocurrency & global equity trading interface with frosted glass aesthetics.',
    category: 'fintech',
    categoryLabel: 'FinTech & Web3',
    description: 'A prestige financial workstation providing algorithmic portfolio analytics, sub-millisecond price charts, and multi-currency tracking with obsidian dark mode and holographic luminescence.',
    image: '/projects/fintech-aura.jpg',
    tags: ['Next.js / Vite', 'TypeScript', 'Canvas 2D Charts', 'WebSockets', 'Tailwind/CSS Modules'],
    metrics: [
      { label: 'Chart Render Latency', value: '1.2ms' },
      { label: 'Data Throughput', value: '10k ticks/s' },
      { label: 'Lighthouse Score', value: '100' }
    ],
    liveUrl: 'https://nexus-asset-demo.vercel.app',
    githubUrl: 'https://github.com/zulfa/nexus-asset',
    featured: true,
    highlights: [
      'High-frequency WebSocket tick engine with offscreen canvas rendering',
      'Strict Zero Cumulative Layout Shift (CLS) layout architecture',
      'Biometric authentication mock and Supabase ledger synchronization'
    ]
  },
  {
    id: 'synth-ai',
    title: 'Aura Synth AI — Generative 3D Workstation',
    tagline: 'Browser-based parametric node editor for creative generative shaders & audio reactive art.',
    category: 'creative-ai',
    categoryLabel: 'Creative AI & Audio',
    description: 'A cutting-edge generative studio running directly in the browser. Users compose complex neural shader materials and audio-reactive waveforms using an intuitive dark glass node graph.',
    image: '/projects/synth-ai.jpg',
    tags: ['React', 'Three.js', 'Web Audio API', 'WebGPU Ready', 'State Machines'],
    metrics: [
      { label: 'Shader Generation', value: 'Instant' },
      { label: 'Audio Latency', value: '< 8ms' },
      { label: 'User Stars', value: '1.4k+' }
    ],
    liveUrl: 'https://aura-synth-demo.vercel.app',
    githubUrl: 'https://github.com/zulfa/aura-synth',
    featured: true,
    highlights: [
      'Real-time Fast Fourier Transform (FFT) audio visualization engine',
      'Dynamic GLSL shader compilation with immediate visual feedback',
      'Exportable 4K screenshot & GLTF 3D scene presets'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & Creative Core',
    skills: [
      { name: 'React 19 / Vite / Next.js', level: 96, badge: 'Expert' },
      { name: 'TypeScript', level: 95, badge: 'Strict' },
      { name: 'Three.js & WebGL', level: 90, badge: 'Specialist' },
      { name: 'Modern CSS & Glassmorphism', level: 98, badge: 'Master' },
      { name: 'Framer Motion & GSAP', level: 92, badge: 'Fluid' }
    ]
  },
  {
    title: 'Performance & Engineering',
    skills: [
      { name: 'Device Adaptive Performance', level: 95, badge: 'Zero-Jank' },
      { name: 'Web Workers & Offscreen Canvas', level: 88, badge: 'Multi-Thread' },
      { name: 'Core Web Vitals Optimization', level: 98, badge: '99+ Score' },
      { name: 'State Management (Zustand/Context)', level: 92, badge: 'Modular' },
      { name: 'SEO & Semantic Architecture', level: 94, badge: 'A11y' }
    ]
  },
  {
    title: 'Cloud, Deploy & Backend',
    skills: [
      { name: 'Vercel Edge Network', level: 95, badge: 'Continuous CI/CD' },
      { name: 'Supabase (Postgres & Realtime)', level: 90, badge: 'Database' },
      { name: 'REST & GraphQL APIs', level: 88, badge: 'Clean' },
      { name: 'Git & Automated Workflows', level: 92, badge: 'GitOps' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Creative Frontend Engineer',
    company: 'Aether Digital Studio',
    period: '2024 — Present',
    location: 'Remote',
    description: [
      'Architected 10+ high-profile luxury web experiences with Three.js and React, driving a 42% increase in visitor engagement.',
      'Pioneered an Adaptive Device Tiering engine that reduced mobile memory consumption by 65% on entry-level Android devices.',
      'Orchestrated automated CI/CD pipelines to Vercel Edge with zero-downtime rollouts.'
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'GLSL', 'Vercel', 'Tailwind/CSS'],
    featured: true
  },
  {
    id: 'exp-2',
    role: 'Frontend UI/UX Developer',
    company: 'Nexus Interactive Systems',
    period: '2022 — 2024',
    location: 'Hybrid',
    description: [
      'Spearheaded the design system unification for 4 enterprise FinTech web applications, achieving 100/100 Lighthouse performance.',
      'Constructed high-frequency real-time stock dashboards powered by WebSockets and Canvas 2D.',
      'Integrated Supabase PostgreSQL authentication, storage, and row-level security for client-facing portals.'
    ],
    tech: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Chart.js', 'CSS Modules'],
    featured: false
  },
  {
    id: 'exp-3',
    role: 'Junior Creative Web Developer',
    company: 'Vanguard Media Labs',
    period: '2021 — 2022',
    location: 'Indonesia',
    description: [
      'Developed interactive marketing microsites and 3D product previews for international brand launches.',
      'Optimized asset loading strategies, reducing initial page payload from 4.8MB to under 400KB.'
    ],
    tech: ['JavaScript', 'HTML5/Canvas', 'CSS3 Animations', 'Three.js', 'Vercel'],
    featured: false
  }
];
