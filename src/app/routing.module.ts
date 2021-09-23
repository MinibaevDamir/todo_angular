import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthorizeComponent} from "./Pages/authorize/authorize.component";
import {SignupComponent} from "./Pages/signup/signup.component";
import {TodoComponent} from "./Pages/todo/todo.component";
import {AuthGuard} from "./Core/guards/auth.guard";
import { ProfileEditComponent } from './Pages/profileEdit/profile-edit.component';
import { GraphPageComponent } from './Pages/graph-page/graph-page.component';


const routes: Routes = [
  {path: 'login', component: AuthorizeComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'data', component: GraphPageComponent, canActivate: [AuthGuard]}

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
