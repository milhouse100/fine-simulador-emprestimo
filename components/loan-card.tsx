import { Pressable, Text, View } from 'react-native';
import { LoanTypeInfo } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LoanCardProps {
  loan: LoanTypeInfo;
  onPress: () => void;
}

// Mapa de ícones minimalistas por tipo
const ICON_MAP: Record<string, string> = {
  price: '📊',
  'fixed-parcel': '💵',
  'interest-only': '📈',
  'simple-interest': '∑',
};

export function LoanCard({ loan, onPress }: LoanCardProps) {
  const icon = ICON_MAP[loan.id] || '📊';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.96 : 1 }],
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      className="mb-3"
    >
      <View className="bg-surface rounded-xl p-5 border border-border shadow-sm active:shadow-md">
        {/* Header com ícone e título */}
        <View className="flex-row items-start mb-3">
          <View
            className="w-14 h-14 rounded-full items-center justify-center mr-4 flex-shrink-0"
            style={{ backgroundColor: loan.color }}
          >
            <Text className="text-2xl">{icon}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground leading-tight">
              {loan.name}
            </Text>
          </View>
          <Text className="text-primary text-xl font-semibold ml-2">→</Text>
        </View>

        {/* Descrição com melhor legibilidade */}
        <Text className="text-sm text-muted leading-relaxed">
          {loan.description}
        </Text>
      </View>
    </Pressable>
  );
}
