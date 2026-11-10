// Builds the library page from incidents/. Only reviewed entries ship unless INCLUDE_DRAFTS=1.
// Writes site/dist/index.html by default. --out <path> (relative to where you run it) writes elsewhere;
// the personal site's build uses --out public/beyond-the-template/index.html.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const oi=process.argv.indexOf('--out');
const out=oi>0&&process.argv[oi+1]?path.resolve(process.argv[oi+1]):null;
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
const J=p=>JSON.parse(fs.readFileSync(p,'utf8'));
// --demo publishes drafts on the live site under a proof-of-concept banner. Remove it from package.json once entries are signed off.
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
const safe=o=>JSON.stringify(o).replace(/</g,'\\u003c');
const data=`const TSC=${safe(TSC)};\nconst MODES=${safe(MODES)};\nconst INC=${safe(INC)};\nconst CTRL=${safe(CTRL)};
const PREVIEW=${JSON.stringify(demo?'demo':drafts?'local':'')};`;
const dest=out||path.resolve('site/dist/index.html');
fs.mkdirSync(path.dirname(dest),{recursive:true});
fs.writeFileSync(dest,fs.readFileSync('site/template.html','utf8').replace('/*__DATA__*/',()=>data));
console.log(`Built ${INC.length} of ${all.length} entries${drafts?' (drafts included)':''} -> ${dest}`);
