import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import {HttpClientModule} from "@angular/common/http";
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    CreatePhotoComponent,
    EditPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
