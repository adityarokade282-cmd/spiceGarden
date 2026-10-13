export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export type MenuCategory =
  | 'Starters'
  | 'North Indian'
  | 'South Indian'
  | 'Chinese'
  | 'Main Course'
  | 'Desserts'
  | 'Beverages';

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  location: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}
