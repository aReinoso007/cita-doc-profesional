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
          },
          {
            path: 'detalle',
            loadChildren: () => import('./cuentadetalle/cuentadetalle.module').then( m => m.CuentadetallePageModule)
          },
          {
            path: 'especialidades',
            children:[
              {
                path:'',
                loadChildren: () => import('./especialidaddetalle/especialidaddetalle.module').then( m => m.EspecialidaddetallePageModule)
              },
              {
                path: ':id',
                loadChildren: () => import('./subespecialidaddetalle/subespecialidaddetalle.module').then( m => m.SubespecialidaddetallePageModule)
              }
            ]
          },
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
  },
  {
    path: 'subespecialidaddetalle',
    loadChildren: () => import('./subespecialidaddetalle/subespecialidaddetalle.module').then( m => m.SubespecialidaddetallePageModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
