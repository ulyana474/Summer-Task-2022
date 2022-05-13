import React from 'react';
import NotFound from "./NotFound";
import UserInfo from "./UserInfo";
import "./style/main_state.css"

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
      
          
          let json = JSON.parse(response);
          //console.log(json[0].owner.avatar_url)
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
      

      body = <div><UserInfo user={this.props.user} key={this.props.user} repos = {this.state.repos}/></div>
    }

    return body;
  }
}
export default Output;