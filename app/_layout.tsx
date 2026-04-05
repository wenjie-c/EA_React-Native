import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      {/* Es mejor mostrar la cabecera. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />

      <Stack.Screen
        name="history"
        options={{ headerShown: true, title: "Historial" }}
      />
    </Stack>
  );
}
