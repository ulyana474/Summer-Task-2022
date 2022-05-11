import React from 'react';

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      followers: 0,
      following: 0
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
             followers: json.followers,
             following: json.following
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
    body = <div>{res1} followers<div>{res2} following</div></div>
        }
    return body;
  }
}
export default UserInfo;