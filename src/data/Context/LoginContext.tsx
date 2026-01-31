import React, {createContext, useContext, useState} from "react";
import { menuItems } from "../vo/itemVo";
import LoginModal from "src/presentation/screen/LoginModal";


const LoginContext = createContext<any>(null);

export const LoginProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    const openLogin = () => setIsVisible(true);
    const closeLogin = () => setIsVisible(false);

    return (
        <LoginContext.Provider value={{ openLogin, closeLogin }}>
            {children}
            <LoginModal isVisible={isVisible} onClose={closeLogin} onLogin={function (email: string, password: string): void {
                throw new Error("Function not implemented.");
            } } />
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);