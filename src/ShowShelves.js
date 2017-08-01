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
        <p> My Reads </p>
        <ol>
          {shelves.map(shelf => (<ul key={shelves.indexOf(shelf)}>
            <Shelf shelf = {shelf} shelfbook = {this.props.books.filter((x)=>(x.shelf===shelf))} updateShelf = {this.props.updateShelf} displayShelf = {this.props.displayShelf}/>
          </ul>))}
        </ol>
        <Link className='open-search' to='/search'>Search</Link>
      </div>
    )
  }
}

export default ShowShelves;
