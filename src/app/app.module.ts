import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './Properties/property-list/property-list/property-list.component';
import { NavComponent } from './nav/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from '@angular/material/icon';
import { PropertyCardComponent } from './Properties/property-card/property-card/property-card.component';
import { VerifytestComponent } from './users/user-verify/user-verify.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailComponent } from './Properties/property-detail/property-detail/property-detail.component';
import { PropertyCreateComponent } from './properties/property-create/property-create/property-create.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TextTextareaComponent } from './_forms/text-textarea/text-textarea/text-textarea.component';
import { UserCreatedPropertiesComponent } from './users/user-created-properties/user-created-properties/user-created-properties.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { PropertyEditComponent } from './Properties/property-edit/property-edit/property-edit.component';
import { UserRegisterComponent } from './users/user-register/user-register/user-register.component';
import { UserAfterRegisterComponent } from './users/user-after-register/user-after-register/user-after-register.component';
import { PhotoManagerComponent } from './photos/photo-manager/photo-manager.component';
import {MatButtonModule} from '@angular/material/button'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { LikeListComponent } from './likes/like-list/like-list.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { MessageThreadComponent } from './messages/message-thread/message-thread.component';
import { MessageContainerComponent } from './messages/message-container/message-container.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MessageComponent } from './messages/message/message.component'
import {ScrollingModule} from '@angular/cdk/scrolling';
import { OutputComponentComponent } from './messages/message/output-component/output-component.component';



@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    NavComponent,
    PropertyCardComponent,
    VerifytestComponent,
    PropertyDetailComponent,
    PropertyCreateComponent,
    TextInputComponent,
    TextTextareaComponent,
    UserCreatedPropertiesComponent,
    PropertyEditComponent,
    UserRegisterComponent,
    UserAfterRegisterComponent,
    PhotoManagerComponent,
    LikeListComponent,
    MessagesComponent,
    MessageThreadComponent,
    MessageContainerComponent,
    MessageComponent,
    OutputComponentComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ScrollingModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
