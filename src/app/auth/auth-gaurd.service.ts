import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { AuthService } from './auth.service';
import { map, take } from '../../../node_modules/rxjs/operators';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGaurdService implements CanActivate {

    constructor(private authService: AuthService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(take(1),map(user => {
            const userAuth = !!user;
            if(userAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}