# Amin Akhshi - Personal Portfolio Website

A modern, responsive portfolio website built with Hugo static site generator, featuring a clean design, smooth animations, and separate pages for each section.

## 🚀 Features

### Modern Design
- **Responsive Layout**: Mobile-first design that works seamlessly across all devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference storage
- **Smooth Animations**: AOS (Animate On Scroll) library for elegant content reveals
- **Interactive Elements**: Custom cursor, particle effects, and smooth transitions

### Architecture
- **Modular Structure**: Separate pages for each section (About, Experience, Education, Skills, Portfolio, Publications, Contact)
- **Landing Page**: Modern hero section with quick links to all sections
- **Navigation**: Fixed navigation bar with mobile menu support
- **Hugo-Powered**: Static site generation for optimal performance

### Technical Highlights
- **CSS Grid & Flexbox**: Modern layout techniques for flexible designs
- **CSS Variables**: Easy theme customization
- **Optimized JavaScript**: Debounced event handlers and lazy loading support
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 📁 Project Structure

```
aminakhshi.github.io/
├── config.toml                 # Hugo configuration
├── content/                    # Markdown content files
│   ├── about.md
│   ├── experience.md
│   ├── education.md
│   ├── skills.md
│   ├── portfolio.md
│   ├── publications.md
│   └── contact.md
├── layouts/                    # Hugo templates
│   ├── index.html             # Landing page template
│   ├── _default/              # Page templates
│   │   ├── baseof.html        # Base template
│   │   ├── about.html
│   │   ├── experience.html
│   │   ├── education.html
│   │   ├── skills.html
│   │   ├── portfolio.html
│   │   ├── publications.html
│   │   └── contact.html
│   └── partials/              # Reusable components
│       ├── navigation.html    # Navigation bar
│       ├── hero.html          # Hero section
│       ├── about.html         # About section
│       ├── experience.html    # Experience timeline
│       ├── education.html     # Education timeline
│       ├── skills.html        # Skills grid
│       ├── portfolio.html     # Portfolio grid
│       ├── publications.html  # Publications list
│       ├── contact.html       # Contact form
│       └── footer.html        # Footer
├── static/                    # Static assets
│   ├── css/
│   │   └── styles.css         # Main stylesheet (modern, responsive)
│   ├── js/
│   │   └── script.js          # Main JavaScript (enhanced functionality)
│   └── images/
└── themes/                    # Hugo themes

```

## 🛠️ Setup & Development

### Prerequisites
- [Hugo](https://gohugo.io/getting-started/installing/) (v0.92.2 or higher)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/aminakhshi/aminakhshi.github.io.git
   cd aminakhshi.github.io
   ```

2. **Start the development server**
   ```bash
   hugo server -D
   ```

3. **View the website**
   Open your browser and navigate to: `http://localhost:1313`

### Building for Production

```bash
hugo --minify
```

This generates the static site in the `public/` directory.

## 🎨 Customization

### Colors
Edit CSS variables in `/static/css/styles.css`:
```css
:root {
    --primary-color: #4169E1;
    --primary-dark: #2E4FA3;
    --primary-light: #6B8EFF;
    /* ... more variables */
}
```

### Content
- Edit markdown files in `/content/` directory
- Modify partials in `/layouts/partials/` for section content
- Update configuration in `config.toml`

### Styling
- Main styles: `/static/css/styles.css`
- All styles use CSS custom properties for easy theming
- Responsive breakpoints: 768px, 992px, 1200px

### JavaScript
- Main script: `/static/js/script.js`
- Features: Navigation, theme toggle, animations, form validation
- All functions are modular and well-documented

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

## ⚡ Performance

- Static site generation for fast loading
- Optimized CSS with minimal specificity
- Debounced scroll handlers
- Lazy loading support for images
- Conditional particle effects (disabled on mobile)

## 🎯 Features by Section

### Landing Page (/)
- Hero section with particle effects
- Quick link cards to all sections
- Smooth scroll indicators

### Individual Pages
- **About**: Personal information, image, language skills
- **Experience**: Timeline view of work history
- **Education**: Academic background in timeline format
- **Skills**: Categorized skill sets with visual indicators
- **Portfolio**: Filterable project grid
- **Publications**: Organized research publications
- **Contact**: Contact information and form

## Deployment

This site is designed for GitHub Pages deployment:

1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy
3. Site available at: `https://aminakhshi.github.io`

## License

Source code obtained from Yelp opensource site project: yelp.github.io
This is licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

## Contributing

Feel free to fork this project and customize it for your own use!

## Contact

- **GitHub**: [aminakhshi](https://github.com/aminakhshi)
- **LinkedIn**: [Amin Akhshi](https://www.linkedin.com/in/amin-akhshi-9750541b6/)
- **ORCID**: [0000-0002-6995-3884](https://orcid.org/0000-0002-6995-3884)

---

**Version**: 2.0 (Modernized - October 2025)
**Last Updated**: October 12, 2025

