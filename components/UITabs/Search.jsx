import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Profile = (props) => {
    const {tab, mainText, subText, style} = props;
  return (
    <View style = {[{flex: 1}, style]}>
      <View style={tab}>
        <Text style={mainText}>Name</Text>
        <Text style={subText}>name</Text>
        <Text style={mainText}>Level</Text>
        <Text style={subText}>1000</Text>
      </View>
      <View style={tab}>
        <Text style={mainText}>Friends</Text>
      </View>
      <View style={tab}>
        <Text style={mainText}>Applications for crossing</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
