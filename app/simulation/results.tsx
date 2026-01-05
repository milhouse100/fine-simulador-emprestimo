import { ScrollView, Text, View, Alert, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useSimulation } from '@/lib/simulation-context';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/action-button';
import { ParcelTable } from '@/components/parcel-table';
import { formatCurrency, formatPercentage } from '@/lib/loan-calculator';

const LOAN_TYPE_NAMES: Record<string, string> = {
  price: 'PRICE Adaptado',
  'fixed-parcel': 'Valor da Parcela',
  'interest-only': 'Apenas Juros',
  'simple-interest': 'Juros Simples',
};

export default function ResultsScreen() {
  const router = useRouter();
  const { currentSimulation } = useSimulation();

  if (!currentSimulation) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-foreground">Nenhuma simulação disponível</Text>
        <ActionButton
          label="Voltar"
          onPress={() => router.push('/')}
          variant="primary"
          size="medium"
        />
      </ScreenContainer>
    );
  }

  const { input, totalValue, totalInterest, interestPercentage, parcels } =
    currentSimulation;

  const handleShare = async () => {
    try {
      const message = `FINE - Simulador de Empréstimo\n\nTipo: ${LOAN_TYPE_NAMES[input.type]}\nPrincipal: ${formatCurrency(input.principal)}\nParcelas: ${input.parcels}\nTotal a Pagar: ${formatCurrency(totalValue)}\nJuros: ${formatCurrency(totalInterest)} (${formatPercentage(interestPercentage)})`;

      await Share.share({
        message,
        title: 'Simulação de Empréstimo FINE',
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao compartilhar simulação');
    }
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
          <Text className="text-3xl font-bold text-foreground mt-5 mb-2">
            Resultado
          </Text>
          <Text className="text-sm text-muted">
            {LOAN_TYPE_NAMES[input.type]}
          </Text>
        </View>

        {/* Summary Cards */}
        <View className="gap-4 mb-8">
          {/* Principal Card */}
          <View className="bg-surface rounded-lg p-5 border border-border">
            <Text className="text-xs font-semibold text-muted mb-2">
              Valor do Empréstimo
            </Text>
            <Text className="text-2xl font-bold text-foreground">
              {formatCurrency(input.principal)}
            </Text>
          </View>

          {/* Total Value Card - Highlighted */}
          <View className="bg-primary/10 rounded-lg p-5 border-2 border-primary">
            <Text className="text-xs font-semibold text-muted mb-2">
              Total a Pagar
            </Text>
            <Text className="text-3xl font-bold text-primary">
              {formatCurrency(totalValue)}
            </Text>
          </View>

          {/* Interest Card */}
          <View className="bg-surface rounded-lg p-5 border border-border">
            <Text className="text-xs font-semibold text-muted mb-2">
              Total de Juros
            </Text>
            <View className="flex-row items-baseline gap-3">
              <Text className="text-2xl font-bold text-foreground">
                {formatCurrency(totalInterest)}
              </Text>
              <Text className="text-lg font-bold text-primary">
                {formatPercentage(interestPercentage)}
              </Text>
            </View>
          </View>

          {/* Parcel Info */}
          <View className="bg-surface rounded-lg p-5 border border-border">
            <Text className="text-xs font-semibold text-muted mb-3">
              Informações das Parcelas
            </Text>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-xs text-muted mb-1">Quantidade</Text>
                <Text className="text-xl font-bold text-foreground">
                  {parcels.length}x
                </Text>
              </View>
              <View>
                <Text className="text-xs text-muted mb-1">Valor Médio</Text>
                <Text className="text-xl font-bold text-foreground">
                  {formatCurrency(totalValue / parcels.length)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Parcel Table */}
        <ParcelTable parcels={parcels} loanType={input.type} />

        {/* Action Buttons */}
        <View className="gap-3 mt-8 mb-4">
          <ActionButton
            label="Compartilhar"
            onPress={handleShare}
            variant="primary"
            size="large"
            fullWidth
          />
          <ActionButton
            label="Editar Simulação"
            onPress={() => router.back()}
            variant="outline"
            size="large"
            fullWidth
          />
          <ActionButton
            label="Nova Simulação"
            onPress={() => router.push('/')}
            variant="secondary"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
