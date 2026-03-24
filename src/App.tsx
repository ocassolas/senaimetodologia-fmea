import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DashboardCards } from './components/DashboardCards';
import { DashboardCharts } from './components/DashboardCharts';
import { FMEATable } from './components/FMEATable';
import { FMEAEntry } from './types';
import { INITIAL_DATA } from './constants';
import { motion } from 'motion/react';

export default function App() {
  const [data, setData] = useState<FMEAEntry[]>(INITIAL_DATA);

  const handleAddRow = useCallback(() => {
    const newEntry: FMEAEntry = {
      id: Math.random().toString(36).substr(2, 9),
      processStep: '',
      failureMode: '',
      failureEffect: '',
      severity: 1,
      potentialCause: '',
      occurrence: 1,
      currentControls: '',
      detection: 1,
      actionPlan: '',
      responsible: '',
      deadline: new Date().toISOString().split('T')[0]
    };
    setData(prev => [newEntry, ...prev]);
  }, []);

  const handleUpdate = useCallback((id: string, field: keyof FMEAEntry, value: string | number) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  const handleDelete = useCallback((id: string) => {
    // Removido window.confirm para garantir funcionamento em iframes
    setData(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header onAddRow={handleAddRow} />
      
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="print:block hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Relatório de Análise FMEA</h1>
            <p className="text-slate-500">Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <DashboardCards data={data} />
          <DashboardCharts data={data} />
          
          <div className="flex items-center justify-between mb-4 print:mt-8">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Planilha de Análise FMEA
              <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full print:hidden">
                {data.length} registros
              </span>
            </h2>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                Baixo (≤100)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                Médio (101-300)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                Alto ({'>'}300)
              </div>
            </div>
          </div>

          <FMEATable 
            data={data} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        </motion.div>
      </main>

      <footer className="max-w-[1800px] mx-auto px-6 py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-12 print:hidden">
        <p>© 2026 Sistema FMEA Industrial - Gestão de Qualidade e Riscos</p>
      </footer>
    </div>
  );
}
