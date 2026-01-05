import { Stack } from 'expo-router';

export default function SimulationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="[type]" />
      <Stack.Screen name="results" />
    </Stack>
  );
}
