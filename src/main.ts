import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { firebaseConfig } from "./firebase-config";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),  // withComponentInputBinding() is important to get input binding of params
    provideAnimationsAsync()
  ]
});
