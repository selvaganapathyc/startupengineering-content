---
title: MVP Done Right
tags: [product, mvp, discovery, shipping]
summary: The MVP concept is widely misunderstood — here's what it actually means and how to build one that teaches you something.
---

# MVP Done Right

"Minimum viable product" is the most-quoted, least-understood phrase in startups. It's not about being small. It's about **learning the most per unit of effort**.

## The original definition

Steve Blank / Eric Ries: the smallest thing you can build that tests your riskiest assumption with real users.

Two words do the work:

- **Minimum** — what's the *least* you can build?
- **Viable** — does it actually let users do the thing?

Both words matter. Drop either and you get the wrong product.

## The two failure modes

### Too minimum
A landing page with a button that does nothing. A "waitlist." A Figma mockup. These test whether people will *click* — they don't test whether people will *use*. Sign-up interest and real-world usage correlate weakly.

### Not viable
A product that technically works but can't solve the user's problem. They hit the bug, leave, never come back. You "launched" but learned nothing real.

The sweet spot is narrow: a product that does *one thing* well enough that a user can genuinely accomplish a task.

## Heuristics

- **One user, one job, one workflow.** If you can describe the MVP as a paragraph, it's still too broad.
- **Ship ugly, not broken.** Design can wait. Reliability cannot.
- **Cut features, not polish on the remaining ones.** A product that does three things is worse than one that does one thing.
- **Pick a real user, not a persona.** Build for one specific human who has the problem. Iterate with them.
- **Skip the dashboard.** Unless the dashboard *is* the product. Nobody uses empty dashboards.

## What to cut ruthlessly

- Auth beyond email magic link.
- Billing before you have 3 paying users.
- Admin panels (use the database).
- Settings pages with one toggle.
- Docs beyond a README.
- Mobile apps if the web works.
- Onboarding flows beyond "welcome, here's the one button."

## What not to cut

- The core loop working reliably.
- The thing the user pays you for (even if free today).
- A way to observe what users actually do.
- A way to talk to them directly.

## When to stop calling it an MVP

When people pay for it. When they complain about it missing features instead of crashing. When you feel embarrassed showing it, but users don't care. That's the signal to stop iterating on "what does it do" and start iterating on "how well does it do it."

## Related
- [Finding PMF](./finding-pmf.md)
