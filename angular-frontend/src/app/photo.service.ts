import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "./photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private baseURL = "http://localhost:8080/api/v1/photos";


  constructor(private httpClient: HttpClient) {

  }

  getPhotosList(): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(`${this.baseURL}`);

  }

  createPhoto(photo: Photo): Observable<Photo> {
    // Send the 'photo' object to your backend API for photo upload
    return this.httpClient.post<Photo>(`${this.baseURL}`, photo);
  }


  getPhoto(photoId: number) {
     const url = `${this.baseURL}/${photoId}`;
     return this.httpClient.get<Photo>(url);
  }


  updatePhoto(photo: Photo): Observable<Photo> {
    const url = `${this.baseURL}/${photo.id}`; // Assuming your Photo object has an 'id' property
    return this.httpClient.put<Photo>(url, photo);
  }
}
