import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loading = false;
  public errors: string[] = [];
  public callbackMessage = "";

  constructor(private auth: AuthService, private fb: FormBuilder, private snackbar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  //@ts-ignore
  public async handleLogin(loginForm) {
    this.loading = true;
    await this.auth.signIn(loginForm.get("email").value).then((result) => {
      if(result.error?.message) {
        this.snackbar.open(result.error.message, 'X', {
          duration: 5000,
          panelClass: "snackbar-error",
        });
      } else {
        this.snackbar.open('Check your email for the login link!', 'X', {
          duration: 5000,
          panelClass: "snackbar-success",
        });
      }
    });
    this.loading = false;
  }

}
