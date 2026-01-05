import { Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'decimal-pad' | 'numeric';
  suffix?: string;
  error?: string;
  editable?: boolean;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  suffix,
  error,
  editable = true,
}: InputFieldProps) {
  const colors = useColors();

  return (
    <View className="mb-6">
      <Text className="text-sm font-medium text-foreground mb-2">
        {label}
      </Text>
      <View
        className={`flex-row items-center rounded-lg border px-4 py-3 ${
          error ? 'border-error bg-error/5' : 'border-border bg-background'
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={keyboardType}
          editable={editable}
          className="flex-1 text-base text-foreground font-medium"
          style={{
            color: colors.foreground,
          }}
        />
        {suffix && (
          <Text className="text-base font-medium text-muted ml-2">
            {suffix}
          </Text>
        )}
      </View>
      {error && (
        <Text className="text-xs text-error mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
