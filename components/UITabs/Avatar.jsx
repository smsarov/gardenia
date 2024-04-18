import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Touchable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import AVATAR_PLACEHOLDER from "../../Pictures";

const AvatarMenuOption = ({ label, action, user, _style }) => {
  return (
    <MenuOption
      onSelect={() => action(user)}
      customStyles={{ optionTouchable: { style: _style } }}
    >
      <Text style={{ alignSelf: "center", fontSize: 20 }}>{label}</Text>
    </MenuOption>
  );
};

const Avatar = ({ user, menuConfig }) => {
  return menuConfig ? (
    <Menu>
      <MenuTrigger
        customStyles={{ triggerTouchable: { underlayColor: "transparent" } }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "stretch",
            borderRadius: 5,
          }}
          defaultSource={AVATAR_PLACEHOLDER}
          source={user?.pic}
        ></Image>
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: styles.optionsContainer }}>
        {menuConfig.map((config, index) => {
          let _style = {};
          if (index === 0) _style = { ...styles.topOption };
          if (index === menuConfig.length - 1)
            _style = { ..._style, ...styles.bottomOption };

          return (
            <AvatarMenuOption
              {...config}
              key={index}
              user={user}
              _style={_style}
            />
          );
        })}
      </MenuOptions>
    </Menu>
  ) : (
    <View style={[styles.common, styles.placeholder]}></View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  common: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    backgroundColor: "#C8C8C8",
  },
  main: {
    //backgroundColor: "black",
    borderWidth: 2,
    borderColor: "grey",
  },
  optionsContainer: {
    marginTop: 40,
    width: 100,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.7,
    backgroundColor: "#EEEEEE",
  },
  topOption: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomOption: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
