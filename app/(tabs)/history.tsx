import { useAppTheme } from "@/styles/customTheme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HistoryScreen() {
  const [alignItems, setAlignItems] = useState("stretch");

  const theme = useAppTheme();
  const screenStyle = StyleSheet.create({
    background: {
      backgroundColor: theme.colors.primaryMyContainer,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      fontSize: 16,
    },
    card: { backgroundColor: theme.colors.secondaryContainer },
    title: {
      fontSize: 24,
      alignSelf: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={screenStyle.background}>
      {/* <Text style={screenStyle.title}>HistoryScreen</Text> */}
      <Text variant="displayLarge">HistoryScreen</Text>
      {/* <Text style={{ fontSize: 16 }}>Hello world!</Text> */}
    </View>
  );
}
