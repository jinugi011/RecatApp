import React, { useState, useEffect, useMemo } from 'react';
import {View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { Product } from '../../data/vo/Product';
import TitleBar from '../components/TitileBar';
import { fetchProducts } from '../../network/productApi';
import { useMenu } from '../../data/Context/MenuContext';
import * as NavigationService from '../navigtion/NavigationService';

const MainScreen = () => {

   const [products, setProducts] = useState<Product[]>([]);
   const [filtered, setFiltered] = useState<Product[]>([]);
   const [searchTerm, setSearchTerm] = useState('');
   const { openMenu } = useMenu();
   

    const renderItemComponent = ({ item }: { item: Product }) => (
        <ProductCard item={item} 
          onPress={()=> {
            console.log("click");
            NavigationService.navigate("Product", {product:item}); 
          }
          }  
        />
   );
  
    const filterProducts = useMemo(()=>{
      if(!searchTerm || searchTerm === '') {
        setFiltered(products);
        console.log("set init" + products.length);
        return;
      }else{
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFiltered(filteredProducts);
      };
    }, [products, searchTerm]);

    const handleProductSearch = (search:string) => {
       setSearchTerm(search);
    };


   const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFiltered(data);
      console.log('✅ 상품 목록 로드 성공:', data.length, '개');
    } catch (error) {
      console.error('❌ 상품 목록 로드 실패:', error);
      Alert.alert(
        '오류',
        '상품 목록을 불러오는데 실패했습니다.\n서버 연결을 확인해주세요.',
        [{ text: '확인' }]
      );
    } finally {
      products.forEach((item, index) => {
          console.log(item.name);  
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []); // 의존성 배열이 비어 있으면 첫 렌더링 시 한 번만 실행
   

  return(
    <SafeAreaView style={{flex:1}}>
     <TitleBar menuBtnClick={()=>openMenu()} searchText={(query)=> handleProductSearch(query)}/>
     <View style={{flex:1} }>
      <FlatList
        data={filtered}              // 렌더링할 데이터
        renderItem={renderItemComponent}   // 완성된 렌더러 함수
        keyExtractor={(item) => String(item.id)}
        numColumns={2}               // 2열 레이아웃 설정
        columnWrapperStyle={styles.row} // 열 간격 설정
        contentContainerStyle={styles.listContent}
      />
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: 'space-between', // 항목들을 균등하게 배치
    marginBottom: 5,
  },
});





export default MainScreen;


