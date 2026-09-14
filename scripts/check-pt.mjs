import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.TT_PREVIEW_URL||'http://127.0.0.1:5173';
const browser=await chromium.launch();
const errors=[],checks=[];
await mkdir('artifacts/screenshots/pt',{recursive:true});
try {
 for(const [width,height] of [[1366,768],[1440,900],[1920,1080]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/#transaccion'); await page.evaluate(()=>document.fonts.ready);
  for(let step=0;step<=11;step++) {
   if(step) await page.keyboard.press('ArrowDown');
   await page.waitForTimeout(280);
   assert.equal(await page.locator('[data-message]:visible').count(),10,'Siempre están los diez mensajes');
   assert.equal(await page.locator('[data-message][data-reached="true"]').count(),step===11?5:step);
   const outside=await page.locator('.sequence-section').evaluate(el=>{
    const top=document.querySelector('header').getBoundingClientRect().bottom,bottom=document.querySelector('footer').getBoundingClientRect().top;
    return [...el.querySelectorAll('h2,.sequence-context,.sequence-svg,.active-explanation,.source-note')].map(e=>({class:e.className,r:e.getBoundingClientRect().toJSON()})).filter(({r})=>r.top<top||r.bottom>bottom||r.left<0||r.right>innerWidth);
   });
   assert.deepEqual(outside,[],`Paso ${step} a ${width}`);
   if([0,5,6,10,11].includes(step))await page.screenshot({path:`artifacts/screenshots/pt/${width}-${step}.png`});
  }
  for(let step=10;step>=0;step--) {await page.keyboard.press('ArrowUp');assert.equal(await page.locator('[data-message]:visible').count(),10);}
  await page.getByRole('button',{name:'Secuencia Archify'}).click();
  const frame=page.frameLocator('iframe');
  await frame.locator('svg[data-animation]').first().waitFor();
  const timings=await frame.locator('[data-animate="edge"]').evaluateAll(edges=>edges.map(e=>({duration:parseFloat(getComputedStyle(e).animationDuration),delay:parseFloat(getComputedStyle(e).animationDelay)})));
  assert.equal(timings.length,8);
  timings.forEach((t,i)=>{assert.equal(t.duration,3.2);assert.equal(t.delay,i*4);if(i) assert(t.delay>=timings[i-1].delay+timings[i-1].duration);});
  await page.waitForTimeout(5000);
  const active=await frame.locator('svg[data-animation]').evaluate(svg=>svg.getAnimations({subtree:true}).filter(a=>a.effect.getComputedTiming().progress!==null).map(a=>a.effect.target.getAttribute('data-animate')));
  assert.equal(active.filter(kind=>kind==='edge').length,1,'Solo un mensaje está animándose a los 5 segundos');
  assert(active.filter(kind=>kind==='node').length<=1,'Como máximo un participante pulsa a la vez');
  await page.screenshot({path:`artifacts/screenshots/pt/${width}-archify.png`});
  await page.getByRole('button',{name:'Cerrar',exact:true}).click();
  checks.push({width,height,states:12,timings}); await page.close();
 }
 const page=await browser.newPage({reducedMotion:'reduce'}); await page.goto(base+'/#transaccion');
 await page.getByRole('button',{name:'Secuencia Archify'}).click();
 const frame=page.frameLocator('iframe');await frame.locator('svg[data-animation]').first().waitFor();
 assert(await frame.locator('[data-animate="edge"]').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).animationName==='none')));
 assert.deepEqual(errors,[]);
 await writeFile('artifacts/pt-check.json',JSON.stringify({status:'passed',base,errors,checks},null,2));
 console.log('PASS: PT completa en 36 estados, retroceso, 3 resoluciones; Archify 3.2s por mensaje, separados 4s, sin solapamiento; reduced motion.');
} finally {await browser.close();}
