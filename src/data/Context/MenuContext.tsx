import React, {createContext, useContext, useState} from "react";
import SideMenuModal from "../../presentation/components/MenuView";
import { menuItems } from "../vo/itemVo";

const MenuContext = createContext<any>(null);

export const MenuProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const openMenu = () => setIsMenuVisible(true);
    const closeMenu = () => setIsMenuVisible(false);

    return (
        <MenuContext.Provider value={{ openMenu, closeMenu }}>
            {children}
            <SideMenuModal isVisible={isMenuVisible} onClose={closeMenu} menuItems={menuItems} />
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);