# Lana Touma - Portfolio

A modern, responsive portfolio website built with Angular 19, featuring elegant animations, comprehensive accessibility features, and a functional contact form.

**Live Demo:** [https://portfolio-f6hbnyyqy-lanas-projects-4bd16455.vercel.app/](https://portfolio-f6hbnyyqy-lanas-projects-4bd16455.vercel.app/)

## Features

- **Modern Design:** Clean, professional layout with sage green and dusty pink color scheme
- **Fully Responsive:** Optimized for desktop, tablet, and mobile devices
- **SEO Optimized:** Comprehensive meta tags for search engines and social media
- **Accessible:** WCAG AA compliant with keyboard navigation, ARIA labels, and screen reader support
- **Smooth Animations:** Elegant fade-in and scroll animations with reduced motion support
- **Contact Form:** Functional email form using EmailJS
- **Performance Optimized:** Lazy loading images, optimized fonts, and efficient rendering

## Technology Stack

- **Framework:** Angular 19
- **Language:** TypeScript 5.6
- **Styling:** SCSS with custom properties
- **Icons:** Font Awesome 6.5
- **Fonts:** Google Fonts (Inter)
- **Email Service:** EmailJS
- **Deployment:** Vercel

## Project Structure

```
src/
├── app/
│   ├── components/         # All UI components
│   │   ├── header/         # Navigation header
│   │   ├── hero/           # Hero section
│   │   ├── about/          # About me section
│   │   ├── projects/       # Projects showcase
│   │   ├── skills/         # Skills & expertise
│   │   └── contact/        # Contact form
│   ├── services/           # Angular services
│   │   ├── project.service.ts
│   │   └── email.service.ts
│   └── interfaces/         # TypeScript interfaces
├── environments/           # Environment configurations
├── assets/                 # Static assets
│   ├── images/            # Project images & photos
│   └── documents/         # Resume/CV files
└── styles.scss            # Global styles
```

## Quick Start

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Customization Guide

### 1. Personal Information

Update your personal details in the environment files:

**File:** `src/environments/environment.ts` and `src/environments/environment.prod.ts`

```typescript
contact: {
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, State'
},
social: {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  instagram: 'https://instagram.com/yourusername'
}
```

### 2. Projects

Update your projects in `src/app/services/project.service.ts`:

```typescript
private projects: Project[] = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description...',
    technologies: ['Angular', '.NET', 'Docker'],
    imageUrl: 'assets/images/your-project.svg',
    githubUrl: 'https://github.com/you/project',
    liveUrl: 'https://your-project.com', // Optional
    featured: true,
    category: 'web'
  }
];
```

### 3. Skills

Update your skills in `src/app/components/skills/skills.component.ts`:

```typescript
frontendSkills: Skill[] = [
  { name: 'Angular', level: 90 },
  { name: 'React', level: 85 },
  // Add more...
];
```

### 4. Images

Replace placeholder images with your actual images:

- **Profile Photo:** `public/assets/images/profile-placeholder.svg` → Replace with your photo
- **Project Screenshots:** Replace the SVG placeholders in `public/assets/images/`
- **OG Image:** `public/assets/images/og-image.svg` → Create a 1200x630px image for social sharing

### 5. Resume

Add your resume PDF to `public/assets/documents/Lana_Touma_Resume.pdf`

### 6. EmailJS Setup

See [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for detailed instructions on configuring the contact form.

Quick steps:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Public Key, Service ID, and Template ID
3. Update `src/index.html` and `src/app/services/email.service.ts`

## SEO Configuration

Update the following in `src/index.html`:

- Page title
- Meta description
- Open Graph tags
- Twitter Card tags
- Canonical URL

Update the portfolio URL in:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `src/index.html` (meta tags)

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### Deploy to Netlify

1. Build the project:
```bash
ng build --configuration production
```

2. Drag and drop the `dist/lana-portfolio/browser` folder to [Netlify](https://app.netlify.com/)

### Deploy to GitHub Pages

1. Install angular-cli-ghpages:
```bash
npm install -g angular-cli-ghpages
```

2. Build and deploy:
```bash
ng build --configuration production --base-href "https://yourusername.github.io/repository-name/"
npx angular-cli-ghpages --dir=dist/lana-portfolio/browser
```

## Performance Optimization

The portfolio includes several performance optimizations:

- **Lazy Loading:** Images use `loading="lazy"` attribute
- **Font Optimization:** Preconnect and dns-prefetch for external fonts
- **Animation Optimization:** Hardware acceleration and will-change properties
- **Reduced Motion:** Respects user's motion preferences
- **Minification:** Production builds are automatically minified

## Accessibility Features

- **Keyboard Navigation:** Full keyboard support with visible focus indicators
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Skip to Content:** Skip navigation link for keyboard users
- **Color Contrast:** WCAG AA compliant color ratios
- **Reduced Motion:** Animations respect prefers-reduced-motion
- **Alt Text:** All images have descriptive alt text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal portfolio project, but feel free to fork it and customize it for your own use!

## License

This project is open source and available under the [MIT License](LICENSE).

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

## Support

If you find any issues or have questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Angular 19
