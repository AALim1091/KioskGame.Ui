import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface Response<T> {
  success: boolean;
  error: string | null;
  statusCode: number | null;
  data: T | null;
}

export interface PlayerStatusDto {
  playerId: string;
  playsRemaining: number;
  isSessionExpired: boolean;
  sessionExpires: string | null;
  expirationReason: string | null;
}

export enum PrizeType {
  NoPrize = 0,
  FreePlay5 = 1,
  FreePlay10 = 2,
  FoodVoucher = 3,
  GiftItem = 4
}

export interface PlayResponseDto {
  playerId: string;
  prize: PrizeType;
  playsRemaining: number;
  isSessionExpired: boolean;
  sessionExpires: string | null;
  expirationReason: string | null;
}


@Injectable({ providedIn: 'root' })
export class KioskGameApiService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private normalize(playerId: string): string {
    return (playerId ?? '').trim();
  }

  loginById(playerId: string) {
  return this.http.post<Response<PlayerStatusDto>>(
    `${this.base}/api/player/login`,
    { playerId }
  );
}

  playerStatusById(playerId: string): Observable<Response<PlayerStatusDto>> {
    const id = encodeURIComponent(this.normalize(playerId));

    return this.http.get<Response<PlayerStatusDto>>(
      `${this.base}/api/player/${id}/status`
    );
  }

 playGameById(playerId: string) {
  return this.http.post<Response<PlayResponseDto>>(
    `${this.base}/api/game/play`,
    { playerId }
  );
  
}
}
