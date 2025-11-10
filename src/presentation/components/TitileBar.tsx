import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'


const TitleBar = () => {

    const [serach, setSearch] = React.useState(false);

    return (
        <View style={styles.titlecontainer}>
        <View style={styles.titlebody}>
           <TouchableOpacity style={styles.btnMenu} onPress={() => console.log('click')}>
            <Text style={styles.menuText}>☰</Text>
           </TouchableOpacity> 

            <Text style={styles.logotitle}> OLIVE YOUNG </Text>

            {/* 검색창 만들기 */}
             <TouchableOpacity style={styles.iconButton} onPress={() => setSearch(!serach)}>
                <Text style={styles.searchIcon}>🔍</Text>
             </TouchableOpacity>
           
             <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>👤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🤍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🛒</Text>
            </TouchableOpacity>
          </View>
        </View>
        { serach && (
            <TextInput style={styles.searchInput} placeholder='검색어를 입력해주세요' placeholderTextColor="#9CA3AF"/>
        )}
        </View>
    );
} ;


const styles = StyleSheet.create({
    titlecontainer: {
        height:60, // 기준 높이 100 설정
        flexDirection: 'column', // 가로 배치
        paddingHorizontal: 10, // 좌우 여백
        alignItems:'center',
    },
    searchViewContainer:{
        flex:1,
        alignItems:'flex-start',
        marginHorizontal:10,
        backgroundColor:'red',
    } ,
    titlebody: {
        height: 30, // 기준 높이 100 설정
        flexDirection: 'row', // 가로 배치
        alignItems: 'stretch', // 💡 핵심: 자식 View들이 세로로 꽉 차게 (높이 100%) 늘어남
        paddingHorizontal: 10, // 좌우 여백
    }, 
    btnMenu: {
        width: 50, // 너비 고정
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
    },
    menuText:{
        fontSize: 25,
    },
    logoContainer: {
        justifyContent: 'center', // 세로 중앙 정렬
        paddingHorizontal: 10, // 로고와 다른 요소 사이 간격

    },
    logotitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#0F0'
      
    },
    searchContainer: {
        flex: 1, // 남은 공간 모두 사용
        flexDirection: 'row', // 아이콘과 Input 가로 배치
        alignItems: 'center', // 세로 중앙 정렬
        borderRadius: 20, // 둥근 모서리
        paddingHorizontal: 10,
        marginVertical: 25, // 💡 상하 마진으로 높이 100 가운데에 배치되도록 조정
        marginHorizontal: 10,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1, // TextInput이 남은 공간 꽉 채움
        fontSize: 14,
        color: '#111827',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 8,
        borderWidth: 0.5,
        // height는 부모 stretch와 flex: 1 덕분에 별도 설정 불필요
    },
    headerIcons: {
       flexDirection: 'row',
       gap: 12,
       alignItems: 'center', // 세로 중앙 정렬
       paddingHorizontal: 5,
    },
    iconButton: {
        padding: 4,
    },
    icon: {
        fontSize: 15,
        color: '#fff',
    },
});

export default TitleBar;