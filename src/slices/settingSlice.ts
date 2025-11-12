import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 설정 상태 타입 정의
export interface SettingState {
    userName: string;
    email: string;

    isDarkMode: boolean;
    notificationsEnabled: boolean;
    language: 'ko' | 'en' | 'jp';

    fontsize: 'small' | 'medium' | 'large';
    autoSave: boolean;
}

const initialState: SettingState = {
    userName: 'Guest',
    email: '',

    isDarkMode: false,
    notificationsEnabled: true,
    language: 'ko',
    fontsize: 'medium',
    autoSave: true,
};

//Redux Slice 생성 
const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
        },
        toggleNotifications(state) {
            state.notificationsEnabled = !state.notificationsEnabled;
        },
        setLanguage(state, action: PayloadAction<'ko' | 'en' | 'jp'>) {
            state.language = action.payload;
        },
        setFontsize(state, action: PayloadAction<'small' | 'medium' | 'large'>) {
            state.fontsize = action.payload;
        },
        toggleAutoSave(state) {
            state.autoSave = !state.autoSave;
        },
        // 모든 설정 초기화
        resetSettings: (state) => {
        return initialState;
        },
    },
});

export const {
    setUserName,
    setEmail,
    toggleDarkMode,
    toggleNotifications,
    setLanguage,
    setFontsize,
    toggleAutoSave,
    resetSettings,
} = settingSlice.actions;

export default settingSlice.reducer;
