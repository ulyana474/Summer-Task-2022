import React from 'react';
import "./style/main_state.css";

const RepoNumber = (props) => {
    if (props.number === -1) {//not loadet yet
        return <div></div>;
    }
    return <div className="repo-number">Repositories({props.number})</div>;
}

export default RepoNumber;