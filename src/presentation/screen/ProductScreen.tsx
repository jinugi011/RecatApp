import React from "react";
import { Text, View,Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Product } from "../../data/vo/Product";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationService from '../navigtion/NavigationService';

// 상품 상세 화면
export default function ProductScreen({route} : any){
   
    const { product} : {product: Product} = route.params;
   
    console.log(product);

    return(
       <SafeAreaView style={{flex:1}}>
        <View style={styles.titlebody}>
        <TouchableOpacity style={styles.memubar} onPress={() => NavigationService.goBack()}>
            <Text style={{fontSize:18}}>🔙</Text>
        </TouchableOpacity>
        <Text style={{fontSize:20, fontWeight:'bold'}}>{product.name}</Text>
        </View>
        <View style={styles.productbody}>
            <Image source={{uri : product.image}} style={styles.pimage}/>  
            <Text style={styles.productName}>{product.name + "  >"} </Text>
            <Text style={{fontSize:18, marginLeft:10, color:'#6b7280'}}>{product.brand}</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginLeft:10, marginTop:5}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#ef4444'}}>{product.price.toLocaleString()}원</Text>
                <Text style={{fontSize:16, color:'#9ca3af', textDecorationLine:'line-through', marginLeft:5}}>{product.originalPrice ? product.originalPrice.toLocaleString() + "원" : ','}</Text>       
                <Text style={{fontSize:16, color:'#9ca3af', marginLeft:5}}>{product.discount ? product.discount + "%" : null}</Text>
                <Text style={{fontSize:16, color:'#9ca3af', marginLeft:5}}>{product.reviewCount ? "리뷰 " + product.reviewCount + "개" : null}</Text>
            </View>
            <Text style={{fontSize:16, margin:10, lineHeight:24}}>{Array.from({length: Math.floor(product.rating)}).map((_, index) => '⭐').join('')} </Text>
            <View style={{margin:10}}>
                <Text style={{fontSize:18, fontWeight:'bold', marginBottom:5}}>상품설명</Text>
           </View>
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
    titlebody:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
       
    },
    memubar: {
        height: 20,
        alignContent: 'flex-start',
        marginLeft:10,
        alignItems:'flex-start',
        position:'absolute',
        left:0,
        top:0,
    },
     memubar2: {
        height: 20,
        alignContent: 'flex-end',
        marginLeft:10,
        alignItems:'flex-end',
        position:'absolute',
        left:0,
        top:0,
    },
    btnsize:{
        fontSize:20,
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    
    pimage: {
        flex:0.5,
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
    },
    productName:{
        fontSize:20,
        fontWeight:'bold',
        margin:10,
    },
    
});