import { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { FlatList } from "react-native";
import { OverscrollView } from "react-native-overscroll2";

export default function LoginScreen() {
  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff00");
  }, []);

  const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);
  const renderItem = ({ item }: { item: string }) => <Text>{item}</Text>;

  return (
    <>
      <View style={styles.container}>
        <OverscrollView
          bounce={true}
          onOverscroll={(event) => {
            console.log(
              "onOverscroll",
              event.nativeEvent.state,
              event.nativeEvent.offset
            );
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderItem}
            overScrollMode="always"
          />
        </OverscrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 50,
    backgroundColor: "#f5f5f5",
  },
});
