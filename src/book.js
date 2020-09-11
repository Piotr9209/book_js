// Obiekt charakteryzujący książkę:

// Ma miec: Tytuł, Autora, id(kod)

// Obiekt charakteryzujący bibliotekę:
// Ma miec: Listę książek(obiektów) z różnymi autorami, tytułami (około 8-15).
// Ma umożliwiać: dodawanie książek do listy, usuwanie książek z listy

// Obiekt charakteryzujący wypożyczenie:
// Ma mieć: datę wypożyczenia, datę zwrotu( +7d od wypożyczenia), id wypożyczonej
// pozycji, jej tytuł. kara
// Ma umożliwiać: wypożyczenie ksiązki (jesli książki nie ma w liście - jest niedostepna/
// wypożyczona ma zwracać informację) jesli jest dostępna usuwać książkę z listy
// dostępnych, ma umożliwiać zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary. Przy zwrocie książka wraca na liste.

import {
    v4 as uuidv4
} from "uuid";
import moment from "moment";

class Validator {
    static isEmptyString(value) {
        if (value.length < 0 && typeof value !== "string")
            throw new Error(`is wrong name name or author`);
    }

    static isBook(value) {
        return value instanceof Book;
    }

    static isBookInLibrary(value) {
        return value instanceof Library;
    }
}
//tworzymy ksiazke
class Book {
    constructor(title, author) {
        this.id = uuidv4();
        this.title = title;
        this.author = author;
    }
}
//mamy instancje ksiazek ktore sa dostepne w bibliotece oraz te ktore sa wypozyczone
class Library {
    constructor() {
        this.listBooks = [];
        this.listRentBooks = [];
    }

    addBooks(...books) {
        books.forEach((book) => {
            if (!Validator.isBook(book)) return false;
        });
        this.listBooks.push(...books);
    }

    deleteBook(uuid) {
        this.listBooks = this.listBooks.reduce((acc, el) => {
            if (!el.uuid === uuid) {
                acc.push(el);
            }
            return acc;
        }, []);
    }

    searchAvailableBooks(phrase) {
        return this.listBooks.filter((book) => {
            if (Validator.isEmptyString(phrase)) return `args not found`;
            return (
                book.title.toLowerCase().includes(phrase.toLowerCase()) ||
                book.author.toLowerCase().includes(phrase.toLowerCase())
            );
        });
    }

    searchRentBooks(phrase) {
        return this.listRentBooks.filter((book) => {
            if (Validator.isEmptyString(phrase)) return `args not found`;
            return (
                book.title.toLowerCase().includes(phrase.toLowerCase()) ||
                book.author.toLowerCase().includes(phrase.toLowerCase())
            );
        });
    }

    rentABook(book) {
        // const isFindBookInListBook = this.listBooks.some(element => element.id === book.id);
        // const isFindBookInListRentBook = this.listRentBooks.some(element => element.id === book.id);
        // if (isFindBookInListBook) {
        const rent = new Rent().initialize(book);
        this.listRentBooks.push(rent)
        console.log(rent);
        // console.log(this.listRentBooks);
        this.listBooks = this.listBooks.filter(el => el.id !== book.id);
        // }
    }

    returnABook(book) {
        this.listBooks.push(book);
        this.listRentBooks = this.listRentBooks.filter(el => el.book.id !== book.id);
    }
}


class Rent {
    constructor() {
        this.dateRentBook = moment().format("DD.MM.YYYY");
        this.dateReturnBook = moment().add(7, "days").format("DD.MM.YYYY");

        this.book;
    }

    initialize(book) {
        this.book = book;
        return this;
    }

    calculate() {
        return 'diff between dateRent a dateReturn'
    }
}


// class Rent {
//     constructor(booksWithLibrary) {
//         if (!Validator.isBookInLibrary(booksWithLibrary)) throw new Error(`library doesn't includes this book `);

//         this.dateRentBook = moment().format("DD.MM.YYYY");
//         this.dateReturnBook = moment().add(7, "days").format("DD.MM.YYYY");

//         this.books = booksWithLibrary;
//     }
//     //rent ma miec dostep do ksiazek tylko tych ktore zostaly wypozyczone. czyli te ktore chcemy wypozyczyc.

//     //initalize
//     rentBook(book) {
//         if (Validator.isEmptyString(book)) throw new Error("args must be filled");

//         const isFindBookInListBook = this.books.listBooks.some(element => element.id === book.id);
//         const isFindBookInListRentBook = this.books.listRentBooks.some(element => element.id === book.id);


//         if (isFindBookInListBook) {
//             this.books.listRentBooks.push(book);
//             this.books.listBooks = this.books.listBooks.filter(element => element.id !== book.id);
//             console.log(this.books.listBooks);
//             console.log(this.books.listRentBooks);
//             return (
//                 `
//             The Book has been borrowed,
//             date of borrow: ${this.dateRentBook},
//             date of return book: ${this.dateReturnBook}
//                 `
//             )
//         } else if (isFindBookInListRentBook) {
//             return `Book is borrowed, date of return ${this.dateReturnBook}`;
//         } else {
//             throw new Error(`the book is not in the library`)
//         }
//     }
//     //close
//     returnBook(book) {
//         if (Validator.isEmptyString(book)) throw new Error("args must be filled");

//         const isFindBookInListBook = this.books.listBooks.some(element => element.id === book.id);
//         const isFindBookInListRentBook = this.books.listRentBooks.some(element => element.id === book.id);

//         if (isFindBookInListRentBook) {
//             const returnBookToListBooks = this.books.listBooks.push(book);
//             const deleteBookFromListRentBooks = this.books.listRentBooks = this.books.listRentBooks.filter(element => element.id !== book.id);
//             if (this.dateReturnBook.valueOf() > this.dateRentBook.valueOf()) {
//                 return (
//                     returnBookToListBooks,
//                     deleteBookFromListRentBooks
//                 )
//             } else {
//                 return (
//                     `

//                     `
//                 )
//             }
//             console.log(this.books.listBooks);
//             console.log(this.books.listRentBooks);
//         } else if (isFindBookInListBook) {
//             return 'the book was not borrowed';
//         } else {
//             throw new Error('the book is not in the library');
//         }
//     }
// }

// Obiekt charakteryzujący wypożyczenie:
// Ma mieć: datę wypożyczenia, datę zwrotu( +7d od wypożyczenia), id wypożyczonej
// pozycji, jej tytuł. kara
// Ma umożliwiać: wypożyczenie ksiązki (jesli książki nie ma w liście - jest niedostepna/
// wypożyczona ma zwracać informację) jesli jest dostępna usuwać książkę z listy
// dostępnych, ma umożliwiać zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary. Przy zwrocie książka wraca na liste.

const book = new Book("harry potter", "j.k rowling");
const book2 = new Book("pan samochodzik", "jacek dudek");
const book3 = new Book("piotr i przygody", "piotr kowalski");
const book4 = new Book("darek i przygody", "darek kowal");
const book5 = new Book("jan", "jan janiasty");
const book6 = new Book("karol", "karol karolasty");
const book7 = new Book("wojciech", "wojtek wojciechowski");
const book8 = new Book("konrad", "konrad konradowski");
const book9 = new Book("tomasz", "tomasz tomaszewski");
const book10 = new Book("adrian", "adrian adrianowski");
const book11 = new Book('damian', "damian damianowski");

const library = new Library();
// console.log(library);
library.addBooks(
    book,
    book2,
    book3,
    book4,
    book5,
    book6,
    book7,
    book8,
    book9,
    book10,
    book11,
);
library.rentABook(book5);

console.log(library.searchAvailableBooks('karol'))
// library.returnABook(book5);