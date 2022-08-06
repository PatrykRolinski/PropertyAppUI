import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './Properties/property-list/property-list/property-list.component';
import { VerifytestComponent } from './users/user-verify/user-verify.component';

const routes: Routes = [
{path: '', component:PropertyListComponent},
{path: "account/verify", component:VerifytestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
