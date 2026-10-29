/*
  legacyHeroConfig.ts
  Every coordinate and timing for the LegacyHero animation layer, in one place.

  All coordinates are in the artwork's own space: VIEW is 2000 x 1131, which
  matches the picture's 2688 x 1520 shape (the artwork is not exactly 16:9).
  To nudge anything, find its spot in the browser and change the number here.
  Seconds are written next to each timing so they are easy to tweak.
*/

export const ARTWORK = {
  // webp copy of "legacy lin studio page.png" (6 MB png -> ~340 KB)
  src: "/images/legacy-link-studio-page.webp",
  width: 2688,
  height: 1520,
  alt: "Two small cottages on rolling pink and mustard hills at sunset, with a red heart on a hill between them and a film strip ribbon in the sky",
};

export const VIEW = { w: 2000, h: 1131 };

/* ---------- Dotted paths ---------- */

export const PATHS = {
  /** Both paths draw at the same time, over this many seconds */
  drawSeconds: 3,
  /** Left cottage door, over the mustard hill, to the heart's base */
  left: "M902 622 C960 652 1010 612 1082 642 S1200 692 1290 668 S1380 692 1440 668",
  /** Right cottage door, over the pink hill, to the heart's base */
  right: "M1866 624 C1800 662 1760 634 1700 664 S1580 702 1512 676 S1474 672 1456 668",
  color: "#D61C2B",
  /** Dot size (stroke width) and the gap between dots, in artwork units */
  dotSize: 9,
  dotGap: 24,
};

/* ---------- Heart ---------- */

export const HEART = {
  /** Bottom tip of the heart, where it meets the hill */
  x: 1448,
  y: 667,
  color: "#E42129",
  /** Seconds. The pop waits for the paths (PATHS.drawSeconds) to arrive */
  popSeconds: 0.9,
  /** One heartbeat every this many seconds (3 to 4 feels calm) */
  beatEvery: 3.6,
  /** How big the beat gets. 1.04 = 4% bigger. Keep it small. */
  beatScale: 1.04,
};

/* ---------- Paper plane ---------- */

/*
  The plane lifts off the little heart and flies laps of a big heart outline
  over the right side of the picture, clockwise, forever. A cream dotted trail
  draws behind it on the first lap and stays, so the heart is left drawn in dots.

  PLANE.heart is a generated outline: 72 smooth curves, bottom tip at the
  picture's heart (1448, 583), about 556 wide and 510 tall (x 1170-1726,
  y 73-583), cusps rounded so the plane turns smoothly. To move or resize it,
  change the numbers in the string, or ask me to regenerate it.
*/
export const PLANE = {
  heart: "M1448 583C1447 583 1445 583 1444 581C1442 580 1440 578 1438 576C1436 573 1434 570 1431 567C1429 563 1426 559 1422 554C1418 549 1414 544 1410 539C1405 533 1400 527 1395 521C1389 514 1383 508 1377 501C1370 494 1363 486 1355 479C1348 471 1340 463 1332 455C1324 447 1316 439 1307 431C1299 422 1290 413 1282 405C1273 396 1265 387 1256 378C1248 369 1240 359 1233 350C1225 341 1218 331 1212 321C1205 312 1199 302 1194 292C1189 282 1184 273 1181 263C1177 253 1174 243 1172 233C1171 224 1170 214 1170 204C1170 195 1171 186 1172 177C1174 168 1177 159 1181 151C1184 143 1189 135 1194 128C1199 121 1205 114 1212 108C1218 102 1225 97 1233 92C1240 88 1248 84 1256 81C1265 78 1273 76 1282 74C1290 73 1299 73 1307 73C1316 73 1324 74 1332 76C1340 78 1348 80 1355 83C1363 86 1370 90 1377 93C1383 97 1389 102 1395 106C1400 110 1405 115 1410 119C1414 124 1418 128 1422 133C1426 137 1429 141 1431 144C1434 148 1436 151 1438 153C1440 156 1442 158 1444 159C1445 161 1447 161 1448 161C1449 161 1451 161 1452 159C1454 158 1456 156 1458 153C1460 151 1462 148 1465 144C1467 141 1470 137 1474 133C1478 128 1482 124 1486 119C1491 115 1496 110 1501 106C1507 102 1513 97 1519 93C1526 90 1533 86 1541 83C1548 80 1556 78 1564 76C1572 74 1580 73 1589 73C1597 73 1606 73 1614 74C1623 76 1631 78 1640 81C1648 84 1656 88 1663 92C1671 97 1678 102 1684 108C1691 114 1697 121 1702 128C1707 135 1712 143 1715 151C1719 159 1722 168 1724 177C1725 186 1726 195 1726 204C1726 214 1725 224 1724 233C1722 243 1719 253 1715 263C1712 273 1707 282 1702 292C1697 302 1691 312 1684 321C1678 331 1671 341 1663 350C1656 359 1648 369 1640 378C1631 387 1623 396 1614 405C1606 413 1597 422 1589 431C1580 439 1572 447 1564 455C1556 463 1548 471 1541 479C1533 486 1526 494 1519 501C1513 508 1507 514 1501 521C1496 527 1491 533 1486 539C1482 544 1478 549 1474 554C1470 559 1467 563 1465 567C1462 570 1460 573 1458 576C1456 578 1454 580 1452 581C1451 583 1449 583 1448 583Z",
  /** Seconds for one full lap of the heart. 16 is calm; 11 is brisk */
  lapSeconds: 16,
  /** Seconds after the page starts for take-off (just after the heart pop) */
  firstAt: PATHS.drawSeconds + 0.5,
  color: "#FFF4E2",
  shade: "#EBD3B0",
};

/* ---------- Clouds ---------- */

export type CloudConfig = {
  /** Where the cloud starts */
  x: number;
  y: number;
  /** 1 = 160 units wide */
  scale: number;
  /** How far it drifts to the right before it fades out and starts again */
  travel: number;
  /** Seconds per drift (40 to 60 = slow) */
  dur: number;
  /** Negative seconds, so the clouds don't all start together */
  delay: number;
};

// Kept to the right of the headline and clear of the film strip
export const CLOUDS: CloudConfig[] = [
  { x: 900, y: 235, scale: 0.8, travel: 230, dur: 52, delay: -8 },
  { x: 880, y: 138, scale: 0.55, travel: 220, dur: 44, delay: -27 },
  { x: 1570, y: 458, scale: 0.7, travel: 320, dur: 58, delay: -15 },
];

export const CLOUD_COLOR = "#F9EBD3";

/* ---------- Sun ---------- */

export const SUN = {
  x: 1356,
  y: 561,
  r: 196,
  /** Seconds per glow pulse (6 to 8) */
  pulseSeconds: 7,
  /** Keeps the glow above the hills (the sun sets behind them) */
  clip: "M1100 0 H1700 V645 L1545 645 L1450 668 L1390 662 L1260 625 L1160 606 L1100 600 Z",
};
