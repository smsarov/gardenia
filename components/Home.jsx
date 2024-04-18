import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
} from "react-native";
import { React, useRef, useCallback, useState, useEffect, useContext } from "react";

import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { UIContext, userContext } from "../Context";

import TreeWindow from "./TreeWindow";
import UI from "./UI";
import AnimatedBlur from "./AnimatedBlur";

const { width, height } = Dimensions.get("window");


function Home() {
  const menuIsOpened = useSharedValue(0);
  const user = useContext(userContext);
  
  const openMenu = () => {
    const goal = !menuIsOpened.value;
    menuIsOpened.value = withTiming(goal, { duration: 300 });
  };

  const animatedIntensity = useAnimatedProps(() => {
    return {
      intensity: interpolate(menuIsOpened.value, [0, 1], [0, 60]),
    };
  });

  const blurStyle = useAnimatedStyle(() => {
    return {
      // elevation: interpolate(menuIsOpened.value, [0, 1], [0, 6]),
      // zIndex: interpolate(menuIsOpened.value, [0, 1], [0, 6]),
      //elevation: menuIsOpened.value === 1 ? 6 : 0,
      zIndex: menuIsOpened.value ? 6 : 0,
    };
  });

  const UIStyle = useAnimatedStyle(() => {
    return {
      elevation: interpolate(menuIsOpened.value, [0, 1], [0, 7]),
      zIndex: interpolate(menuIsOpened.value, [0, 1], [0, 7]),
    };
  });

  const openMenuGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => (menuIsOpened.value = withTiming(1, { duration: 300 })));
  const closeMenuGesture = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      menuIsOpened.value = withTiming(0, { duration: 300 });
    });
  const toggleMenu = Gesture.Simultaneous(openMenuGesture, closeMenuGesture);

  return (
    user.id? 
    (<GestureDetector gesture={toggleMenu}>
      <View style={styles.container}>
        <StatusBar hidden />
        <TreeWindow user={user}/>
        <Animated.View style={[styles.blurStyle, blurStyle]}>
          <AnimatedBlur
            animatedProps={animatedIntensity}
            style={[{ flex: 1 }]}
          ></AnimatedBlur>
        </Animated.View>
        <UIContext.Provider
          value={{
            toggleMenu: openMenu,
          }}
        >
          <UI menuIsOpened={menuIsOpened} style={UIStyle} />
        </UIContext.Provider>
      </View>
    </GestureDetector>) :
    <View style={styles.container}><Text>Пользователь не найден</Text></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  blurStyle: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
  },
});

export default Home;
