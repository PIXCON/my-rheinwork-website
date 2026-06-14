---
title: "Using Consent Mode v2 without losing data"
date: 2026-06-14
tag: "Data"
author: "Dustin Schneider"
cover: "/img/blog/consent-mode-v2.svg"
summary: "Consent Mode v2 has been a requirement for many Google Ads campaigns in the EEA since 2024. This guide explains how to respect consent and still keep usable data."
description: "Consent Mode v2 explained: basic vs advanced, modelled conversions, how it fits a server-side GTM setup and common mistakes. Stay compliant and keep usable data."
related:
  - "server-side-tracking"
  - "server-side-gtm-ga4"
  - "bad-data-model"
---

Since early 2024, Google has tied the delivery of important advertising features in the European
Economic Area to a technical condition: if you want to keep using remarketing lists and conversion
data, you have to pass consent signals to Google correctly. That is exactly what **Consent Mode v2**
does. Many companies treat it as a pure compliance chore and end up losing more data than necessary.
Used correctly, Consent Mode v2 is not a data killer but a tool that respects consent while preserving
usable numbers. This guide explains, without jargon, what is behind it and how you stay compliant
without flying blind.

## Key takeaways

- Consent Mode v2 passes the consent status to Google instead of simply blocking tags.
- Without a correct setup, you risk losing remarketing and conversion measurement in the EEA.
- Advanced mode enables modelled conversions and closes part of the consent gap.
- Combined with server-side GTM, you keep control over what leaves your house.

## What Consent Mode v2 actually is

Consent Mode v2 is an interface between your cookie banner and the Google services on your website.
Instead of simply switching tags off when consent is missing, Consent Mode passes the **consent status**
as a signal. Concretely it covers four parameters: `ad_storage` and `analytics_storage` govern classic
data storage, while the two parameters added in 2024, `ad_user_data` and `ad_personalization`, govern
whether user data may be sent to Google for advertising and whether personalised advertising is allowed.
It is these two new signals that turn the old Consent Mode into version v2.

The decisive point: Google tags adapt their behaviour to these signals. When consent is missing, no
cookies are set and no identifying data is transmitted. Only anonymous, aggregated signals without any
personal reference flow, provided you have activated the corresponding mode.

## Why this is not an optional detail

Google has made Consent Mode v2 a condition for using EEA data for certain features at all. If the
correctly implemented signal is missing, the consequences are concrete:

- **Remarketing lists** stop filling up or shrink, because audiences may no longer be built.
- **Conversion data** is missing or arrives incomplete, which degrades bid management.
- **Smart Bidding** works with fewer signals and tends to deliver weaker results.

For companies that spend meaningful budget through Google Ads, this is not a theoretical danger but a
direct lever on campaign performance. Cutting corners here means optimising with less data and paying
for it through worse results.

## Basic mode and advanced mode compared

Consent Mode v2 has two operating modes, and the choice has a noticeable effect on your data.

In **basic mode**, Google tags only load after the user has consented. If someone declines, nothing
fires at all, so no anonymous signals reach Google either. This is data-minimal but leaves little room
for modelling.

In **advanced mode**, the tags load from the start but, when consent is missing, transmit only
anonymous, cookieless pings. These contain no personal reference yet give Google enough context to
model missing conversions statistically.

| Criterion | Basic mode | Advanced mode |
|----------|-----------|---------------|
| Tag behaviour on decline | tags do not load | anonymous, cookieless pings |
| Modelled conversions | not possible | possible |
| Data basis for bidding | consenting users only | consenting plus model |
| Data minimisation | maximal | high, but with signals |
| Setup complexity | low | higher, but more data |

Which mode is right depends on your risk assessment and the judgement of your data protection advisers.
From a pure data perspective, advanced mode extracts more.

## How modelled conversions close the gap

When some of your visitors do not consent, a gap appears: you do not see those conversions directly. In
advanced mode, Google uses the anonymous pings from declining users together with the observable
behaviour of consenting users to **estimate the missing conversions statistically**. The result is
modelled conversions, which are added back into your reports.

Important: modelling is an estimate, not a substitute for clean measurement. It works better the more
reliable underlying data is available. This is exactly why Consent Mode and a robust measurement
infrastructure belong together: the more solid your captured data, the more accurately the model can
estimate the rest.

## Consent Mode v2 in a server-side GTM setup

Consent Mode and server-side tracking are not opposites; they complement each other. In a server-side
setup, the consent status is captured in the browser and sent to your own server together with the
event. There, the server-side container decides on a rule basis which data goes to which destination
and which is withheld or anonymised when consent is missing.

The benefit: authority over forwarding no longer rests solely with the tags in the browser, but with
your infrastructure. You can enforce consent server-side, minimise data before forwarding and document
clearly what goes to third parties under which condition. What such a setup looks like technically is
covered in detail in our guide on
[server-side GTM and GA4]({{< relref "/blog/server-side-gtm-ga4" >}}).

## Common mistakes during implementation

In practice we keep seeing the same pitfalls:

- **Only v1 implemented:** the old parameters are set, but `ad_user_data` and `ad_personalization` are
  missing. That does not meet the v2 requirement.
- **Default status set wrong:** if the default before banner interaction is set too generously, tags
  fire before any decision exists.
- **Banner and Consent Mode run separately:** the cookie tool shows a status that is not cleanly passed
  through to the tags. The result is contradictory data.
- **No validation:** everything is assumed to work, without ever checking the actual signal flow.

Each of these mistakes leads either to data loss or to a setup that is only seemingly compliant.

## How to validate your setup

A Consent Mode setup is only finished once you can prove it works. To do that, we check several layers:

1. **Signal check:** are all four parameters set correctly, in the default state as well as after
   consent and after decline?
2. **Banner reconciliation:** does what the user chooses in the banner match the signal sent to Google?
3. **Tag behaviour:** do the tags behave as expected in each state, meaning no cookies without consent?
4. **Plausibility in reports:** do modelled conversions appear, and do the numbers move within an
   expected range?

Only when these points hold is the setup reliable. Anything else is a promise without proof.

## Staying compliant and still keeping data

The apparent contradiction between data protection and data use dissolves once you understand Consent
Mode v2 correctly. The goal is not to circumvent consent but to represent it cleanly in technical terms
while using the legitimate latitude Google offers. Those who decline are respected. Those who consent
are captured fully. And the gap in between is, as far as permitted, modelled rather than simply ignored.

For decision-makers that means you do not have to choose between legal certainty and usable data. A
well-thought-out setup delivers both. The legal assessment in each individual case remains in the hands
of your data protection advisers. We provide the clean technical foundation for it.

## Frequently asked questions

**Is Consent Mode v2 mandatory for every company?**
For companies running Google Ads or remarketing with users from the EEA, correctly transmitting the
consent signals is effectively a prerequisite for continuing to use these features.

**Does Consent Mode v2 replace my cookie banner?**
No. The banner collects consent; Consent Mode v2 passes that decision on to the Google services
technically. They work together but do not replace each other.

**Are modelled conversions reliable?**
They are a statistical estimate and become more accurate the more solid underlying data exists. They do
not replace clean measurement but close part of the consent gap.

**Does Consent Mode v2 work without server-side tracking?**
Yes, Consent Mode v2 can be implemented purely client-side. Combined with server-side GTM, however, you
gain more control over data forwarding.

**What happens if I do not implement it at all?**
You risk that remarketing lists stop filling and conversion data from the EEA goes missing. That
measurably degrades the steering of your campaigns.

**How long does setup take?**
A clean setup including banner reconciliation and validation is usually achievable in a few days to a
few weeks, depending on the state of your existing setup.

## Conclusion

Consent Mode v2 is not an annoying obligation but a tool that lets you respect consent while keeping
usable data. Implemented wrongly or not at all, it costs you reach, conversion data and ultimately
advertising performance. Implemented correctly, ideally embedded in a server-side infrastructure, it
closes part of the consent gap without undermining data protection. We treat measurement as engineering
and are building **PIXCON**, our own tool for server-side tracking and GTM hosting.

Read more on our [Measurement Infrastructure]({{< relref "/services/measurement-infrastructure" >}}) page.
Related: [Server-side tracking: the complete guide]({{< relref "/blog/server-side-tracking" >}})
and [Server-side GTM with GA4]({{< relref "/blog/server-side-gtm-ga4" >}}).
