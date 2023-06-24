import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: UntypedFormGroup;
  constructor(
    private _fb: UntypedFormBuilder,
  ) {
    this.formLogin = this.getNewForm();
   }

  ngOnInit(): void {

  }

  private getNewForm(): UntypedFormGroup {
    return this._fb.group({
      'email':['', [Validators.required, Validators.email, Validators.minLength(4)]],
      'password': ['', [Validators.required]],
    });
  } 

}
