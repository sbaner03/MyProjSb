import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import escapeRegExp from 'escape-string-regexp'



class SearchBooks extends Component {
  static propTypes={
    listedbooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    displayShelf: PropTypes.func.isRequired
  }
  state = {
    books: [],
    listedshowingShelves: ["wantToRead", "currentlyReading", "read"],
    showingShelves: ["wantToRead", "currentlyReading", "read","none"],
    query: ''
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim()})
    if (query) {
      BooksAPI.search(query,20).then((books)=>{
        let existingbooks = []
  ///     this is done to because the search() is restricted to 20
  ///     there could be a case where an existing book (result of getAll()) might not show up in the search() results
  ///     this however causes the duplication of the same book in different shelves because the search and getall queries
  ///     might be out of sync. In the real world, the api would be fixed and synchronized
  ///     and the regex hack wouldnt be required
        const match = new RegExp(escapeRegExp(query), 'i')
        existingbooks = this.props.listedbooks.filter(bk=>(bk.shelf!='none' && (match.test(bk.author)||(match.test(bk.title)))))
        this.setState({books: [...new Set(books.concat(existingbooks))]})
      })
    }
}
  render() {
    let query = this.state.query
    return (


      <div className='search-books'>

        <div className='search-books-bar'>
        <Link className='close-search' to='/'><a key = {'close_search_bar'}> Close </a> </Link>
          <input
            className='search-books-input-wrapper'
            type='text'
            placeholder='Search by Title or Author'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className = 'search-books-results'>

          <h1> Search Results </h1>
          <ol>
            {this.state.showingShelves.map(shelf => (<ul key={this.state.showingShelves.indexOf(shelf)+'search'}>
              <Shelf shelf = {shelf} shelfbook = {this.state.books.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
            </ul>))}
          </ol>

          <h1> All Existing Books <i> only For Testing </i> </h1>
          <ol>
            {this.state.listedshowingShelves.map(shelf => (<ul key={this.state.listedshowingShelves.indexOf(shelf)+'show'}>
              <Shelf shelf = {shelf} shelfbook = {this.props.listedbooks.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
            </ul>))}
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks;
