import {Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {AuthChangeEvent, Session, SupabaseClient} from "@supabase/supabase-js";

export interface Profile {
  id: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  public profile: Profile = {
    id: "",
    email: "",
    username: "",
  };

  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();

    this.authChanges(() => {
      if (this.isAuthenticated()) {
        this.getProfile().then(profile => {
          this.profile = {
            id: this.getUser()?.id || "",
            email: this.getUser()?.email || "",
            username: profile.data.username,
          }
        })
      } else {
        this.profile = {
          id: "",
          email: "",
          username: "",
        }
      }
    })
  }

  public getUser() {
    return this.supabase.auth.user();
  }

  public getSession() {
    return this.supabase.auth.session();
  }

  private getProfile() {
    return this.supabase
      .from("profiles")
      .select('username')
      .eq('id', this.getUser()?.id)
      .single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  public signIn(email: string) {
    return this.supabase.auth.signIn({email});
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }

  public isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
