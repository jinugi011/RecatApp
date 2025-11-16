import * as React from 'react';
import { TouchableOpacity, 
    Image, 
    View,
    Text,
    StyleSheet,
    Dimensions} from 'react-native';
import { Product } from '../../data/vo/Product';    
import { useAppDispatch, useAppSelector } from "src/store/redux/reduxHooks";
import {
  setCartProduct,
  deletCartProduct
} from '../../store/slices/settingSlice';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2; // 필요하다면 여기서 다시 계산
 
const ProductCard = ({item, onPress}: {item: Product; onPress: () => void}) => {

   const [likeProducts, setlikeProducts] = React.useState<Set<number>>(new Set());
   const [cartProducts, setCartProducts] = React.useState<Set<number>>(new Set());

   const settings = useAppSelector((state) => state.setting);
   const dispatch = useAppDispatch();
   
   const setCartInfo = (isCart:boolean) => {
      if(isCart == true) {
        dispatch(setCartProduct(item));
      }
   };

   const remveCart = (isCart: boolean) => {
      if(isCart == true) {
        dispatch(deletCartProduct(item));
      }
   };


   const toggleLike = (productID:number) => {
        setlikeProducts(prev => {
            const newSet = new Set(prev);
            if(newSet.has(productID)){
                newSet.delete(productID);
            }else{
                newSet.add(productID);
            }

            return newSet;
        });
        
    };

    const toggleCart = (ProductID:number) => {
      setCartProducts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(ProductID)) {
          newSet.delete(ProductID)
          setCartInfo(true);
        }else{
          newSet.add(ProductID);
          remveCart(true);
        }
        return newSet;
      });
    };

    
    return (
    <TouchableOpacity style={styles.productCard} onPress={() => onPress()}>
        <View style={styles.imageContainer}>
            <Image source={{uri: item.image}} style={styles.productImage}/>
                <View style={styles.badageContainer} > 
                    {item.isBest && (
                       <View style={[styles.badge, {backgroundColor:'#f97316'}]}>   
                          <Text style={styles.badgeText}>BEST</Text>
                       </View>   
                    )}
                    {item.isNew && (
                        <View style={[styles.badge, {backgroundColor:'#10b981'}]}>
                            <Text style={styles.badgeText}>NEW</Text>
                        </View>
                    )}
                    {item.badge && (
                        <View style={[styles.badge, {backgroundColor:'#ef4444'}]}>
                            <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                    )}
                </View>
                {/*like button*/}   
               <TouchableOpacity
                    style={styles.likeButton} onPress={() => toggleLike(item.id)}>
                    <Text style={styles.likeIcon}>{likeProducts.has(item.id) ? '❤️' : '🤍'}</Text>     
                </TouchableOpacity>       

                 <TouchableOpacity
                    style={styles.cartButton} onPress={() => toggleCart(item.id)}>
                    <Text style={styles.cartIcon}>{cartProducts.has(item.id) ? '🛒' : '👑'}</Text>     
                </TouchableOpacity>     


                <View style={styles.productInfo}>
                     <Text style={styles.brandText}>{item.brand}</Text>   
                     <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>

                     <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.reviewText}>{item.rating}</Text>
                        <Text style={styles.reviewText}>({item.reviewCount.toLocaleString()})</Text>
                     </View>

                     <View style={[styles.priceContainer,{marginLeft:5}]}>
                        {item.discount && (
                             <Text style={styles.discountText}>{item.discount}%</Text>
                        )}
                        <Text style={styles.priceText}>{item.price.toLocaleString()}원</Text>
                        {item.originalPrice ? (
                        <Text style={styles.originalPriceText}>
                            {item.originalPrice.toLocaleString()}원
                        </Text>
                      ) : <Text style={styles.originalPriceText}></Text>}
                     </View>
                </View>    

        </View>

    </TouchableOpacity>
    );
};   




const styles = StyleSheet.create({
    productCard: {
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
    imageContainer:{
        position: 'relative',
        marginBottom: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F9FAFB',
    },
    productImage: {
        width: '100%',
        aspectRatio:1,
    },
    badageContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        gap: 4,
        padding:5,

    },
      badgeContainer: {
      position: 'absolute',
      top: 8,
      left: 8,
      gap: 4,
      padding:5,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 5,
    },
    likeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        backgroundColor: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
  },
  cartButton: {
      position: 'absolute',
      top: 48,
      right: 8,
      width: 32,
      height: 32,
      backgroundColor: '#fff',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  likeIcon: {
    fontSize: 16,
  },
  cartIcon: {
    fontSize: 16,
  },
  productInfo: {
    gap: 4,
  },
  brandText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  productName: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starIcon: {
    fontSize: 11,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  reviewText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
   originalPriceText: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
    

});


export default ProductCard;