import { Book } from './book';

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    numberUnitsStock: number;
    priceUnit: number;
    quantity: number;

    constructor(book: Book) {
        this.id = book.id;
        this.name = book.name;
        this.imageUrl = book.imageUrl;
        this.numberUnitsStock = book.numberUnitsStock;
        this.priceUnit = book.priceUnit;
        this.quantity = 1;
    }
}
