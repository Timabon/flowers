import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhotoListComponent} from "./photo-list/photo-list.component";
import {CreatePhotoComponent} from "./create-photo/create-photo.component";
import {EditPhotoComponent} from "./edit-photo/edit-photo.component";

const routes: Routes = [
  {path: 'photos', component: PhotoListComponent},
  {path: 'create-photo', component: CreatePhotoComponent},
  {path: 'edit-photo/:id', component: EditPhotoComponent},
  {path: '', redirectTo: 'photos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
