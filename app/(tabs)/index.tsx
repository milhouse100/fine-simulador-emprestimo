import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { LoanCard } from '@/components/loan-card';
import { LoanTypeInfo } from '@/lib/types';

const LOAN_TYPES: LoanTypeInfo[] = [
  {
    id: 'price',
    name: 'PRICE Adaptado',
    description:
      'Juros distribuídos igualmente entre as parcelas. Valor da parcela = (Principal + Juros) / Parcelas',
    icon: '📊',
    color: '#00df82',
  },
  {
    id: 'fixed-parcel',
    name: 'Valor da Parcela',
    description:
      'Você define o valor fixo de cada parcela. O lucro é a diferença entre o total e o principal.',
    icon: '💰',
    color: '#00df82',
  },
  {
    id: 'interest-only',
    name: 'Apenas Juros',
    description:
      'Paga apenas os juros nas parcelas. O principal é quitado em uma transação separada.',
    icon: '📈',
    color: '#00df82',
  },
  {
    id: 'simple-interest',
    name: 'Juros Simples',
    description:
      'Juros calculados sobre o valor original. Parcela = (Principal / Parcelas) + Juros',
    icon: '🧮',
    color: '#00df82',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleLoanTypePress = (loanType: LoanTypeInfo) => {
    router.push({
      pathname: '/simulation/[type]',
      params: { type: loanType.id },
    });
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-foreground mb-2">
            FINE
          </Text>
          <Text className="text-base text-muted">
            Simulador de Empréstimo
          </Text>
          <Text className="text-sm text-muted mt-2">
            Escolha o tipo de simulação desejado
          </Text>
        </View>

        {/* Loan Type Cards */}
        <View className="gap-0">
          {LOAN_TYPES.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onPress={() => handleLoanTypePress(loan)}
            />
          ))}
        </View>

        {/* Footer Info */}
        <View className="mt-8 p-4 bg-surface rounded-lg border border-border">
          <Text className="text-xs text-muted text-center">
            Simule diferentes tipos de empréstimo e veja o retorno em R$ e %.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
