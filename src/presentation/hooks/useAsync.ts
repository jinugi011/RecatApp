import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * 비동기 작업의 상태를 나타내는 타입
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * useAsync 훅의 반환 타입
 */
export interface UseAsyncReturn<T, Args extends any[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
}

/**
 * 비동기 작업을 관리하는 커스텀 훅
 * 로딩, 에러, 데이터 상태를 자동으로 관리
 * 
 * @param asyncFunction 실행할 비동기 함수
 * @param immediate 즉시 실행 여부 (기본값: false)
 * @returns 비동기 작업의 상태와 실행 함수
 */
export function useAsync<T, Args extends any[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate: boolean = false
): UseAsyncReturn<T, Args> {
  // 컴포넌트 마운트 상태 추적 (메모리 누수 방지)
  const isMountedRef = useRef(true);

  // 비동기 작업 상태
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  /**
   * 비동기 함수 실행
   */
  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await asyncFunction(...args);

        // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
        if (isMountedRef.current) {
          setState({ data: response, loading: false, error: null });
        }

        return response;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));

        if (isMountedRef.current) {
          setState({ data: null, loading: false, error: errorObj });
        }

        // 에러를 다시 throw하여 호출하는 쪽에서도 처리 가능하게 함
        throw errorObj;
      }
    },
    [asyncFunction]
  );

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  /**
   * 컴포넌트 마운트 시 즉시 실행
   */
  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as Args));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * 컴포넌트 언마운트 시 플래그 설정
   * 메모리 누수 방지
   */
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}