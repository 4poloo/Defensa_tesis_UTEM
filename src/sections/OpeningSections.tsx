import { ArrowDown, ArrowRight, ArrowUpRight, ArrowLeftRight, Check, Database, FileJson2, FileSpreadsheet, Fingerprint, Layers3, ScanLine, ShieldCheck, Warehouse } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Transformation } from '../diagrams/Transformation';
import baseline from '../data/baseline_discrepancies.json';

interface SectionProps { step: number }

export function Hero({ onStart }: { onStart: () => void }) {
  return <div className="hero-layout">
    <div className="hero-copy">
      <Reveal><p className="eyebrow"><span className="status-dot mint" />DEFENSA DE TRABAJO DE TÍTULO <i /> 2026</p></Reveal>
      <Reveal delay={.08}><h1>Integración de<br />sistemas<br /><span>WMS <span className="title-arrow">↔</span> ERP.</span></h1><p className="hero-subtitle">Dos sistemas. Una operación conectada.<br /><span>SurChile SpA</span></p></Reveal>
      <Reveal delay={.16} className="author-block"><div className="author-line" /><div><strong>Maximiliano Andrés Olave Bastidas</strong><p>Ingeniería Civil en Computación mención Informática</p><p>Universidad Tecnológica Metropolitana</p></div></Reveal>
      <button className="start-button" onClick={onStart}>Comenzar recorrido <ArrowRight size={19} /></button>
    </div>
    <div className="hero-art" aria-label="Softland ERP e Invas WMS representan una operación compartida">
      <div className="art-coordinate top">INTEROPERABILIDAD / 01</div>
      <svg className="hero-orbits" viewBox="0 0 600 620" fill="none" aria-hidden="true"><path d="M80 150H375Q425 150 425 200V440Q425 475 460 475H530" /><path d="M530 430H235Q185 430 185 380V175Q185 115 130 115H80" /><circle cx="425" cy="290" r="5" /><circle cx="185" cy="315" r="5" /><path className="orbit-accent" d="M425 230V290M185 370V315" /><path className="crosshair" d="M290 28V48M280 38H300M515 560V580M505 570H525" /></svg>
      <div className="hero-system hero-erp"><div className="system-overline"><Database size={20} /><span>01 / ERP</span></div><strong>Softland</strong><span>La visión administrativa</span><div className="system-rule" /></div>
      <div className="hero-system hero-wms"><div className="system-overline"><Warehouse size={20} /><span>02 / WMS</span></div><strong>Invas</strong><span>La operación física</span><div className="system-rule" /></div>
      <div className="shared-label"><span className="status-dot mint" />Una misma operación</div>
      <div className="art-coordinate bottom">ADMINISTRACIÓN <ArrowLeftRight size={14} /> OPERACIÓN</div>
    </div>
  </div>;
}

export function Context({ step }: SectionProps) {
  return <div className="section-inner context-section"><SectionHeading number="01" label="CONTEXTO">Dos sistemas.<br /><span>Una misma realidad.</span></SectionHeading>
    <div className="context-systems"><div className="context-system"><div className="context-icon"><Database /></div><p className="eyebrow">PERSPECTIVA ADMINISTRATIVA</p><h3>Softland <span>ERP</span></h3><p>Lo que la empresa<br />registra y administra.</p><div className="system-tags"><span>Contabilidad y costos</span><span>Órdenes e inventario</span></div></div>
      <div className="context-bridge"><div className="broken-line" /><div className="bridge-symbol">↔</div><Reveal show={step >= 1}><span className="warning-label">Integración limitada</span></Reveal></div>
      <Reveal show={step >= 1} className="context-system"><div className="context-icon"><Warehouse /></div><p className="eyebrow">PERSPECTIVA OPERACIONAL</p><h3>Invas <span>WMS</span></h3><p>Lo que sucede<br />en la operación física.</p><div className="system-tags"><span>Recepción y producción</span><span>Picking y despacho</span></div></Reveal>
    </div><Reveal show={step >= 2} className="insight-strip"><span className="small-index">LA NECESIDAD</span><p>Una operación debía reflejarse <strong>en ambos sistemas.</strong></p><ArrowUpRight /></Reveal>
  </div>;
}

export function Problem({ step }: SectionProps) {
  const reduced = useReducedMotion();
  return <div className="section-inner problem-section"><SectionHeading number="02" label="PROBLEMA">El usuario terminaba<br />actuando como <span className="amber-text">middleware.</span></SectionHeading>
    <div className="problem-columns"><div className="manual-story"><div className="manual-flow"><span>Softland</span><ArrowDown /><div><FileSpreadsheet size={22} /><strong>Usuario + Excel</strong><small>Transportar · Volver a registrar</small></div><ArrowDown /><span>Invas</span></div><Reveal show={step >= 1} className="consequences"><span>Doble digitación</span><span>Reprocesos y desfases</span><span>Menor trazabilidad</span></Reveal></div>
    <Reveal show={step >= 2} className="baseline-chart"><div className="chart-heading"><div><p className="eyebrow">LÍNEA BASE DIAGNÓSTICA</p><h3>Diferencias de inventario</h3></div><span className="chart-unit">%</span></div><div className="chart-rows">{baseline.items.map((item,i) => <div className="chart-row" key={item.sku}><div className="chart-label"><strong>{item.product}</strong><span>{item.sku} · {item.month}</span></div><div className="bar-track"><motion.div className={`bar-fill ${item.difference_pct === 47 ? 'bar-max' : ''}`} initial={{ scaleX: 0 }} animate={{ scaleX: step >= 2 ? item.difference_pct / 50 : 0 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : i*.055, ease: [.23,1,.32,1] }} /></div><strong className="chart-value">+{item.difference_pct}<small>%</small></strong></div>)}</div><p className="methodology">Valores estimativos de diferencias detectadas en operación previa. Línea base diagnóstica; no corresponde a auditoría contable.</p></Reveal></div>
    <p className="source-note">FUENTE · Informe final, capítulo 3, tabla 4. Muestra de seis meses.</p>
  </div>;
}

const capabilities = [
  { icon: FileJson2, title: 'Transformación', detail: 'XML ↔ JSON' },
  { icon: ShieldCheck, title: 'Validación', detail: 'Estructura y reglas de negocio' },
  { icon: Fingerprint, title: 'Idempotencia', detail: 'Control de duplicidad' },
  { icon: ScanLine, title: 'Trazabilidad', detail: 'Evidencia del procesamiento' },
];

export function Objective({ step }: SectionProps) {
  return <div className="section-inner objective-section"><SectionHeading number="03" label="OBJETIVO">Desarrollar. Documentar.<br /><span>Validar la integración.</span></SectionHeading>
    <p className="objective-statement">Un middleware bidireccional entre <strong>Softland ERP</strong> e <strong>Invas WMS</strong>.</p>
    <div className="objective-visual"><div className="objective-core"><Layers3 size={32} /><strong>Middleware</strong><span>Una capa de interoperabilidad</span><div className="core-protocol">XML <ArrowLeftRight size={20} /> JSON</div></div><Reveal show={step >= 1} className="capability-list">{capabilities.map(({icon: Icon, title, detail},i) => <div className="capability" key={title}><span className="capability-index">0{i+1}</span><Icon size={24} /><div><strong>{title}</strong><span>{detail}</span></div><Check size={17} /></div>)}</Reveal></div>
    <Reveal show={step >= 2} className="scope-strip"><span className="small-index">ALCANCE</span><span>Recepción</span><i /><span>Producción y materiales</span><i /><span>Declaración PT</span><i /><span>Despacho</span></Reveal>
  </div>;
}

const captions = ['El intercambio depende de personas y registros manuales.', 'El usuario ocupa el rol de transportar la información.', 'El registro manual deja de ser el puente entre sistemas.', 'Cada sistema conserva su responsabilidad.', 'Una capa de interoperabilidad asume el intercambio.', 'Los eventos fluyen en ambos sentidos.', 'Transformación, validación, idempotencia y trazabilidad.'];

export function AsIsToBe({ step, onExplore }: SectionProps & { onExplore: () => void }) {
  return <div className="section-inner transformation-section"><SectionHeading number="04" label="TRANSFORMACIÓN">La misma operación.<br /><span>Una nueva forma de conectar.</span></SectionHeading>
    <div className="comparison-labels"><span className={step < 5 ? 'selected before' : ''}>AS-IS <small>Registro manual</small></span><ArrowRight size={20} /><span className={step >= 5 ? 'selected after' : ''}>TO-BE <small>Integración bidireccional</small></span></div>
    <Transformation step={step} />
    <div className="scene-caption"><span className="caption-number">0{step+1} / 07</span><p key={step}>{captions[step]}</p>{step === 6 && <button className="text-button" onClick={onExplore}>Explorar diagrama <ArrowUpRight size={18} /></button>}</div>
    <Reveal show={step >= 6} className="transformation-outcome"><span><Check size={17} />Menor intervención manual</span><span><Check size={17} />Intercambio controlado</span><span><Check size={17} />Seguimiento del evento</span></Reveal>
  </div>;
}
