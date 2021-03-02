import { dbService, storgaeService } from 'fbase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input value={newNweet} required onChange={onChange} />
                        <input type="submit" value="update" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">cancel</button>
                    </>
                ) : (
                    <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && 
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>}
                    </>
                )
            }
        </div>
    )
};

export default Nweet;