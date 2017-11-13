import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentWillMount() {
    this.get()

  }

  get () {
      var cb = (data) => {
      this.setState({
          repos: JSON.parse(data)
      });
    }
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      url: '/repos',
      //data: ,
      success: function (data) {
        console.log('SUCCESS IN GET')
        cb(data)
      },

      error: function (data) {
        console.log('ERROR IN GET')
        console.log(data)
      }

    })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    var callb = () => {
      this.forceUpdate()
      this.render()
      this.get()
      console.log('refresh?')
    }
    var data = {
      username: term
    }

    $.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      url: '/repos',
      data: JSON.stringify(data),
      success: function () {
        callb();
        console.log('SUCCESS IN POST')
      },

      error: function () {
        console.log('ERROR IN POST')
      }

    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher!!!!!</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Repo repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));