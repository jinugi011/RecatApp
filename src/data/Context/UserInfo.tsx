import React, {createContext , useContext, useState, useReducer} from "react";

interface UserInfo {
    userID: string;
    userName: string;
    isLoggedIn: boolean;
}

interface UserInfoContextType {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const defaultUserInfo: UserInfo = {
    userID: 'Guest',
    userName: '손님',
    isLoggedIn: false,
};

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserInfoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

    return (
        <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserInfoContext.Provider>
    );
}   

export const useUserInfo = (): UserInfoContextType => {
    const context = useContext(UserInfoContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};

