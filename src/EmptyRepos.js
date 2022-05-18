import React from 'react';
import "./style/empty_repos.css"
import cross from "./style/pictures/cross.png"

const EmptyRepos = () => {
    return(<div>
    <img src = {cross} class="cross-pic" alt = "cross"></img>
    <p class="empty-message">Repository list is empty</p>
    </div>)
            }

export default EmptyRepos;