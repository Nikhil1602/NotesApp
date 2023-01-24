import React from "react";
import Editor from "../components/Editor";
import { useSelector } from "react-redux";

const InitialContent = ({ navigation }) => {
  const data = useSelector((state) => state.app.files);
  const size = data.length;
  const currentData = data[size - 1];

  return <Editor file={currentData} navigation={navigation} />;
};

export default InitialContent;
