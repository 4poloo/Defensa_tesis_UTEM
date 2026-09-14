import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftRight, Database, FileSpreadsheet, Layers3, UserRound, Warehouse } from 'lucide-react';

export function Transformation({ step }: { step: number }) {
  const reduced = useReducedMotion();
  const moved = step >= 3;
  const connected = step >= 5;
  const transition = { duration: reduced ? 0 : .7, ease: [.77, 0, .175, 1] as const };
  const positions = moved ? [8, 41, 74] : [1, 27, 53, 79];
  return <div className={`transformation-scene ${connected ? 'is-connected' : ''}`} data-testid="transformation-scene">
    <div className="scene-grid" aria-hidden="true" />
    <div className="scene-status"><span className={connected ? 'status-dot mint' : 'status-dot amber'} />{connected ? 'TO-BE · INTERCAMBIO AUTOMATIZADO' : 'AS-IS · INTERCAMBIO MANUAL'}</div>
    <svg className="connection-paths" viewBox="0 0 1000 310" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id="arrow-manual" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
      <AnimatePresence>{!moved && <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {[0, 1, 2].map(i => <path key={i} d={`M${210 + i * 260} 156 H${260 + i * 260}`} stroke="currentColor" strokeDasharray="4 5" markerEnd="url(#arrow-manual)" />)}
      </motion.g>}</AnimatePresence>
      {connected && [0, 1].map(i => <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.path d={`M${280 + i * 330} 148 H${410 + i * 330}`} fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow-manual)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={transition} />
        <motion.path d={`M${410 + i * 330} 172 H${280 + i * 330}`} fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow-manual)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...transition, delay: reduced ? 0 : .2 }} />
      </motion.g>)}
    </svg>
    <motion.div className="system-node erp" animate={{ left: `${positions[0]}%`, width: moved ? '20%' : '20%' }} transition={transition}><Database /><span>Softland</span><small>ERP · Administración</small></motion.div>
    <AnimatePresence>
      {!moved && <motion.div className={`system-node manual ${step === 1 ? 'highlight' : ''}`} style={{ left: '27%' }} exit={{ opacity: 0, transform: 'translateY(-18px)' }} transition={transition}><UserRound /><span>Usuario</span><small>Puente entre sistemas</small></motion.div>}
      {step < 3 && <motion.div className="system-node manual" style={{ left: '53%' }} animate={{ opacity: step >= 2 ? .18 : 1 }} exit={{ opacity: 0 }}><FileSpreadsheet /><span>Registro manual</span><small>Excel · Doble digitación</small></motion.div>}
      {step >= 4 && <motion.div className="system-node middleware" style={{ left: '41%' }} initial={{ opacity: 0, transform: 'scale(.94)' }} animate={{ opacity: 1, transform: 'scale(1)' }} transition={transition}><Layers3 /><span>Middleware</span><small>XML <ArrowLeftRight size={13} /> JSON</small></motion.div>}
    </AnimatePresence>
    <motion.div className="system-node wms" animate={{ left: moved ? '74%' : '79%' }} transition={transition}><Warehouse /><span>Invas</span><small>WMS · Operación física</small></motion.div>
    <div className="scene-bottom"><span>ORIGEN ADMINISTRATIVO</span><span>OPERACIÓN FÍSICA</span></div>
  </div>;
}
