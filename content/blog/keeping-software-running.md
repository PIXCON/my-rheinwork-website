---
title: "How we keep software running at 3 a.m."
date: 2026-04-12
tag: "Infrastructure"
author: "Dustin Schneider"
summary: "Reliability is not luck. A look at the small, unglamorous habits that keep production calm while everyone sleeps."
---

The best compliment our infrastructure can get is silence. No alerts, no incidents, no
frantic messages — just software quietly doing its job while everyone sleeps.

## Reliability is built, not hoped for

Calm nights are the result of dull, disciplined habits during the day: automated
deployments, sensible monitoring, and clear alerts that fire on the things that actually
matter instead of crying wolf.

We also plan for failure on purpose. Things will break — so we make sure they break
safely, recover quickly, and tell us exactly what went wrong.

## Boring on call is a feature

Our goal is an on-call rotation that is almost boring. When something does go wrong, the
person responding has the context, the tools and the runbook to fix it fast.

Good operations are invisible. That invisibility is the whole point.
