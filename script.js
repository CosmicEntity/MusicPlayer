const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

// Music Directory
const songs = [{
    name: "Cartoon - On&On",
    displayName: "On & On",
    artist: "Cartoon"
},{
    name: "Culture Code - Make Me Move",
    displayName: "Make Me Move",
    artist: "Culture Code"
},{
    name: "Diviners - Savannah",
    displayName: "Savannah",
    artist: "Diviners"
},{
    name: "Henri Werner - Burned",
    displayName: "Burned",
    artist: "Henri Werner"
}]

// Check if music is playing.
let isPlaying = false;

// Play Song
function playSong()
{
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
    music.play();
}

// Pause Song
function pauseSong()
{
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
    music.pause();
}

// Play or Pause
playBtn.addEventListener("click", ()=> isPlaying ? pauseSong() : playSong());

// Update Player with current Song
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

// Change song
let songIndex = 0;

// next Song
function nextSong(){
    songIndex=(songIndex+1)%(songs.length);
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex<0)
    songIndex=songs.length-1;    
    loadSong(songs[songIndex]);
    playSong();
}
// Update Progress bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        
        // Update Progress Bar width;
        const progressPercent = (currentTime / duration)*100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate & Display Duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        
        // Delay switching to avoid NaN showing during song change
        if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        // Update & Display Current Time
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration; //Triggers timeupdate event
}

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click",nextSong);
music.addEventListener("timeupdate",updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

//On load -> Select one song
loadSong(songs[songIndex]);