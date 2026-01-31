import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "src/data/vo/Product";
import { enableMapSet } from 'immer';

enableMapSet();
// 설정 상태 타입 정의
export interface CartItem extends Product {
    quantity: number;
}

export interface SettingState {
    userName: string;
    email: string;

    isDarkMode: boolean;
    notificationsEnabled: boolean;
    language: 'ko' | 'en' | 'jp';

    cartProduct: CartItem[];

    fontsize: 'small' | 'medium' | 'large';
    autoSave: boolean;
}

const initialState: SettingState = {
    userName: 'Guest',
    email: '',

    cartProduct: [],
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
           const newPruduct = action.payload;

           const existingItem = state.cartProduct.find(
                (item) => item.id === newPruduct.id
           );

           if(existingItem) {
            existingItem.quantity += 1;
           }else{
            state.cartProduct.push({...newPruduct, quantity:1});
           }

        },
        deletCartProduct(state, action: PayloadAction<Product>){
            const deleteItemID = action.payload.id;

            state.cartProduct = state.cartProduct.filter(
                (product) => product.id != deleteItemID
            );
        },
        updateProductQuantity(state, action: PayloadAction<{id:number, quantity:number}>) {
            const {id, quantity} = action.payload;
            const item = state.cartProduct.find(p => p.id === id);
            if(item) {
                item.quantity = quantity;
                if(item.quantity <= 0) {
                    state.cartProduct = state.cartProduct.filter(p => p.id === id);
                }
            }
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
