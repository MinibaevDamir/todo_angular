import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {SignupModule} from "./Pages/signup/signup.module";
import {AuthorizeModule} from "./Pages/authorize/authorize.module";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BackspacePipe } from './Core/pipes/backspace.pipe';
import { ProfileEditComponent } from './Pages/profileEdit/profile-edit.component';
import { HeaderComponent } from './Components/header/header.component';
import { TodoComponent } from './Pages/todo/todo.component';
import { BoolPipe } from './Core/pipes/bool.pipe';
import { DialogCreate } from './Pages/todo/todo-dialogs/todo-dialogs-create/dialog-create';
import { DialogEdit } from './Pages/todo/todo-dialogs/todo-dialogs-edit/dialog-edit';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorizeInterceptor } from './Core/interceptors/authorize.interceptor';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogDelete } from './Pages/todo/todo-dialogs/todo-dialogs-delete/dialog-delete';
import { GraphPageComponent } from './Pages/graph-page/graph-page.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    BackspacePipe,
    ProfileEditComponent,
    HeaderComponent,    
    TodoComponent,
    BoolPipe,
    DialogCreate,
    DialogDelete,
    DialogEdit,
    GraphPageComponent, 
  ],
  imports: [
    NgSelectModule,
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    SignupModule,
    AuthorizeModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxChartsModule
  ],
  providers: [
    DatePipe,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizeInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
