import React from 'react';
import RepoItem from "./RepoItem";
import NotFound from "./NotFound";
import UserInfo from "./UserInfo";

class Output extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      repos: [],
      foto: null
    };
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener("readystatechange", () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          // request successful
          var response = this.xhr.responseText;
         /*  var foto = "https://avatars.githubusercontent.com/u/91842907?v=4"; */
          /* alert(response); */
          
          let json = JSON.parse(response);
          //console.log(json[0].owner.avatar_url)
          this.setState({
            isLoaded: true,
            repos: json,
             foto: json[0].owner.avatar_url 
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
      body = <div><img src={this.state.foto}></img><div><UserInfo user={this.props.user} key={this.props.user}/></div><div>{repos}</div></div>
    }

    return body;
  }
}
export default Output;