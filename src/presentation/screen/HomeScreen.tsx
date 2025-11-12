/* 메인 페이지 */
import React, { useRef, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {

    const ref = useRef(null);
    const [first, setfirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [result, setresult] = useState('');
    const [value, setValue] = useState(0);

    const resultValue = () => {
       
        const ansewer = first * second;
        const inputvalue: number = Number(value);
        setValue(inputvalue);
        
        console.log(inputvalue, ansewer);

        if(ansewer == value)
        {
           setresult('정답');   
        }else{
            setresult("땡!");
        }
        
        setfirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
   
    };    


    return(
        <SafeAreaView style={{flex:1}}>
            <View style = {homeStyles.container} >
                <Text style={homeStyles.text}>{first} 곱하기 {second}</Text>
                <View style={homeStyles.containerH}>
                   <TextInput style={homeStyles.inputbox} ref={ref} placeholder="정답을 입력!!" onChangeText={Text => setValue(Number(Text))}></TextInput> 
                   <Button  title="입력" onPress={resultValue} />
                </View>
                <Text style={homeStyles.text}>{result}</Text>
            </View>
        </SafeAreaView>
     );
}

const homeStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff",
        alignContent:'center',
    },
    containerH: {
        backgroundColor: "#fff",
        flexDirection:'row',
        height:50,

    },
    text: {
        fontSize:30,
    },
    button:{
        width:100, 
        height:50,
        borderRadius:10,
        backgroundColor:'green',
    },
    inputbox: {
        borderBlockColor:'#ccc',
        borderRadius: 10,
        borderWidth:2,
        fontSize:20, 
        height:50,
        width:200,  
        textAlign:'center',  

    },
});

export default HomeScreen;
