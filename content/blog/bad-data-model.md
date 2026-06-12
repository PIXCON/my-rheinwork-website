---
title: "The hidden cost of a bad data model"
date: 2026-05-09
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/bad-data-model.svg"
summary: "The most painful software problems start in the data model. Why care at the start pays off many times over, how to recognise a model that lasts, and how to fix a bad one."
description: "Why the data model decides whether software grows or stalls: hidden costs, warning signs, the hallmarks of a good model and how to fix it without a full rebuild."
---

Ask experienced engineers where the deepest problems in software live, and a surprising number point to
the same unremarkable place: the **data model**. It appears in no pitch deck, no customer ever sees it —
and yet it decides whether a product grows elegantly for years or gets more expensive and slower with
every change. This article shows why that is, what costs a weak model causes, and how to do it better.

## Key takeaways

- The data model is the invisible foundation of every piece of software — it decides what's easy and
  what's expensive.
- A weak model causes hidden costs: slower development, more bugs, poor analysability.
- The cheapest opportunity to get it right is always at the start.
- A bad model can usually be fixed step by step — without a complete rebuild.

## What is a data model — briefly and without jargon?

The data model describes **what information your software stores and how it's connected**: customers,
orders, products, invoices, user roles — and the relationships between them. It's the foundation every
feature stands on. A feature is only ever as flexible as the model that has to carry it.

## The model shapes everything built on top of it

How you structure your data quietly determines which features are easy and which become nearly
impossible. A clear model makes new ideas **cheap to build**. A tangled one turns every change into a
negotiation with the past.

An example: if a shop stores the delivery address directly on the order record, it later struggles to
represent multiple addresses per customer, differing billing addresses, or an address history. What
began as a small simplification becomes the wall every new feature runs into.

## The hidden costs in detail

A weak data model rarely sends an invoice with a clear label. The costs hide — and add up:

- **Slower development:** features take twice as long because the model constantly gets in the way.
- **More bugs:** if data sits in several places, it ends up contradicting itself — and bugs pile up.
- **Expensive workarounds:** instead of fixing the model, helper constructions are built that cement
  the problem.
- **Poor analysability:** those who store messily can barely analyse reliably later — and make
  decisions blind.
- **Burned trust:** when every change takes weeks and carries risk, the collaboration between team and
  client suffers.

## Why cleaning it up later is so expensive

Changing a weak data model once a lot of code and, above all, **real production data** depend on it is
like swapping the foundation under an inhabited house. Possible — but costly, risky and slow. Every
migration has to carry existing data over without loss, and every mistake hits real customers. That's
exactly why the cheapest opportunity by far is always **at the start**.

## How to recognise a model that lasts

- **Clear, consistent naming:** terms are called the same everywhere and mean the same everywhere.
- **A single source of truth:** each piece of information has exactly one place where it's "real".
- **Deliberate relationships:** connections between data are chosen on purpose, not grown by accident.
- **Extensibility:** new requirements can be added without rebuilding what exists.
- **Understandability:** even a new developer grasps the model in a short time.

## Warning signs of a bad model

- The same information sits in several places and has to be "kept in sync".
- Nobody dares to touch certain tables or fields anymore.
- Simple analyses require complicated special logic.
- For every edge case there's an extra "flag" field whose meaning hardly anyone knows.

If that sounds familiar, it's no reason to panic — but a clear signal to steer against it sooner rather
than later.

## A real-world example

Picture an online shop that stores the delivery address directly on the order record — quick to build,
works for the first order. Then the real requirements arrive: a customer wants to save multiple
addresses. The billing address differs from the delivery address. An old order should show the address
**as it was then**, not the current one. Suddenly each of these self-evident requirements is a major
rebuild — because the model assumed "one address per order".

Had addresses been modelled from the start as their own entity linked to the customer, all these cases
would be trivial. This is exactly where it's decided whether later features cost hours or weeks.

## Data model, performance and analysability

A good data model has effects far beyond development:

- **Performance:** clean structures can be queried efficiently. Tangled models force complicated, slow
  queries — the site becomes sluggish without the "actual" feature being to blame.
- **Analysability:** those who store cleanly can analyse reliably later. A chaotic model turns every
  analysis into tinkering — undermining the very data-driven decisions that matter.
- **Tracking & reporting:** measurement also builds on the data model. If states and events are
  represented messily, the metrics won't add up in the end either.

## How much modelling is enough?

The art lies between two extremes. Too little modelling backfires, as described, with every extension.
Too much — pre-modelling every conceivable future — bloats the system and slows it down too. Our
yardstick: the model represents **today's** requirements cleanly and deliberately leaves room for the
**foreseeable next** thing, without getting lost in speculation. Good engineering here is less
clairvoyance than experience — knowing which assumptions tend to get expensive.

## Data model and security

An often-overlooked point: security begins in the data model too. Those who separate clearly from the
start which data belongs to which customer, which role and which access prevent a whole class of
problems — from accidentally exposed data to tenants seeing each other's data. A clean model makes it
easy to assign rights correctly; a chaotic one invites mistakes that, in the worst case, only surface
after a data leak.

## A short checklist before the first line of code

Before much code exists, it's worth answering a few questions honestly:

- What are the **central terms** in the domain — and does everyone mean the same by them?
- Where is the **single source of truth** for each piece of information?
- Which **relationships** between the data are already clear, which still open?
- Which extensions are **foreseeable** — and does the model represent them without a rebuild?
- Who may **see and change which data**?

This half-hour of thinking at the start is often worth more than weeks of later refactoring.

## Frequently asked questions

**Is a perfect data model realistic from the start?**
No — and that's not the goal either. What matters is a model that represents today's requirements
cleanly and deliberately leaves room for foreseeable extensions, without getting lost in speculation.

**Is the care worth it even for a small MVP?**
Especially there. A lean but clean model is the difference between an MVP that grows with you and one
you have to rebuild after the first success.

**Can a bad model be fixed without starting over?**
In most cases, yes — through step-by-step migration. A complete rebuild is rarely necessary and often
the bigger risk.

**Who should be involved in the data model?**
Ideally tech and the business side together. The model represents the domain — and nobody knows it
better than the people who work with it every day. Good modelling is a conversation, not just code.

**Will my customer even notice anything about the data model?**
Directly, no — indirectly, constantly. Fast new features, reliable analytics and stable software are
all a consequence of the model underneath.

**How long does it take to set up a data model cleanly?**
Its share of total project time is manageable — often days rather than weeks. Measured against the weeks
a bad model costs later, it's by far the cheapest investment in the whole project.

**Does a good data model slow down the initial development?**
Barely. The upfront thinking costs days, not weeks — and it removes the friction that would otherwise
slow down every later feature. Net, it makes development faster, not slower.

## Conclusion

Clean engineering starts below the surface — at the foundation no one sees. Those who invest early in a
solid data model save themselves many times the effort, bugs and frustration later.

Learn more on [Software Engineering](/en/services/software-engineering/). Related posts:
[Shipping an MVP without cutting corners](/en/blog/mvp-without-cutting-corners/) and
[Why we choose boring technology](/en/blog/boring-technology/).
