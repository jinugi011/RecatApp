import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { Product } from "../../data/vo/Product";

const ProductRenderItem = ({item, onPress}: {item: Product, onPress:()=>void}) => {

    return(
        <TouchableOpacity style={styles.productItemContain}>
            <Image source={{uri: item.image}} style={styles.productImage}/>
            <View style ={{padding: 12}}>
               <Text>{item.name}({item.brand})</Text> 
               <Text>{item.price}원</Text> 
               <Text>{item.discount}%</Text> 
            </View>
        </TouchableOpacity>
    );

    
};

const styles = StyleSheet.create({
    productItemContain: {
        flex:1,
        margin:8,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 2, height:20},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderBlockColor: '#111',
    },
    productImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default ProductRenderItem;