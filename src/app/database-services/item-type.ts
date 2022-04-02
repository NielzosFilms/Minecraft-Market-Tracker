export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  for_sale: boolean;
  category_id: string;
  created_at: string;
  price?: Price;
  category?: Category;
}

export interface Price {
  item_id: string;
  price: number;
  amount: number;
  bulk_price?: number;
}
