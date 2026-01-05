import { Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  size = 'medium',
  fullWidth = false,
}: ActionButtonProps) {
  const baseClasses = 'rounded-lg items-center justify-center';

  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-surface border border-border',
    outline: 'border-2 border-primary',
  };

  const sizeClasses = {
    small: 'px-4 py-2.5',
    medium: 'px-6 py-3.5',
    large: 'px-8 py-4',
  };

  const textVariantClasses = {
    primary: 'text-background',
    secondary: 'text-foreground',
    outline: 'text-primary',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed && !disabled ? 0.96 : 1 }],
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50'
      )}
    >
      <Text
        className={cn(
          'font-semibold',
          textVariantClasses[variant],
          textSizeClasses[size]
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
