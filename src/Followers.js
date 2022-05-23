import React from 'react';
import "./style/main_state.css";
import followers from "./style/pictures/followers.svg";

const Followers = (props) => {
    if (props.res === '') {
        return <div></div>;
    }
    return <div className="user-info">
        <img src={followers} className="followers-img" alt="followers"></img>
        <div className="followers">{props.res} followers</div>
    </div>;
}

export default Followers;