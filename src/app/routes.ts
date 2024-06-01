import { CanMatchFn, RedirectCommand, Route, Router } from "@angular/router";
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { MovieDetailsComponent } from "./pages/movie-details/movie-details.component";
import { SearchComponent } from "./pages/search/search.component";
import { inject } from "@angular/core";
import { getAuth } from "@angular/fire/auth";

const canMatch: CanMatchFn = (()=> {        //new way of using auth guards in angular
    const router = inject(Router);
    const auth = getAuth();                 //checking if user is loggedin or not
    if(auth.currentUser){
        return true;
    }
    
    return new RedirectCommand(router.parseUrl('/login'));
})

export const routes: Route[] = [
    { 
        path: 'register',
        component: RegisterComponent,        
        ...canActivate(() => redirectLoggedInTo(['/home']))
    },
    { 
        path: 'login',
        component: LoginComponent,
        ...canActivate(() => redirectLoggedInTo(['/home']))

    },
    {
        path: 'home',
        component: HomeComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    {
        path: 'search',
        component: SearchComponent,
        ...canActivate(() => redirectUnauthorizedTo([ '/login' ]))
    },
    {
        path: 'movie/:id',
        component: MovieDetailsComponent,
        canMatch: [canMatch]
    },
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
  ]