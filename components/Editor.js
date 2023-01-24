import { Platform, ScrollView } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
// import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RichToolbar from "./RichToolbar";
import RichTextEditor from "./RichEditor";
import { toolbarIcons } from "../utils/functions";
import { DialogBoxForBGColor, DialogBoxForCode } from "./DialogBox";
import { DialogBoxForFontColor, DialogBoxForLink } from "./DialogBox";
import { DialogBoxForFontSize, DialogBoxForFont } from "./DialogBox";
import { DialogBoxForQuote, DialogBoxForTable } from "./DialogBox";
import { useRef, useState, useContext, createRef } from "react";
import { DialogBoxForVideo } from "./DialogBox";
import { appFile, ShowDialog } from "../utils/container";
import { Theme } from "../App";
import COLORS from "../assets/theme";
import { setActions } from "../utils/container";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setId, updateContent } from "../reducers/appData";
import { TextInput } from "react-native-paper";
import { memo } from "react";

const Editor = ({ file, navigation }) => {
  const richText = useRef();
  const { isDark } = useContext(Theme);
  const [show, setShow] = useState(ShowDialog);
  const data = useSelector((state) => state.app.files);
  const [content, setContent] = useState(file ? file.content : "");
  const [update, setUpdate] = useState(true);
  const dispatch = useDispatch();

  () => {
    richText.current?.setInitialContent(file ? file.content : "");
  };

  const theme = {
    view: {
      backgroundColor: isDark ? COLORS.dark300 : COLORS.primary600,
      opacity: 0.3,
      elevation: 5,
    },
    editor: {
      backgroundColor: isDark ? COLORS.dark600 : COLORS.primary300,
      color: isDark ? COLORS.primary600 : COLORS.dark900,
    },
    toolbar: {
      backgroundColor: isDark ? COLORS.dark900 : COLORS.primary600,
      borderColor: isDark ? COLORS.dark300 : COLORS.primary600,
      borderWidth: 1,
      height: 50,
    },
    selectedIconTint: {
      color: isDark ? COLORS.primary600 : COLORS.dark300,
    },
    iconTint: {
      color: isDark ? COLORS.dark300 : COLORS.dark900,
    },
    image: {
      border: isDark ? COLORS.primary600 : COLORS.dark300,
    },
    page: { margin: 5 },
    flex: { flex: 1 },
  };

  const css = {
    image: `height: 200px; width: auto; padding: 2px; border: 1px solid ${theme.image.border}`,
  };

  const props = {
    Dialog: { show, setShow, richText },
    Dialog2: { show, setShow, richText, isDark },
  };

  const checkBehavior = () => {
    return Platform.OS === "ios" ? "padding" : "height";
  };

  const handleEditorChange = (text) => {
    setContent(text);

    update && dispatch(setId(file.id - 1));
    update && setUpdate(false);

    dispatch(updateContent(text));
    console.log(text);
  };

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const output = "data:image/png;base64, " + result.base64;
      richText.current?.insertImage(output, css.image);
    }
  };

  return (
    <>
      <SafeAreaView style={theme.flex}>
        {show.code && <DialogBoxForCode {...props.Dialog2} />}
        {show.quote && <DialogBoxForQuote {...props.Dialog2} />}
        {show.link && <DialogBoxForLink {...props.Dialog} />}
        {show.video && <DialogBoxForVideo {...props.Dialog2} />}
        {show.size && <DialogBoxForFontSize {...props.Dialog} />}
        {show.color && <DialogBoxForFontColor {...props.Dialog} />}
        {show.hilite && <DialogBoxForBGColor {...props.Dialog} />}
        {show.table && <DialogBoxForTable {...props.Dialog} />}
        {show.font && <DialogBoxForFont {...props.Dialog} />}
        <ScrollView>
          <View style={theme.view} behavior={checkBehavior}>
            <RichTextEditor
              initialHeight={1000}
              style={theme.page}
              editorStyle={theme.editor}
              ref={richText}
              onChange={handleEditorChange}
              // initialContentHTML={file ? file.id : null}
              initialContentHTML={file ? file.content : ""}
            />
          </View>
        </ScrollView>
        <RichToolbar
          editor={richText}
          style={theme.toolbar}
          selectedIconTint={theme.selectedIconTint.color}
          iconTint={theme.iconTint.color}
          actions={setActions}
          iconMap={toolbarIcons(setShow)}
          onPressAddImage={handleImage}
          onInsertLink={() => setShow({ link: true })}
          insertVideo={() => setShow({ video: true })}
        />
      </SafeAreaView>
    </>
  );
};

export default Editor;
