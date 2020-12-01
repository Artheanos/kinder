package pl.pjatk.kinder.photo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.pjatk.kinder.entity.Photo;
import pl.pjatk.kinder.repo.PhotoRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class PhotoController {

    @Value("${kinder.app.imagePath}")
    private String imagePath;

    @GetMapping("photos/{url}")
    public void getImage(@PathVariable String url, HttpServletResponse response) throws IOException {
        Path path = Path.of(imagePath, url);
        var imgFile = new File(path.toString());
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(new FileInputStream(imgFile), response.getOutputStream());
    }
}
