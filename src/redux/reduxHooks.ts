import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

// 커스텀 useDispatch 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 커스텀 useSelector 훅
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;