import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 타입 정의 (필요한 것만!)
type State = {
  user: { id: string; name: string } | null;
  cartCount: number;
  isLoading: boolean;
};

type Actions = {
  setUser: (user: State['user']) => void;
  logout: () => void;
  increaseCart: (by?: number) => void;
  decreaseCart: () => void;
  setLoading: (loading: boolean) => void;
};

// 가장 간단한 전역 스토어 (이거 하나로 90% 해결됨)
export const useStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      // 상태
      user: null,
      cartCount: 0,
      isLoading: false,

      // 액션들 (immer 덕분에 직접 수정 가능!)
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, cartCount: 0 }),

      increaseCart: (by = 1) =>
        set((state) => {
          state.cartCount += by;
        }),

      decreaseCart: () =>
        set((state) => {
          if (state.cartCount > 0) state.cartCount -= 1;
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    })),
    {
      name: 'app-storage', // AsyncStorage에 저장될 키
      partialize: (state) => ({ user: state.user, cartCount: state.cartCount }), // isLoading은 저장 안함
    }
  )
);