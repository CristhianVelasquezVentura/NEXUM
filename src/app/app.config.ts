import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {routes} from "@app/app.routes";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {SignatureInterceptor} from "@app/core/services/interceptors/sign/sign.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideRouter, withHashLocation, withInMemoryScrolling} from "@angular/router";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SignatureInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes,
      withHashLocation(),
      withInMemoryScrolling({scrollPositionRestoration: 'top'})
    )
  ]
}
