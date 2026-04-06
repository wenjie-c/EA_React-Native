import HistorialIndividual from "@/components/modals/HistorialIndividual";
import HistoryService, { Event } from "@/services/HitoryService";
import { useAppTheme } from "@/styles/customTheme";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, DataTable, Text } from "react-native-paper";

export default function HistoryScreen() {
  const [alignItems, setAlignItems] = useState("stretch");
  const [eventList, setEventList] = useState<Event[]>([]);
  useEffect(() => setEventList(HistoryService.getList()), []);

  const theme = useAppTheme();
  const screenStyle = StyleSheet.create({
    // card: {
    //   backgroundColor: "#d9c3b0",
    //   minWidth: 300,
    //   minHeight: "300px",
    // },
    title: {
      // fontSize: 24,
      alignSelf: "center",
      justifyContent: "center",
      margin: 8,
    },
    page: {
      backgroundColor: "#f2f3f4",
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingInline: 30,
    },
    card: {
      backgroundColor: "#d9c3b0",
      // minWidth: 300,
      // minHeight: 300,
      // flexWrap: "wrap",
      padding: 8,
    },
    button: {
      backgroundColor: "#af2e1b",
      alignSelf: "center",
    },
    tableHeader: {
      flex: 1,
      flexDirection: "row",
      alignContent: "space-between",
      color: "#bfa07a",
    },
  });
  return (
    <View style={screenStyle.page}>
      {/* <Text style={screenStyle.title}>HistoryScreen</Text> */}
      <Text variant="displayMedium" style={screenStyle.title}>
        HistoryScreen
      </Text>
      {/* <Text style={{ fontSize: 16 }}>Hello world!</Text> */}
      <Card style={screenStyle.card}>
        <Card.Title titleVariant="displaySmall" title="Historial" />
        <Card.Content>
          {/* <Text variant="bodyLarge">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ex
            ullam facere veniam accusantium beatae excepturi perferendis nihil
            distinctio neque blanditiis fugit, voluptas, architecto dolorum!
            Numquam assumenda necessitatibus corrupti tenetur. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Expedita, illo soluta
            quia consequatur cupiditate atque esse. Similique, magnam! Excepturi
            quibusdam error praesentium, quos deleniti tempore unde
            reprehenderit quae ipsam corrupti? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Vitae nihil inventore quisquam nisi
            magni, sed sint quam libero, fuga molestias, quibusdam tenetur
            facere dolores? Ab, dicta nobis. Alias, veritatis laudantium! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Eligendi, velit.
            Excepturi alias facere atque eligendi quidem odit nemo aut quas,
            numquam quae corrupti labore, in eum obcaecati dolorem repellat
            animi.
          </Text> */}
          <DataTable>
            <DataTable.Header>
              <View style={screenStyle.tableHeader}>
                <DataTable.Title>Id</DataTable.Title>
                <DataTable.Title>Where</DataTable.Title>
                <DataTable.Title>Description</DataTable.Title>
              </View>
            </DataTable.Header>
            {eventList.map((item) => (
              <DataTable.Row key={item.key}>
                <HistorialIndividual event={item} />
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            style={screenStyle.button}
            onPress={() => {
              HistoryService.clear();
              setEventList([]);
            }}
          >
            Clear
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
