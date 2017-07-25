
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'


class Shelf extends Component{
  static propTypes={
    shelf: PropTypes.string.isRequired,
    shelfbook: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render (){
    
    return (
      <div>
        <p className = 'bookshelf-title'> {this.props.shelf}</p>
        <ol>
          {this.props.shelfbook.map(book => (<ul key={book.id+this.props.shelf}> 
            <Book book = {book} updateShelf = {this.props.updateShelf}/ >
          </ul>))}
        </ol>

      </div>
    )
  }
}

export default Shelf;

