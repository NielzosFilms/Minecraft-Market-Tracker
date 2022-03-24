export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  price: number;
  amount_of_items: number;
  amount_of_diamonds_per_shulker: number | null;
  category: Category | string;
  created_at: string;
}
