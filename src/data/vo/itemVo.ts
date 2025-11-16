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

