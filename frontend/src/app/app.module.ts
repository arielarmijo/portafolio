import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { AboutComponent } from './about/about.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { AdminProjectListComponent } from './admin/admin-project-list/admin-project-list.component';
import { AdminProjectFormComponent } from './admin/admin-project-form/admin-project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FlipCardComponent } from './common/flip-card/flip-cards.component';
import { TableComponent } from './common/table/table.component';
import { AlertComponent } from './common/alert/alert.component';
import { TagInputModule } from '@vpetrusevici/ngx-chips';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ProjectListComponent,
    ProjectItemComponent,
    AboutComponent,
    AdminProjectListComponent,
    AdminProjectFormComponent,
    LoginComponent,
    FlipCardComponent,
    TableComponent,
    AlertComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
