import { ScrollView, Text, View, Image, Linking } from 'react-native';
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
        {/* Logo Header */}
        <View className="mb-2 items-center">
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 140, height: 90 }}
            resizeMode="contain"
          />
        </View>

        {/* Website Link */}
        <View className="mb-6 items-center">
          <Text
            onPress={() => Linking.openURL('https://finebr.com')}
            className="text-sm font-semibold text-primary"
          >
            Visite finebr.com
          </Text>
        </View>

        {/* Subtitle */}
        <View className="mb-8 items-center">
          <Text className="text-base text-muted text-center leading-relaxed">
            Escolha o tipo de simulação desejado
          </Text>
        </View>

        {/* Loan Type Cards */}
        <View className="gap-3">
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
          <Text className="text-xs text-muted text-center leading-relaxed">
            Simule diferentes tipos de empréstimo e visualize o retorno em R$ e %.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
