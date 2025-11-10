// SideMenuModal.tsx

import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  Dimensions
} from 'react-native';

// MenuItem 타입 정의 (필요하다면 별도 타입 파일에서 임포트하세요)
interface MenuItem {
  icon: string;
  label: string;
  subcategories: string[];
}

// Props 인터페이스 정의
interface SideMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  menuItems: MenuItem[]; // 부모 컴포넌트에서 전달받을 데이터
}

const { width } = Dimensions.get('window');
const sideMenuWidth = width * 0.8; // 화면 너비의 80%

const SideMenuModal: React.FC<SideMenuModalProps> = ({ isVisible, onClose, menuItems }) => {
  
  // 애니메이션 설정
  const menuAnim = useRef(new Animated.Value(-sideMenuWidth)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuAnim, {
        toValue: -sideMenuWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, menuAnim]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none" // Animated API를 사용할 것이므로 none 설정
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* 모달 배경 (클릭 시 닫기) */}
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={onClose}
        />
        
        {/* 사이드 메뉴 본체 (애니메이션 적용) */}
        <Animated.View
          style={[
            styles.sideMenu,
            { transform: [{ translateX: menuAnim }] }
          ]}
        >
          <ScrollView>
            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <View style={styles.menuHeaderContent}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>👤</Text>
                </View>
                <View>
                  <Text style={styles.menuHeaderTitle}>로그인이 필요합니다</Text>
                  <Text style={styles.menuHeaderSubtitle}>로그인하고 혜택을 받으세요</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <View style={styles.menuItemHeader}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </View>
                <View style={styles.submenuContainer}>
                  {item.subcategories.map((sub, subIndex) => (
                    <TouchableOpacity key={subIndex} style={styles.submenuItem}>
                      <Text style={styles.submenuText}>{sub}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Menu Footer */}
          <View style={styles.menuFooter}>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>로그인 / 회원가입</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SideMenuModal;

// 스타일 정의 (이전 MainScreen의 styles에서 관련 스타일만 추출)
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  sideMenu: {
    position: 'absolute',
    right: 0, // 오른쪽에서 나오도록 설정
    width: sideMenuWidth,
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  menuHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userAvatarText: {
    fontSize: 20,
  },
  menuHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuHeaderSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    flex: 1,
  },
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  submenuContainer: {
    paddingLeft: 40, // 아이콘 너비만큼 들여쓰기
  },
  submenuItem: {
    paddingVertical: 8,
  },
  submenuText: {
    fontSize: 14,
    color: '#444',
  },
  menuFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
