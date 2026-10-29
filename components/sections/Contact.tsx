"use client";

/*
  Contact.tsx
  Contact band: text and a stack of pill fields on the left, the mailbox
  artwork on the right. Static hosting has no backend, so the form posts to a form
  service (Formspree or similar). Set the endpoint in .env.local:
    NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
  Until then, submitting shows a friendly "not connected yet" message.
*/

import { useState, type FormEvent } from "react";
import FeatureBand from "@/components/ui/FeatureBand";
import PillInput from "@/components/ui/PillInput";
import { bands } from "@/content/site";
import styles from "./Contact.module.css";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Fields = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

function validate(values: Fields) {
  const errors: Partial<Fields> = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Please add a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write a little more (10 characters or more).";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");

  const update = (key: keyof Fields) => (value: string) => setValues((v) => ({ ...v, [key]: value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Send keyboard and screen reader users to the first problem
      const first = Object.keys(found)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus("error");
      setStatusText("The form isn't connected yet. Please reach me through GitHub for now.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setStatusText("Thanks! Your message is on its way. I'll get back to you soon.");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusText("Something went wrong sending that. Please try again in a moment.");
    }
  }

  return (
    <FeatureBand
      id="contact"
      layout="splitReverse"
      fitMedia
      bg="plum"
      ink="cream"
      {...bands.contact}
      media={
        // Decorative: the band title says what this is
        <img src="/images/bands/contact.webp" width={720} height={900} alt="" loading="lazy" decoding="async" />
      }
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <PillInput tone="dark" name="email" label="Your email" type="email" autoComplete="email" value={values.email} onChange={update("email")} error={errors.email} />
        <PillInput tone="dark" name="name" label="Your name" autoComplete="name" value={values.name} onChange={update("name")} error={errors.name} />
        <PillInput tone="dark" name="message" label="Your message" multiline value={values.message} onChange={update("message")} error={errors.message} />

        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {/* Announced by screen readers when it changes */}
        <p className={`${styles.status} ${styles[status]}`} role="status" aria-live="polite">
          {statusText}
        </p>
      </form>
    </FeatureBand>
  );
}
