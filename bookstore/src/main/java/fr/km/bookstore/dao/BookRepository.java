package fr.km.bookstore.dao;

import fr.km.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Integer> {
    @RestResource(path = "categoryId")
    Page<Book> findByCategoryId(@Param("id") Integer id, Pageable pageable);
}
