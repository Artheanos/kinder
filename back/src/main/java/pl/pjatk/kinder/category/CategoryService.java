package pl.pjatk.kinder.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pjatk.kinder.entity.Category;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }


    public List<Category> findAll(){
        List<Category> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(categories::add);
        return categories;
    }

    public Category findByTitle(String title){
        return categoryRepository.findCategoryByTitle(title);
    }

    public boolean existsByTitle(String title){
        return categoryRepository.existsByTitle(title);
    }

    void save(Category category){
        categoryRepository.save(category);
    }
}
