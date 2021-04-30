import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminProjectFormComponent } from './admin/admin-project-form/admin-project-form.component';
import { AdminProjectListComponent } from './admin/admin-project-list/admin-project-list.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';

const routes: Routes = [
  {path: 'proyectos', component: ProjectListComponent},
  {path: 'proyecto/:id', component: ProjectItemComponent},
  {path: 'admin', component: AdminProjectListComponent},
  {path: 'admin/proyecto', component: AdminProjectFormComponent},
  {path: 'admin/proyecto/:id', component: AdminProjectFormComponent},
  {path: 'acerca-de', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'proyectos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
