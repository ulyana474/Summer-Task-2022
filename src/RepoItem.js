import React from 'react';

class RepoItem extends React.Component {
  constructor(props) {
    super(props)
  }
  openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  handleClick = (event) => {
    this.openInNewTab(this.props.item.html_url)
  }
  render() {
    return (
      <div onClick={this.handleClick} key={this.props.item.id} className="quote-view">{this.props.item.login}</div>
    )
  }
}

export default RepoItem;