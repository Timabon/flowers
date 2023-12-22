package com.example.flowers.photos;

import com.example.flowers.config.S3FileUploadService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class PhotoService {

    private PhotoRepository photoRepository;

    private S3FileUploadService s3FileUploadService;

    public PhotoService(PhotoRepository photoRepository, S3FileUploadService s3FileUploadService) {
        this.photoRepository = photoRepository;
        this.s3FileUploadService = s3FileUploadService;
    }

    public List<Photo> getAllPhotos(){
        return photoRepository.findAll();
    }

    public Photo createPhoto(Photo photo) {
        // Encode the text fields to UTF-8 if needed
        try {
            String encodedDescription = new String(photo.getDescription().getBytes("UTF-8"), "UTF-8");
            photo.setDescription(encodedDescription);
        } catch (UnsupportedEncodingException e) {
            // Handle encoding error, if necessary
        }

        // Upload the file to Amazon S3, get the file URL, and set it in the 'photo' entity
        String fileUrl = s3FileUploadService.uploadFile(photo.getFile());

        // Set the file URL in the 'photo' entity
        photo.setFileUrl(fileUrl);

        // Save the 'photo' entity to the database
        return photoRepository.save(photo);
    }



    public Photo getPhotoById(Long id) {
        Photo photo = photoRepository.findById(id).orElseThrow(() -> new ExpressionException("Photo doesn't exsit"));
        if (photo != null) {
            try {
                String decodedDescription = new String(photo.getDescription().getBytes("UTF-8"), "UTF-8");
                photo.setDescription(decodedDescription);
            } catch (UnsupportedEncodingException e) {
                // Handle decoding error, if necessary
            }
        }
        return photo;
    }

    public Photo updatePhoto(Long id,Photo photoDetails) {
        Photo photo1 = photoRepository.findById(photoDetails.getId()).orElseThrow(() -> new ExpressionException("Photo doesn't exsit"));
        photo1.setTitle(photoDetails.getTitle());
        photo1.setDescription(photoDetails.getDescription());
        try {
            String encodedDescription = new String(photo1.getDescription().getBytes("UTF-8"), "UTF-8");
            photo1.setDescription(encodedDescription);
        } catch (UnsupportedEncodingException e) {
            // Handle encoding error, if necessary
        }

        return photoRepository.save(photo1);
    }
}
