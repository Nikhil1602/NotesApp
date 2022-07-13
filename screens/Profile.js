import { View, StyleSheet, Text } from "react-native";
import { ScrollView, Pressable } from "react-native";
import React, { useContext } from "react";
import { CityField, CodeField } from "../components/ProfileData";
import { CountryField, MailField } from "../components/ProfileData";
import { NameField, StateField } from "../components/ProfileData";
import { PhoneField, ProfileImage } from "../components/ProfileData";
import COLORS from "../assets/theme";
import { Theme } from "../App";
import { Button, Dialog, Portal } from "react-native-paper";
import { Provider, RadioButton } from "react-native-paper";
import CountryList from "country-list-with-dial-code-and-flag";
import { useDispatch } from "react-redux";
import { updateCode, updateCountry } from "../reducers/userData";
import { DialogBoxCountryCode } from "../components/DialogBox";

export default function Profile({ navigation }) {
  const { isDark } = useContext(Theme);
  const [show, setShow] = React.useState(false);
  const [checked, setChecked] = React.useState("India");
  const [id, setId] = React.useState(96);
  const dispatch = useDispatch();

  const showDialog = () => setShow(true);
  const hideDialog = () => setShow(false);

  const ThemeColor = {
    color: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  const inputColor = {
    color: isDark ? COLORS.dark600 : COLORS.primary300,
  };

  const ThemeBorder = {
    borderColor: isDark ? COLORS.primary600 : COLORS.dark900,
  };

  const InputProps = {
    mode: "outlined",
    selectionColor: ThemeColor.color,
    outlineColor: ThemeColor.color,
    activeOutlineColor: ThemeColor.color,
    underlineColor: ThemeColor.color,
    activeUnderlineColor: ThemeColor.color,
    style: { marginBottom: 7, backgroundColor: inputColor.color },
    theme: {
      colors: { text: ThemeColor.color, placeholder: ThemeColor.color },
    },
  };

  const propsDialog = {
    id,
    setId,
    checked,
    setChecked,
    showDialog,
    hideDialog,
  };

  const radioTheme = {
    colors: { accent: ThemeColor.color },
  };

  const handleChange = (country, ind) => {
    setChecked(country.name);
    setId(ind);
    dispatch(updateCode(country.dialCode));
    dispatch(updateCountry(country.name));
  };

  const RenderDialogData = () => {
    return (
      <ScrollView style={{ height: 300 }}>
        {CountryList.map((country, index) => (
          <Pressable
            android_ripple={ThemeColor}
            key={index}
            style={style.radioButton}
            onPress={() => handleChange(country, index)}>
            <RadioButton
              uncheckedColor={ThemeColor.color}
              theme={radioTheme}
              value={country.name}
              status={checked === country.name ? "checked" : "unchecked"}
            />
            <Text style={{ color: ThemeColor.color }}>
              {country.flag} {country.name} ({country.code})
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  return show ? (
    <DialogBoxCountryCode
      checked={checked}
      setChecked={setChecked}
      setId={setId}
      show={show}
      setShow={setShow}
    />
  ) : (
    <ScrollView>
      {
        <View style={style.container}>
          <ProfileImage ThemeBorder={ThemeBorder} ThemeColor={ThemeColor} />
          <View style={style.inputFields}>
            <NameField InputProps={InputProps} />
            <MailField InputProps={InputProps} />
            <View style={style.numberField}>
              <CodeField
                InputProps={InputProps}
                showDialog={showDialog}
                id={id}
              />
              <PhoneField InputProps={InputProps} />
            </View>
            <CountryField InputProps={InputProps} />
            <StateField InputProps={InputProps} />
            <CityField InputProps={InputProps} />
          </View>
        </View>
      }
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputFields: {
    width: "90%",
  },
  numberField: {
    flexDirection: "row",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
