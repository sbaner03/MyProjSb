import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'



class ShowShelves extends Component {
  static propTypes={
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    displayShelf: PropTypes.func.isRequired
  }


  render() {
    const { books} = this.props
    let shelves = ["wantToRead", "currentlyReading", "read","none"]


    return (

      <div className='list-books'>
        <h1> My Books </h1>
        <ol>
          {shelves.map(shelf => (<ol key={shelves.indexOf(shelf)}>
            <Shelf shelf = {shelf} shelfbook = {this.props.books.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
          </ol>))}
        </ol>
        <Link className='open-search' to='/search'><a key = {'search_page_id'}> Search </a> </Link>
      </div>
    )
  }
}

export default ShowShelves;
