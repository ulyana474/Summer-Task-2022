import React from 'react';
import RepoItem from "./RepoItem";
import NotFound from "./NotFound";

class Output extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      repos: []
    };
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener("readystatechange", () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          // request successful
          var response = this.xhr.responseText;
          //alert(response);
          let json = JSON.parse(response);

          this.setState({
            isLoaded: true,
            repos: json
          });
        }
        else {
          // error
          this.setState({
            isLoaded: true,
            error: this.xhr.responseText
          });
        }
      }
    })
  }

  componentDidMount() {
    let url = `https://api.github.com/users/${this.props.user}/repos`;
    this.xhr.open("GET", url, true);
    this.xhr.send();
  }

  render() {
    let body;
    if (!this.state.isLoaded) {
      // yet loading
      body = <div>Loading...</div>
    } else if (this.state.error) {
      // error
      body = <div><NotFound /></div>
    } else {
      // success
      var repos = this.state.repos.map(
        repo => <RepoItem item={repo} />
      );
      body = <div>{repos}</div>
    }

    return body;
  }
}
export default Output;