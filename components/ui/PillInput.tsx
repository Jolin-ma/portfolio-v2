/*
  PillInput.tsx
  A labelled text field in the pill style. Set `multiline` for a textarea.
  `tone="dark"` is for dark bands: the label is visually hidden (still read
  by screen readers) and shown as placeholder text inside the pill instead.
  Error text is linked with aria-describedby so screen readers announce it.
*/

import styles from "./PillInput.module.css";

type Props = {
  name: string;
  label: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  error?: string;
  tone?: "light" | "dark";
  value: string;
  onChange: (value: string) => void;
};

export default function PillInput({ name, label, type = "text", multiline, autoComplete, error, tone = "light", value, onChange }: Props) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    className: `${styles.input} ${multiline ? styles.multiline : ""}`,
    placeholder: tone === "dark" ? label : undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={`${styles.field} ${tone === "dark" ? styles.dark : ""}`}>
      <label className={tone === "dark" ? "sr-only" : styles.label} htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      )}
      {error && (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
