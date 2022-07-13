import { Text, StyleSheet } from "react-native";
import { Switch, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import COLORS from "../assets/theme";
import { Snackbar } from "react-native-paper";

export const ProfileTab = ({ onPress, ToggleTheme }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ToggleTheme}
      style={style.innerContainer}>
      <Text style={[style.text, ToggleTheme]}>Profile</Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={30}
        color={ToggleTheme.color}
      />
    </Pressable>
  );
};

export const DarkModeSwitch = ({ ToggleTheme, toggleSwitch, isEnabled }) => {
  return (
    <Pressable
      android_ripple={ToggleTheme}
      style={[style.innerContainer, style.toggleContainer]}>
      <Text style={[style.text, ToggleTheme]}>Dark Mode</Text>
      <Switch
        trackColor={{ false: COLORS.dark900, true: COLORS.primary600 }}
        thumbColor={isEnabled ? COLORS.primary300 : COLORS.dark300}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Pressable>
  );
};

export const LockAppTab = ({ isLock, ToggleTheme, handleLock }) => {
  return (
    <Pressable
      android_ripple={ToggleTheme}
      style={[style.innerContainer, style.toggleContainer]}>
      <Text style={[style.text, ToggleTheme]}>Lock App</Text>
      <Switch
        trackColor={{ false: COLORS.dark900, true: COLORS.primary600 }}
        thumbColor={isLock ? COLORS.primary300 : COLORS.dark300}
        onValueChange={handleLock}
        value={isLock}
      />
    </Pressable>
  );
};

export const FeedbackTab = ({ onPress, ToggleTheme }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ToggleTheme}
      style={style.innerContainer}>
      <Text style={[style.text, ToggleTheme]}>Feedback</Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={30}
        color={ToggleTheme.color}
      />
    </Pressable>
  );
};

export const ShowMessage = ({ show, setShow, setIsLock }) => {
  const onDismissSnackBar = () => {
    setShow(!show);
    setIsLock(false);
  };

  const style = {
    animation: { scale: 2 },
    borderWidth: 1,
    borderColor: COLORS.dark300,
    backgroundColor: COLORS.dark900,
  };

  return (
    <Snackbar
      theme={style.animation}
      style={style}
      visible={show}
      duration={2500}
      onDismiss={onDismissSnackBar}>
      Please set a screen lock in your phone !!
    </Snackbar>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    letterSpacing: 1,
  },
  toggleContainer: {
    padding: 2,
    paddingLeft: 10,
  },
});
