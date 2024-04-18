import { Pressable, StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useContext, useState } from "react";

import { userContext } from "../../Context";
import FriendsView from "./FriendsView";
import AVATAR_PLACEHOLDER from "../../Pictures";

const Profile = (props) => {
  const { tab, mainText, subText, style } = props;
  const user = useContext(userContext);
  const [requests, setRequests] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const renderRequest = ({ item, index }) => {
    return (
      <View style={styles.request}>
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "stretch",
            borderRadius: 5,
          }}
          defaultSource={AVATAR_PLACEHOLDER}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        ></Image>
        <Text
          style={[
            subText,
            { paddingLeft: 20, color: "black", fontWeight: "bold" },
          ]}
        >
          User {index + 1}
        </Text>
      </View>
    );
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      
      <View style={tab}>
        <Text style={mainText}>Name</Text>
        <Text style={subText}>{user.name}</Text>
        <Text style={mainText}>Level</Text>
        <Text style={subText}>{user.level || 0}</Text>
      </View>

      <FriendsView {...props} user={user}/>

      <View style={[tab, { justifyContent: "space-around" }]}>
        <Text style={mainText}>Requests for crossing</Text>
        <View style={[styles.requests, { maxHeight: style.height * 0.3 }]}>
          <FlatList
            data={requests}
            renderItem={renderRequest}
            ItemSeparatorComponent={() => {
              return <View style={{ height: "1%" }}></View>;
            }}
          ></FlatList>
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={styles.interaction}
            onPressOut={() => console.log("accept all")}
          >
            <Text style={{ textAlign: "center" }}>Accept All</Text>
          </Pressable>
          <Pressable
            style={styles.interaction}
            onPressOut={() => console.log("reject all")}
          >
            <Text style={{ textAlign: "center" }}>Reject All</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  request: {
    height: 40,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  requests: {
    width: "90%",
    minHeight: 60,
    marginVertical: 5,
  },
  interaction: {
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignContent: "center",
  },
});
