import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { GuestComponent } from './components/guest/guest.component';
import { ReportComponent } from './components/report/report.component';
const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
  // { path: 'report', component: ReportComponent },
  // { path: ':uuid', component: HomeComponent },
  // { path: 'login', component: SigninComponent },
  // { path: 'register', component: SignupComponent },
  // { path: 'profile', component: UserProfileComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'admin-guest-041423', component: GuestComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }