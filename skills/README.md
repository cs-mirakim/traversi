# Panduan & Struktur Skills Traversi (Disusun Mengikut Repositori GitHub)

Semua skills yang telah dipasang kini dikumpulkan di dalam folder induk `skills/` dan diasingkan ke dalam **folder khas mengikut nama repositori GitHub asalnya**.

Di dalam setiap repositori, **setiap skill mempunyai foldernya yang tersendiri** beserta fail `SKILL.md` (dan skrip bantuan jika ada).

---

## 📁 Struktur Folder

```
skills/
├── mattpocock/                     <-- Repositori: mattpocock/skills (37 skills)
│   ├── ask-matt/
│   ├── claude-handoff/
│   ├── code-review/
│   ├── codebase-design/
│   ├── diagnosing-bugs/
│   ├── domain-modeling/
│   ├── git-guardrails-claude-code/
│   ├── grill-me/
│   ├── grill-with-docs/
│   ├── grilling/
│   ├── handoff/
│   ├── implement/
│   ├── implement-spec/
│   ├── improve-codebase-architecture/
│   ├── loop-me/
│   ├── migrate-to-shoehorn/
│   ├── prototype/
│   ├── research/
│   ├── resolving-merge-conflicts/
│   ├── retro/
│   ├── scaffold-exercises/
│   ├── setup-matt-pocock-skills/
│   ├── setup-pre-commit/
│   ├── setup-ts-deep-modules/
│   ├── tdd/
│   ├── teach/
│   ├── to-questionnaire/
│   ├── to-spec/
│   ├── to-tickets/
│   ├── triage/
│   ├── wait-what/
│   ├── wayfinder/
│   ├── wizard/
│   ├── writing-beats/
│   ├── writing-for-agents/
│   ├── writing-fragments/
│   └── writing-shape/
│
├── taste-skill-leonxlnx/           <-- Repositori: Leonxlnx/taste-skill (13 skills)
│   ├── brandkit/
│   ├── design-taste-frontend/
│   ├── design-taste-frontend-v1/
│   ├── full-output-enforcement/
│   ├── gpt-taste/
│   ├── high-end-visual-design/
│   ├── image-to-code/
│   ├── imagegen-frontend-mobile/
│   ├── imagegen-frontend-web/
│   ├── industrial-brutalist-ui/
│   ├── minimalist-ui/
│   ├── redesign-existing-projects/
│   └── stitch-design-taste/
│
└── anti-slop-miqdadbadjuber/       <-- Repositori: miqdadbadjuber/anti-slop (6 skills)
    ├── antislop/
    ├── antislop-code/
    ├── antislop-copywriting/
    ├── antislop-human/
    ├── antislop-layoutmobile/
    └── antislop-ui/
```

---

## 📌 Penerangan Setiap Repositori

### 1. `mattpocock/` (37 Skills)
* **Pencipta:** Matt Pocock (@mattpocock)
* **Fokus:** Kejuruteraan perisian TypeScript bertaraf tinggi, seni bina sistem (*deep modules*), Test-Driven Development (TDD), semakan kod automatik (*code-review*), diagnostik pepijat, serta alat perancangan produk (*grilling*, *to-spec*, *to-tickets*).

### 2. `taste-skill-leonxlnx/` (13 Skills)
* **Pencipta:** Leonxlnx (@Leonxlnx)
* **Fokus:** Rasa reka bentuk visual elit (*design taste*), komponen bento grid moden, animasi dinamik GSAP ScrollTrigger, penjanaan imej reka bentuk (*image-to-code* & *imagegen*), serta identiti jenama (*brandkit*).

### 3. `anti-slop-miqdadbadjuber/` (6 Skills)
* **Pencipta:** Miqdad Badjuber (@miqdadbadjuber)
* **Fokus:** Penapis "Anti-AI Slop" — menyingkirkan elemen UI dan teks generik kecerdasan buatan, menguatkuasakan kontras warna WCAG untuk manusia, susun atur mudah alih (*mobile-first*), dan gaya penulisan *copywriting* yang natural.

---

## ℹ️ Mengenai Folder `.claude` & `.agents`
* **`.agents/skills/`**: Lokasi lalai yang digunakan oleh enjin AI Antigravity / Cursor untuk memuatkan arahan automasi secara terus semasa sesi pembangunan.
* **`.claude/skills/`**: Folder pintasan (*Windows Junctions/Symlinks*) yang dijana oleh CLI `skills` untuk kegunaan ejen Claude Code. Kedua-dua folder ini merujuk kepada kandungan skills yang sama.
