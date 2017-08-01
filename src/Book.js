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
  setupdisplayshelf() {
    let displayshelves = ["Want to Read", "Currently Reading", "Read","Not Read"]
    let shelves = ["wantToRead", "currentlyReading", "read","none"]
    let disp = []
    for (let shelf of shelves){
      disp[shelf] = displayshelves[shelves.indexOf(shelf)]
    }
    console.log(disp)
   }



  render (){



    return (
    	<div className = "book">
        <div className="book-top">

          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url({this.props.book.imageLinks.thumbnail})'}}></div>
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
        <div className="book-authors">
          <ol>
            {typeof this.props.book.authors === 'undefined' ? <li key = {this.props.book.id+'_none'}> 'no author' </li>:'2'}

          </ol>
        </div>

      </div>
    )
  }

}
export default Book;
//{this.props.book.authors.map(author=>(<li key = {this.props.book.id+author}>{author}</li>))}}
