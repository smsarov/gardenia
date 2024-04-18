import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const TreeMenuOption = ({ label, action, _style }) => {
  return (
    <MenuOption
      onSelect={() => action()}
      customStyles={{ optionTouchable: { style: _style } }}
    >
      <Text style={{ alignSelf: "center", fontSize: 20 }}>{label}</Text>
    </MenuOption>
  );
};

const TreeImage = ({ tree, menuConfig }) => {
  return menuConfig ? (
    <View style={{ flex: 1, borderRadius: 5 }}>
      <Menu>
        <MenuTrigger
          customStyles={{ triggerTouchable: { underlayColor: "transparent" } }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
              borderRadius: 5,
            }}
            source={{ uri: tree }}
          ></Image>
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.optionsContainer }}
        >
          {menuConfig.map((config, index) => {
            let _style = {};
            if (index === 0) _style = { ...styles.topOption };
            if (index === menuConfig.length - 1)
              _style = { ..._style, ...styles.bottomOption };

            return <TreeMenuOption {...config} key={index} _style={_style} />;
          })}
        </MenuOptions>
      </Menu>
    </View>
  ) : (
    <View style={{ flex: 1, borderRadius: 5 }}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "stretch",
          borderRadius: 5,
        }}
        source={{ uri: tree }}
      ></Image>
    </View>
  );
};

export default TreeImage;

const styles = StyleSheet.create({
  optionsContainer: {
    width: 100,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.7,
    backgroundColor: "#EEEEEE",
  },
});
