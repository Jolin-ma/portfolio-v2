/*
  work/dewstick-marketing/page.tsx
  A second Dewstick case study: the welcome emails and the GA4 measurement plan.
  It has its own route because it doesn't fit the shared [slug] template.
  All the words live in content/dewstick-marketing.ts.
*/

import type { Metadata } from "next";
import Link from "next/link";
import NextProject from "@/components/case/NextProject";
import { getNextProject } from "@/content/projects";
import {
  brief,
  decisions,
  emails,
  flow,
  funnel,
  learned,
  measures,
  readings,
  setupNotes,
  shades,
  sources,
  subjectLines,
  utm,
} from "@/content/dewstick-marketing";
import styles from "./marketing.module.css";

export const metadata: Metadata = {
  title: "Dewstick: email and analytics",
  description: "A concept welcome email series and GA4 measurement plan for Dewstick, a made-up tinted lip balm brand.",
};

/** The middle of an email mockup. Each email has a different one. */
function EmailBlock({ block }: { block: string }) {
  if (block === "shades") {
    return (
      <ul role="list" className={styles.shadeList}>
        {shades.map((shade) => (
          <li key={shade.name}>
            <span className={styles.dot} style={{ background: shade.color }} aria-hidden="true" />
            <strong>{shade.name}</strong> / {shade.plain}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block === "ingredients") {
    return (
      <>
        <dl className={styles.ingredients}>
          <div><dt>squalane</dt><dd>hydrate</dd></div>
          <div><dt>shea butter</dt><dd>nourish</dd></div>
          <div><dt>ceramides</dt><dd>protect</dd></div>
        </dl>
        <div className={styles.proofSlot}>
          <strong>no reviews yet.</strong> we&apos;re brand new, and we won&apos;t make any up. your words could be the first.
          <span className={styles.slotLabel}>Real review goes here once one exists</span>
        </div>
      </>
    );
  }

  return (
    <div className={styles.offer}>
      <p><strong>nectar</strong> <span>$22 CAD</span></p>
      <p><strong>the set of five</strong> <span>$98 CAD <s>$110</s></span></p>
    </div>
  );
}

export default function DewstickMarketingPage() {
  return (
    <article>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">
              <Link href="/work/dewstick/">← Dewstick</Link> · Email and analytics
            </p>
            <h1>Turning a signup into a first order</h1>
            <p className="lead">A three-email welcome series for Dewstick, and the GA4 plan I&apos;d use to tell if it worked.</p>
            <p className={styles.honest}>
              <strong>This is a concept project.</strong> Dewstick has no real customers, so there are no results here. Any number on this page is a public benchmark or a target.
            </p>
          </div>
          <img className={styles.heroArt} src="/images/cards/dewstick-art.webp" width={660} height={876} alt="Illustrated pink lip balm tube with its cap beside it" />
        </div>
      </header>

      {/* 1. Brief */}
      <section className={styles.section} aria-labelledby="brief">
        <div className={`container ${styles.split}`}>
          <h2 id="brief" className={styles.title}><span>1</span> The brief</h2>
          <p className="lead">{brief}</p>
        </div>
      </section>

      {/* 2. Approach */}
      <section className={styles.section} aria-labelledby="approach">
        <div className="container">
          <h2 id="approach" className={styles.title}><span>2</span> The approach</h2>
          <p className={styles.sectionIntro}>What I looked at, what I found, and what I did because of it.</p>
          <ol role="list" className={styles.decisions}>
            {decisions.map((item) => (
              <li key={item.looked}>
                <p className={styles.looked}>{item.looked}</p>
                <p>{item.found}</p>
                <p className={styles.decided}><strong>So:</strong> {item.decided}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Deliverables */}
      <section className={styles.section} aria-labelledby="deliverables">
        <div className="container">
          <h2 id="deliverables" className={styles.title}><span>3</span> What I made</h2>

          <h3 className={styles.subhead}>The sequence</h3>
          <ol role="list" className={styles.flow}>
            {flow.map((step) => (
              <li key={step.what}>
                <span className={styles.when}>{step.when}</span>
                <strong>{step.what}</strong>
                <span className={styles.small}>{step.event}</span>
              </li>
            ))}
          </ol>

          <h3 className={styles.subhead}>The three emails</h3>
          <div className={styles.emails}>
            {emails.map((email) => (
              <div key={email.number} className={styles.emailColumn}>
                <p className={styles.emailLabel}>
                  <strong>Email {email.number}: {email.label}</strong><br />{email.when}
                </p>
                <div className={styles.phone}>
                  <div className={styles.inbox}>
                    <strong>dewstick</strong>
                    <span className={styles.subject}>{email.subject}</span>
                    <span className={styles.preview}>{email.preview}</span>
                  </div>
                  <div className={styles.emailBody}>
                    <p className={styles.wordmark}>dewstick</p>
                    <p className={styles.emailHeading}>{email.heading}</p>
                    <p>{email.intro}</p>
                    <EmailBlock block={email.block} />
                    {email.cta && <span className={styles.button}>{email.cta}</span>}
                    {email.outro && <p>{email.outro}</p>}
                    <p className={styles.footer}>dewstick, a concept brand. mailing address · unsubscribe</p>
                  </div>
                </div>
                <dl className={styles.notes}>
                  <dt>Goal</dt>
                  <dd>{email.goal}</dd>
                  <dt>Why it&apos;s built this way</dt>
                  <dd>{email.why}</dd>
                </dl>
              </div>
            ))}
          </div>

          <h3 className={styles.subhead}>Subject lines and preview text</h3>
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Subject lines">
            <table className={styles.table}>
              <thead>
                <tr><th scope="col">Email</th><th scope="col">Subject</th><th scope="col">Preview text</th><th scope="col">Version to test against</th><th scope="col">Why it should get opened</th></tr>
              </thead>
              <tbody>
                {subjectLines.map((row) => (
                  <tr key={row.email}>
                    <th scope="row">{row.email}</th><td><strong>{row.subject}</strong></td><td>{row.preview}</td><td>{row.test}</td><td>{row.hook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={styles.subhead}>The GA4 measurement plan</h3>
          <ol role="list" className={styles.funnel}>
            {funnel.map((step, i) => (
              <li key={step.event} style={{ width: `${100 - i * 11}%` }}>
                <code>{step.event}</code>
                <span>{step.meaning}</span>
                {step.key && <span className={styles.key}>Key event</span>}
              </li>
            ))}
          </ol>
          <p className={styles.caption}>The width shows the shape of a funnel, not data. Nothing has been collected.</p>

          <p className={styles.utmLink}>
            Every email link is tagged, so GA4 can tell which email and which shade sent the visit:
          </p>
          <ul role="list" className={styles.utm}>
            {utm.map((part) => (
              <li key={part.param}>
                <code>{part.param}=<strong>{part.value}</strong></code>
                <span className={styles.small}>{part.note}</span>
              </li>
            ))}
          </ul>

          <div className={styles.setup}>
            {setupNotes.map((note) => (
              <div key={note.title}>
                <p className={styles.looked}>{note.title}</p>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reflection */}
      <section className={styles.section} aria-labelledby="reflection">
        <div className="container">
          <h2 id="reflection" className={styles.title}><span>4</span> What I&apos;d measure, and what I learned</h2>
          <p className={styles.sectionIntro}>There&apos;s no result to show, so here&apos;s how I&apos;d judge it. The flow averages cover all automated email, not only welcome series, so they&apos;re a starting point.</p>

          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="What I would measure">
            <table className={styles.table}>
              <thead>
                <tr><th scope="col">Question</th><th scope="col">Metric</th><th scope="col">Where I&apos;d read it</th><th scope="col">Target</th></tr>
              </thead>
              <tbody>
                {measures.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th><td>{row.metric}</td><td>{row.where}</td><td>{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={styles.subhead}>How I&apos;d read the numbers</h3>
          <dl className={styles.readings}>
            {readings.map((row) => (
              <div key={row.signal}>
                <dt>{row.signal}</dt>
                <dd>{row.meaning}</dd>
              </div>
            ))}
          </dl>

          <h3 className={styles.subhead}>What I learned</h3>
          <ul className={styles.learned}>
            {learned.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <details className={styles.sources}>
            <summary>Sources</summary>
            <ul>
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <NextProject project={getNextProject("dewstick")} />
    </article>
  );
}
