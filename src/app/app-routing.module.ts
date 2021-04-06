import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MenuComponent } from './Components/menu/menu.component';
import { SensorsComponent } from './Components/sensors/sensors.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { MonitoringComponent } from './Components/monitoring/monitoring.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'main', component: MainComponent},
  { path: 'sensors', component: SensorsComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'monitoring/:location', component: MonitoringComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireccion por default a INDEX
  { path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
