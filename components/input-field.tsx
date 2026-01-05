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
  helperText?: string;
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
  helperText,
}: InputFieldProps) {
  const colors = useColors();

  return (
    <View className="mb-6">
      <Text className="text-sm font-semibold text-foreground mb-2.5">
        {label}
      </Text>
      <View
        className={`flex-row items-center rounded-lg border px-4 py-3.5 ${
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
            minHeight: 44,
          }}
        />
        {suffix && (
          <Text className="text-base font-semibold text-muted ml-3">
            {suffix}
          </Text>
        )}
      </View>
      {helperText && !error && (
        <Text className="text-xs text-muted mt-1.5">
          {helperText}
        </Text>
      )}
      {error && (
        <Text className="text-xs text-error mt-1.5 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}
