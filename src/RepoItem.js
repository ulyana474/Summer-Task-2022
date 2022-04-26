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
    <div onClick={() => this.openInNewTab('https://google.com')}>
      {this.props.item}
    </div>
  )
}
}

export default RepoItem;