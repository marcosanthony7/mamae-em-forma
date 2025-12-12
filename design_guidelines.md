# Design Guidelines: Aplicativo de Recuperação Pós-Parto

## Design Approach
**Reference-Based:** Duolingo (gamification mechanics) + Calm/Headspace (wellness aesthetic) + feminine health apps (Flo, Ovia)

**Core Principles:**
- Maternal warmth and emotional support through soft, welcoming visuals
- Progress-driven gamification that celebrates small wins
- Effortless mobile navigation with thumb-friendly interactions
- Gentle animations that feel nurturing, not distracting

## Typography System
**Primary Font:** Inter or Poppins (Google Fonts)
- Headlines: 600-700 weight, 24-32px
- Subheadings: 500 weight, 18-20px  
- Body: 400 weight, 16px
- Captions: 400 weight, 14px

**Secondary (Accent):** DM Serif Display or Crimson Text for motivational quotes
- Quote text: 500 weight, italic, 18-22px

## Layout & Spacing System
**Tailwind Units:** Consistently use 2, 4, 6, 8, 12, 16, 20 spacing
- Component padding: p-4 to p-6 on mobile, p-6 to p-8 on desktop
- Section gaps: gap-4 to gap-6
- Container max-width: max-w-md (mobile-first), max-w-4xl (desktop)

## Component Library

### Navigation
**Bottom Tab Bar (Mobile Primary):**
- 5 icons: Dashboard, Treinos, Alimentação, Diástase, Extras
- Active state: filled icon with subtle gradient
- Height: 72px with safe-area padding
- Fixed position with backdrop blur

**Top Bar:**
- User greeting: "Olá, [Nome]" with small avatar
- Streak counter with flame icon
- Notification bell
- Height: 64px

### Dashboard Components

**Progress Journey Card:**
- Large circular progress ring showing day X/30
- Central motivational phrase in serif font
- Subtle gradient background (pink-to-purple)
- Corner badges for streaks/achievements

**Daily Action Cards (Grid):**
- 2-column grid on mobile (grid-cols-2 gap-4)
- Rounded corners: rounded-2xl
- Icon + label + progress indicator
- Subtle shadow: shadow-md with colored accent
- Height: ~160px each

**Achievement Badges:**
- Horizontal scroll carousel
- Locked/unlocked states with opacity
- Size: 80x80px
- Sparkle animation on unlock

### Training Screen Components

**Video Player Card:**
- 16:9 aspect ratio container
- Play button overlay with blur backdrop
- Duration badge (top-right)
- Rounded-xl corners

**Exercise List Items:**
- Checkbox (custom styled, large tap target: 44x44px)
- Exercise name + duration/reps
- Expansion panel for instructions
- Difficulty badge (color-coded)
- Padding: p-4, gap-3 between items

**Adaptation Toggles:**
- Pill-style selection (Parto Normal / Cesárea)
- Active state with gradient fill
- Icon indicators for modifications

### Nutrition Screen Components

**Weekly Menu Tabs:**
- Horizontal scroll tabs (Segunda - Domingo)
- Active tab with bottom border gradient
- Sticky positioning

**Recipe Cards:**
- Food image (rounded-lg, 1:1 ratio)
- Recipe name + prep time
- Quick tags (Rápida, Energética, etc.)
- Favorite heart icon (top-right)

**Shopping List:**
- Grouped by category with headers
- Checkbox items with strike-through
- "Add to cart" export button

### Diastasis Tester

**Step-by-Step Guide:**
- Numbered steps with large, clear illustrations
- Progress dots indicator
- "Próximo" / "Anterior" navigation
- Height: min-h-screen sections

**Interactive Assessment:**
- Visual finger-width selector (1-4+ dedos)
- Immediate feedback with color coding
- Recommendations panel that expands
- Save result button

### Content Extras

**Video Grid:**
- 2-column grid (mobile), 3-column (tablet+)
- Thumbnail + duration + title
- Category filter pills (sticky)
- Watch progress indicator

**FAQ Accordion:**
- Question in medium weight
- Chevron indicator
- Answer with gentle expand animation
- Padding: p-5 per item

## Visual Elements

### Icons
**Library:** Heroicons (outline for inactive, solid for active)
- Size: 24px standard, 28px for primary actions, 20px for inline
- Stroke-width: 2px

### Illustrations
**Placement:**
- Empty states: centered, 200x200px
- Exercise guides: full-width with breathing room
- Achievement celebrations: modal overlays

**Style Notes:** Soft, rounded figures in pastel tones, minimal line work, friendly facial expressions

### Images
**Hero Section (Dashboard):**
- Soft gradient mesh background (no photo) with floating geometric shapes
- Motivational text overlay with blur-backed container

**Content Images:**
- Recipe photos: rounded-lg, aspect-square
- Exercise demonstrations: rounded-xl, aspect-video
- Achievement badges: circular, 80-120px

## Animations & Interactions

**Micro-interactions (Sparingly):**
- Checkbox completion: scale + rotate
- Progress ring: smooth fill animation (2s ease-out)
- Tab switches: slide transition (300ms)
- Achievement unlock: confetti + scale pulse

**Avoid:**
- Page transition animations
- Continuous looping animations
- Parallax scrolling

## Gamification Elements

**Progress Indicators:**
- Circular progress rings (primary)
- Linear progress bars (secondary)
- Percentage badges

**Rewards System:**
- Daily streak flame counter
- Star/point accumulation display
- Milestone badges (7 dias, 15 dias, 30 dias)
- Encouraging messages on completion

**Visual Feedback:**
- Completed items: opacity-60 + check icon
- Locked content: opacity-40 + lock icon
- Next recommended: subtle pulse glow

## Responsive Behavior

**Mobile (< 768px) - Primary:**
- Single column layouts
- Bottom navigation primary
- Sticky headers with minimal height
- Full-width cards with 16px side padding

**Tablet/Desktop (≥ 768px):**
- Max-width containers centered
- 2-3 column grids where appropriate
- Side navigation option
- Increased padding (24-32px)

## Accessibility
- Minimum touch target: 44x44px
- Color contrast: AA minimum (4.5:1 for text)
- Focus indicators: 2px solid ring with offset
- Form labels always visible (no placeholder-only)
- Video captions available

This design creates a nurturing, progress-focused experience that emotionally supports mothers through their 30-day recovery journey with clear visual hierarchy, intuitive navigation, and celebratory gamification mechanics.