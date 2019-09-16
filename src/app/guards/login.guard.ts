import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public router: Router
   ) {}
  // tslint:disable-next-line: max-line-length
  canActivate(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      this.router.navigate(['/tabs/tab1']);
      resolve(true);
    });
  }
}
