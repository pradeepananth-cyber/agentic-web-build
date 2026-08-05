import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================================
   Agent-Driven Web Delivery — Client Pitch
   Built in adherence to the IBM Carbon Design System (v11, White theme).

   Tokens below are Carbon's published values, not approximations:
     Color    — carbondesignsystem.com/elements/color/tokens
     Type     — carbondesignsystem.com/elements/typography/type-sets
     Spacing  — carbondesignsystem.com/elements/spacing/overview
   Layout follows the Carbon 2x grid: 1584px max, 32px gutters, 8px mini-unit,
   1px-gap tile seams (no shadows, no border radius) per Carbon's tile pattern.
============================================================================ */

const CARBON_CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

.cds-root {
  /* ---- Color tokens (White theme) ---- */
  --background: #ffffff;
  --layer-01: #f4f4f4;
  --layer-02: #ffffff;
  --layer-accent-01: #e0e0e0;
  --background-inverse: #393939;
  --background-brand: #0f62fe;
  --text-primary: #161616;
  --text-secondary: #525252;
  --text-helper: #6f6f6f;
  --text-on-color: #ffffff;
  --text-inverse: #ffffff;
  --link-primary: #0f62fe;
  --link-primary-hover: #0043ce;
  --link-inverse: #78a9ff;
  --border-subtle-00: #e0e0e0;
  --border-subtle-01: #c6c6c6;
  --border-strong-01: #8d8d8d;
  --border-inverse: #161616;
  --border-interactive: #0f62fe;
  --interactive: #0f62fe;
  --highlight: #d0e2ff;
  --support-error: #da1e28;
  --support-success: #24a148;
  --support-warning: #f1c21b;
  --support-caution-major: #ff832b;
  --focus: #0f62fe;
  --icon-primary: #161616;
  --icon-secondary: #525252;
  --ui-shell: #161616;

  /* ---- Spacing scale ---- */
  --spacing-01: 0.125rem; --spacing-02: 0.25rem; --spacing-03: 0.5rem;
  --spacing-04: 0.75rem;  --spacing-05: 1rem;    --spacing-06: 1.5rem;
  --spacing-07: 2rem;     --spacing-08: 2.5rem;  --spacing-09: 3rem;
  --spacing-10: 4rem;     --spacing-11: 5rem;    --spacing-12: 6rem;
  --spacing-13: 10rem;

  font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}

.cds-root *, .cds-root *::before, .cds-root *::after { box-sizing: border-box; }
.cds-root p, .cds-root h1, .cds-root h2, .cds-root h3, .cds-root h4,
.cds-root ul, .cds-root ol, .cds-root figure { margin: 0; padding: 0; }
.cds-root ul, .cds-root ol { list-style: none; }

/* ---- Type sets ---- */
.t-h07 { font-size: 3.375rem; line-height: 4rem; font-weight: 300; letter-spacing: 0; }
.t-h06 { font-size: 2.625rem; line-height: 3.125rem; font-weight: 300; letter-spacing: 0; }
.t-h05 { font-size: 2rem; line-height: 2.5rem; font-weight: 400; letter-spacing: 0; }
.t-h04 { font-size: 1.75rem; line-height: 2.25rem; font-weight: 400; letter-spacing: 0; }
.t-h03 { font-size: 1.25rem; line-height: 1.75rem; font-weight: 400; letter-spacing: 0; }
.t-h02 { font-size: 1rem; line-height: 1.5rem; font-weight: 600; letter-spacing: 0; }
.t-h01 { font-size: 0.875rem; line-height: 1.25rem; font-weight: 600; letter-spacing: 0.16px; }
.t-body02 { font-size: 1rem; line-height: 1.5rem; font-weight: 400; letter-spacing: 0; }
.t-body01 { font-size: 0.875rem; line-height: 1.25rem; font-weight: 400; letter-spacing: 0.16px; }
.t-label { font-size: 0.75rem; line-height: 1rem; font-weight: 400; letter-spacing: 0.32px; }
.t-mono { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1rem; letter-spacing: 0.32px; }

.tx-secondary { color: var(--text-secondary); }
.tx-helper { color: var(--text-helper); }

/* ---- Grid ---- */
.cds-grid { max-width: 1584px; margin: 0 auto; padding: 0 var(--spacing-07); width: 100%; }
.cds-grid--narrow { max-width: 1056px; }

/* ---- UI Shell header ---- */
.cds-header {
  position: sticky; top: 0; z-index: 8000;
  height: 48px; background: var(--ui-shell);
  border-bottom: 1px solid #393939;
  display: flex; align-items: center;
}
.cds-header__inner { display: flex; align-items: center; width: 100%; height: 100%; }
.cds-header__name {
  font-size: 0.875rem; font-weight: 600; letter-spacing: 0.16px;
  color: var(--text-inverse); padding: 0 var(--spacing-05); white-space: nowrap;
}
.cds-header__name span { font-weight: 400; color: #c6c6c6; }
.cds-header__nav { display: flex; height: 100%; overflow-x: auto; scrollbar-width: none; }
.cds-header__nav::-webkit-scrollbar { display: none; }
.cds-header__link {
  display: flex; align-items: center; height: 100%;
  padding: 0 var(--spacing-05);
  font-size: 0.875rem; letter-spacing: 0.16px; color: #c6c6c6;
  background: none; border: none; cursor: pointer; white-space: nowrap;
  border-bottom: 3px solid transparent; position: relative; top: 1px;
  transition: color 70ms cubic-bezier(0.2,0,0.38,0.9), background 70ms cubic-bezier(0.2,0,0.38,0.9);
  font-family: inherit;
}
.cds-header__link:hover { background: #353535; color: #f4f4f4; }
.cds-header__link:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.cds-header__link[data-active="true"] { color: #f4f4f4; border-bottom-color: var(--interactive); }

/* ---- Sections ---- */
.section { padding: var(--spacing-12) 0; border-top: 1px solid var(--border-subtle-00); }
.section:first-of-type { border-top: none; }
.section--layer { background: var(--layer-01); }
.section__label {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px;
  color: var(--text-secondary); margin-bottom: var(--spacing-05);
  display: flex; align-items: center; gap: var(--spacing-03);
}
.section__label::before { content: ''; width: 24px; height: 1px; background: var(--interactive); }
.section__title { max-width: 40ch; margin-bottom: var(--spacing-05); }
.section__intro { max-width: 60ch; color: var(--text-secondary); margin-bottom: var(--spacing-09); }

/* ---- Hero ---- */
.hero { background: var(--ui-shell); color: var(--text-inverse); padding: var(--spacing-12) 0 var(--spacing-10); }
.hero__eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: #78a9ff; margin-bottom: var(--spacing-06); }
.hero__title { max-width: 24ch; margin-bottom: var(--spacing-06); }
.hero__sub { max-width: 56ch; color: #c6c6c6; margin-bottom: var(--spacing-09); }
.hero__meta { display: flex; flex-wrap: wrap; gap: var(--spacing-09); border-top: 1px solid #525252; padding-top: var(--spacing-06); }
.hero__meta div { min-width: 140px; }
.hero__meta dt { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: #8d8d8d; margin-bottom: var(--spacing-02); }
.hero__meta dd { font-size: 1rem; line-height: 1.5rem; color: #f4f4f4; }

/* ---- Tile grid: Carbon 1px seam pattern ---- */
.tile-grid { display: grid; gap: 1px; background: var(--border-subtle-01); border: 1px solid var(--border-subtle-01); }
.tile-grid--2 { grid-template-columns: repeat(2, 1fr); }
.tile-grid--3 { grid-template-columns: repeat(3, 1fr); }
.tile { background: var(--layer-02); padding: var(--spacing-06); }
.section--layer .tile { background: var(--background); }
.tile__title { margin-bottom: var(--spacing-03); }
.tile__body { color: var(--text-secondary); }

/* ---- Divergence table ---- */
.dvg { border: 1px solid var(--border-subtle-01); background: var(--layer-02); }
.section--layer .dvg { background: var(--background); }
.dvg__row { display: grid; grid-template-columns: 200px repeat(3, 1fr); border-bottom: 1px solid var(--border-subtle-00); }
.dvg__row:last-child { border-bottom: none; }
.dvg__row--head { background: var(--layer-01); }
.section--layer .dvg__row--head { background: var(--layer-01); }
.dvg__cell { padding: var(--spacing-05); border-left: 1px solid var(--border-subtle-00); }
.dvg__cell:first-child { border-left: none; }
.dvg__cell--label { font-weight: 600; font-size: 0.875rem; letter-spacing: 0.16px; }
.dvg__flag { display: inline-flex; align-items: center; gap: var(--spacing-02); color: var(--support-error); font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; margin-top: var(--spacing-02); }

/* ---- Compare columns ---- */
.compare { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border-subtle-01); border: 1px solid var(--border-subtle-01); }
.compare__col { background: var(--layer-02); padding: var(--spacing-07); position: relative; }
.section--layer .compare__col { background: var(--background); }
.compare__col::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.compare__col--today::before { background: var(--border-strong-01); }
.compare__col--future::before { background: var(--interactive); }
.compare__tag { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-secondary); margin-bottom: var(--spacing-05); }
.compare__h { margin-bottom: var(--spacing-06); }
.steps { margin-bottom: var(--spacing-07); }
.steps li { display: flex; gap: var(--spacing-05); padding: var(--spacing-04) 0; border-bottom: 1px solid var(--border-subtle-00); font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; }
.steps li:last-child { border-bottom: none; }
.steps .num { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--text-helper); padding-top: 2px; flex-shrink: 0; }
.steps li[data-em="true"] { color: var(--text-primary); font-weight: 600; }
.steps li[data-em="true"] .num { color: var(--interactive); }
.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-subtle-00); border: 1px solid var(--border-subtle-00); }
.metrics div { background: var(--layer-01); padding: var(--spacing-05); }
.metrics .m-num { font-size: 1.75rem; line-height: 2.25rem; font-weight: 300; }
.metrics .m-label { font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-secondary); margin-top: var(--spacing-02); }

/* ---- Callout (Carbon inline notification, informational) ---- */
.callout { display: flex; gap: var(--spacing-05); border-left: 3px solid var(--interactive); background: var(--layer-01); padding: var(--spacing-05) var(--spacing-06); margin-top: var(--spacing-07); }
.callout--success { border-left-color: var(--support-success); }
.callout__mark { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-secondary); flex-shrink: 0; padding-top: 2px; }
.callout__body { max-width: 68ch; }

/* ---- Architecture flow ---- */
.flow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr; align-items: stretch; gap: 0; }
.flow__node { border: 1px solid var(--border-subtle-01); background: var(--layer-02); padding: var(--spacing-06); display: flex; flex-direction: column; min-height: 168px; }
.section--layer .flow__node { background: var(--background); }
.flow__node--gate { border-color: var(--text-primary); border-width: 2px; background: var(--layer-01); }
.flow__badge { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-helper); margin-bottom: var(--spacing-04); }
.flow__node--gate .flow__badge { color: var(--interactive); font-weight: 600; }
.flow__name { font-size: 1rem; line-height: 1.5rem; font-weight: 600; margin-bottom: var(--spacing-03); }
.flow__desc { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; color: var(--text-secondary); margin-top: auto; }
.flow__arrow { display: flex; align-items: center; justify-content: center; padding: 0 var(--spacing-04); color: var(--border-strong-01); font-size: 1.25rem; }

/* ---- Gate panel ---- */
.gate { display: grid; grid-template-columns: 5fr 7fr; gap: 1px; background: var(--border-subtle-01); border: 1px solid var(--border-subtle-01); margin-top: var(--spacing-09); }
.gate__pane { background: var(--layer-02); padding: var(--spacing-07); }
.section--layer .gate__pane { background: var(--background); }
.gate__legend { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-secondary); margin-bottom: var(--spacing-05); }
.checkitem { display: flex; align-items: flex-start; gap: var(--spacing-04); padding: var(--spacing-03) 0; cursor: pointer; }
.checkitem input { width: 16px; height: 16px; margin: 2px 0 0; accent-color: var(--interactive); flex-shrink: 0; cursor: pointer; }
.checkitem input:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.checkitem__txt { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; }
.checkitem__req { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--support-error); margin-left: var(--spacing-02); }
.gate__presets { display: flex; flex-wrap: wrap; gap: var(--spacing-03); margin-bottom: var(--spacing-06); }

/* ---- Carbon button ---- */
.btn { font-family: inherit; font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; height: 40px; padding: 0 var(--spacing-05); border: 1px solid transparent; cursor: pointer; display: inline-flex; align-items: center; transition: background 70ms cubic-bezier(0.2,0,0.38,0.9); }
.btn:focus-visible { outline: 2px solid var(--focus); outline-offset: -3px; }
.btn--primary { background: var(--interactive); color: var(--text-on-color); }
.btn--primary:hover { background: #0050e6; }
.btn--tertiary { background: transparent; color: var(--interactive); border-color: var(--interactive); }
.btn--tertiary:hover { background: var(--interactive); color: var(--text-on-color); }

/* ---- Notification (Carbon inline) ---- */
.notif { display: flex; gap: var(--spacing-05); padding: var(--spacing-05); border-left: 3px solid; margin-bottom: var(--spacing-05); }
.notif--error { background: #fff1f1; border-left-color: var(--support-error); }
.notif--success { background: #defbe6; border-left-color: var(--support-success); }
.notif__mark { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; flex-shrink: 0; padding-top: 2px; font-weight: 600; }
.notif--error .notif__mark { color: var(--support-error); }
.notif--success .notif__mark { color: #0e6027; }
.notif__title { font-size: 0.875rem; font-weight: 600; letter-spacing: 0.16px; margin-bottom: var(--spacing-02); }
.notif__body { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; color: var(--text-secondary); }
.violations { margin-top: var(--spacing-04); }
.violations li { display: flex; gap: var(--spacing-04); padding: var(--spacing-03) 0; border-top: 1px solid var(--border-subtle-00); font-size: 0.875rem; letter-spacing: 0.16px; }
.violations .sev { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; flex-shrink: 0; width: 68px; }
.sev--critical { color: var(--support-error); font-weight: 600; }
.sev--high { color: var(--support-caution-major); font-weight: 600; }

/* ---- Code snippet (Carbon pattern) ---- */
.snippet { border: 1px solid var(--border-subtle-01); }
.snippet__bar { background: var(--ui-shell); color: #c6c6c6; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; padding: var(--spacing-04) var(--spacing-05); display: flex; justify-content: space-between; }
.snippet__body { background: #262626; color: #f4f4f4; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; line-height: 1.25rem; padding: var(--spacing-05); overflow-x: auto; white-space: pre; }
.snippet__body .k { color: #78a9ff; }
.snippet__body .s { color: #7fd7a5; }
.snippet__body .c { color: #8d8d8d; }

/* ---- Structured list ---- */
.slist { border: 1px solid var(--border-subtle-01); background: var(--layer-02); }
.section--layer .slist { background: var(--background); }
.slist__row { display: grid; grid-template-columns: 280px 1fr; border-bottom: 1px solid var(--border-subtle-00); }
.slist__row:last-child { border-bottom: none; }
.slist__row--head { background: var(--layer-01); font-weight: 600; font-size: 0.875rem; letter-spacing: 0.16px; }
.slist__cell { padding: var(--spacing-05); }
.slist__cell:first-child { border-right: 1px solid var(--border-subtle-00); font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-primary); }
.slist__row--head .slist__cell:first-child { font-family: 'IBM Plex Sans', sans-serif; font-size: 0.875rem; }
.slist__cell:last-child { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; color: var(--text-secondary); }

/* ---- Workflow numbered list ---- */
.wf { border-top: 1px solid var(--border-subtle-01); }
.wf__item { display: grid; grid-template-columns: 64px 1fr; border-bottom: 1px solid var(--border-subtle-00); padding: var(--spacing-06) 0; }
.wf__num { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; color: var(--text-helper); padding-top: 4px; }
.wf__item[data-gate="true"] .wf__num { color: var(--interactive); font-weight: 600; }
.wf__h { font-size: 1rem; font-weight: 600; line-height: 1.5rem; margin-bottom: var(--spacing-03); }
.wf__p { font-size: 0.875rem; line-height: 1.25rem; letter-spacing: 0.16px; color: var(--text-secondary); max-width: 72ch; }

/* ---- CTA + footer ---- */
.cta { background: var(--interactive); color: var(--text-on-color); padding: var(--spacing-11) 0; }
.cta h2 { max-width: 28ch; margin-bottom: var(--spacing-05); }
.cta p { max-width: 60ch; color: #d0e2ff; }
.cds-footer { background: var(--ui-shell); color: #8d8d8d; padding: var(--spacing-06) 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; letter-spacing: 0.32px; }

/* ---- Responsive ---- */
@media (max-width: 1056px) {
  .flow { grid-template-columns: 1fr; }
  .flow__arrow { padding: var(--spacing-03) 0; transform: rotate(90deg); }
  .gate { grid-template-columns: 1fr; }
  .dvg__row { grid-template-columns: 1fr; }
  .dvg__cell { border-left: none; border-top: 1px solid var(--border-subtle-00); }
  .dvg__row--head { display: none; }
}
@media (max-width: 800px) {
  .cds-root .t-h07 { font-size: 2.25rem; line-height: 2.75rem; }
  .cds-root .t-h05 { font-size: 1.75rem; line-height: 2.25rem; }
  .compare, .tile-grid--2, .tile-grid--3 { grid-template-columns: 1fr; }
  .slist__row { grid-template-columns: 1fr; }
  .slist__cell:first-child { border-right: none; border-bottom: 1px solid var(--border-subtle-00); }
  .section { padding: var(--spacing-10) 0; }
  .cds-grid { padding: 0 var(--spacing-05); }
}
@media (prefers-reduced-motion: reduce) {
  .cds-root *, .cds-root *::before, .cds-root *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
}
`;

/* ============================ Data ============================ */

const SECTIONS = [
  { id: "problem", label: "01 Problem" },
  { id: "vision", label: "02 Vision" },
  { id: "architecture", label: "03 Architecture" },
  { id: "gate", label: "04 Validation Gate" },
  { id: "workflow", label: "05 Workflow" },
  { id: "benefits", label: "06 Benefits" },
];

const SITES = [
  { name: "Chronic Migraine", platform: "AEM", agency: "Agency A", note: "Rich build — interactive polls, podcasts, patient stories, orange accent system." },
  { name: "Overactive Bladder", platform: "AEM", agency: "Agency B", note: "Three indications, tabbed layouts, video testimonials, its own nav model." },
  { name: "Blepharospasm", platform: ".NET", agency: "Agency C", note: "Simple five-page build, different type scale, different ISI treatment." },
];

const DIVERGENCE = [
  { el: "Navigation", a: "Mega-menu, orange accent", b: "Sub-nav per indication", c: "Left rail only" },
  { el: "Hero", a: "Full-bleed video", b: "Stat band + carousel", c: "Flat gradient panel" },
  { el: "Savings CTA", a: "Inline mid-page", b: "Sidebar banner", c: "Footer only" },
  { el: "Specialist finder", a: "ZIP + radius + map", b: "ZIP only", c: "ZIP + radius + T&C" },
  { el: "ISI treatment", a: "Sticky bar", b: "Sticky + in-page", c: "In-page only" },
];

const TODAY_STEPS = [
  "Marketer writes a brief",
  "Agency receives brief, assigns team",
  "Designer references design portal",
  "Developer interprets design mockups",
  "QA checks brand compliance manually",
  "MLR reviews line by line, from scratch",
  "Revisions cycle (2–4 rounds typical)",
  "Launch",
];

const FUTURE_STEPS = [
  { t: "Marketer writes a content spec", em: false },
  { t: "Agent queries the Design MCP server", em: false },
  { t: "Agent retrieves tokens, components, templates", em: false },
  { t: "Agent builds the pages", em: false },
  { t: "Validation gate runs at build time — independent of the agent", em: true },
  { t: "MLR reviews judgment calls, not checklists", em: true },
  { t: "Launch", em: false },
];

const FLOW = [
  { badge: "INPUT", name: "Content spec", desc: "The marketer's brief, structured as Markdown. Content only — no design decisions." },
  { badge: "AGENT", name: "AI agent", desc: "Claude in Desktop, Code, or via API. Reads the spec, plans the build." },
  { badge: "SOURCE OF TRUTH", name: "Design MCP server", desc: "Tokens, components, templates, and compliance rules served as structured data." },
  { badge: "BUILD-TIME GATE", name: "Validation gate", desc: "Every page checked against the rules before it can ship. Runs whether or not the agent behaved.", gate: true },
  { badge: "OUTPUT", name: "Live site", desc: "Only pages that cleared the gate. Nothing reaches production unchecked." },
];

const TOOLS = [
  ["list_available_assets", "Discovery — lists every token set, component, template, and compliance rule the system holds."],
  ["get_design_tokens", "Exact hex values, type scale, spacing, border radius, and breakpoints."],
  ["get_component_specs", "Structure, styling rules, variants, and constraints for each UI component."],
  ["get_page_templates", "Page layouts with required content sections, SEO patterns, and information architecture."],
  ["get_compliance_rules", "Regulatory requirements — ISI, boxed warning, fair balance, external-link interstitial."],
  ["validate_page", "The gate. Takes a page's structure, returns violations by severity. Non-zero critical means blocked."],
];

const REQUIRED = [
  { id: "globalHeader", label: "Global header", required: true },
  { id: "sideNavigation", label: "Side navigation", required: true },
  { id: "isiFooter", label: "ISI footer (sticky, collapsible)", required: true },
  { id: "globalFooter", label: "Global footer + regulatory code", required: true },
  { id: "leavingSiteModal", label: "Leaving-site interstitial", required: true },
  { id: "hero", label: "Hero", required: false },
  { id: "contentSection", label: "Content section", required: false },
  { id: "savingsCtaBanner", label: "Savings CTA banner", required: false },
];

const RULE_FOR = {
  isiFooter: { sev: "critical", id: "isi-every-page", msg: "Important Safety Information must appear on every page." },
  globalFooter: { sev: "high", id: "regulatory-code", msg: "Regulatory approval code must appear on every page." },
  leavingSiteModal: { sev: "high", id: "external-link-interstitial", msg: "External links must route through the leaving-site interstitial." },
  globalHeader: { sev: "high", id: "product-info-links", msg: "Product Information and Medication Guide links must be reachable from every page." },
  sideNavigation: { sev: "high", id: "template-structure", msg: "Condition templates require in-section navigation." },
};

const PRESETS = {
  clean: ["globalHeader", "sideNavigation", "isiFooter", "globalFooter", "leavingSiteModal", "hero", "contentSection", "savingsCtaBanner"],
  drift: ["globalHeader", "sideNavigation", "globalFooter", "hero", "contentSection"],
};

const WORKFLOW = [
  ["Marketer writes the content spec", "Content only — headlines, body copy, references, footnotes, form fields. No design decisions, no component names, no HTML. The spec is portable across design systems."],
  ["Agent discovers the system", "The agent calls list_available_assets to learn what exists, rather than assuming. New components added to the server are picked up automatically on the next build."],
  ["Agent retrieves exact specifications", "Tokens, component specs, page templates, and compliance rules come back as structured data. There is no interpretation step and no style guide to misread."],
  ["Agent builds the pages", "Every color, type size, and spacing value traces back to a token. Every page is assembled from the templates the system defines."],
  ["Validation gate runs", "The build calls validate_page for every page. Critical violations block the deploy. This runs on the build server, not inside the agent — so it holds whether the agent was thorough, careless, or updated last week.", true],
  ["MLR reviews what needs a human", "Mechanical checks are already satisfied and evidenced. The review starts at claim substantiation and fair balance."],
  ["Launch", "The regulatory code goes in, the site ships, and the gate's report is filed as the build record."],
];

const BENEFITS = [
  ["Consistency by construction", "Not by enforcement after the fact. Two sites built six months apart from the same server produce the same header, the same ISI behavior, the same spacing."],
  ["Hours to first draft", "A complete multi-page condition site is a single agent run. The bottleneck moves from production capacity to content readiness."],
  ["Compliance checked, not assumed", "The gate runs against every page on every build and produces a dated record of what was checked."],
  ["One source of truth", "Update a token on the server and the next build of all 132 sites picks it up. No cascade of agency change orders."],
  ["Cost reduction", "The per-site production cost collapses. Spend shifts from assembling pages to deciding what they should say."],
  ["Scale without variance", "The 132nd site is built to the same standard as the first. New conditions launch in days, not quarters."],
];

/* ============================ Components ============================ */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-49px 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function ValidationGateDemo() {
  const [selected, setSelected] = useState(PRESETS.clean);
  const [result, setResult] = useState(null);
  const liveRef = useRef(null);

  const toggle = (id) =>
    setSelected((prev) => {
      setResult(null);
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });

  const applyPreset = (key) => {
    setSelected(PRESETS[key]);
    setResult(null);
  };

  const run = useCallback(() => {
    const violations = REQUIRED.filter((c) => c.required && !selected.includes(c.id)).map((c) => ({
      component: c.label,
      ...RULE_FOR[c.id],
    }));
    const critical = violations.filter((v) => v.sev === "critical").length;
    setResult({ violations, critical, blocked: violations.length > 0 });
  }, [selected]);

  return (
    <div className="gate">
      <div className="gate__pane">
        <p className="gate__legend">PAGE UNDER TEST — conditionLanding</p>
        <div className="gate__presets">
          <button className="btn btn--tertiary" onClick={() => applyPreset("clean")}>
            Agent built it correctly
          </button>
          <button className="btn btn--tertiary" onClick={() => applyPreset("drift")}>
            Agent dropped the ISI
          </button>
        </div>
        <ul>
          {REQUIRED.map((c) => (
            <li key={c.id}>
              <label className="checkitem">
                <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} />
                <span className="checkitem__txt">
                  {c.label}
                  {c.required && <span className="checkitem__req">REQUIRED</span>}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "1.5rem" }}>
          <button className="btn btn--primary" onClick={run}>
            Run the gate
          </button>
        </div>
      </div>

      <div className="gate__pane">
        <p className="gate__legend">GATE OUTPUT — build server</p>
        <div ref={liveRef} aria-live="polite">
          {!result && (
            <p className="t-body01 tx-secondary">
              Toggle any component off and run the gate. The check does not ask the agent what it did — it inspects the
              page that was actually produced.
            </p>
          )}
          {result && result.blocked && (
            <>
              <div className="notif notif--error">
                <span className="notif__mark">BLOCKED</span>
                <div>
                  <p className="notif__title">Deploy stopped — {result.violations.length} violation{result.violations.length === 1 ? "" : "s"}</p>
                  <p className="notif__body">
                    {result.critical > 0
                      ? "Critical violations present. This page cannot reach production."
                      : "High-severity violations present. Resolve before release."}
                  </p>
                </div>
              </div>
              <ul className="violations">
                {result.violations.map((v) => (
                  <li key={v.id}>
                    <span className={"sev sev--" + v.sev}>{v.sev.toUpperCase()}</span>
                    <span>
                      <strong>{v.id}</strong> — {v.msg}
                      <br />
                      <span className="tx-helper t-label">Missing: {v.component}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {result && !result.blocked && (
            <div className="notif notif--success">
              <span className="notif__mark">PASSED</span>
              <div>
                <p className="notif__title">0 violations — cleared for deploy</p>
                <p className="notif__body">
                  All critical and high-severity rules satisfied. The result is written to the build record with a
                  timestamp and the design system version used.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================ Page ============================ */

export default function PitchDeck() {
  const ids = SECTIONS.map((s) => s.id);
  const active = useScrollSpy(ids);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cds-root">
      <style>{CARBON_CSS}</style>

      {/* ── UI Shell header ── */}
      <header className="cds-header">
        <div className="cds-header__inner">
          <div className="cds-header__name">
            Agent-Driven Web Delivery <span>/ AbbVie</span>
          </div>
          <nav className="cds-header__nav" aria-label="Sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className="cds-header__link"
                data-active={active === s.id}
                onClick={() => go(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="cds-grid cds-grid--narrow">
          <p className="hero__eyebrow">STRATEGY PROPOSAL — CONFIDENTIAL</p>
          <h1 className="t-h07 hero__title">Websites your design system builds, not just governs.</h1>
          <p className="t-h03 hero__sub">
            Today the design system is a portal people consult. We propose making it a server agents query — and adding
            a build-time gate that no page can ship without clearing.
          </p>
          <dl className="hero__meta">
            <div>
              <dt>PORTFOLIO</dt>
              <dd>132 marketing sites</dd>
            </div>
            <div>
              <dt>PLATFORMS</dt>
              <dd>AEM, .NET, WordPress</dd>
            </div>
            <div>
              <dt>PROTOTYPE</dt>
              <dd>Built and running</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ── 01 Problem ── */}
      <section className="section" id="problem">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">01 / THE PROBLEM</p>
          <h2 className="t-h05 section__title">One brand, one design system, three different websites.</h2>
          <p className="t-body02 section__intro">
            These are all BOTOX® condition sites. All three were briefed against the same design portal. All three were
            built by different agencies on different platforms — and every shared element was resolved differently.
          </p>
        </div>
        <div className="cds-grid cds-grid--narrow">
          <div className="tile-grid tile-grid--3">
            {SITES.map((s) => (
              <div className="tile" key={s.name}>
                <p className="t-mono tx-helper" style={{ marginBottom: "0.5rem" }}>
                  {s.platform} · {s.agency}
                </p>
                <h3 className="t-h03 tile__title">{s.name}</h3>
                <p className="t-body01 tile__body">{s.note}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <div className="dvg">
              <div className="dvg__row dvg__row--head">
                <div className="dvg__cell dvg__cell--label">Shared element</div>
                <div className="dvg__cell dvg__cell--label">Chronic Migraine</div>
                <div className="dvg__cell dvg__cell--label">Overactive Bladder</div>
                <div className="dvg__cell dvg__cell--label">Blepharospasm</div>
              </div>
              {DIVERGENCE.map((d) => (
                <div className="dvg__row" key={d.el}>
                  <div className="dvg__cell dvg__cell--label">{d.el}</div>
                  <div className="dvg__cell t-body01">
                    {d.a}
                    <span className="dvg__flag">◆ DIVERGES</span>
                  </div>
                  <div className="dvg__cell t-body01">
                    {d.b}
                    <span className="dvg__flag">◆ DIVERGES</span>
                  </div>
                  <div className="dvg__cell t-body01">
                    {d.c}
                    <span className="dvg__flag">◆ DIVERGES</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="callout">
            <span className="callout__mark">NOTE</span>
            <p className="t-body02 callout__body">
              No one broke a rule. The design portal describes the system in prose and images; a human reads it, forms a
              reasonable interpretation, and builds. Three reasonable interpretations produce three different sites. A
              portal cannot prevent this — it has no way to inspect what was built.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 Vision ── */}
      <section className="section section--layer" id="vision">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">02 / THE VISION</p>
          <h2 className="t-h05 section__title">From human interpretation to machine-enforced consistency.</h2>
          <p className="t-body02 section__intro">
            The design system stops being a reference document and becomes a structured API that agents query in real
            time — with a check at the end that inspects the result rather than trusting the process.
          </p>

          <div className="compare">
            <div className="compare__col compare__col--today">
              <p className="compare__tag">TODAY — AGENCY MODEL</p>
              <h3 className="t-h04 compare__h">Human interpretation at every step</h3>
              <ul className="steps">
                {TODAY_STEPS.map((s, i) => (
                  <li key={s}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="metrics">
                <div>
                  <div className="m-num">8–16</div>
                  <div className="m-label">WEEKS TO LAUNCH</div>
                </div>
                <div>
                  <div className="m-num">$50K+</div>
                  <div className="m-label">PER SITE</div>
                </div>
                <div>
                  <div className="m-num">Variable</div>
                  <div className="m-label">CONSISTENCY</div>
                </div>
              </div>
            </div>

            <div className="compare__col compare__col--future">
              <p className="compare__tag">FUTURE — AGENT MODEL</p>
              <h3 className="t-h04 compare__h">Design enforced by architecture</h3>
              <ul className="steps">
                {FUTURE_STEPS.map((s, i) => (
                  <li key={s.t} data-em={s.em}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.t}</span>
                  </li>
                ))}
              </ul>
              <div className="metrics">
                <div>
                  <div className="m-num">Hours</div>
                  <div className="m-label">TO FIRST DRAFT</div>
                </div>
                <div>
                  <div className="m-num">90%+</div>
                  <div className="m-label">COST REDUCTION</div>
                </div>
                <div>
                  <div className="m-num">Verified</div>
                  <div className="m-label">CONSISTENCY</div>
                </div>
              </div>
            </div>
          </div>

          <div className="callout callout--success">
            <span className="callout__mark">MLR</span>
            <p className="t-body02 callout__body">
              This does not shrink the review — it changes what the review is spent on. Every page arrives with the
              mechanical compliance work already done and evidenced: ISI present and correctly placed, boxed warning
              intact, regulatory code in the footer, external links routed through the interstitial. MLR spends its time
              on judgment instead of checklists — claim substantiation, fair balance, tone — which is the part of the
              review that actually requires their expertise.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03 Architecture ── */}
      <section className="section" id="architecture">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">03 / THE ARCHITECTURE</p>
          <h2 className="t-h05 section__title">The Design MCP gateway, with a gate on the way out.</h2>
          <p className="t-body02 section__intro">
            The Model Context Protocol turns the design system into a structured API. The agent fetches exact
            specifications instead of interpreting a style guide — and then the build checks its work before anything
            reaches production.
          </p>

          <div className="flow">
            {FLOW.map((n, i) => (
              <React.Fragment key={n.name}>
                <div className={"flow__node" + (n.gate ? " flow__node--gate" : "")}>
                  <p className="flow__badge">{n.badge}</p>
                  <p className="flow__name">{n.name}</p>
                  <p className="flow__desc">{n.desc}</p>
                </div>
                {i < FLOW.length - 1 && <div className="flow__arrow">{i === 1 ? "⇄" : "→"}</div>}
              </React.Fragment>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <h3 className="t-h04" style={{ marginBottom: "1.5rem" }}>
              The server exposes six tools
            </h3>
            <div className="slist">
              <div className="slist__row slist__row--head">
                <div className="slist__cell">Tool</div>
                <div className="slist__cell">What it returns</div>
              </div>
              {TOOLS.map(([name, desc]) => (
                <div className="slist__row" key={name}>
                  <div className="slist__cell">{name}</div>
                  <div className="slist__cell">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <div className="snippet">
              <div className="snippet__bar">
                <span>validate_page — response</span>
                <span>JSON</span>
              </div>
              <div className="snippet__body">
                <span className="c">{"// The gate's actual output. Non-zero critical blocks the deploy."}</span>
                {"\n{\n  "}
                <span className="k">"valid"</span>
                {": "}
                <span className="s">false</span>
                {",\n  "}
                <span className="k">"templateType"</span>
                {": "}
                <span className="s">"conditionLanding"</span>
                {",\n  "}
                <span className="k">"issueCount"</span>
                {": 2,\n  "}
                <span className="k">"issues"</span>
                {": [\n    { "}
                <span className="k">"severity"</span>
                {": "}
                <span className="s">"critical"</span>
                {", "}
                <span className="k">"rule"</span>
                {": "}
                <span className="s">"isi-every-page"</span>
                {" },\n    { "}
                <span className="k">"severity"</span>
                {": "}
                <span className="s">"high"</span>
                {", "}
                <span className="k">"rule"</span>
                {": "}
                <span className="s">"regulatory-code"</span>
                {" }\n  ]\n}"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Validation gate ── */}
      <section className="section section--layer" id="gate">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">04 / THE VALIDATION GATE</p>
          <h2 className="t-h05 section__title">The guardrail that makes the speed safe.</h2>
          <p className="t-body02 section__intro">
            Speed is only an asset if it cannot outrun the controls. The gate is a build-time check that runs on every
            page of every site, independently of the agent that produced it — which is what makes the model defensible
            at 132 sites rather than merely fast at one.
          </p>

          <div className="tile-grid tile-grid--3">
            <div className="tile">
              <p className="t-mono tx-helper" style={{ marginBottom: "0.5rem" }}>
                PROPERTY 01
              </p>
              <h3 className="t-h03 tile__title">It runs regardless</h3>
              <p className="t-body01 tile__body">
                The check lives in the build pipeline, not in the agent's instructions. A thorough agent, a careless
                agent, a different model six months from now — all produce output that meets the same bar, because the
                bar is enforced after the fact.
              </p>
            </div>
            <div className="tile">
              <p className="t-mono tx-helper" style={{ marginBottom: "0.5rem" }}>
                PROPERTY 02
              </p>
              <h3 className="t-h03 tile__title">It blocks, it doesn't warn</h3>
              <p className="t-body01 tile__body">
                A critical violation fails the build. There is no path where a page missing its ISI reaches production
                because someone was moving quickly or the warning scrolled past.
              </p>
            </div>
            <div className="tile">
              <p className="t-mono tx-helper" style={{ marginBottom: "0.5rem" }}>
                PROPERTY 03
              </p>
              <h3 className="t-h03 tile__title">It leaves a record</h3>
              <p className="t-body01 tile__body">
                Every run is dated and versioned against the design system release it checked. When someone asks what
                was verified on a given site on a given day, that is a lookup rather than an investigation.
              </p>
            </div>
          </div>

          <ValidationGateDemo />

          <div className="callout">
            <span className="callout__mark">WHY IT MATTERS</span>
            <p className="t-body02 callout__body">
              Without the gate, the proposition is "trust the agent," and the honest answer to "what happens when it gets
              one wrong across 132 sites?" is that you find out in market. With the gate, the answer is that the build
              fails and the page never ships. That is the difference between a pilot and a program.
            </p>
          </div>
        </div>
      </section>

      {/* ── 05 Workflow ── */}
      <section className="section" id="workflow">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">05 / HOW IT WORKS</p>
          <h2 className="t-h05 section__title">One run, start to finish.</h2>
          <p className="t-body02 section__intro">
            The sequence below is what actually happened when we built the Blepharospasm and Overactive Bladder sites
            against the prototype server.
          </p>
          <div className="wf">
            {WORKFLOW.map(([h, p, gate], i) => (
              <div className="wf__item" key={h} data-gate={!!gate}>
                <div className="wf__num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="wf__h">{h}</h3>
                  <p className="wf__p">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Benefits ── */}
      <section className="section section--layer" id="benefits">
        <div className="cds-grid cds-grid--narrow">
          <p className="section__label">06 / WHAT IT CHANGES</p>
          <h2 className="t-h05 section__title">What the client gets.</h2>
          <div className="tile-grid tile-grid--2">
            {BENEFITS.map(([h, p]) => (
              <div className="tile" key={h}>
                <h3 className="t-h03 tile__title">{h}</h3>
                <p className="t-body01 tile__body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta">
        <div className="cds-grid cds-grid--narrow">
          <h2 className="t-h05">The prototype is built and running.</h2>
          <p className="t-body02">
            The Design System MCP server is live with 16 components, 6 page templates, and 10 compliance rules. Two
            complete condition sites have been generated against it and passed the gate on every page. We can walk the
            whole loop live — including breaking a page on purpose to watch the build stop.
          </p>
        </div>
      </div>

      <div className="cds-footer">
        <div className="cds-grid cds-grid--narrow">Confidential · Prepared for AbbVie · Agent-Driven Web Delivery Strategy</div>
      </div>
    </div>
  );
}
