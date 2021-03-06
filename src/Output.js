import React from 'react';
import Loader from './Loader';
import NotFound from "./NotFound";
import UserInfo from "./UserInfo";
import "./style/main_state.css"

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loaded: false,
      error: null,
      repos: []
    };
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener("readystatechange", () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          // request successful
          var response = this.xhr.responseText;
          let json = JSON.parse(response);
          this.setState({
            is_loaded: true,
            repos: json
          });
        }
        else {
          // error
          this.setState({
            is_loaded: true,
            error: this.xhr.responseText
          });
        }
      };
    })
  };

  makeRequest(currentPage) {
    let url = `https://api.github.com/users/${this.props.user}/repos?per_page=4&page=${currentPage}`;
    this.xhr.open("GET", url, true);
    this.xhr.send();
  };

  componentDidMount() {
    this.makeRequest(1);
  };

  componentWillUnmount() {
    this.xhr.abort();
  };

  handlePageClick = (e) => {
    const page = e.selected + 1;//pagination start page index = 0
    this.makeRequest(page);
  };

  render() {
    let body;
    if (!this.state.is_loaded) {
      // yet loading
      body = <div><Loader /></div>;
    } else if (this.state.error) {
      // error
      body = <div><NotFound /></div>;
    } else {
      // success
      body = 
      <div><UserInfo 
              user={this.props.user} 
              key={this.props.user} 
              repos={this.state.repos} 
              handlePageClick={this.handlePageClick.bind(this)} />
      </div>;
    };

    return body;
  };
}

export default Output;