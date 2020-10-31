package pl.pjatk.kinder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/word")
public class WordController {

    private WordRepository wordRepository;

    @Autowired
    public WordController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @GetMapping
    public ResponseEntity<List<Word>> getWords() {
        return ResponseEntity.ok(wordRepository.findAll());
    }

    @PostMapping
    public ResponseEntity addWord(@RequestBody Word word) {
        wordRepository.save(new Word(word.getWord()));
        return new ResponseEntity(HttpStatus.CREATED);
    }

}
