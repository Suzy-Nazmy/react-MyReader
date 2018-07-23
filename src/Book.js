import React from 'react'

class Book extends React.Component {
  state = {
    shelf: 'none'
  }

  componentDidMount() {
    let { book } = this.props;
    if(book.shelf) {
      this.setState({ shelf: book.shelf })
    }
  }

  change_bookShelf = (e) => {
    this.setState({
      shelf: e.target.value
    })
    this.props.onUpdateBook(this.props.book, e.target.value)
  }

  render() {
    let design = {
      width: 127,
      height: 193,
      backgroundImage: this.props.book.imageLinks ?
        `url(${this.props.book.imageLinks.thumbnail})` : ''
    }

    return (<li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={design}></div>
          <div className="book-shelf-changer">
            <select onChange={this.change_bookShelf} value={this.state.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors ? this.props.book.authors.toString() : ' '}</div>
      </div>
    </li>)
}
}
export default Book