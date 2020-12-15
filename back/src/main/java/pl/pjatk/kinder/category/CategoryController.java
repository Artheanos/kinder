package pl.pjatk.kinder.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pjatk.kinder.entity.Category;
import pl.pjatk.kinder.security.model.ResponseMessage;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity addCategory(@RequestBody CategoryRequest req){

        if (categoryService.existsByTitle(req.getTitle())) {
            return new ResponseEntity(new ResponseMessage("Category already exists"), HttpStatus.CONFLICT);
        }
        else {

            if (req.getTitle() == null || req.getTitle().isBlank()) {
                return new ResponseEntity(new ResponseMessage("Category title field can't be empty"),
                        HttpStatus.BAD_REQUEST);
            }
            else {
                categoryService.save(new Category(req.getTitle(), req.getDescription()));
                return new ResponseEntity(new ResponseMessage("Category created"), HttpStatus.CREATED);
            }
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories(){
        var res = categoryService.findAll();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
