// src/types/index.ts
export interface Investment {
    id: string;
    owner: string;
    date: string;
    initialValue: number;
    withdrawals: number[];
  }
  