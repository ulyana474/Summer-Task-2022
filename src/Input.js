import React from 'react';
import InitialState from './InitialState';
import Output from "./Output";
import "./style/css_reset.css";
import "./style/Initial_state_page.css";
import "./style/Not_found.css";
import octocat from "./style/pictures/octocat.png";
import search from "./style/pictures/search.png";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const value = (event.target.elements.inputField.value);
    this.setState({
      user: value
    });
    event.target.reset();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="search-box">
            <div className="blue-line">
              <img src={octocat} className="octocat-image" alt="octocat" />
              <div className="white-line">
                <img src={search} className="search-image" alt="search" />
                <input className="search-txt" type="text" name="inputField" placeholder="Enter GitHub username"></input>
              </div>
            </div>
          </div>
        </form>
        {this.state.user ? <Output user={this.state.user} key={this.state.user} /> : <InitialState />}
      </div >
    )
  };
}

export default Input;