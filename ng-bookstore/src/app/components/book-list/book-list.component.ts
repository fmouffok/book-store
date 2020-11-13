import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  //templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    // start loader
    this._spinnerService.show();
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
    // stop loader  / spinner
    this._spinnerService.hide();
  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    this._bookService.getBooks(this.currentCategoryId,
      this.currentPage - 1,
      this.pageSize)
      .subscribe(this.processPaginate());
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword).subscribe(
      data => this.books = data
    )
  }

  addToCart(book: Book) {
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

  updatePageSize(pageSize: number) {
    this.listBooks();
  }

  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      // page number starts from index 1 
      this.currentPage = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalRecords = data.page.totalElements;
    }
  }

}
