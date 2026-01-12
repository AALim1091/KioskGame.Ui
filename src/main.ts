import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AttractScreenComponent } from './app/components/attract-screen/attract-screen.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginScreenComponent } from './app/components/login-screen/login-screen.component';
import { GameScreenComponent } from './app/components/game-screen/game-screen.component';
import { ResultScreenComponent } from './app/components/result-screen/result-screen.component';
import { SessionExpiredScreenComponent } from './app/components/session-expired-screen/session-expired-screen.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

const routes = [
  { path: '', component: AttractScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'game/:id', component: GameScreenComponent },
  { path: 'result/:id', component: ResultScreenComponent },
  { path: 'session-expired/:id/:expirationReason', component: SessionExpiredScreenComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    })
  ]
})
.catch(err => console.error(err));

