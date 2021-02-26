import { dbService } from 'fbase';
import React, {useEffect, useState} from 'react';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
                setNweets((prev) => [nweetObject, ...prev]);
            });
    }
    useEffect(()=>{
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
        getNweets();
    }
    const onChange = (event) => {
        const { target: {value},} = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="your mind?" maxLength={120}
                    onChange={onChange} />
                <input type="submit" value="nwitter" />
            </form>
            <div>
                {nweets.map((nweet)=> (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;