import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAsync } from '../hooks/useAsync';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationService from '../navigtion/NavigationService';

/**
 * 아이템 타입 정의
 */
interface Item {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
}

/**
 * 서브 화면
 * FlatList를 사용한 리스트 표시 및 필터링 기능 제공
 * 
 * 주요 기능:
 * - 무한 스크롤 (페이지네이션)
 * - 아이템 필터링
 * - 최적화된 리스트 렌더링
 */
export default function ItemListScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [page, setPage] = useState(1);

  /**
   * 아이템 목록 로드 함수
   */
  const loadItems = useCallback(async (pageNum: number) => {
    // 데모 데이터 생성
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${pageNum}-${i}`,
      title: `아이템 ${(pageNum - 1) * 10 + i + 1}`,
      description: `페이지 ${pageNum}의 ${i + 1}번째 아이템입니다.`,
      status: ['active', 'completed', 'pending'][Math.floor(Math.random() * 3)] as any,
    }));

    return newItems;
  }, []);

  /**
   * useAsync를 사용한 데이터 로드
   */
  const { loading, execute: fetchItems } = useAsync(
    async () => loadItems(page),
    false
  );

  /**
   * 초기 데이터 로드
   */
  useEffect(() => {
    handleLoadItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * 데이터 로드 핸들러
   */
  const handleLoadItems = async () => {
    try {
      const newItems = await fetchItems();
      if (newItems) {
        setItems(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.error('Load items error:', error);
    }
  };

  /**
   * 다음 페이지 로드 (무한 스크롤)
   */
  const handleLoadMore = () => {
    if (!loading) {
      setPage(prev => prev + 1);
    }
  };

  /**
   * 페이지 변경 시 데이터 로드
   */
  useEffect(() => {
    if (page > 1) {
      handleLoadItems();
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * 필터링된 아이템 목록
   */
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  /**
   * 필터 버튼 렌더링
   */
  const renderFilterButton = (
    label: string,
    value: typeof filter,
    count: number
  ) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  /**
   * 아이템 렌더링 (최적화를 위해 useCallback 사용)
   */
  const renderItem = useCallback(({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'completed' && styles.statusCompleted,
            item.status === 'pending' && styles.statusPending,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 'active' && '진행중'}
            {item.status === 'completed' && '완료'}
            {item.status === 'pending' && '대기'}
          </Text>
        </View>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  ), []);

  /**
   * 리스트 Footer (로딩 인디케이터)
   */
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  /**
   * 빈 리스트 표시
   */
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>항목이 없습니다.</Text>
    </View>
  );

  const gotoMainScreen = () => {
    NavigationService.goBack();
    console.log("go to MainScreen");
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {/* 필터 버튼 */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={{marginRight:10}} onPress={()=> gotoMainScreen()}>
            <Text style={{fontSize:20}}>🔙</Text>
        </TouchableOpacity> 
        {renderFilterButton('전체', 'all', items.length)}
        {renderFilterButton(
          '진행중',
          'active',
          items.filter(i => i.status === 'active').length
        )}
        {renderFilterButton(
          '완료',
          'completed',
          items.filter(i => i.status === 'completed').length
        )}
      </View>

      {/* 아이템 리스트 */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        // 성능 최적화
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  statusCompleted: {
    backgroundColor: '#007AFF',
  },
  statusPending: {
    backgroundColor: '#FF9500',
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});