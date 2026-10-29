/*
  ChallengePlaceholder.tsx
  Stands in for "The challenge" until the real story is written
  in content/projects.ts (the `challenge` field).
*/

import styles from "./ChallengePlaceholder.module.css";

export default function ChallengePlaceholder() {
  return (
    <div className={styles.box}>
      <p className={styles.heading}>Write-up in progress</p>
      <p>This part covers one real technical problem from the project:</p>
      <ol>
        <li>What broke</li>
        <li>What I tried</li>
        <li>What fixed it</li>
        <li>What I learned</li>
      </ol>
    </div>
  );
}
