import React from 'react';
import {View, Text, Button} from 'react-native';
import { useStore } from '../store/Cart/CartStore';
import { shallow } from 'zustand/shallow';


const Header = () => {
  const { user, cartCount, logout } = useStore(
    (state) => ({
      user: state.user,
      cartCount: state.cartCount,
      logout: state.logout,
    }),
    //shallow 
  );

  return (
    <View>
      {user ? <Text>{user.name}님</Text> : <Text>로그인해주세요</Text>}
      <Text>장바구니 {cartCount}</Text>
      {user && <Button title="로그아웃" onPress={logout} />}
    </View>
  );
};

// 2. 장바구니에 담을 때 (한 줄!)
const AddToCartButton = () => {
  const increaseCart = useStore((state) => state.increaseCart);

  return <Button title="담기" onPress={() => increaseCart()} />;
};

// 3. 로딩 상태 전역 제어 (API 호출 시)
const login = async () => {
  useStore.getState().setLoading(true);
  //await api.login();
  useStore.getState().setUser({ id: '123', name: '김올영' });
  useStore.getState().setLoading(false);
};