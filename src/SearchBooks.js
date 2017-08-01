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
  ///     Fix for a situaton since search() is restricted to 20 books and
  ///     there could be an existing book (result of getAll() -> listedbooks passed through properties)
  ///     might NOT show up in the search() results.
  ///     Also there are cases where the same book has different shelves when called through the getAll() and search() queries.
  ///     To fix this I have done the following:
  ///     - created a new array called qbooks which ammends books (result of search()) and assigns the
  ///       same properties to a book that is in listedbooks
  ///     - unique entries of concat of qbooks and existingbooks 
        const match = new RegExp(escapeRegExp(query), 'i')
        existingbooks = this.props.listedbooks.filter(bk=>(bk.shelf!='none' && (match.test(bk.author)||(match.test(bk.title)))))
        let existingbooksid = existingbooks.map(bk=>(bk.id))
        let qbooks = books.map(function(x){if (existingbooksid.indexOf(x.id)>-1)
                                    {
                                  		return existingbooksid[existingbooksid.indexOf(x.id)];
                                  	}else{
                                  		return x;
                                  	}
                                  })

        this.setState({books: [...new Set(qbooks.concat(existingbooks))]})
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
