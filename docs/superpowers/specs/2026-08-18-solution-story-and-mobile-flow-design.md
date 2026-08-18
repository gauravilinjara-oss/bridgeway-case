# Bridgeway solution story and mobile flow

## Goal

Make the case-study solution feel connected to small-business owners before it explains the onboarding redesign.

The updated sequence should quickly show three ideas:

1. The old landing page did not help owners see themselves in Bridgeway.
2. The redesigned landing page begins with recognizable people and unfinished work.
3. Five short questions turn that recognition into useful business context.

Copy stays concise, conversational, and free of em dashes.

## Existing architecture

The case study is a static site contained in `index.html`. Its styles, markup, and JavaScript live in that file. Existing motion is based on CSS transitions, `requestAnimationFrame`, `IntersectionObserver`, and scroll progress. No new framework or animation library is needed.

The update will preserve:

- The 768 pixel reading column and sticky navigation rail
- Satoshi typography and the existing blue accent
- The current section order after the solution preview
- The pinned, scroll-controlled mobile prototype
- Responsive and reduced-motion behavior

## Updated solution sequence

The opening overview stays in place. The current solution preview will expand into three compact beats before the existing second-shift chapter.

### Beat 1: The missing connection

**Label:** The gap

**Headline:** The product explained the work. It did not make owners feel seen.

**Body:** Road-trip imagery felt far removed from the people Bridgeway was built for.

The visual will use a quiet comparison treatment with one current-state screenshot and a short annotation. The section should state the problem without repeating the later product audit.

### Beat 2: The landing-page redesign

**Label:** The landing page

**Headline:** Start with the owner, not the technology.

**Body:** Maya bakes. Alex coaches. Noor serves. Sofia creates. Bridgeway carries the work that follows them home.

Three screenshots from the redesigned landing page will appear in a scroll-led sequence:

1. The four-owner opening
2. Alex at 8:52 PM
3. Drafts ready by morning

Each screenshot receives one short caption. The live landing-page link remains available as a secondary action.

### Beat 3: The handoff to onboarding

**Label:** From recognition to understanding

**Headline:** Recognition first. Understanding next.

**Body:** Five questions help Bridgeway understand what makes the business theirs.

This beat connects the landing-page story to the existing translation model. It should not add a second explanation of the full onboarding flow.

## Mobile prototype sequence

The existing pinned phone layout remains. The supplied PNG screens replace the current JPEG assets.

| State | Source asset | Case-study role |
| --- | --- | --- |
| Introduction | `bridgeway-white-01-business-name.png` | Confirm the business name before the five questions |
| 1 of 5 | `bridgeway-white-02-story-beginning.png` | Choose the beginning |
| 2 of 5 | `bridgeway-white-03-marketing-direction.png` | Shape the marketing direction |
| 3 of 5 | `bridgeway-white-04-emotional-outcome.png` | Choose the emotional outcome |
| 4 of 5 | `bridgeway-white-04-customer-feeling.png` | Choose the customer takeaway |
| 5 of 5 | `bridgeway-white-05-connect-sources.png` | Connect existing sources |
| Confirmation | `bridgeway-white-05-connect-sources-1.png` | Confirm understanding and open the studio |

The introduction and confirmation are not counted as questions. The case-study copy will always describe five questions and seven displayed states.

Each state uses a short label, headline, and one sentence at most. The new copy will keep the current left-copy and right-phone composition.

## Motion design

Motion should help the reader understand the sequence. It should not compete with the screenshots.

### Landing-page story

- The screenshot stage stays pinned on larger screens.
- Screens crossfade with a 10 pixel upward shift as the active caption changes.
- A thin blue progress line shows movement through the three moments.
- The final morning screen settles without looping or ambient motion.

### Mobile prototype

- Phone screens crossfade with a small upward movement and subtle scale from 0.99 to 1.
- The active progress marker stretches vertically, then settles.
- Copy fades in at the same time as its screen.
- The confirmation check receives one soft pulse when it becomes active.
- Manual progress controls continue to scroll to the chosen state.

### Reduced motion

When `prefers-reduced-motion: reduce` is active, pinned storytelling becomes a simple vertical or horizontal sequence. Transforms, pulses, and smooth scrolling are removed. Content remains fully visible and usable.

## Responsive behavior

On desktop, the landing-page story and mobile flow use pinned two-column compositions.

On smaller screens:

- Screens become a horizontal scroll-snap rail.
- Copy sits above its associated media.
- Screenshots remain uncropped.
- Progress controls remain keyboard accessible.
- No section depends on scroll position to reveal essential content.

## Accessibility

- Every screenshot receives descriptive alternative text.
- Decorative progress treatments are hidden from assistive technology.
- Prototype controls use tab semantics with selected state.
- Focus styles remain visible.
- Color is not the only signal for the active state.
- Motion respects the visitor's reduced-motion preference.

## Implementation boundaries

The implementation will change `index.html` and add image assets under `assets/bridgeway/`. It will not redesign later chapters, change the landing-page project, or introduce a build step.

The repository will be changed locally first. Publishing or pushing changes is a separate handoff unless explicitly requested.

## Verification

Verification will cover:

- All seven supplied mobile screens appear in the correct order.
- The case study consistently says five questions.
- The new landing-page sequence appears before onboarding.
- Desktop and mobile layouts preserve the current page structure.
- Scroll controls, buttons, and navigation remain usable by keyboard.
- Reduced-motion mode exposes all content without pinned transitions.
- No image paths, section links, or existing interactions are broken.
- The updated page is visually reviewed in a local browser at desktop and mobile widths.
