import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-session-expired-screen',
  standalone: true,
  templateUrl: './session-expired-screen.component.html',
  styleUrls: ['./session-expired-screen.component.scss'],
  imports: [RouterModule, ButtonModule, CardModule],
})
export class SessionExpiredScreenComponent implements OnInit {
  id = '';
  expirationReason = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.expirationReason = this.route.snapshot.paramMap.get('expirationReason') ?? '';
  }
}
