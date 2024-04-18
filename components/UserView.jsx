import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TreeWindow from "./TreeWindow";
import { MenuProvider } from "react-native-popup-menu";

const UserView = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <MenuProvider>
      <View style={styles.container}>
        <Text style={styles.name}>{user.name}</Text>
        <TreeWindow user={user} />
      </View>
    </MenuProvider>
  );
};

export default UserView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    alignSelf: "flex-start",
    left: "8%",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
});
