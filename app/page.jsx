"use client";

import { useState, useEffect } from "react";

// ─── Brand ────────────────────────────────────────────────────────────────────
const B = {
  purple:     "#1d1145",
  teal:       "#0db4b9",
  pink:       "#f2a1a1",
  accent:     "#e76d89",
  bg:         "#f7f4fe",
  cardBg:     "#ffffff",
  border:     "rgba(29,17,69,0.08)",
  muted:      "rgba(29,17,69,0.45)",
  faint:      "rgba(29,17,69,0.22)",
  overlay:    "rgba(29,17,69,0.025)",
  tealFade:   "rgba(13,180,185,0.10)",
  accentFade: "rgba(231,109,137,0.10)",
  pinkFade:   "rgba(242,161,161,0.14)",
  purpleFade: "rgba(29,17,69,0.06)",
  shadow:     "0 2px 24px rgba(29,17,69,0.07)",
  shadowHov:  "0 8px 40px rgba(29,17,69,0.13)",
  radius:     "16px",
  radiusSm:   "10px",
};

// ─── Fonts ────────────────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    // Fonts
    [
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap",
      "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap",
    ].forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        document.head.appendChild(l);
      }
    });
    // Page meta
    document.title = "Ripple — Drop once. Ripple everywhere.";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Turn your podcast episode into a full content bundle in seconds. Newsletter, social captions, SEO blog post, show notes, posting calendar, and more.");
    setOG("og:title", "Ripple — Drop once. Ripple everywhere.");
    setOG("og:description", "The content repurposing tool built for podcast creators. One episode. Every platform.");
    setOG("og:url", "https://ripplefm.co");
    setOG("og:type", "website");
  }, []);
  return null;
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const GStyles = () => (
  <style>{`
    .cre * { box-sizing: border-box; }
    .cre { font-family:'Satoshi',sans-serif; background:${B.bg}; min-height:100vh; }
    .cre-card { transition:transform 0.22s ease, box-shadow 0.22s ease; }
    .cre-card:hover { transform:scale(1.007); box-shadow:${B.shadowHov}; }
    .cre-input { outline:none; transition:border-color 0.15s, box-shadow 0.15s; border:1.5px solid ${B.border}; }
    .cre-input:focus { border-color:${B.teal}!important; box-shadow:0 0 0 3px ${B.tealFade}!important; }
    .cre-btn { transition:all 0.18s ease; }
    .cre-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,17,69,0.28); }
    .cre-btn:active:not(:disabled) { transform:translateY(0); }
    .cp { transition:all 0.14s ease; cursor:pointer; }
    .cp:hover { background:${B.overlay}!important; }
    .tab { transition:all 0.14s ease; cursor:pointer; }
    .ropt { transition:border-color 0.13s, background 0.13s; cursor:pointer; }
    .ropt:hover { border-color:${B.teal}!important; background:${B.tealFade}!important; }
    .plt { transition:all 0.13s ease; cursor:pointer; }
    .plt:hover { border-color:${B.teal}!important; }
    .hist-item { transition:all 0.18s ease; cursor:pointer; }
    .hist-item:hover { transform:translateX(3px); box-shadow:${B.shadowHov}; }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fu { animation:fadeUp 0.38s ease forwards; }
    .d1{animation-delay:.04s;opacity:0} .d2{animation-delay:.08s;opacity:0}
    .d3{animation-delay:.13s;opacity:0} .d4{animation-delay:.17s;opacity:0}
    .d5{animation-delay:.21s;opacity:0} .d6{animation-delay:.26s;opacity:0}
    .d7{animation-delay:.30s;opacity:0} .d8{animation-delay:.35s;opacity:0}
    .d9{animation-delay:.39s;opacity:0} .d10{animation-delay:.44s;opacity:0}
    .d11{animation-delay:.49s;opacity:0} .d12{animation-delay:.54s;opacity:0}
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    .pulse { animation:pulse 1.7s ease-in-out infinite; }
    @keyframes shimmer {
      from { background-position:-200px 0; }
      to   { background-position:calc(200px + 100%) 0; }
    }
    .shimmer {
      background:linear-gradient(90deg,${B.border} 25%,rgba(29,17,69,0.04) 50%,${B.border} 75%);
      background-size:200px 100%;
      animation:shimmer 1.4s infinite;
      border-radius:6px;
    }
  `}</style>
);

// ─── System Prompts ───────────────────────────────────────────────────────────
const PROMPT_BUNDLE = `You are the Content Repurposing Engine. Transform raw podcast episode notes into a complete content bundle. Return ONLY valid JSON — no markdown fences, no preamble.

VOICE: Mirror HOST_VOICE exactly in tone, rhythm, personality, sentence length. If none, use: professional yet conversational, no AI-speak (never: delve, landscape, tapestry, pivotal, game-changer, transformative, robust, groundbreaking, foster, empower, leverage). Write like a sharp human.

PLATFORM: Optimize all social captions for the specified platform. Instagram=storytelling, line breaks, up to 2200 chars. TikTok=punchy hook first, direct, energetic. X/Twitter=sharp, opinionated, under 220 chars. Threads=conversational, community-feel.

Return exactly this JSON — every key required:
{
  "titles": ["3 sharper episode title options — punchy, specific, curiosity-driving, each different angle"],
  "subject_lines": ["3 email subject lines — option 1: curiosity gap, option 2: direct benefit, option 3: contrarian"],
  "show_notes": "Full show notes: 1-paragraph episode intro, then 'Key Takeaways:\\n- point\\n- point...' (5-7 bullet points starting with dashes), then '\\nTimestamps:\\n[00:00] Intro\\n[00:00] [topic from notes]...' (5-6 timestamp placeholders based on episode topics), then '\\nResources & Links:\\n- [placeholder]', then '\\nNew here? [1-sentence listener CTA]'",
  "newsletter": "150-200 word newsletter blurb. Counter-intuitive opening insight. Build curiosity. Pull to episode.",
  "captions": {
    "aha": { "text": "The Aha Moment caption. Mic-drop quote or sharp lesson. Optimized for PLATFORM.", "hashtags": ["10+ hashtags with # prefix, platform-optimized"], "visual": "Specific image/video suggestion: exact shot, mood, style, static vs video." },
    "steps": { "text": "The Step-by-Step. Hook line. Numbered breakdown. Newlines between steps. Platform-optimized.", "hashtags": ["10+ hashtags with # prefix"], "visual": "Specific image/video suggestion." },
    "contrarian": { "text": "The Contrarian Take. Challenge a common belief. Start with the challenge. Platform-optimized.", "hashtags": ["10+ hashtags with # prefix"], "visual": "Specific image/video suggestion." }
  },
  "linkedin": "LinkedIn post. Punchy first line, no period. Blank line. PAS framework. Short sentences. Bullets where useful. Question or CTA at end.",
  "cta": "Monetization CTA. 3-4 sentences. Bridge to [INSERT PRODUCT/OFFER]. Lead with transformation.",
  "clips": [{ "moment": "Exact quote or most shareable moment", "why": "One sentence: why this stops a scroll", "type": "reel OR quote graphic OR audiogram OR short clip" }],
  "guest_outreach": "If GUEST_NAME provided: 150-word email template from host to guest post-episode. Include subject line, content bundle mention, natural share ask. If no guest: null",
  "platform_descriptions": {
    "apple": "Apple Podcasts description: 500-700 characters. Starts with episode hook. Keyword-rich (include topic keywords naturally). Covers 3-4 key topics. Ends with listener benefit. No clickbait.",
    "spotify": "Spotify description: 200-300 characters. Single punchy paragraph. Benefit-led — what will the listener walk away with. More casual than Apple."
  },
  "content_calendar": [
    { "day": "Day 1", "label": "Launch", "platform": "Email", "task": "Send newsletter to list", "time": "9:00 AM", "tip": "specific tip about this send based on episode content" },
    { "day": "Day 2", "label": "Social 1", "platform": "Instagram", "task": "Post The Aha Moment caption", "time": "12:00 PM", "tip": "specific tip" },
    { "day": "Day 3", "label": "Community", "platform": "Community", "task": "Drop Engagement Prompt 1", "time": "11:00 AM", "tip": "specific tip" },
    { "day": "Day 4", "label": "LinkedIn", "platform": "LinkedIn", "task": "Publish long-form post", "time": "8:00 AM", "tip": "specific tip" },
    { "day": "Day 5", "label": "Social 2", "platform": "PLATFORM", "task": "Post The Step-by-Step caption", "time": "6:00 PM", "tip": "specific tip" },
    { "day": "Day 6", "label": "Clip Day", "platform": "PLATFORM", "task": "Post best clip moment as reel or audiogram", "time": "12:00 PM", "tip": "specific tip referencing the clip content" },
    { "day": "Day 7", "label": "Final Push", "platform": "PLATFORM", "task": "Post The Contrarian Take", "time": "5:00 PM", "tip": "specific tip" }
  ],
  "engagement_prompts": ["Episode-specific community prompt 1 — sparks real conversation, references episode content directly, ends with a question", "Prompt 2 — different angle on the episode topic, personal reflection ask", "Prompt 3 — debate or opinion prompt that divides the room in an interesting way"]
}`;

const PROMPT_BLOG = `You are an SEO content writer specializing in podcast content. Write a complete blog post from episode notes. Return ONLY valid JSON — no markdown fences, no preamble.

Mirror HOST_VOICE exactly. SEO-friendly but reads like a skilled human wrote it — never robotic.

{
  "headline": "SEO H1 headline — under 65 chars, specific, keyword-rich, curiosity-driving",
  "meta": "Meta description — under 155 chars, includes primary keyword, compelling enough to click",
  "body": "Full blog post. Use this structure: opening paragraph (hook + what reader gains, 120-150 words) → 4-5 H2 sections with ## prefix (each 180-220 words, expanding episode key points, naturally includes keywords) → 2-3 pull quotes from episode using > blockquote format → conclusion paragraph (100 words, summarizes value + direct CTA to listen to the full episode). Total: 900-1200 words. Write in HOST_VOICE."
}`;

// ─── Quiz Data ────────────────────────────────────────────────────────────────
const QUIZ = [
  { id:"pace", q:"How does your content move?", opts:[
    { l:"Rapid-fire — short, punchy, no wasted words", v:"rapid-fire and punchy, short declarative sentences" },
    { l:"Measured — thoughtful, builds to a landing", v:"thoughtful and measured, earns its landing" },
    { l:"Conversational — flows like you're talking", v:"relaxed and conversational, natural speech rhythm" },
  ]},
  { id:"humor", q:"Your relationship with humor?", opts:[
    { l:"Dry — I let it land without announcing it", v:"dry wit that lands without telegraphing" },
    { l:"Warm — big-sister, self-deprecating", v:"warm and self-deprecating humor" },
    { l:"Rare — mostly serious and direct", v:"mostly serious and direct, humor is sparse" },
  ]},
  { id:"audience", q:"How do you talk to your audience?", opts:[
    { l:"Friend — like texting someone who gets it", v:"like a trusted friend, casual and direct" },
    { l:"Mentor — I've been there, here's what I know", v:"mentor energy — experienced, grounded, guiding" },
    { l:"Peer — we're figuring this out together", v:"peer-to-peer, thinking out loud together" },
  ]},
  { id:"never", q:"What would you never say?", opts:[
    { l:"Inspirational fluff — 'You've got this!'", v:"avoids inspirational platitudes and empty hype" },
    { l:"Corporate jargon — synergies, circle back", v:"avoids corporate buzzwords and business-speak" },
    { l:"Overly casual slang — bestie, slay", v:"avoids overly casual internet slang" },
  ]},
  { id:"landing", q:"How do you land a point?", opts:[
    { l:"Mic drop — one sharp line and I'm out", v:"lands with a sharp one-liner, no over-explanation" },
    { l:"Question — I leave the reader thinking", v:"closes with an open question" },
    { l:"Action — here's exactly what to do next", v:"ends with a concrete practical next step" },
  ]},
];

const PLATFORMS = ["Instagram","TikTok","X / Twitter","Threads"];

const PLATFORM_COLORS = {
  "Email":     { bg:"rgba(13,180,185,0.10)", color:B.teal },
  "Instagram": { bg:"rgba(231,109,137,0.10)", color:B.accent },
  "TikTok":    { bg:"rgba(29,17,69,0.07)", color:B.purple },
  "LinkedIn":  { bg:"rgba(13,180,185,0.10)", color:B.teal },
  "Community": { bg:"rgba(242,161,161,0.15)", color:"#c06060" },
  "X":         { bg:"rgba(29,17,69,0.07)", color:B.purple },
  "Threads":   { bg:"rgba(29,17,69,0.07)", color:B.purple },
  "PLATFORM":  { bg:"rgba(231,109,137,0.10)", color:B.accent },
  "default":   { bg:B.overlay, color:B.muted },
};

// ─── LocalStorage Hook ────────────────────────────────────────────────────────
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const set = (v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  };
  return [val, set];
}

// ─── Shared Style Objects ─────────────────────────────────────────────────────
const inputBase = {
  width:"100%", fontFamily:"'Satoshi',sans-serif", fontSize:"14px",
  padding:"0.7rem 0.9rem", borderRadius:B.radiusSm, color:B.purple,
  background:"#fff", lineHeight:"1.55",
};

// ─── Primitive Components ─────────────────────────────────────────────────────
function Tag({ children, color=B.teal }) {
  return (
    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"10px", fontWeight:700,
      letterSpacing:"0.07em", textTransform:"uppercase", color,
      background:`${color}18`, padding:"3px 9px", borderRadius:"20px" }}>
      {children}
    </span>
  );
}

function CopyBtn({ text, small, label="Copy" }) {
  const [copied, set] = useState(false);
  const go = async () => {
    try { await navigator.clipboard.writeText(text); set(true); setTimeout(()=>set(false),2000); } catch {}
  };
  return (
    <button className="cp" onClick={go} style={{
      fontFamily:"'Satoshi',sans-serif",
      fontSize: small ? "11px" : "12px",
      padding: small ? "3px 9px" : "5px 12px",
      borderRadius:"20px",
      border:`1.5px solid ${copied ? B.teal : B.border}`,
      background: copied ? B.tealFade : "transparent",
      color: copied ? B.teal : B.muted, fontWeight:500,
    }}>{copied ? "Copied" : label}</button>
  );
}

function Card({ children, delay="", style={} }) {
  return (
    <div className={`cre-card fu ${delay}`} style={{
      background:B.cardBg, borderRadius:B.radius,
      boxShadow:B.shadow, padding:"1.5rem",
      display:"flex", flexDirection:"column", gap:"1rem", ...style,
    }}>{children}</div>
  );
}

function SectionHdr({ icon, label, delay="" }) {
  return (
    <div className={`fu ${delay}`} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
      <span style={{ fontSize:"15px" }}>{icon}</span>
      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:700,
        color:B.teal, letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function OutputCard({ tag, tagColor=B.teal, title, content, delay="" }) {
  return (
    <Card delay={delay}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <Tag color={tagColor}>{tag}</Tag>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"15px", fontWeight:600, color:B.purple }}>{title}</span>
        </div>
        <CopyBtn text={content} />
      </div>
      <p style={{ fontSize:"14px", lineHeight:"1.75", color:B.purple, margin:0, whiteSpace:"pre-wrap" }}>{content}</p>
    </Card>
  );
}

function PickerRow({ text, index, delay="" }) {
  return (
    <div className={`fu ${delay}`} style={{ display:"flex", alignItems:"flex-start", gap:"10px",
      background:B.overlay, borderRadius:B.radiusSm, padding:"0.75rem 1rem",
      border:`1.5px solid ${B.border}` }}>
      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:700,
        color:B.teal, minWidth:"18px", paddingTop:"1px" }}>0{index+1}</span>
      <p style={{ fontSize:"14px", color:B.purple, margin:0, lineHeight:"1.5", flex:1 }}>{text}</p>
      <CopyBtn text={text} small />
    </div>
  );
}

// ─── Caption Card ─────────────────────────────────────────────────────────────
function CaptionCard({ label, data, delay="" }) {
  if (!data) return null;
  const full = `${data.text}\n\n${(data.hashtags||[]).join(" ")}`;
  return (
    <div className={`fu ${delay}`} style={{ background:B.overlay, borderRadius:B.radiusSm,
      border:`1.5px solid ${B.border}`, padding:"1rem",
      display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:700, color:B.accent }}>{label}</span>
        <CopyBtn text={full} small />
      </div>
      <p style={{ fontSize:"13px", lineHeight:"1.65", color:B.purple, margin:0, whiteSpace:"pre-wrap" }}>{data.text}</p>
      {data.hashtags?.length > 0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
          {data.hashtags.map((h,i) => (
            <span key={i} style={{ fontSize:"11px", color:B.teal, background:B.tealFade,
              padding:"2px 8px", borderRadius:"20px", fontWeight:500 }}>{h}</span>
          ))}
        </div>
      )}
      {data.visual && (
        <div style={{ borderTop:`1.5px solid ${B.border}`, paddingTop:"0.6rem",
          display:"flex", gap:"8px", alignItems:"flex-start" }}>
          <span style={{ fontSize:"10px", fontWeight:700, color:B.faint,
            textTransform:"uppercase", letterSpacing:"0.06em", whiteSpace:"nowrap", paddingTop:"2px" }}>Visual</span>
          <p style={{ fontSize:"12px", lineHeight:"1.6", color:B.muted, margin:0 }}>{data.visual}</p>
        </div>
      )}
    </div>
  );
}

// ─── Clip Card ────────────────────────────────────────────────────────────────
function ClipCard({ clip, index, delay="" }) {
  return (
    <div className={`fu ${delay}`} style={{ background:B.accentFade, borderRadius:B.radiusSm,
      border:`1.5px solid rgba(231,109,137,0.18)`, padding:"1rem",
      display:"flex", flexDirection:"column", gap:"0.6rem" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700, color:B.accent }}>CLIP {index+1}</span>
          <span style={{ fontSize:"11px", color:B.accent, background:`${B.accent}20`,
            padding:"2px 8px", borderRadius:"20px", fontWeight:500 }}>{clip.type}</span>
        </div>
        <CopyBtn text={`${clip.moment}\n\nWhy it works: ${clip.why}`} small />
      </div>
      <p style={{ fontSize:"14px", color:B.purple, margin:0, lineHeight:"1.5", fontStyle:"italic" }}>"{clip.moment}"</p>
      <p style={{ fontSize:"12px", color:B.muted, margin:0 }}>{clip.why}</p>
    </div>
  );
}

// ─── Engagement Prompts Card ──────────────────────────────────────────────────
function EngagementCard({ prompts, delay="" }) {
  return (
    <Card delay={delay}>
      <SectionHdr icon="💬" label="Community Engagement Prompts" />
      <p style={{ fontSize:"13px", color:B.muted, margin:0, lineHeight:"1.55" }}>
        Post these in your Discord, Facebook group, or Stories. One per day keeps the conversation alive after the episode drops.
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {(prompts||[]).map((p,i) => (
          <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start",
            background:B.pinkFade, borderRadius:B.radiusSm,
            border:`1.5px solid ${B.pink}40`, padding:"0.85rem 1rem" }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
              color:"#c06060", minWidth:"20px", paddingTop:"1px" }}>Q{i+1}</span>
            <p style={{ fontSize:"13px", color:B.purple, margin:0, lineHeight:"1.55", flex:1 }}>{p}</p>
            <CopyBtn text={p} small />
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Platform Descriptions Card ───────────────────────────────────────────────
function PlatformDescCard({ data, delay="" }) {
  if (!data) return null;
  return (
    <Card delay={delay}>
      <SectionHdr icon="🎙️" label="Podcast Platform Descriptions" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
        {[
          { key:"apple", label:"Apple Podcasts", color:B.purple, note:"Keyword-rich · 500-700 chars" },
          { key:"spotify", label:"Spotify", color:"#1db954", note:"Punchy · 200-300 chars" },
        ].map(({ key, label, color, note }) => (
          <div key={key} style={{ background:B.overlay, borderRadius:B.radiusSm,
            border:`1.5px solid ${B.border}`, padding:"1rem",
            display:"flex", flexDirection:"column", gap:"0.65rem" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:700,
                  color, margin:"0 0 2px" }}>{label}</p>
                <p style={{ fontSize:"11px", color:B.faint, margin:0 }}>{note}</p>
              </div>
              <CopyBtn text={data[key]} small />
            </div>
            <p style={{ fontSize:"13px", lineHeight:"1.6", color:B.purple, margin:0 }}>{data[key]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Content Calendar Card ────────────────────────────────────────────────────
function CalendarCard({ items, delay="" }) {
  if (!items?.length) return null;
  return (
    <Card delay={delay}>
      <SectionHdr icon="📅" label="7-Day Content Calendar" />
      <p style={{ fontSize:"13px", color:B.muted, margin:0, lineHeight:"1.55" }}>
        Your full post-launch schedule. Everything written and ready — just follow the calendar.
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
        {items.map((item, i) => {
          const pc = PLATFORM_COLORS[item.platform] || PLATFORM_COLORS.default;
          return (
            <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start",
              padding:"0.75rem 0.9rem", borderRadius:B.radiusSm,
              background: i%2===0 ? B.overlay : "transparent",
              border:`1.5px solid ${B.border}` }}>
              <div style={{ minWidth:"52px" }}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
                  color:B.teal, margin:"0 0 2px", letterSpacing:"0.04em" }}>{item.day}</p>
                <p style={{ fontSize:"10px", color:B.faint, margin:0, fontWeight:500 }}>{item.label}</p>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"4px" }}>
                  <span style={{ fontSize:"11px", fontWeight:600,
                    color: pc.color, background: pc.bg,
                    padding:"2px 8px", borderRadius:"20px" }}>{item.platform}</span>
                  <span style={{ fontSize:"12px", color:B.faint }}>{item.time}</span>
                </div>
                <p style={{ fontSize:"13px", color:B.purple, margin:"0 0 3px", fontWeight:500, lineHeight:"1.4" }}>{item.task}</p>
                {item.tip && <p style={{ fontSize:"12px", color:B.muted, margin:0, lineHeight:"1.45" }}>{item.tip}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── Blog Post Card ───────────────────────────────────────────────────────────
function BlogPostCard({ blogData, loading, delay="" }) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <Card delay={delay}>
        <SectionHdr icon="✍️" label="Blog Post" />
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {[80,55,100,90,65].map((w,i) => (
            <div key={i} className="shimmer" style={{ height:"14px", width:`${w}%` }} />
          ))}
        </div>
        <p style={{ fontSize:"12px", color:B.faint, margin:0 }}>Writing your SEO blog post...</p>
      </Card>
    );
  }

  if (!blogData) return null;

  const preview = blogData.body?.split("\n").slice(0,6).join("\n");

  return (
    <Card delay={delay}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <Tag color={B.purple}>Blog</Tag>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"15px", fontWeight:600, color:B.purple }}>SEO Blog Post</span>
        </div>
        <CopyBtn text={`${blogData.headline}\n\n${blogData.body}`} label="Copy post" />
      </div>
      {blogData.headline && (
        <div style={{ background:B.purpleFade, borderRadius:B.radiusSm, padding:"0.75rem 1rem",
          border:`1.5px solid ${B.border}` }}>
          <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
            color:B.teal, margin:"0 0 4px", letterSpacing:"0.06em", textTransform:"uppercase" }}>Headline</p>
          <p style={{ fontSize:"15px", fontWeight:600, color:B.purple, margin:0, lineHeight:"1.4" }}>{blogData.headline}</p>
        </div>
      )}
      {blogData.meta && (
        <div style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
          <span style={{ fontSize:"10px", fontWeight:700, color:B.faint, textTransform:"uppercase",
            letterSpacing:"0.06em", whiteSpace:"nowrap", paddingTop:"3px" }}>Meta</span>
          <p style={{ fontSize:"13px", color:B.muted, margin:0, lineHeight:"1.5", flex:1 }}>{blogData.meta}</p>
          <CopyBtn text={blogData.meta} small />
        </div>
      )}
      {blogData.body && (
        <>
          <p style={{ fontSize:"14px", lineHeight:"1.75", color:B.purple, margin:0, whiteSpace:"pre-wrap" }}>
            {expanded ? blogData.body : preview + (blogData.body.split("\n").length > 6 ? "\n..." : "")}
          </p>
          <button onClick={()=>setExpanded(e=>!e)} style={{
            fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:"13px",
            padding:"0.5rem 1rem", borderRadius:"20px", alignSelf:"flex-start",
            border:`1.5px solid ${B.border}`, background:"transparent",
            color:B.teal, cursor:"pointer", transition:"all 0.14s ease"
          }}>{expanded ? "Collapse post" : "Read full post"}</button>
        </>
      )}
    </Card>
  );
}

// ─── Bundle History Panel ─────────────────────────────────────────────────────
function HistoryPanel({ history, onRestore, onDelete, open, setOpen }) {
  if (!history.length) return null;
  return (
    <div className={`fu d1`} style={{ background:B.cardBg, borderRadius:B.radius,
      boxShadow:B.shadow, overflow:"hidden" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"1rem 1.5rem", background:"transparent", border:"none", cursor:"pointer",
        fontFamily:"'Space Grotesk',sans-serif"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontSize:"14px" }}>📚</span>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"13px", fontWeight:700, color:B.purple }}>
            Ripple History
          </span>
          <span style={{ fontSize:"11px", fontWeight:600, color:B.teal, background:B.tealFade,
            padding:"2px 8px", borderRadius:"20px" }}>{history.length}</span>
        </div>
        <span style={{ fontSize:"12px", color:B.muted, transition:"transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
      </button>
      {open && (
        <div style={{ padding:"0 1.5rem 1.25rem", display:"flex", flexDirection:"column", gap:"8px" }}>
          {history.map((item) => (
            <div key={item.id} className="hist-item" style={{ display:"flex", alignItems:"center",
              gap:"10px", padding:"0.75rem 1rem", borderRadius:B.radiusSm,
              background:B.overlay, border:`1.5px solid ${B.border}` }}>
              <div style={{ flex:1, minWidth:0 }} onClick={()=>onRestore(item)}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"13px", fontWeight:600,
                  color:B.purple, margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {item.episodeTitle || "Untitled episode"}
                </p>
                <p style={{ fontSize:"11px", color:B.muted, margin:0 }}>
                  {item.podcastName && `${item.podcastName} · `}{item.timestamp} · {item.platform}
                </p>
              </div>
              <button onClick={()=>onRestore(item)} style={{
                fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:600,
                padding:"3px 10px", borderRadius:"20px", border:`1.5px solid ${B.teal}`,
                background:B.tealFade, color:B.teal, cursor:"pointer"
              }}>Restore</button>
              <button onClick={()=>onDelete(item.id)} style={{
                fontSize:"12px", padding:"3px 8px", borderRadius:"20px",
                border:`1.5px solid ${B.border}`, background:"transparent",
                color:B.faint, cursor:"pointer"
              }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Voice Quiz ───────────────────────────────────────────────────────────────
function VoiceQuiz({ answers, onChange, onSave }) {
  const done = QUIZ.every(q => answers[q.id]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
      {QUIZ.map(q => (
        <div key={q.id}>
          <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"13px", fontWeight:600,
            color:B.purple, margin:"0 0 0.5rem" }}>{q.q}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
            {q.opts.map(o => {
              const active = answers[q.id] === o.v;
              return (
                <label key={o.v} className="ropt" style={{
                  display:"flex", alignItems:"flex-start", gap:"10px",
                  padding:"0.6rem 0.85rem", borderRadius:B.radiusSm,
                  border:`1.5px solid ${active ? B.teal : B.border}`,
                  background: active ? B.tealFade : "transparent",
                }}>
                  <input type="radio" name={q.id} value={o.v} checked={active}
                    onChange={()=>onChange(q.id, o.v)}
                    style={{ marginTop:"2px", accentColor:B.teal }} />
                  <span style={{ fontSize:"13px", color:B.purple, lineHeight:"1.5" }}>{o.l}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <button disabled={!done} onClick={onSave} style={{
        fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:"13px",
        padding:"0.6rem 1.2rem", borderRadius:"20px", alignSelf:"flex-start",
        border:`1.5px solid ${done ? B.teal : B.border}`,
        background: done ? B.tealFade : "transparent",
        color: done ? B.teal : B.faint, cursor: done ? "pointer" : "not-allowed",
        transition:"all 0.15s ease",
      }}>Save voice profile</button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function RepurposeEngine() {
  const [podcastName, setPodcastName] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [hasGuest, setHasGuest] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [notes, setNotes] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [voiceTab, setVoiceTab] = useState("quiz");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [writingSample, setWritingSample] = useState("");
  const [voiceProfile, setVoiceProfile] = useState("");
  const [voiceSaved, setVoiceSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("");
  const [results, setResults] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useLocalStorage("ripple-history", []);
  const [histOpen, setHistOpen] = useState(false);

  const saveQuizVoice = () => {
    setVoiceProfile(QUIZ.map(q=>quizAnswers[q.id]).filter(Boolean).join("; "));
    setVoiceSaved(true);
  };

  const saveSampleVoice = () => {
    if (!writingSample.trim()) return;
    setVoiceProfile(`Mirror this voice exactly — tone, rhythm, personality, sentence length: "${writingSample.trim().slice(0,600)}"`);
    setVoiceSaved(true);
  };

  const buildMsg = () => [
    `PODCAST: ${podcastName.trim() || "not specified"}`,
    `EPISODE TITLE: ${episodeTitle.trim() || "not specified"}`,
    `PLATFORM: ${platform}`,
    `GUEST_NAME: ${hasGuest && guestName.trim() ? guestName.trim() : "none"}`,
    `HOST_VOICE: ${voiceProfile || "professional yet conversational creator voice"}`,
    ``,
    `EPISODE NOTES:`,
    notes.trim(),
  ].join("\n");

  const callAPI = async (systemPrompt, maxTokens) => {
    const res = await fetch("/api/generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-sonnet-4-5",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages:[{ role:"user", content: buildMsg() }],
      }),
    });
    const data = await res.json();
    const text = data.content?.find(b=>b.type==="text")?.text || "";
    return JSON.parse(text.replace(/```json|```/g,"").trim());
  };

  const generate = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setPhase("bundle");
    setError("");
    setResults(null);
    setBlogData(null);

    try {
      // Call 1: Full bundle
      const bundle = await callAPI(PROMPT_BUNDLE, 6000);
      setResults(bundle);
      setLoading(false);

      // Call 2: Blog post (async, fills in after)
      setBlogLoading(true);
      setPhase("blog");
      const blog = await callAPI(PROMPT_BLOG, 3000);
      setBlogData(blog);
      setBlogLoading(false);

      // Save to history
      const item = {
        id: Date.now(),
        timestamp: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
        podcastName, episodeTitle, platform,
        results: bundle, blogData: blog,
      };
      setHistory([item, ...history].slice(0, 10));

    } catch (e) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      setBlogLoading(false);
    }
  };

  const restoreBundle = (item) => {
    setPodcastName(item.podcastName || "");
    setEpisodeTitle(item.episodeTitle || "");
    setPlatform(item.platform || "Instagram");
    setResults(item.results || null);
    setBlogData(item.blogData || null);
    setBlogLoading(false);
    setHistOpen(false);
    window.scrollTo({ top: 0, behavior:"smooth" });
  };

  const deleteBundle = (id) => setHistory(history.filter(h=>h.id!==id));

  const resetForm = () => {
    setResults(null); setBlogData(null);
    setNotes(""); setEpisodeTitle("");
    setGuestName(""); setHasGuest(false);
  };

  const wc = notes.trim() ? notes.trim().split(/\s+/).filter(Boolean).length : 0;
  const canGen = notes.trim() && !loading && !blogLoading;

  const tabStyle = (active) => ({
    fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:"12px",
    padding:"0.4rem 0.9rem", borderRadius:"20px", border:"none",
    background: active ? B.purple : "transparent",
    color: active ? "#fff" : B.muted, cursor:"pointer",
    transition:"all 0.14s ease",
  });

  return (
    <div className="cre">
      <FontLoader /><GStyles />
      <div style={{ maxWidth:"700px", margin:"0 auto", padding:"2.5rem 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"12px",
              background:`linear-gradient(135deg, ${B.teal}, ${B.accent})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:`0 4px 16px rgba(13,180,185,0.28)` }}>
              <span style={{ fontSize:"20px" }}>🌊</span>
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"28px", fontWeight:700,
                  color:B.purple, margin:0, letterSpacing:"-0.02em" }}>Ripple</h1>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"10px", fontWeight:700,
                  color:B.accent, background:B.accentFade, padding:"3px 9px",
                  borderRadius:"20px", letterSpacing:"0.07em" }}>BETA</span>
              </div>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:600,
                color:B.teal, margin:0, letterSpacing:"0.04em" }}>Drop once. Ripple everywhere.</p>
            </div>
          </div>
          <p style={{ fontSize:"15px", color:B.muted, margin:0, lineHeight:"1.6" }}>
            Paste your episode notes and get a complete content bundle — titles, show notes, social captions, newsletter, SEO blog post, platform descriptions, a 7-day posting calendar, and more.
          </p>
        </div>

        {/* History */}
        <div style={{ marginBottom:"1.25rem" }}>
          <HistoryPanel history={history} onRestore={restoreBundle}
            onDelete={deleteBundle} open={histOpen} setOpen={setHistOpen} />
        </div>

        {/* Inputs */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>

          {/* Episode info */}
          <Card delay="d1">
            <Tag color={B.accent}>Episode</Tag>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
              <div>
                <label style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
                  color:B.muted, display:"block", marginBottom:"5px", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                  Podcast name</label>
                <input className="cre-input" type="text" value={podcastName}
                  onChange={e=>setPodcastName(e.target.value)}
                  placeholder="Your show's name" style={inputBase} />
              </div>
              <div>
                <label style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
                  color:B.muted, display:"block", marginBottom:"5px", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                  Episode title</label>
                <input className="cre-input" type="text" value={episodeTitle}
                  onChange={e=>setEpisodeTitle(e.target.value)}
                  placeholder="Working title (we'll suggest better ones)" style={inputBase} />
              </div>
            </div>
            <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer",
              fontFamily:"'Satoshi',sans-serif", fontSize:"13px", color:B.muted, fontWeight:500 }}>
              <input type="checkbox" checked={hasGuest} onChange={e=>setHasGuest(e.target.checked)}
                style={{ width:"15px", height:"15px", accentColor:B.teal, cursor:"pointer" }} />
              This episode features a guest
            </label>
            {hasGuest && (
              <input className="cre-input" type="text" value={guestName}
                onChange={e=>setGuestName(e.target.value)}
                placeholder="Guest's name" style={inputBase} />
            )}
          </Card>

          {/* Notes */}
          <Card delay="d2">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <Tag color={B.teal}>Notes</Tag>
              {wc > 0 && <span style={{ fontSize:"12px", color:B.faint, fontWeight:500 }}>{wc} words</span>}
            </div>
            <textarea className="cre-input" value={notes} onChange={e=>setNotes(e.target.value)}
              placeholder="Paste your raw episode notes, outline, or transcript. The more detail, the better every output."
              rows={9} style={{ ...inputBase, resize:"vertical", padding:"0.85rem" }} />
          </Card>

          {/* Platform */}
          <Card delay="d3">
            <Tag color={B.pink}>Platform</Tag>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {PLATFORMS.map(p => (
                <button key={p} className="plt" onClick={()=>setPlatform(p)} style={{
                  fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:"13px",
                  padding:"0.5rem 1.1rem", borderRadius:"20px",
                  border:`1.5px solid ${platform===p ? B.teal : B.border}`,
                  background: platform===p ? B.tealFade : "transparent",
                  color: platform===p ? B.teal : B.muted,
                }}>{p}</button>
              ))}
            </div>
            <p style={{ fontSize:"12px", color:B.faint, margin:"-0.25rem 0 0" }}>
              Captions, hashtags, and visual direction optimized for {platform}.
            </p>
          </Card>

          {/* Voice */}
          <Card delay="d4">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <Tag color={B.accent}>Voice</Tag>
              {voiceSaved && (
                <span style={{ fontSize:"11px", fontWeight:600, color:B.teal, background:B.tealFade,
                  padding:"3px 9px", borderRadius:"20px" }}>Profile saved</span>
              )}
            </div>
            <p style={{ fontSize:"13px", color:B.muted, margin:"-0.25rem 0 0", lineHeight:"1.55" }}>
              Set your voice once — the tool mirrors it across every output.
            </p>
            <div style={{ display:"flex", gap:"4px", background:B.overlay,
              padding:"4px", borderRadius:"20px", alignSelf:"flex-start",
              border:`1.5px solid ${B.border}` }}>
              <button style={tabStyle(voiceTab==="quiz")} onClick={()=>setVoiceTab("quiz")}>Take the quiz</button>
              <button style={tabStyle(voiceTab==="sample")} onClick={()=>setVoiceTab("sample")}>Paste a sample</button>
            </div>
            {voiceTab==="quiz" && (
              <VoiceQuiz answers={quizAnswers}
                onChange={(id,v)=>setQuizAnswers(p=>({...p,[id]:v}))}
                onSave={saveQuizVoice} />
            )}
            {voiceTab==="sample" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                <p style={{ fontSize:"13px", color:B.muted, margin:0, lineHeight:"1.55" }}>
                  Paste 1-2 paragraphs of your own writing. The tool will study and match it exactly.
                </p>
                <textarea className="cre-input" value={writingSample}
                  onChange={e=>setWritingSample(e.target.value)}
                  placeholder="Paste your writing sample here..."
                  rows={5} style={{ ...inputBase, resize:"vertical", padding:"0.85rem" }} />
                <button onClick={saveSampleVoice} disabled={!writingSample.trim()} style={{
                  fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:"13px",
                  padding:"0.6rem 1.2rem", borderRadius:"20px", alignSelf:"flex-start",
                  border:`1.5px solid ${writingSample.trim() ? B.teal : B.border}`,
                  background: writingSample.trim() ? B.tealFade : "transparent",
                  color: writingSample.trim() ? B.teal : B.faint,
                  cursor: writingSample.trim() ? "pointer" : "not-allowed",
                  transition:"all 0.15s ease",
                }}>Save voice profile</button>
              </div>
            )}
          </Card>

          {/* Generate button */}
          <button className="cre-btn" onClick={generate} disabled={!canGen} style={{
            fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"16px",
            padding:"1rem 2rem", borderRadius:"12px", border:"none",
            background: canGen ? B.purple : B.border,
            color: canGen ? "#fff" : B.faint,
            cursor: canGen ? "pointer" : "not-allowed",
            letterSpacing:"0.02em", alignSelf:"flex-start",
            boxShadow: canGen ? `0 4px 20px rgba(29,17,69,0.22)` : "none",
          }}>
            {loading ? (phase==="bundle" ? "Rippling your content..." : "Writing blog post...") : "Generate with Ripple →"}
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ marginTop:"2rem", textAlign:"center", padding:"3rem 2rem",
            background:B.cardBg, borderRadius:B.radius, boxShadow:B.shadow }}>
            <div className="pulse" style={{ width:"50px", height:"50px", borderRadius:"14px",
              background:`linear-gradient(135deg, ${B.teal}, ${B.accent})`,
              margin:"0 auto 1.25rem", display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:"24px" }}>🌊</div>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"16px", fontWeight:600,
              color:B.purple, margin:"0 0 6px" }}>
              {phase==="bundle" ? "Ripple is reading your episode..." : "Writing your SEO blog post..."}
            </p>
            <p style={{ fontSize:"13px", color:B.muted, margin:0 }}>
              {phase==="bundle" ? "Building everything. About 25 seconds." : "Almost done — adding the blog post now."}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginTop:"1rem", padding:"0.85rem 1rem",
            background:`${B.accent}12`, border:`1.5px solid ${B.accent}40`, borderRadius:B.radiusSm }}>
            <p style={{ fontSize:"14px", color:B.accent, margin:0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div style={{ marginTop:"2.5rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>

            {/* Bundle header */}
            <div className="fu d1" style={{
              background:`linear-gradient(135deg, ${B.purple} 0%, #2d1e60 100%)`,
              borderRadius:B.radius, padding:"1.5rem 1.75rem",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <div>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"11px", fontWeight:700,
                  color:B.teal, letterSpacing:"0.08em", margin:"0 0 4px" }}>RIPPLE READY</p>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"18px", fontWeight:700,
                  color:"#fff", margin:"0 0 3px" }}>
                  {podcastName && episodeTitle ? `${podcastName} — ${episodeTitle}`
                    : podcastName || episodeTitle || "Your episode bundle"}
                </p>
                <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", margin:0 }}>
                  Optimized for {platform} · {Object.keys(results).length} outputs generated
                </p>
              </div>
              <span style={{ fontSize:"36px" }}>🌊</span>
            </div>

            {/* Titles */}
            {results.titles?.length > 0 && (
              <Card delay="d2">
                <SectionHdr icon="✍️" label="Title Suggestions" delay="d2" />
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {results.titles.map((t,i) => <PickerRow key={i} text={t} index={i} delay={`d${i+3}`} />)}
                </div>
              </Card>
            )}

            {/* Subject lines */}
            {results.subject_lines?.length > 0 && (
              <Card delay="d3">
                <SectionHdr icon="📬" label="Email Subject Lines" delay="d3" />
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {results.subject_lines.map((s,i) => <PickerRow key={i} text={s} index={i} delay={`d${i+3}`} />)}
                </div>
              </Card>
            )}

            {/* Show notes */}
            {results.show_notes && (
              <OutputCard tag="Show Notes" tagColor={B.teal}
                title="Full episode show notes" content={results.show_notes} delay="d4" />
            )}

            {/* Platform descriptions */}
            <PlatformDescCard data={results.platform_descriptions} delay="d5" />

            {/* Blog post (loading or ready) */}
            <BlogPostCard blogData={blogData} loading={blogLoading} delay="d5" />

            {/* Newsletter */}
            {results.newsletter && (
              <OutputCard tag="Email" tagColor={B.accent}
                title="Newsletter blurb" content={results.newsletter} delay="d6" />
            )}

            {/* Social pack */}
            {results.captions && (
              <Card delay="d6">
                <SectionHdr icon="📱" label={`Social Pack — ${platform}`} delay="d6" />
                <CaptionCard label="The Aha Moment" data={results.captions.aha} delay="d6" />
                <CaptionCard label="The Step-by-Step" data={results.captions.steps} delay="d7" />
                <CaptionCard label="The Contrarian Take" data={results.captions.contrarian} delay="d8" />
              </Card>
            )}

            {/* LinkedIn */}
            {results.linkedin && (
              <OutputCard tag="LinkedIn" tagColor={B.purple}
                title="Long-form post" content={results.linkedin} delay="d7" />
            )}

            {/* CTA */}
            {results.cta && (
              <OutputCard tag="Monetize" tagColor={B.pink}
                title="CTA bridge" content={results.cta} delay="d7" />
            )}

            {/* Content calendar */}
            <CalendarCard items={results.content_calendar} delay="d8" />

            {/* Clips */}
            {results.clips?.length > 0 && (
              <Card delay="d8">
                <SectionHdr icon="✂️" label="Clip Moments" delay="d8" />
                <p style={{ fontSize:"13px", color:B.muted, margin:0, lineHeight:"1.55" }}>
                  The moments most likely to stop a scroll. Find these in your recording and cut them first.
                </p>
                {results.clips.map((c,i) => <ClipCard key={i} clip={c} index={i} delay={`d${i+8}`} />)}
              </Card>
            )}

            {/* Engagement prompts */}
            {results.engagement_prompts?.length > 0 && (
              <EngagementCard prompts={results.engagement_prompts} delay="d9" />
            )}

            {/* Guest outreach */}
            {results.guest_outreach && results.guest_outreach !== "null" && (
              <OutputCard tag="Guest Outreach" tagColor={B.accent}
                title={`Email for ${guestName || "your guest"}`}
                content={results.guest_outreach} delay="d10" />
            )}

            {/* Reset */}
            <div className="fu d11" style={{ textAlign:"center", paddingTop:"0.5rem" }}>
              <button onClick={resetForm} style={{
                fontFamily:"'Satoshi',sans-serif", fontSize:"13px", color:B.faint,
                background:"transparent", border:"none", cursor:"pointer", textDecoration:"underline",
              }}>Start a new episode</button>
            </div>
          </div>
        )}
        {/* Footer */}
        {!results && (
          <div style={{ marginTop:"3rem", textAlign:"center", paddingBottom:"1rem" }}>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"12px", fontWeight:600,
              color:B.faint, letterSpacing:"0.04em" }}>ripplefm.co</p>
          </div>
        )}

      </div>
    </div>
  );
}
