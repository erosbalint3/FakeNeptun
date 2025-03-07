import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NgModule } from '@angular/core';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, title: 'Home' },
  { path: 'register', component: RegisterPageComponent, title: 'Register' },
  { path: 'courses-list', component: CoursesListComponent, title: 'Courses' },
  { path: 'login', component: LoginPageComponent, title: 'Login' },
  { path: 'user-account', component: UserAccountComponent, title: 'User Account' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
