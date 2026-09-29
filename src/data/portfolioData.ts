import type { Project, Experience, SkillCategory, Education, SoftwareTool } from '../types';

export const PERSONAL_INFO = {
  name: 'Arif Ahmad Muzakky',
  role: 'UI/UX & Graphic Designer',
  avatar: '/Foto.webp',
  avatarFormal: '/projects/Foto_Formal.png',
  tagline: 'Crafting intuitive UI/UX design systems, bespoke brand identities, and modern digital product experiences.',
  location: 'Indonesia (GMT+7)',
  bio: 'Halo, saya Arif Ahmad Muzakky, seorang mahasiswa program studi D3 Manajemen Informatika di Universitas Lampung. Saya memiliki ketertarikan yang mendalam terhadap dunia estetika visual. Mulai dari Desain Grafis, UI/UX Design, Fotografi, hingga Videografi dan proses editing—saya selalu antusias dalam menciptakan maupun menikmati karya visual yang memanjakan mata.',
  status: 'Available for UI/UX & Design Projects',
  email: 'muzakky098@gmail.com',
  whatsapp: 'https://wa.me/62895413066835?text=Halo%20Arif,%20saya%20tertarik%20untuk%20mendiskusikan%20proyek%20desain',
  instagram: 'https://instagram.com/mzak.ky_',
  tiktok: '',
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
    role: 'Kerja Praktik (Kuliah)',
    company: 'Balai Penjaminan Mutu Pendidikan Provinsi Lampung',
    period: '2026 (40 Hari)',
    location: 'Bandar Lampung',
    description: [
      'Ikut serta kerja tim bersama teman sekelompok bagian memegang tanggung jawab Front-End & Redesain UI/UX untuk Pengembangan sebuah Website Balai Penjaminan Mutu Pendidikan Provinsi Lampung.'
    ],
    tech: ['Figma', 'VS Code', 'React', 'Node.js'],
    featured: true
  },
  {
    id: 'exp-2',
    role: 'Organisasi Mahasiswa',
    company: 'Himpunan Mahasiswa Ilmu Komputer (ILKOM)',
    period: '2024-2025',
    location: 'Universitas Lampung (UNILA)',
    description: [
      'Ikut serta dalam melakukan pengambilan Video pada proses pembuatan Video Pengenalan Kepengurusan Anggota Himpunan Mahasiswa Ilmu Komputer 2023/2024.',
      'Ikut serta dalam pengambilan sebuah Foto untuk setiap Anggota dan Pimpinan pada Himpunan Mahasiswa Ilmu Komputer 2023/2024.',
      'Dipercaya dalam melakukan dokumentasi pada setiap Acara ataupun Program Kerja yang sedang berlangsung.',
      'Menjadi penanggung jawab pada Divisi Youtube.',
      'Melakukan beberapa Pengeditan Video untuk konten YouTube Himpunan.'
    ],
    tech: ['Figma', 'Davinci Resolve', 'Filmora', 'Lightroom'],
    featured: true
  },
  {
    id: 'exp-3',
    role: 'Freelance',
    company: 'PT Agro Multiguna Sejati (AMS)',
    period: '2025 (1-2 Bulan)',
    location: 'Remote',
    description: [
      'Membuat Desain Grafis berupa sebuah Poster/Pamflet produk pupuk pada Media Sosial Instagram @merdekasuryatani',
    ],
    tech: ['Figma', 'Lightroom'],
    featured: false
  },
  {
    id: 'exp-4',
    role: 'Praktik Kerja Lapangan (SMK)',
    company: 'PT Perkebunan Nusantara VII',
    period: '2023 (6 Bulan)',
    location: 'Bandar Lampung',
    description: [
      'Ikut serta turun kelapangan untuk pemasangan Kamera CCTV pada beberapa UNIT PT Perkebunan Nusantara VII',
      'Pernah ikut serta dalam proses melakukan Pemetaan Lahan (Drone Mapping) atau Survei Udara (Aerial Survey) di berbagai lahan milik PT Perkebunan Nusantara VII.'
    ],
    tech: ['Drone Mapping', 'Instalasi CCTV'],
    featured: false
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'edu-1',
    degree: 'KULIAH',
    institution: 'Universitas Lampung (Unila)',
    major: 'D3 Manajemen Informatika',
    period: '2024 — Sekarang',
    statusBadge: 'Sedang Ditempuh (Active)',
    description: 'Seorang Mahasiswa Kupu-Kupu (Kuliah Pulang) yang berusaha ingin mendapatkan IPK 4. Namun, kenyataannya tidak begitu.',
    current: true
  },
  {
    id: 'edu-2',
    degree: 'SMK',
    institution: 'SMK Negeri 2 Bandar Lampung',
    major: 'Teknik Komputer Jaringan',
    period: '2021 — 2024',
    statusBadge: 'Lulus (Graduated)',
    description: 'Hanya Seorang siswa yang berusaha untuk memastikan kabel LAN terhubung, namun tidak dengan dia yang hubungannya tidak saling terhubung. Aww',
    current: false
  },
  {
    id: 'edu-3',
    degree: 'SMP',
    institution: 'SMP Muhammadiyah 3 Bandar Lampung',
    major: 'Islami',
    period: '2018 — 2021',
    statusBadge: 'Lulus (Graduated)',
    description: 'Hanya seorang siswa yang berusaha untuk selalu taat dan tawaqal kepada Allah SWT. Dan menjaga amanah orang tua, tapi ya gitu deh....',
    current: false
  }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX Design',
    icon3D: '/software/figma-3d.png',
    accentColor: '#f24e1e',
    description: 'Interface & User Experience Prototyping'
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'Color Grading & Video',
    icon3D: '/software/davinci-3d.png',
    accentColor: '#ff4c60',
    description: 'Cinematic Color Grading & Motion Editing'
  },
  {
    id: 'filmora',
    name: 'Wondershare Filmora',
    category: 'Video Editing',
    icon3D: '/software/filmora-3d.png',
    accentColor: '#00f5d4',
    description: 'Creative Video Assembly & Visual Effects'
  },
  {
    id: 'lightroom',
    name: 'Adobe Lightroom',
    category: 'Photo Editing',
    icon3D: '/software/lightroom-3d.png',
    accentColor: '#31a8ff',
    description: 'Color Toning & High-End Photography Post-Processing'
  }
];
