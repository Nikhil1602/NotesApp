import React from "react";
import Editor from "../components/Editor";
import { useSelector } from "react-redux";

const FetchContent = ({ navigation }) => {
  const id = useSelector((state) => state.app.selectedId);
  const data = useSelector((state) => state.app.files);
  const currentData = data[id];

  console.log("Fetch - ", currentData);

  return <Editor file={currentData} navigation={navigation} />;
};

export default React.memo(FetchContent);
