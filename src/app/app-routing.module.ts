import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MenuComponent } from '../../../../../Aplicaciones Web para I4.0/PRACTICAS/Proyecto-Equipo4/src/app/Components/menu/menu.component';
import { SensorsComponent } from './Components/sensors/sensors.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { MonitoringComponent } from './Components/monitoring/monitoring.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'sensors/:id?', component: SensorsComponent},
  { path: 'locations/:name?', component: LocationsComponent},
  { path: 'monitoring/:location', component: MonitoringComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
