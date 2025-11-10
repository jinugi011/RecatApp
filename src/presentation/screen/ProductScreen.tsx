import React from "react";
import { Text, View,Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Product } from "../../data/vo/Product";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";


const {width, height} = Dimensions.get('window');

export default function ProductScreen({route} : any){
   
    const { product} : {product: Product} = route.params;
    const navigation = useNavigation();

    console.log(product);

    return(
       <SafeAreaView style={{flex:1}}>
        <TouchableOpacity style={styles.memubar} onPress={() => navigation.goBack()}>
            <Text style={styles.btnsize}>⏪</Text>
        </TouchableOpacity>
        <View style={styles.productbody}>
            <Image source={{uri : product.image}} style={styles.pimage}/>
        </View>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    productbody:{
        flex:1,
        margin: 10,
        borderRadius:5,
    },
    memubar: {
        height: 20,
        alignContent: 'flex-start',
        marginLeft:10,

    },
    btnsize:{
        fontSize:16,
    },
    pimage: {
        flex:1,
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
    }
    
});