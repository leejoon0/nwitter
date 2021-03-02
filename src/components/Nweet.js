import { dbService, storgaeService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        if(window.confirm("delete?")){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storgaeService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const { target: { value }} = event;
        setNewNweet(value);
    }
    return (                    
        <div>
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input value={newNweet} required onChange={onChange} />
                        <input type="submit" value="update" />
                    </form>
                    <button onClick={toggleEditing}>cancel</button>
                    </>
                ) : (
                    <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                    {isOwner && <><button onClick={onDeleteClick}>delete</button>
                    <button onClick={toggleEditing}>edit</button></>}
                    </>
                )
            }
        </div>
    )
};

export default Nweet;