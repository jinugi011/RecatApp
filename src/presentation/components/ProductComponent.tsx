import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet, 
    ActivityIndicator,
    Alert
} from 'react-native';

import { Product } from '../../data/vo/Product';
import { fetchProducts } from '../../network/productApi';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>();
    const [loading, setLoading] = useState(true);

    const loadProductData = async () => {
        try{
            const response = await fetchProducts();
            setProducts(response);
        }catch(error) {
           Alert.alert('오류','상품정보룰 불러오는데 실패하였습니다.',[{text:'확인'}]);   
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        setLoading(true);
        loadProductData();
    }, []);





    return (
        <View style={{flex:1, borderRadius:12, backgroundColor:'#fff', borderWidth:1}}>
            
        </View>
    );
}


