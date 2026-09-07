export type PageRoute = 'home' | 'about' | 'services' | 'menu' | 'gallery' | 'contact';
export type Theme = 'dark' | 'light';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'pasta' | 'seafood' | 'desserts' | 'beverages';
  description: string;
  price: string;
  image: string;
  isFeatured?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  pairing?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  content: string;
  avatar: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  capacity?: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'culinary' | 'interior' | 'chef' | 'experience';
  caption: string;
  image: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface ReservationData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingZone?: string;
  specialRequest?: string;
  status?: 'confirmed' | 'pending';
  createdAt?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  message: string;
}
