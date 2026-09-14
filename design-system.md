# Luxon Stone India — Digital Design System

## Brand direction
Architectural Editorial × Premium Materials × Institutional B2B.

The interface is intentionally warm, restrained, technical and image-led. The design should feel like an architectural presentation document turned into a premium interactive website.

## Colour tokens
- Warm Off-White: `#F3F0E9` — primary page background
- Soft Ivory: `#FAF9F5` — hero/content surfaces
- Deep Charcoal: `#181817` — high-contrast sections, footer, primary type
- Graphite: `#292927` — secondary dark surfaces
- Stone Grey: `#8E8A82` — metadata, borders, secondary copy
- Architectural Bronze: `#B28A45` — restrained CTA accent, active indicators, technical details

Target ratio: 65% warm off-white/ivory, 20% charcoal/graphite, 10% stone grey, 5% bronze.

## Typography
Display: Space Grotesk 600/500, tight tracking, editorial scale.
Body: Manrope 400–700, readable technical copy.

## Layout
Desktop container: `min(1360px, 100vw - 72px)`.
Mobile container: `100vw - 32px`.
Use asymmetry, whitespace, thin rules, section numbering, measurement-like labels and large photography.

## Components
- Header with editorial nav and restrained conversion CTA
- Primary charcoal CTA with bronze border + sweep
- Technical section index
- Comparison panels with central divider
- Product image blocks (not SaaS cards)
- Feature strip with fine rules
- Asymmetric editorial gallery + lightbox
- Process documentation blocks
- Dark conversion/contact panel
- Map/location placeholder integrated visually into the dark section

## Motion
Anime.js 3.2.2 is used for:
- page-load line/brand sequence
- hero typography and image settling
- scroll reveals with horizontal/vertical motion
- lightbox entrance

CSS handles the material hover states and reduced-motion fallback.

Motion rule: behave like architecture and material, never like software.

## Interaction
Desktop cursor: small dot + refined ring that expands over interactive surfaces.
Buttons: magnetic pointer response and subtle metallic sweep.
Images: 1.02–1.04 scale on hover with brightness lift and reflective sweep.

## Accessibility/performance
- Semantic landmarks and labeled form fields
- `prefers-reduced-motion` respected
- native smooth scrolling; no scroll hijacking
- native lazy loading on below-fold imagery
- only transform/opacity driven entrance animation
- responsive single-column mobile composition
