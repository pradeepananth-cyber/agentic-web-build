import { useState, useEffect, useRef } from "react";

// ============================================================
//  Agent-Driven Web Delivery — Enterprise Pitch
//  Built to IBM Carbon Design System (White theme, 2x grid,
//  IBM Plex type, core color tokens, 1px-gap tile borders).
// ============================================================

// ---- Carbon White-theme core tokens (subset used here) ----
const C = {
  background: "#ffffff",
  layer01: "#f4f4f4",
  layerHover01: "#e8e8e8",
  layer02: "#ffffff",
  borderSubtle00: "#e0e0e0",
  borderSubtle01: "#c6c6c6",
  borderStrong01: "#8d8d8d",
  textPrimary: "#161616",
  textSecondary: "#525252",
  textHelper: "#6f6f6f",
  textOnColor: "#ffffff",
  textInverse: "#ffffff",
  link: "#0f62fe",
  interactive: "#0f62fe",
  interactiveHover: "#0050e6",
  focus: "#0f62fe",
  supportError: "#da1e28",
  supportSuccess: "#24a148",
  supportWarning: "#f1c21b",
  bgInverse: "#393939",
  bgInverseDark: "#161616",
  // spacing scale (rem)
  s01: "0.125rem", s02: "0.25rem", s03: "0.5rem", s04: "0.75rem",
  s05: "1rem", s06: "1.5rem", s07: "2rem", s08: "2.5rem",
  s09: "3rem", s10: "4rem", s11: "5rem", s12: "6rem", s13: "10rem",
};

const FONT = "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'IBM Plex Mono', monospace";

// Inject IBM Plex + global resets once
function useCarbonFonts() {
  useEffect(() => {
    const id = "carbon-plex-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "carbon-global-reset";
    style.textContent = `
      * { box-sizing: border-box; }
      .cds-scroll { scroll-behavior: smooth; }
      .cds-focusable:focus-visible { outline: 2px solid ${C.focus}; outline-offset: 2px; }
      .cds-link { color: ${C.link}; text-decoration: none; }
      .cds-link:hover { text-decoration: underline; }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px);} to {opacity:1; transform:none;} }
    `;
    document.head.appendChild(style);
  }, []);
}

// ---------- Shared layout atoms ----------
function Grid({ narrow, children, style }) {
  return (
    <div
      style={{
        maxWidth: narrow ? 1056 : 1584,
        margin: "0 auto",
        padding: `0 ${C.s05}`,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: "0.75rem",
        letterSpacing: "0.32px",
        color: C.textHelper,
        margin: `0 0 ${C.s05}`,
      }}
    >
      {children}
    </p>
  );
}

function H2({ children, style }) {
  return (
    <h2
      style={{
        fontFamily: FONT,
        fontSize: "2rem",
        fontWeight: 400,
        lineHeight: 1.25,
        color: C.textPrimary,
        margin: `0 auto ${C.s05}`,
        maxWidth: 640,
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Intro({ children }) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: "1rem",
        lineHeight: 1.5,
        color: C.textSecondary,
        maxWidth: 600,
        margin: `0 auto ${C.s09}`,
        textAlign: "center",
      }}
    >
      {children}
    </p>
  );
}

function Section({ id, children, bordered = true, style }) {
  return (
    <section
      id={id}
      style={{
        padding: `${C.s12} 0`,
        borderTop: bordered ? `1px solid ${C.borderSubtle00}` : "none",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ============================================================
//  HEADER (Carbon UI Shell)
// ============================================================
const NAV_ITEMS = [
  ["shift", "The Shift"],
  ["analyst", "Analyst View"],
  ["gap", "The Gap"],
  ["opportunity", "The Opportunity"],
  ["architecture", "Architecture"],
  ["workflow", "How It Works"],
  ["benefits", "Benefits"],
];

function ShellHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 8000,
        height: 48,
        background: C.bgInverseDark,
        display: "flex",
        alignItems: "center",
        padding: `0 ${C.s05}`,
      }}
    >
      <a
        href="#hero"
        className="cds-focusable"
        style={{
          fontFamily: FONT,
          fontSize: "0.875rem",
          fontWeight: 600,
          color: C.textInverse,
          textDecoration: "none",
          marginRight: C.s09,
          whiteSpace: "nowrap",
        }}
      >
        Agent-Driven Delivery{" "}
        <span style={{ fontWeight: 400, opacity: 0.6 }}>/ Web Strategy</span>
      </a>
      <nav style={{ display: "flex", height: "100%", overflowX: "auto" }}>
        {NAV_ITEMS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="cds-focusable"
            style={{
              display: "flex",
              alignItems: "center",
              padding: `0 ${C.s05}`,
              fontFamily: FONT,
              fontSize: "0.875rem",
              color: C.textInverse,
              textDecoration: "none",
              whiteSpace: "nowrap",
              borderBottom: "2px solid transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4c4c4c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ============================================================
//  HERO
// ============================================================
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: C.s12,
      }}
    >
      <Grid narrow>
        <h1
          style={{
            fontFamily: FONT,
            fontSize: "3.375rem",
            fontWeight: 300,
            lineHeight: 1.19,
            color: C.textPrimary,
            margin: `0 0 ${C.s07}`,
          }}
        >
          Website development is moving from humans building to{" "}
          <strong style={{ fontWeight: 600, color: C.interactive }}>
            agents building and humans curating
          </strong>
        </h1>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "1.25rem",
            lineHeight: 1.4,
            color: C.textSecondary,
            margin: `0 0 ${C.s08}`,
            textAlign: "left",
          }}
        > At the center of this shift is a design system enforced through an
          MCP gateway — a structured API that agents query in real time while
          building. In this human-in-the-loop model, marketers and their
          agencies leverage agents to build websites, with humans reviewing
          and refining what the agent produces. The result: dramatically
          faster delivery, significant cost reduction, and high-fidelity
          design adherence that no manual review process has been able to
          sustain at scale. </p> 
          <span style={{ display: "inline-flex",
          alignItems: "center", background: C.layer01, color:
          C.textSecondary, fontFamily: FONT, fontSize: "0.75rem", padding: `$
          {C.s02} ${C.s04}`, borderRadius: 24, }}
        >
          Design System Governance · Agentic AI · Life Sciences Marketing
        </span>
      </Grid>
    </section>
  );
}

// ============================================================
//  01 — THE SHIFT
// ============================================================
function TheShift() {
  return (
    <Section id="shift">
      <Grid narrow>
        <SectionLabel>01 / The Shift</SectionLabel>
        <H2>The way websites are built is fundamentally changing</H2>
        <Intro>
          We are entering a world where AI agents — not agency developers — will
          generate the majority of marketing website code. This is not a distant
          possibility. It is happening now, and it will accelerate.
        </Intro>
        <p style={pBody}>
          In this new model, the marketer provides the content and objectives.
          The agent writes the code. And the human role shifts from{" "}
          <em>building</em> to <em>curating</em> — reviewing, refining, and
          approving what the agent produces rather than hand-crafting every page
          from scratch.
        </p>
        <p style={{ ...pBody, marginBottom: 0 }}>
          This presents both a risk and an opportunity. If agents build websites
          without structured access to design standards, they will produce
          inconsistent output — just as agencies do today, but faster and at
          greater scale. If the design system is expressed in a language agents
          can consume natively,{" "}
          <strong style={{ color: C.textPrimary }}>
            this is the moment to finally solve the adherence problem.
          </strong>
        </p>
      </Grid>
    </Section>
  );
}

const pBody = {
  fontFamily: FONT,
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: C.textSecondary,
  maxWidth: 620,
  margin: `0 auto ${C.s06}`,
  textAlign: "center",
};

// ============================================================
//  02 — ANALYST PERSPECTIVE (carousel)
// ============================================================
const ANALYST_SLIDES = [
  {
    title: "Redirect Efforts From Bloat to Shared Foundations",
    image: "Redirect_Efforts_to_Foundations.png",
    heading: "Redirect budget from CMS bloat to shared foundations",
    points: [
      "Overbuilt WCM / DXP traps budget in page-template sprawl, duplicated logic, and unused features",
      "Redirect budget, talent, and governance toward foundation services",
      "Structured content, customer data activation, decisioning, and AI governance become the leverage points",
    ],
    kicker: "Future advantage comes from a shared foundation, not a bigger CMS.",
  },
  {
    title: "Mid-Term: WCM 4.0 Inbound Experience Director",
    image: "WCM_Functionality.png",
    heading: "The WCM evolves into an inbound experience director",
    points: [
      "WCM keeps web-specific strengths: long-form content, page curation, UX governance, and workflow",
      "WCM inherits core content, customer context, personalization, and assets from the shared stack",
      "It orchestrates, assembles, and directs inbound experiences rather than owning everything",
    ],
    kicker: "Simpler platform. Stronger stack. Better inbound experiences.",
  },
  {
    title: "Long-Term: Agentic Assembly Obviates Web CMS",
    image: "Agentic_Assemblye_Obviates_CMS.png",
    heading: "Long-term, agentic assembly obviates the web CMS",
    points: [
      "Intent + context → foundation services → agentic workflow → render logic → inbound experiences",
      "Agents select, synthesize, personalize, and orchestrate across channels via omnichannel design systems",
      "Guardrails span the foundation: privacy, compliance, brand safety, human review, cost controls",
    ],
    kicker: "Agentic assembly is a stack consideration, not a CMS feature checkbox.",
  },
];

function AnalystCarousel() {
  const [i, setI] = useState(0);
  const total = ANALYST_SLIDES.length;
  const go = (d) => setI((c) => (c + d + total) % total);
  const s = ANALYST_SLIDES[i];

  return (
    <Section id="analyst">
      <Grid narrow>
        <SectionLabel>02 / Analyst Perspective</SectionLabel>
        <H2>Industry analysts see the CMS itself transformed by agentic assembly</H2>
        <Intro>
          Real Story Group's research frames the broader context: overbuilt CMS
          platforms give way to foundation services, the WCM evolves into an
          experience director, and long-term, agentic assembly obviates the
          traditional CMS entirely.
        </Intro>
      </Grid>
      <Grid>
        <div
          style={{
            border: `1px solid ${C.borderSubtle00}`,
            background: C.background,
          }}
        >
          {/* Slide body */}
          <div style={{ minHeight: 300 }}>
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: C.s06,
                  background: C.background,
                }}
              >
                <img
                  src={s.image}
                  alt={`${s.title} — ${s.heading}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 520,
                    objectFit: "contain",
                    animation: "fadeInUp 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: C.s04,
                  alignItems: "center",
                  padding: `${C.s05} ${C.s06}`,
                  background: C.bgInverseDark,
                }}
              >
                <span
                  aria-hidden
                  style={{ color: C.supportSuccess, fontSize: "1rem" }}
                >
                  ▲
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "1rem",
                    color: C.textInverse,
                    fontWeight: 400,
                  }}
                >
                  {s.kicker}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${C.borderSubtle00}`,
              background: C.layer01,
            }}
          >
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="cds-focusable"
              style={carouselBtn}
            >
              ‹
            </button>
            <div style={{ display: "flex", gap: C.s03 }}>
              {ANALYST_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="cds-focusable"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: idx === i ? C.interactive : C.borderSubtle01,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="cds-focusable"
              style={carouselBtn}
            >
              ›
            </button>
          </div>

          {/* Caption bar */}
          <div
            style={{
              padding: `${C.s04} ${C.s06}`,
              background: C.layer01,
              borderTop: `1px solid ${C.borderSubtle00}`,
              fontFamily: FONT,
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: C.textSecondary,
              textAlign: "center",
            }}
          >
            {i + 1} / {total} — {s.title}
          </div>
        </div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "0.75rem",
            color: C.textHelper,
            textAlign: "right",
            margin: `${C.s05} 0 0`,
          }}
        >
          Source: Real Story Group, 2026
        </p>
      </Grid>
    </Section>
  );
}

const carouselBtn = {
  width: 48,
  height: 48,
  background: C.bgInverseDark,
  color: C.textInverse,
  border: "none",
  cursor: "pointer",
  fontSize: "1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ============================================================
//  03 — THE GAP
// ============================================================
const SITE_CARDS = [
  {
    name: "Blepharospasm",
    dot: "#80379B",
    attrs: [
      ["Platform", ".NET", false],
      ["Navigation", "Left sidebar", false],
      ["Hero style", "Purple gradient, text", false],
      ["ISI format", "Collapsible sticky", false],
      ["Specialist finder", "Header inline ZIP", false],
      ["Account system", "None", false],
    ],
  },
  {
    name: "Chronic Migraine",
    dot: "#E87722",
    attrs: [
      ["Platform", "AEM", true],
      ["Navigation", "Top horizontal tabs", true],
      ["Hero style", "Photo carousel, orange", true],
      ["ISI format", "Collapsible sticky", false],
      ["Specialist finder", "Dedicated page", true],
      ["Account system", "Full login/signup", true],
    ],
  },
  {
    name: "Overactive Bladder",
    dot: "#0072CE",
    attrs: [
      ["Platform", "AEM (different build)", true],
      ["Navigation", "Top nav + sub-nav", true],
      ["Hero style", "Full-width text, no gradient", true],
      ["ISI format", "Multi-level sticky", true],
      ["Specialist finder", "Separate page + form", true],
      ["Account system", "Full login/dashboard", true],
    ],
  },
];

function TheGap() {
  return (
    <Section id="gap">
      <Grid narrow>
        <SectionLabel>03 / The Gap — A Known Problem</SectionLabel>
        <H2>You have a design system. It is not being followed.</H2>
        <Intro>
          A design portal exists today with components, styles, colors, and
          iconography. Agencies are expected to build from it. But design portals
          are reference material for humans — they require interpretation, and
          every team interprets differently. This is a known and persistent
          problem.
        </Intro>
      </Grid>
      <Grid>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: C.borderSubtle00,
            marginBottom: C.s06,
          }}
        >
          {SITE_CARDS.map((card) => (
            <div key={card.name} style={{ background: C.background, padding: C.s06 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: C.s03,
                  fontFamily: FONT,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: C.textPrimary,
                  marginBottom: C.s05,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: card.dot,
                    flexShrink: 0,
                  }}
                />
                {card.name}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {card.attrs.map(([label, value, diverge]) => (
                  <li
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: C.s04,
                      padding: `${C.s03} 0`,
                      borderBottom: `1px solid ${C.borderSubtle00}`,
                      fontFamily: FONT,
                      fontSize: "0.8125rem",
                    }}
                  >
                    <span style={{ color: C.textHelper }}>{label}</span>
                    <span
                      style={{
                        fontWeight: 500,
                        textAlign: "right",
                        color: diverge ? C.supportError : C.textPrimary,
                      }}
                    >
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "0.75rem",
            color: C.textHelper,
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.34,
          }}
        >
          <span style={{ color: C.supportError }}>●</span> Red values indicate
          design divergence from the base pattern. Same brand, same design portal
          — but each agency made fundamentally different choices for the same
          components.
        </p>
      </Grid>
      <Grid narrow style={{ marginTop: C.s07 }}>
        <p style={{ ...pBody, marginBottom: 0 }}>
          The root cause is not that agencies are careless. It is that design
          portals are built for human consumption — visual references, Figma
          libraries, style guides as PDFs. Humans read them, interpret them, and
          make judgment calls. Each judgment call introduces drift. Across nine
          agencies and hundreds of websites, that drift compounds into the
          inconsistency you see today.
        </p>
      </Grid>
    </Section>
  );
}

// ============================================================
//  04 — THE OPPORTUNITY (today vs future)
// ============================================================
function TheOpportunity() {
  return (
    <Section id="opportunity">
      <Grid narrow>
        <SectionLabel>04 / The Opportunity</SectionLabel>
        <H2>
          Make the design system machine-readable, and agents will enforce what
          agencies could not
        </H2>
        <Intro>
          The transition to agent-built websites is happening. The question is
          whether your design system is ready for it. If agents can query
          structured design specifications — exact tokens, component rules,
          compliance requirements — they produce consistent output every time,
          across every condition, on every platform.
        </Intro>
      </Grid>
      <Grid>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 1,
            background: C.borderSubtle00,
          }}
        >
          <CompareColumn
            tone={C.supportError}
            tag="TODAY — AGENCY MODEL"
            heading="Human interpretation at every step"
            steps={[
              "Marketer writes a brief",
              "Agency receives brief, assigns team",
              "Designer references design portal",
              "Developer interprets design mockups",
              "QA checks brand compliance manually",
              "MLR reviews for regulatory compliance",
              "Revisions cycle (2–4 rounds typical)",
              "Launch",
            ]}
            metrics={[
              ["8–16", "Weeks to launch"],
              ["$50K-$500K+", "Per site cost"],
              ["Variable", "Consistency"],
            ]}
          />
          <CompareColumn
            tone={C.supportSuccess}
            tag="FUTURE — AGENT MODEL"
            heading="Design enforced by architecture"
            steps={[
              "Marketer writes a content spec",
              "Agent queries Design System gateway",
              "Agent retrieves tokens, components, templates",
              "Agent builds brand-compliant pages",
              "Validation gate checks every page at build time",
              "MLR reviews judgment, not checklists",
              "Launch",
            ]}
            metrics={[
              ["Hours", "To first draft"],
              ["Upto 90%", "Cost reduction"],
              ["Guaranteed", "Consistency"],
            ]}
          />
        </div>
      </Grid>
    </Section>
  );
}

function CompareColumn({ tone, tag, heading, steps, metrics }) {
  return (
    <div style={{ background: C.background, padding: C.s07 }}>
      <div style={{ height: 2, background: tone, marginBottom: C.s06 }} />
      <p
        style={{
          fontFamily: MONO,
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.32px",
          color: tone,
          margin: `0 0 ${C.s05}`,
        }}
      >
        {tag}
      </p>
      <h3
        style={{
          fontFamily: FONT,
          fontSize: "1.25rem",
          fontWeight: 400,
          color: C.textPrimary,
          margin: `0 0 ${C.s05}`,
        }}
      >
        {heading}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {steps.map((step, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              gap: C.s04,
              alignItems: "baseline",
              padding: `${C.s04} 0`,
              borderBottom: `1px solid ${C.borderSubtle00}`,
              fontFamily: FONT,
              fontSize: "0.875rem",
              color: C.textSecondary,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.75rem",
                color: C.textHelper,
                minWidth: 20,
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: C.borderSubtle00,
          marginTop: C.s06,
        }}
      >
        {metrics.map(([num, label]) => (
          <div
            key={label}
            style={{ background: C.layer01, padding: C.s05, textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: "1.75rem",
                fontWeight: 300,
                color: tone,
                lineHeight: 1.2,
              }}
            >
              {num}
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: "0.75rem",
                color: C.textHelper,
                marginTop: C.s02,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
//  05 — ARCHITECTURE (with validation gate)
// ============================================================
const ARCH_NODES = [
  { icon: "📝", title: "Content Spec", sub: "Marketer's brief as\nstructured Markdown", clickable: "contentspec" },
  { arrow: "→" },
  { icon: "🤖", title: "AI Agent", sub: "Claude in Desktop,\nCode, or API", clickable: "prompt" },
  { arrow: "⇄" },
  { icon: "🎨", title: "Design MCP Server", sub: "Tokens · Components\nTemplates · Compliance", highlight: true },
  { arrow: "→" },
  { icon: "🛡️", title: "Validation Gate", sub: "Build-time compliance\ncheck — every page", gate: true },
  { arrow: "→" },
  { icon: "🌐", title: "Brand-Compliant Site", sub: "Ships only after the\ngate passes" },
];

const MCP_TOOLS = [
  ["list_available_assets", "Discovery — lists all tokens, components, templates, and compliance rules in the system."],
  ["get_design_tokens", "Returns exact color hex values, typography scale, spacing, border-radius, and breakpoints."],
  ["get_component_specs", "Returns structure, styling rules, variants, and constraints for each UI component."],
  ["get_page_templates", "Returns page layouts with required content sections, SEO patterns, and information architecture."],
  ["get_compliance_rules", "Returns pharma regulatory requirements — ISI, boxed warning, fair balance, external-link interstitials."],
  ["validate_page", "The gate's engine. Checks a page against the design system; flags missing components and compliance violations."],
];

function Architecture({ openModal }) {
  return (
    <Section id="architecture">
      <Grid narrow>
        <SectionLabel>05 / Architecture</SectionLabel>
        <H2>The Design MCP Gateway — with a validation gate built in</H2>
        <Intro>
          The Model Context Protocol turns the design system into a structured
          API that agents query while building. Then, before anything ships, a
          build-time validation gate checks every page — regardless of what the
          agent did. That gate is what makes the speed safe.
        </Intro>
      </Grid>
      <Grid>
        {/* Arch banner */}
        <div
          style={{
            background: C.bgInverseDark,
            padding: `${C.s10} ${C.s07}`,
            marginBottom: C.s07,
          }}
        >
          <h3
            style={{
              fontFamily: FONT,
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.16px",
              color: C.textInverse,
              textAlign: "center",
              margin: `0 0 ${C.s08}`,
            }}
          >
            End-to-End Agent Workflow{" "}
            <span style={{ fontWeight: 400, opacity: 0.5, fontSize: "0.75rem" }}>
              — click the highlighted nodes to explore
            </span>
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 0,
            }}
          >
            {ARCH_NODES.map((n, idx) =>
              n.arrow ? (
                <div
                  key={idx}
                  style={{
                    fontFamily: MONO,
                    fontSize: "1.25rem",
                    color: C.interactive,
                    padding: `0 ${C.s04}`,
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {n.arrow}
                </div>
              ) : (
                <ArchNode key={idx} node={n} onClick={() => n.clickable && openModal(n.clickable)} />
              )
            )}
          </div>
        </div>
      </Grid>

      {/* Validation gate spotlight */}
      <Grid narrow>
        <div
          style={{
            border: `1px solid ${C.borderSubtle00}`,
            borderLeft: `3px solid ${C.supportSuccess}`,
            background: C.layer01,
            padding: C.s07,
            marginBottom: C.s09,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: C.s03,
              marginBottom: C.s05,
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>🛡️</span>
            <h3
              style={{
                fontFamily: FONT,
                fontSize: "1.25rem",
                fontWeight: 600,
                color: C.textPrimary,
                margin: 0,
              }}
            >
              The Validation Gate: the guardrail that makes speed safe
            </h3>
          </div>
          <p style={{ ...pBody, maxWidth: 780 }}>
            The gate is an automated, build-time check that runs on every page
            before it can ship —{" "}
            <strong style={{ color: C.textPrimary }}>
              independent of what the agent did.
            </strong>{" "}
            It re-validates the finished page against the same design system and
            compliance rules the agent was told to follow: is the ISI present and
            correctly formatted, is the boxed warning displayed, are all required
            components in place, does every claim carry a reference, is fair
            balance maintained, is the regulatory code present.
          </p>
          <p style={{ ...pBody, maxWidth: 780, marginBottom: 0 }}>
            A page that fails the gate does not launch — it returns to the agent
            for correction. This is what lets a cautious client say yes across{" "}
            <strong style={{ color: C.textPrimary }}>132 sites</strong>: the
            consistency no longer depends on trusting the agent, the agency, or a
            reviewer's attention on any given day. It is enforced mechanically,
            the same way, every time.
          </p>
        </div>
      </Grid>

      {/* MCP tools */}
      <Grid narrow>
        <h3
          style={{
            fontFamily: FONT,
            fontSize: "1.25rem",
            fontWeight: 400,
            color: C.textPrimary,
            margin: `0 0 ${C.s06}`,
          }}
        >
          The gateway exposes 6 tools
        </h3>
      </Grid>
      <Grid>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1,
            background: C.borderSubtle00,
            marginBottom: C.s09,
          }}
        >
          {MCP_TOOLS.map(([name, desc]) => (
            <div key={name} style={{ background: C.background, padding: C.s06 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: C.interactive,
                  marginBottom: C.s03,
                }}
              >
                {name}
              </div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "0.8125rem",
                  lineHeight: 1.46,
                  color: C.textSecondary,
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Grid>

      {/* Code snippet */}
      <Grid>
        <CodeSnippet
          label="Design System MCP Server — sample response"
          lines={[
            ['comment', "// Agent calls: get_design_tokens({ categories: [\"colors\"] })"],
            ['blank', ""],
            ['plain', "{"],
            ['kv', '  "primary.purple":', '"#80379B",', "// Nav, CTAs, active states (149 uses)"],
            ['kv', '  "primary.purpleDeep":', '"#210D3F",', "// Headings + primary body text"],
            ['kv', '  "accent.blue":', '"#3860BE",', "// Links, interactive elements"],
            ['kv', '  "semantic.warning":', '"#EB3C36",', "// Boxed warning, side effects"],
            ['kv', '  "font.primary":', '"Overpass",', "// Variable font, weights 100–900"],
            ['plain', "}"],
            ['blank', ""],
            ['comment', "// Every value harvested from the live DOM — not invented."],
          ]}
        />
      </Grid>
    </Section>
  );
}

function ArchNode({ node, onClick }) {
  const isInteractive = !!node.clickable;
  const base = {
    padding: `${C.s06} ${C.s05}`,
    textAlign: "center",
    minWidth: 168,
    border: `1px solid ${
      node.highlight || node.gate
        ? node.gate
          ? C.supportSuccess
          : C.interactive
        : "rgba(255,255,255,0.15)"
    }`,
    background:
      node.gate
        ? "rgba(36,161,72,0.10)"
        : node.highlight
        ? "rgba(15,98,254,0.08)"
        : isInteractive
        ? "rgba(15,98,254,0.08)"
        : "rgba(255,255,255,0.05)",
    cursor: isInteractive ? "pointer" : "default",
    transition: "background 0.2s, transform 0.15s",
  };
  return (
    <div
      className={isInteractive ? "cds-focusable" : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={(e) => {
        if (isInteractive) {
          e.currentTarget.style.background = "rgba(15,98,254,0.18)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (isInteractive) {
          e.currentTarget.style.background = "rgba(15,98,254,0.08)";
          e.currentTarget.style.transform = "none";
        }
      }}
      style={base}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: C.s03 }}>{node.icon}</div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: "0.875rem",
          fontWeight: 600,
          color: C.textInverse,
          marginBottom: C.s01,
        }}
      >
        {node.title}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.34,
          whiteSpace: "pre-line",
        }}
      >
        {node.sub}
      </div>
      {node.gate && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.625rem",
            color: C.supportSuccess,
            marginTop: C.s03,
            letterSpacing: "0.32px",
          }}
        >
          RUNS EVERY BUILD
        </div>
      )}
      {isInteractive && (
        <div
          style={{
            fontFamily: FONT,
            fontSize: "0.625rem",
            color: "rgba(120,169,255,0.9)",
            marginTop: C.s03,
            letterSpacing: "0.32px",
            fontWeight: 500,
          }}
        >
          Click to view →
        </div>
      )}
    </div>
  );
}

function CodeSnippet({ label, lines }) {
  return (
    <div style={{ background: C.bgInverseDark, marginBottom: C.s09 }}>
      <div
        style={{
          background: C.bgInverse,
          padding: `${C.s03} ${C.s05}`,
          fontFamily: MONO,
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.32px",
        }}
      >
        {label}
      </div>
      <pre
        style={{
          padding: C.s05,
          fontFamily: MONO,
          fontSize: "0.8125rem",
          lineHeight: 1.54,
          color: "#c6c6c6",
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          margin: 0,
        }}
      >
        {lines.map((l, idx) => {
          if (l[0] === "comment")
            return <div key={idx} style={{ color: "#6f6f6f" }}>{l[1]}</div>;
          if (l[0] === "blank") return <div key={idx}>&nbsp;</div>;
          if (l[0] === "kv")
            return (
              <div key={idx}>
                <span style={{ color: "#78a9ff" }}>{l[1]}</span>{" "}
                <span style={{ color: "#42be65" }}>{l[2]}</span>{" "}
                <span style={{ color: "#6f6f6f" }}>{l[3]}</span>
              </div>
            );
          return <div key={idx}>{l[1]}</div>;
        })}
      </pre>
    </div>
  );
}

// ============================================================
//  06 — HOW IT WORKS
// ============================================================
const WORKFLOW = [
  ["01", "Marketer creates a content spec", "A Markdown file listing every page, paragraph, form field, footnote, and regulatory reference. No design decisions — just what the site needs to say and do."],
  ["02", "Agent discovers the design system", "Calls list_available_assets — discovers the components, page templates, and compliance rules. It now knows the full vocabulary."],
  ["03", "Agent retrieves design tokens", "Calls get_design_tokens for colors, typography, spacing, border-radius, breakpoints. Every visual decision uses these exact values."],
  ["04", "Agent retrieves component specs", "Calls get_component_specs for every component — header, hero, navigation, ISI footer, buttons, savings banners. Each spec defines exact structure and constraints."],
  ["05", "Agent retrieves templates & compliance", "Calls get_page_templates and get_compliance_rules — ISI on every page, boxed warning, fair balance, MedWatch link, regulatory codes."],
  ["06", "Agent builds the website", "Generates each page — applying correct tokens, following component structures, embedding all required compliance elements."],
  ["07", "Validation gate runs at build time", "Calls validate_page on every finished page, independent of the agent. Any missing component or compliance violation blocks the launch and returns the page for correction."],
];

function HowItWorks({ openModal }) {
  return (
    <Section id="workflow">
      <Grid narrow>
        <SectionLabel>06 / How It Works</SectionLabel>
        <H2>The agent workflow in practice</H2>
        <Intro>
          The marketer provides a content specification. The agent does the rest
          — querying the design system, assembling pages, and passing every page
          through the validation gate before it can ship.
        </Intro>

        <div style={{ marginBottom: C.s09 }}>
          {WORKFLOW.map(([num, title, body], idx) => (
            <div
              key={num}
              style={{
                display: "grid",
                gridTemplateColumns: "4rem 1fr",
                gap: C.s05,
                padding: `${C.s06} 0`,
                borderBottom:
                  idx === WORKFLOW.length - 1
                    ? "none"
                    : `1px solid ${C.borderSubtle00}`,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "1.75rem",
                  fontWeight: 300,
                  color: num === "07" ? C.supportSuccess : C.interactive,
                  lineHeight: 1,
                  paddingTop: C.s02,
                }}
              >
                {num}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: FONT,
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: C.textPrimary,
                    margin: `0 0 ${C.s02}`,
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: C.textSecondary,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Grid>
      <Grid>
        <CodeSnippet
          label="The marketer's prompt — this is all it takes"
          lines={[
            ["plain", "Using the attached content specification, build a complete"],
            ["plain", "BOTOX® Blepharospasm website."],
            ["blank", ""],
            ["plain", "Before writing any code, query the Design System MCP server"],
            ["plain", "to retrieve the design tokens, component specs, page templates,"],
            ["plain", "and compliance rules."],
            ["blank", ""],
            ["plain", "Then build each page as HTML that follows the design system"],
            ["plain", "exactly, and run validate_page on each finished page."],
          ].map((l) => (l[0] === "plain" ? ["kvplain", l[1]] : l)).map((l) =>
            l[0] === "kvplain" ? ["str", l[1]] : l
          )}
        />
      </Grid>
    </Section>
  );
}

// ============================================================
//  07 — BENEFITS
// ============================================================
const BENEFITS = [
  ["🎯", "Consistency by construction", "Every site uses the same tokens, components, and templates — and the validation gate confirms it before launch. The ISI footer is correct because the system enforces it, not because someone remembered."],
  ["⚡", "Hours instead of months", "A five-page condition site that takes 8–16 weeks through an agency can be generated in hours. The marketer delivers a compliant first draft the same day."],
  ["🛡️", "Compliance verified, not assumed", "ISI, boxed warning, fair balance, MedWatch links — encoded as rules and checked mechanically on every page at build time. Nothing ships until the gate passes."],
  ["🤝", "MLR spends its time on judgment", "Every page arrives with the mechanical compliance work already done — required elements present, references attached, regulatory codes in place. MLR's expert reviewers spend their time on judgment calls instead of checklists, on exactly the work that needs a human."],
  ["📐", "Single source of truth", "Update a color token or component spec in the gateway, and every future site uses the new value. No retraining agencies or reissuing PDFs."],
  ["🔄", "Scalable across conditions", "The same gateway and gate build every condition site with the same fidelity. New conditions launch in days, not quarters."],
];

function Benefits() {
  return (
    <Section id="benefits">
      <Grid narrow>
        <SectionLabel>07 / Benefits</SectionLabel>
        <H2>Why this changes everything</H2>
        <Intro>
          This fundamentally changes the economics, speed, and quality of brand
          website delivery across the enterprise — and it makes compliance
          stronger, not weaker.
        </Intro>
      </Grid>
      <Grid>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 1,
            background: C.borderSubtle00,
            marginBottom: C.s09,
          }}
        >
          {BENEFITS.map(([icon, title, body]) => (
            <div key={title} style={{ background: C.background, padding: C.s07 }}>
              <div style={{ fontSize: "1.5rem", marginBottom: C.s05 }}>{icon}</div>
              <h4
                style={{
                  fontFamily: FONT,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: C.textPrimary,
                  margin: `0 0 ${C.s03}`,
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: C.textSecondary,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Grid>
    </Section>
  );
}

// ============================================================
//  08 — PLATFORM AGNOSTIC
// ============================================================
const PLATFORMS = [
  ["Adobe Experience Manager", "AEM components, HTL templates, clientlibs, content fragments"],
  ["WordPress", "Theme files, block patterns, Gutenberg blocks, PHP templates"],
  [".NET / Razor", "Razor pages, partial views, CSS modules, tag helpers"],
  ["Static / Headless", "Next.js, Gatsby, plain HTML, React components, Jamstack"],
];

function PlatformAgnostic() {
  return (
    <Section id="platforms">
      <Grid narrow>
        <SectionLabel>08 / Platform Agnostic</SectionLabel>
        <H2>One design system. Any platform. Every site consistent.</H2>
        <Intro>
          The gateway is decoupled from the delivery platform. The agent
          retrieves the same tokens, component specs, and compliance rules — then
          generates output tailored to whatever platform the site runs on, and
          the same validation gate checks the result.
        </Intro>
      </Grid>
      <Grid>
        <div
          style={{
            background: C.bgInverseDark,
            padding: `${C.s10} ${C.s07}`,
            marginBottom: C.s07,
          }}
        >
          <h3
            style={{
              fontFamily: FONT,
              fontSize: "1rem",
              fontWeight: 600,
              color: C.textInverse,
              textAlign: "center",
              margin: `0 0 ${C.s08}`,
            }}
          >
            One source of truth → multiple platform outputs
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: C.s05,
            }}
          >
            <div
              style={{
                border: `1px solid ${C.interactive}`,
                background: "rgba(15,98,254,0.08)",
                padding: `${C.s06} ${C.s05}`,
                textAlign: "center",
                minWidth: 200,
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: C.s03 }}>🎨</div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: C.textInverse,
                }}
              >
                Design MCP Server + Gate
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: C.s01,
                }}
              >
                Tokens · Components · Compliance
              </div>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "1.25rem",
                color: C.interactive,
                padding: `0 ${C.s04}`,
              }}
            >
              →
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {PLATFORMS.map(([name, detail]) => (
                <div
                  key={name}
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    padding: `${C.s05} ${C.s06}`,
                    minWidth: 260,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: C.textInverse,
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 2,
                      lineHeight: 1.34,
                    }}
                  >
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Grid>
      <Grid narrow>
        <p style={{ ...pBody }}>
          The design system defines <em>what</em> the site should look like and{" "}
          <em>what</em> compliance rules it must follow — not <em>how</em> it's
          implemented. The agent knows the conventions of each platform and
          generates idiomatic code accordingly.
        </p>
        <p style={{ ...pBody, marginBottom: 0 }}>
          The platform decision becomes independent of the design decision. An
          AEM site and a WordPress site both look like they belong to the same
          brand — and both pass the same validation gate before they ship.
        </p>
      </Grid>
    </Section>
  );
}

// ============================================================
//  CTA + FOOTER
// ============================================================
function CTA() {
  return (
    <div style={{ background: C.interactive, padding: `${C.s10} ${C.s07}` }}>
      <Grid narrow>
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "2rem",
            fontWeight: 400,
            lineHeight: 1.25,
            color: C.textInverse,
            margin: `0 0 ${C.s05}`,
          }}
        >
          The prototype is built and running
        </h2>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 520,
            margin: 0,
          }}
        >
          The Design System MCP gateway is live, serving tokens harvested from
          the live site, with the validation gate wired in. Content specs for
          Blepharospasm and Overactive Bladder are ready. Let's schedule a live
          demo.
        </p>
      </Grid>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: C.bgInverseDark, padding: C.s07 }}>
      <Grid narrow>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}
        >
          Confidential · Prepared for client review · Agent-Driven Web Delivery
          Strategy
        </p>
      </Grid>
    </div>
  );
}

// ============================================================
//  MODALS
// ============================================================
function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={(e) => e.target === ref.current && onClose()}
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(22,22,22,0.72)",
        zIndex: 9000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: `${C.s10} ${C.s05}`,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: C.background,
          width: "100%",
          maxWidth: 860,
          boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${C.s05} ${C.s06}`,
            background: C.bgInverseDark,
          }}
        >
          <h3
            style={{
              fontFamily: FONT,
              fontSize: "0.875rem",
              fontWeight: 600,
              color: C.textInverse,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cds-focusable"
            style={{
              background: "none",
              border: "none",
              color: C.textInverse,
              fontSize: "1.25rem",
              cursor: "pointer",
              width: 40,
              height: 40,
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: C.s06, maxHeight: "70vh", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const CONTENT_SPEC = `# BOTOX® Blepharospasm Website — Content Specification

## Overview
Site name: BOTOX® for Blepharospasm
Domain: botoxblepharospasm.com
Audience: US patients and caregivers affected by Blepharospasm
Indication: Blepharospasm (abnormal spasm of the eyelids), 12 years and older
Regulatory code: US-BNO-250031

## Site Structure
1. Home (/)
2. About Blepharospasm (/about)
3. Why BOTOX® (/why-botox)
4. BOTOX® Treatment (/treatment)
5. Savings and Support (/savings)
6. Find a BOTOX® Specialist (/FindADoctor)

────────────────────────────────

## Page 1: Home (/)
Hero headline:
  Uncontrolled blinking.
  Narrowing or closing of the eyelid.
Subheadline:
  BOTOX® has been an effective treatment for Blepharospasm
  since FDA approval in 1989.
Indication statement:
  BOTOX® is a prescription medicine injected into muscles to
  treat abnormal spasm of the eyelids (Blepharospasm) in
  people 12 years and older.

## Page 2: About Blepharospasm (/about)
Title: The basics of Blepharospasm
Signs — possible early symptoms:
  • Dry eyes or watering eyes
  • Light sensitivity
  • Increased blinking
  • Ocular pain
How it's diagnosed: neurologists and ophthalmologists
diagnose based on specific signs and symptoms.

## Page 3: Why BOTOX® (/why-botox)
Title: An effective treatment for over 30 years
Clinical evidence:
  • ~90% of patients (25/27) improved within 2 days
  • Doctors noted less force needed to hold eyelids open
Savings: eligible commercially insured patients may pay as
little as $0. Up to $1,000/treatment, $4,000/year.

## Page 4: BOTOX® Treatment (/treatment)
Title: How BOTOX® works
  • Blocks nerve signals that tell muscles to contract
  • Results in as few as 2 days; max at 1–2 weeks
  • Treatment once every 3 months
  • Side effects: droopy eyelid, cornea problems, eye dryness
  • Life-threatening side-effects warning (bold)

## Page 5: Savings and Support (/savings)
Title: Get the savings and support you need
  • Most insurance covers the majority of BOTOX® costs
  • Savings program reimburses out-of-pocket costs
Patient organization:
  Benign Essential Blepharospasm Research Foundation
  1-409-832-0788 · www.blepharospasm.org

## Page 6: Find a BOTOX® Specialist (/FindADoctor)
Form: ZIP (5-digit, required) · Radius (default 25 mi) ·
Terms checkbox (required) · SEARCH · results with Show Map

────────────────────────────────

## Global Elements (every page)
Header: product info / med guide / ISI / HCP links · logo ·
  inline ZIP finder
Side nav: About · Why BOTOX® · Treatment · Savings · Find
ISI footer: collapsible, sticky — full Indication + Boxed
  Warning + complete Important Safety Information
AbbVie footer: legal links · © · trademarks · US-BNO-250031
Leaving-site modal: interstitial for all external links

## Forms
1. Header ZIP finder (all pages)
2. Full specialist finder (/FindADoctor)
3. Savings enrollment (external: BOTOXSavingsProgram.com)`;

function ContentSpecModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="📝 Content Specification — BOTOX® Blepharospasm">
      <pre
        style={{
          fontFamily: MONO,
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          color: C.textPrimary,
          margin: 0,
        }}
      >
        {CONTENT_SPEC}
      </pre>
    </Modal>
  );
}

function PromptModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="🤖 Agent Prompt — What the marketer sends to Claude">
      <div style={{ fontFamily: FONT, fontSize: "0.9375rem", lineHeight: 1.6, color: C.textPrimary }}>
        <p style={{ marginTop: 0 }}>
          <strong>
            The attached markdown file is the content specification for a BOTOX®
            Blepharospasm patient website. It contains all pages, content, forms,
            ISI text, and regulatory details.
          </strong>
        </p>
        <p><strong>Before writing any code, use the Design System MCP server to retrieve everything you need:</strong></p>
        <ol style={{ paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: 8, fontSize: "0.875rem" }}>Call <code style={codeInline}>list_available_assets</code> to see what's available</li>
          <li style={{ marginBottom: 8, fontSize: "0.875rem" }}>Call <code style={codeInline}>get_design_tokens</code> for colors, typography, spacing, borderRadius, breakpoints</li>
          <li style={{ marginBottom: 8, fontSize: "0.875rem" }}>Call <code style={codeInline}>get_component_specs</code> for globalHeader, hero, sideNavigation, contentSection, savingsCtaBanner, buttons, isiFooter, globalFooter, leavingSiteModal, specialistFinder</li>
          <li style={{ marginBottom: 8, fontSize: "0.875rem" }}>Call <code style={codeInline}>get_page_templates</code> for conditionLanding, conditionAbout, whyBotox, treatment, savings, findADoctor</li>
          <li style={{ marginBottom: 8, fontSize: "0.875rem" }}>Call <code style={codeInline}>get_compliance_rules</code> with severity: all</li>
        </ol>
        <p><strong>Then build the complete website as a multi-page HTML file:</strong></p>
        <p style={{ fontSize: "0.875rem", color: C.textSecondary }}>
          Use the exact design tokens returned by the MCP server — do not invent
          your own. Follow component specs and page-template layouts precisely.
          Include ALL content from the spec, working page navigation, the
          collapsible ISI footer on every page, the inline and full specialist
          finders, the leaving-site modal, and the complete AbbVie footer with
          regulatory code.
        </p>
        <p style={{ fontSize: "0.875rem", color: C.textSecondary, marginBottom: 0 }}>
          <strong style={{ color: C.textPrimary }}>Finally, run <code style={codeInline}>validate_page</code> on every finished page</strong> and fix anything it flags before delivering.
        </p>
      </div>
    </Modal>
  );
}

const codeInline = {
  fontFamily: MONO,
  fontSize: "0.8125rem",
  background: C.layer01,
  padding: "1px 6px",
};

// ============================================================
//  APP
// ============================================================
export default function App() {
  useCarbonFonts();
  const [modal, setModal] = useState(null); // 'contentspec' | 'prompt' | null

  return (
    <div
      className="cds-scroll"
      style={{ background: C.background, minHeight: "100vh", fontFamily: FONT }}
    >
      <ShellHeader />
      <Hero />
      <TheShift />
      <AnalystCarousel />
      <TheGap />
      <TheOpportunity />
      <Architecture openModal={setModal} />
      <HowItWorks openModal={setModal} />
      <Benefits />
      <PlatformAgnostic />
      <CTA />
      <Footer />

      <ContentSpecModal open={modal === "contentspec"} onClose={() => setModal(null)} />
      <PromptModal open={modal === "prompt"} onClose={() => setModal(null)} />
    </div>
  );
}