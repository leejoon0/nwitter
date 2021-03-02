import React, { useEffect, useState }  from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }
    const getMyNweets = async () => {
        const nweets = await dbService
                            .collection("nweets")
                            .where("creatorId", "==", userObj.uid)
                            .orderBy("createdAt")
                            .get();
        console.log(nweets.docs.map(doc => doc.data()))
    }

    useEffect(()=>{
        getMyNweets();
    }, []);

    const onChange = (event) => {
        const { target: {value},} = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });

            refreshUser();
        }
    }
    return ( 
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" value={newDisplayName} onChange={onChange} autoFocus />
                <input type="submit" value="update profile" className="formBtn" 
                    style={{
                        marginTop: 10,
                    }} 
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile;