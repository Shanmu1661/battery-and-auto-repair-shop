# VoltFix Pro - Battery & Auto Electrical Repair Shop HTML5 Template

**VoltFix Pro** is a commercial-grade, multipurpose HTML5 website template specifically engineered for **Car Battery Centers, Auto Electrical Diagnostics, Mobile Roadside Mechanics, Alternator Repair Shops, and Commercial Fleet Specialists**.

Built to meet the highest commercial standards of platforms like ThemeForest, TemplateMonster, or custom client delivery, it features a complete front-end customer experience, doorstep booking system, transparent pricing guide, brand showcase, and responsive mobile-first architecture.

---

## 🌟 Key Features

- **Strict Vanilla Stack**: Semantic HTML5, CSS3 (`css/style.css`), Vanilla JavaScript (`js/script.js`), Tailwind CSS CDN, and Font Awesome 6. Zero Node.js build dependencies required.
- **Single-Bar Navigation**: Modern, uncluttered header bar with integrated Dark/Light mode toggle, RTL switch, dropdown menus, and quick booking CTA. (No distracting topbar strip).
- **Dark Mode & Light Mode**: Persistent in `localStorage`, smoothly transitioning between dark slate/navy backgrounds and clean light modes with crisp electric amber/cyan accents.
- **RTL (Right-to-Left) Functionality Across All Pages**: Instant RTL toggle in the navbar and footer with complete Arabic/Hebrew layout mirroring, typography support (Cairo font), and directional icon flipping (`rtl-flip`).
- **WCAG 2.1 AA Accessibility Compliant**:
  - Accessible Skip-to-Content links on all 14 pages (`<a href="#main-content" class="skip-link">`).
  - Semantic `<main id="main-content">` on every page.
  - Visible 2px high-contrast focus rings (`:focus-visible`).
  - Minimum 44x44px touch targets on mobile buttons and inputs.
  - `aria-expanded` and screen-reader labels on interactive elements.
  - `@media (prefers-reduced-motion: reduce)` support.
- **Comprehensive SEO Architecture**:
  - Valid canonical URLs on all 14 pages.
  - Unique meta titles (<60 characters) and descriptions (130-160 characters).
  - OpenGraph / Twitter Cards social metadata.
  - Structured Data / Schema.org JSON-LD markup:
    - `AutoRepair` schema on Home 1, Home 2, and Contact pages.
    - `AboutPage` schema on About Us.
    - `Service` & `OfferCatalog` schema on Services and Pricing.
    - `ItemList` / `Brand` schema on Brands page.
    - `Blog` and `BlogPosting` schema on Blog and Blog Details.
  - Complete `sitemap.xml` and `robots.txt` included.
- **Working Form & Newsletter Integrations**:
  - Client-side validation with real-time feedback states (`.is-invalid`, `.invalid-feedback`).
  - Native hooks for **Formspree** (`action="https://formspree.io/f/your-form-id"`) and **Netlify Forms** (`data-netlify="true"`).
  - Animated toast notification engine for form submissions.
- **Checkout Ready**:
  - Interactive **Stripe** and **PayPal** checkout button placeholders on pricing packages and deposit booking forms.
- **Interactive Automotive Tools**:
  - **Quick Battery & Vehicle Matcher**: Select Make, Model, and Year for instant battery size, Cold Cranking Amps (CCA), and warranty recommendations.
  - **Live Symptom & Diagnostic Cost Estimator**: Interactive checkbox calculator providing turnaround times and starting prices.
  - **Filterable Brand Catalog**: Instant filtering by battery technology (AGM Stop-Start, Silver Alloy, Heavy Duty SpiralCell).
  - **Live Search & Category Filter Blog**: Instant keyword search for automotive electrical maintenance guides.
  - **Live Countdown Timer**: Dynamic ticking timer for the Coming Soon / Branch Launch page.
  - **Skeleton Loading Screen**: Shimmering placeholder effect dismissing on page load.
- **Authentic Automotive Photography & Vector SVGs**: High-definition photography and handcrafted vector SVG logos for leading battery brands (Amaron, Exide, Bosch, Tata Green, Optima).

---

## 📁 Folder & File Structure

```
auto-repair-shop/
│
├── index.html               # Home Page 1 - General Services & Diagnostic Landing
├── home-2.html              # Home Page 2 - Doorstep Mobile Battery & Fleet Specialist
├── about.html               # About Us - Team, 15-Yr History, Lab Hardware & Certifications
├── services.html            # Services Catalog - 6 Detailed Auto Electrical Disciplines
├── service-details.html     # Single Service Deep Dive - Battery Diagnostics & Booking Sidebar
├── pricing.html             # Pricing Guide - Tiered Packages, Stripe/PayPal buttons & Warranty Matrix
├── brands.html              # Brands We Service - Amaron, Exide, Bosch, Tata Green, Optima
├── blog.html                # Blog Hub - Filterable & Searchable Automotive Care Articles
├── blog-details.html        # Single Blog Post - 5 Warning Signs of a Bad Alternator
├── contact.html             # Contact Us - Emergency Dispatch Request & Google Map
├── login.html               # Customer & Technician Portal Login
├── register.html            # Account Registration & Vehicle Warranty Profile Setup
├── 404.html                 # Automotive Themed Error Page ("Circuit Broken")
├── coming-soon.html         # Maintenance / New Branch Opening with Live Countdown
├── sitemap.xml              # XML Sitemap covering all 14 pages
├── robots.txt               # Search engine crawl rules & sitemap reference
│
├── css/
│   └── style.css            # Custom theme variables, RTL overrides, skeleton screens, focus rings
│
├── js/
│   └── script.js            # Global theme, RTL, mobile drawer, calculators, filters, form validation, toasts
│
├── images/
│   ├── hero.svg             # Main hero graphic illustration
│   ├── services/
│   │   ├── battery.svg      # Battery service vector illustration
│   │   ├── alternator.svg   # Alternator service vector illustration
│   │   ├── wiring.svg       # Wiring diagnostics vector illustration
│   │   └── ac-electrical.svg# Car AC climate electrical vector illustration
│   └── brands/
│       ├── amaron.svg       # Amaron vector logo
│       ├── exide.svg        # Exide vector logo
│       ├── tata-green.svg   # Tata Green vector logo
│       ├── bosch.svg        # Bosch vector logo
│       └── optima.svg       # Optima Batteries vector logo
│
└── README.md                # Documentation & setup guide
```

---

## 🚀 Getting Started & Deployment

No complex build process or Node.js/npm commands are required:

1. **Local Preview**: Double-click any `.html` file in your file explorer to open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. **Web Hosting**: Upload all files and folders directly to any web server (Apache, Nginx, cPanel, GitHub Pages, Netlify, Vercel, or AWS S3).
3. **Configuring Contact Forms (Formspree)**:
   - In `contact.html`, `service-details.html`, `login.html`, and `register.html`, replace `https://formspree.io/f/your-form-id` with your actual Formspree endpoint.
   - For Netlify hosting, simply add `data-netlify="true"` to `<form>`.
4. **Changing the Hotline Number**: Search and replace `(800) 555-VOLT` and `tel:+18005558658` across the HTML files with your shop's phone number.
5. **Changing the Google Map**: In `contact.html`, replace the `src` URL of the `<iframe>` with your Google Maps embed code.

---

## 💳 Integrating Stripe & PayPal

The pricing tables in `pricing.html` and the booking form in `service-details.html` feature pre-styled checkout triggers:

```html
<!-- Stripe Trigger -->
<button type="button" class="stripe-btn payment-gateway-btn ...">
  <i class="fa-brands fa-stripe text-xl"></i>
  <span>Pay with Stripe</span>
</button>

<!-- PayPal Trigger -->
<button type="button" class="paypal-btn payment-gateway-btn ...">
  <i class="fa-brands fa-paypal text-lg text-sky-400"></i>
  <span>PayPal Checkout</span>
</button>
```

To connect to live payment processing:
- **Stripe**: Replace the click handler in `js/script.js` with your `Stripe.redirectToCheckout({ sessionId: '...' })`.
- **PayPal**: Insert the standard PayPal JS SDK script (`<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>`) and render PayPal Buttons.

---

## 🎨 Customizing Colors & Styles

Colors can be modified directly in the Tailwind script config at the top of each HTML file or through CSS variables in `css/style.css`:

```css
:root {
  --primary: #f59e0b;       /* Electric Amber */
  --primary-hover: #d97706;
  --secondary: #0ea5e9;     /* Electric Cyan Blue */
  --dark-bg: #0b0f19;       /* Deep Charcoal Slate */
}
```

---

## 🌐 Browser Compatibility

- Google Chrome (Latest)
- Mozilla Firefox (Latest)
- Microsoft Edge (Latest)
- Apple Safari (Latest)
- Mobile Browsers (iOS Safari, Android Chrome)

---

## 📄 License & Credits
- Design & Code: **VoltFix Pro Team**
- Icons: **Font Awesome 6 Free**
- Fonts: **Google Fonts (Inter & Cairo)**
- Images: **Unsplash Automotive Curations & Custom SVG Graphics**
