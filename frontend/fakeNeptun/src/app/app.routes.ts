import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NgModule } from '@angular/core';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, title: 'Home' },
    { path: 'register', component: RegisterPageComponent, title: 'Register' },
    { path: 'courses-list', component: CoursesListComponent, title: 'Courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
