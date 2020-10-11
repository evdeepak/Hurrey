import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchesComponent } from './batches/batches.component';
import { InstitutesComponent } from './institutes/institutes.component';
import { SidenavComponent } from './sidenav/sidenav.component';


const routes: Routes = [

  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'batche',
        component:  BatchesComponent
      },
      {
        path: 'institutes',
        component: InstitutesComponent
      },
    ]
    },

  // {
  //   path: 'batche',
  //   component:  BatchesComponent
  // },
  // {
  //   path: 'institutes',
  //   component: InstitutesComponent
  // },
  // {
  //   path: '',
  //   redirectTo: '/batche',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: SidenavComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
