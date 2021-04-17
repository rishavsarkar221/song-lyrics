import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [a, setA] = useState({
        artist: "",
        music: ""
    });

    const [mergeEff, setMergeEff] = useState("");

    const [lyrics, setLyrics] = useState("");

    const onChange = (event) => {
        setA(oldVal => {
            return {
                ...oldVal,
                [event.target.name]: event.target.value
            }
        });
    }

    const merge = () => {
        setMergeEff(a.music + a.artist);
        
        if(a.music === "" || a.artist === "") {
            document.title = "Get Song Lyrics"
        }
        else {
            document.title = `${a.music} by ${a.artist}`;
        }
    }

    useEffect(() => {
        async function lyrics() {
            const api = await axios.get(`https://api.lyrics.ovh/v1/${a.artist}/${a.music}`);
            console.log(api.data.lyrics);
            setLyrics(api.data.lyrics);
        }

        lyrics();
    }, [mergeEff]);

    return(
        <React.Fragment>
            <input type="text" name="artist" className="form-control" onChange={onChange} placeholder="Enter Artist Name (REQUIRED)" />
            <br/>
            
            <input type="text" name="music" className="form-control" onChange={onChange} placeholder="Enter Music Name (REQUIRED)" />
            <br/>
            
            <button onClick={merge} className="btn btn-outline-primary">Get Lyrics</button>
            <br/><br/><br/><br/>
            
            <div className="lyrics">
                {lyrics}
            </div>
        </React.Fragment>
    );
}

export default App;