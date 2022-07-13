import { Acme_400Regular } from "@expo-google-fonts/dev";
import { AnonymousPro_400Regular } from "@expo-google-fonts/dev";
import { Bangers_400Regular } from "@expo-google-fonts/dev";
import { BreeSerif_400Regular } from "@expo-google-fonts/dev";
import { ClickerScript_400Regular } from "@expo-google-fonts/dev";
import { Comfortaa_300Light } from "@expo-google-fonts/dev";
import { Cookie_400Regular } from "@expo-google-fonts/dev";
import { CourierPrime_400Regular } from "@expo-google-fonts/dev";
import { Cousine_400Regular } from "@expo-google-fonts/dev";
import { Creepster_400Regular } from "@expo-google-fonts/dev";

import { CrimsonPro_400Regular } from "@expo-google-fonts/dev";

import { CutiveMono_400Regular } from "@expo-google-fonts/dev";
import { DancingScript_400Regular } from "@expo-google-fonts/dev";
import { EBGaramond_400Regular } from "@expo-google-fonts/dev";
import { Fascinate_400Regular } from "@expo-google-fonts/dev";
import { FascinateInline_400Regular } from "@expo-google-fonts/dev";
import { FrederickatheGreat_400Regular } from "@expo-google-fonts/dev";
import { GravitasOne_400Regular } from "@expo-google-fonts/dev";
import { GreatVibes_400Regular } from "@expo-google-fonts/dev";
import { JetBrainsMono_300Light } from "@expo-google-fonts/dev";
import { JosefinSlab_300Light } from "@expo-google-fonts/dev";
import { KaushanScript_400Regular } from "@expo-google-fonts/dev";
import { Lobster_400Regular } from "@expo-google-fonts/dev";
import { MajorMonoDisplay_400Regular } from "@expo-google-fonts/dev";
import { Merriweather_400Regular } from "@expo-google-fonts/dev";
import { Monoton_400Regular } from "@expo-google-fonts/dev";
import { Montserrat_400Regular } from "@expo-google-fonts/dev";
import { NanumGothicCoding_400Regular } from "@expo-google-fonts/dev";
import { Neuton_400Regular } from "@expo-google-fonts/dev";
import { NovaMono_400Regular } from "@expo-google-fonts/dev";
import { OpenSans_400Regular } from "@expo-google-fonts/dev";
import { Oswald_400Regular } from "@expo-google-fonts/dev";
import { Overpass_300Light } from "@expo-google-fonts/dev";
import { Pacifico_400Regular } from "@expo-google-fonts/dev";
import { PassionOne_400Regular } from "@expo-google-fonts/dev";
import { PetitFormalScript_400Regular } from "@expo-google-fonts/dev";
import { PlayfairDisplay_400Regular } from "@expo-google-fonts/dev";
import { Poppins_400Regular } from "@expo-google-fonts/dev";
import { Quicksand_300Light } from "@expo-google-fonts/dev";
import { Raleway_300Light } from "@expo-google-fonts/dev";
import { Righteous_400Regular } from "@expo-google-fonts/dev";
import { Roboto_400Regular } from "@expo-google-fonts/dev";
import { RobotoMono_200ExtraLight } from "@expo-google-fonts/dev";
import { RobotoSlab_300Light } from "@expo-google-fonts/dev";
import { Satisfy_400Regular } from "@expo-google-fonts/dev";

import { Sacramento_400Regular } from "@expo-google-fonts/dev";

import { SueEllenFrancisco_400Regular } from "@expo-google-fonts/dev";
import { SyneMono_400Regular } from "@expo-google-fonts/dev";
import { Ubuntu_400Regular } from "@expo-google-fonts/dev";
import { Ultra_400Regular } from "@expo-google-fonts/dev";
import { Unna_400Regular } from "@expo-google-fonts/dev";

import { actions } from "react-native-pell-rich-editor";

export const setActions = [
  actions.tab,
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  actions.setStrikethrough,
  actions.insertLink,
  actions.insertImage,
  actions.insertVideo,
  actions.keyboard,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.checkboxList,
  actions.undo,
  actions.redo,
  actions.insertLine,
  actions.alignLeft,
  actions.alignCenter,
  actions.alignRight,
  actions.alignFull,
  actions.setSubscript,
  actions.setSuperscript,
  actions.code,
  actions.blockquote,
  actions.fontSize,
  actions.hiliteColor,
  actions.foreColor,
  actions.fontName,
  actions.table,
  actions.heading1,
  actions.heading2,
  actions.heading3,
  actions.heading4,
  actions.heading5,
  actions.heading6,
];

export const OptionTabs = [
  {
    id: 1,
    icon: "add-circle",
    name: "Create file",
  },
  {
    id: 2,
    icon: "insert-drive-file",
    name: "Open file",
  },
  {
    id: 3,
    icon: "create-new-folder",
    name: "Create folder",
  },
  {
    id: 4,
    icon: "share",
    name: "Share",
  },
  {
    id: 5,
    icon: "feedback",
    name: "Feedback",
  },
  {
    id: 6,
    icon: "settings",
    name: "Settings",
  },
];

export const EditTabs = [
  {
    id: 1,
    icon: "save",
    name: "Save",
  },
  {
    id: 2,
    icon: "file-copy",
    name: "Save as",
  },
  {
    id: 3,
    icon: "lock",
    name: "Lock",
  },
  {
    id: 4,
    icon: "picture-as-pdf",
    name: "Export pdf",
  },
];

export const ShowDialog = {
  link: false,
  video: false,
  image: false,
  size: false,
  color: false,
  code: false,
  quote: false,
  font: false,
  hilite: false,
  table: false,
};

export const availableSizes = [
  { id: "1", size: "10" },
  { id: "2", size: "13" },
  { id: "3", size: "16" },
  { id: "4", size: "18" },
  { id: "5", size: "24" },
  { id: "6", size: "32" },
  { id: "7", size: "48" },
];

export const availableFonts = [
  { id: 0, font: "Acme", type: "sans-serif" },
  { id: 1, font: "Anonymous Pro", type: "monospace" },
  { id: 2, font: "Bangers", type: "display" },
  { id: 3, font: "Bree Serif", type: "serif" },
  { id: 4, font: "Clicker Script", type: "handwriting" },
  { id: 5, font: "Comfortaa", type: "display" },
  { id: 6, font: "Cookie", type: "handwriting" },
  { id: 7, font: "Courier Prime", type: "monospace" },
  { id: 8, font: "Cousine", type: "monospace" },
  { id: 9, font: "Creepster", type: "display" },
  { id: 10, font: "Crimson Pro", type: "serif" },
  { id: 11, font: "Cutive Mono", type: "monospace" },
  { id: 12, font: "Dancing Script", type: "handwriting" },
  { id: 13, font: "EB Garamond", type: "serif" },
  { id: 14, font: "Fascinate", type: "display" },
  { id: 15, font: "Fascinate Inline", type: "display" },
  { id: 16, font: "Fredericka the Great", type: "display" },
  { id: 17, font: "Gravitas One", type: "display" },
  { id: 18, font: "Great Vibes", type: "handwriting" },
  { id: 19, font: "JetBrains Mono", type: "monospace" },
  { id: 20, font: "Josefin Slab", type: "serif" },
  { id: 21, font: "Kaushan Script", type: "handwriting" },
  { id: 22, font: "Lobster", type: "display" },
  { id: 23, font: "Major Mono Display", type: "monospace" },
  { id: 24, font: "Merriweather", type: "serif" },
  { id: 25, font: "Monoton", type: "display" },
  { id: 26, font: "Montserrat", type: "sans-serif" },
  { id: 27, font: "Nanum Gothic Coding", type: "monospace" },
  { id: 28, font: "Neuton", type: "serif" },
  { id: 29, font: "Nova Mono", type: "monospace" },
  { id: 30, font: "Open Sans", type: "sans-serif" },
  { id: 31, font: "Oswald", type: "sans-serif" },
  { id: 32, font: "Overpass", type: "sans-serif" },
  { id: 33, font: "Pacifico", type: "handwriting" },
  { id: 34, font: "Passion One", type: "display" },
  { id: 35, font: "Petit Formal Script", type: "handwriting" },
  { id: 36, font: "Playfair Display", type: "serif" },
  { id: 37, font: "Poppins", type: "sans-serif" },
  { id: 38, font: "Quicksand", type: "sans-serif" },
  { id: 39, font: "Raleway", type: "sans-serif" },
  { id: 40, font: "Righteous", type: "display" },
  { id: 41, font: "Roboto", type: "sans-serif" },
  { id: 42, font: "Roboto Mono", type: "monospace" },
  { id: 43, font: "Roboto Slab", type: "serif" },
  { id: 44, font: "Sacramento", type: "handwriting" },
  { id: 45, font: "Satisfy", type: "handwriting" },
  { id: 46, font: "Sue Ellen Francisco", type: "handwriting" },
  { id: 47, font: "Syne Mono", type: "monospace" },
  { id: 48, font: "Ubuntu", type: "sans-serif" },
  { id: 49, font: "Ultra", type: "serif" },
  { id: 50, font: "Unna", type: "serif" },
];

export const fontTypes = [
  "All",
  "Serif",
  "Sans-serif",
  "Monospace",
  "Handwriting",
  "Display",
];

export const sampleFonts = [
  "Acme_400Regular",
  "AnonymousPro_400Regular",
  "Bangers_400Regular",
  "BreeSerif_400Regular",
  "ClickerScript_400Regular",
  "Comfortaa_300Light",
  "Cookie_400Regular",
  "CourierPrime_400Regular",
  "Cousine_400Regular",
  "Creepster_400Regular",
  "CrimsonPro_400Regular",
  "CutiveMono_400Regular",
  "DancingScript_400Regular",
  "EBGaramond_400Regular",
  "Fascinate_400Regular",
  "FascinateInline_400Regular",
  "FrederickatheGreat_400Regular",
  "GravitasOne_400Regular",
  "GreatVibes_400Regular",
  "JetBrainsMono_300Light",
  "JosefinSlab_300Light",
  "KaushanScript_400Regular",
  "Lobster_400Regular",
  "MajorMonoDisplay_400Regular",
  "Merriweather_400Regular",
  "Monoton_400Regular",
  "Montserrat_400Regular",
  "NanumGothicCoding_400Regular",
  "Neuton_400Regular",
  "NovaMono_400Regular",
  "OpenSans_400Regular",
  "Oswald_400Regular",
  "Overpass_300Light",
  "Pacifico_400Regular",
  "PassionOne_400Regular",
  "PetitFormalScript_400Regular",
  "PlayfairDisplay_400Regular",
  "Poppins_400Regular",
  "Quicksand_300Light",
  "Raleway_300Light",
  "Righteous_400Regular",
  "Roboto_400Regular",
  "RobotoMono_200ExtraLight",
  "RobotoSlab_300Light",
  "Sacramento_400Regular",
  "Satisfy_400Regular",
  "SueEllenFrancisco_400Regular",
  "SyneMono_400Regular",
  "Ubuntu_400Regular",
  "Ultra_400Regular",
  "Unna_400Regular",
];

export const useSampleFonts = {
  Acme_400Regular,
  AnonymousPro_400Regular,
  Bangers_400Regular,
  BreeSerif_400Regular,
  ClickerScript_400Regular,
  Comfortaa_300Light,
  Cookie_400Regular,
  CourierPrime_400Regular,
  Cousine_400Regular,
  Creepster_400Regular,
  CrimsonPro_400Regular,
  CutiveMono_400Regular,
  DancingScript_400Regular,
  EBGaramond_400Regular,
  Fascinate_400Regular,
  FascinateInline_400Regular,
  FrederickatheGreat_400Regular,
  GravitasOne_400Regular,
  GreatVibes_400Regular,
  JetBrainsMono_300Light,
  JosefinSlab_300Light,
  KaushanScript_400Regular,
  Lobster_400Regular,
  MajorMonoDisplay_400Regular,
  Merriweather_400Regular,
  Monoton_400Regular,
  Montserrat_400Regular,
  NanumGothicCoding_400Regular,
  Neuton_400Regular,
  NovaMono_400Regular,
  OpenSans_400Regular,
  Oswald_400Regular,
  Overpass_300Light,
  Pacifico_400Regular,
  PassionOne_400Regular,
  PetitFormalScript_400Regular,
  PlayfairDisplay_400Regular,
  Poppins_400Regular,
  Quicksand_300Light,
  Raleway_300Light,
  Righteous_400Regular,
  Roboto_400Regular,
  RobotoMono_200ExtraLight,
  RobotoSlab_300Light,
  Sacramento_400Regular,
  Satisfy_400Regular,
  SueEllenFrancisco_400Regular,
  SyneMono_400Regular,
  Ubuntu_400Regular,
  Ultra_400Regular,
  Unna_400Regular,
};

export const appFile = [];
