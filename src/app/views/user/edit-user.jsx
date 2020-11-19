import React from "react";
import UserForm from "./UserForm"

const EditUser = (props) => {
    const { 
        user,
        match,
        history,
    } = props

    return (
        <>
            <UserForm {...props} />
        </>
    )
}

export default EditUser;