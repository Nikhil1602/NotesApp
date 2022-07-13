import { StatusBar } from "expo-status-bar";
import { useState, createContext } from "react";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import Navigation from "./components/Navigation";
import store from "./store";

LogBox.ignoreAllLogs();
export const Theme = createContext();

export default function App() {
  const [isDark, setDark] = useState(false);
  const [file, setFile] = useState([]);
  const [folder, setFolder] = useState([]);
  const value = { isDark, setDark, file, setFile, folder, setFolder };

  return (
    <Provider store={store}>
      <Theme.Provider value={value}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Navigation />
      </Theme.Provider>
    </Provider>
  );
}
