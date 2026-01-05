import { Pressable, Text, View } from 'react-native';
import { LoanTypeInfo } from '@/lib/types';
import { BarChart3, DollarSign, TrendingUp, Calculator } from 'lucide-react-native';

interface LoanCardProps {
  loan: LoanTypeInfo;
  onPress: () => void;
}

// Mapa de ícones Lucide por tipo
const ICON_COMPONENTS: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  price: BarChart3,
  'fixed-parcel': DollarSign,
  'interest-only': TrendingUp,
  'simple-interest': Calculator,
};

export function LoanCard({ loan, onPress }: LoanCardProps) {
  const IconComponent = ICON_COMPONENTS[loan.id] || BarChart3;

  return (
    <Pressable
      onPress={onPress}
      className="mb-3"
    >
      {({ pressed }) => (
        <View
          className="bg-surface rounded-xl p-5 border border-border shadow-sm"
          style={{
            opacity: pressed ? 0.85 : 1,
          }}
        >
          {/* Header com ícone e título */}
          <View className="flex-row items-start mb-3">
            <View
              className="w-14 h-14 rounded-full items-center justify-center mr-4 flex-shrink-0 p-3"
              style={{ backgroundColor: loan.color }}
            >
              <IconComponent size={28} color="white" />
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
      )}
    </Pressable>
  );
}
