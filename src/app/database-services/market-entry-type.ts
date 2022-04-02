import {Profile} from "../auth.service";

export interface MarketEntry {
  id: string;
  amount_of_diamonds: number;
  amount: number;
  transaction_date: string;
  bulk: boolean;
  was_purchase: boolean;
  created_by: string | Profile;
  created_at: string;
}
