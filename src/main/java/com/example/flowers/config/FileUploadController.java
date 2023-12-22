package com.example.flowers.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/")
public class FileUploadController {
    private final S3FileUploadService uploadService;
    @Autowired
    public FileUploadController(S3FileUploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            byte[] content = file.getBytes();
            String key = "uploads/" + file.getOriginalFilename();
            uploadService.uploadFile(file);
            return "File uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file.";
        }
    }
}
