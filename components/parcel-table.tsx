import { ScrollView, Text, View } from 'react-native';
import { ParcelDetail, LoanType } from '@/lib/types';
import { formatCurrency } from '@/lib/loan-calculator';

interface ParcelTableProps {
  parcels: ParcelDetail[];
  loanType: LoanType;
}

export function ParcelTable({ parcels, loanType }: ParcelTableProps) {
  // Determinar quais colunas mostrar baseado no tipo de empréstimo
  const isInterestOnly = loanType === 'interest-only';

  // Definir colunas dinamicamente
  const columns = isInterestOnly
    ? [
        { key: 'number', label: 'Parc.', width: 50 },
        { key: 'value', label: 'Valor', width: 70 },
        { key: 'principal', label: 'Principal', width: 80 },
        { key: 'balance', label: 'Saldo', width: 70 },
      ]
    : [
        { key: 'number', label: 'Parc.', width: 60 },
        { key: 'value', label: 'Valor', width: 100 },
      ];

  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);

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
        <View style={{ width: Math.max(totalWidth, 280) }}>
          {/* Header */}
          <View className="flex-row bg-primary/10 border-b border-border">
            {columns.map((col) => (
              <View
                key={col.key}
                style={{ width: col.width }}
                className="px-2 py-3 items-center justify-center"
              >
                <Text className="text-xs font-bold text-foreground text-center">
                  {col.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Rows */}
          {parcels.map((parcel, index) => (
            <View
              key={parcel.number}
              className={`flex-row border-b border-border ${
                index % 2 === 0 ? 'bg-background' : 'bg-surface'
              }`}
            >
              {columns.map((col) => {
                let cellValue = '';

                switch (col.key) {
                  case 'number':
                    cellValue = parcel.number.toString();
                    break;
                  case 'value':
                    cellValue = formatCurrency(parcel.value);
                    break;
                  case 'principal':
                    cellValue = formatCurrency(parcel.principal);
                    break;
                  case 'balance':
                    cellValue = formatCurrency(parcel.balance);
                    break;
                }

                return (
                  <View
                    key={`${parcel.number}-${col.key}`}
                    style={{ width: col.width }}
                    className="px-2 py-3 items-center justify-center"
                  >
                    <Text className="text-xs font-medium text-foreground text-center">
                      {cellValue}
                    </Text>
                  </View>
                );
              })}
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
        {isInterestOnly && (
          <>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-primary mr-2" />
              <Text className="text-xs text-muted">Principal = Amortização do principal</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-primary mr-2" />
              <Text className="text-xs text-muted">Saldo = Saldo devedor restante</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
