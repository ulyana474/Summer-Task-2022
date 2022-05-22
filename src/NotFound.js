import React from 'react';
import person from "./style/pictures/person.png";

const NotFound = () => {
    return (<div className="wrapper">
                <div className="under-search">
                    <img src={person} className="person-image" alt="big search" />
                    <p className="user-not-found">User not found</p>
                </div>
            </div>);
}

export default NotFound;