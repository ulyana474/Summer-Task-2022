import React from 'react';
import RepoItem from "./RepoItem";

class Output extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoaded: false,
           error: null,
           users: []
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
                         users: json.items
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
        //alert("Mount");
        console.log('componentDidMount() lifecycle')
        console.log(this.props.user);
        let url = `https://api.github.com/search/users?q=${this.props.user}`;
        console.log(url);
        this.xhr.open("GET", url, true);
        this.xhr.send();
    }    


render() {
    let body;
    console.log('render() lifecycle')
    if (!this.state.isLoaded) {
    	// yet loading
      body = <div>Loading...</div>
    } else if (this.state.error) {
    	// error
      body = <div>Error occured: { this.state.error }</div>
    } else {
    	// success
      var users = this.state.users.map(
              user => <RepoItem  item = {user} />
      );
        //body = <p>Props: {this.props.user}</p>
    	body = <div>{users}</div>
    }
  
  	return body;
  } 
    /* console.log('render')
    console.log('render') */
}
export default Output;