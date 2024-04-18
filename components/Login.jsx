import { StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { TextInput } from "react-native";

const Login = (props) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.welcome}>Enter with...</Text>
        <TextInput
            placeholder="name"
            onChangeText={setName}
            value={name}
            autoCorrect={false}
            onSubmitEditing={() => {
                props.setUser({
                    name: name,
                    level: 69
                })
            }}
        ></TextInput>
        
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    width: "80%",
    height: "20%",
    borderRadius: "15%",
    alignItems: "center",
  },
  welcome: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
