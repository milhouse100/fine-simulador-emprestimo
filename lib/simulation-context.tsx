import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoanSimulationResult, LoanSimulationInput } from './types';

interface SimulationContextType {
  currentSimulation: LoanSimulationResult | null;
  setCurrentSimulation: (simulation: LoanSimulationResult | null) => void;
  simulationHistory: LoanSimulationResult[];
  addToHistory: (simulation: LoanSimulationResult) => void;
  clearHistory: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentSimulation, setCurrentSimulation] = useState<LoanSimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<LoanSimulationResult[]>([]);

  const addToHistory = (simulation: LoanSimulationResult) => {
    setSimulationHistory((prev) => [simulation, ...prev].slice(0, 50)); // Manter últimas 50
    setCurrentSimulation(simulation);
  };

  const clearHistory = () => {
    setSimulationHistory([]);
    setCurrentSimulation(null);
  };

  return (
    <SimulationContext.Provider
      value={{
        currentSimulation,
        setCurrentSimulation,
        simulationHistory,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
}
