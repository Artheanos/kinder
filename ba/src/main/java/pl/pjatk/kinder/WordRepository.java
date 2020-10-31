package pl.pjatk.kinder;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WordRepository extends CrudRepository<Word, Long> {

    List<Word> findAll();
}
