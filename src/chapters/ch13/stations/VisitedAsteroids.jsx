/* ============================================================
   STATION 3 — WORLDS WE'VE VISITED
   The first three asteroids photographed up close by spacecraft were
   Gaspra, Ida (with its tiny moon Dactyl) and Mathilde. Eros was
   orbited and landed on by NEAR-Shoemaker. Toutatis, a 5-km Near-Earth
   Asteroid, was mapped by radar during its 1992 close approach,
   revealing a lumpy, contact-binary shape. Grounded in Ch.13 §13.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const ROCKS = [
  { id: "gaspra", en: "Gaspra", ja: "ガスプラ", first: true, shape: "blob", seed: 3,
    en_d: "One of the FIRST three asteroids ever photographed up close, imaged by the Galileo spacecraft on its way to Jupiter (1991).",
    ja_d: "初めて間近で撮影された3つの小惑星の一つ。木星へ向かうガリレオ探査機が撮影（1991年）。",
    en_m: "Galileo flyby, 1991", ja_m: "ガリレオ接近通過, 1991" },
  { id: "ida", en: "Ida", ja: "イダ", first: true, shape: "moon", seed: 7,
    en_d: "Also among the FIRST photographed (Galileo, 1993) — and a surprise: it has its own tiny moon, Dactyl, the first moon found orbiting an asteroid.",
    ja_d: "同じく初めて撮影された小惑星の一つ（ガリレオ, 1993年）——驚きは、小さな衛星ダクティルを持つこと。小惑星を回る衛星の初発見。",
    en_m: "Galileo flyby, 1993", ja_m: "ガリレオ接近通過, 1993" },
  { id: "mathilde", en: "Mathilde", ja: "マチルド", first: true, shape: "dark", seed: 11,
    en_d: "The third of the FIRST photographed set (NEAR, 1997) — a very dark C-type asteroid, blacker than coal, with enormous craters.",
    ja_d: "初めて撮影された組の3番目（NEAR, 1997年）——石炭より黒い非常に暗いC型小惑星で、巨大なクレーターを持つ。",
    en_m: "NEAR flyby, 1997", ja_m: "NEAR接近通過, 1997" },
  { id: "eros", en: "Eros", ja: "エロス", first: false, shape: "long", seed: 5,
    en_d: "The first asteroid to be ORBITED and landed on: NEAR-Shoemaker touched down on this elongated Near-Earth Asteroid in 2001.",
    ja_d: "初めて周回・着陸された小惑星：ニア・シューメーカーが2001年、この細長い地球近傍小惑星に着陸。",
    en_m: "NEAR-Shoemaker landing, 2001", ja_m: "ニア・シューメーカー着陸, 2001" },
  { id: "toutatis", en: "Toutatis", ja: "トータティス", first: false, shape: "binary", seed: 9,
    en_d: "A 5-km Near-Earth Asteroid mapped by RADAR during its 1992 close approach — revealing a lumpy, tumbling, contact-binary shape (two lobes stuck together).",
    ja_d: "1992年の接近時にレーダーで地図化された、長さ5 kmの地球近傍小惑星——ごつごつと転がる接触連星（2つの塊がくっついた）の形が判明。",
    en_m: "Radar imaging, 1992", ja_m: "レーダー撮像, 1992" },
];

const STR = {
  en: {
    title: "Worlds we've visited",
    kind: "The first asteroids seen up close",
    lede: "Until spacecraft flew by, asteroids were just points of light. Tap through the first ones we photographed — and the lumpy Near-Earth rock we mapped with radar.",
    thread: "THE STORY CONTINUES",
    threadText: "For centuries asteroids were nameless dots. Then, in the 1990s, passing spacecraft — and radar beams from Earth — turned them into real, cratered, irregular worlds.",
    key: "GASPRA, IDA & MATHILDE — THE FIRST PORTRAITS",
    keyText: "The first three asteroids ever photographed up close were Gaspra, Ida and Mathilde, imaged by passing spacecraft in the 1990s. Ida turned out to have its own tiny moon, Dactyl. Later, NEAR-Shoemaker actually orbited and landed on Eros. And some Near-Earth Asteroids never need a visit: Toutatis, a 5-kilometer object, was mapped by bouncing RADAR waves off it during its 1992 close approach, revealing a lumpy, contact-binary shape.",
    method: "How we saw it", first: "★ first photographed",
    note: "Gaspra, Ida and Mathilde were the first asteroids photographed up close; NEAR-Shoemaker landed on Eros; and radar revealed lumpy Toutatis in 1992.",
  },
  ja: {
    title: "訪れた世界",
    kind: "初めて間近で見た小惑星",
    lede: "探査機が接近するまで、小惑星はただの光の点でした。初めて撮影したものたち——そしてレーダーで地図化したごつごつの地球近傍の岩——を順に見よう。",
    thread: "物語はつづく",
    threadText: "何世紀もの間、小惑星は名もなき点でした。そして1990年代、通過する探査機と——地球からのレーダー波が——それらを本物のクレーターだらけの不規則な世界に変えました。",
    key: "ガスプラ・イダ・マチルド——最初の肖像",
    keyText: "初めて間近で撮影された3つの小惑星は、ガスプラ・イダ・マチルドで、1990年代に通過する探査機が撮影しました。イダには小さな衛星ダクティルがあることが判明しました。その後、ニア・シューメーカーはエロスを実際に周回・着陸しました。そして訪問が要らない地球近傍小惑星もあります：長さ5 kmのトータティスは、1992年の接近時にレーダー波を反射させて地図化され、ごつごつした接触連星の形が明らかになりました。",
    method: "どう見たか", first: "★ 初撮影",
    note: "ガスプラ・イダ・マチルドは初めて間近で撮影された小惑星、ニア・シューメーカーはエロスに着陸、そしてレーダーが1992年にごつごつのトータティスを明かしました。",
  },
};

function irregular(ctx, cx, cy, R, seed, wob) {
  ctx.beginPath();
  ctx.moveTo(cx + R, cy);
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 12) {
    const rr = R * (0.78 + wob * Math.sin(a * (2 + seed % 3) + seed));
    ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.9);
  }
  ctx.closePath();
}

function draw(ctx, cw, H, rock, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.2, H * 0.34);
  const grey = (a) => `rgba(150,140,124,${a})`;
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  if (rock.shape === "dark") { g.addColorStop(0, "#4a453d"); g.addColorStop(1, "#221f1a"); }
  else { g.addColorStop(0, "#b3a892"); g.addColorStop(1, "#6a6152"); }

  if (rock.shape === "binary") {
    // two lobes stuck together (contact binary)
    ctx.fillStyle = g;
    irregular(ctx, cx - R * 0.55, cy, R * 0.75, rock.seed, 0.16); ctx.fill();
    irregular(ctx, cx + R * 0.5, cy + R * 0.1, R * 0.6, rock.seed + 2, 0.18); ctx.fill();
  } else if (rock.shape === "long") {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.3); ctx.scale(1.5, 0.7);
    ctx.fillStyle = g; irregular(ctx, 0, 0, R, rock.seed, 0.14); ctx.fill();
    ctx.restore();
  } else {
    ctx.fillStyle = g; irregular(ctx, cx, cy, R, rock.seed, rock.shape === "blob" ? 0.16 : 0.13); ctx.fill();
  }
  // craters
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2); ctx.clip();
  const craters = [[-0.3, -0.25, 0.13], [0.28, 0.2, 0.1], [0.05, 0.4, 0.08], [-0.45, 0.15, 0.07], [0.4, -0.3, 0.06]];
  craters.forEach(([dx, dy, rr], i) => {
    if (rock.shape === "binary" && i > 2) return;
    ctx.fillStyle = grey(0.0); ctx.strokeStyle = "rgba(40,36,30,0.5)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx + dx * R, cy + dy * R, rr * R, 0, Math.PI * 2); ctx.fillStyle = "rgba(40,36,30,0.45)"; ctx.fill();
  });
  ctx.restore();
  // Ida's moon Dactyl
  if (rock.shape === "moon") {
    ctx.fillStyle = "#9a917f"; ctx.beginPath(); ctx.arc(cx + R * 1.7, cy - R * 0.5, R * 0.16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Dactyl (moon)", cx + R * 1.7, cy - R * 0.5 - R * 0.3);
  }
  // radar sweep decoration for Toutatis
  if (rock.shape === "binary") {
    ctx.strokeStyle = "rgba(120,200,255,0.25)"; ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(cx, cy, R + i * 14, -0.5, 0.5); ctx.stroke(); }
  }
  ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? rock.ja : rock.en, cx, cy + R + 30);
}

export function VisitedAsteroids() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("gaspra");
  const rock = ROCKS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, rock, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ROCKS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          {rock.first && <span style={{ color: C.sun, fontFamily: mono, fontSize: 11 }}>{t.first} · </span>}
          {lang === "ja" ? rock.ja_d : rock.en_d}
        </p>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 4 }}>
          {t.method}: {lang === "ja" ? rock.ja_m : rock.en_m}
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default VisitedAsteroids;
