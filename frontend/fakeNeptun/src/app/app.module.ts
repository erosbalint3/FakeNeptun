import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app.routes";

@NgModule({
    declarations: [AppComponent],
    imports: [HttpClientModule, BrowserModule, RegisterPageComponent, HomePageComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule,AppRoutingModule],
    bootstrap: [AppComponent]
})
export class AppModule {}