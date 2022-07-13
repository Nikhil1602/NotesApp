import COLORS from "../../assets/theme";
import { Pressable, View, Text, Share } from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { actions } from "react-native-pell-rich-editor";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as IntentLauncher from "expo-intent-launcher";
import * as Permissions from "expo-permissions";
import { addFile } from "../../reducers/appData";
import { appFile } from "../container";

export const drawerStyle = (isDark, navigation) => {
  const image = useSelector((state) => state.userInfo.image);
  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
    bgColor: isDark ? COLORS.dark900 : COLORS.primary600,
    drawerColor: isDark ? COLORS.dark600 : COLORS.primary300,
  };

  const avatarContainer = {
    borderWidth: 2,
    borderRadius: 30,
    marginLeft: 15,
    padding: 2,
  };

  const defaultImage = () => {
    return <Avatar.Icon size={40} icon="account-circle" />;
  };

  const setImage = () => {
    return <Avatar.Image source={{ uri: image }} size={40} />;
  };

  const options = {
    swipeEnabled: false,
    sceneContainerStyle: {
      backgroundColor: ToggleTheme.drawerColor,
    },
    drawerPosition: "right",
    headerLeft: () => (
      <View style={[avatarContainer, { borderColor: ToggleTheme.color }]}>
        {image ? setImage() : defaultImage()}
      </View>
    ),
    headerRight: () => (
      <Pressable
        android_ripple={ToggleTheme}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-sharp" size={30} color={ToggleTheme.color} />
      </Pressable>
    ),
    headerStyle: {
      height: 100,
      shadowOffset: { x: 2, y: 3 },
      shadowColor: "black",
      backgroundColor: ToggleTheme.bgColor,
    },
    drawerStyle: {
      backgroundColor: ToggleTheme.drawerColor,
      width: "70%",
    },
    headerTitleAlign: "center",
    headerTintColor: ToggleTheme.color,
    headerRightContainerStyle: { marginRight: 15 },
    // headerLeftContainerStyle: { marginLeft: 15 },
  };

  return options;
};

export const stackStyle = (isDark, navigation, route) => {
  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
    bgColor: isDark ? COLORS.dark900 : COLORS.primary600,
    stackColor: isDark ? COLORS.dark600 : COLORS.primary300,
  };

  const options = {
    headerMode: "float",
    headerTintColor: ToggleTheme.color,
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.navigate(route)}
        android_ripple={{ color: ToggleTheme.color }}>
        <MaterialIcons
          name="keyboard-arrow-left"
          style={{ marginLeft: 15 }}
          size={30}
          color={ToggleTheme.color}
        />
      </Pressable>
    ),
    headerTitleAlign: "center",
    headerStyle: {
      height: 100,
      shadowOffset: { x: 2, y: 3 },
      shadowColor: "black",
      backgroundColor: ToggleTheme.bgColor,
    },
    cardStyle: {
      backgroundColor: ToggleTheme.stackColor,
    },
  };

  return options;
};

export const drawerEditStyle = (isDark, navigation) => {
  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
    bgColor: isDark ? COLORS.dark900 : COLORS.primary600,
    drawerColor: isDark ? COLORS.dark600 : COLORS.primary300,
  };

  const options = {
    swipeEnabled: false,
    sceneContainerStyle: {
      backgroundColor: ToggleTheme.drawerColor,
    },
    drawerPosition: "right",
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.navigate("Home")}
        android_ripple={{ color: ToggleTheme.color }}>
        <MaterialIcons
          name="keyboard-arrow-left"
          style={{ marginLeft: 15 }}
          size={30}
          color={ToggleTheme.color}
        />
      </Pressable>
    ),
    headerRight: () => (
      <Pressable
        android_ripple={ToggleTheme}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-sharp" size={30} color={ToggleTheme.color} />
      </Pressable>
    ),
    headerStyle: {
      height: 100,
      shadowOffset: { x: 2, y: 3 },
      shadowColor: "black",
      backgroundColor: ToggleTheme.bgColor,
    },
    drawerStyle: {
      backgroundColor: ToggleTheme.drawerColor,
      width: "70%",
    },
    headerTitleAlign: "center",
    headerTintColor: ToggleTheme.color,
    headerRightContainerStyle: { marginRight: 15 },
    // headerLeftContainerStyle: { marginLeft: 15 },
  };

  return options;
};

export const toolbarIcons = (setShow) => {
  return {
    [actions.heading1]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H1</Text>
    ),
    [actions.heading2]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H2</Text>
    ),
    [actions.heading3]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H3</Text>
    ),
    [actions.heading4]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H4</Text>
    ),
    [actions.heading5]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H5</Text>
    ),
    [actions.heading6]: ({ tintColor }) => (
      <Text style={[{ color: tintColor, fontSize: 16 }]}>H6</Text>
    ),
    [actions.insertLink]: ({ tintColor }) => (
      <MaterialIcons name="insert-link" size={24} color={tintColor} />
    ),
    [actions.insertImage]: ({ tintColor }) => (
      <MaterialIcons name="image" size={24} color={tintColor} />
    ),
    [actions.insertBulletsList]: ({ tintColor }) => (
      <MaterialIcons name="format-list-bulleted" size={24} color={tintColor} />
    ),
    [actions.insertOrderedList]: ({ tintColor }) => (
      <MaterialIcons name="format-list-numbered" size={24} color={tintColor} />
    ),
    [actions.keyboard]: ({ tintColor }) => (
      <MaterialIcons name="keyboard-hide" size={24} color={tintColor} />
    ),
    [actions.setStrikethrough]: ({ tintColor }) => (
      <MaterialIcons name="strikethrough-s" size={24} color={tintColor} />
    ),
    [actions.insertVideo]: ({ tintColor }) => (
      <MaterialIcons name="videocam" size={24} color={tintColor} />
    ),
    [actions.checkboxList]: ({ tintColor }) => (
      <MaterialIcons name="check-box" size={24} color={tintColor} />
    ),
    [actions.undo]: ({ tintColor }) => (
      <MaterialIcons name="undo" size={24} color={tintColor} />
    ),
    [actions.redo]: ({ tintColor }) => (
      <MaterialIcons name="redo" size={24} color={tintColor} />
    ),
    [actions.insertLine]: ({ tintColor }) => (
      <MaterialIcons name="vertical-align-bottom" size={24} color={tintColor} />
    ),
    [actions.alignLeft]: ({ tintColor }) => (
      <MaterialIcons name="format-align-left" size={24} color={tintColor} />
    ),
    [actions.alignCenter]: ({ tintColor }) => (
      <MaterialIcons name="format-align-center" size={24} color={tintColor} />
    ),
    [actions.alignRight]: ({ tintColor }) => (
      <MaterialIcons name="format-align-right" size={24} color={tintColor} />
    ),
    [actions.alignFull]: ({ tintColor }) => (
      <MaterialIcons name="format-align-justify" size={24} color={tintColor} />
    ),
    [actions.setSubscript]: ({ tintColor }) => (
      <MaterialIcons name="subscript" size={24} color={tintColor} />
    ),
    [actions.setSuperscript]: ({ tintColor }) => (
      <MaterialIcons name="superscript" size={24} color={tintColor} />
    ),
    [actions.code]: ({ tintColor }) => (
      <MaterialIcons
        name="code"
        size={24}
        color={tintColor}
        onPress={() => setShow({ code: true })}
      />
    ),
    [actions.blockquote]: ({ tintColor }) => (
      <MaterialIcons
        name="format-quote"
        size={24}
        onPress={() => setShow({ quote: true })}
        color={tintColor}
      />
    ),
    [actions.tab]: ({ tintColor }) => (
      <MaterialIcons name="keyboard-tab" size={24} color={tintColor} />
    ),
    [actions.fontSize]: ({ tintColor }) => (
      <MaterialIcons
        name="format-size"
        onPress={() => setShow({ size: true })}
        size={24}
        color={tintColor}
      />
    ),
    [actions.hiliteColor]: ({ tintColor }) => (
      <FontAwesome5
        name="highlighter"
        onPress={() => setShow({ hilite: true })}
        size={20}
        color={tintColor}
      />
    ),
    [actions.foreColor]: ({ tintColor }) => (
      <MaterialIcons
        name="format-color-text"
        size={24}
        onPress={() => setShow({ color: true })}
        color={tintColor}
      />
    ),
    [actions.table]: ({ tintColor }) => (
      <MaterialIcons
        name="table-chart"
        size={24}
        onPress={() => setShow({ table: true })}
        color={tintColor}
      />
    ),
    [actions.fontName]: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="format-font"
        onPress={() => setShow({ font: true })}
        size={24}
        color={tintColor}
      />
    ),
  };
};

export const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  if (dd < 10 && mm < 10) return `0${dd}/0${mm}/${yyyy}`;
  else if (dd < 10) return `0${dd}/${mm}/${yyyy}`;
  else if (mm < 10) return `${dd}/0${mm}/${yyyy}`;
  else return `${dd}/${mm}/${yyyy}`;
};

export const formatTime = (date) => {
  let hh = date.getHours();
  let mm = date.getMinutes();
  let tz = " AM";

  if (hh >= 12) {
    if (hh != 12) hh = hh - 12;
    tz = " PM";
  }

  if (hh < 10 && mm < 10) return `0${hh}:0${mm}${tz}`;
  else if (hh < 10) return `0${hh}:${mm}${tz}`;
  else if (mm < 10) return `${hh}:0${mm}${tz}`;
  else return `${hh}:${mm}${tz}`;
};

const documentOpener = async () => {
  try {
    const document = await DocumentPicker.getDocumentAsync({
      type: "application/*",
    });
    console.log(document);

    setTimeout(async () => {
      const cUri = await FileSystem.getContentUriAsync(document.uri);
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "application/pdf",
      });
    }, 500);
  } catch (e) {
    console.log(e.message);
  }
};

const createFile = (navigation, file, dispatch) => {
  let id = file.length;
  let date = new Date();
  let curDate = formatDate(date);
  let curTime = formatTime(date);

  dispatch(
    addFile({
      id: id + 1,
      name: `Untitled-${id + 1}`,
      content: "",
      date: curDate,
      time: curTime,
    })
  );

  appFile.push({
    id: id + 1,
    name: `Untitled-${id + 1}`,
    content: "",
    date: curDate,
    time: curTime,
  });

  navigation.navigate("EditScreenInitialize");
  navigation.closeDrawer();
};

const openFile = (navigation) => {
  setTimeout(() => {
    navigation.closeDrawer();
  }, 1);
  documentOpener();
};

const createFolder = (navigation, folder, dispatch) => {
  navigation.closeDrawer();
};

const shareApp = async (navigation) => {
  navigation.closeDrawer();

  try {
    const result = await Share.share({
      message: "Your message here",
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const feedback = (navigation, file) => {
  navigation.closeDrawer();
  console.log(file);
};

const settings = (navigation) => {
  navigation.navigate("SettingScreen");
  navigation.closeDrawer();
};

export const performAction = (navigation, item_id, file, folder, dispatch) => {
  switch (item_id) {
    case 1:
      createFile(navigation, file, dispatch);
      break;
    case 2:
      openFile(navigation);
      break;
    case 3:
      createFolder(navigation, folder, dispatch);
      break;
    case 4:
      shareApp(navigation);
      break;
    case 5:
      feedback(navigation, file);
      break;
    case 6:
      settings(navigation);
      break;
    default:
      navigation.closeDrawer();
      break;
  }
};

export const generateTable = (rows, cols) => {
  const numRow = parseInt(rows);
  const numCol = parseInt(cols);

  let col_string = "";
  for (let i = 0; i < numCol; i++) {
    col_string += "<td>&nbsp;</td>";
  }

  let row_string = "";
  for (let i = 0; i < numRow; i++) {
    row_string += "<tr>" + col_string + "</tr>";
  }

  return "<table>" + row_string + "</table>";
};
