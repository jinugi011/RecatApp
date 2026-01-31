import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, 
    TouchableOpacity, 
    Modal, 
    StyleSheet, 
    Animated,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface loginProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin:(email:string, password: string) => void;
}

const { height } = Dimensions.get('window');
const sideMenuheight = height * 0.8; // 화면 너비의 80%


const LoginModal:React.FC<loginProps> = ({isVisible, onClose, onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(300));

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
            >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         

      
        </TouchableWithoutFeedback>
        </Modal>
    );
};

const sytles = StyleSheet.create({
    overlay:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    backdrop:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdropTouchable:{
        flex:1,
    },
    keyboardview:{
        width:'100%',
        justifyContent:'center',
        alignItems: 'center'
    },
});

export default LoginModal;