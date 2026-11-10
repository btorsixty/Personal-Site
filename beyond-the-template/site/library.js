// Beyond the Template: client-side views. Expects window.BTT = {TSC, MODES, INC, CTRL}
// written by scripts/build.mjs and inlined by src/pages/beyond-the-template/index.astro.
(() => {
const {TSC, MODES, INC, CTRL} = window.BTT;
const $ = s => document.querySelector(s);
const view = $("#btt-view"), tabs = $("#btt-tabs");
let cat = "All";
const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
const pill = m => `<span class="btt-pill m-${m}">${MODES[m][0]}</span>`;
const cmp = c => `<div class="btt-cmp"><div class="btt-tpl"><b>Template control</b>${c[0]}</div><div class="btt-cus"><b>Written for this environment</b>${c[1]}</div></div>`;
const codes = a => a.map(c => `<a class="btt-code" href="#criteria" title="${TSC[c][0]}">${c}</a>`).join("");
const allSteps = () => INC.flatMap(i => i.steps.map((s, n) => ({inc: i, text: s[0], tsc: s[1], mode: s[2], why: s[3], tpl: CTRL[i.id][n][0], cus: CTRL[i.id][n][1]})));
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

function incidents() {
  const cats = ["All", ...new Set(INC.map(i => i.cat))];
  const shown = INC.filter(i => cat === "All" || i.cat === cat);
  view.innerHTML = `<div class="filter-group btt-filters" role="group" aria-label="Filter by event category">${cats.map(c => `<button class="chip-btn${c === cat ? " active" : ""}" aria-pressed="${c === cat}" data-c="${c}">${c} <span class="btt-n">${c === "All" ? INC.length : INC.filter(i => i.cat === c).length}</span></button>`).join("")}</div>
  <div class="btt-cards">${shown.map(i => {
    const off = i.src.filter(x => x[2]);
    return `<article class="btt-card glass">
      <div class="btt-meta"><span class="btt-cat">${i.cat}</span><span>${i.date}</span></div>
      <h2><a class="btt-open" href="#${i.id}">${i.name}</a></h2>
      <p class="btt-sum">${i.sum}</p>
      ${off.length ? `<div class="btt-official"><b>${off.length === 1 ? "Official disclosure" : "Official disclosures"}</b><ul>${off.map(x => `<li>${ext(x[1], x[0])}</li>`).join("")}</ul></div>` : ""}
      <div class="btt-count">${plural(i.controls, "suggested custom control")} <span aria-hidden="true">&rarr;</span></div>
    </article>`;
  }).join("")}</div>`;
  view.querySelectorAll(".chip-btn").forEach(b => b.onclick = () => { cat = b.dataset.c; incidents(); });
}

function detail(i) {
  const groups = [["Official disclosures", i.src.filter(x => x[2])], ["Other reporting", i.src.filter(x => !x[2])]].filter(g => g[1].length);
  view.innerHTML = `<a class="btt-back" href="#incidents">&larr; All incidents</a>
  <header class="btt-dhead">
    <div class="btt-meta"><span class="btt-cat">${i.cat}</span><span>${i.date}</span><span>${i.updated === "Draft" ? "Draft entry" : "Updated " + i.updated}</span></div>
    <h2>${i.name}</h2><p class="btt-sum">${i.sum}</p>
  </header>
  <section class="btt-block"><h3>Attack path, criteria and controls</h3><ol class="btt-path">${i.steps.map((s, n) => `<li>
    <div class="btt-event">${s[0]}</div><div class="btt-tags">${codes(s[1])}${pill(s[2])}</div><div class="btt-why">${s[3]}</div>${cmp(CTRL[i.id][n])}
  </li>`).join("")}</ol></section>
  <section class="btt-block btt-summary"><h3>Summary</h3>
    <div class="btt-sumpart"><h4>The risk</h4><p>${i.risk}</p></div>
    <div class="btt-sumpart btt-sumhelp"><h4>How the custom controls help</h4><p>${i.help}</p></div>
    <div class="btt-sumpart"><h4>Questions a serious SOC II audit asks of this environment</h4><ul>${i.ask.map(x => `<li>${x}</li>`).join("")}</ul></div>
  </section>
  ${groups.map(([h, xs]) => `<section class="btt-block btt-src"><h3>${h}</h3><ul>${xs.map(x => `<li>${ext(x[1], x[0])}</li>`).join("")}</ul></section>`).join("")}`;
}

function criteria() {
  const steps = allSteps(), groups = {};
  Object.keys(TSC).forEach(c => { (groups[TSC[c][1]] = groups[TSC[c][1]] || []).push(c); });
  const max = Math.max(...Object.keys(TSC).map(c => steps.filter(s => s.tsc.includes(c)).length));
  view.innerHTML = `<p class="btt-lead">A custom control library by criterion. Open one to see the weak points mapped to it and the control written for each.</p>` +
    Object.entries(groups).map(([g, cs]) => `<section class="btt-group"><h3>${g}</h3>${cs.map(c => {
      const hits = steps.filter(s => s.tsc.includes(c));
      return `<details class="btt-details"><summary><span class="btt-code">${c}</span><span class="btt-nm">${TSC[c][0]}</span><span class="btt-ct">${hits.length}</span>
      <span class="btt-bar" style="width:${Math.max(8, hits.length / max * 100)}%">${Object.keys(MODES).map(m => { const n = hits.filter(h => h.mode === m).length; return n ? `<i class="m-${m}" style="width:${n / hits.length * 100}%"></i>` : ""; }).join("")}</span></summary>
      <div class="btt-hits">${hits.map(h => `<div class="btt-hit"><div class="btt-tags"><a href="#${h.inc.id}">${h.inc.name}</a>${pill(h.mode)}</div><div>${h.text}</div><div class="btt-cmp"><div class="btt-cus"><b>Custom control</b>${h.cus}</div></div></div>`).join("")}</div></details>`;
    }).join("")}</section>`).join("");
}

function failureModes() {
  const steps = allSteps(), n = steps.length, count = m => steps.filter(s => s.mode === m).length;
  const max = Math.max(...Object.keys(MODES).map(count));
  const inReach = n - count("beyond") - count("open");
  view.innerHTML = `<p class="btt-finding">Of ${n} mapped steps across ${INC.length} incidents, <em>${inReach}</em> were within reach of a SOC II criterion and failed on scope, design or operation.</p>
  <p class="btt-lead">Of the rest, ${count("beyond")} sat beyond what the criteria address and ${count("open")} had too little public detail to judge. Whether a step failed on scope, design or operation, generic control wording can still pass an auditor&rsquo;s testing, which is why the custom controls in this library are written around each organization&rsquo;s actual environment.</p>
  <div class="btt-modes">${Object.keys(MODES).map(m => `<div class="btt-mode m-${m}"><div class="btt-row"><span class="btt-lab">${MODES[m][0]}</span><span class="btt-num">${count(m)}</span></div>
    <div class="btt-track"><i style="width:${count(m) / max * 100}%"></i></div><p>${MODES[m][1]}</p>
    <details class="btt-details"><summary><span class="btt-nm">Show the ${plural(count(m), "step")}</span></summary><div class="btt-hits">${steps.filter(s => s.mode === m).map(h => `<div class="btt-hit"><div class="btt-tags"><a href="#${h.inc.id}">${h.inc.name}</a>${codes(h.tsc)}</div><div>${h.text}</div></div>`).join("")}</div></details></div>`).join("")}</div>`;
}

function route(scroll) {
  if (!INC.length) {
    tabs.hidden = true;
    view.innerHTML = `<p class="btt-note">The first entries are in review. Each one goes up only after the person who mapped it and a second reviewer have both signed it off.</p>`;
    return;
  }
  const h = (location.hash || "#incidents").slice(1);
  const inc = INC.find(i => i.id === h);
  const v = inc ? "incidents" : (["incidents", "criteria", "failure-modes"].includes(h) ? h : "incidents");
  tabs.querySelectorAll("a").forEach(a => a.dataset.v === v ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (inc) detail(inc); else if (v === "criteria") criteria(); else if (v === "failure-modes") failureModes(); else incidents();
  if (scroll && location.hash) window.scrollTo({top: tabs.getBoundingClientRect().top + scrollY - 96, behavior: "instant"});
}
window.addEventListener("hashchange", () => route(true));
route(false);
// A direct link to a view or incident: jump to it once the page (fonts, layout) has settled.
if (location.hash) {
  const jump = () => requestAnimationFrame(() => window.scrollTo({top: tabs.getBoundingClientRect().top + scrollY - 96, behavior: "instant"}));
  document.readyState === "complete" ? jump() : window.addEventListener("load", jump, {once: true});
}
})();
