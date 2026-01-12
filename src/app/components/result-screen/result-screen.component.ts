import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PrizeType } from '../../constants/enums/prize-type-enum';

@Component({
  selector: 'lib-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.scss'],
  imports: [RouterModule, ButtonModule, CardModule],
})
export class ResultScreenComponent implements OnInit {
  playerId: string = '';
  result: any = null;

  constructor(private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.playerId = id;
    this.result = history.state?.result;

    if (!this.result) {
      this.router.navigate(['/game', this.playerId]);
    }
  }

  prizeText(prize: string): string {
    switch (prize) {
      case PrizeType.NoPrize: return 'No Prize';
      case PrizeType.FreePlay5: return '$5 Free Play';
      case PrizeType.FreePlay10: return '$10 Free Play';
      case PrizeType.FoodVoucher: return 'Food Voucher';
      case PrizeType.GiftItem: return 'Gift Item';
      default: return 'Unknown Prize';
    }
  }

  continue(){
    if (this.result?.playsRemaining <= 0) {
      this.router.navigate(['/session-expired', this.playerId, 'Max daily plays used']);
    } else {
      this.router.navigate(['/game', this.playerId]);
    }
  }

}
