# Save Our Strays — website refresh

A rebuilt front end for [Save Our Strays, Inc.](https://saveourstraysinc.com/), a volunteer-run
501(c)(3) cat and kitten rescue in Pinellas County, Florida, operating since 1994.

> **This is a redesign, not the live site.** It is an unofficial working prototype built from
> Save Our Strays' own published content. The organisation's official website is
> <https://saveourstraysinc.com/>.

## What this is

Static HTML and CSS. No build step, no framework, no dependencies. Nine pages plus one shared
stylesheet and one shared script.

The brief was to take the organisation's existing content and offers and present them against
current best practice — not to invent programmes, copy or claims they do not already make. Every
figure, policy and paragraph traces back to something they publish.

## Running it

Any static file server will do:

```bash
python -m http.server 8347
```

Then open <http://127.0.0.1:8347/>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: mission, three ways to help, featured cats, cost breakdown, locations, FAQ, partners |
| `adopt.html` | Adoption process, fee and what it covers, requirements, locations, Cat Haven gallery, FAQ |
| `adoptables.html` | All 31 adoptable cats with filtering by name, age, sex, bonded pair and special needs |
| `volunteer.html` | Fostering and volunteering, what the rescue provides, application process |
| `donate.html` | Ways to give, where the money goes, planned giving, public paperwork |
| `contact.html` | Phone, email, post, and where to meet the cats in person |
| `news.html` | Newsletter and press |
| `privacy.html` | The organisation's full privacy policy and terms of use, reproduced verbatim |
| `internal.html` | Staff and volunteer forms. Not in the public navigation, and `noindex`, mirroring how the live site holds it |

## Notes on the data

Cat listings are a point-in-time snapshot of the rescue's
[Petstablished](https://petstablished.com/) records, captured 24 July 2026 — 31 cats, each linking
to its live profile. They are static here; a production build should read the API directly so the
page cannot go stale.

Photographs and logos are hot-linked from the organisation's own servers and from Petstablished.
Three source photos have white padding baked into the image file itself; these are cropped in CSS
via the `--crop` custom property rather than by editing anyone's originals.

## Accessibility and standards

Built against WCAG 2.2 AA. Colour pairs clear 4.5:1 for body text and 3:1 for large text and
non-text; focus is always visible; interactive targets meet the 24px minimum, with 44px on touch
pointers. Motion respects `prefers-reduced-motion`, and the scroll-reveal effect is progressive
enhancement — every page is complete and readable with JavaScript disabled.

Not yet verified: keyboard-only navigation end to end, screen-reader output, and real-device touch
testing.

## Open questions for the organisation

Carried over from building this, and worth resolving at the source:

- **The adoption fee is inconsistent across their properties.** $150 on the live site, $125 on an
  orphaned `/adoption-process/` page, $100 on their Petfinder profile. This build uses **$150**.
- **"No declawing"** appears as an adoption condition on the orphaned page but not on the current
  one. Left out here rather than reinstate a term they may have dropped deliberately.
- **A Google Forms `/edit` URL is exposed publicly** on their live adopt page. Not reproduced here.
  Worth checking that form's sharing permissions.
- **Two cats have incomplete Petstablished records** — no age set for Puffin, no sex for Violet —
  so each disappears from that filter.
- **Some cat bios list 727 545-1116** rather than the main 727-481-5262, and Gandy's photo has her
  name burned into the image.

## Licence

The code is offered freely to Save Our Strays. All Save Our Strays branding, photography and
copy remain the property of Save Our Strays, Inc.
