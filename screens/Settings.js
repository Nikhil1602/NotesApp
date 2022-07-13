import { View, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { ShowMessage, FeedbackTab } from "../components/SettingTabs";
import { DarkModeSwitch } from "../components/SettingTabs";
import { LockAppTab, ProfileTab } from "../components/SettingTabs";
import * as LocalAuthentication from "expo-local-authentication";
import COLORS from "../assets/theme";
import { Theme } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setAppLock } from "../reducers/appData";

export default function Settings({ navigation }) {
  const isAppLock = useSelector((state) => state.userInfo.isAppLock);
  const { isDark, setDark } = useContext(Theme);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLock, setIsLock] = useState(isAppLock);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  const handleStack = () => {
    navigation.navigate("Profile");
  };

  const toggleLock = () => {
    setIsLock((previousState) => !previousState);
    isLock && dispatch(setAppLock(false));
  };

  const showAuthentication = async () => {
    try {
      const auth = await LocalAuthentication.authenticateAsync();
      auth.success ? dispatch(setAppLock(true)) : setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfSupported = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      compatible ? showAuthentication() : setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLock = () => {
    !isLock && checkIfSupported();
    toggleLock();
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setDark(!isDark);
  };

  const handleFeedback = () => {};

  return (
    <>
      <View style={style.container}>
        <ProfileTab onPress={handleStack} ToggleTheme={ToggleTheme} />
        <DarkModeSwitch
          ToggleTheme={ToggleTheme}
          toggleSwitch={toggleSwitch}
          isEnabled={isEnabled}
        />
        <LockAppTab
          handleLock={handleLock}
          isLock={isLock}
          ToggleTheme={ToggleTheme}
        />
        <FeedbackTab onPress={handleFeedback} ToggleTheme={ToggleTheme} />
      </View>
      {show && (
        <ShowMessage setIsLock={setIsLock} show={show} setShow={setShow} />
      )}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 10,
  },
});
