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
      		<p> {this.props.book.title} </p>
      		<select value={this.state.book_state} onChange={this.handleChange}>
      			<option value="wantToRead">wantToRead</option>
            	<option value="currentlyReading">currentlyReading</option>
            	<option value="read">read</option>
              <option value="none">none</option>

      		</select>
      	</div>
    )
  }

}
export default Book;
