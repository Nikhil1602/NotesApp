import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { OptionTabs, EditTabs } from "../utils/container";
import { drawerStyle, performAction } from "../utils/functions";
import { drawerEditStyle, stackStyle } from "../utils/functions";
import { createStackNavigator } from "@react-navigation/stack";
import { DialogBoxForFileName } from "./DialogBox";
import { useContext, useState } from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { InitialContent, FetchContent } from "../screens/EditScreen";
import COLORS from "../assets/theme";
import { Theme } from "../App";
import { useSelector, useDispatch } from "react-redux";

const StackScreenProfile = ({ navigation }) => {
  const { isDark } = useContext(Theme);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={stackStyle(isDark, navigation, "Settings")}>
      <Stack.Screen
        name="ProfileScreen"
        options={{ title: "Profile" }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const StackScreenSettings = ({ navigation }) => {
  const { isDark } = useContext(Theme);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={stackStyle(isDark, navigation, "Home")}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={StackScreenProfile}
      />
    </Stack.Navigator>
  );
};

const EditItem = ({ onPress, item, ToggleTheme }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ToggleTheme}
      style={style.listItemContainer}>
      <MaterialIcons name={item.icon} size={24} color={ToggleTheme.color} />
      <Text style={[style.text, ToggleTheme]}>{item.name}</Text>
    </Pressable>
  );
};

const CustomDrawerEdit = ({ navigation, fileName, setFileName }) => {
  const { isDark } = useContext(Theme);
  const [selectedId, setSelectedId] = useState(null);
  const [show, setShow] = useState(false);

  const handleDrawer = () => {
    navigation.closeDrawer();
  };

  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  const props = { fileName, setFileName, show, setShow };

  const renderOptionTabs = ({ item }) => {
    const handleItem = () => {
      setSelectedId(item.id);
      navigation.closeDrawer();
      item.id === 1 && setShow(true);
    };

    return (
      <EditItem onPress={handleItem} item={item} ToggleTheme={ToggleTheme} />
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={handleDrawer}
          android_ripple={{ color: ToggleTheme.color, radius: 20 }}
          style={style.crossIconContainer}>
          <Ionicons
            name="close-sharp"
            style={style.crossIcon}
            size={30}
            color={isDark ? COLORS.primary600 : COLORS.dark900}
          />
        </Pressable>
        <View style={style.listContainer}>
          <FlatList
            data={EditTabs}
            renderItem={renderOptionTabs}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
      {show && <DialogBoxForFileName {...props} />}
    </SafeAreaView>
  );
};

const DrawerEditInitialize = ({ navigation }) => {
  const { isDark } = useContext(Theme);
  const [fileName, setFileName] = useState("Untitled");
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerEdit
          {...props}
          fileName={fileName}
          setFileName={setFileName}
        />
      )}
      screenOptions={({ navigation }) => drawerEditStyle(isDark, navigation)}>
      <Drawer.Screen name={fileName} component={InitialContent} />
    </Drawer.Navigator>
  );
};

const DrawerEditFetch = ({ navigation }) => {
  const { isDark } = useContext(Theme);
  const [fileName, setFileName] = useState("Untitled");
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerEdit
          {...props}
          fileName={fileName}
          setFileName={setFileName}
        />
      )}
      screenOptions={({ navigation }) => drawerEditStyle(isDark, navigation)}>
      <Drawer.Screen name={fileName} component={FetchContent} />
    </Drawer.Navigator>
  );
};

const Item = ({ onPress, item, ToggleTheme }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ToggleTheme}
      style={style.listItemContainer}>
      <MaterialIcons name={item.icon} size={24} color={ToggleTheme.color} />
      <Text style={[style.text, ToggleTheme]}>{item.name}</Text>
    </Pressable>
  );
};

const CustomDrawer = ({ navigation }) => {
  const { isDark } = useContext(Theme);
  const [selectedId, setSelectedId] = useState(null);
  const file = useSelector((state) => state.app.files);
  const folder = useSelector((state) => state.app.folders);
  const dispatch = useDispatch();

  const handleDrawer = () => {
    navigation.closeDrawer();
  };

  const ToggleTheme = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  const renderOptionTabs = ({ item }) => {
    const handleItem = () => {
      setSelectedId(item.id);
      performAction(navigation, item.id, file, folder, dispatch);
    };

    return <Item onPress={handleItem} item={item} ToggleTheme={ToggleTheme} />;
  };

  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={handleDrawer}
          android_ripple={{ color: ToggleTheme.color, radius: 20 }}
          style={style.crossIconContainer}>
          <Ionicons
            name="close-sharp"
            style={style.crossIcon}
            size={30}
            color={isDark ? COLORS.primary600 : COLORS.dark900}
          />
        </Pressable>
        <View style={style.listContainer}>
          <FlatList
            data={OptionTabs}
            renderItem={renderOptionTabs}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Navigation = () => {
  const Drawer = createDrawerNavigator();
  const { isDark } = useContext(Theme);
  const isAppLock = useSelector((state) => state.app.isAppLock);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => drawerStyle(isDark, navigation)}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="EditScreenInitialize"
          component={DrawerEditInitialize}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="EditScreenFetch"
          component={DrawerEditFetch}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="SettingScreen"
          component={StackScreenSettings}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const style = StyleSheet.create({
  crossIconContainer: {
    marginTop: 60,
    marginLeft: "80%",
  },
  crossIcon: {
    marginBottom: 20,
  },
  listContainer: {
    flexDirection: "row",
  },
  listItemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 40,
  },
  text: {
    marginLeft: 40,
    textAlign: "center",
    fontSize: 20,
  },
});
