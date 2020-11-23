package pl.pjatk.kinder.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.repo.PhotoRepository;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class PhotoService {

    @Value("${kinder.app.imagePath}")
    private String imagePath;

    private final PhotoRepository photoRepository;

    @Autowired
    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public Photo save(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String encodedFileName = digest.digest(fileName.getBytes(StandardCharsets.UTF_8)).toString() + fileName.substring(fileName.lastIndexOf("."));
        byte[] imageBytes = file.getBytes();
        Path path = Paths.get(imagePath + encodedFileName);
        Photo photo = new Photo(path.toString());
        Files.write(path, imageBytes);
        return photoRepository.save(photo);
    }
//
//    public byte[] get(Long id) throws IOException {
//        Photo photo = photoRepository.findById(id).get();
//        Path path = Paths.get(imagePath + photo.getUrl());
//        return Files.readAllBytes(path);
//    }
}
