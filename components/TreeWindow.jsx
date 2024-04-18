import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useRef } from "react";
import { Directions, FlatList, Gesture, GestureDetector } from "react-native-gesture-handler";
import TreeImage from "./TreeWindowTabs/TreeImage";
import { userContext } from "../Context";

const PREVIEW_SIZE = 65;
const MAINVIEW_HEIGHT_RATIO = 0.8;
const { width, height } = Dimensions.get("window");

// const trees = [];
// for (let i = 0; i < 7; i++) {
//   trees.push('0');
// }

const myTreeMenuConfig = [
  {
    label: 'share',
    action: () => console.log('share')
  },
  {
    label: 'delete',
    action: () => console.log('delete')
  }
]

const othersTreeMenuConfig = [
  {
    label: 'request',
    action: () => console.log('delete')
  },
  {
    label: 'request3',
    action: () => console.log('delete')
  }
]

const TreeWindow = ({user}) => {
  const [curTree, setCurTree] = React.useState(0);
  const treeViewListRef = useRef();
  const trees = user.trees;

  const me = useContext(userContext);

  const shareGesture = Gesture.Fling().direction(Directions.UP).onEnd(() => {
    console.log(`share tree #${curTree}` + '\n' + '      TreeWindow');
  })

  return (
    <GestureDetector gesture={shareGesture}>
    <View style={[styles.mainStyle]}>
      
      <FlatList
        ref={treeViewListRef}
        data={trees}
        renderItem={({ item }) => (
          
            <View style={styles.treeView}>
              <View
                style={{
                  ...styles.treeView,
                  width: styles.mainStyle.width * 0.95,
                  alignSelf: "center",
                  borderWidth: 1,
                }}
              >
                <TreeImage
                  tree={item}
                  menuConfig={user.id === me.id ? myTreeMenuConfig : othersTreeMenuConfig}
                />
              </View>
            </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        getItemLayout={(data, index) => ({
          length: styles.treeView.width,
          offset: styles.treeView.width * index,
          index,
        })}
      />
      <View>
        <FlatList
          data={trees}
          renderItem={({ item, index }) => (
            <Pressable
              style={{
                ...styles.treePreview,
                transform: [{ scale: index === curTree ? 1.1 : 1 }],
              }}
              onPress={() => {
                setCurTree(index);
                treeViewListRef.current.scrollToIndex({ index: index });
              }}
            >
              <TreeImage
                tree={item}
              />
            </Pressable>
          )}
          horizontal={true}
          ItemSeparatorComponent={() => {
            return <View style={{ width: 10 }} />;
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: PREVIEW_SIZE * 1.4,
            paddingLeft: 5,
          }}
        />
      </View>
    </View>
    </GestureDetector>
  );
};

export default TreeWindow;

const styles = StyleSheet.create({
  treePreview: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    alignSelf: "center",
  },
  mainStyle: {
      height: height * 0.6,
      width: width * 0.9,
      justifyContent: "space-between",
      zIndex: 6,
      //borderWidth: 1,
      flexDirection: "column",
    },
  treeView : {
    height: height * 0.6 * MAINVIEW_HEIGHT_RATIO,
    width: width * 0.9,
    borderRadius: 5,
    backgroudColor: "white",
  }
});
