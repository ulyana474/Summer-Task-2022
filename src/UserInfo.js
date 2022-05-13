import React from 'react';
import RepoItem from "./RepoItem";
import "./style/main_state.css"
import followers from "./style/pictures/followers.png"
import following from "./style/pictures/following.png"

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      name: null,
      nickname: null,
      followers: 0,
      following: 0,
      repo_count: 0,
      foto: null
    };
    this.xhr = new XMLHttpRequest();

    this.xhr.addEventListener("readystatechange", () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          // request successful
          var response = this.xhr.responseText;
          let json = JSON.parse(response);
          /* console.log(response); */
          this.setState({
            isLoaded: true,
             name: json.name,
             nickname: json.login,
             followers: json.followers,
             following: json.following,
             repo_count: json.public_repos,
             foto: json.avatar_url
          });
         /*  console.log(typeof(this.state.followers));
          console.log(typeof(this.state.following)); */
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
    let url = `https://api.github.com/users/${this.props.user}`;
    this.xhr.open("GET", url, true);
    this.xhr.send();
  }

  convertNumbers = (number) =>{
    if(number < 1000){
        return `${number}`;
    }
    let rez = number/1000;
    let rounded = Math.round(rez * 10) / 10;
    return `${rounded}k`
  }

  render() {
      let body;
      if (!this.state.isLoaded) {
        // yet loading
        body = <div>Loading...</div>}
        else if (this.state.error) {
        body = <div>Error</div>}
        else{ 
            let res1 = this.convertNumbers(this.state.followers);
            let res2 = this.convertNumbers(this.state.following);
            var repos = this.props.repos.map(
              repo => <RepoItem item={repo} />
            );
    body = 
    <div className="wrapper-output">
      <div className="left-col">
        <img className = "user-foto" src={this.state.foto}></img>
        <div className="user-name">{this.state.name}</div>
        <div className="nickname">{this.state.nickname}</div>
        <div className="follows">
          <div className='user-info'>
            <img src = {followers} className="followers-img"></img>
            <div className="followers">{res1} followers</div>
            <img src = {following} className = "following-img"></img>
            <div className="following">{res2} following</div>
          </div>
        </div>
      </div>
      <div className="right-col">
          <div className="repo-number">Repositories({this.state.repo_count})</div>
          <div>{repos}</div>
      </div>
    </div>
        }
    return body;
  }
}
export default UserInfo;