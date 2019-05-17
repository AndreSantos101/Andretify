/*
    A class responsible to keep functions used through the app but don´t actually make part of the responsability of the component himself.
*/

export default class Utils{

    //Singleton Pattern
    static instance = null;

    static getInstance() {
        if(this.instance == null)
            this.instance = new Utils();
        return this.instance;          
    }

    /* 
        A method responsible to receive a number representing the total number of seconds that the Deezer API returns,
        and return a string with the format of "mm:ss" with the respective conversion made.
    */
    getTimeinMinutes = (seconds) =>{
        const decimalMinutes = parseInt(seconds)/60;
        const minutes = Math.floor(decimalMinutes);
        const secondsIn100 = (decimalMinutes -  Math.floor(decimalMinutes)).toFixed(2) * 100;
        const secondsF = Math.floor(secondsIn100 * 60/100);
        return  `${minutes}:${secondsF}`;
    }

    /* 
        A method responsible to receive an array of artists and return a string with each name of the artists,
        separated by commas.
    */
    getListArtist = (musicArtistsObject) =>(musicArtistsObject.map((elem)=>elem.name)).join(", ");

}
