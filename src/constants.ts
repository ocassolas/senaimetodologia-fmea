import { FMEAEntry } from './types';

export const INITIAL_DATA: FMEAEntry[] = [
  {
    id: '1',
    processStep: 'Operação de Empilhadeira',
    failureMode: 'Pneu furado durante o transporte',
    failureEffect: 'Tombamento da carga, danos ao produto e risco ao operador',
    severity: 9,
    potentialCause: 'Pregos ou detritos no chão do armazém',
    occurrence: 3,
    currentControls: 'Inspeção visual semanal',
    detection: 2,
    actionPlan: 'Implementar varredura magnética diária no piso',
    responsible: 'João (Manutenção)',
    deadline: '2024-04-10'
  },
  {
    id: '2',
    processStep: 'Máquina de Café da Fábrica',
    failureMode: 'Vazamento de água quente',
    failureEffect: 'Chão escorregadio e risco de queimadura leve',
    severity: 5,
    potentialCause: 'Vedação de borracha ressecada',
    occurrence: 6,
    currentControls: 'Nenhum (quebra-repara)',
    detection: 8,
    actionPlan: 'Trocar vedações a cada 6 meses preventivamente',
    responsible: 'Maria (Facilities)',
    deadline: '2024-04-05'
  }
];
