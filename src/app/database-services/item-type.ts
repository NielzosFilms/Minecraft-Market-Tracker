export interface Category {
  id: string;
  name: string;
  items: ItemForSale[];
}

export interface Item {
  id: string;
  name: string;
  created_at: string;
  category: Category | string;
}

export interface ItemForSale extends Item {
  price: number;
  amount_of_items: number;
  amount_of_diamonds_per_shulker: number | null;
}
