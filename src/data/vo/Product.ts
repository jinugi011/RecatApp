export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    image: string;
    badge?: string;
    isNew?: boolean;
    isBest?: boolean;
    discript: string;
    isCart: boolean;
}

export function areProductsEqual(a: Product, b: Product): boolean {
    return a.id === b.id;
}

/**
 * 정렬을 위해 두 Product 객체를 비교하는 함수 (선택 사항)
 * @param a - 첫 번째 Product 객체
 * @param b - 두 번째 Product 객체
 * @returns a가 작으면 -1, 같으면 0, 크면 1
 */
export function compareProducts(a: Product, b: Product): number {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
}