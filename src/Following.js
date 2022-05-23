import React from 'react';
import "./style/main_state.css";
import following from "./style/pictures/following.svg";

const Following = (props) => {
    if (props.res === '') {
        return <div></div>;
    }
    return <div className="user-info">
        <img src={following} className="following-img" alt="following"></img>
        <div className="following">{props.res} following</div>
    </div>;
}

export default Following;