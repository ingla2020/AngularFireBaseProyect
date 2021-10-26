import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { StorageComponent } from './storage/storage.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'settings' , component: SettingsComponent},
  {path: 'cv', component: CvComponent},
  {path: 'users', component: UsersComponent},
  {path: 'storage', component: StorageComponent},
  { path: '**', component: CvComponent },
  { path: '',   redirectTo: '/cv', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
