import React from 'react';
import EmptyRepos from "./EmptyRepos";
import Followers from './Followers';
import Following from './Following';
import PaginationUser from './PaginationUser';
import RepoNumber from './RepoNumber';
import RepoItem from "./RepoItem";
import UserFoto from './UserFoto';
import "./style/main_state.css";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loaded: false,
      error: null,
      name: null,
      nickname: null,
      followers: -1,
      following: -1,
      repo_count: -1,
      foto: null,
      html_url: null,
      selected_page: 1
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
            name: json.name,
            nickname: json.login,
            followers: json.followers,
            following: json.following,
            repo_count: json.public_repos,
            foto: json.avatar_url,
            html_url: json.html_url
          });
        }
        else {
          // error
          this.setState({
            is_loaded: true,
            error: this.xhr.responseText
          });
        }
      }
    });
  };

  componentDidMount() {
    let url = `https://api.github.com/users/${this.props.user}`;
    this.xhr.open("GET", url, true);
    this.xhr.send();
  }

  componentWillUnmount() {
    this.xhr.abort();
  };

  convertNumbers = (number) => {
    if (number < 0) {
      return '';
    }
    if (number < 1000) {
      return `${number}`;
    }
    let rez = number / 1000;
    let rounded = Math.round(rez * 10) / 10;
    return `${rounded}k`;
  };

  openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  handleClick = (event) => {
    this.openInNewTab(this.state.html_url);
  };

  handlePaginationPageClick = (e) => {
    const page = e.selected;
    this.setState({
      selected_page: page
    });
    // make request in output
    this.props.handlePageClick(e);
  };

  render() {
    let body;
    if (!this.state.is_loaded) {
      // yet loading
      body = <div></div>;
    }
    else if (this.state.error) {
      body = <div>Error</div>;
    }
    else {// success
      let res1 = this.convertNumbers(this.state.followers);
      let res2 = this.convertNumbers(this.state.following);
      var repos = this.props.repos.map(
        repo => <RepoItem item={repo} />
      );
      body =
        <div className="wrapper-output">
          <div className="left-col">
            <UserFoto foto={this.state.foto} />
            <div className="user-name">{this.state.name}</div>
            <div className="nickname" onClick={this.handleClick}>{this.state.nickname}</div>
            <div className="follows">
              <Followers res={res1} />
              <Following res={res2} />
            </div>
          </div>
          <div>{this.state.repo_count === 0 ? <EmptyRepos /> : <div>
            <div className="right-col">
              <RepoNumber number={this.state.repo_count} />
              <div className="repo-container">{repos}</div>
              <PaginationUser
                selected_page={this.state.selected_page}
                repo_count={this.state.repo_count}
                handlePaginationPageClick={this.handlePaginationPageClick}
                res={res1}
              />
            </div>
          </div>
          }
          </div>
        </div>
    }
    return body;
  };
}

export default UserInfo;