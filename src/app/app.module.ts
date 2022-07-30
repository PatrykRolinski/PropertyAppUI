import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './Properties/property-list/property-list/property-list.component';
import { NavComponent } from './nav/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from '@angular/material/icon';
import { PropertyCardComponent } from './Properties/property-card/property-card/property-card.component'



@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    NavComponent,
    PropertyCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
