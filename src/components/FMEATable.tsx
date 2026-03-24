import React from 'react';
import { FMEAEntry } from '../types';
import { Trash2 } from 'lucide-react';

interface FMEATableProps {
  data: FMEAEntry[];
  onUpdate: (id: string, field: keyof FMEAEntry, value: string | number) => void;
  onDelete: (id: string) => void;
}

export const FMEATable: React.FC<FMEATableProps> = ({ data, onUpdate, onDelete }) => {
  const getRPNColor = (rpn: number) => {
    if (rpn <= 100) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (rpn <= 300) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const renderDropdown = (id: string, field: keyof FMEAEntry, currentValue: number) => (
    <div className="relative group/select">
      <select
        value={currentValue}
        onChange={(e) => onUpdate(id, field, parseInt(e.target.value))}
        className="w-full h-10 bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-0 rounded-lg px-2 text-center font-bold text-slate-900 cursor-pointer hover:border-slate-300 transition-all appearance-none"
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1} className="text-slate-900 font-bold">
            {i + 1}
          </option>
        ))}
      </select>
      {/* Custom arrow to ensure it looks like a select but the number is centered */}
      <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none text-slate-400 group-hover/select:text-slate-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );

  return (
    <div id="fmea-table-container" className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden print:border-none print:shadow-none">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-40">Etapa</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-48">Modo de Falha</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-48">Efeito</th>
              <th className="px-2 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-20 text-center">S</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-48">Causa</th>
              <th className="px-2 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-20 text-center">O</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-48">Controles</th>
              <th className="px-2 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-20 text-center">D</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-28 text-center">NPR</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-64">Plano de Ação</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-40">Responsável</th>
              <th className="px-5 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 w-32">Prazo</th>
              <th className="px-2 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-12 text-center print:hidden"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((item) => {
              const npr = item.severity * item.occurrence * item.detection;
              return (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.processStep}
                      onChange={(e) => onUpdate(item.id, 'processStep', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="Ex: Montagem..."
                    />
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.failureMode}
                      onChange={(e) => onUpdate(item.id, 'failureMode', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="O que falha?"
                    />
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.failureEffect}
                      onChange={(e) => onUpdate(item.id, 'failureEffect', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="Consequência..."
                    />
                  </td>
                  <td className="p-2 border-r border-slate-200 text-center align-middle">
                    <div className="px-1">
                      {renderDropdown(item.id, 'severity', item.severity)}
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.potentialCause}
                      onChange={(e) => onUpdate(item.id, 'potentialCause', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="Por que?"
                    />
                  </td>
                  <td className="p-2 border-r border-slate-200 text-center align-middle">
                    <div className="px-1">
                      {renderDropdown(item.id, 'occurrence', item.occurrence)}
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.currentControls}
                      onChange={(e) => onUpdate(item.id, 'currentControls', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="Como evita hoje?"
                    />
                  </td>
                  <td className="p-2 border-r border-slate-200 text-center align-middle">
                    <div className="px-1">
                      {renderDropdown(item.id, 'detection', item.detection)}
                    </div>
                  </td>
                  <td className="p-3 border-r border-slate-200 text-center align-middle">
                    <div className={`inline-flex items-center justify-center w-16 h-8 rounded-lg font-bold text-sm border ${getRPNColor(npr)} shadow-sm`}>
                      {npr}
                    </div>
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <textarea
                      value={item.actionPlan}
                      onChange={(e) => onUpdate(item.id, 'actionPlan', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm min-h-[100px] whitespace-pre-wrap break-normal"
                      placeholder="Ação de melhoria..."
                    />
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <input
                      type="text"
                      value={item.responsible}
                      onChange={(e) => onUpdate(item.id, 'responsible', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      placeholder="Nome..."
                    />
                  </td>
                  <td className="p-0 border-r border-slate-200 align-top">
                    <input
                      type="date"
                      value={item.deadline}
                      onChange={(e) => onUpdate(item.id, 'deadline', e.target.value)}
                      className="w-full p-3 bg-transparent border-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    />
                  </td>
                  <td className="p-2 text-center align-top print:hidden">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                      title="Excluir linha"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-500 font-medium">Nenhum registro encontrado. Clique em "Novo Registro" para começar.</p>
        </div>
      )}
    </div>
  );
};
