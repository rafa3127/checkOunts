import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/signin']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['home/']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'check-ounts',
    loadChildren: () => import('./modules/check-ounts/check-ounts.module').then( m => m.CheckOuntsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'add-new',
    loadChildren: () => import('./modules/check-ounts/add-new/add-new.module').then( m => m.AddNewPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule),data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: 'balance',
    loadChildren: () => import('./modules/balance/balance.module').then( m => m.BalancePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
