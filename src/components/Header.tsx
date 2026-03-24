import React from 'react';
import { Plus, Printer, Factory } from 'lucide-react';

interface HeaderProps {
  onAddRow: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddRow }) => {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <header id="app-header" className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-50 print:hidden">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg shrink-0">
          <Factory className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Sistema FMEA Industrial</h1>
          <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wider">Guia Educacional de Riscos</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <button 
          type="button"
          onClick={handlePrint}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <Printer size={16} />
          <span className="hidden xs:inline">Imprimir PDF</span>
          <span className="xs:hidden">PDF</span>
        </button>
        <button 
          onClick={onAddRow}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Novo Registro
        </button>
      </div>
    </header>
  );
};
