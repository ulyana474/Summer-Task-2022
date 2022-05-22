import React from 'react';
import "./style/empty_repos.css";
import cross from "./style/pictures/cross.svg";

const EmptyRepos = () => {
    return (<div className='right-col-empty'>
                <img src={cross} class="cross-pic" alt="cross"></img>
                <p class="empty-message">Repository list is empty</p>
            </div>)
}

export default EmptyRepos;