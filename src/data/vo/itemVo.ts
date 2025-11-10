import { Product } from "./Product";
import React from "react";
import {Dimensions} from 'react-native';

export const {width} = Dimensions.get('window');

export const menuItems = [
    { icon: '🎁', label: '혜택', subcategories: ['쿠폰', '포인트', '이벤트', '세일'] },
    { icon: '👤', label: '마이페이지', subcategories: ['주문내역', '찜한상품', '리뷰관리', '배송지관리'] },
    { icon: '🚚', label: '배송', subcategories: ['배송조회', '반품/교환', '배송안내'] },
    { icon: '🔔', label: '알림', subcategories: ['재입고 알림', '세일 알림'] },
    { icon: '❓', label: '고객센터', subcategories: ['FAQ', '1:1 문의', '공지사항'] },
    { icon: '⚙️', label: '설정', subcategories: ['개인정보', '알림설정', '로그아웃'] },
  ];

  export const bannerSlides = [
    {
      title: '🎉 11월 특가 세일',
      subtitle: '최대 50% 할인 + 추가 쿠폰까지!',
      color: '#10B981'
    },
    {
      title: '💝 신규회원 특별혜택',
      subtitle: '첫 구매 시 15% 할인쿠폰 증정',
      color: '#EC4899'
    },
    {
      title: '🚚 오늘출발',
      subtitle: '오후 2시 이전 주문시 당일배송',
      color: '#3B82F6'
    }
  ];

 export const pruducts: Product[] = [
    {
      id: 1,
      name: '더마 B5 집중 세럼',
      brand: '라로슈포제',
      price: 45000,
      originalPrice: 52000,
      discount: 13,
      rating: 4.8,
      reviewCount: 2847,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      badge: '1+1',
      isBest: true
    },
    {
      id: 2,
      name: '수분 크림 100ml',
      brand: '세타필',
      price: 28000,
      rating: 4.6,
      reviewCount: 1523,
      image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 3,
      name: '선크림 SPF50+',
      brand: '닥터지',
      price: 18900,
      originalPrice: 25000,
      discount: 24,
      rating: 4.9,
      reviewCount: 4521,
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
      isBest: true
    },
    {
      id: 4,
      name: '비타민C 세럼',
      brand: '클레어스',
      price: 22000,
      rating: 4.7,
      reviewCount: 892,
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
      badge: '증정',
      isNew: true
    },
    {
      id: 5,
      name: '히알루론산 앰플',
      brand: '토리든',
      price: 15900,
      originalPrice: 19900,
      discount: 20,
      rating: 4.8,
      reviewCount: 3211,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: '딥 클렌징 오일',
      brand: 'DHC',
      price: 31000,
      rating: 4.5,
      reviewCount: 1678,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      isBest: true
    },
    {
      id: 7,
      name: '레티놀 나이트 크림',
      brand: '오디너리',
      price: 12500,
      rating: 4.6,
      reviewCount: 2134,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 8,
      name: '수딩 토너 패드',
      brand: '메디힐',
      price: 24000,
      originalPrice: 28000,
      discount: 14,
      rating: 4.7,
      reviewCount: 1845,
      image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
      badge: '한정'
    }
  ];