import { View, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateCity, updateName } from "../reducers/userData";
import { updateCountry, updateEmail, updateImage } from "../reducers/userData";
import { updatePhone, updateState } from "../reducers/userData";
import CountryList from "country-list-with-dial-code-and-flag";

export const ProfileImage = ({ ThemeBorder, ThemeColor }) => {
  const image = useSelector((state) => state.userInfo.image);
  const dispatch = useDispatch();

  const imageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(updateImage(result.uri));
    }
  };

  const showImage = () => {
    return <Image source={{ uri: image }} style={style.profileImage} />;
  };

  const showIcon = () => {
    return <Ionicons name="camera" size={50} color={ThemeColor.color} />;
  };

  return (
    <Pressable
      onPress={imageHandler}
      android_ripple={{ color: ThemeColor.color, radius: 90 }}
      style={[style.imageContainer, ThemeBorder]}>
      {image ? showImage() : showIcon()}
    </Pressable>
  );
};

export const NameField = ({ InputProps }) => {
  const name = useSelector((state) => state.userInfo.name);
  const dispatch = useDispatch();

  return (
    <TextInput
      label="Name"
      value={name}
      onChangeText={(text) => dispatch(updateName(text))}
      {...InputProps}
    />
  );
};

export const MailField = ({ InputProps }) => {
  const email = useSelector((state) => state.userInfo.email);
  const dispatch = useDispatch();

  return (
    <TextInput
      label="E-mail"
      value={email}
      onChangeText={(text) => dispatch(updateEmail(text))}
      {...InputProps}
    />
  );
};

export const CodeField = ({ InputProps, showDialog, id }) => {
  return (
    <View style={style.codeField}>
      <TextInput
        label={CountryList[id].code}
        value={CountryList[id].dial_code}
        onPressIn={showDialog}
        {...InputProps}
      />
    </View>
  );
};

export const PhoneField = ({ InputProps }) => {
  const phone = useSelector((state) => state.userInfo.phone);
  const dispatch = useDispatch();

  const handleChange = (text) => {
    let newText = text.replace(/[^0-9]/g, "");
    dispatch(updatePhone(newText));
  };

  return (
    <View style={style.phoneField}>
      <TextInput
        label="Phone"
        keyboardType="numeric"
        maxLength={10}
        value={phone}
        onChangeText={handleChange}
        {...InputProps}
      />
    </View>
  );
};

export const CountryField = ({ InputProps }) => {
  const country = useSelector((state) => state.userInfo.country);
  const dispatch = useDispatch();

  const handleChange = (text) => {
    dispatch(updateCountry(text));
  };

  return (
    <TextInput
      label="Country"
      value={country}
      onChangeText={handleChange}
      {...InputProps}
    />
  );
};

export const StateField = ({ InputProps }) => {
  const state = useSelector((state) => state.userInfo.state);
  const dispatch = useDispatch();

  return (
    <TextInput
      label="State"
      value={state}
      onChangeText={(text) => dispatch(updateState(text))}
      {...InputProps}
    />
  );
};

export const CityField = ({ InputProps }) => {
  const city = useSelector((state) => state.userInfo.city);
  const dispatch = useDispatch();

  return (
    <TextInput
      label="City"
      value={city}
      onChangeText={(text) => dispatch(updateCity(text))}
      {...InputProps}
    />
  );
};

const style = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 300,
    width: 210,
    height: 210,
    padding: 5,
    marginVertical: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 300,
  },
  codeField: {
    width: "20%",
    marginRight: 15,
  },
  phoneField: {
    width: "75%",
  },
});
