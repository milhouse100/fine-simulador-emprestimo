import { ScrollView, Text, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { InputField } from '@/components/input-field';
import { ActionButton } from '@/components/action-button';
import { LoanType, LoanSimulationInput } from '@/lib/types';
import { calculateLoan } from '@/lib/loan-calculator';
import { useSimulation } from '@/lib/simulation-context';

export default function SimulationScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const { addToHistory } = useSimulation();

  const [principal, setPrincipal] = useState('1000');
  const [parcels, setParcels] = useState('12');
  const [rate, setRate] = useState('10');
  const [fixedParcelValue, setFixedParcelValue] = useState('100');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const loanTypeLabels: Record<string, string> = {
    price: 'PRICE Adaptado',
    'fixed-parcel': 'Valor da Parcela',
    'interest-only': 'Apenas Juros',
    'simple-interest': 'Juros Simples',
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    const principalNum = parseFloat(principal);
    if (!principal || isNaN(principalNum) || principalNum <= 0) {
      newErrors.principal = 'Valor do empréstimo deve ser maior que 0';
    }

    const parcelsNum = parseInt(parcels, 10);
    if (!parcels || isNaN(parcelsNum) || parcelsNum < 1 || parcelsNum > 36) {
      newErrors.parcels = 'Parcelas deve estar entre 1 e 36';
    }

    if (type === 'fixed-parcel') {
      const fixedValue = parseFloat(fixedParcelValue);
      if (!fixedParcelValue || isNaN(fixedValue) || fixedValue <= 0) {
        newErrors.fixedParcelValue = 'Valor da parcela deve ser maior que 0';
      }
      const totalValue = fixedValue * parcelsNum;
      if (totalValue < principalNum) {
        newErrors.fixedParcelValue = 'Total das parcelas deve ser maior que o principal';
      }
    } else {
      const rateNum = parseFloat(rate);
      if (!rate || isNaN(rateNum) || rateNum < 0 || rateNum > 1000) {
        newErrors.rate = 'Taxa deve estar entre 0 e 1000%';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSimulate = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const input: LoanSimulationInput = {
        type: type as LoanType,
        principal: parseFloat(principal),
        parcels: parseInt(parcels, 10),
        rate: parseFloat(rate),
        fixedParcelValue:
          type === 'fixed-parcel' ? parseFloat(fixedParcelValue) : undefined,
      };

      const result = calculateLoan(input);
      addToHistory(result);

      router.push('/simulation/results');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao calcular simulação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrincipal('1000');
    setParcels('12');
    setRate('10');
    setFixedParcelValue('100');
    setErrors({});
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <ActionButton
            label="← Voltar"
            onPress={() => router.back()}
            variant="outline"
            size="small"
          />
          <Text className="text-3xl font-bold text-foreground mt-8 mb-2">
            Resultado
          </Text>
          <Text className="text-sm text-muted">
            Preencha os dados para simular
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mb-8">
          <InputField
            label="Valor do Empréstimo (R$)"
            value={principal}
            onChangeText={setPrincipal}
            keyboardType="decimal-pad"
            placeholder="0.00"
            error={errors.principal}
            helperText="Digite o valor que deseja emprestar"
          />

          <InputField
            label="Quantidade de Parcelas"
            value={parcels}
            onChangeText={setParcels}
            keyboardType="numeric"
            placeholder="1-36"
            error={errors.parcels}
            helperText="Mínimo 1, máximo 36 parcelas"
          />

          {type === 'fixed-parcel' ? (
            <InputField
              label="Valor Fixo da Parcela (R$)"
              value={fixedParcelValue}
              onChangeText={setFixedParcelValue}
              keyboardType="decimal-pad"
              placeholder="0.00"
              error={errors.fixedParcelValue}
              helperText="Defina o valor de cada parcela"
            />
          ) : (
            <InputField
              label="Taxa de Juros (%)"
              value={rate}
              onChangeText={setRate}
              keyboardType="decimal-pad"
              placeholder="0.00"
              suffix="%"
              error={errors.rate}
              helperText="Digite a taxa de juros desejada"
            />
          )}
        </View>

        {/* Action Buttons */}
        <View className="gap-3 mt-auto">
          <ActionButton
            label="Simular"
            onPress={handleSimulate}
            variant="primary"
            size="large"
            fullWidth
            disabled={loading}
          />
          <ActionButton
            label="Limpar"
            onPress={handleClear}
            variant="secondary"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
