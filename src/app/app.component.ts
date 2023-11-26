import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastComponent} from "@app/public/toast/toast.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, ToastComponent]
})
export class AppComponent {
  title = 'nexum-sign-app';
}
