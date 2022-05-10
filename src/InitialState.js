import React from 'react';
import bigSearch from "./style/pictures/big-search.png"

const InitialState = () => {
return(<div className ="wrapper">
        <div className="under-search">
            <img src= {bigSearch} className="big-search-image" alt="big search" />
            <p className="start_searching">Start with searching</p>
            <p className="git-hub-user">a GitHub user</p>
        </div>
        </div>)
        }

export default InitialState;
