import React from 'react';
import '../Styles/header.css';
import Header from './Header';
import SelectedMusic from './SelectedMusic';
import ListMusics from './ListMusics';
import Deezer from '../API/Deezer';


export default class App extends React.Component {

  /* 
    The states of the Andretify App:
      listOfSongs: the list received from a request to the Deezer API,
      selectedSong : current selected song (displayed in SelectedLine component),
      musicPlaying: a flag representing if a song is playing or not,
      lineHighlight: the id of the line selected and so, highlighted
  */

  state = {
    listOfSongs: [],
    selectedSong: [],
    musicPlaying: false,
    lineHighlight: undefined
  }

  /*
    The method that as soon as the App is rendered is triggered. 
    It will call a function from Utils.js who will make a request to get the list of musics and set the state listOfSongs with that value.
    This function returns a array with the following information in each object of the array:
    
    [0] elem.duration: Duration of the music in seconds
    [1] elem.title: Title of music
    [2] elem.contributors: Artists who made the Music
    [3] elem.preview: An mp3 audio file who displays a 30 seconds sample of the music
    [4] elem.album.cover_small: Image of the album Cover from which the song belongs
    [5] index: The index of the song, used to build the ID of the Line component 
  */

  componentDidMount() {
    try {
      Deezer.getInstance().getTrackSongs()
        .then(data => {
          this.setState(() => ({
            listOfSongs: (data.data.map((elem, index) => [elem.duration, elem.title, elem.contributors, elem.preview, elem.album.cover_small, index]))
          }));

        });
    } catch (e) {
      alert(e);
    }
  }


  /*
    A method responsible to highlight the selected line and change the icon Play/Stop.
  */
  highlightLine = (isToHighlight, musicHighLightedIndex) => {
    if (this.state.lineHighlight) {
      if (isToHighlight) {
        /* 
          Already exists a select row, so the new line is highlighted & has a stop icon, and 
          the line before highlighted is set to it's previous color as well as a play icon.
        */
        document.getElementById("row_"+this.state.lineHighlight).style.backgroundColor = '#2a2c2e';
        document.getElementById("row_" + musicHighLightedIndex).style.backgroundColor = "gray";

        document.getElementById("playStopIcon_" + this.state.lineHighlight).className = "glyphicon glyphicon-play playStopIcon";
        document.getElementById("playStopIcon_" + musicHighLightedIndex).className = "glyphicon glyphicon-stop playStopIcon";
      } else {
        /* 
          In this case, there is going to be none selected line, so, the previous highlighted line
          is set to it's normal color and with a play icon.
        */
        document.getElementById("row_" + musicHighLightedIndex).style.backgroundColor = "#2a2c2e";
        document.getElementById("playStopIcon_" + this.state.lineHighlight).className = "glyphicon glyphicon-play playStopIcon";
      }
    } else {
      // 1st Time - only highlight the line and change the icon to stop.
      if (document.getElementById("playStopIcon_" + (musicHighLightedIndex))) {
        document.getElementById("playStopIcon_" + (musicHighLightedIndex)).className = "glyphicon glyphicon-stop playStopIcon"
      }
      document.getElementById("row_" + musicHighLightedIndex).style.backgroundColor = "gray";
    }

  }

  /*
    A method to handle the click on the Play icon.
    It will receive a song and check if it's the current selectedSong
  */
  handlePlayMusic = (selectedSong) => {
    if (selectedSong == this.state.selectedSong) {
      // If it is, the goal is to stop the song, remove the selectedLine component, call highlight with a false flag and change the states.
      this.setState(() => ({
        musicPlaying: false,
        selectedSong: [],
        lineHighlight: undefined
      }))
      this.highlightLine(false, this.state.selectedSong[5] + 1);
    } else {
      // If it isn't, the goal is to play the song, create the selectedLine component, call highlight with a true flag and change the states.
      this.setState(() => ({
        musicPlaying: true,
        selectedSong: selectedSong,
        lineHighlight: (selectedSong[5] + 1)
      }));
      this.highlightLine(true, selectedSong[5] + 1);
    }
  }

  render() {
    return (
      <div className='background-central'>
        <Header id='Header' className='background-top'></Header>
        <div className="container">
          <ListMusics
            listSongs={this.state.listOfSongs}
            playActivated={this.state.musicPlaying}
            handlePlayMusic={this.handlePlayMusic}>
          </ListMusics>
        </div>
        <SelectedMusic
          selectedSong={this.state.selectedSong}
          playActivated={this.state.musicPlaying}
          handlePlayMusic={this.handlePlayMusic}>
        </SelectedMusic>
      </div>

    )
  }
}