// photo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';
import {Router} from "@angular/router";




@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: any[] = []; // Initialize as an empty array

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {
    this.getPhotos();
  }
  private getPhotos(){
    this.photoService.getPhotosList().subscribe(data => {
      console.log(data);
      this.photos = data;
    })

}

  editPhoto(id: number) {
    this.router.navigate(['edit-photo', id]);
  }

  showFullDescription(photo: any) {
    photo.showFullDescription = !photo.showFullDescription;
  }


}
