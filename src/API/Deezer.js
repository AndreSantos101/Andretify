export default class Deezer {

    // Singleton Pattern, once it's only needed 1 instance of Deezer object, which is used to make requests to teh Deezer API (streaming music service)
    static instance = null;

    static getInstance() {
        if(this.instance == null)
            this.instance = new Deezer();

        return this.instance;          
    }

    //method to make a request for the top 20 musics of Coldplay as a way to actually play music and not mock songs objects.
    getTrackSongs(){
        return (
            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com//artist//892//top?limit=20')
                    .then(data => data.json())
        );
    }



}