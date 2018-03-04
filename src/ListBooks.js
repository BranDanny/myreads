import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListBooks extends Component {
	render() {
		/**
         * 处理书架名，与book.shelf的值保持一致
         * @param {书架名} str 
         */
		function encode(str) {
			return str
				.toLowerCase()
				.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
				.replace(/\s/gi, '')
				.replace(/(\w)/, function(v) {
					return v.toLowerCase();
				});
		}

		const { books } = this.props;

		const shelfInfo = [ { title: 'Currently Reading' }, { title: 'Want to Read' }, { title: 'Read' } ];
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{shelfInfo.map((shelf) => (
							<div className="bookshelf">
								<h2 className="bookshelf-title">{shelf.title}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{books
											.filter((b) => {
												return b.shelf === encode(shelf.title);
											})
											.map((book) => (
												<li key={book.id}>
													<div className="book">
														<div className="book-top">
															<div
																className="book-cover"
																style={{
																	width: 128,
																	height: 192,
																	backgroundImage: `url(${book.imageLinks.thumbnail})`
																}}
															/>
															<div className="book-shelf-changer">
																<select>
																	<option value="none" disabled>
																		Move to...
																	</option>
																	<option value="currentlyReading">
																		Currently Reading
																	</option>
																	<option value="wantToRead">Want to Read</option>
																	<option value="read">Read</option>
																	<option value="none">None</option>
																</select>
															</div>
														</div>
														<div className="book-title">{book.title}</div>
														<div className="book-authors">{book.authors.join(' & ')}</div>
													</div>
												</li>
											))}
									</ol>
								</div>
							</div>
						))}
					</div>
				</div>

				<Link to="/search" className="open-search">
					Add a book
				</Link>
			</div>
		);
	}
}

export default ListBooks;
