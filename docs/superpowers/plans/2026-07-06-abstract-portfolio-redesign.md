# Abstract Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static portfolio into a premium "Bold Agency" experience with a Neo-Brutalist aesthetic and Bento-grid layout.

**Architecture:** Overhaul of a static HTML/CSS/JS project. The design focuses on a "Neon on Noir" palette and dynamic CSS Grid layouts. Animations are handled by GSAP.

**Tech Stack:** HTML5, CSS3 (CSS Grid, Flexbox, Variables), JavaScript (Vanilla/jQuery), GSAP, particles.js.

---

## File Mapping
- `Abstract-Portfolio-new/index.html`: Structural overhaul to support Bento grids and new sections.
- `Abstract-Portfolio-new/index.css`: Complete rewrite of styles to implement the new visual identity and responsive grids.
- `Abstract-Portfolio-new/index.js`: Implementation of refined GSAP animations and the context-aware cursor.

---

## Implementation Tasks

### Task 1: Visual Identity Foundation
**Files:**
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Implement CSS Variables for the Palette**
Add the following at the top of `index.css`:
```css
:root {
    --bg-primary: #0A0A0A;
    --bg-surface: #141414;
    --accent: #CFFF00;
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1AA;
    --font-heading: 'Archivo Black', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 2: Import New Google Fonts**
Add these imports to the top of `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
```

- [ ] **Step 3: Reset Global Styles**
Update the global reset to use the new variables:
```css
body {
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    font-family: var(--font-body);
    margin: 0;
    overflow-x: hidden;
}
h1, h2, h3, .heading {
    font-family: var(--font-heading);
    color: var(--text-primary);
    text-transform: uppercase;
}
```

- [ ] **Step 4: Commit**
```bash
git add Abstract-Portfolio-new/index.css
git commit -m "style: establish visual identity foundation and typography"
```

### Task 2: Hero Section Overhaul
**Files:**
- Modify: `Abstract-Portfolio-new/index.html`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Update HTML Structure for Asymmetric Split**
Replace the `#header` content with:
```html
<div id="header">
    <div id="particles"></div>
    <div class="header-container">
        <div class="header-text">
            <h1 class="hero-title">
                Shovith <span class="color">Debnath</span>
            </h1>
            <div class="hero-subtitle">
                I'm a <span class="txt-rotate color" data-period="1200" data-rotate='[ " Web Developer.", " Designer.", " Creator." ]'></span>
            </div>
        </div>
        <div class="header-image-container">
            <img src="man.jpg" alt="Shovith Debnath" class="hero-image">
        </div>
    </div>
</div>
```

- [ ] **Step 2: Implement CSS for Hero Layout**
Add to `index.css`:
```css
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    padding: 0 8%;
    position: relative;
    z-index: 2;
}
.hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 0.9;
    margin-bottom: 20px;
}
.hero-subtitle {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    color: var(--text-secondary);
}
.header-image-container {
    position: relative;
    width: 40%;
    aspect-ratio: 1/1;
    border: 2px solid var(--accent);
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.4s ease;
}
.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

- [ ] **Step 3: Commit**
```bash
git add Abstract-Portfolio-new/index.html Abstract-Portfolio-new/index.css
git commit -m "feat: implement asymmetric hero section with neon frame"
```

### Task 3: About Section - Bento Grid
**Files:**
- Modify: `Abstract-Portfolio-new/index.html`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Update HTML to Bento Structure**
Replace `#about-content` with:
```html
<div id="about-content">
    <div class="bento-grid">
        <div class="bento-item bio-block">
            <h2>About <span class="color">Me</span></h2>
            <p>I'm a creative web developer based in West Bengal, India. I specialize in building high-performance, visually stunning digital experiences that merge art with technology.</p>
        </div>
        <div class="bento-item image-block">
            <img src="about.jpg" alt="About Me">
        </div>
        <div class="bento-item stats-block">
            <div class="stat-item"><span>Location</span><br>West Bengal</div>
            <div class="stat-item"><span>Experience</span><br>20 Years</div>
        </div>
        <div class="bento-item cta-block">
            <a href="#" class="cv-button">Download CV</a>
        </div>
    </div>
</div>
```

- [ ] **Step 2: Implement CSS Grid for Bento**
Add to `index.css`:
```css
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 20px;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
.bento-item {
    background: var(--bg-surface);
    border: 1px solid #222;
    border-radius: 24px;
    padding: 30px;
    transition: border-color 0.3s ease;
}
.bento-item:hover { border-color: var(--accent); }
.bio-block { grid-column: span 2; grid-row: span 2; }
.image-block { grid-column: span 2; }
.stats-block { grid-column: span 1; font-family: var(--font-mono); }
.cta-block { 
    grid-column: span 1; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background: var(--accent);
}
.cta-block a { color: var(--bg-primary); font-weight: bold; text-decoration: none; }
```

- [ ] **Step 3: Commit**
```bash
git add Abstract-Portfolio-new/index.html Abstract-Portfolio-new/index.css
git commit -m "feat: implement about section with bento grid layout"
```

### Task 4: Services Section - Irregular Grid
**Files:**
- Modify: `Abstract-Portfolio-new/index.html`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Update HTML for Irregular Services**
Replace `.services-content` with:
```html
<div class="services-grid">
    <div class="service-card large">
        <ion-icon name="code-slash-outline"></ion-icon>
        <h3>Web Development</h3>
        <p>High-performance applications built with modern stacks.</p>
    </div>
    <div class="service-card">
        <ion-icon name="desktop-outline"></ion-icon>
        <h3>UI/UX Design</h3>
        <p>User-centric interfaces that drive conversion.</p>
    </div>
    <div class="service-card">
        <ion-icon name="bulb-outline"></ion-icon>
        <h3>Creative Strategy</h3>
        <p>Turning complex ideas into digital reality.</p>
    </div>
    <div class="service-card">
        <ion-icon name="phone-portrait-outline"></ion-icon>
        <h3>Mobile Apps</h3>
        <p>Responsive and native-feel mobile experiences.</p>
    </div>
</div>
```

- [ ] **Step 2: Implement Irregular CSS Grid**
Add to `index.css`:
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
.service-card {
    background: var(--bg-surface);
    border-radius: 24px;
    padding: 40px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.service-card.large { grid-column: span 2; }
.service-card ion-icon { font-size: 40px; color: var(--accent); margin-bottom: 20px; }
.service-card:hover {
    background: var(--accent);
    transform: translateY(-10px);
}
.service-card:hover h3, .service-card:hover p { color: var(--bg-primary); }
```

- [ ] **Step 3: Commit**
```bash
git add Abstract-Portfolio-new/index.html Abstract-Portfolio-new/index.css
git commit -m "feat: implement services section with irregular bento grid"
```

### Task 5: Portfolio Masonry Gallery
**Files:**
- Modify: `Abstract-Portfolio-new/index.html`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Update HTML to Masonry Structure**
Replace `#portfolio-content` with:
```html
<div class="portfolio-masonry">
    <div class="portfolio-item">
        <img src="project-1.jpg" alt="Project 1">
        <div class="portfolio-overlay">
            <h3>Finance</h3>
            <p>Web Development</p>
            <a href="#" class="view-btn">View Project</a>
        </div>
    </div>
    <!-- Repeat for other projects -->
</div>
```

- [ ] **Step 2: Implement Masonry Layout**
Add to `index.css`:
```css
.portfolio-masonry {
    column-count: 3;
    column-gap: 20px;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
.portfolio-item {
    break-inside: avoid;
    margin-bottom: 20px;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
}
.portfolio-item img {
    width: 100%;
    display: block;
    filter: grayscale(100%);
    transition: all 0.5s ease;
}
.portfolio-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.portfolio-item:hover img { filter: grayscale(0%); transform: scale(1.05); }
.portfolio-item:hover .portfolio-overlay { opacity: 1; }
```

- [ ] **Step 3: Commit**
```bash
git add Abstract-Portfolio-new/index.html Abstract-Portfolio-new/index.css
git commit -m "feat: implement portfolio with masonry gallery and color reveal"
```

### Task 6: Refined Navigation & Transitions
**Files:**
- Modify: `Abstract-Portfolio-new/index.js`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Implement "Curtain" Menu CSS**
Add to `index.css`:
```css
#navigation-content {
    background-color: var(--bg-primary);
    transform: translateY(-100%);
    transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}
.navigation-links a {
    font-family: var(--font-heading);
    font-size: 4rem;
    opacity: 0;
    transform: translateY(30px);
}
```

- [ ] **Step 2: Update JS for Staggered Entrance**
In `index.js`, update the `.menubar` click handler:
```javascript
$('.menubar').on('click', function(){
    gsap.to('#navigation-content', { duration: 0.6, y: 0, ease: "expo.inOut" });
    gsap.to('.navigation-links a', { 
        duration: 0.6, 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        delay: 0.3, 
        ease: "back.out(1.7)" 
    });
});
```

- [ ] **Step 3: Implement Multi-Layer Page Transition**
Add to `index.html` (before `</body>`):
```html
<div class="transition-layer layer-1"></div>
<div class="transition-layer layer-2"></div>
```
Add to `index.css`:
```css
.transition-layer {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    transform: translateX(-100%);
}
.layer-1 { background: var(--bg-primary); }
.layer-2 { background: var(--accent); z-index: 101; }
```
In `index.js`, create a function `transitionTo(targetId)`:
```javascript
function transitionTo(targetId) {
    const tl = gsap.timeline();
    tl.to('.layer-1', { duration: 0.4, x: '0%', ease: "expo.inOut" })
      .to('.layer-2', { duration: 0.4, x: '0%', ease: "expo.inOut" }, "-=0.2")
      .add(() => {
          // Hide all sections, show targetId
          $('[id$="-content"], #header, #about, #portfolio, #blog, #contact').hide();
          $('#' + targetId).show();
      })
      .to('.layer-2', { duration: 0.4, x: '100%', ease: "expo.inOut" })
      .to('.layer-1', { duration: 0.4, x: '100%', ease: "expo.inOut" }, "-=0.2");
}
```

- [ ] **Step 4: Commit**
```bash
git add Abstract-Portfolio-new/index.html Abstract-Portfolio-new/index.css Abstract-Portfolio-new/index.js
git commit -m "feat: implement curtain navigation and multi-layer transitions"
```

### Task 7: Context-Aware Cursor
**Files:**
- Modify: `Abstract-Portfolio-new/index.js`
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Update Cursor CSS**
Update `.cursor` in `index.css`:
```css
.cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--text-primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: width 0.3s, height 0.3s, background 0.3s;
}
```

- [ ] **Step 2: Implement Cursor Logic in JS**
Update the `cursormover` and hover handlers in `index.js`:
```javascript
$(window).on('mousemove', function(e) {
    gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
});

$('a, .menubar, .service-card, .portfolio-item').hover(
    function() {
        gsap.to('.cursor', { width: 80, height: 80, backgroundColor: 'white', opacity: 1 });
    },
    function() {
        gsap.to('.cursor', { width: 20, height: 20, backgroundColor: 'transparent', opacity: 0.6 });
    }
);
```

- [ ] **Step 3: Commit**
```bash
git add Abstract-Portfolio-new/index.js Abstract-Portfolio-new/index.css
git commit -m "feat: implement context-aware interactive cursor"
```

### Task 8: Scroll Orchestration (GSAP)
**Files:**
- Modify: `Abstract-Portfolio-new/index.js`

- [ ] **Step 1: Implement Staggered Reveal**
Add GSAP scroll trigger logic to `index.js`:
```javascript
// Note: Ensure ScrollTrigger plugin is loaded in index.html
gsap.registerPlugin(ScrollTrigger);

$('.bento-item, .service-card, .portfolio-item').each(function(i) {
    gsap.from(this, {
        scrollTrigger: {
            trigger: this,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
    });
});
```

- [ ] **Step 2: Commit**
```bash
git add Abstract-Portfolio-new/index.js
git commit -m "feat: implement staggered scroll reveals"
```

### Task 9: Responsiveness & Final Polish
**Files:**
- Modify: `Abstract-Portfolio-new/index.css`

- [ ] **Step 1: Mobile Bento Layout**
Add to media query `max-width: 768px`:
```css
.bento-grid, .services-grid {
    grid-template-columns: 1fr;
}
.bio-block, .image-block, .stats-block, .cta-block, .service-card.large {
    grid-column: span 1;
}
.header-container {
    flex-direction: column;
    text-align: center;
}
.header-image-container {
    width: 80%;
    margin-top: 40px;
}
```

- [ ] **Step 2: Commit**
```bash
git add Abstract-Portfolio-new/index.css
git commit -m "style: ensure full mobile responsiveness for bento layouts"
```

### Task 10: Local Build & Vercel Prep
**Files:**
- Create: `Abstract-Portfolio-new/vercel.json`

- [ ] **Step 1: Create vercel.json for Deployment**
```json
{
  "cleanUrls": true,
  "framework": null
}
```

- [ ] **Step 2: Final Local Verification**
Run a local server (e.g., `npx serve .`) and verify:
1. Hero asymmetric split looks correct.
2. Bento grids are responsive.
3. Cursor inverts colors on hover.
4. Transitions are smooth.

- [ ] **Step 3: Final Commit**
```bash
git add Abstract-Portfolio-new/vercel.json
git commit -m "chore: add vercel configuration for deployment"
```
