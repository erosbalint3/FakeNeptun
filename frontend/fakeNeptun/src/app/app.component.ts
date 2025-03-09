import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Store } from '@ngrx/store';
import { loggedInUser$ } from './store/selectors/user.selectors';
import { SessionManagementService } from './services/session-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit{
  constructor(private store: Store, private sessionService: SessionManagementService) {
  }

  title = 'fakeNeptun';

  loggedInUser: any;

  ngOnInit(): void {
    this.loggedInUser = this.sessionService.getSession();
  }

  routeList = routes;
}
