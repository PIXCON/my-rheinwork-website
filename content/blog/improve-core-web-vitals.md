---
title: "Improving Core Web Vitals measurably"
date: 2026-06-14
tag: "Performance"
author: "Dustin Schneider"
cover: "/img/blog/improve-core-web-vitals.svg"
summary: "Core Web Vitals are an official ranking factor and a direct lever for conversion. This article explains LCP, INP and CLS in plain terms, shows concrete levers per metric, and how to prove your success with data."
description: "Improving Core Web Vitals: what LCP, INP and CLS mean, why they affect ranking and conversion, concrete levers per metric, and how to measure field and lab data correctly."
related:
  - "hugo-website-performance"
  - "why-is-my-website-slow"
  - "server-side-tracking"
---

Anyone who wants to make their website faster soon runs into three abbreviations: LCP, INP and CLS.
Together they form the **Core Web Vitals**, which Google uses to measure how good a page feels to real
visitors. They aren't an abstract lab value, they're an official ranking factor and at the same time one of
the most direct levers for more enquiries and purchases. This article explains the three metrics in plain
terms, shows concrete levers for each one, and describes how to prove your success before and after,
without relying on gut feeling.

## Key takeaways

- LCP measures how fast the main content loads, INP measures responsiveness, CLS measures visual stability.
- The Core Web Vitals are an official ranking factor and directly influence conversion.
- Each metric has clear, actionable levers, from images through code to fixed layout dimensions.
- What matters is measuring with real field data, so improvements become provable.

## What the Core Web Vitals actually are

The Core Web Vitals are three measurements Google uses to describe a page's actual user experience. They
answer three simple questions: How fast does the visitor see the main content? How fast does the page react
to an input? And does the layout stay stable, or does something jump away just as you go to click? Those
three questions correspond exactly to the metrics LCP, INP and CLS. They're deliberately framed from the
visitor's point of view, not the server's.

## LCP: how fast the main content appears

**LCP** stands for Largest Contentful Paint and measures when the largest visible element has loaded,
usually a hero image or a large heading. A good LCP is under roughly 2.5 seconds. If it's poor, the visitor
stares at a half-empty page for too long. The most common causes are large, unoptimised images, slow
hosting, and render-blocking resources that delay the display.

## The most important levers for a good LCP

- **Optimise images:** serve them in modern compression and at the right size, instead of huge originals.
- **Fast hosting with a CDN:** so the first response and the important files reach the visitor quickly.
- **Defuse render-blocking resources:** load what's critical first, everything else in the background.
- **Prioritise the main image:** signal to the browser early which element should load first.

## INP: how responsive the page is

**INP** stands for Interaction to Next Paint and measures how fast the page reacts to an input, such as a
click or typing into a form. A good INP is under roughly 200 milliseconds. If it stutters here, the page
feels sluggish despite loading fast, because too much JavaScript blocks the main thread in the background.
That's exactly what happens often on overloaded builder sites with many scripts.

## The most important levers for a good INP

The key is less code and better organised code. Concretely that means: remove unnecessary JavaScript,
above all superfluous plugins and third-party scripts. What remains is loaded so that it doesn't block the
main thread, and demanding tasks are split up instead of occupying the browser in one go. A lean technical
base has a structural advantage here, because it does less work in the background to begin with. Read more
about the causes of sluggish sites in
[Why is my website slow?]({{< relref "/blog/why-is-my-website-slow" >}}).

## CLS: how stable the layout stays

**CLS** stands for Cumulative Layout Shift and measures how much content moves around while loading.
Everyone knows the moment when you go to tap a button and at the last second a late-loading image or banner
shifts everything, so you tap the wrong place. A good CLS is under roughly 0.1. The most common causes are
images and ads without reserved space, and fonts that rebuild the layout when they load in.

## The most important levers for a good CLS

- **Fixed dimensions for images and videos:** reserve the space in the layout in advance so nothing jumps later.
- **Space for embedded elements:** banners, ads and embeds need a fixed area set aside.
- **Load fonts cleanly:** so the text doesn't shift the whole layout when the typeface switches.
- **Don't push content above existing content:** add late-loading items below, not by inserting them on top.

## Why the Core Web Vitals are a ranking factor

Google has a clear interest in showing users fast, stable pages. That's why the Core Web Vitals have been
an official, confirmed ranking factor for years. They aren't the only one and usually not the strongest,
but they're a **competitive advantage where relevance is otherwise equal**: between two pages of similar
content quality, the faster one wins. And unlike many soft factors, the Core Web Vitals are clearly
measurable, which makes them one of the few SEO levers whose effect you can prove directly.

## Field versus lab data: measuring correctly

When measuring, the right data source matters. **Lab data** is generated under controlled conditions, for
example in PageSpeed Insights, and is well suited to finding problems and testing changes. **Field data**
comes from real visitors with real devices and connections and shows how fast your site really is. For
Google's assessment, the field data counts, which you can view in Search Console under Core Web Vitals.

| Aspect | Lab data | Field data |
|--------|----------|------------|
| Origin | controlled test | real visitors |
| Tool | PageSpeed Insights, Lighthouse | Search Console, field report |
| Strength | finding and testing problems | reflecting real experience |
| Ranking relevance | indirect | directly assessed |

## The link to conversion

Fast, stable pages don't just rank better, they sell better too. Every extra second of load time raises
the bounce rate, and a shifting layout that hits the wrong button frustrates visitors immediately. Improved
Core Web Vitals therefore work twice over: more visibility through ranking and more conversions from the
traffic you already have. That's exactly why the lever is so attractive, it pays into two goals at once.

## How to make the improvement provable

For an optimisation to become a verifiable success, you need a clean before and after. That means: before
the work, record the field data in Search Console and a lab value in PageSpeed Insights, then work
deliberately on LCP, INP and CLS, and measure again after a few weeks. Field data needs some time, because
it builds up from real visits. Anyone who proceeds this way can show the improvement in numbers, instead of
just claiming it. How we put this into practice is described in our service
[Performance & SEO]({{< relref "/services/performance-seo" >}}).

## Frequently asked questions

**What are good Core Web Vitals values?**
As rough guidance: LCP under roughly 2.5 seconds, INP under roughly 200 milliseconds, and CLS under roughly
0.1. What matters is that these values are reached for real visitors in the field, not just in the lab.

**What's the difference between field and lab data?**
Lab data is generated in a controlled test and helps find problems. Field data comes from real visitors and
is what Google uses for ranking. The two belong together, but the field is what counts.

**How long does it take for improvements to show?**
In the lab immediately, in the field only after a few weeks, because field data builds up from real visits
over a period. Patience is part of the process here.

**Which metric should I tackle first?**
Usually the one that's most clearly in the red according to Search Console. Often that's the LCP, because
large images and slow loading are widespread and can be improved comparatively quickly.

**Do the Core Web Vitals really bring more revenue?**
Directly, in that faster and more stable pages produce fewer drop-offs and more conversions. Indirectly,
through better ranking and more visibility. So the lever works on visibility and conversion at the same
time.

**Can I improve the Core Web Vitals myself?**
Simple steps like optimising images, yes. Structural problems with INP and layout stability often require
changes to the code and the technical base that make expert support worthwhile.

## Conclusion

Core Web Vitals aren't a black box, they're three clearly defined questions from the visitor's point of
view: how fast, how responsive, how stable. Each has concrete levers, and the best part is that they're
measurable: anyone who measures cleanly before and after can prove the improvement in numbers, in ranking
and in conversion.

Learn more on [Performance & SEO]({{< relref "/services/performance-seo" >}}) and
[Web Engineering]({{< relref "/services/web-engineering" >}}). On the technical foundation:
[Why a Hugo website loads faster and ranks better]({{< relref "/blog/hugo-website-performance" >}}).
