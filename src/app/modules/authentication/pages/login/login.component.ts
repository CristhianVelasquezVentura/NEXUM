import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  constructor(
    private _fb: FormBuilder,
  ) {
    this.formLogin = this.getNewForm();
   }

  ngOnInit(): void {

  }

  private getNewForm(): FormGroup {
    return this._fb.group({
      'email':['', [Validators.required, Validators.email, Validators.minLength(4)]],
      'password': ['', [Validators.required]],
    });
  } 

}
