/* ============================================================
   GAME TEST — internal, click-to-play menu for every bonus game.
   Bypasses the quiz so each game can be launched directly at a
   chosen reward tier. NOT linked from the hub. To deactivate:
   delete the src/gametest/ folder (the build entry is optional).
   ============================================================ */
import React, { useState } from "react";
import { LangProvider, useLang, tr } from "../shared/i18n.jsx";
import { C, display, mono } from "../shared/theme.js";
import { styles } from "../shared/styles.js";
import { Starfield } from "../shared/Starfield.jsx";
import { LangBar, GlobalStyle } from "../shared/ui.jsx";
import { GAMES_DEF, ArcadeShell } from "../shared/arcade.jsx";

/* Every game id in the bonus pool. */
const IDS = ["solar", "star", "scale", "merge", "lander", "ascent", "shield", "breaker", "docking", "wormhole"];

const REWARDS = [
  { id: "hi", label: { en: "5 lives · 5:00", ja: "ライフ5・5:00" }, reward: { lives: 5, seconds: 300 } },
  { id: "mid", label: { en: "3 lives · 3:00", ja: "ライフ3・3:00" }, reward: { lives: 3, seconds: 180 } },
  { id: "lo", label: { en: "1 life · 1:00", ja: "ライフ1・1:00" }, reward: { lives: 1, seconds: 60 } },
];

const T = {
  en: { eyebrow: "INTERNAL · GAME TEST", title: "Game Test", note: "Click a game to launch it directly — no quiz required. Choose a reward tier first.", tier: "Reward tier", back: "‹ Back to all games" },
  ja: { eyebrow: "内部用 · ゲームテスト", title: "ゲームテスト", note: "クイズなしで、ゲームを直接起動できます。まず報酬ティアを選んでください。", tier: "報酬ティア", back: "‹ すべてのゲームへ戻る" },
};

function Body({ lang, setLang }) {
  const t = T[lang];
  const [sel, setSel] = useState(null);
  const [rw, setRw] = useState(REWARDS[1]);

  return (
    <div style={styles.root}>
      <GlobalStyle />
      <Starfield />
      <div style={styles.content}>
        <LangBar lang={lang} setLang={setLang} />
        <header style={styles.header}>
          <div style={{ ...styles.eyebrow, color: C.danger }}>{t.eyebrow}</div>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.tagline}>{t.note}</p>
        </header>

        {sel ? (
          <div>
            <button style={{ ...styles.chip, marginBottom: 14 }} onClick={() => setSel(null)}>{t.back}</button>
            <div style={styles.stage}>
              <ArcadeShell reward={rw.reward} def={GAMES_DEF[sel]} onExit={() => setSel(null)} />
            </div>
          </div>
        ) : (
          <>
            {/* reward tier selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 20, justifyContent: "center" }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.tier}:</span>
              {REWARDS.map((r) => (
                <button key={r.id} onClick={() => setRw(r)}
                  style={{ ...styles.chip, ...(rw.id === r.id ? styles.chipOn : {}) }}>
                  {tr(r.label, lang)}
                </button>
              ))}
            </div>

            {/* game grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {IDS.map((id, i) => {
                const def = GAMES_DEF[id];
                if (!def) return null;
                return (
                  <button key={id} onClick={() => setSel(id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, textAlign: "left",
                      background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 14,
                      padding: 16, cursor: "pointer", color: C.text, minHeight: 96,
                    }}>
                    <span style={{ fontFamily: mono, fontSize: 12, color: C.cool }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: display, fontSize: 20 }}>{tr(def.meta.title, lang)}</span>
                    <span style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.4 }}>{tr(def.meta.goal, lang)}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <footer style={styles.footer}>{lang === "ja" ? "内部テスト用ページ · 本番では src/gametest/ を削除" : "Internal test page · delete src/gametest/ to deactivate"}</footer>
      </div>
    </div>
  );
}

export default function GameTest() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
