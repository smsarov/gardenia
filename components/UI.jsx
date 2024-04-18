import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { Canvas, Circle, center } from "@shopify/react-native-skia";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
  withSequence,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { UIContext, userContext } from "../Context";
import AVATAR_PLACEHOLDER from "../Pictures";
import Profile from "./UITabs/Profile";
import Search from "./UITabs/Search";

const BURGER_SIZE = 45;

const {width, height}  = Dimensions.get("window");
const circleWidth = width;
const PROFILE_PICTURE_SIZE = width / 5;
const circleMenuTextSize = height / 25;

const UI = (props) => {
  const profileMenuOpen = useSharedValue(0);
  const searchMenuOpen = useSharedValue(0);

  const openMenu = useContext(UIContext).toggleMenu;
  const user = useContext(userContext);

  const closeAllMenus = () => {
    [profileMenuOpen, searchMenuOpen].forEach((sv) => {
      if (sv.value) sv.value = withTiming(0, { duration: 200 });
    });
  };

  const toggleProfileMenu = () => {
    const goal = !profileMenuOpen.value;
    withSequence(
      closeAllMenus(),
      (profileMenuOpen.value = withTiming(goal, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      }))
    );
  };
  const toggleSearchMenu = () => {
    const goal = !searchMenuOpen.value;
    withSequence(
      closeAllMenus(),
      (searchMenuOpen.value = withTiming(goal, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      }))
    );
  };

  const menuHeight = useAnimatedStyle(() => {
    return {
      top:
        interpolate(
          profileMenuOpen.value * props.menuIsOpened.value,
          [0, 1],
          [height, circleWidth / 2 + 1.5 * PROFILE_PICTURE_SIZE / 2]
        ),
    };
  });
  const searchHeight = useAnimatedStyle(() => {
    return {
      top:
        interpolate(
          searchMenuOpen.value * props.menuIsOpened.value,
          [0, 1],
          [height, circleWidth / 2 + 1.5 * PROFILE_PICTURE_SIZE / 2]
        ),
    };
  });
  const circleStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        props.menuIsOpened.value,
        [0, 1],
        [-(circleWidth + PROFILE_PICTURE_SIZE), -circleWidth / 2]
      ),
    };
  });
  const profileTextStyle = useAnimatedStyle(() => {
    return { fontSize: interpolate(profileMenuOpen.value, [0, 1], [1, 1.3]) * circleMenuTextSize};
  });

  const searchTextStyle = useAnimatedStyle(() => {
    return { fontSize: interpolate(searchMenuOpen.value, [0, 1], [1, 1.3]) * circleMenuTextSize};
  });

  return (
    <Animated.View style={[styles.container, props.style]}>
      <Animated.View style={[styles.circle, circleStyle]}>
        <View style={styles.circleMenu}>
          <Pressable onPress={toggleProfileMenu}>
            <Animated.Text style={[profileTextStyle, styles.cirleText]}>
              Profile
            </Animated.Text>
          </Pressable>
          <Pressable onPress={toggleSearchMenu}>
            <Animated.Text style={[searchTextStyle, styles.cirleText]}>
              Search
            </Animated.Text>
          </Pressable>
        </View>
        <View style={styles.profilePic}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
              borderRadius: 1000,
            }}
            defaultSource={AVATAR_PLACEHOLDER}
            source={user?.pic}
          ></Image>
        </View>
      </Animated.View>

      <Pressable
        style={styles.burger}
        onPress={() => {
          openMenu();
          closeAllMenus();
        }}
      >
        <View style={{ transform: [{ skewX: "30deg" }], gap: 3 }}>
          <View style={styles.burgerPad}></View>
          <View style={styles.burgerPad}></View>
          <View style={styles.burgerPad}></View>
        </View>
      </Pressable>

      <Animated.View style={[menuHeight, styles.menuView]}>
        <Profile
          tab={styles.tab}
          mainText={styles.mainText}
          subText={styles.subText}
          style={styles.menu}
        />
      </Animated.View>

      <Animated.View style={[searchHeight, styles.menuView]}>
        <Search
          tab={styles.tab}
          mainText={styles.mainText}
          subText={styles.subText}
          style={styles.menu}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default UI;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  circle: {
    width: circleWidth,
    aspectRatio: 1,
    backgroundColor: "lightgrey",
    borderRadius: "500%",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  profilePic: {
    position: "absolute",
    backgroundColor: "grey",
    width: PROFILE_PICTURE_SIZE,
    borderRadius: "100%",
    height: PROFILE_PICTURE_SIZE,
    bottom: -PROFILE_PICTURE_SIZE / 2,
    shadowColor: "grey",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  circleMenu: {
    top: "65%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  burger: {
    backgroundColor: "#469173",
    position: "absolute",
    width: BURGER_SIZE,
    height: BURGER_SIZE,
    borderRadius: "100%",
    right: "5%",
    top: BURGER_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  burgerPad: {
    width: 18,
    height: 3,
    backgroundColor: "white",
    borderRadius: 5,
  },
  menu: {
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: height - circleWidth / 2 - 1.5 * PROFILE_PICTURE_SIZE / 2,
  },
  menuView: {
    position: "absolute",
    width: "100%",
    height: height - circleWidth / 2 - 1.5 * PROFILE_PICTURE_SIZE / 2,
  },
  tab: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-evenly",
    paddingLeft: 20,
    paddingVertical: 10,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.7,
  },
  cirleText: {
    fontSize: circleMenuTextSize,
    fontWeight: "bold",
  },
  mainText: {
    fontSize: height / 40,
    fontWeight: "bold",
  },
  subText: {
    fontSize: height / 50,
    color: "grey",
  },
});
