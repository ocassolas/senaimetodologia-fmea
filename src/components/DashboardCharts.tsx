import React from 'react';
import { FMEAEntry } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface DashboardChartsProps {
  data: FMEAEntry[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  if (data.length === 0) return null;

  // Prepare data for Bar Chart (NPR per Process Step)
  const barData = data.map((item, index) => ({
    name: item.processStep || `Etapa ${index + 1}`,
    NPR: item.severity * item.occurrence * item.detection,
  }));

  // Prepare data for Pie Chart (Risk Distribution)
  let low = 0, medium = 0, high = 0;
  data.forEach(item => {
    const npr = item.severity * item.occurrence * item.detection;
    if (npr <= 100) low++;
    else if (npr <= 300) medium++;
    else high++;
  });

  const pieData = [
    { name: 'Risco Baixo', value: low, color: '#10b981' }, // emerald-500
    { name: 'Risco Médio', value: medium, color: '#f59e0b' }, // amber-500
    { name: 'Risco Alto', value: high, color: '#f43f5e' }, // rose-500
  ].filter(item => item.value > 0);

  // Usamos hidden na tela normal e print:grid para mostrar apenas no PDF.
  // Usamos dimensões fixas (width/height) porque o ResponsiveContainer não funciona bem dentro de display:none
  return (
    <div className="hidden print:grid print:grid-cols-2 gap-6 mb-8 print:break-inside-avoid">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-300">
        <h3 className="text-base font-bold text-slate-800 mb-4 text-center">NPR por Etapa do Processo</h3>
        <div className="flex justify-center">
          <BarChart width={450} height={220} data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#64748b' }} 
              tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
            />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
            <Bar dataKey="NPR" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.NPR > 300 ? '#f43f5e' : entry.NPR > 100 ? '#f59e0b' : '#10b981'} 
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-300">
        <h3 className="text-base font-bold text-slate-800 mb-4 text-center">Distribuição de Riscos</h3>
        <div className="flex justify-center">
          <PieChart width={450} height={220}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
              style={{ fontSize: '10px' }}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
