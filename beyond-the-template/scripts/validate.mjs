// Checks every incident file against the schema's rules and the taxonomies. No dependencies.
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('..',import.meta.url)));
const J=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const schema=J('schema/incident.schema.json'),tsc=J('taxonomy/tsc.json'),modes=J('taxonomy/failure-modes.json'),cats=J('taxonomy/categories.json');
const statuses=schema.properties.status.enum,errs=[];
for(const f of fs.readdirSync('incidents').filter(f=>f.endsWith('.json'))){
  const e=m=>errs.push(`${f}: ${m}`);let d;
  try{d=J('incidents/'+f)}catch(x){e('not valid JSON');continue}
  for(const k of schema.required)if(!(k in d))e(`missing ${k}`);
  for(const k in d)if(!(k in schema.properties))e(`unknown field ${k}`);
  if(d.id+'.json'!==f)e('id does not match file name');
  if(!statuses.includes(d.status))e(`bad status ${d.status}`);
  if(!cats.includes(d.category))e(`category not in taxonomy: ${d.category}`);
  if((d.summary||'').length>400)e('summary over 400 characters');
  if(!Array.isArray(d.steps)||d.steps.length<3)e('needs at least 3 steps');
  (d.steps||[]).forEach((s,n)=>{
    for(const k of schema.properties.steps.items.required)if(!s[k]||!s[k].length)e(`step ${n+1}: missing ${k}`);
    for(const c of s.criteria||[])if(!tsc[c])e(`step ${n+1}: unknown criterion ${c}`);
    if(!modes[s.failure_mode])e(`step ${n+1}: unknown failure mode ${s.failure_mode}`);
  });
  for(const s of d.sources||[])if(!/^https:\/\//.test(s.url||''))e(`source url must be https: ${s.url}`);
  if(['published','watching','closed'].includes(d.status)){
    if(!d.mapper||!d.reviewer)e('published entries need mapper and reviewer');
    else if(d.mapper===d.reviewer)e('mapper and reviewer must be different people');
    if(!(d.sources||[]).some(s=>s.primary))e('published entries need at least one primary source');
  }
}
if(errs.length){console.error(errs.join('\n'));process.exit(1)}
console.log('All incident files valid.');
