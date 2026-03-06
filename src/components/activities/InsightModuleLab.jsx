import React, { useEffect, useMemo, useState } from 'react';
import { Bot, Download, Sparkles, PlusCircle } from 'lucide-react';

const dimensionPrompts = [
  { key: 'learners', title: 'Learners', question: "เรื่องอะไรที่ทำให้เด็กๆ 'ตาเป็นประกาย' ที่สุด?" },
  { key: 'learningStyle', title: 'Learning Style', question: "ช่วงเวลา Magic Moment ของห้องเรียนคือตอนไหน?" },
  { key: 'community', title: 'Community', question: "ใครคือฮีโร่ลับนอกโรงเรียนที่ช่วยได้?" },
  { key: 'painPoints', title: 'Pain Points', question: 'ถ้าลบปัญหาได้ 1 อย่าง สิ่งนั้นคืออะไร?' },
  { key: 'opportunities', title: 'Opportunities', question: 'มีของดีอะไรที่ถูกวางทิ้งไว้เฉยๆ?' },
  { key: 'passion', title: 'Passion', question: 'โปรเจกต์ในฝันของคุณคืออะไร?' },
  { key: 'threats', title: 'Threats', question: 'กำแพงที่สูงที่สุดที่ขวางทางอยู่คืออะไร?' },
  { key: 'vision', title: 'Vision', question: 'อีก 6 เดือน อยากเห็นภาพอะไรในห้องเรียน?' },
  { key: 'smallWins', title: 'Small Wins', question: 'เรื่องเล็กๆ อะไรที่เติมพลังใจให้คุณ?' }
];

const initialSwot = { s: [], w: [], o: [], t: [] };

export default function InsightModuleLab({ onReadyChange }) {
  const [dimensions, setDimensions] = useState(() => Object.fromEntries(dimensionPrompts.map((d) => [d.key, { text: '', rating: 3 }])));
  const [swot, setSwot] = useState(initialSwot);
  const [manualWord, setManualWord] = useState('');
  const [newStrategy, setNewStrategy] = useState({ internalType: 'S', externalType: 'O', internal: '', external: '', detail: '' });
  const [strategies, setStrategies] = useState([]);
  const [strategyScores, setStrategyScores] = useState({});
  const [coreProblem, setCoreProblem] = useState('');
  const [realNeed, setRealNeed] = useState('');
  const [solution, setSolution] = useState('');
  const [pdca, setPdca] = useState({ plan: '', do: '', check: '', act: '' });
  const [microReward, setMicroReward] = useState('');

  const generatedWords = useMemo(() => {
    const bag = Object.values(dimensions)
      .flatMap((entry) => entry.text.split(/[\s,]+/))
      .map((w) => w.trim())
      .filter((w) => w.length > 2);
    return [...new Set(bag)].slice(0, 30);
  }, [dimensions]);

  const completion = {
    mission1: dimensionPrompts.every((d) => dimensions[d.key].text.trim().length > 0),
    mission2: Object.values(swot).every((list) => list.length > 0),
    mission3: strategies.length >= 3,
    mission4: Object.keys(strategyScores).length >= 3 && coreProblem && realNeed && solution,
    mission5: Object.values(pdca).every((v) => v.trim().length > 0)
  };

  const progressPercent = (Object.values(completion).filter(Boolean).length / 5) * 100;

  useEffect(() => {
    const ready = Object.values(completion).every(Boolean);
    onReadyChange?.(ready);
    localStorage.setItem('inspire-module1-lab', JSON.stringify({ dimensions, swot, strategies, strategyScores, coreProblem, realNeed, solution, pdca }));
  }, [completion, dimensions, swot, strategies, strategyScores, coreProblem, realNeed, solution, pdca, onReadyChange]);

  const mentorText = useMemo(() => {
    if (!completion.mission1) return 'AI Mentor: เริ่มจาก Mission 1 ก่อนนะครับ ลองเขียนข้อมูลให้ครบทั้ง 9 มิติ เพื่อเห็นภาพจริงของพื้นที่ครับ ✨';
    if (!completion.mission2) return 'AI Mentor: เยี่ยมมากครับ! ต่อไปลองคัดคำสำคัญเข้า SWOT และเติมคำที่ยังไม่ครบให้สมดุลมุมมองครับ';
    if (!completion.mission3) return 'AI Mentor: ลองจับคู่ S/W กับ O/T แล้วสร้างกลยุทธ์อย่างน้อย 3 ข้อ เพื่อให้ลงมือทำได้จริงครับ';
    if (!completion.mission4) return 'AI Mentor: ตอนนี้ลองให้คะแนนกลยุทธ์ เลือก 1 กลยุทธ์หลัก แล้วสรุป Core Problem/Real Need ครับ';
    if (!completion.mission5) return 'AI Mentor: ปิดท้ายด้วย PDCA ให้ครบ 4 ช่อง แล้วคุณจะพร้อมรับ In-Sight Badge!';
    return 'AI Mentor: สุดยอดมากครับ! Mission ครบแล้ว สามารถส่งภารกิจและ Export In-Sight Card ได้เลย 🎉';
  }, [completion]);

  const addWordToSwot = (word, bucket) => {
    const key = bucket.toLowerCase();
    if (!key || !swot[key] || swot[key].includes(word)) return;
    setSwot((prev) => ({ ...prev, [key]: [...prev[key], word] }));
  };

  const addStrategy = () => {
    if (!newStrategy.internal || !newStrategy.external || !newStrategy.detail) return;
    const type = `${newStrategy.internalType}${newStrategy.externalType}`;
    const item = { id: crypto.randomUUID(), ...newStrategy, type };
    setStrategies((prev) => [...prev, item]);
    setNewStrategy({ ...newStrategy, detail: '' });
    setMicroReward('🎯 สร้างกลยุทธ์สำเร็จ!');
    setTimeout(() => setMicroReward(''), 1400);
  };

  const selectedStrategyId = Object.entries(strategyScores).sort((a, b) => b[1] - a[1])[0]?.[0];

  const downloadInsightCard = () => {
    const year = new Date().getFullYear();
    const unique = Math.floor(1000 + Math.random() * 9000);
    const cardId = `INS-${year}-${unique}`;
    const picked = strategies.find((s) => s.id === selectedStrategyId);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='680'>
      <rect width='100%' height='100%' fill='#eef2ff'/>
      <text x='60' y='80' font-size='42' font-family='Arial' fill='#312e81'>In-Sight Card</text>
      <text x='60' y='120' font-size='20' font-family='Arial' fill='#4338ca'>Badge: In-Sight Badge</text>
      <text x='60' y='165' font-size='18' font-family='Arial'>ID: ${cardId}</text>
      <text x='60' y='220' font-size='20' font-family='Arial'>Core Problem: ${coreProblem}</text>
      <text x='60' y='270' font-size='20' font-family='Arial'>Real Need: ${realNeed}</text>
      <text x='60' y='320' font-size='20' font-family='Arial'>Selected Strategy: ${picked ? picked.type + ' - ' + picked.detail : '-'}</text>
      <text x='60' y='370' font-size='20' font-family='Arial'>PDCA: P(${pdca.plan}) D(${pdca.do}) C(${pdca.check}) A(${pdca.act})</text>
      <text x='60' y='610' font-size='22' font-family='Arial' fill='#d97706'>🏅 Certified In-Sight Badge</text>
    </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardId}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='space-y-6'>
      <div className='bg-indigo-50 border border-indigo-100 rounded-2xl p-4'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-indigo-900 font-bold'>Mission Progress (1-5): {Math.round(progressPercent)}%</p>
          <button onClick={downloadInsightCard} className='px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold inline-flex items-center gap-2'><Download size={16} /> Export In-Sight Card</button>
        </div>
        <div className='w-full h-3 bg-white rounded-full mt-3 overflow-hidden'><div className='h-full bg-gradient-to-r from-indigo-500 to-purple-500' style={{ width: `${progressPercent}%` }} /></div>
      </div>

      <div className='bg-white border rounded-2xl p-5'>
        <p className='font-semibold mb-3 flex items-center gap-2 text-purple-700'><Bot size={18} /> {mentorText}</p>
        {microReward && <p className='text-amber-600 font-bold animate-pulse'>{microReward}</p>}
      </div>

      <section className='bg-white border rounded-2xl p-5'>
        <h3 className='font-bold text-xl mb-4'>🕵️ Mission 1: The 9 Dimensions</h3>
        <div className='grid md:grid-cols-2 gap-4'>
          {dimensionPrompts.map((d) => (
            <div key={d.key} className='bg-indigo-50 rounded-xl p-3'>
              <p className='font-semibold text-indigo-900'>{d.title}</p>
              <p className='text-sm text-gray-600 mb-2'>{d.question}</p>
              <textarea value={dimensions[d.key].text} onChange={(e) => setDimensions((prev) => ({ ...prev, [d.key]: { ...prev[d.key], text: e.target.value } }))} className='w-full border rounded-lg p-2 text-sm h-24' />
              <input type='range' min='1' max='5' value={dimensions[d.key].rating} onChange={(e) => setDimensions((prev) => ({ ...prev, [d.key]: { ...prev[d.key], rating: Number(e.target.value) } }))} className='w-full mt-2' />
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white border rounded-2xl p-5'>
        <h3 className='font-bold text-xl mb-4'>🧩 Mission 2: Interactive SWOT Visualizer</h3>
        <div className='flex flex-wrap gap-2 mb-4'>
          {generatedWords.map((word) => (
            <div key={word} className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm'>{word}</div>
          ))}
        </div>
        <div className='grid md:grid-cols-4 gap-3'>
          {['S', 'W', 'O', 'T'].map((bucket) => (
            <div key={bucket} className='border rounded-xl p-3'>
              <p className='font-semibold mb-2'>{bucket}</p>
              <select className='w-full border rounded p-2 text-sm' onChange={(e) => addWordToSwot(e.target.value, bucket)} defaultValue=''>
                <option value='' disabled>เลือกคำจาก Cloud</option>
                {generatedWords.map((word) => <option key={`${bucket}-${word}`} value={word}>{word}</option>)}
              </select>
              <div className='mt-2 space-y-1'>{swot[bucket.toLowerCase()].map((w) => <div key={w} className='text-xs bg-gray-100 rounded px-2 py-1'>{w}</div>)}</div>
            </div>
          ))}
        </div>
        <div className='mt-4 flex gap-2'>
          <input value={manualWord} onChange={(e) => setManualWord(e.target.value)} placeholder='พิมพ์คำเพิ่ม...' className='border rounded p-2 flex-1' />
          <button onClick={() => { if (manualWord.trim()) { addWordToSwot(manualWord.trim(), 'S'); setManualWord(''); } }} className='px-3 py-2 bg-indigo-600 text-white rounded'>เพิ่มเข้า S</button>
        </div>
        <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-2'>
          {['s','w','o','t'].map((k) => (
            <div key={`viz-${k}`} className='bg-slate-50 rounded-lg p-2 text-center'>
              <p className='text-xs uppercase font-bold text-slate-500'>{k}</p>
              <p className='text-2xl font-black text-indigo-700'>{swot[k].length}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white border rounded-2xl p-5'>
        <h3 className='font-bold text-xl mb-4'>⚡ Mission 3: Strategy Fusion (TOWS Matrix)</h3>
        <div className='grid md:grid-cols-5 gap-2'>
          <select value={newStrategy.internalType} onChange={(e) => setNewStrategy((p) => ({ ...p, internalType: e.target.value }))} className='border rounded p-2'><option>S</option><option>W</option></select>
          <input value={newStrategy.internal} onChange={(e) => setNewStrategy((p) => ({ ...p, internal: e.target.value }))} className='border rounded p-2' placeholder='ปัจจัยภายใน' />
          <select value={newStrategy.externalType} onChange={(e) => setNewStrategy((p) => ({ ...p, externalType: e.target.value }))} className='border rounded p-2'><option>O</option><option>T</option></select>
          <input value={newStrategy.external} onChange={(e) => setNewStrategy((p) => ({ ...p, external: e.target.value }))} className='border rounded p-2' placeholder='ปัจจัยภายนอก' />
          <button onClick={addStrategy} className='bg-purple-600 text-white rounded p-2 inline-flex items-center justify-center gap-2'><PlusCircle size={16} /> เพิ่ม</button>
        </div>
        <textarea value={newStrategy.detail} onChange={(e) => setNewStrategy((p) => ({ ...p, detail: e.target.value }))} className='mt-2 w-full border rounded p-2' placeholder='กลยุทธ์ที่เกิดจากการจับคู่...' />
        <div className='mt-3 space-y-2'>{strategies.map((s, i) => <div key={s.id} className='bg-gray-50 p-2 rounded text-sm'>{i + 1}. [{s.type}] {s.detail}</div>)}</div>
      </section>

      <section className='bg-white border rounded-2xl p-5'>
        <h3 className='font-bold text-xl mb-4'>🏆 Mission 4: Needs Detective</h3>
        <div className='space-y-2'>
          {strategies.map((s) => (
            <div key={`score-${s.id}`} className='flex items-center gap-3'>
              <span className='text-sm flex-1'>{s.type}: {s.detail}</span>
              <input type='range' min='1' max='5' value={strategyScores[s.id] || 3} onChange={(e) => setStrategyScores((prev) => ({ ...prev, [s.id]: Number(e.target.value) }))} />
              <span className='text-xs font-bold'>{strategyScores[s.id] || 3}</span>
            </div>
          ))}
        </div>
        <div className='grid md:grid-cols-3 gap-2 mt-3'>
          <input value={coreProblem} onChange={(e) => setCoreProblem(e.target.value)} className='border rounded p-2' placeholder='Core Problem' />
          <input value={realNeed} onChange={(e) => setRealNeed(e.target.value)} className='border rounded p-2' placeholder='Real Need' />
          <input value={solution} onChange={(e) => setSolution(e.target.value)} className='border rounded p-2' placeholder='Solution ที่เลือก' />
        </div>
      </section>

      <section className='bg-white border rounded-2xl p-5'>
        <h3 className='font-bold text-xl mb-4'>🛠 Mission 5: Action Plan (PDCA)</h3>
        <div className='grid md:grid-cols-2 gap-2'>
          {['plan', 'do', 'check', 'act'].map((key) => (
            <textarea key={key} value={pdca[key]} onChange={(e) => setPdca((prev) => ({ ...prev, [key]: e.target.value }))} className='border rounded p-2 h-24' placeholder={key.toUpperCase()} />
          ))}
        </div>
        <p className='mt-3 text-amber-700 font-semibold inline-flex items-center gap-2'><Sparkles size={16} /> ทำครบทั้ง 5 Mission แล้ว ระบบพร้อมปลดล็อกการส่งงาน</p>
      </section>
    </div>
  );
}
