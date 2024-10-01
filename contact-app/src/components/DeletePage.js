import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const DeletePage = (props) => {
    const {id} = props.location.state;
    console.log(props.location.state);
    
    return(
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">Delete this contact?</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button pink center">
                        No
                    </button>
                </Link>
                <Link to="/">     
                    <button className="ui button red " onClick={() => props.handleDelete(id)}>
                        Yes
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DeletePage;