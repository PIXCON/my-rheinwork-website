---
title: "Technical debt, honestly explained"
date: 2026-06-14
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/technical-debt-explained.svg"
summary: "Technical debt sounds like a developer-only concern, but it's a very real business cost. How it accrues, the interest it charges and how to pay it down without rebuilding everything."
description: "Technical debt explained for decision-makers: what it is, how it accrues, the costs it charges, good versus bad debt and how to pay it down without a full rewrite."
related:
  - "bad-data-model"
  - "boring-technology"
  - "keeping-software-running"
---

When building new features suddenly gets harder, even though the team is the same, it's rarely a lack of
effort. Usually something invisible is speaking up: **technical debt**. The term sounds like a
developer-only concern, but it's really an ordinary business cost that never appears on a balance sheet
and yet charges interest every month. This article explains, in business terms, what technical debt is,
how it accrues and how to keep it under control, without fleeing into an expensive full rewrite.

## Key takeaways

- Technical debt is a business cost, not a developer-only concern. It slows features and raises risk.
- It accrues gradually, through haste, shortcuts and changing requirements, not through bad work.
- There is deliberate, good debt and unnoticed, expensive debt. The difference is intent.
- You pay it down step by step, where it hurts, instead of rebuilding everything at once.

## What technical debt really is

Picture technical debt as a loan. You get something faster today by taking a shortcut, and you pay it
back later, with interest. That interest isn't an abstract idea: it shows up as **slower development,
more bugs and higher cost** on every further change. The code works, the product runs, but beneath the
surface every new feature becomes a little more expensive than it needs to be. This quiet inflation of
cost is the real problem.

## How technical debt accrues

Technical debt is rarely the result of bad work. It accrues for perfectly normal, understandable reasons:

- **Time pressure:** a deadline looms, so the quick solution wins over the clean one.
- **Changing requirements:** what was right a year ago no longer fits today's reality.
- **Missing knowledge at the start:** some relationships only become clear once the product is in use.
- **Provisional fixes that stay:** a stopgap remains because it works, and becomes permanent.

None of these reasons is shameful. It only becomes a problem when nobody records which debt was taken
on, and nobody ever pays it back.

## The interest technical debt charges

The comparison with a loan fits so well because the interest is very real. It just doesn't appear as a
line item; it spreads across daily work instead:

- **Slower features:** every change has to fight through old baggage before it can take effect.
- **More bugs:** tangled areas are error-prone, and one bug often drags the next along behind it.
- **Higher cost:** what should be quick takes long, and in engineering, time is the biggest cost factor.
- **More risk:** nobody dares touch sensitive areas, so improvements stall out of fear.
- **Team frustration:** good developers lose motivation when every task fights against their own system.

This interest isn't paid by the technology alone but by the whole business, in the form of missed launches
and rising maintenance costs.

## Good debt, bad debt

Not all technical debt is bad. The decisive difference is intent. **Good debt** is taken on deliberately:
you choose a faster solution because speed matters more than elegance right now, and you note that this
spot needs cleaning up later. **Bad debt** accrues unnoticed, with no plan to repay it. A deliberate
shortcut before an important launch can be smart. The same shortcut, forgotten and multiplied, becomes a
burden.

| Trait | Good debt | Bad debt |
| --- | --- | --- |
| Origin | Decided deliberately | Accrued unnoticed |
| Documentation | Recorded and visible | Lives in a few people's heads |
| Repayment | Planned and scheduled | Never intended |
| Effect | Speed at the right moment | Steadily rising interest |

## How to recognise technical debt

You don't have to be a developer to spot the warning signs:

- Simple changes take surprisingly long, and nobody can quite explain why.
- After every new feature, bugs appear in seemingly unrelated places.
- The team talks about certain areas that are best left untouched.
- Estimates grow ever more cautious, because the risk is hard to gauge.

These symptoms resemble those of a weak data model, and the two often go together. More on that in the
post on [the cost of a bad data model]({{< relref "/blog/bad-data-model" >}}).

## Why it's a business question, not a detail

The biggest mistake is dismissing technical debt as a purely technical problem the developers will sort
out. In reality it's a **business question**: how quickly can your company respond to the market? How
reliable are your deadlines? How much do you pay for each new feature? All of it hangs directly on the
debt sitting beneath the surface. Decision-makers who take the topic seriously make better trade-offs
between speed and durability, because they know the true cost of a shortcut.

## How to pay down technical debt without rebuilding everything

The most expensive and risky route is almost always the full rewrite. It sounds tempting because it
promises a clean start, but it often fails on time, budget and the reality that the old system has to
keep running. We work step by step instead:

1. **Make it visible:** name and record the debt, rather than leaving it in individual people's heads.
2. **Prioritise:** clean up first where the interest is highest, that is, where most work accumulates.
3. **Fold it into daily work:** improve the surroundings a little with every change you're making anyway.
4. **Protect it:** use tests so cleaning up doesn't break anything that already works.

That way the debt steadily falls, without development grinding to a halt.

## How much cleaning up is right?

Here too the art lies between two extremes. Ignore debt entirely, and eventually you only pay interest
and barely move forward. Fix every blemish immediately, and you lose time better spent on features for
customers. Our yardstick is pragmatic: we pay down debt where it causes real pain, and leave harmless old
baggage alone. Tidiness is not an end in itself but a means to deliver faster, sustainably.

## How to avoid new debt in the first place

Debt can never be fully avoided, but it can be managed well. A few simple habits help: honest
communication about when a shortcut is being taken, a shared, maintained overview of known baggage, and
enough care at the foundation, such as the data model and the choice of proven technology. Those who
build on solid blocks from the start take expensive shortcuts less often. More on that under
[Software Engineering]({{< relref "/services/software-engineering" >}}).

## How we handle it

We treat technical debt as a real item that we talk about openly. When we propose a shortcut, we say what
it saves in the short term and costs in the long term, so you can make an informed decision. We record
known debt rather than suppress it, and we pay it down continuously, woven into normal development. It's
not glamorous work, but it keeps your software fast, reliable and affordable for years.

## Frequently asked questions

**Does technical debt mean bad work was done?**
No. It mostly accrues from sensible decisions under time pressure, or from changing requirements. The
problem isn't the shortcut itself, but when nobody records it and ever pays it back.

**Can you work with no technical debt at all?**
In practice, no, and it wouldn't be economical either. The goal isn't zero debt but a deliberate handling
of it, so the interest stays low and predictable.

**Is a full rewrite worth it to clear the debt?**
Only rarely. A rewrite is expensive, risky and slow, while the old system has to keep running.
Step-by-step paydown is almost always the safer and cheaper route.

**As a decision-maker, how do I know the debt is too high?**
By the symptoms: simple changes take long, deadlines become unreliable, and the team avoids certain
areas. These signals are more reliable than any technical detail.

**Who decides when to clean up?**
Ideally tech and the business side together. Tech knows the debt, the business side knows the priorities.
Good decisions come from the conversation between the two.

**Does cleaning up slow down new features?**
In the short term it costs a little time; in the long term it speeds development up noticeably, because
every later change gets easier. Net, teams with low debt deliver faster.

## Conclusion

Technical debt is no disgrace and no developer-only concern, but an ordinary business cost you can manage.
Those who make it visible, take it on deliberately and pay it down where it hurts keep their software
fast and affordable for years, without ever needing the big, risky fresh start.

Learn more on [Software Engineering]({{< relref "/services/software-engineering" >}}). Related posts:
[The hidden cost of a bad data model]({{< relref "/blog/bad-data-model" >}}) and
[Why we choose boring technology]({{< relref "/blog/boring-technology" >}}).
