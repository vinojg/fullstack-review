import React from 'react';

class Repo extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div>
    <h4> Repo List</h4>
    { this.props.repos.map(repo => <div>
    	<ul>
    	  <li>{repo.username} </li>
		  <li><a href={repo.repoLink}>{repo.reponame}</a></li>
		  <li>{repo.stargazer}</li>
		</ul>
   
    	</div>) }
  </div>) 
  }
}

export default Repo;