import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { KioskGameApiService } from '../../../services/kiosk-game-api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from '../../../services/unsubscribe.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
  imports: [FormsModule, ButtonModule, ReactiveFormsModule, CardModule ],
})
export class LoginScreenComponent extends UnsubscribeService  implements OnInit {
  error: string | null = null;
  loginForm!: FormGroup;

  constructor(
    private kioskGameApiService: KioskGameApiService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.buildLoginForm();
  }

  private buildLoginForm(): FormGroup {
    return new FormGroup(
      {
        id: new FormControl('', [Validators.required,]),
      }
    );
  }

  onSubmit() {
    this.login();
  }

  login(){
    const id = this.loginForm?.get('id')?.value.trim();
    if (!id) {
      this.error = 'Player ID required.';
      return;
    }

    this.kioskGameApiService
    .loginById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (response) => {
        if (!response.success || !response.data) {
          this.error = response.error ?? 'Login failed';
          return;
        }

        if (response.data.isSessionExpired || response.data.playsRemaining <= 0) {
          this.router.navigate(['/session-expired', id, 'Max daily plays used']);
          return;
        }

        this.router.navigate(['/game', id]);
      },
      error: () => this.error = 'Login failed'
    });
  }
}

//TODO: -example-below- , set up toaster msgs for server side errors
//
//  deleteAccessLevel(selectedAccessLevel: AccessLevel) {
//     this.confirmationService.confirm({
//       message: this.translate.instant(`GROUPS.CONFIRM_MESSAGE`),
//       header: this.translate.instant(`GROUPS.WARNING`),
//       icon: 'pi pi-exclamation-triangle',
//       rejectVisible: true,
//       acceptLabel: 'Yes',
//       accept: () => {
//         this.accessLevelService
//           .deleteUserAccessLevel(selectedAccessLevel.id)
//           .pipe(takeUntil(this.ngUnsubscribe))
//           .subscribe({
//             next: () => {
//               this.accessLevels = this.accessLevels.filter(
//                 (accessLevel) => accessLevel.id !== selectedAccessLevel.id,
//               );
//               this.cdr.detectChanges();
//               this.toastr.addSingle(
//                 ToastSeverityEnum.success,
//                 '',
//                 this.translate.instant(`GROUPS.DELETE_SUCCESS`, {
//                   value1: selectedAccessLevel.name,
//                 }),
//               );
//             },
//             error: () => {
//               this.toastr.addSingle(
//                 ToastSeverityEnum.error,
//                 '',
//                 this.translate.instant(`GROUPS.ERROR`),
//               );
//             },
//           });
//       },
//       reject: () => {},
//     });
//   }
// }