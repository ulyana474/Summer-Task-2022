import React from 'react';
import ReactPaginate from 'react-paginate';
import EmptyRepos from "./EmptyRepos";
import Loader from './Loader';
import RepoItem from "./RepoItem";
import "./style/main_state.css";
import followers from "./style/pictures/followers.png";
import following from "./style/pictures/following.png";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      name: null,
      nickname: null,
      followers: 0,
      following: 0,
      repo_count: 0,
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
            isLoaded: true,
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
            isLoaded: true,
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
    if (!this.state.isLoaded) {
      // yet loading
      body = <div><Loader /></div>;
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
      let selected_min = this.state.selected_page * 4 + 1;
      let selected_max = Math.min((this.state.selected_page + 1) * 4, this.state.repo_count);
      body =
        <div className="wrapper-output">
          <div className="left-col">
            <img className="user-foto" src={this.state.foto} alt="user-foto"></img>
            <div className="user-name">{this.state.name}</div>
            <div className="nickname" onClick={this.handleClick}>{this.state.nickname}</div>
            <div className="follows">
              <div className="user-info">
                <img src={followers} className="followers-img" alt="followers"></img>
                <div className="followers">{res1} followers</div>
                <img src={following} className="following-img" alt="following"></img>
                <div className="following">{res2} following</div>
              </div>
            </div>
          </div>
          <div>{this.state.repo_count === 0 ? <EmptyRepos /> : <div>
                <div className="right-col">
                  <div className="repo-number">Repositories({this.state.repo_count})</div>
                  <div className="repo-container">{repos}</div>
                  <div className="pagination-info">
                    <p className="pagination-status">{selected_min} - {selected_max} of {this.state.repo_count} items</p>
                    <ReactPaginate className="pagination"
                        previousLabel={'<'}
                        pageCount={Math.ceil(this.state.repo_count / 4)}
                        marginPagesDisplayed={1}
                        onPageChange={this.handlePaginationPageClick}
                        pageRangeDisplayed={3}
                        breakLabel={"..."}
                        nextLabel={'>'}>
                    </ReactPaginate>
                  </div>
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