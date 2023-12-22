import {Component, OnInit, ViewChild} from '@angular/core';
import {Photo} from "../photo";
import {PhotoService} from "../photo.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent implements OnInit{
  @ViewChild('photoForm', { static: false }) photoForm: NgForm;
  photo: Photo = new Photo();
  successMessage: string | null = null;

  constructor(private photoService: PhotoService, private router: Router,private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  savePhoto(){
    this.photoService.createPhoto(this.photo).subscribe(data =>{
        console.log(data);
        this.goToPhotoList();
      },
      error => console.log(error));
  }

  goToPhotoList(){
    this.router.navigate([`/photos`])
  }



  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.photo.title);
    formData.append('description', this.photo.description);
    formData.append('file', this.photo.file);

    // Send the formData to your backend API for processing
    this.http.post('http://localhost:8080/api/v1/photos', formData).subscribe(
      (response) => {
        // Handle a successful response from your backend
        this.successMessage = 'Photo uploaded successfully!';
        this.photoForm.resetForm();
        console.log('Photo uploaded successfully!', response);
      },
      (error) => {
        // Handle errors from your backend or the HTTP request
        console.error('Error uploading photo:', error);
      }
    );
  }

  onFileSelected(event: any) {
    // Handle file selection and store it in this.photo.file
    const file = event.target.files[0];
    this.photo.file = file;
  }
}
