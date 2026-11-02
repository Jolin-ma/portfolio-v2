/*
  dewstick-marketing.ts
  All the words on the Dewstick email and analytics case study, kept apart
  from the layout (app/work/dewstick-marketing/page.tsx) so they're easy to edit.

  Dewstick is a concept brand with no real customers. Nothing here is a result.
  Numbers are either public benchmarks (with a source below) or targets.
*/

export const brief =
  "Dewstick is a made-up tinted lip balm, half color, half skincare, that I built as a real Shopify store with a test-mode checkout. It's aimed at people who already like sheer tints and find new products on their phone through short videos. The challenge: someone joins the email list but hasn't bought, and the brand has no reviews, no traffic and no customers to point to. I needed a way to turn that signup into a first order without faking proof or handing out a discount, and a way to tell if it worked.";

/* Section 2: what I looked at, then what I did about it */
export const decisions = [
  {
    looked: "Klaviyo's 2026 benchmarks",
    found: "Automated flows averaged a 5.58% click rate against 1.69% for one-off campaigns, with 13 times the placed orders.",
    decided: "Build a sequence that starts when someone signs up, instead of waiting for the next newsletter.",
  },
  {
    looked: "How welcome series perform by position",
    found: "One breakdown shows email 1 gets the most opens, but orders peak around email 3.",
    decided: "Email 1 earns a click. The actual ask waits until email 3.",
  },
  {
    looked: "Apple Mail Privacy Protection",
    found: "Apple can load an email's tracking pixel whether or not anyone read it, so open rates can't be trusted. Clicks aren't affected the same way.",
    decided: "Judge the emails on clicks and orders. Opens are only a rough signal.",
  },
  {
    looked: "Rhode and Summer Fridays",
    found: "Both already sell sheer color plus lip care, and one review put Summer Fridays at US$24, close to Dewstick's $22 CAD. Dewstick can't out-famous them.",
    decided: "Give email 2 to what's under the color, since the formula is the part Dewstick can explain.",
  },
  {
    looked: "My own store",
    found: 'The product page says "No reviews yet" and promises not to make any up. An email with invented quotes would break that.',
    decided: "Email 2 has a slot for real reviews. Until one exists, it says so.",
  },
  {
    looked: "My own signup form",
    found: 'It promises "New shades and news only." A three-email welcome goes further than that, and in Canada commercial email depends on consent.',
    decided: 'Reword the form before this goes live: "A short welcome, then new shades and news. Unsubscribe anytime."',
  },
];

/* Section 3: when each email goes out */
export const flow = [
  { when: "Trigger", what: "Joins the list", event: "generate_lead" },
  { when: "Right away", what: "Email 1: welcome + quick win", event: "picks a shade" },
  { when: "Day 2", what: "Email 2: proof + value", event: "learns the formula" },
  { when: "Day 5", what: "Email 3: soft sell", event: "gets the ask" },
  { when: "Any time", what: "Buys, and leaves the flow", event: "purchase" },
];

export const shades = [
  { name: "nectar", plain: "coral", color: "#f26b4e" },
  { name: "poppy", plain: "true red", color: "#d92b2b" },
  { name: "blush", plain: "soft pink", color: "#f4b4b4" },
  { name: "peony", plain: "rosy nude", color: "#c98a7f" },
  { name: "orchid", plain: "berry rose", color: "#a83a5f" },
];

/* The three emails. `block` picks which middle section the mockup draws. */
export const emails = [
  {
    number: 1,
    when: "Sent right away",
    label: "Welcome + quick win",
    subject: "so, which one's you?",
    preview: "five shades, one formula. pick in ten seconds.",
    heading: "hey, you're in.",
    intro: "dewstick is half lipstick, half lip balm: real colour over squalane, shea butter and ceramides. the quick part? tap the one you'd actually wear.",
    block: "shades",
    outro: "three short emails from us, then only new shades and news.",
    cta: null,
    goal: "Get one click, and learn which shade they like.",
    why: "Tapping a shade is the quick win for them and the data for me. Each link carries its own tag, so email 3 can name the shade they picked. The signup form only asks for an email, so a shade is more useful personalization than a first name I don't have.",
  },
  {
    number: 2,
    when: "Sent on day 2",
    label: "Social proof + value",
    subject: "what's under the colour?",
    preview: "half the tube isn't makeup.",
    heading: "the part you can't see.",
    intro: "the colour is the fun half. the other half is doing the work:",
    block: "ingredients",
    outro: "",
    cta: "see why it works",
    goal: "Give them a reason to believe it, without faking anyone's opinion.",
    why: "The ingredient lines come straight from the store, so the email and the site agree. The dashed box is where a real review goes, with a first name and the shade they wear. Today it's honest about being empty, and the brand's rule of not making reviews up becomes the proof.",
  },
  {
    number: 3,
    when: "Sent on day 5",
    label: "Soft sell + CTA",
    subject: "still thinking about nectar?",
    preview: "or skip the choice. the set saves $12.",
    heading: "no rush. just a nudge.",
    intro: "you tapped nectar the other day. sun-warm coral, one swipe, juicy glow. still a good call.",
    block: "offer",
    outro: "that's it from the welcome. after this, just new shades and news.",
    cta: "get nectar",
    goal: "Ask for the first order, once and politely.",
    why: "The shade fills in from their click in email 1. If they never clicked, the subject becomes \"can't pick just one?\" and the set leads. There's no discount code because the $12 saving is already real, and training new subscribers to wait for a code seemed like the wrong first lesson.",
  },
];

export const subjectLines = [
  { email: "Email 1", subject: "so, which one's you?", preview: "five shades, one formula. pick in ten seconds.", test: "you're in. pick your shade", hook: "A question about them, not the brand." },
  { email: "Email 2", subject: "what's under the colour?", preview: "half the tube isn't makeup.", test: "half of it isn't makeup", hook: "Curiosity. The preview adds to the subject instead of repeating it." },
  { email: "Email 3", subject: "still thinking about nectar?", preview: "or skip the choice. the set saves $12.", test: "your shade's still here", hook: "Personal, because it names the shade they picked." },
];

/* Measurement plan: the path through GA4, using Google's recommended event names */
export const funnel = [
  { event: "generate_lead", meaning: "Joins the list", key: true },
  { event: "view_item", meaning: "Opens a shade page", key: false },
  { event: "add_to_cart", meaning: "Adds a shade", key: false },
  { event: "begin_checkout", meaning: "Starts checkout", key: false },
  { event: "purchase", meaning: "Places the order", key: true },
];

export const utm = [
  { param: "utm_source", value: "dewstick_list", note: "Which list" },
  { param: "utm_medium", value: "email", note: "Puts it in GA4's Email channel" },
  { param: "utm_campaign", value: "welcome_series", note: "Which sequence" },
  { param: "utm_content", value: "e1_nectar", note: "Which email and link" },
];

export const setupNotes = [
  { title: "Two domains, one visit", text: "The Next.js storefront is on vercel.app, but the real Shopify checkout is on myshopify.com. If a visit crosses both without cross-domain measurement, GA4 can split it in two and lose the email's credit for the order." },
  { title: "Keep test orders out", text: "The checkout runs in test mode, so my own test purchases would fill the report. They need to be filtered out before any number means anything." },
  { title: "Check before trusting", text: "Run the whole path myself in DebugView, signup to purchase, and confirm every event fires once with the right parameters." },
];

/* Section 4 */
export const measures = [
  { question: "Did the email earn a click?", metric: "Click rate, per email", where: "Email platform", target: "5.58% (flow average)" },
  { question: "Did it lead to an order?", metric: "Placed order rate", where: "Email platform, checked against GA4 purchase", target: "2.11% (flow average)" },
  { question: "Which email did the work?", metric: "Purchases by session manual ad content", where: "GA4 Traffic acquisition", target: "Compare the three" },
  { question: "Where do people drop off?", metric: "Step-by-step completion", where: "GA4 funnel exploration", target: "Set a baseline first" },
  { question: "Do people buy one or the set?", metric: "Purchases by item", where: "GA4 Ecommerce purchases", target: "Set a baseline first" },
  { question: "Are we annoying anyone?", metric: "Unsubscribes, per email", where: "Email platform", target: "Set a baseline first" },
];

export const readings = [
  { signal: "Few clicks on an email", meaning: "The message or button is the problem. Rewrite that email first." },
  { signal: "Lots of clicks, few add_to_cart", meaning: "The email did its job. Look at the shade page." },
  { signal: "Carts, but few purchases", meaning: "Something at checkout is stopping them, like shipping cost." },
  { signal: "Shade links lose to the set", meaning: "Maybe people don't want to choose. Lead email 1 with the set." },
];

// TODO(Jolin): these are drafted from this project. Keep only what's true for you, in your own words.
export const learned = [
  "GA4 can't see an email until someone clicks it. The email platform covers what happens in the inbox, GA4 covers what happens on the site, and I need the UTM tags to connect the two.",
  "The metric I'd have reached for first, open rate, is the one I can trust least.",
  "Measurement starts before launch. A form promise, a link tag and a second domain all change what the report can say later.",
  "Having no reviews isn't only a gap. It forced me to work out what the brand can honestly claim.",
];

export const sources = [
  { label: "Klaviyo, 2026 email benchmarks", href: "https://klaviyo.com/blog/ecommerce-benchmarks-2021" },
  { label: "Prospeo, 2.11% flow placed order rate, citing Klaviyo", href: "https://prospeo.io/s/email-sequence-examples" },
  { label: "Branvas, welcome emails by position", href: "https://branvas.com/blogs/news/welcome-email-sequence-benchmarks" },
  { label: "Loops, Apple Mail Privacy Protection", href: "https://loops.so/glossary/apple-mail-privacy-protection" },
  { label: "Google, GA4 recommended events", href: "https://support.google.com/analytics/answer/9267735" },
  { label: "Daily Beast, Summer Fridays and Rhode review", href: "https://thedailybeast.com/summer-fridays-lip-butter-balm-vs-rhode-peptide" },
  { label: "Conestoga College, CASL summary", href: "https://www.conestogac.on.ca/canadas-anti-spam-legislation" },
];
