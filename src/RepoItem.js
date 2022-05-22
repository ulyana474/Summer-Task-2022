import React from 'react';

class RepoItem extends React.Component {
  openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  handleClick = (event) => {
    this.openInNewTab(this.props.item.html_url);
  };

  render() {
    return (
      <div className="repo-block">
        <p className="repo-name" 
            onClick={this.handleClick} 
            key={this.props.item.id}>
              {this.props.item.name}
        </p>
        <p className="repo-description">
          {this.props.item.description}
        </p>
      </div>
    )
  };
}

export default RepoItem;