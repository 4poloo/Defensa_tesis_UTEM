import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowUp, ArrowDown, LayoutGrid, Expand, HelpCircle, Minimize, RotateCcw, X } from 'lucide-react';
import { initialState, presentationReducer, sections } from './presentation-state';
import { AsIsToBe, Context, Hero, Objective, Problem } from '../sections/OpeningSections';
import { DiagramFrame } from '../components/DiagramFrame';
import { BusinessFlows, SystemContext, AwsArchitecture, PtSequence, Closing } from '../sections/TechnicalSections';
import { EngineeringControls, Testing, Evidence, Pilot, Results, Conclusions, additionalEvidence } from '../sections/ValidationSections';
import type { EvidenceAsset } from '../sections/ValidationSections';

export function App() {
  const [state, dispatch] = useReducer(presentationReducer, initialState, value => {
    const section = sections.findIndex(s => `#${s.id}` === window.location.hash);
    return { ...value, section: section < 0 ? 0 : section };
  });
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const [dialog, setDialog] = useState<'help' | 'diagram' | 'index' | 'evidence' | null>(null);
  const [diagramName, setDiagramName] = useState('integracion');
  const [evidenceAsset, setEvidenceAsset] = useState<EvidenceAsset | null>(null);
  const openDiagram = (name: string) => { setDiagramName(name); setDialog('diagram'); };
  const openEvidence = (asset: EvidenceAsset) => { setEvidenceAsset(asset); setDialog('evidence'); };
  const onStep = (value: number) => dispatch({ type: 'step', step: value });
  const viewport = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const scrollTarget = useRef<number | null>(null);
  const lastSection = useRef(-1);
  const reduced = useReducedMotion();
  const { section, revision } = state;
  const step = state.steps[section];
  const current = sections[section];
  const isFirst = section === 0 && step === 0;
  const isLast = section === sections.length - 1 && step === current.maxStep;

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { setNotice('No se pudo activar la pantalla completa. Puedes usar F11 en tu navegador.'); }
  }, []);

  useEffect(() => {
    const listener = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', listener);
    return () => document.removeEventListener('fullscreenchange', listener);
  }, []);

  useEffect(() => {
    if (dialog) modal.current?.showModal();
    else modal.current?.close();
  }, [dialog]);

  useEffect(() => {
    if (lastSection.current === section) return;
    const first = lastSection.current === -1;
    lastSection.current = section;
    const element = viewport.current;
    if (element) {
      scrollTarget.current = section;
      element.scrollTo({ top: section * element.clientHeight, behavior: reduced || first ? 'instant' : 'smooth' });
    }
    window.history.replaceState(null, '', `#${sections[section].id}`);
  }, [section, reduced]);

  useEffect(() => {
    const resize = () => {
      const element = viewport.current;
      if (element) { scrollTarget.current = section; element.scrollTo({ top: section * element.clientHeight, behavior: 'instant' }); }
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [section]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (dialog || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === ' ' && target.closest('button, a')) return;
      // Cancel native scrolling even for held keys; one physical press advances once.
      if (event.repeat) {
        if (['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','PageDown','PageUp',' '].includes(event.key)) event.preventDefault();
        return;
      }
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); dispatch({ type: 'next' }); }
      else if (['ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); dispatch({ type: 'previous' }); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); dispatch({ type: 'next-section' }); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); dispatch({ type: 'previous-section' }); }
      else if (event.key.toLowerCase() === 'r') { event.preventDefault(); dispatch({ type: 'restart' }); }
      else if (event.key.toLowerCase() === 'f') { event.preventDefault(); void toggleFullscreen(); }
      else if (event.key === '?') { event.preventDefault(); setDialog('help'); }
      else if (event.key.toLowerCase() === 'i') { event.preventDefault(); setDialog('index'); }
      else if (/^[1-9]$/.test(event.key)) { event.preventDefault(); dispatch({ type: 'goto', section: Number(event.key)-1 }); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dialog, toggleFullscreen]);

  const onScroll = () => {
    const element = viewport.current;
    if (!element) return;
    if (scrollTarget.current !== null) {
      if (Math.abs(element.scrollTop - scrollTarget.current * element.clientHeight) < 3) scrollTarget.current = null;
      return;
    }
    const next = Math.max(0, Math.min(sections.length-1, Math.round(element.scrollTop / element.clientHeight)));
    if (next !== section) dispatch({ type: 'goto', section: next });
  };

  return <MotionConfig reducedMotion="user">
    <header className="topbar"><a href="#portada" className="university-mark" onClick={event => { event.preventDefault(); dispatch({ type: 'goto', section: 0 }); }} aria-label="UTEM · Volver a portada"><span className="utem-logo-crop" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}reference/utem-logo.png`} alt="" /></span><strong>UTEM</strong><span className="brand-divider" /><span className="brand-caption">TRABAJO DE TÍTULO</span></a>
      <div className="header-right"><span>MAXIMILIANO OLAVE <span className="header-year">/ 2026</span></span><button className="icon-button" title="Índice (I)" aria-label="Índice de secciones" onClick={() => setDialog('index')}><LayoutGrid size={18}/></button><button className="icon-button" title="Ayuda de navegación (?)" aria-label="Ayuda de navegación" onClick={() => setDialog('help')}><HelpCircle size={18} /></button><button className="icon-button" title="Pantalla completa (F)" aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize size={19} /> : <Expand size={19} />}</button></div>
    </header>
    <main className="presentation-viewport" ref={viewport} onScroll={onScroll} onWheel={() => { scrollTarget.current = null; }} onTouchStart={() => { scrollTarget.current = null; }}>
      {sections.map((s,index) => <section className={`presentation-section section-${s.id}`} key={s.id} id={s.id} aria-label={s.title} aria-hidden={section !== index} inert={section !== index}>
        {section === index && <div className="section-content" key={`${s.id}-${revision}`}>
          {index === 0 && <Hero onStart={() => dispatch({ type: 'next' })} />}
          {index === 1 && <Context step={step} />}
          {index === 2 && <Problem step={step} />}
          {index === 3 && <Objective step={step} />}
          {index === 4 && <AsIsToBe step={step} onExplore={() => openDiagram('integracion')} />}
          {index === 5 && <BusinessFlows step={step} onStep={onStep} onDiagram={openDiagram} />}
          {index === 6 && <SystemContext step={step} onStep={onStep} onDiagram={openDiagram} />}
          {index === 7 && <AwsArchitecture step={step} onStep={onStep} onDiagram={openDiagram} />}
          {index === 8 && <PtSequence step={step} onStep={onStep} onDiagram={openDiagram} />}
          {index === 9 && <EngineeringControls step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 10 && <Testing step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 11 && <Evidence step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 12 && <Pilot step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 13 && <Results step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 14 && <Conclusions step={step} onStep={onStep} onEvidence={openEvidence} />}
          {index === 15 && <Closing onIndex={() => setDialog('index')} />}
        </div>}
      </section>)}
    </main>
    <nav className="section-rail" aria-label="Secciones">{sections.map((s,index) => <button key={s.id} className={section === index ? 'active' : ''} aria-label={`${index+1}. ${s.title}`} aria-current={section === index ? 'step' : undefined} onClick={() => dispatch({ type: 'goto', section: index })}><span className="rail-label">{s.title}</span><span className="rail-tick" /></button>)}</nav>
    <footer className="presentation-footer"><div className="footer-section"><span className="current-number">{String(section+1).padStart(2,'0')}</span><span className="number-total">/ {String(sections.length).padStart(2,'0')}</span><span className="footer-divider" /><span className="footer-title">{current.title}</span></div>
      <div className="step-progress" aria-label={`Paso ${step+1} de ${current.maxStep+1}`}>{Array.from({length:current.maxStep+1},(_,i) => <span key={i} className={i <= step ? 'done' : ''} />)}<span className="step-hint">{isLast ? 'Fin del recorrido' : 'Avanza a tu ritmo'}</span></div>
      <div className="footer-controls"><button className="icon-button restart" aria-label="Reiniciar sección" title="Reiniciar sección (R)" onClick={() => dispatch({type:'restart'})}><RotateCcw size={17} /></button><span className="keyboard-hint">↑ ↓ PASOS · ← → SECCIONES</span><button className="nav-button" aria-label="Anterior" title="Paso anterior (↑)" disabled={isFirst} onClick={() => dispatch({type:'previous'})}><ArrowUp size={20} /></button><button className="nav-button next" aria-label="Siguiente" title="Paso siguiente (↓)" disabled={isLast} onClick={() => dispatch({type:'next'})}><ArrowDown size={20} /></button></div>
      <div className="overall-progress" style={{transform:`scaleX(${(section+(step+1)/(current.maxStep+1))/sections.length})`}} />
    </footer>
    <p className="sr-only" role="status" aria-live="polite">{current.title}. Paso {step+1} de {current.maxStep+1}.</p>
    {notice && <button className="notice" onClick={() => setNotice('')}>{notice} <X size={16} /></button>}
    <dialog ref={modal} className={dialog === 'diagram' ? 'modal diagram-modal' : dialog === 'evidence' ? 'modal evidence-modal' : dialog === 'index' ? 'modal index-modal' : 'modal help-modal'} onClose={() => setDialog(null)} onClick={event => { if (event.target === event.currentTarget) setDialog(null); }}>
      <div className="modal-header"><span>{dialog === 'diagram' ? 'Explorar diagrama · Archify' : dialog === 'evidence' ? evidenceAsset?.figure : dialog === 'index' ? 'Índice de la defensa' : 'Controla el recorrido'}</span><button className="icon-button" aria-label="Cerrar" onClick={() => setDialog(null)}><X size={22} /></button></div>
      {dialog === 'help' && <><h2>Tu presentación.<br /><span>Tu ritmo.</span></h2><dl className="keyboard-list"><div><dt>↓ / Av Pág / Espacio</dt><dd>Avanzar un paso</dd></div><div><dt>↑ / Re Pág</dt><dd>Retroceder un paso</dd></div><div><dt>← / →</dt><dd>Sección anterior / siguiente</dd></div><div><dt>1 — 9 / I</dt><dd>Acceso rápido / índice completo</dd></div><div><dt>R</dt><dd>Reiniciar sección</dd></div><div><dt>F / Esc</dt><dd>Pantalla completa / salir</dd></div></dl><p>Arriba y abajo recorren las animaciones y cambian de sección al llegar al límite. Izquierda y derecha cambian directamente de sección. También se admiten Av Pág y Re Pág para controles de presentación.</p></>}
      {dialog === 'diagram' && <DiagramFrame src={`${import.meta.env.BASE_URL}diagrams/${diagramName}.html?theme=dark&present=1`} title={`Diagrama Archify: ${diagramName}`} />}
      {dialog === 'index' && <><h2>Vuelve a cualquier tema.</h2><div className="index-grid">{sections.map((s,i)=><button key={s.id} aria-current={i===section?'step':undefined} onClick={()=>{ dispatch({type:'goto',section:i}); setDialog(null); }}><span>{String(i+1).padStart(2,'0')}</span><strong>{s.title}</strong></button>)}</div><p className="eyebrow">EVIDENCIAS COMPLEMENTARIAS · ERRORES E IDEMPOTENCIA</p><div className="evidence-links">{additionalEvidence.map(asset=><button key={asset.file} onClick={()=>openEvidence(asset)}>{asset.figure}<span>{asset.title}</span></button>)}</div></>}
      {dialog === 'evidence' && evidenceAsset && <figure className="evidence-expanded"><img src={`${import.meta.env.BASE_URL}evidence/${evidenceAsset.file}`} alt={evidenceAsset.title}/><figcaption><strong>{evidenceAsset.title}</strong><span>{evidenceAsset.figure} · Captura original del informe final</span></figcaption></figure>}

    </dialog>
  </MotionConfig>;
}
