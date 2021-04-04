import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MonitoringComponent } from './Components/monitoring/monitoring.component';
import { SensorsComponent } from './Components/sensors/sensors.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { SettingsComponent } from './Components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    MonitoringComponent,
    SensorsComponent,
    LocationsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
