---
title: "Replacing legacy software without a big bang"
date: 2026-06-14
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/replace-legacy-software.svg"
summary: "Old systems become a risk over time: nobody understands them any more, changes take forever, security holes stay open. Why a full rewrite usually fails and how to replace a legacy system step by step without halting operations."
description: "Replacing legacy software without a big bang: why a full rewrite usually fails and how to replace an old system step by step without interrupting operations. A practical guide."
related:
  - "technical-debt-explained"
  - "bad-data-model"
  - "boring-technology"
---

Almost every successful system eventually reaches a point where it slows you down more than it helps. The
software still runs, but every change becomes a test of patience, and nobody quite dares to touch it any
more. The obvious reflex is then: just build the whole thing new. Yet this exact **big-bang approach** is
the most expensive and riskiest path there is. This article shows why incremental replacement is the
better choice in almost every case and how it works in practice.

## Key takeaways

- Old systems become a risk because knowledge is lost, changes slow down and security holes stay open.
- A full rewrite in one go fails especially often: too big, too long, too risky.
- The incremental approach replaces the old piece by piece while operations keep running.
- The key question is not "all or nothing", but "what first".

## Why old systems become a risk

Software rarely turns into a problem overnight. The risk grows quietly. Typically several things come
together: the people who originally built the system are long gone, and the knowledge left with them. The
technology in use is no longer maintained, so security updates stop arriving. And because the
architecture has grown over the years rather than being planned, everything hangs on everything else.

The result is a system you only touch while holding your breath. It is exactly this mix of
misunderstanding and entanglement that is the real risk, not the code itself.

## When nobody understands how it works any more

The biggest problem with old systems is rarely technical, but human. When the knowledge of why a certain
piece of logic was built one way and not another sits only in a few people's heads, or has disappeared
entirely, every change becomes guesswork. You don't know which seemingly harmless adjustment brings
something down elsewhere.

This missing understanding is closely tied to the topic of [technical debt]({{< relref "/blog/technical-debt-explained" >}}):
it is interest paid on old decisions, often without even knowing the original loan any more. Before
replacing such a system, you first have to learn to understand it again.

## Why a full rewrite usually fails

The big bang sounds tempting: a clean cut, everything new at once, and afterwards everything is better.
In practice the maths rarely works out. A complete rebuild means investing for years without delivering
any benefit in between. The old system has to keep running and being maintained while the new one is
built, so you pay twice.

On top of that, the old system contains countless small special cases built in over the years. Many of
them are documented nowhere, but stand out immediately when they are missing in the rebuild. And on the
day of the big switch, you cut over to a system that has never run under real conditions. That is the
moment big-bang projects most often fail.

## The incremental approach explained

The alternative is unglamorous but proven: you let the old system run and replace it piece by piece. In
technical terms this pattern is called the **strangler pattern**, because the new system gradually grows
around the old one and crowds it out, like a plant that wraps around a tree until in the end only the new
one carries the load.

In practice this means: you build a kind of broker around the old system that decides which requests are
served by the old system and which already by the new one. At first everything goes through the old. Then
you carve out a first, clearly bounded area, build it anew and route only that part across. The rest stays
untouched. This way functionality moves over step by step, without there ever being a single big switch
date.

## Migrating step by step without halting operations

The decisive advantage of this approach is that operations never stand still. Each single step is small
enough to understand, to test and, if in doubt, to undo. If a newly built area goes live and causes
trouble, you route the requests back to the old system. Nobody notices a thing, and nobody spends a
sleepless night on a complete cutover.

These steps follow a steady rhythm: pick an area, build it anew, run it in parallel with the old,
compare results, switch over, retire the old part. Then the cycle starts again. Because each pass
delivers real, visible value, the project stays manageable and provides worth from the very first step.

## How to keep your data safe along the way

The most delicate part of any replacement is not the features, but the data. It is the company's memory
and must under no circumstances be lost or quietly corrupted. That is why data migration is never done on
the side, but as its own carefully planned strand.

A proven approach is to run the old and new data storage in parallel for a while and check automatically
whether both deliver the same result. Only once that holds stable over a sufficient period is the old
source switched off. A clean data model is worth its weight in gold here; how expensive a bad one gets we
describe separately. And of course, throughout the entire migration: tested backups before anything is
changed.

## How to decide what to replace first

If you don't replace everything at once, the question is where to start. The answer follows from two
factors: the benefit of a replacement and the risk a given area carries. It makes sense to begin where
the pain is greatest and the risk is manageable.

| Criterion | Argues for early replacement | Argues for waiting |
| --- | --- | --- |
| Change frequency | Area is adjusted often | Area has been stable for years |
| Business value | Direct impact on revenue or core process | Pure side feature |
| Security posture | Known, open holes | No acute risks |
| Dependencies | Clearly separable | Deeply entangled with everything |
| Knowledge in the team | Understanding still present | Nobody knows the logic any more |

This overview does not replace a conversation, but it prevents the most common wrong decision: tackling
the technically most exciting part first instead of the most important one for the business.

## Recognising the right moment

A replacement is not an end in itself. As long as an old system runs stably, can still be maintained and
has no open security holes, there is no reason to act. The right moment announces itself: changes take
noticeably longer, the list of things you don't dare change grows, and new requirements can only be added
with great effort.

Those who watch for these signals can plan the replacement instead of being forced into it under
pressure. A planned replacement is always cheaper and calmer than the forced emergency, when the old
system finally refuses to play along.

## Why boring technology makes the replacement easier

When rebuilding individual areas, there is a temptation to choose the most modern technology available
right away. This is exactly where restraint pays off. A replacement project is demanding enough; loading
it additionally with untested tools raises the risk for no reason. Proven, well-understood technology
makes the new parts maintainable from the start and ensures you don't have the exact same discussion all
over again in five years.

## Frequently asked questions

**Can we keep working normally during the replacement?**
Yes, that is the heart of the approach. The old system keeps running while individual areas are replaced
one after another. There is no cutover date on which everything stands still.

**How long does an incremental replacement take?**
That depends on the size and condition of the system. The advantage is that each step delivers value on
its own, so you don't wait years for a result but see it continuously.

**Isn't the incremental path more expensive than a rebuild?**
In total, rarely. The big bang devours the budget up front and delivers nothing for a long time. The
incremental path spreads the cost and lowers the risk of pouring a lot of money into a failed project.

**What happens to our data?**
Data migration is planned carefully as its own strand, with parallel operation and comparison before the
old source is switched off. Tested backups are a given.

**Can you replace a system we didn't build ourselves?**
Yes. An important first step is to understand the existing system again and document its flows, regardless
of who originally built it.

**Do we need to know exactly what should be replaced beforehand?**
No. The order follows jointly from benefit and risk. We start with an inventory and prioritise from there,
rather than assuming a complete plan upfront.

## Conclusion

Replacing an old system all at once is tempting, but risky and expensive. The calmer and more reliable
path is incremental replacement: understand the old, replace one clearly bounded area after another, carry
the data along carefully and never halt operations. That turns a threatening megaproject into a plannable
sequence of small, safe steps.

Learn more on [Software Engineering]({{< relref "/services/software-engineering" >}}). Related posts:
[Technical debt explained]({{< relref "/blog/technical-debt-explained" >}}) and
[The hidden cost of a bad data model]({{< relref "/blog/bad-data-model" >}}).
