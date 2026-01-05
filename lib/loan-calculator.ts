/**
 * Funções de cálculo para os 4 tipos de empréstimo do FINE
 */

import { LoanSimulationInput, LoanSimulationResult, ParcelDetail } from './types';

/**
 * Tipo 1: PRICE Adaptado
 * Lógica: O sistema calcula o valor de cada parcela distribuindo igualmente
 * o valor emprestado acrescido do percentual total de juros definido.
 * Exemplo: R$1000 + 50% em 2 parcelas = 2 parcelas de R$900 (Total R$1800)
 */
function calculatePriceAdapted(
  principal: number,
  parcels: number,
  rate: number
): LoanSimulationResult {
  const totalWithInterest = principal * (1 + rate / 100);
  const parcelValue = totalWithInterest / parcels;
  const totalInterest = totalWithInterest - principal;

  const parcelDetails: ParcelDetail[] = [];
  let balance = principal;

  for (let i = 1; i <= parcels; i++) {
    const interest = (principal * (rate / 100)) / parcels;
    const principalAmortization = principal / parcels;
    balance -= principalAmortization;

    parcelDetails.push({
      number: i,
      value: parcelValue,
      interest: interest,
      principal: principalAmortization,
      balance: Math.max(0, balance),
    });
  }

  return {
    input: {
      type: 'price',
      principal,
      parcels,
      rate,
    },
    totalValue: totalWithInterest,
    totalInterest: totalInterest,
    interestPercentage: rate,
    parcels: parcelDetails,
    createdAt: new Date(),
  };
}

/**
 * Tipo 2: Valor da Parcela
 * Lógica: O usuário define manualmente um valor fixo para a parcela.
 * O sistema calcula o total devido multiplicando esse valor pela quantidade de parcelas,
 * sendo o lucro a diferença entre o total e o valor emprestado.
 * Exemplo: R$1000 para pagar em 3 parcelas de R$500. Total = R$1500, Lucro = R$500
 */
function calculateFixedParcel(
  principal: number,
  parcels: number,
  fixedParcelValue: number
): LoanSimulationResult {
  const totalValue = fixedParcelValue * parcels;
  const totalInterest = totalValue - principal;
  const interestPercentage = (totalInterest / principal) * 100;

  const parcelDetails: ParcelDetail[] = [];
  let balance = principal;

  for (let i = 1; i <= parcels; i++) {
    const interest = totalInterest / parcels;
    const principalAmortization = principal / parcels;
    balance -= principalAmortization;

    parcelDetails.push({
      number: i,
      value: fixedParcelValue,
      interest: interest,
      principal: principalAmortization,
      balance: Math.max(0, balance),
    });
  }

  return {
    input: {
      type: 'fixed-parcel',
      principal,
      parcels,
      rate: interestPercentage,
      fixedParcelValue,
    },
    totalValue: totalValue,
    totalInterest: totalInterest,
    interestPercentage: interestPercentage,
    parcels: parcelDetails,
    createdAt: new Date(),
  };
}

/**
 * Tipo 3: Apenas Juros (Renovação de Dívida)
 * Lógica: O valor dos juros se repete periodicamente (renovação).
 * O pagamento dessas parcelas não abate o valor principal.
 * A quitação do valor emprestado ocorre apenas através de uma transação
 * separada de "Amortização".
 * Exemplo: R$1000 com 10% ao mês por 3 meses = 3 parcelas de R$100 (juros) + R$1000 (amortização final)
 */
function calculateInterestOnly(
  principal: number,
  parcels: number,
  rate: number
): LoanSimulationResult {
  const monthlyInterest = (principal * rate) / 100;
  const totalInterest = monthlyInterest * parcels;
  const totalValue = principal + totalInterest;

  const parcelDetails: ParcelDetail[] = [];

  // Parcelas de juros
  for (let i = 1; i <= parcels; i++) {
    parcelDetails.push({
      number: i,
      value: monthlyInterest,
      interest: monthlyInterest,
      principal: 0, // Não amortiza o principal
      balance: principal, // Saldo permanece o mesmo
    });
  }

  // Última parcela com amortização do principal
  parcelDetails.push({
    number: parcels + 1,
    value: principal,
    interest: 0,
    principal: principal,
    balance: 0,
  });

  return {
    input: {
      type: 'interest-only',
      principal,
      parcels: parcels + 1, // Inclui a parcela de amortização
      rate,
    },
    totalValue: totalValue,
    totalInterest: totalInterest,
    interestPercentage: (totalInterest / principal) * 100,
    parcels: parcelDetails,
    createdAt: new Date(),
  };
}

/**
 * Tipo 4: Juros Simples
 * Lógica: O valor dos juros é calculado sobre o valor emprestado original
 * para cada período. A parcela é composta pela divisão do principal mais
 * o valor do juro do período.
 * Fórmula: Valor da Parcela = (Principal / Parcelas) + (Principal x Taxa)
 * Exemplo: R$1000 com 5% ao mês em 3 parcelas
 * Juros por período = 1000 * 0.05 = R$50
 * Parcela = (1000/3) + 50 = R$383,33
 */
function calculateSimpleInterest(
  principal: number,
  parcels: number,
  rate: number
): LoanSimulationResult {
  const principalPerParcel = principal / parcels;
  const interestPerParcel = (principal * rate) / 100;
  const parcelValue = principalPerParcel + interestPerParcel;
  const totalInterest = interestPerParcel * parcels;
  const totalValue = principal + totalInterest;

  const parcelDetails: ParcelDetail[] = [];
  let balance = principal;

  for (let i = 1; i <= parcels; i++) {
    balance -= principalPerParcel;

    parcelDetails.push({
      number: i,
      value: parcelValue,
      interest: interestPerParcel,
      principal: principalPerParcel,
      balance: Math.max(0, balance),
    });
  }

  return {
    input: {
      type: 'simple-interest',
      principal,
      parcels,
      rate,
    },
    totalValue: totalValue,
    totalInterest: totalInterest,
    interestPercentage: (totalInterest / principal) * 100,
    parcels: parcelDetails,
    createdAt: new Date(),
  };
}

/**
 * Função principal que calcula o empréstimo baseado no tipo
 */
export function calculateLoan(input: LoanSimulationInput): LoanSimulationResult {
  switch (input.type) {
    case 'price':
      return calculatePriceAdapted(input.principal, input.parcels, input.rate);

    case 'fixed-parcel':
      if (!input.fixedParcelValue) {
        throw new Error('Valor da parcela é obrigatório para este tipo');
      }
      return calculateFixedParcel(input.principal, input.parcels, input.fixedParcelValue);

    case 'interest-only':
      return calculateInterestOnly(input.principal, input.parcels, input.rate);

    case 'simple-interest':
      return calculateSimpleInterest(input.principal, input.parcels, input.rate);

    default:
      throw new Error('Tipo de empréstimo inválido');
  }
}

/**
 * Formata valor monetário para R$
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata percentual
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}
