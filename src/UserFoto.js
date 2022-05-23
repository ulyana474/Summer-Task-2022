import React from 'react';
import "./style/main_state.css";


const UserFoto = (props) => {
    if (props.foto === null) {//not loadet yet
        return <div></div>;
    }
    return <img className="user-foto" src={props.foto} alt=""></img>;
}

export default UserFoto;