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

// import { StateProvider, store } from "./store.js";
// import { Button, View, Text } from "react-native";
// import { useState, useContext } from "react";

// const Form = () => {
//   const globalState = useContext(store);
//   const { dispatch } = globalState;
//   const [key, setKey] = useState(1);

//   const handleFile = () => {
//     dispatch({
//       type: "ADD_FILE",
//       payload: {
//         id: key,
//         name: `Untitled-${key}`,
//         content: "",
//         date: "20/03/2022",
//         time: "03:23 PM",
//       },
//     });
//     setKey(key + 1);
//     console.log(globalState.state.files);
//   };

//   const removeFile = () => {
//     dispatch({ type: "REMOVE_FILE", payload: key });
//     setKey(key - 1);
//     console.log(globalState.state.files);
//   };

//   const handleTheme = () => {
//     dispatch({ type: "TOGGLE_THEME" });
//     console.log(globalState.state.theme);
//   };
//   return (
//     <View style={{ marginTop: 100 }}>
//       <Button title="Add File" onPress={handleFile} />
//       <Button title="Remove File" onPress={removeFile} />
//       <Button title="Toggle Theme" onPress={handleTheme} />
//       {globalState.state.files.map((item, index) => {
//         return <Text key={index}>{item.name}</Text>;
//       })}
//     </View>
//   );
// };

// export default function App() {
//   return (
//     <StateProvider>
//       <Form />
//     </StateProvider>
//   );
// }
