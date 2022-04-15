import {Item} from "./item-type";

export interface MarketEntry {
  id: string;
  item_id: string;
  item?: Item;
  amount_of_diamonds: number;
  amount: number;
  transaction_date: Date;
  bulk: boolean;
  was_purchase: boolean;
  created_by: string;
  created_at?: string;
}

export interface MarketEntryInput {
  id: string;
  item_id: string;
  amount_of_diamonds: number;
  amount: number;
  transaction_date: Date;
  bulk: boolean;
  was_purchase: boolean;
  created_by: string;
}
