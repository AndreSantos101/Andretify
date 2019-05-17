import React from 'react';
import Utils from '../Utils/Utils';
import '../Styles/selectedMusic.css';

//Component responsible to show the selected line from the list of music

const SelectedMusic = (props) => {
    /*
        If the flag for music playing is true it shows this component with the following infomation: 
        Album Cover | Title | Artists | Audio player
    */
    if (props.playActivated) {
            return (
                <div  >
                    <div className="selectedMusic">
                        <div className="col-md-2">
                            <img src={props.selectedSong[4]} alt="Album Cover"></img>
                        </div>
                        <div className="col-md-2">{props.selectedSong[1]}</div>
                        <div className="col-md-3">{Utils.getInstance().getListArtist(props.selectedSong[2])}</div>
                        <div className="col-md-5">
                            <audio controls loop autoPlay="autoplay" src={props.selectedSong[3]}></audio>
                        </div>
                    </div> 
        </div>);
    }else{
        return ("");
    }
}

export default SelectedMusic;