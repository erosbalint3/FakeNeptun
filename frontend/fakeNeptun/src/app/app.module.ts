import { isDevMode, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app.routes";
import { MatAnchor, MatButton } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EFFECTS, REDUCERS } from './store/store-config';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [AppComponent],
    imports: [
      HttpClientModule,
      BrowserModule,
      RegisterPageComponent,
      HomePageComponent,
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      CommonModule,
      AppRoutingModule,
      MatButton,
      MatAnchor,
      StoreModule.forRoot({
        ...REDUCERS
      }, {}),
      EffectsModule.forRoot([...EFFECTS]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      }),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
