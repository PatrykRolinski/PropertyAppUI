import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikeListComponent } from './likes/like-list/like-list.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { PhotoManagerComponent } from './photos/photo-manager/photo-manager.component';
import { PropertyCreateComponent } from './properties/property-create/property-create/property-create.component';
import { PropertyDetailComponent } from './Properties/property-detail/property-detail/property-detail.component';
import { PropertyEditComponent } from './Properties/property-edit/property-edit/property-edit.component';
import { PropertyListComponent } from './Properties/property-list/property-list/property-list.component';
import { UserAfterRegisterComponent } from './users/user-after-register/user-after-register/user-after-register.component';
import { UserCreatedPropertiesComponent } from './users/user-created-properties/user-created-properties/user-created-properties.component';
import { UserRegisterComponent } from './users/user-register/user-register/user-register.component';
import { VerifytestComponent } from './users/user-verify/user-verify.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
{path:'', component:UserRegisterComponent},
{path:'account/register-success', component:UserAfterRegisterComponent},
{path: 'properties', component:PropertyListComponent},
{path: 'property/:id/details', component:PropertyDetailComponent},
{path: "account/verify", component:VerifytestComponent},
{path: 'property/create', component:PropertyCreateComponent},
{path: 'property/:id/edit', component:PropertyEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
{path: "user/properties", component:UserCreatedPropertiesComponent},
{path:"account/register", component:UserRegisterComponent},
{path: "property/:id/photo-manager", component: PhotoManagerComponent},
{path: "user/likes", component:LikeListComponent},
{path: "user/messages", component:MessagesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
