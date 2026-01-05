/**
 * Tipos e interfaces para o aplicativo FINE - Simulador de Empréstimo
 */

export type LoanType = 'price' | 'fixed-parcel' | 'interest-only' | 'simple-interest';

export interface LoanTypeInfo {
  id: LoanType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LoanSimulationInput {
  type: LoanType;
  principal: number; // Valor do empréstimo em R$
  parcels: number; // Quantidade de parcelas
  rate: number; // Taxa de juros (%)
  fixedParcelValue?: number; // Valor fixo da parcela (apenas para tipo 'fixed-parcel')
}

export interface ParcelDetail {
  number: number; // Número da parcela
  value: number; // Valor da parcela em R$
  interest: number; // Juros da parcela em R$
  principal: number; // Amortização do principal (se aplicável)
  balance: number; // Saldo devedor após a parcela
}

export interface LoanSimulationResult {
  input: LoanSimulationInput;
  totalValue: number; // Valor total a ser pago
  totalInterest: number; // Total de juros
  interestPercentage: number; // Percentual de juros (%)
  parcels: ParcelDetail[];
  createdAt: Date;
}

export interface LoanSimulationHistory {
  id: string;
  result: LoanSimulationResult;
  timestamp: number;
}
