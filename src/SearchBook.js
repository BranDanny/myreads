import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';

class SearchBook extends Component {
	state = {
		query: '',
		books: []
	};

	/**
	 * @function 更新搜索关键字,并搜索图书
	 */
	updateQuery = (query) => {
		this.setState({ query: query.trim() });

		BooksAPI.search(query).then((books) => {
			if (books instanceof Array && books.length !== 0) {
				books.sort(sortBy('title'));
				this.setState({ books });
			} else {
				this.setState({ books: [] });
			}
		});
	};

	/**
	 * @function 清除搜索关键字
	 */
	clearQuery = () => {
		this.setState({ query: '', books: [] });
	};

	render() {
		const { query, books } = this.state;
		const { booksOnShelf, onMoveBook } = this.props;

		/**
		 * @function 如果书在书架上,则刷新select中的值
		 */
		const queryBookShelf = (book) => {
			let matchBook = booksOnShelf.filter((b) => {
				return b.id === book.id;
			});
			if (matchBook.length === 1) {
				return matchBook[0].shelf;
			} else {
				return 'none';
			}
		};

		const checkImage = (book) => {
			if (book.imageLinks) {
				return `url(${book.imageLinks.thumbnail})`;
			} else {
				return `url(http://www.blog.lehren.tum.de/wp-content/uploads/2013/08/Udacitiy_Logo2.png)`
			}
		};
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">
						Close
					</Link>

					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={(event) => {
								this.updateQuery(event.target.value);
							}}
						/>
					</div>
					<a onClick={this.clearQuery} className="search-remove" />
				</div>

				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div
											className="book-cover"
											style={{
												width: 128,
												height: 192,
												backgroundImage: checkImage(book)
											}}
										/>
										<div className="book-shelf-changer">
											<select
												value={queryBookShelf(book)}
												onChange={(event) => {
													onMoveBook(book, event.target.value);
												}}
											>
												<option value="disable" disabled>
													Move to...
												</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.authors && book.authors.join(' & ')}</div>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBook;
