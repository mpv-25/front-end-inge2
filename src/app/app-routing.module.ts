import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearRolesComponent } from './administracion/pages/crear-roles/crear-roles.component';
import { CrearUsuariosComponent } from './administracion/pages/crear-usuarios/crear-usuarios.component';
import { RolesUsuariosComponent } from './administracion/pages/roles-usuarios/roles-usuarios.component';
//Componentes
import { LoginComponent } from './auth/pages/login/login.component';
import { HomeComponent } from './home/pages/home/home.component';
//Guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path:'administracion/crear-roles', component:CrearRolesComponent, canActivate:[AuthGuard]},
  { path:'administracion/crear-usuarios', component:CrearUsuariosComponent, canActivate:[AuthGuard]},
  { path:'administracion/roles-usuarios', component:RolesUsuariosComponent, canActivate:[AuthGuard]},
  {path:'', pathMatch:'full', redirectTo:'home'},
  { path:'**', pathMatch:'full', redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
