import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UnsubscribeService } from '../../../services/unsubscribe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { finalize, takeUntil } from 'rxjs';
import { KioskGameApiService } from '../../../services/kiosk-game-api.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'lib-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  imports: [RouterModule, ButtonModule, CardModule, ProgressSpinnerModule],
})
export class GameScreenComponent extends UnsubscribeService  implements OnInit {
  playerId: string = '';
  playsRemaining = 0;

  spinning = false;
  statusText: string | null = '';
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kioskGameApiService: KioskGameApiService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.playerId = id;
    this.getPlayerStatus();
  }

  getPlayerStatus(){
    this.statusText = '';
    this.kioskGameApiService
      .playerStatusById(this.playerId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response?.data) {
            const errorMessage = response?.error ?? 'Failed to load status';
            this.error = `Status failed: ${errorMessage}`;
            return;
          }
          this.playsRemaining = response.data.playsRemaining;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = `Status failed${err?.status ? ` (HTTP ${err.status})` : ''}`;
        }
      });
  }

  spin(){
    this.statusText = 'Spinning...';
    this.spinning = true;
    this.cdr.detectChanges();

    this.kioskGameApiService
      .playGameById(this.playerId)
      .pipe(takeUntil(this.ngUnsubscribe), finalize(() => this.spinning = false))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response?.data) {
            this.statusText = '';
            this.error = `Play failed: ${response?.error}`;
            return;
          }

          const sessionExpires = response.data.sessionExpires;
          if (!sessionExpires) {
            this.router.navigate(['/']);
            return;
          }

          const expiresAt = new Date(sessionExpires).getTime();
          const now = Date.now();

          if (expiresAt <= now) {
            this.router.navigate(['/']);
            return;
          }
          const expireTimeout = expiresAt - now;

          setTimeout(() => {
            this.router.navigate(['/']);
          }, expireTimeout)

          this.router.navigate(['/result', this.playerId], {
            state: { result: response.data }
          });
        },
        error: (err) => {
          this.statusText = '';
          this.error = `Play failed${err?.status ? `${err.status}` : ''}`;
        }
      });
  }

}
