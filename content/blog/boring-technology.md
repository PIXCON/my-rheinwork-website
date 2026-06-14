---
title: "Why we choose boring technology"
date: 2026-06-04
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/boring-technology.svg"
summary: "Shiny new frameworks are tempting, but reliability usually wins. Why a proven tech stack fails predictably, stays maintainable and makes your project faster and cheaper in the long run."
description: "Proven technology over hype: why a battle-tested tech stack fails predictably, stays maintainable and makes projects faster, with the three questions to ask before any decision."
related:
  - "bad-data-model"
  - "keeping-software-running"
  - "mvp-without-cutting-corners"
---

There's a quiet strength in choosing technology that is, frankly, a little boring. Proven databases,
well-understood frameworks and tools with a decade of practice fail in **predictable** ways. And
predictable is exactly what you want when real users and real business depend on your software. This
article explains why "boring" is often the highest compliment in software development, and where we
still deliberately build modern.

## Key takeaways

- Proven technology fails predictably: exactly what you want in production.
- Three questions help with the choice: will it still be maintained? Can the next developer understand
  it? Does it fail in ways we can reason about?
- The "innovation budget" belongs in the product, not the foundation.
- Hype technology often costs more later than it saves at first.

## New isn't the same as better

Every year brings a wave of frameworks promising to change everything. Some genuinely do. Most vanish as
fast as they appeared, leaving behind projects built on a technology no one maintains anymore. Most of
a product's value comes not from the newest abstraction on the front page of a developer forum, but
from getting the **fundamentals** right.

"Proven" doesn't mean "outdated". It means tried, understood, broadly supported and with enough practice
that the pitfalls are known.

## What "boring" technology really means

Proven technology has qualities that are worth their weight in gold day to day:

- **Predictable behaviour:** it fails in ways you know and can plan for.
- **Large community:** there's already a solution and people to help for almost any problem.
- **Stable updates:** no weekly breaking changes that upend half the project.
- **Available knowledge:** the next developer finds their way quickly, even a year from now.
- **Longevity:** what has proven itself over years is very likely to keep being maintained.

These very qualities save what most often blows up projects: time lost to debugging and rebuilds.

## Three questions before any technology decision

When we evaluate a tool, we ask ourselves three simple questions:

1. **Will it still be maintained in five years?**
2. **Can the next developer understand it quickly?**
3. **Does it fail in ways we can reason about?**

Answer these honestly and you land, surprisingly often, on the less flashy option. And that's the one
that saves time, money and nerves later, while the more exciting choice becomes a permanent
construction site in production.

## Where we deliberately build modern

This explicitly does **not** mean we never use anything new. It means we invest our "innovation budget"
deliberately, where it brings real value:

- in **the parts of the product that truly differentiate you**,
- on topics like modern frontend experience, where tools like React/Next.js make sense,
- or for specialised tasks where a newer tool is clearly superior.

The foundation, by contrast (data storage, core logic, operations), we keep calm and dependable.
Innovation belongs up front, at the product; not in the foundation, where it's only risk without
visible benefit.

## The hidden price of hype technology

Those who chase every new technology pay a price that rarely shows on the invoice:

- **Migration costs** once the hype tool is abandoned.
- **Talent shortage**, because hardly anyone masters the exotic tool.
- **Instability**, because immature tools surprise you in production.
- **Knowledge loss** when the one person who understood the construct leaves.

These costs don't hit the developer who made the exciting decision. They hit the company that has to
live with it.

## A concrete example: choosing the database

Hardly any decision illustrates the principle better than the database. There are regularly new,
exciting database systems advertising impressive benchmarks. For the vast majority of projects, a proven
relational database like **PostgreSQL** is still the better choice: maintained for decades, extremely
robust, excellently documented and mastered by countless developers. It covers a huge share of real
requirements, and for the cases where something more specialised is truly needed, you add it
deliberately instead of putting the foundation on an exotic system. That's "boring" in the best sense:
nobody has to lie awake thinking about it.

## Total cost of ownership: the honest calculation

The true price of a technology shows not on the day of the decision, but over the years. The honest
calculation includes:

- **Maintenance:** how much effort does the system cost in operation?
- **People:** how easily can you find those who master it?
- **Migration:** what does switching cost if the tool is abandoned?
- **Downtime risk:** what does an hour of standstill cost because an immature tool surprised you?

Hype technology rarely looks good in this calculation. Today's exciting choice is often the day after
tomorrow's expensive legacy.

## Proven doesn't mean standing still

Choosing proven technology doesn't mean ignoring progress. We follow new tools attentively, test them in
a non-critical setting and adopt them **once** they've proven themselves, not because they're new. That
way you benefit from progress without the risk of being a guinea pig for a technology no one will know
in two years.

## Which tools we concretely rely on as proven

So that "proven" doesn't stay abstract: a look at our everyday work:

- **TypeScript** for type-safe, maintainable code in frontend and backend.
- **Go** for fast, robust services that need few resources.
- **PostgreSQL** as a reliable, versatile database for the vast majority of requirements.
- **Docker** for reproducible environments: "works on my machine" becomes "works everywhere".
- **React/Next.js** where a modern, interactive interface is needed.
- **Hugo** for ultra-fast, secure websites.

What these tools share is that they're proven, broadly supported and maintained long-term, which is
exactly why they bring speed without carrying risk into the foundation.

## How to evaluate a tech stack as a client

Even without deep technical knowledge, you can make an informed decision by asking:

- **Why** this tool, and which alternatives were considered?
- How **widespread** is it, and how easily can you find specialists for it?
- What happens if the **one person** who introduced it leaves?
- Is the choice driven by **substance** or by something being new and exciting right now?

A good agency can answer these questions calmly and convincingly. Evasive answers are a warning sign.

## Stability as a competitive advantage

While a team chasing every trend spends much of its energy on migrations, debugging and fixing
surprising outages, a team on a calm foundation can put that energy into the product, into features
customers genuinely benefit from. This is exactly where seemingly "boring" technology becomes a
competitive advantage: reliability adds up. Customers notice that the software simply works, that new
features arrive reliably and that nothing breaks constantly. That impression of solidity is hard to copy,
and it comes not from the newest framework, but from the discipline of keeping the foundation calm.

## Frequently asked questions

**Doesn't "proven" just mean "outdated"?**
No. It means tried, understood and broadly supported. Many "boring" technologies are highly current.
They've just proven themselves long enough to be dependable.

**So you don't use any modern frameworks at all?**
We do, deliberately, where they add value, e.g. in the frontend with React/Next.js. What matters is the
conscious choice, not the reflex toward the newest thing.

**How do I know whether my existing stack is a problem?**
Warning signs are: nobody maintains a central dependency anymore, updates constantly break something, or
only a single person understands the system. Then a sober look is worthwhile.

**Doesn't proven technology slow development down?**
On the contrary. Because errors are rarer and solutions are known, you make faster progress overall than
with a tool that constantly surprises you and demands special treatment.

**What if my competitor advertises "the latest technology"?**
Customers care about the result, not the stack. A fast, stable and findable solution beats any buzzword,
and usually has the more boring, more solid technology behind it.

**Can I still switch to newer technology later?**
Yes. A clean foundation with clearly separated parts makes a later switch easier too. Proven doesn't mean
locked in. It just means a switch happens for a good reason, not out of fashion.

## Conclusion

The most exciting technology is often the kind that simply works. Proven tools aren't a step back, but
the prerequisite for speed that lasts, and for software that lets you sleep at night.

Learn more on [Software Engineering]({{< relref "/services/software-engineering" >}}). Related posts:
[Keeping software running reliably]({{< relref "/blog/keeping-software-running" >}}) and
[The hidden cost of a bad data model]({{< relref "/blog/bad-data-model" >}}).
