---
title: "SaaS pricing and billing that scales"
date: 2026-06-14
tag: "Product"
author: "Dustin Schneider"
cover: "/img/blog/saas-pricing-billing.svg"
summary: "Pricing model and billing decide revenue, growth and daily effort. Which models exist, what they imply technically, and why billing is a product feature, not an afterthought bolted on at the end."
description: "A clear overview of SaaS pricing and billing: flat, per-seat, usage-based, tiered, freemium. What they mean technically, how subscriptions, dunning, proration and EU VAT fit together, and how your data model must carry pricing changes."
related:
  - "build-vs-buy"
  - "multi-tenant-from-day-one"
  - "mvp-without-cutting-corners"
---

The pricing model is often decided last, somewhere between launch stress and the first invoice. That's
an expensive reflex. **Pricing model and billing** are not a commercial footnote but a product feature
that shapes revenue, growth and daily effort. Choose the model cleanly and build it cleanly, and you
gain room to manoeuvre. Click it together, and you pay later with edge cases, disputes over invoices
and a data model that blocks every pricing change.

## Key takeaways

- The pricing model is a product decision with direct technical consequences, not just a tariff.
- Billing is a feature: subscriptions, invoices, dunning and proration need to be built properly.
- Self-service saves effort but requires a well thought-out data and permission model.
- Taxes and EU VAT are not a detail but a baseline requirement from day one.

## Why the pricing model is a product decision

A pricing model defines what customers pay for, and therefore what your system has to measure and
represent in the first place. If customers pay per user, you need reliable user management. If they pay
by usage, you need complete, tamper-proof tracking of that usage. So the model reaches deep into the
architecture. It isn't a marketing question alone, but a decision that shapes the data model, the
billing and even the boundaries of the product itself.

## The common pricing models at a glance

Most SaaS products move between a few basic patterns, often in combination. Each model is easy to
promise and differently demanding to implement cleanly:

- **Flat:** one fixed price for everything. Easy to understand, but inflexible as you grow.
- **Per-seat:** price per user. Clear and predictable, but it requires solid user management.
- **Usage-based:** billing by consumption. Fair and scalable, but technically the most demanding.
- **Tiered:** stepped packages with growing scope. Popular because it pairs choice with clarity.
- **Freemium:** free entry, paid extension. Lowers the barrier, but pushes the cost to the back.

## What the models mean technically

| Model | What gets billed | Technical effort | Typical pitfall |
| --- | --- | --- | --- |
| Flat | fixed amount per period | low | little room as you grow |
| Per-seat | active users | medium | counting correctly on join and leave |
| Usage-based | tracked consumption | high | complete, fair measurement |
| Tiered | package plus limits | medium | clean up- and downgrades |
| Freemium | paid extension | medium | a clear line between free and paid |

The insight behind the table matters more than the rows: the closer the price sits to actual usage, the
fairer it feels and the more your system has to measure, store and bill reliably.

## Billing is a feature, not a bolt-on

Many teams treat billing as something to finish quickly at the end. That backfires. Billing is far more
than a monthly charge: recurring subscriptions, correct invoices, reliable dunning for failed payments
and proportional charging when a customer switches mid-period. Each of these has edge cases, and every
edge case not considered from the start later becomes a support ticket or an incorrect invoice. A
concrete implementation such as Stripe takes some of this work off your plate, but it doesn't replace
the decision of how your product should handle these cases.

## Subscriptions, invoices, dunning and proration

Behind these four terms sits the daily reality of any billing system. **Subscriptions** record who has
subscribed to what on which terms. **Invoices** must be correct, traceable and legally sound. **Dunning**,
the handling of failed payments, decides whether lost revenue is recovered or quietly drains away. And
**proration**, the proportional charging when a customer switches mid-period, is the classic
underestimated edge case: someone who upgrades halfway through expects a fair, traceable invoice, not an
arbitrary number.

## Self-service: less effort, higher demands

Self-service means customers manage their plan, payment details and invoices themselves, without asking
you. Over time that saves enormous effort and looks professional. But it isn't a pure front-end matter.
For customers to up- and downgrade, cancel or change payment details safely on their own, you need a
well thought-out data model and a clear permission system. Especially in structures where multiple
customers run on one platform, you have to ensure each one sees and changes only their own data. More on
this in [Multi-tenant from day one]({{< relref "/blog/multi-tenant-from-day-one" >}}).

## Taxes and EU VAT are not optional

As soon as money flows, tax becomes relevant, and in the EU that's no side issue. VAT depends on who
buys and where: private customer or business, domestic or in another EU country. Sales to businesses in
other EU countries may fall under the reverse-charge mechanism, and sales to private customers in other
EU countries can trigger special rules. Your billing has to recognise all of this correctly, show it on
the invoice and document it cleanly. A billing system that tries to add tax afterwards fails on exactly
these cases. Tax belongs in the model from the start.

## The data model has to carry pricing changes

Prices change. You introduce new packages, adjust amounts, run promotions or switch the model entirely.
The decisive question is whether your system can absorb that without throwing existing customers into
disarray. That only works if the data model distinguishes, from the start, between what a customer
currently pays and what a tariff costs today. Mix the two, and you can't change prices without breaking
old subscriptions. A clean model records which customer is bound to which terms and lets new prices
exist alongside them. That's part of our work in
[SaaS Engineering]({{< relref "/services/saas-engineering" >}}).

## From the right model to a clean implementation

The path from pricing model to working billing follows a clear order. Keep to it, and you avoid the
most expensive mistakes:

1. **Choose a model** that fits the product and how your customers buy.
2. **Clarify measurement:** what exactly has to be tracked, and how reliably?
3. **Set up a data model** that cleanly separates current subscriptions from future prices.
4. **Build the billing,** including subscriptions, invoices, dunning and proration.
5. **Plan for tax and self-service** rather than treating them as a later add-on.

## Common mistakes in pricing and billing

- **Building billing last:** edge cases only surface once real money flows.
- **Mixing price and subscription:** makes every later pricing change a risk.
- **Retrofitting tax:** fails on EU reality and correct invoices.
- **Ignoring dunning:** failed payments quietly cost revenue.
- **Self-service without permissions:** opens the door to other people's data and errors.

## Frequently asked questions

**Which pricing model is best?**
There is no best model, only a fitting one. What matters is how your customers buy and what your product
delivers. Often a combination makes sense, such as a base package with a usage-based component.

**Do I need professional billing from the start?**
As soon as money flows regularly, yes. Billing built cleanly from the beginning saves you expensive
rebuilds once the first edge cases and real invoices appear.

**Can I just connect Stripe and be done?**
A concrete implementation such as Stripe takes a lot of work off your plate, but it makes no decisions
for you. How your product handles switches, taxes and edge cases still has to be modelled cleanly.

**How do I handle EU VAT?**
Your billing has to recognise who buys where, apply the correct tax and show it correctly. That belongs
in the model from the start, not as a later correction.

**What does proration mean exactly?**
Proration is the proportional charging when a customer switches mid-billing-period. It ensures nobody
pays for unused time or gets used time for free.

**How do I change prices later without chaos?**
By having the data model separate, from the start, what a customer currently pays from what a tariff
costs today. Then new prices can be introduced without altering existing subscriptions.

## Conclusion

Pricing model and billing are not an appendix but a core part of your product. Choose the model to match
how customers buy, build the billing as a real feature, and prepare the data model for future pricing
changes, and you gain room to manoeuvre instead of later edge cases. That's how billing grows with the
product instead of holding it back.

Learn more on [SaaS Engineering]({{< relref "/services/saas-engineering" >}}). Related posts:
[Shipping an MVP without cutting corners]({{< relref "/blog/mvp-without-cutting-corners" >}}) and
[Build versus buy]({{< relref "/blog/build-vs-buy" >}}).
