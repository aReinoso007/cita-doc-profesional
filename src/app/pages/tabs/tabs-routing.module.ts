import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'cuenta',
        children: [
          {
            path: '',
            loadChildren: () => import ('../tabs/cuenta/cuenta.module').then(m=> m.CuentaPageModule)
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import ('../tabs/dashboard/dashboard.module').then(m=> m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'historial',
        children: [
          {
            path: '',
            loadChildren: () => import ('../tabs/historial/historial.module').then(m=> m.HistorialPageModule)
          }
        ]
      },
      {
        path: 'horario',
        children: [
          {
            path:'',
            loadChildren: () => import ('../tabs/horarios/horarios.module').then(m=> m.HorariosPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./detallehorario/detallehorario.module').then( m => m.DetallehorarioPageModule)
          },
          {
            path: ':id/:idReg',
            loadChildren: () => import('./addhorario/addhorario.module').then( m => m.AddhorarioPageModule)
          }
        ]

      },
      {
        path: 'clinicas',
        children: [
          {
            path:'',
            loadChildren: () => import('./addclinica/addclinica.module').then( m => m.AddclinicaPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./adddireccion/adddireccion.module').then( m => m.AdddireccionPageModule)
          }
        ]
        
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
