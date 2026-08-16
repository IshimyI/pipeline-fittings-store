// Shared shapes mirroring the Sequelize models on the server
// (server/db/models/*.ts) — kept minimal and matching what the client
// actually reads/writes, not a full mirror of every server-side field.

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  price: string;
  availability: number;
  params: Record<string, string> | string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BasketEntry {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  productName?: string;
  price?: string;
  size?: string;
}

export interface Order {
  id: number;
  userId: number | null;
  email: string | null;
  items: OrderItem[];
  total: string;
  status: "ожидает" | "проведен" | "отменен";
  createdAt: string;
  updatedAt: string;
  user?: { name?: string; email?: string };
}

export interface Feedback {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
  // Not actually a column on the server's Feedback model — the admin UI
  // filters/badges on it anyway, so it's always undefined in practice.
  // Kept optional here rather than invented, to match real behavior.
  status?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Companie {
  id: number;
  name: string;
  imgSrc: string;
}

export interface Info {
  id: number;
  title: string | null;
  content: string | null;
  actions: string | null;
  company_first: string | null;
  company_second: string | null;
  section: string;
}
