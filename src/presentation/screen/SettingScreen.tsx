import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from "src/store/redux/reduxHooks";
import {
  setUserName,
  setEmail,
  toggleDarkMode,
  toggleNotifications,
  setLanguage,
  setFontsize,
  toggleAutoSave,
  resetSettings,
} from '../../store/slices/settingSlice';
import * as NavigationService from '../navigtion/NavigationService';

const SettingScreen = () => {
  // Redux에서 상태 가져오기
  const settings = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  // 로컬 입력 상태
  const [tempUserName, setTempUserName] = useState(settings.userName);
  const [tempEmail, setTempEmail] = useState(settings.email);

  // 사용자 정보 저장
  const handleSaveUserInfo = () => {
    dispatch(setUserName(tempUserName));
    dispatch(setEmail(tempEmail));
    Alert.alert('저장 완료', '사용자 정보가 저장되었습니다.');
  };

  // 설정 초기화
  const handleResetSettings = () => {
    Alert.alert(
      '설정 초기화',
      '모든 설정을 초기화하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => {
            dispatch(resetSettings());
            setTempUserName('사용자');
            setTempEmail('');
            Alert.alert('완료', '설정이 초기화되었습니다.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <Text style={styles.backButton}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* 사용자 정보 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사용자 정보</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={tempUserName}
            onChangeText={setTempUserName}
            placeholder="이름을 입력하세요"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            value={tempEmail}
            onChangeText={setTempEmail}
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveUserInfo}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* 현재 저장된 정보 표시 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>저장된 이름: {settings.userName}</Text>
        <Text style={styles.infoText}>저장된 이메일: {settings.email || '없음'}</Text>
      </View>

      {/* 앱 설정 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>앱 설정</Text>

        {/* 다크모드 */}
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>다크 모드</Text>
            <Text style={styles.settingDescription}>
              {settings.isDarkMode ? '활성화됨' : '비활성화됨'}
            </Text>
          </View>
          <Switch
              value={settings.isDarkMode}
              onValueChange={(value) => { dispatch(toggleDarkMode()); }}
            />
        </View>

        {/* 알림 */}
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>알림</Text>
            <Text style={styles.settingDescription}>
              {settings.notificationsEnabled ? '켜짐' : '꺼짐'}
            </Text>
          </View>
          <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => { dispatch(toggleNotifications()); }}
            />
        </View>

        {/* 자동 저장 */}
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>자동 저장</Text>
            <Text style={styles.settingDescription}>
              {settings.autoSave ? '활성화' : '비활성화'}
            </Text>
          </View>
          <Switch
              value={settings.autoSave}
              onValueChange={(value) => { dispatch(toggleAutoSave()); }}
            />
        </View>

        {/* 언어 선택 */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>언어</Text>
          <View style={styles.languageButtons}>
            {(['ko', 'en', 'jp'] as const).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageButton,
                  settings.language === lang && styles.languageButtonActive,
                ]}
                onPress={() => dispatch(setLanguage(lang))}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    settings.language === lang && styles.languageButtonTextActive,
                  ]}
                >
                  {lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : '日本語'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 폰트 크기 */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>폰트 크기</Text>
          <View style={styles.fontButtons}>
            {(['small', 'medium', 'large'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.fontButton,
                  settings.fontsize === size && styles.fontButtonActive,
                ]}
                onPress={() => dispatch(setFontsize(size))}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    settings.fontsize === size && styles.fontButtonTextActive,
                  ]}
                >
                  {size === 'small' ? '작게' : size === 'medium' ? '보통' : '크게'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* 초기화 버튼 */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
        <Text style={styles.resetButtonText}>설정 초기화</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 40,
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languageButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#666',
  },
  languageButtonTextActive: {
    color: '#fff',
  },
  fontButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  fontButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fontButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  fontButtonText: {
    fontSize: 14,
    color: '#666',
  },
  fontButtonTextActive: {
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;


