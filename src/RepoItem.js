import React from 'react';

class RepoItem extends React.Component {
  constructor(props) {
    super(props)
  }
  openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  onClick = (event) =>{
    alert("click")
  }
  render(){
  return (
    <div key={this.props.item.id} className="quote-view">{ this.props.item.login }</div>

      
   
  )
}
}

export default RepoItem;