import React from 'react';
import { AlertTriangle, CheckCircle2, ListFilter, Calculator, Info } from 'lucide-react';
import { FMEAEntry } from '../types';

interface DashboardCardsProps {
  data: FMEAEntry[];
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ data }) => {
  const totalFailures = data.length;
  const highRiskCount = data.filter(item => (item.severity * item.occurrence * item.detection) > 300).length;
  const pendingActions = data.filter(item => item.actionPlan && item.actionPlan.length > 0).length;

  return (
    <div className="space-y-6 mb-8 print:mb-4">
      {/* Educational Formula Card */}
      <div className="bg-blue-900 text-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 border border-blue-800">
        <div className="bg-blue-800 p-4 rounded-xl shrink-0">
          <Calculator size={32} className="text-blue-200" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-lg font-bold mb-1 flex items-center justify-center md:justify-start gap-2">
            Como calcular o Risco (NPR)?
            <Info size={16} className="text-blue-300" />
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
            O <span className="font-bold text-white">NPR (Número de Prioridade de Risco)</span> é o resultado da multiplicação: 
            <span className="mx-2 px-2 py-1 bg-blue-700 rounded font-mono text-white">Severidade (S) × Ocorrência (O) × Detecção (D)</span>. 
            O valor varia de 1 a 1000. Quanto maior o número, mais urgente é a ação corretiva.
          </p>
        </div>
      </div>

      <div id="dashboard-summary" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total de Falhas</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalFailures}</h3>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <ListFilter size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Risco Crítico (NPR {'>'} 300)</p>
            <h3 className="text-2xl font-bold text-red-600">{highRiskCount}</h3>
          </div>
          <div className="bg-red-50 p-2 rounded-lg text-red-600">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Planos de Ação</p>
            <h3 className="text-2xl font-bold text-green-600">{pendingActions}</h3>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-green-600">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
