import { Routes } from '@angular/router';
import { AuthComponent } from './core/layout/auth/auth.component';
import { BlankComponent } from './core/layout/blank/blank.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { noauthGuard } from './core/guards/noauth/noauth-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';

export const routes: Routes = [
    {path:"", redirectTo: 'home' , pathMatch:"full"},
    {path:"" , component: AuthComponent,  canActivate: [noauthGuard] , children:[
        {path:'login', component: LoginComponent},
        {path:'register', component: RegisterComponent},
    ]},
    {path:"" , component: BlankComponent , canActivate:[authGuard] , children:[
        {path:'home', component: HomeComponent },
        {path:'postDetails/:id', component: PostDetailsComponent }
    ]},
    {path:"**", component: NotfoundComponent}
];
