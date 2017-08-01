import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ShowShelves from './ShowShelves'



class App extends Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then((data) => {
      book.shelf = shelf
      let newbooks = this.state.books.filter((bk)=>(bk.id!==book.id)).concat([book])
      this.setState({books: newbooks})
    }
    )
  }
  getdisplayshelf = (shx) =>{
    let shelves = ["wantToRead", "currentlyReading", "read","none"]
    let displayshelves = ['Want to Read','Currenty Reading','Read','Not Read']
    let disp = {}
    for (let shelf of shelves){
    	disp[shelf] = displayshelves[shelves.indexOf(shelf)]
    }
    disp[shx]
  }




  render() {
    return (
      <div className = "app">
        <Route exact path="/" render={({history}) => (<ShowShelves books = {this.state.books} updateShelf = {this.updateShelf}/>)}/>
        <Route path="/search" className = "search-books" render={() => (<SearchBooks listedbooks = {this.state.books} updateShelf = {this.updateShelf}/>)}/>
      </div>
    )
  }
}

export default App;
