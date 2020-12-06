package pl.pjatk.kinder.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.entity.Photo;

import java.util.Optional;

public interface PhotoRepository extends CrudRepository<Photo, Long> {

    Optional<Photo> findByUrl(String url);
}
