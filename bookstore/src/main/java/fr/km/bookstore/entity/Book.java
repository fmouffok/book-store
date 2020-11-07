package fr.km.bookstore.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="book")
@Setter
@Getter
@ToString
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    @Column(name = "image_url")
    private String imageUrl;
    private boolean active;
    @Column(name = "quantity_stock")
    private int numberUnitsStock;
    @Column(name = "price_unit")
    private double priceUnit;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private BookCategory category;
}
