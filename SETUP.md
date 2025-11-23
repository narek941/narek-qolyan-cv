# Setup Guide - Narek Kolyan Portfolio Website

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
narekqolyan-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── not-found.tsx       # 404 page
│   ├── components/
│   │   ├── Navigation.tsx      # Top navigation
│   │   ├── Hero.tsx            # Hero section
│   │   ├── CVSection.tsx       # CV/Resume section
│   │   ├── ProjectsShowcase.tsx # Projects display
│   │   ├── GameSection.tsx      # Memory game
│   │   └── Footer.tsx           # Footer
│   ├── constants/
│   │   ├── cv.const.ts         # CV data
│   │   └── projects.const.ts   # Projects data
│   └── types/
│       └── projects.types.ts    # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Customization

### Update Personal Information

Edit `src/constants/cv.const.ts` to update:
- Name, title, email, location
- Skills
- Experience
- Education

### Add/Update Projects

Edit `src/constants/projects.const.ts` to:
- Add new projects
- Update existing project information
- Add links (GitHub, npm, live demos)

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme colors: Update `primary` colors in `tailwind.config.ts`

## Features

✅ **CV Section** - Professional resume display
✅ **Projects Showcase** - Interactive project cards
✅ **Memory Game** - Fun interactive game
✅ **Responsive Design** - Works on all devices
✅ **Dark Mode** - Automatic dark mode support
✅ **Smooth Scrolling** - Navigation with smooth scroll

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (optional, can be added)

## Next Steps

1. Update personal information in `cv.const.ts`
2. Add your actual project links
3. Customize colors and styling
4. Deploy to Vercel or your preferred platform
5. Share your portfolio!

