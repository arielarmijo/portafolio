import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';

const routes: Routes = [
  {path: 'proyectos', component: ProjectListComponent},
  {path: 'proyecto/:id', component: ProjectItemComponent},
  {path: 'acerca-de', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'proyectos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
