# Product Requirement Document (PRD) & Technical Blueprint
## Luxury Modern 3D Portfolio Website (Vercel + Supabase Ready)

---

## 1. Executive Summary & Vision

### 1.1 Visi Proyek
Membangun website portofolio personal kelas dunia (*high-end luxury aesthetic*) yang menggabungkan visual 3D modern, efek paralaks dinamis, dan tipografi prestisius, tanpa mengorbankan performa (*zero-jank, sub-second loading*). Website dirancang untuk tetap berjalan mulus (*smooth 60fps*) di semua spektrum perangkat, mulai dari smartphone *budget/low-end* hingga desktop berspesifikasi tinggi.

### 1.2 Pilar Utama
1. **Aesthetic Excellence ("Mahal & Modern")**: Visual gelap (*deep obsidian & titanium slate*) dengan sentuhan pencahayaan aurora cyan tajam (*subtle glassmorphism*, *radial cursor spotlights*, *micro-interactions*).
2. **Adaptive Performance (Low-End Mobile Friendly)**: Sistem adaptasi grafis dinamis (*Performance Tiering Engine*) yang mendeteksi kapabilitas perangkat dan otomatis menurunkan beban render WebGL/3D tanpa merusak estetika.
3. **Zero-Cost Production Ready**: 100% dapat di-deploy secara gratis di platform **Vercel** (Edge Network, CI/CD otomatis, SSL otomatis).
4. **Scalable Backend Integration**: Terintegrasi opsional dengan **Supabase** (PostgreSQL, Storage, Real-time) untuk *contact form*, *dynamic project management*, hingga analitik interaksi pengunjung.

---

## 2. Target Pengguna & Persona

| Persona | Kebutuhan Utama | Elemen Kunci yang Dilihat |
| :--- | :--- | :--- |
| **Tech Recruiter / HR** | Mencari ringkasan cepat, keahlian utama, resume download, riwayat kerja. | Navigasi cepat, waktu muat instan (< 1.5 detik), tombol CTA jelas, tautan LinkedIn/GitHub. |
| **Engineering Lead / CTO** | Menguji kualitas kode, arsitektur, perhatian terhadap detail, performa, dan responsivitas. | Optimasi multi-device, kehalusan animasi, detail teknis studi kasus (*tech stack breakdown*). |
| **Klien / Founder** | Mencari bukti nyata keahlian (*proof of work*), kesan profesionalisme dan rasa percaya tinggi. | Tampilan prestisius ("mahal"), demo interaktif, testimonial, form kontak yang responsif. |

---

## 3. Desain & Filosofi Visual ("Mahal & Modern")

```
┌─────────────────────────────────────────────────────────────┐
│ Visual Mood: "Executive Obsidian & Cyan Luminescence"       │
├─────────────────────────────────────────────────────────────┤
│ • Latar Belakang: #070709 (Deep Space) / #0d0e12 (Obsidian) │
│ • Aksentuasi Glow: Cyan Aurora (#00f5d4), Aqua (#06b6d4)    │
│ • Kontur / Border: 1px border tipis rgba(255,255,255, 0.08)  │
│   dengan interaksi hover kursor radial spotlight            │
│ • Tipografi: Plus Jakarta Sans / Inter (Body) + Space       │
│   Grotesk / Syne (Headings) + JetBrains Mono (Tech Tags)    │
│ • Material: Frosted Glass (backdrop-filter: blur(16px))     │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Strategi Performa & Multi-Device (Solusi Low-End Device)

- **Adaptive Quality Engine**:
  - Deteksi Core CPU (`hardwareConcurrency`) dan RAM (`deviceMemory`).
  - FPS monitoring dinamis (jika FPS drop di bawah 35, otomatis aktifkan Eco Mode).
  - IntersectionObserver: WebGL 3D canvas di-pause saat di luar viewport layar.
  - CSS GPU Hardware Acceleration: `transform: translate3d()` & `will-change`.
  - Manual Toggle: Pengunjung dapat mengaktifkan "Eco Mode" (Battery Saver) kapan saja.

---

## 5. Arsitektur Teknologi (Tech Stack)

- **Framework**: Vite + React 19 / TypeScript
- **Styling**: Vanilla CSS dengan Modern CSS Custom Properties (Design Tokens & Glassmorphism)
- **3D & Animasi**: Three.js (atau Canvas 3D Shaders & WebGL teroptimasi) + CSS 3D Transforms
- **Icons**: Lucide Icons
- **Backend & Database**: Supabase JS SDK (Contact inquiries, views, project management)
- **Deployment**: Vercel
