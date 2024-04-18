import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import Avatar from "./Avatar";

const FriendsView = ({ tab, mainText, subText, user }) => {
  const [friends, setFriends] = useState(user.friends);
  const [friendRequests, setFriendRequest] = useState(user.friendRequests);
  const [curWindow, setCurWindow] = useState("friends");

  const navigation = useNavigation();

  const data = curWindow === "friends" ? friends : friendRequests;

  const friendsMenuConfig = [
    {
      label: "Profile",
      action: (_user) => navigation.navigate("UserView", { user: _user }),
    },
    {
      label: "Delete",
      action: (_user) => {
        setFriends(friends.filter((friend) => friend !== _user));
        //delete from db
      },
    },
  ];

  const requestsMenuConfig = [
    {
      label: "Profile",
      action: (_user) => navigation.navigate('UserView', {user: _user}),
    },
    {
      label: "Accept",
      action: (_user) => {
        setFriendRequest(friendRequests.filter((friend) => friend !== _user));
        setFriends([...friends, _user]);
        //add to db
      },
    },
    {
      label: "Reject",
      action: (_user) =>
        setFriendRequest(friendRequests.filter((friend) => friend !== _user)),
      //delete from db
    },
  ];

  const renderAvatar = ({ item, index }) => {
    return (
      <Avatar
        user={item}
        menuConfig={
          curWindow === "friends" ? friendsMenuConfig : requestsMenuConfig
        }
      ></Avatar>
    );
  };

  const getStyle = (window) => {
    const _style = curWindow === window ? { backgroundColor: "lightgrey" } : {};
    _style.padding = 5;
    _style.borderRadius = 5;

    return _style;
  };

  return (
    <Animated.View style={tab}>
      <View style={{ flexDirection: "row", gap: "10%" }}>
        <View
          style={getStyle("friends")}
          onTouchStart={() => setCurWindow("friends")}
        >
          <Text style={mainText}>Friends</Text>
        </View>
        <View
          style={getStyle("requests")}
          onTouchStart={() => setCurWindow("requests")}
        >
          <Text style={mainText}>Requests</Text>
        </View>
      </View>

      {data.length ? (
        <FlatList
          data={data}
          horizontal={true}
          renderItem={renderAvatar}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={{ width: 10 }}></View>;
          }}
          contentContainerStyle={{
            paddingTop: "4%",
            height: 55,
          }}
          keyExtractor={(item, index) => item?.id || index}
        ></FlatList>
      ) : (
        <View
          style={{ alignSelf: "center", height: 55, justifyContent: "center" }}
        >
          <Text style={subText}>
            {curWindow === "friends"
              ? "No friends found"
              : "No friend requests"}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default FriendsView;

const styles = StyleSheet.create({});
