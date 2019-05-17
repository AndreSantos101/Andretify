import React from 'react';
import Utils from '../Utils/Utils';
import '../Styles/line.css';

/*
    The component that represents a Line in the music list.
    Each line shows the following infomation: 
    Number of track | Album Cover | Title | Artists | Duration of the full content of the music (in min:sec) | Play Icon 
    The Play icon onclick event will trigger a method in Andretify reponsible do handle the change of states
*/
const Line = (props) => (
    <tr id={"row_" + props.count} className='selectedMusicLine'>
        <td className="col-md-1" scope="row">{props.count}</td>
        <td className="col-md-1">
            <img src={props.musicInfo[4]} alt="Album Cover"></img>
        </td>
        <td className="col-md-3">{props.musicInfo[1]}</td>
        <td className="col-md-3">{Utils.getInstance().getListArtist(props.musicInfo[2])}</td>
        <td className="col-md-1">{Utils.getInstance().getTimeinMinutes(props.musicInfo[0])}</td>
        <td className="col-md-3">
            <i id={"playStopIcon_" + props.count} onClick={() => { props.handlePlayMusic(props.musicInfo) }} className='glyphicon glyphicon-play playStopIcon'></i>
        </td>
    </tr>
)

export default Line;