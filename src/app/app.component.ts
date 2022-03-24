import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {SupabaseService} from "./supabase.service";

interface Category {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  amount_per_diamond: number;
  bulk_amount_per_diamond: number | null;
  category: Category;
  created_at: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService, private supabase: SupabaseService) {}
}
