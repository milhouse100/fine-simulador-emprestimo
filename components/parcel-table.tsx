import { ScrollView, Text, View } from 'react-native';
import { ParcelDetail } from '@/lib/types';
import { formatCurrency } from '@/lib/loan-calculator';

interface ParcelTableProps {
  parcels: ParcelDetail[];
}

export function ParcelTable({ parcels }: ParcelTableProps) {
  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold text-foreground mb-4">
        Detalhamento das Parcelas
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border border-border rounded-lg overflow-hidden"
      >
        <View>
          {/* Header */}
          <View className="flex-row bg-primary/10 border-b border-border">
            <View className="w-16 px-3 py-3 items-center justify-center">
              <Text className="text-xs font-bold text-foreground">Parc.</Text>
            </View>
            <View className="w-24 px-3 py-3 items-center justify-center">
              <Text className="text-xs font-bold text-foreground">Valor</Text>
            </View>
            <View className="w-24 px-3 py-3 items-center justify-center">
              <Text className="text-xs font-bold text-foreground">Juros</Text>
            </View>
            <View className="w-24 px-3 py-3 items-center justify-center">
              <Text className="text-xs font-bold text-foreground">Principal</Text>
            </View>
            <View className="w-24 px-3 py-3 items-center justify-center">
              <Text className="text-xs font-bold text-foreground">Saldo</Text>
            </View>
          </View>

          {/* Rows */}
          {parcels.map((parcel, index) => (
            <View
              key={parcel.number}
              className={`flex-row border-b border-border ${
                index % 2 === 0 ? 'bg-background' : 'bg-surface'
              }`}
            >
              <View className="w-16 px-3 py-3 items-center justify-center">
                <Text className="text-xs font-medium text-foreground">
                  {parcel.number}
                </Text>
              </View>
              <View className="w-24 px-3 py-3 items-center justify-center">
                <Text className="text-xs font-medium text-foreground">
                  {formatCurrency(parcel.value)}
                </Text>
              </View>
              <View className="w-24 px-3 py-3 items-center justify-center">
                <Text className="text-xs font-medium text-foreground">
                  {formatCurrency(parcel.interest)}
                </Text>
              </View>
              <View className="w-24 px-3 py-3 items-center justify-center">
                <Text className="text-xs font-medium text-foreground">
                  {formatCurrency(parcel.principal)}
                </Text>
              </View>
              <View className="w-24 px-3 py-3 items-center justify-center">
                <Text className="text-xs font-medium text-foreground">
                  {formatCurrency(parcel.balance)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Legend */}
      <View className="mt-4 gap-2">
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-xs text-muted">Parc. = Número da parcela</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-xs text-muted">Valor = Valor da parcela</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-xs text-muted">Principal = Amortização do principal</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-xs text-muted">Saldo = Saldo devedor restante</Text>
        </View>
      </View>
    </View>
  );
}
