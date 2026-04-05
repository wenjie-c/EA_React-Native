import customTheme from "@/styles/customTheme";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { indexStyles as styles } from "../styles/index.styles";

// const Stack = createNativeStackNavigator();

export default function Index() {
  const router = useRouter();

  return (
    <PaperProvider theme={customTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Panel de Administración</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/organization")}
        >
          <Text style={styles.buttonText}>Gestionar Organizaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/users")}
        >
          <Text style={styles.buttonText}>Gestionar Usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/history")}
        >
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>

        {/* <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="History" component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer> // No funciona porque al parecer ya estamos dentro de un navigationContainer :/ , esto es bastante opaco. */}
      </View>
    </PaperProvider>
  );
}
