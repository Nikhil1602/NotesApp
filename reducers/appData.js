import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAppLock: false,
  files: [],
  folders: [],
  selectedId: 0,
};

const appReducer = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setAppLock: (state) => {
      state.isAppLock = true;
    },
    unsetAppLock: (state) => {
      state.isAppLock = false;
    },
    addFile: (state, actions) => {
      state.files.push(actions.payload);
    },
    addFolder: (state, actions) => {
      state.folders.push(actions.payload);
    },
    removeFile: (state, actions) => {
      state.files.splice(actions.payload, 1);
    },
    removeFolder: (state, actions) => {
      state.folders.splice(actions.payload, 1);
    },
    deleteAllFiles: (state) => {
      state.files = [];
    },
    deleteAllFolders: (state) => {
      state.folders = [];
    },
    setId: (state, actions) => {
      state.selectedId = actions.payload;
    },
    updateContent: (state, actions) => {
      state.files[state.selectedId].content = actions.payload;
    },
  },
});

export const { setAppLock, unsetAppLock } = appReducer.actions;
export const { addFile, addFolder, setId } = appReducer.actions;
export const { removeFile, removeFolder } = appReducer.actions;
export const { deleteAllFiles, deleteAllFolders } = appReducer.actions;
export const { updateContent } = appReducer.actions;
export default appReducer.reducer;
