import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {LoginService} from '@app/core/services/auth/login.service';
import {UserModel} from '@app/modules/workflow/models/steps';
import {Subscription} from "rxjs";
import {Router, RouterLink} from '@angular/router';
import {ToastService} from "@app/public/services/toast/toast.service";

import {ToastComponent} from "@app/public/toast/toast.component";
import {BlockPageComponent} from "@app/core/ui";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ToastService],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ToastComponent,
    BlockPageComponent
  ],
  standalone: true
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public formLogin: FormGroup;
  public isBlockPage: boolean = false;
  public user!: UserModel;
  public isLogged: boolean = false;
  public token: string;


  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _loginService: LoginService,
    private router: Router,
    //private appStore: Store<{ app: any }>
  ) {
    this.token = '';
    this.formLogin = this._fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      'password': ['', [Validators.required]],
    });
    // todo
    /* this.subscription.add(appStore.select('app').subscribe(state => {
      this.appStore$ = state;
    })); */
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkLogin(): void {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      this.router.navigate(['send-document']).then(() => {
        this.getUserPictureProfile();
      });
    }
  }

  private getNewForm(): UntypedFormGroup {
    return this._fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      'password': ['', [Validators.required]],
    });
  }

  public login(): void {
    if (this.formLogin.invalid) {
      this._messageService.add({
        type: 'warning',
        message: 'Rellene todos los campos por favor!',
        life: 5000,
      });
      return
    }

    this.isBlockPage = true;
    this._loginService.login(this.formLogin.value).subscribe({
      next: async (resp) => {
        this.isBlockPage = false;
        if (resp.error) {
          this._messageService.add({
            type: 'error',
            message: resp.msg,
            life: 5000,
          });
          return
        }

        this.isLogged = true;
        this.token = resp.data.access_token;
        this.user = this._loginService.getUserByToke();
        //this.Store.dispatch(reloadedProfile({user: this.user}));
        const data = {
          isLogged: this.isLogged,
          token: this.token,
          user: this.user
        };
        //this.appStore.dispatch(updateSession({dataValue: data}));
        this.router.navigate(['send-document']).then(() => {
          this.getUserPictureProfile();
        });
      },
      error: (err: Error) => {
        console.error(err.message);
        this._messageService.add({
          type: 'error',
          message: 'Conexión perdida con el servidor!',
          life: 5000,
        });
        this.isBlockPage = false;
      }
    })
  }

  public getMessageEmailError(): string {
    if (this.formLogin.get('email')?.hasError('minlength')) {
      return 'El email no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.formLogin.get('email')?.hasError('required')) {
      return 'El email es requerido.';
    } else if (this.formLogin.get('email')?.hasError('email')) {
      return 'El dato ingresado no es un correo electrónico.';
    }
    return '';
  }

  public getMessagePasswordError(): string {
    if (this.formLogin.get('password')?.hasError('minLength')) {
      return 'La contraseña no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.formLogin.get('password')?.hasError('required')) {
      return 'La contraseña es requerida.';
    } else if (this.formLogin.get('password')?.hasError('maxLength')) {
      return 'La contraseña no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    return '';
  }

  public getMessageNicknameError(): string {
    if (this.formLogin.get('nickname')?.hasError('minLength')) {
      return 'El nombre de usuario no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.formLogin.get('nickname')?.hasError('required')) {
      return 'El nombre de usuario es requerido.';
    } else if (this.formLogin.get('nickname')?.hasError('maxLength')) {
      return 'El nombre de usuario no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    return '';
  }

  get nicknameField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('nickname');
  }

  get emailField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('email');
  }

  get passwordField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('password');
  }

  get nicknameFieldIsValid(): boolean {
    return this.nicknameField.touched && this.nicknameField.valid;
  }

  get emailFieldIsValid(): boolean {
    return this.nicknameField.touched && this.emailField.valid;
  }

  get passwordFieldIsValid(): boolean {
    return this.passwordField.touched && this.passwordField.valid;
  }


  private getUserPictureProfile(): void {
    this._loginService.getUserPictureProfile().subscribe(
      async (resp) => {
        console.log(resp)
        if (resp.error) {
          this._messageService.add({type: 'error', message: resp.msg, life: 5000});
        } else {
          this.user = this._loginService.getUserByToke();
          this.user.full_path_photo = resp.data;
          //this.Store.dispatch(reloadedProfile({user: this.user}));
        }
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._messageService.add({
          type: 'error',
          message: 'No se pudo obtener la foto de perfil, intente de nuevo!',
          life: 5000,
        });
      })
  }

}
