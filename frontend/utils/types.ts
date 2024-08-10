export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    products: Product[];
    cartItems: CartItem[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    discount?: number;
    images: Image[];
    isFeatured: boolean;
    isArchived: boolean;
    categoryId: string;
    category: Category;
    sizeId: string;
    size: Size;
    colorId: string;
    color: Color;
    sellerId: string;
    seller: User;
    createdAt: Date;
    updatedAt: Date;
    cartItems: CartItem[];
  }
  
  export interface CartItem {
    id: string;
    quantity: number;
    productId: string;
    product: Product;
    userId: string;
    user: User;
  }
  
  export interface Category {
    id: string;
    products: Product[];
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Size {
    id: string;
    products: Product[];
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Color {
    id: string;
    products: Product[];
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Image {
    id: string;
    productId: string;
    product: Product;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  enum Role {
    SELLER = 'SELLER',
    BUYER = 'BUYER',
  }