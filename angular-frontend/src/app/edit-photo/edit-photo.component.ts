import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../photo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Photo} from "../photo";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit{

  photo: Photo = new Photo();
  successMessage: any;

  constructor(private photoService: PhotoService,
              private router: Router,
              private route: ActivatedRoute, // Access to route parameters
              private http: HttpClient) {
  }


  ngOnInit(): void {
    const photoIdParam = this.route.snapshot.paramMap.get('id');
    const photoId = photoIdParam ? +photoIdParam : null;

    if (photoId !== null) {
      this.photoService.getPhoto(photoId).subscribe((photo) => {
        this.photo = photo;
      });
    } else {
      // Handle the case where 'id' is not present in the route parameters
      // You might want to display an error message or navigate to a different page
    }
  }


  updatePhoto() {
    this.photoService.updatePhoto(this.photo).subscribe(
      (data) => {
        console.log(data);
        this.goToPhotoList();
      },
      (error) => console.log(error)
    );
  }

  goToPhotoList(){
  this.router.navigate([`/photos`])
}

  onSubmit() {

  }

}
