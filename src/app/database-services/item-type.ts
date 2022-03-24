export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  amount_per_diamond: number;
  bulk_amount_per_diamond: number | null;
  created_at: string;
}
