import { api } from './RequestService';
import { Product } from '../data/vo/Product';


// 전체 상품 목록 조회
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('상품 목록 조회 실패:', error);
    throw error;
  }
};

// 단일 상품 조회
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('상품 조회 실패:', error);
    throw error;
  }
};

// 상품 생성
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await api.post<Product>('/products', product);
    return response.data;
  } catch (error) {
    console.error('상품 생성 실패:', error);
    throw error;
  }
};

// 상품 수정
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('상품 수정 실패:', error);
    throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('상품 삭제 실패:', error);
    throw error;
  }
};