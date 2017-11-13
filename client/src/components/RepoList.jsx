import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div>
    <h4> Repo List Component </h4>
    There are {this.props.repos.length} repos.
  </div>) 
  }
}

export default RepoList;