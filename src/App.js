import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import './App.css';

class BooksApp extends React.Component {
	state = {
		/**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
		books: []
	};
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	render() {
		console.log(this.state);

		return (
			<div className="app">
				<Route exact path="/" render={() => <ListBooks books={this.state.books} />} />
				<Route path="/search" render={() => <SearchBook />} />
			</div>
		);
	}
}

export default BooksApp;
