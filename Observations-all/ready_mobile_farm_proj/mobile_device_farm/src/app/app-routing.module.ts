import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceViewComponent } from './components/deviceView/device-view.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { DeviceDetailViewComponent } from './components/device-detail-view/device-detail-view.component';
import { DeviceScreenViewComponent } from './components/device-screen-view/device-screen-view.component';
import { DeviceListViewComponent } from './components/device-list-view/device-list-view.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EditRegisterComponent } from './components/edit-register/edit-register.component';
import { AuthGuard } from './auth/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  {
    path: 'deviceList',
    component: DeviceListComponent,
    data: { title: 'Device List' }, canActivate:[AuthGuard]
  },
  {
    path: 'deviceListView',
    component: DeviceListViewComponent,
    data: { title: 'Device List' }, canActivate:[AuthGuard]
  },
  {
    path: 'deviceDetails',
    pathMatch: 'full',
    component: DeviceDetailsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'deviceDetailView',
    pathMatch: 'full',
    component: DeviceDetailViewComponent, canActivate:[AuthGuard]
  },
  {
    path: 'deviceView',
    pathMatch: 'full',
    component: DeviceViewComponent, canActivate:[AuthGuard]
  },
  {
    path: 'deviceScreenView',
    pathMatch: 'full',
    component: DeviceScreenViewComponent, canActivate:[AuthGuard]
  },
  // {
  //   path: 'login',
  //   pathMatch: 'full',
  //   component: LoginComponent,
  // },

  { path:'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate:[AuthGuard] },
  { path: 'profileDetails', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent , canActivate:[AuthGuard] },
  { path: 'editRegister', component: EditRegisterComponent , canActivate:[AuthGuard] },
  { path: '**', component: PagenotfoundComponent, },



  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export class AppModule {}
