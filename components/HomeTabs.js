import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Theme } from "../App";
import COLORS from "../assets/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useDispatch } from "react-redux";
import { removeFile } from "../reducers/appData";
import { appFile } from "../utils/container";

export const EditMenu = ({ ThemeToggler, id }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const deleteData = () => {
    dispatch(removeFile(id));
    appFile.slice(id, 1);
    hideMenu();
  };

  return (
    <View>
      <Menu
        style={ThemeToggler.menu}
        visible={visible}
        anchor={
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            onPress={showMenu}
            color={ThemeToggler.color}
          />
        }
        onRequestClose={hideMenu}>
        <MenuItem
          textStyle={ThemeToggler.item}
          pressColor={ThemeToggler.pressColor}
          onPress={hideMenu}>
          Rename
        </MenuItem>
        <MenuItem
          textStyle={ThemeToggler.item}
          pressColor={ThemeToggler.pressColor}
          onPress={hideMenu}>
          Move
        </MenuItem>
        <MenuItem
          textStyle={ThemeToggler.item}
          pressColor={ThemeToggler.pressColor}
          onPress={deleteData}>
          Delete
        </MenuItem>
        <MenuItem
          textStyle={ThemeToggler.item}
          pressColor={ThemeToggler.pressColor}
          onPress={hideMenu}>
          Share
        </MenuItem>
      </Menu>
    </View>
  );
};

export default function HomeTabs({ id, item }) {
  const { isDark } = useContext(Theme);

  const ThemeToggler = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
    bgIcon: {
      opacity: isDark ? 0.9 : 0.6,
      borderColor: isDark ? COLORS.primary600 : COLORS.primary600,
      backgroundColor: isDark ? COLORS.dark900 : COLORS.primary600,
    },
    text: { color: isDark ? COLORS.primary600 : COLORS.dark900 },
    menu: {
      backgroundColor: isDark ? COLORS.dark900 : COLORS.primary300,
    },
    item: { color: isDark ? COLORS.primary600 : COLORS.dark900 },
    pressColor: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  return (
    <>
      <View style={[styles.docIcon, ThemeToggler.bgIcon]}>
        <MaterialCommunityIcons
          name="file-document-edit"
          size={28}
          color={ThemeToggler.color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, ThemeToggler.text]}>{item.name}</Text>
        <View style={styles.docInfo}>
          <Text style={[styles.date, ThemeToggler.text]}>{item.date}</Text>
          <Text style={[styles.size, ThemeToggler.text]}>{item.time}</Text>
        </View>
      </View>
      <EditMenu ThemeToggler={ThemeToggler} item={item} id={id} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
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
  docIcon: {
    borderWidth: 0.3,
    opacity: 0.3,
    padding: 10,
    borderRadius: 3,
    paddingHorizontal: 20,
  },
  textContainer: {},
  title: {
    fontSize: 15,
    letterSpacing: 1,
  },
  docInfo: {
    flexDirection: "row",
  },
  date: {
    fontSize: 12,
    fontStyle: "italic",
  },
  size: {
    fontSize: 12,
    marginLeft: 15,
    fontStyle: "italic",
  },
  editIcon: {},
});
