import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MonitoringComponent } from './Components/monitoring/monitoring.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CheckLoginGuard } from './Guards/check-login.guard';
import { NotLoggedInGuard } from './Guards/not-logged-in.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent, canActivate:[NotLoggedInGuard]},
  { path: 'monitoring', component: MonitoringComponent, canActivate:[CheckLoginGuard]},
  { path: 'settings', component: SettingsComponent, canActivate:[CheckLoginGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireccion por default a INDEX
  // { path: '', redirectTo: 'main', pathMatch: 'full', canActivate:[CheckLoginGuard] }, // redireccion por default a INDEX
  { path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
