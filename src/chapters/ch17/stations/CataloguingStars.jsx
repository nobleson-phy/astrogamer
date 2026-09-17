/* ============================================================
   STATION 6 — CATALOGUING THE STARS
   Annie Jump Cannon classified hundreds of thousands of stellar spectra
   at Harvard, shaping the OBAFGKM sequence. Decades earlier, William and
   Margaret Huggins matched lines in stellar spectra to known Earth
   elements — proving stars are made of the same matter as Earth and the
   Sun. And in astronomers' jargon, "metals" means every element heavier
   than hydrogen and helium. Grounded in Ch.17 §17.1, 17.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LINES = [0.18, 0.31, 0.44, 0.52, 0.63, 0.78]; // shared line positions

const STR = {
  en: {
    title: "Cataloguing the stars",
    kind: "Reading the same elements",
    lede: "Line up a star's spectrum with elements measured in an Earth laboratory. The lines match exactly — switch views to see what astronomers really mean by 'metals'.",
    thread: "THE STORY CONTINUES",
    threadText: "Two breakthroughs turned starlight into chemistry: proving stars are made of familiar elements, and organizing hundreds of thousands of spectra into a single system.",
    hugginsKey: "HUGGINS: STARS ARE MADE OF EARTHLY ELEMENTS",
    hugginsText: "In the 1860s, William and Margaret Huggins compared the absorption lines in stellar spectra with the lines produced by known elements in the laboratory — and found they matched. This proved that the stars are composed of the same chemical elements found on Earth and in the Sun. Later, Annie Jump Cannon classified hundreds of thousands of stellar spectra at Harvard, developing the OBAFGKM sequence we still use.",
    metalsKey: "\"METALS\" MEANS EVERYTHING HEAVIER THAN HELIUM",
    metalsText: "Astronomers use the word \"metals\" in a special way: it means every chemical element heavier than hydrogen and helium — including elements like carbon, oxygen and neon that a chemist would never call a metal. Hydrogen and helium formed in the Big Bang; essentially all the \"metals\" were forged later inside stars.",
    huggins: "Huggins: same elements", metals: "What are \"metals\"?",
    lab: "Earth-lab element", star: "star's spectrum", match: "lines match → same elements",
    h: "H", he: "He", rest: "everything else = \"metals\"",
    cannon: "Annie Jump Cannon classified 100,000s of spectra → OBAFGKM",
    noteH: "The Huggins matched stellar lines to Earth elements, proving stars share our chemistry; Annie Jump Cannon then catalogued hundreds of thousands of spectra into OBAFGKM.",
    noteM: "To astronomers, \"metals\" = all elements heavier than hydrogen and helium — carbon and oxygen included.",
  },
  ja: {
    title: "星の目録化",
    kind: "同じ元素を読む",
    lede: "星のスペクトルを、地球の実験室で測った元素と並べよう。線はぴったり一致します——表示を切り替えて、天文学者が言う「金属」の本当の意味を見よう。",
    thread: "物語はつづく",
    threadText: "2つの突破口が星の光を化学に変えました：星が身近な元素でできていると証明したこと、そして数十万のスペクトルを一つの体系にまとめたことです。",
    hugginsKey: "ハギンズ：星は地球の元素でできている",
    hugginsText: "1860年代、ウィリアムとマーガレットのハギンズ夫妻は、恒星スペクトルの吸収線を、実験室で既知の元素が作る線と比べ——一致することを見つけました。これは、星が地球や太陽で見られるのと同じ化学元素でできていることを証明しました。後に、アニー・ジャンプ・キャノンがハーバードで数十万の恒星スペクトルを分類し、今も使うOBAFGKMの系列を作りました。",
    metalsKey: "「金属」はヘリウムより重いすべて",
    metalsText: "天文学者は「金属」という言葉を特別な意味で使います：水素とヘリウムより重いすべての化学元素——化学者なら決して金属と呼ばない炭素・酸素・ネオンなども含みます。水素とヘリウムはビッグバンで作られ、「金属」のほぼすべては後に星の内部で鍛えられました。",
    huggins: "ハギンズ：同じ元素", metals: "「金属」とは？",
    lab: "地球の実験室の元素", star: "星のスペクトル", match: "線が一致 → 同じ元素",
    h: "水素", he: "ヘリウム", rest: "それ以外すべて＝「金属」",
    cannon: "アニー・ジャンプ・キャノンが数十万のスペクトルを分類 → OBAFGKM",
    noteH: "ハギンズ夫妻は恒星の線を地球の元素に一致させ、星が私たちと同じ化学であることを証明。キャノンは数十万のスペクトルをOBAFGKMに分類しました。",
    noteM: "天文学者にとって「金属」＝水素とヘリウムより重いすべての元素——炭素や酸素も含みます。",
  },
};

function drawHuggins(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const bx = 30, bw = cw - 60, bh = 34;
  // lab spectrum (top)
  const y1 = H * 0.24;
  ctx.fillStyle = "#101018"; ctx.fillRect(bx, y1, bw, bh);
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; LINES.forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, y1); ctx.lineTo(bx + f * bw, y1 + bh); ctx.stroke(); });
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.lab, bx, y1 - 6);
  // star spectrum (bottom) — same line positions
  const y2 = H * 0.56;
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0); grad.addColorStop(0, "#6a3fff"); grad.addColorStop(0.5, "#8fe08f"); grad.addColorStop(1, "#ff5a5a");
  ctx.fillStyle = grad; ctx.fillRect(bx, y2, bw, bh);
  ctx.strokeStyle = "rgba(10,10,20,0.85)"; ctx.lineWidth = 2; LINES.forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, y2); ctx.lineTo(bx + f * bw, y2 + bh); ctx.stroke(); });
  ctx.fillStyle = C.cool; ctx.fillText(t.star, bx, y2 - 6);
  // connectors showing match
  ctx.strokeStyle = "rgba(120,255,160,0.5)"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
  LINES.forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, y1 + bh); ctx.lineTo(bx + f * bw, y2); ctx.stroke(); }); ctx.setLineDash([]);
  ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.match, cw / 2, H - 22);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.cannon, cw / 2, H - 6);
}

function drawMetals(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // three blocks: H, He, and "metals" (everything else, much wider)
  const y = H * 0.34, bh = 60, bx = 30;
  const hW = 60, heW = 60, restW = cw - 60 - hW - heW - 16;
  ctx.fillStyle = "#e0774f"; ctx.fillRect(bx, y, hW, bh);
  ctx.fillStyle = "#ffa94a"; ctx.fillRect(bx + hW + 8, y, heW, bh);
  const rx = bx + hW + heW + 16;
  const grad = ctx.createLinearGradient(rx, 0, rx + restW, 0); grad.addColorStop(0, "#8fc0e8"); grad.addColorStop(1, "#a9d0ff");
  ctx.fillStyle = grad; ctx.fillRect(rx, y, restW, bh);
  ctx.fillStyle = "#0a0c14"; ctx.font = `700 14px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.h, bx + hW / 2, y + bh / 2 + 5);
  ctx.fillText(t.he, bx + hW + 8 + heW / 2, y + bh / 2 + 5);
  ctx.fillStyle = "#0a0c14"; ctx.font = `700 13px ${mono}`; ctx.fillText(t.rest, rx + restW / 2, y + bh / 2 + 5);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "ビッグバン" : "Big Bang", bx + (hW + heW) / 2, y - 8);
  ctx.fillStyle = C.faint; ctx.fillText(lang === "ja" ? "星の中で作られた" : "forged in stars", rx + restW / 2, y - 8);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.fillText(lang === "ja" ? "天文の「金属」＝ヘリウムより重いすべて" : "astronomers' \"metals\" = everything heavier than He", cw / 2, y + bh + 26);
}

export function CataloguingStars() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("huggins");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    (mode === "huggins" ? drawHuggins : drawMetals)(ctx, cw, H, lang);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "huggins" ? t.hugginsKey : t.metalsKey}</div>
          <p style={styles.keyTermText}>{mode === "huggins" ? t.hugginsText : t.metalsText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["huggins", t.huggins], ["metals", t.metals]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "huggins" ? t.noteH : t.noteM}</p>
      </div>
    </div>
  );
}

export default CataloguingStars;
