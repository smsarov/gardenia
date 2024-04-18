import { React, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import Home from "./components/Home";
import Login from "./components/Login";
import { userContext } from "./Context";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserView from "./components/UserView";

const Stack = createNativeStackNavigator();

const HomeWithMenuProvider = () => {
  return <MenuProvider skipInstanceCheck={true}><Home/></MenuProvider>
}

const defaultUser = {
  name: "Ivan",
  id: 1,
  pic: require("gardenia/kitty.jpeg"),
  trees: [
    "https://sun9-53.userapi.com/impf/ANf8qv2Jff2hrs4rNLgpLVep2mX-vcS2qCtF0g/7egiYOmFxjM.jpg?size=604x604&quality=95&sign=0bcfd2202bf1b47c049c2c79b0bd9ea9&type=album",
    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",
    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",
    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",

    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",
    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",
    "https://sun9-2.userapi.com/impg/AOm1AfWBB1t1CNgSo9uCP0I6SgrI1N8zNCN0xQ/C9R2DJ02QXU.jpg?size=800x800&quality=95&sign=9715e16e238d6df7dd9a8382b6ef96bd&type=album",
  ],
  friends: [
    {
      name: "John",
      id: 2,
      pic: require("gardenia/angry_kitty.jpeg"),
      trees: [
        "https://sun9-53.userapi.com/impf/ANf8qv2Jff2hrs4rNLgpLVep2mX-vcS2qCtF0g/7egiYOmFxjM.jpg?size=604x604&quality=95&sign=0bcfd2202bf1b47c049c2c79b0bd9ea9&type=album",
      ],
    },
    {
      name: "Jane",
      id: 3,
      pic: require("gardenia/kitty.jpeg"),
      trees: [
        "https://sun9-53.userapi.com/impf/ANf8qv2Jff2hrs4rNLgpLVep2mX-vcS2qCtF0g/7egiYOmFxjM.jpg?size=604x604&quality=95&sign=0bcfd2202bf1b47c049c2c79b0bd9ea9&type=album",
      ],
    },
  ],
  friendRequests: [
    {
      name: "Alice",
      id: 4,
      pic: require("gardenia/trees/tree1.png"),
      trees: [
        "https://sun9-53.userapi.com/impf/ANf8qv2Jff2hrs4rNLgpLVep2mX-vcS2qCtF0g/7egiYOmFxjM.jpg?size=604x604&quality=95&sign=0bcfd2202bf1b47c049c2c79b0bd9ea9&type=album",
      ],
    },
  ],
};

export default () => {
  const [user, setUser] = useState(defaultUser);

  return user ? (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <userContext.Provider value={user}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Home"
                component={HomeWithMenuProvider}
                screenOptions={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="UserView"
                  component={UserView}
                ></Stack.Screen>
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </userContext.Provider>
      </GestureHandlerRootView>
  ) : (
    <Login setUser={(user) => setUser(user)} />
  );
};
