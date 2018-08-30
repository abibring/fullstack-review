import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get('/repos')
      .then(({data}) => {
        // console.log(`componentDidMount: ${JSON.stringify(data)}`)
        this.setState({ repos: data })
      })
      .catch(err => console.error(`err in componentDidMount: ${err}`));
  }

  search (term) {
    // console.log(`${term} was searched`);
    axios.post('/repos', { name: term })
      .then((response) => {
        console.log(`response in search: ${JSON.stringify(response)}`)
        this.loadData();
      })
      .catch(err => console.error(`err in index.jsx: search: ${err}`))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));