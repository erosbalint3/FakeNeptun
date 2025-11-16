import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './app.routes';
import { SessionManagementService } from './services/session-management.service';
import { Actions, ofType } from '@ngrx/effects';
import { UserActions } from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  private readonly sessionService = inject(SessionManagementService);
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);


  title = 'fakeNeptun';
  loggedInUser: any;

  ngOnInit(): void {
    this.actions$.pipe(ofType(UserActions.userLoginSuccess)).subscribe(() => this.setUser());
    this.actions$.pipe(ofType(UserActions.userChangeProfileDataSuccess)).subscribe(() => this.setUser());
    this.setUser();
  }

  setUser(): void {
    this.loggedInUser = this.sessionService.getSession();
  }

  async logOut(): Promise<void> {
    this.sessionService.endSession();
    this.setUser();
    this.router.navigate(['/', 'login']);
  }

  routeList = routes;
}
