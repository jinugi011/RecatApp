import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "src/data/vo/Product";
import { enableMapSet } from 'immer';

enableMapSet();
// 설정 상태 타입 정의
export interface SettingState {
    userName: string;
    email: string;

    isDarkMode: boolean;
    notificationsEnabled: boolean;
    language: 'ko' | 'en' | 'jp';

    cartProduct: Set<Product>;

    fontsize: 'small' | 'medium' | 'large';
    autoSave: boolean;
}

const initialState: SettingState = {
    userName: 'Guest',
    email: '',

    cartProduct: new Set([]),
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
        setCartProduct(state, action: PayloadAction<Product>) {
            if(Array.from(state.cartProduct).some(product => product.id == action.payload.id)) {
                 state.cartProduct.add(action.payload);  
            }
        },
        deletCartProduct(state, action: PayloadAction<Product>){
          
            const productIdToDelete = action.payload.id;
            // Set을 배열로 변환하고 ID가 일치하는 항목을 제외하고 필터링
            state.cartProduct = new Set(
                Array.from(state.cartProduct).filter(
                    product => product.id !== productIdToDelete
                )
            );
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
    setCartProduct,
    deletCartProduct,
    toggleDarkMode,
    toggleNotifications,
    setLanguage,
    setFontsize,
    toggleAutoSave,
    resetSettings,
} = settingSlice.actions;

export default settingSlice.reducer;
