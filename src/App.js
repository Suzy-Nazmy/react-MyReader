import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBook from "./ListBook"
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class BooksApp extends Component {
  state = {
    allBooks: [],
    query: '',
    openingBooks: []
  }

  updateShelf = (book, shelf) => {
    let allBooks;
    if (this.state.allBooks.findIndex(b => b.id === book.id) > 0) {
      // change the position of an existing book in the shelf
      allBooks = this.state.allBooks.map(b => {
        if (b.id === book.id) {
          return {...book, shelf}
        } else {
          return b
        }
      })
    } else {
      // add a new book to the shelf
     allBooks = [...this.state.allBooks, {...book, shelf}]
    }
      
    this.setState({allBooks})

    BooksAPI.update(book, shelf).then((data) => {
      // shelf updated on the server
    })
  }

  // get all the books before loading 
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        allBooks: data
      });
    });
  }

  // managing the input state
  updateQuery = (query) => {
    this.setState({query: query})
    let showingBooks = []
    if (query) {
      BooksAPI.search(query).then(response => {
        if (response.length) {
          showingBooks = response.map(b => {
            const index = this.state.allBooks.findIndex(c => c.id === b.id)
            if( index >= 0 ) {
              return this.state.allBooks[index]
            } else {
              return b
            }
          })
        }
        this.setState({showingBooks})
      })
    }
    else {
      this.setState({showingBooks})
    }
  }

  render() {
    let {query} = this.state
    return (
      <div className="app">

          <Route exact path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
		        </Link>
                <div className="search-books-input-wrapper">
                  <input type="text"
                         placeholder="Search by title or author"
                         value={this.state.query}
                         onChange={(event) => this.updateQuery(event.target.value)}
                  />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.openingBooks.map((book, i) => (
                    <li key={book.id} className="books"
                          onUpdateBook={(Book, Shelf) => this.updateShelf(Book, Shelf)}/>
                  ))}
                </ol>
              </div>
            </div>
          )} />
          <Route exact path="/" render={() => (
            <ListBook allBooks={this.state.allBooks}
                       onUpdateShelf={(Book, Shelf) => this.updateShelf(Book, Shelf)}/>
          )}/>

      </div>
    )
  }
}

export default BooksApp
