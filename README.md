
This is the submission for the Udacity React project on buidling and managing a Book Shelf. The goal of this project is allow a user to a) Manage her books in book shelves - Read, Currently Reading and Want to Read b) Search for books which can then be assigned to the user's shelves. 


## Installation Instructions

- clone the project from https://www.github.com/sbaner03/MyProjSb
- launch the project using npm start

In case there is an error then
- delete node_modules directory
- install all the required packages using npm install
- launch the project using npm start

## Structure of the Application
```
+--public/    
 |-- index.html - DO NOT MODIFY
+-- src/
 +-- icons/ - Helpful images for your app. Use at your discretion.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 +-- App.js - This is the root of your app. This contains the following
 	|--State variable - a) books - ths is an array of book objects
 	|--Component Functions - a) updating the shelf of a book (updateShelf) b) for mapping the shelf of the book to the actual shelf name displayed in HTML (displayShelf)
 	|--Components Invoked - ShowShelves and SearchBooks through the route component. Depending on the url, the application will route to the relevant react component
 +-- ShowShelves.js - This component is used for building the display shelf
 	|-- Properties - books, updateShelf and displayShelf (both from methods are passed on to the Shelves component) from Route component in the App.js.
 	|-- Components invoked - Shelves component is invoked multiple times based on the number of unique shelves across which the books of the user are organized
 	|-- Link component to link to the search page
 +-- SearchBooks.js - This component is used for building the Search page of the application
 	|-- Functional element - this component has an input element for the user to type in the search query
 	|-- Properties passed- listedbooks (this is the books of the user), updateShelf and displayShelf (both from methods are passed on to the Shelves component)
 	|-- State variables - a) books (which are associated with the query of the user) b) listedshowingShelves (list fo shelves that can be used for showing the books of the user) c) showingShelves (	list of shelves across which the search results will be displayed) d) query (this is the user query)
 	|-- Component Functions - function (updateQuery) to update the user query and also build an array of book objects to be displayed. The books state variable is a union of the search results (output of search() of BooksAPI) and regex match of the query to the users existing books (listedbooks). More detailed comments are provided inline in the file
 	|-- Components invoked - Shelves component is invoked multiple times based on the number of unique shelves across which the books associated with the query are displayed
 	|-- Link component to link to the home page
 +-- Shelves.js - This component 'constructs' each shelf - please note that both the ShowShelves and SearchBooks components call this component. This is the ensure consistent rendering of shelves
 	|-- Properties passed - a) shelf which is being displayed b) shelfbook which is the books associated with the shelf c) updateshelf method - this method is actually passed forward to the child component Book d) displayShelf is a simple mapping of the book.shelf to the actual text displayed on the screen
 	|-- The render method of this component computes the length of the books in a shelf. If the length is 0 (shelf is empty) then no books and the shelf heading are not displayed
 	|-- Components invoked - Book component invoked - this component is responsible for diplaying the books associated with the shelf
 +-- Book.js - This component displays each book (title, authors and thumbnail) with a drop down for reassigning the shelf
 	|-- Properties passed - a) book which is being displayed b) updateshelf method
 	|-- Component Functions - handleChange is invoked once an event (selection change) is triggered. This method updates the shelf using the updateShelf method passed
 +-- App.css - Styles for the app. 
 +-- App.test.js - Used for testing. Provided with Create React App. 
 Testing is encouraged, but not required.
 +-- BooksAPI.js - A JavaScript API for the provided Udacity backend. Details of the APIs calls given below. Please note that the APIs are implemented through fetch statement wrapped with a promise. Hence as user calling the API, you must wait for the promise to resolve or reject before drawing final conclusion about the results. 
 
 Instructions for the methods are below.
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms 
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Application Functionality: 
The application functionality is in line with the project rubric: 
a) Main page
	- The main page shows 3 shelves (read,currently read, want to read) for books of the user
	- The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance.
	- When the browser is refreshed, the same information is displayed on the page.
b) Search page
	- The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page
	- Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf
	- When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page
c) Routing
	- The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
	- The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend - please feel free to blame Udacity for all the erratic results that this API throws up:)

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 


## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
# MyProjSb
