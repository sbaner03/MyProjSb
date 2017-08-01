import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'



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
      BooksAPI.search(query,10).then((books)=>{this.setState({books})})
    }
}
  render() {
    let query = this.state.query
    return (


      <div className='search-books'>
        <Link className='close-search' to='/'>Close</Link>
        <div className='search-books-input-wrapper'>
          <input
            className='search-books-bar'
            type='text'
            placeholder='Search Books'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className = 'search-books-results'>

          <p> Existing Books </p>
          <ol>
            {this.state.listedshowingShelves.map(shelf => (<ul key={this.state.listedshowingShelves.indexOf(shelf)}>
              <Shelf shelf = {shelf} shelfbook = {this.props.listedbooks.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
            </ul>))}
          </ol>


          <p> Search Results </p>
          <ol>
            {this.state.showingShelves.map(shelf => (<ul key={this.state.showingShelves.indexOf(shelf)}>
              <Shelf shelf = {shelf} shelfbook = {this.state.books.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
            </ul>))}
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks;
