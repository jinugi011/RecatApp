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
}
