import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screen/HomeScreen';
import MainScreen from '../screen/MainScreen';


/**
 * 네비게이션 파라미터 타입 정의
 */
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Sub: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

/**
 * 인증 스택 네비게이터
 * 로그인 관련 화면들을 관리
 */
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={MainScreen} />
    </AuthStack.Navigator>
  );
}

/**
 * 메인 탭 네비게이터
 * 하단 탭 바를 통한 화면 전환
 */
function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // 라우트에 따라 아이콘 설정
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sub') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <MainTab.Screen
        name="Home"
        component={MainScreen}
        options={{ title: '홈' }}
      />
      <MainTab.Screen
        name="Sub"
        component={HomeScreen}
        options={{ title: '서브' }}
      />
      <MainTab.Screen
        name="Settings"
        component={MainScreen}
        options={{ title: '설정' }}
      />
    </MainTab.Navigator>
  );
}

/**
 * 루트 네비게이터
 * 앱의 최상위 네비게이션 구조를 정의
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* 스플래시 화면 */}
        <RootStack.Screen name="Splash" component={MainScreen} />
        
        {/* 인증 스택 */}
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        
        {/* 메인 탭 네비게이터 */}
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}