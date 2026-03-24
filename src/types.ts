export interface FMEAEntry {
  id: string;
  processStep: string;
  failureMode: string;
  failureEffect: string;
  severity: number;
  potentialCause: string;
  occurrence: number;
  currentControls: string;
  detection: number;
  actionPlan: string;
  responsible: string;
  deadline: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';
