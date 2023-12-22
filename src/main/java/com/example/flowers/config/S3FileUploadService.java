package com.example.flowers.config;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.MultipartUpload;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
@EnableAutoConfiguration
public class S3FileUploadService {
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    private AmazonS3 s3Client;

    public S3FileUploadService(AmazonS3 s3Client){
        this.s3Client = s3Client;
    }


    public String uploadFile(MultipartFile file) {
        // Generate a unique key for the file in your S3 bucket
        String key = generateUniqueKey(file.getOriginalFilename());

        // Upload the file to Amazon S3
        try {
            s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), null));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Return the URL of the uploaded file
        return s3Client.getUrl(bucketName, key).toString();
    }

    private String generateUniqueKey(String originalFilename) {
        // Implement a logic to generate a unique key
        // This could include adding a timestamp or a random value to the original filename
        return "unique-key-" + originalFilename;
    }
}
