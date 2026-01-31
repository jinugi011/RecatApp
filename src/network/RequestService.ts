// ============================================
// 1. API 설정 파일 생성
// ============================================
// src/api/config.ts

import axios from 'axios';
import { Platform } from 'react-native';

// 서버 주소 설정
const getBaseURL = () => {
  if (__DEV__) {
    // 개발 환경
    if (Platform.OS === 'android') {
      // Android 에뮬레이터: 10.0.2.2
      return 'http://192.168.0.20:8080';
    } else {
      // iOS 시뮬레이터/실제 기기
     return 'http://192.168.0.20:8080';
    }
  }
  // 프로덕션 환경
  return 'http://192.168.0.20:8080';
};

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (로깅)
api.interceptors.request.use(
  (config) => {
    console.log('📤 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ 요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 핸들링)
api.interceptors.response.use(
  (response) => {
    console.log('📥 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ 요청 시간 초과');
    } else if (error.message === 'Network Error') {
      console.error('🌐 네트워크 에러 - 서버 연결 확인 필요');
      console.error('서버 주소:', getBaseURL());
    } else if (error.response) {
      console.error('🔴 서버 에러:', error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);