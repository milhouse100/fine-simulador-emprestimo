import { Pressable, Text, View } from 'react-native';
import { LoanTypeInfo } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LoanCardProps {
  loan: LoanTypeInfo;
  onPress: () => void;
}

export function LoanCard({ loan, onPress }: LoanCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      className="mb-4"
    >
      <View className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
        {/* Header com ícone e título */}
        <View className="flex-row items-center mb-3">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: loan.color }}
          >
            <Text className="text-2xl">{loan.icon}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">
              {loan.name}
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <Text className="text-sm text-muted leading-relaxed">
          {loan.description}
        </Text>

        {/* Arrow indicator */}
        <View className="mt-4 items-end">
          <Text className="text-primary text-lg font-semibold">→</Text>
        </View>
      </View>
    </Pressable>
  );
}
