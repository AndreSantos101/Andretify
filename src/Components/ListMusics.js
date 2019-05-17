import React from 'react';
import Line from './Line';
import '../Styles/listMusics.css';

/* 
    The Component responsible to show a table with the list of music.
    For each music in the list of musics that came from the request made to the Deezer API, 
    it's created a Line component, sending through props argument, the variables needed to handle events and display information in each line
*/

const ListMusics = (props) => (
    <div className='ListMusics'>
        <table className="table table-hover table-dark">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Album</th>
                    <th scope="col">Title</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Hear it!</th>

                </tr>
            </thead>
            <tbody>
                {
                    props.listSongs.map((elem, index) => (
                        <Line
                            musicInfo={elem}
                            count={index + 1}
                            playActivated={props.playActivated}
                            handlePlayMusic={props.handlePlayMusic}>
                            >
                        </Line>
                    ))
                }
            </tbody>
        </table>
    </div>
)

export default ListMusics;