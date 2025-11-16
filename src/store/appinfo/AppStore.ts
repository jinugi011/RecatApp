import { create } from 'zustand';

interface AppState {
    userName : string;
    isDarkMode: boolean;
    theme: string;
}

interface AppActions {
    toggleDarkMode: () => void;
    setUserName: (by: string) => void;
    setTheme: (by: string) => void;
}

//전체 스토어 타입 정의 
type AppStore = AppState & AppActions;

export const useAppStore = create<AppState>((set, get) => ({

    userName:'guest',
    isDarkMode: false,
    theme: 'none',

    toggleDarkMode: () => set((state) => ({
        isDarkMode: !state.isDarkMode
    })),
    setUserName: (by:string) => set((state)=> ({
        userName: by
    })),
    setTheme: (by:string) => set((state) => ({
        theme: by
    }))

}));