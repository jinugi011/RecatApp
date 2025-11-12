import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

//화면 이동 함수 

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-ignore - React Navigation의 타입 시스템 제약으로 인한 우회
    navigationRef.navigate(name, params);
  }
}

//뒤로 가기 함수 
export function goBack(){
    if(navigationRef.isReady() && navigationRef.canGoBack()){
        navigationRef.goBack();
    }
}

// 네비게이션 스택 초기화 및 특정화면으로 이동 
export function reset<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {    
        navigationRef.reset({
            index: 0,
            routes: [{ name, params }],
        });
    }
  }

//특정화면을 스택에 푸시
export function push<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  //화면이름 가져오기
  export function getCurrentRouteName(): keyof RootStackParamList | undefined {
    if (navigationRef.isReady()) {
      const route = navigationRef.getCurrentRoute();
      return route?.name as keyof RootStackParamList | undefined;
    }
  }

  //스택의 최상단으로 이동 
  export function popToTop() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.popToTop());
    }
  } 

  // N개의 화면을 뒤로 가기 하기 
  export function pop(count: number = 1) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.pop(count));
    }
  } 
