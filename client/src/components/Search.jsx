import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({ term: e.target.value });
  }

  search() {
    const { term } = this.state;
    const { search } = this.props;
    search(term);
  }

  render() {
    const { term } = this.state;
    return (
      <div>
        Search for a github user: <input value={term} onChange={this.onChange}/>       
        <button onClick={this.search}>Add Repos</button>
      </div>
    ); 
  }
}