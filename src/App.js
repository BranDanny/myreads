import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import './App.css';

class BooksApp extends React.Component {
	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			books.sort(sortBy('title'));
			this.setState({ books });
		});
	}

	/**
	 * @function 更新图书的书架,并重新获取全部图书
	 * @param 书, 书架
	 */
	updateShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
		BooksAPI.getAll().then((books) => {
			books.sort(sortBy('title'));
			this.setState({ books });
		});
	};
	
	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => <ListBooks books={this.state.books} onMoveBook={this.updateShelf} />}
				/>
				<Route
					path="/search"
					render={() => <SearchBook booksOnShelf={this.state.books} onMoveBook={this.updateShelf} />}
				/>
			</div>
		);
	}
}

export default BooksApp;
