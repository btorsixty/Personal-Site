// Turns incidents/ into the data file the site page reads (src/pages/beyond-the-template/index.astro).
// Only reviewed entries ship unless drafts are requested:
//   --drafts (or INCLUDE_DRAFTS=1)  include drafts, labelled as a local preview
//   --demo                          include drafts on the live site under a proof-of-concept banner.
//                                   Remove --demo from package.json once entries are signed off.
// Writes src/generated/beyond-the-template.json at the repository root; --out <path> writes elsewhere.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const oi=process.argv.indexOf('--out');
const out=oi>0&&process.argv[oi+1]?path.resolve(process.argv[oi+1]):null;
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
const J=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const demo=process.argv.includes('--demo');
const live=['published','watching','closed'],drafts=demo||process.env.INCLUDE_DRAFTS==='1'||process.argv.includes('--drafts');
const tsc=J('taxonomy/tsc.json'),modes=J('taxonomy/failure-modes.json');
const all=fs.readdirSync('incidents').filter(f=>f.endsWith('.json')).map(f=>J('incidents/'+f));
const inc=all.filter(d=>live.includes(d.status)||(drafts&&['drafted','in-review'].includes(d.status)))
  .sort((a,b)=>b.began.localeCompare(a.began)||a.name.localeCompare(b.name)); // reverse chronological, newest first
const TSC={},MODES={},CTRL={};
for(const k in tsc)TSC[k]=[tsc[k].name,tsc[k].group];
for(const k in modes)MODES[k]=[modes[k].label,modes[k].definition];
const INC=inc.map(d=>{CTRL[d.id]=d.steps.map(s=>[s.template_control,s.custom_control]);
  return{id:d.id,name:d.name,date:d.period,cat:d.category,updated:live.includes(d.status)?d.changelog.at(-1).date:'Draft',sum:d.summary,
    steps:d.steps.map(s=>[s.event,s.criteria,s.failure_mode,s.rationale]),held:d.held,ask:d.auditor_questions,stop:d.limits,src:d.sources.map(s=>[s.label,s.url,!!s.primary]),
    controls:d.steps.filter(s=>s.custom_control&&s.custom_control!=='TO WRITE').length}});
const PREVIEW=demo?'demo':drafts?'local':'';
const dest=out||path.resolve('../src/generated/beyond-the-template.json');
fs.mkdirSync(path.dirname(dest),{recursive:true});
fs.writeFileSync(dest,JSON.stringify({PREVIEW,TSC,MODES,INC,CTRL},null,1)+'\n');
console.log(`Built ${INC.length} of ${all.length} entries${demo?' (demo: drafts shown under a proof-of-concept banner)':drafts?' (drafts included)':''} -> ${dest}`);
