---
name: Morphy
description: Cinematic page transitions for Next.js, built on Framer Motion.
colors:
  primary: "#fa5c4f"
  neutral-bg: "#ffffff"
  neutral-surface: "#f4f4f5"
  neutral-border: "#e4e4e7"
typography:
  display:
    fontFamily: "\"Space Grotesk\", ui-sans-serif, system-ui, sans-serif"
  body:
    fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif"
  mono:
    fontFamily: "\"JetBrains Mono\", ui-monospace, monospace"
  cursive:
    fontFamily: "\"Caveat\", cursive"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "2rem"
  full: "9999px"
spacing:
  fast: "150ms"
  normal: "250ms"
  slow: "400ms"
components:
  sticker-pill:
    backgroundColor: "#fff1f0"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.625rem"
  morphy-card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.xl}"
---

# Design System: Morphy

## Overview

**Creative North Star: "The Cinematic Studio"**

Morphy is focused on storytelling, premium motion, and immersive flow. The design system acts as a stage—clean, unopinionated, and structured—so that the transitions themselves take the spotlight. It uses a high-energy coral accent to draw attention, balanced against a strict, monochrome structural canvas. The result is a highly tactile, responsive, and cinematic experience that feels like a premium interactive studio.

**Key Characteristics:**
- Zero visual clutter; content serves the motion.
- Interactions are deeply tactile (pressing, lifting, glowing).
- Typography shifts playfully between strict monospace and expressive cursive.

## Colors

The palette is a strict grayscale canvas punctuated by one high-energy accent.

### Primary
- **Signature Coral** (#fa5c4f): Vibrant, warm, and highly tactile. Used strictly for interactive focal points, hover borders, and active states. 

### Neutral
- **Page Background** (#ffffff): Pure white for extreme contrast in light mode.
- **Surface Background** (#f4f4f5): Subtle gray for layered panels and code blocks.
- **Border** (#e4e4e7): Soft structural dividers.
- **Text Main** (#09090b): Near-black for maximum readability.

### Named Rules
**The One Voice Rule.** Signature Coral is used sparingly. It should never overwhelm the screen; its rarity makes it powerful.

## Typography

**Display Font:** Space Grotesk
**Body Font:** Inter
**Label/Mono Font:** JetBrains Mono
**Accent Font:** Caveat (Cursive)

**Character:** The typography blends the technical precision of Inter and JetBrains Mono with the geometric, modern feel of Space Grotesk, occasionally using Caveat for human, expressive annotations.

### Hierarchy
- **Display**: Space Grotesk, tight letter-spacing (-0.02em). Used for all main headings (h1-h6).
- **Body**: Inter, highly readable.
- **Mono**: JetBrains Mono, used for code snippets and technical references.
- **Accent**: Caveat, used for playful, human-like annotations.

### Named Rules
**The Structural Display Rule.** Headings are always Space Grotesk with tightly tracked letter spacing to feel modern and structural.

## Layout

The layout is built on generous spacing and a centered, single-column reading experience to allow transitions to breathe. Smooth scrolling (Lenis) is standard, ensuring the viewport moves elegantly.

## Elevation & Depth

The system uses flat structures by default, relying on subtle borders. Depth is only revealed through interaction.

### Shadow Vocabulary
- **Hover Lift** (`0 12px 32px -8px rgba(250, 92, 79, 0.12)`): A subtle, warm coral glow that appears beneath cards and buttons on hover, accompanied by a `-2px` Y-axis lift.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows and glows appear exclusively as a response to state (hover or focus).

## Shapes

Forms are highly tactile with generous border radii (mostly `0.75rem` to `1.5rem`), giving everything a soft, friendly, and approachable silhouette.

## Components

### Morphy Cards
- **Shape:** Rounded xl (1.5rem radius) or 2xl.
- **Background:** Page background or subtle surface.
- **Border:** Light structural border.
- **Hover:** Border shifts to Signature Coral; card lifts -2px with a warm coral glow.

### Tactile Buttons
- **Shape:** Variable, often rounded.
- **Interaction:** Depresses slightly on active click (`scale(0.96) translateY(1px)`).

### Sticker Pills
- **Style:** Light coral background (`#fff1f0`) with Signature Coral text.
- **Shape:** Fully rounded pill (`9999px`).
- **Typography:** 0.6875rem, uppercase, heavily tracked (`0.05em`), bold.

## Do's and Don'ts

### Do:
- **Do** use Signature Coral to draw the eye to the single most important action on the page.
- **Do** wrap code elements and technical terms in the JetBrains Mono font.
- **Do** ensure all interactive elements feel tactile (lifting on hover, depressing on click).

### Don't:
- **Don't** use drop shadows on resting elements. Keep the baseline flat.
- **Don't** flood large areas with Signature Coral. It is an accent, not a background.
