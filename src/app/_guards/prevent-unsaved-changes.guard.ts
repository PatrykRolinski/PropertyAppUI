import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyEditComponent } from '../Properties/property-edit/property-edit/property-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: PropertyEditComponent
   ): boolean{
     if(component.editForm.dirty){
        return confirm("Are you soure you want to continue?")
     }
     return true;
   }
  }
  

