import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { LoginComponent } from './auth/pages/login/login.component';
import { HomeComponent } from './home/pages/home/home.component';
import { CrearRolesComponent } from './administracion/pages/crear-roles/crear-roles.component';
import { CrearUsuariosComponent } from './administracion/pages/crear-usuarios/crear-usuarios.component';
import { RolesUsuariosComponent } from './administracion/pages/roles-usuarios/roles-usuarios.component';
import { ProyectosComponent } from './desarrollo/pages/proyectos/proyectos.component';
import { TareasComponent } from './desarrollo/pages/tareas/tareas.component';
import { LineabaseComponent } from './configuracion/pages/lineabase/lineabase.component';

//Guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path:'administracion/crear-roles', component:CrearRolesComponent, canActivate:[AuthGuard]},
  { path:'administracion/crear-usuarios', component:CrearUsuariosComponent, canActivate:[AuthGuard]},
  { path:'administracion/roles-usuarios', component:RolesUsuariosComponent, canActivate:[AuthGuard]},
  { path:'desarrollo/proyectos', component:ProyectosComponent, canActivate:[AuthGuard]},
  { path:'desarrollo/tareas', component:TareasComponent, canActivate:[AuthGuard]},
  { path:'configuracion/lineabase', component:LineabaseComponent, canActivate:[AuthGuard]},
  { path:'', pathMatch:'full', redirectTo:'home'},
  { path:'**', pathMatch:'full', redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
