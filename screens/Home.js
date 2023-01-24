import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Text, View, Dimensions, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../App";
import COLORS from "../assets/theme";
import HomeTabs from "../components/HomeTabs";
import { setId } from "../reducers/appData";
import { appFile } from "../utils/container";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useContext(Theme);
  const files = useSelector((state) => state.app.files);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const styles = {
    bottom: { borderBottomColor: isDark ? COLORS.primary600 : COLORS.dark900 },
    ripple: { color: "grey" },
    docContainer: {
      borderBottomWidth: 0.3,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
      padding: 10,
      paddingVertical: 15,
    },
    textStyle: {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      letterSpacing: 1,
      fontStyle: "italic",
      fontSize: 15,
      color: isDark ? COLORS.primary600 : COLORS.dark900,
    },
    containerStyle: {
      height: Dimensions.get("window").height - 80,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
  };

  const handlePress = (index) => {
    dispatch(setId(index));
    navigation.navigate("EditScreenFetch");
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {files.length === 0 && (
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>No Files Found !!</Text>
          <Text style={styles.textStyle}>Pull Down to Refresh</Text>
        </View>
      )}
      {files.map((item, index) => {
        return (
          <Pressable
            android_ripple={styles.ripple}
            onPress={() => handlePress(index)}
            key={index}
            style={[styles.docContainer, styles.bottom]}>
            <HomeTabs id={index} item={item} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
