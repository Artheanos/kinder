package pl.pjatk.kinder.category;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.pjatk.kinder.entity.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

    Category findCategoryByTitle(String title);
    boolean existsByTitle(String title);
}
