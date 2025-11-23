# Narek Kolyan - Portfolio Website

A modern, responsive portfolio website showcasing CV, projects, and an interactive memory game. Built with Next.js 15, React 19, and TypeScript.

## 🌟 Features

- 📄 **CV/Resume Section** - Professional resume with PDF export functionality
- 🎮 **Interactive Memory Game** - Technology-themed card matching game
- 🚀 **Project Showcase** - Detailed showcase of major projects with technologies and features
- 🌍 **Multi-language Support** - English, Russian, and Armenian translations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🎨 **Modern UI/UX** - Beautiful animations and smooth transitions with Framer Motion
- 📥 **PDF Export** - Export CV as a professional PDF document

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **PDF Generation:** html2pdf.js
- **Internationalization:** Custom i18n implementation

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
narekqolyan-website/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── constants/        # Data constants (CV, projects)
│   ├── contexts/         # React contexts (Language)
│   ├── i18n/             # Translation files
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## 🌐 Languages

The website supports three languages:
- 🇬🇧 English (en)
- 🇷🇺 Russian (ru)
- 🇦🇲 Armenian (hy)

Language switching is available in the navigation bar.

## 📄 Sections

1. **Hero** - Introduction and call-to-action
2. **CV** - Professional resume with work experience, education, skills, and languages
3. **Skills** - Categorized technical skills and technologies
4. **Projects** - Showcase of major projects with details
5. **Game** - Interactive memory matching game
6. **Footer** - Contact information and links

## 🎮 Memory Game

The interactive memory game features technology icons instead of numbers. Match pairs of technology cards to win!

## 📥 PDF Export

The CV section includes a PDF export feature that generates a professional, two-column resume layout with:
- Personal information and contact details
- Professional summary
- Work experience
- Education
- Selected projects

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📝 License

This project is private and personal.

## 👤 Author

**Narek Kolyan**
- GitHub: [@narek941](https://github.com/narek941)
- LinkedIn: [narek-qolyan-4a92b611b](https://linkedin.com/in/narek-qolyan-4a92b611b)
- Email: nqolyan@gmail.com
