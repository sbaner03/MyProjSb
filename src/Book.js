import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component{
static propTypes={
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
}
state = {
	book_state: ''
}

handleChange = (e)=>{
  this.props.updateShelf(this.props.book,e.target.value)
  this.setState({book_state: e.target.value})
  }
componentDidMount() {
    this.setState({book_state: this.props.book.shelf})
  }
  render (){
  return (
    	<div className = "book">
        <div className="book-top">

          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
          		<select value={this.state.book_state} onChange={this.handleChange}>
          			<option value="wantToRead">wantToRead</option>
                	<option value="currentlyReading">currentlyReading</option>
                	<option value="read">read</option>
                  <option value="none">none</option>
          		</select>
            </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {typeof this.props.book.authors === 'undefined' ? <div className="book-authors" key = {this.props.book.id+'_none'}> 'Udacity API likes messing with me!!!' </div>:<div className="book-authors" key = {this.props.book.id+'_author'}> {this.props.book.authors.join(', ')} </div>}

      </div>
    )
  }

}
export default Book;
