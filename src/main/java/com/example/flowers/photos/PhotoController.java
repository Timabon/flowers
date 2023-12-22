package com.example.flowers.photos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/")
public class PhotoController {

    private PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping("/photos")
    public List<Photo> getAllPhotos() {
        return photoService.getAllPhotos();
    }

    @GetMapping("/photos/{id}")
    public Photo getOnePhoto(@PathVariable Long id) {
        return photoService.getPhotoById(id);
    }

    @PostMapping("/photos")
    public Photo createPhoto(
            @RequestPart("file") MultipartFile file,
            @RequestPart("title") String title,
            @RequestPart("description") String description
    ) {
        Photo photo = new Photo();
        photo.setTitle(title);
        photo.setDescription(description);
        photo.setFile(file);

        // Save the photo entity, including the file data
        return photoService.createPhoto(photo);
    }

    @PutMapping("/photos/{id}")
    public Photo updatePhoto(@PathVariable Long id, @RequestBody Photo photoDetails) {
        return photoService.updatePhoto(id, photoDetails);
    }


}
