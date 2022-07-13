import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { RadioButton } from "react-native-paper";
import COLORS from "../assets/theme";
import { availableFonts, availableSizes } from "../utils/container";
import { fontTypes, useSampleFonts } from "../utils/container";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import { generateTable } from "../utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useFonts } from "@expo-google-fonts/dev";
import { sampleFonts } from "../utils/container";
import { ActivityIndicator } from "react-native-paper";
import CountryList from "country-list-with-dial-code-and-flag";
import { useDispatch } from "react-redux";
import { updateCode, updateCountry } from "../reducers/userData";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

const FontTypeChipset = ({ typeId, setTypeId }) => {
  const handleStyle = (index) => {
    return {
      backgroundColor: typeId === index ? COLORS.dark300 : null,
      borderColor: typeId === index ? COLORS.primary600 : COLORS.dark900,
    };
  };

  return (
    <View style={styles.chipsContainer}>
      {fontTypes.map((item, index) => {
        return (
          <Pressable key={index} style={styles.chipContainer}>
            <Chip
              selectedColor={typeId === index ? "#ffff" : null}
              style={handleStyle(index)}
              textStyle={styles.chipText}
              mode="outlined"
              onPress={() => setTypeId(index)}>
              {item}
            </Chip>
          </Pressable>
        );
      })}
    </View>
  );
};

const FilterFonts = ({ hideModal, fontId, setFontId, typeId }) => {
  const compare = (index) => {
    return fontId === index ? true : false;
  };

  const handlePress = (index) => {
    setFontId(index);
    hideModal();
  };

  const fontText = (index) => {
    return fontId === index
      ? { color: COLORS.dark300, fontFamily: sampleFonts[index], fontSize: 16 }
      : { color: COLORS.dark900, fontFamily: sampleFonts[index], fontSize: 16 };
  };

  const category = (item) => {
    if (typeId === 0) {
      return true;
    }
    return item.type === fontTypes[typeId].toLowerCase();
  };

  return availableFonts.filter(category).map((item, index) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => handlePress(item.id)}
        android_ripple={styles.ripple}
        style={styles.displayFonts}>
        <Text style={fontText(item.id)}>{item.font}</Text>
        {compare(item.id) && (
          <Ionicons name="checkmark-sharp" size={24} color={COLORS.dark300} />
        )}
      </Pressable>
    );
  });
};

const DisplayFonts = (props) => {
  return (
    <Dialog.Container visible={props.open} contentStyle={{ minHeight: 500 }}>
      <View style={styles.closeIconContainer}>
        <Ionicons
          onPress={props.hideModal}
          name="ios-close-sharp"
          size={30}
          color="black"
        />
      </View>
      <ScrollView>
        <FilterFonts
          hideModal={props.hideModal}
          fontId={props.fontId}
          setFontId={props.setFontId}
          typeId={props.typeId}
        />
      </ScrollView>
    </Dialog.Container>
  );
};

const RenderList = ({ checked, setChecked, setId }) => {
  const dispatch = useDispatch();

  const handleChange = (country, ind) => {
    setChecked(country.name);
    setId(ind);
    dispatch(updateCode(country.dialCode));
    dispatch(updateCountry(country.name));
  };

  return (
    <ScrollView style={{ height: 100 }}>
      {CountryList.map((country, index) => (
        <Pressable
          style={styles.countryCode}
          android_ripple={styles.ripple}
          key={index}
          onPress={() => handleChange(country, index)}>
          <Text>
            {country.flag} {country.name} ({country.code})
          </Text>
          <RadioButton
            onPress={() => handleChange(country, index)}
            value={country.name}
            status={checked === country.name ? "checked" : "unchecked"}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export const DialogBoxForCode = ({ show, setShow, richText, isDark }) => {
  const css = `color: ${
    isDark ? COLORS.primary600 : COLORS.dark900
  }; background-color: ${
    isDark ? "rgba(156, 15, 254, 0.2)" : "rgba(255, 238, 50, 0.3)"
  } ;`;

  const handlePress = () => {
    richText.current?.preCode(css);
    setShow({ code: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.code}>
        <Dialog.Title>Note:</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Please press enter before writing anything inside block for exit. It's
          a small bug. Hope you understand !!
        </Dialog.Description>
        <Dialog.Button label="OKAY" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForQuote = ({ show, setShow, richText, isDark }) => {
  const css = `color: ${
    isDark ? COLORS.dark300 : COLORS.dark900
  }; border-left: 6px solid ${
    isDark ? COLORS.dark300 : COLORS.primary600
  }; padding: 5px 10px; margin: 10px; background-color: ${
    isDark ? "rgba(156, 15, 254, 0.2)" : "rgba(255, 238, 50, 0.2)"
  } ;`;

  const handlePress = () => {
    richText.current?.blockQuote(css);
    setShow({ quote: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.quote}>
        <Dialog.Title>NOTE:</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Make sure to select the text and leave enter (new line character) at
          the end to exit block.
        </Dialog.Description>
        <Dialog.Button label="OKAY" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForVideo = ({ show, setShow, richText, isDark }) => {
  const [videoData, setVideoData] = useState("");
  const css = `height: 200px; width: auto; padding: 2px; border: 1px solid ${
    isDark ? COLORS.primary600 : COLORS.dark300
  };`;

  const handleCancel = () => {
    setShow({ video: false });
  };

  const handlePress = () => {
    videoData != "" && richText.current?.insertVideo(videoData, css);
    setShow({ video: false });
  };

  const handleInput = (text) => {
    setVideoData(text);
  };

  return (
    <View>
      <Dialog.Container visible={show.video}>
        <Dialog.Title>Insert Video Link</Dialog.Title>
        <Dialog.Description
          style={[styles.dialogDescription, { fontSize: 12 }]}>
          NOTE: If you'r inserting G-Drive link. Make sure to replace
          "view?usp=sharing" with "preview" at the end of url. For hint app uses
          iframe tag of html for inserting.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Paste link here..."
          value={videoData}
          onChangeText={handleInput}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForLink = ({ show, setShow, richText }) => {
  const [linkData, setLinkData] = useState({
    title: "",
    link: "",
  });

  const handlePress = () => {
    setShow({ link: false });
    richText.current?.insertLink(linkData.title, linkData.link);
  };

  const handleCancel = () => {
    setShow({ link: false });
  };

  const handleLink = (text) => {
    setLinkData({ ...linkData, link: text });
  };

  const handleTitle = (text) => {
    setLinkData({ ...linkData, title: text });
  };

  return (
    <View>
      <Dialog.Container visible={show.link}>
        <Dialog.Title>Insert Link</Dialog.Title>
        <Dialog.Input
          placeholder="Title"
          value={linkData.title}
          onChangeText={handleTitle}
        />
        <Dialog.Input
          placeholder="Paste link here..."
          value={linkData.link}
          onChangeText={handleLink}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForFontSize = ({ show, setShow, richText }) => {
  const [checked, setChecked] = useState("3");

  const handlePress = (item) => {
    setChecked(item.id);
  };

  const handleData = () => {
    richText.current?.setFontSize(checked);
    setShow({ size: false });
  };

  const handleCancel = () => {
    setShow({ size: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.size}>
        <Dialog.Title>Choose Font-size</Dialog.Title>
        <Dialog.Description
          style={[styles.dialogDescription, { fontSize: 12 }]}>
          Select text and then choose font-size (Default is 16).
        </Dialog.Description>
        <View>
          {availableSizes.map((item, index) => {
            return (
              <Pressable
                android_ripple={styles.ripple}
                key={index}
                style={styles.fontsizeContainer}
                onPress={() => handlePress(item, index)}>
                <Text style={styles.fontsizeText}>{item.size}</Text>
                <RadioButton
                  onPress={() => handlePress(item)}
                  value={item.id}
                  status={checked === item.id ? "checked" : "unchecked"}
                />
              </Pressable>
            );
          })}
        </View>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handleData} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForFontColor = ({ show, setShow, richText }) => {
  const [color, setColor] = useState("#000");

  const handlePress = () => {
    richText.current?.setForeColor(color);
    setShow({ color: false });
  };

  const handleCancel = () => {
    setShow({ color: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.color}>
        <Dialog.Title>Choose Font-color</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Select the text and then choose color. Make sure to leave space at the
          end for seperation of text.
        </Dialog.Description>
        <TriangleColorPicker
          defaultColor={color}
          onColorChange={(color) => setColor(fromHsv(color))}
          style={styles.colorPicker}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForTable = ({ show, setShow, richText }) => {
  const [tableData, setTableData] = useState({
    rows: "",
    columns: "",
  });

  const handleRows = (text) => {
    let newText = text.replace(/[^0-9]/g, "");
    setTableData({ ...tableData, rows: newText });
  };

  const handleColumns = (text) => {
    let newText = text.replace(/[^0-9]/g, "");
    setTableData({ ...tableData, columns: newText });
  };

  const handlePress = () => {
    let html = generateTable(tableData.rows, tableData.columns);
    richText.current?.insertHTML(html);
    setShow({ table: false });
  };

  const handleCancel = () => {
    setShow({ table: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.table}>
        <Dialog.Title>NOTE:</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Make sure to leave enter before you insert table. It's just for
          termination.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Rows"
          keyboardType="numeric"
          value={tableData.rows}
          onChangeText={handleRows}
        />
        <Dialog.Input
          keyboardType="numeric"
          placeholder="Columns"
          value={tableData.columns}
          onChangeText={handleColumns}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForBGColor = ({ show, setShow, richText }) => {
  const [color, setColor] = useState("#000");

  const handlePress = () => {
    richText.current?.setHiliteColor(color);
    setShow({ hilite: false });
  };

  const handleCancel = () => {
    setShow({ hilite: false });
  };

  return (
    <View>
      <Dialog.Container visible={show.hilite}>
        <Dialog.Title>Choose Background-color</Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Select the text and then choose color. Make sure to leave space at the
          end for seperation of text.
        </Dialog.Description>
        <TriangleColorPicker
          defaultColor={color}
          onColorChange={(color) => setColor(fromHsv(color))}
          style={styles.colorPicker}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxForFont = ({ show, setShow, richText }) => {
  const fontLoaded = useFonts(useSampleFonts);
  const [open, setOpen] = useState(false);
  const [fontId, setFontId] = useState(41);
  const [typeId, setTypeId] = useState(0);

  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  const handlePress = () => {
    richText.current?.setFontName(availableFonts[fontId].font);
    setShow({ font: false });
  };

  const handleCancel = () => {
    setShow({ font: false });
  };

  return (
    <View>
      {!fontLoaded ? (
        <Dialog.Container visible={show.font}>
          <ActivityIndicator
            animating={true}
            size={30}
            color={COLORS.dark300}
          />
        </Dialog.Container>
      ) : (
        <Dialog.Container visible={show.font}>
          <Dialog.Title>Choose Font</Dialog.Title>
          <Dialog.Description style={[styles.dialogDescription]}>
            Select the text and then choose font. Make sure to leave space at
            the end for seperation of text (Default Font is 'Roboto').
          </Dialog.Description>
          <FontTypeChipset typeId={typeId} setTypeId={setTypeId} />
          {open ? (
            <DisplayFonts
              fontId={fontId}
              setFontId={setFontId}
              hideModal={hideModal}
              open={open}
              typeId={typeId}
            />
          ) : (
            <Pressable
              style={styles.fontname}
              android_ripple={{ color: "grey" }}
              onPress={openModal}>
              <Text style={{ fontFamily: sampleFonts[fontId] }}>
                {availableFonts[fontId].font}
              </Text>
            </Pressable>
          )}
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handlePress} />
        </Dialog.Container>
      )}
    </View>
  );
};

export const DialogBoxForFileName = (props) => {
  const [name, setName] = useState(props.fileName);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const handleText = (text) => {
    setName(text);
  };

  const handlePress = async () => {
    props.setShow(false);
    props.setFileName(name);
  };

  const handleCancel = () => {
    props.setShow(false);
  };

  return (
    <View>
      <Dialog.Container visible={props.show}>
        <Dialog.Title>File Name</Dialog.Title>
        <Dialog.Input
          placeholder="Enter file name"
          value={name}
          onChangeText={handleText}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

export const DialogBoxCountryCode = (props) => {
  const handleCancel = () => {
    props.setShow(false);
  };

  const handlePress = () => {
    props.setShow(false);
  };

  return (
    <View>
      <Dialog.Container visible={props.show}>
        <Dialog.Title>Country Code</Dialog.Title>
        <RenderList
          checked={props.checked}
          setChecked={props.setChecked}
          setId={props.setId}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handlePress} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chipContainer: { alignContent: "space-around", margin: 3 },
  chipText: { fontSize: 12, letterSpacing: 1 },
  dialogDescription: { fontSize: 15, letterSpacing: 1, textAlign: "justify" },
  displayFonts: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  ripple: { color: "grey" },
  fontsizeContainer: { flexDirection: "row", alignItems: "center" },
  fontsizeText: { fontSize: 20, marginRight: 200, marginLeft: 10 },
  colorPicker: { height: 250, width: "100%" },
  modalContainer: { backgroundColor: "white", padding: 20, height: 500 },
  fontname: {
    padding: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    marginVertical: 20,
  },
  closeIconContainer: {
    marginTop: -30,
    alignItems: "flex-end",
  },
  countryCode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
