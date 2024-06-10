import { useState } from "react";
import "../style/userInfo.css"
import UserNav from '../componets/UserPageNav'
import { useAppContext } from "../providers/AppProvider";

export default function UserInfoPage() {
    const [update, setUpdate] = useState("")
    const [updateUserName, setUpdateUserName] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")
    const {currentUser} = useAppContext()
    let sendArr = {};

    function getData(e){
        e.preventDefault();
        if(updateUserName !== ""){
            sendArr.username = updateUserName
        }
        if(updateEmail !== ""){
            sendArr.email = updateEmail
        }
        fetch(`/api/users/${currentUser._id}`, {
            method: "PUT",
            body: JSON.stringify(sendArr),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resp => {
            if(resp.username !== currentUser.username) {
                setUpdate("You have successfully updated your profile");
            } else if(resp.email !== currentUser.email) {
                setUpdate("You have successfully updated your profile");
            }
        })
        .catch(err => {
            setUpdate("Could not update your profile with the given information")
            console.log(err)
        });
    }

    const handleDeleteUser = () => {
        fetch(`/api/users/${currentUser._id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } else {
                console.log('Error deleting user');
            }
        })
        .catch(error => console.error('Error deleting user:', error));
    };

    if(!currentUser) return <></>
    return (
        <>
        <UserNav/>
        <div className="amUserInfo">
            <div>Username: {currentUser.username}</div>
            <br/>
            <div>Email: {currentUser.email}</div>
            <br/>
            <div>You have saved {currentUser.savedRecipes.length} recipes!</div>
            <br/>
            <div>You have created {currentUser.createdRecipes.length} recipes!</div>
            <br/>
            <form onSubmit={getData}>
                <label htmlFor="nameInput">Username:</label>
                <input id="nameInput" onChange={e => setUpdateUserName(e.target.value)} value={updateUserName} />
                <br/>
                <br/>
                <label htmlFor="emailInput">Email:</label>
                <input id="emailInput" onChange={e => setUpdateEmail(e.target.value)} value={updateEmail} />
                <br/>
                <br/>
                <button type="submit">Update User</button>
            </form>
            <br/>
            <div>{update}</div>
            <button className="margin" onClick={() => handleDeleteUser(currentUser.userId)}>Delete User</button>
        </div>
        </>
    );
}