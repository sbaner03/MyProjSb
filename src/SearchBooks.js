import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'



class SearchBooks extends Component {
  static propTypes={
    listedbooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
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
    console.log(this.state.books)
    for (let book of this.state.books){
      console.log(book.title,book.shelf)
    }

    return (


      <div className='list-books'>
        <Link className='go-to-homepage' to='/'>Close</Link>
        <div className='list-books-top'>
          <input
            className='search-books'
            type='text'
            placeholder='Search Books'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div>

          <p> Existing Books </p>

          <p> Search Results </p>
          <ol>
            {this.state.showingShelves.map(shelf => (<ul key={this.state.showingShelves.indexOf(shelf)}>
              <Shelf shelf = {shelf} shelfbook = {this.state.books.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf}/>
            </ul>))}
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks;


/*  <ol>
    {this.state.listedshowingShelves.map(shelf => (<ul key={this.state.listedshowingShelves.indexOf(shelf)}>
      <Shelf shelf = {shelf} shelfbook = {this.props.listedbooks.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf}/>
    </ul>))}
  </ol>
*/
