import { Event } from "@/services/HitoryService";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
export interface Props {
  event: Event;
}
export default function HistorialIndividual(props: Props) {
  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>
      {/* <DataTable.Row key={props.event.key}> */}
      <DataTable.Cell>{props.event.key}</DataTable.Cell>
      <DataTable.Cell>{props.event.where}</DataTable.Cell>
      <DataTable.Cell>{props.event.args}</DataTable.Cell>
      {/* </DataTable.Row> */}
    </View>
  );
}
