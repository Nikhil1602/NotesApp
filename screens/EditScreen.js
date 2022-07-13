import React from "react";
import Editor from "../components/Editor";
import { useSelector } from "react-redux";
import { appFile } from "../utils/container";

export const InitialContent = ({ navigation }) => {
  const data = useSelector((state) => state.app.files);
  // const size = data.length;
  const size = appFile.length;
  const currentData = appFile[size - 1];

  return <Editor file={currentData} />;
};

export const FetchContent = ({ navigation }) => {
  const id = useSelector((state) => state.app.selectedId);
  const data = useSelector((state) => state.app.files);
  const currentData = appFile[id];

  return <Editor file={currentData} />;
};
