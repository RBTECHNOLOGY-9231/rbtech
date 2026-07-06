# Design Specification: Abstract Portfolio Redesign
**Date:** 2026-07-06
**Status:** Approved
**Goal:** Transform the current static portfolio into a premium, "Bold Agency" experience using a Neo-Brutalist aesthetic.

## 1. Visual Identity

### 1.1 Color Palette
The palette is designed for maximum impact and professional contrast.

| Element | Color Hex | Role |
| :--- | :--- | :--- |
| **Primary Background** | `#0A0A0A` | Deep Charcoal base for the entire site |
| **Surface/Card** | `#141414` | Elevated background for Bento blocks |
| **Primary Accent** | `#CFFF00` | Electric Lime - used for CTAs, highlights, and borders |
| **Primary Text** | `#FFFFFF` | Pure White for headings and key content |
| **Secondary Text** | `#A1A1AA` | Cool Gray for body text and descriptions |

### 1.2 Typography
A power pairing designed to balance impact with readability.

| Style | Font Family | Usage | Characteristics |
| :--- | :--- | :--- | :--- |
| **Headings** | `Archivo Black` | Page titles, Section headers | Heavy, bold, commanding |
| **Body** | `Inter` | Paragraphs, descriptions | Clean, modern, highly readable |
| **Accents** | `JetBrains Mono` | Labels, Dates, Small details | Tech-focused, developer aesthetic |

---

## 2. Layout & Structure (Bento Architecture)

The site will move from a linear stack to a dynamic grid-based architecture.

### 2.1 Hero Section
*   **Layout:** Asymmetric split.
*   **Left Side:** Massive `Archivo Black` heading with the rotating text integrated as a focal point.
*   **Right Side:** Hero image housed in a stylized, rounded-corner container with a `2px` Electric Lime border.

### 2.2 About Section (Bento Grid)
A cluster of functional blocks instead of a simple two-column layout:
*   **Bio Block (Large):** Core narrative using `Inter` font.
*   **Image Block (Medium):** Profile picture with a refined modern crop.
*   **Stats Block (Small):** Quick facts (Location, Experience) in `JetBrains Mono`.
*   **CTA Block (Small):** High-contrast "Download CV" button.

### 2.3 Services Section (Irregular Grid)
*   **Layout:** A grid of varying card sizes.
*   **Visuals:** Surface color `#141414` with subtle borders.
*   **Interaction:** On hover, the background fills with `#CFFF00` and text inverts to `#0A0A0A`.

### 2.4 Portfolio Section (Masonry Gallery)
*   **Layout:** Dynamic Masonry Grid (cards of varying heights).
*   **Interaction:** Images start with a subtle grayscale/muted overlay. On hover, they snap to full color with a scale-up effect and a "View Project" overlay.

---

## 3. Interactions & Animations

Powered by GSAP for cinematic fluidity.

### 3.1 Navigation & Page Transitions
*   **Menu Entrance:** "Curtain" effect. A solid panel wipes the screen, followed by a staggered slide-in of navigation links.
*   **Page Transition:** "Multi-Layer Wipe." Two overlapping panels (Charcoal and Lime) slide across the screen at different speeds to hide the content switch.

### 3.2 Context-Aware Cursor
*   **Idle State:** Small, subtle white ring.
*   **Hover State (Interactive):** Expands into a larger circle that inverts the colors of the text/element beneath it.
*   **Hover State (Projects):** Transforms into a "View" label.

### 3.3 Scroll Orchestration
*   **Entrance:** "Staggered Reveal." As the user scrolls, Bento blocks slide up and fade in one by one rather than appearing all at once.
*   **Fluidity:** All transitions will use a `power3.out` or `expo.out` easing for a "snappy yet smooth" professional feel.

---

## 4. Technical Requirements
*   **Stack:** HTML, CSS, JavaScript (Vanilla/jQuery).
*   **Libraries:** GSAP (Animations), particles.js (Background).
*   **Responsiveness:** 
    *   Mobile: Stacked Bento blocks with full-width cards.
    *   Tablet: 2-column Bento hybrid.
    *   Desktop: Full asymmetric grid.
