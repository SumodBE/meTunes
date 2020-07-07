const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [{
    name: 'seigi-shikkou-extended',
    displayName: 'Seigi Shikkou',
    artist: 'Music Legends',
    imageName: 'Saitama.jpg'
},
{
    name: 'naruto',
    displayName: 'Shouryuu',
    artist: 'Yasuharu Takanashi',
    imageName: 'naruto.png'
}];


let isPlaying = false;


//playSong
function playSong() {
    audio.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaying = true
}

//pauseSong
function pauseSong() {
    audio.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    isPlaying = false;
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update the dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = `audio/${song.name}.mp3`;
    image.src = `img/${song.imageName}`

}

let songIdx = 1;

//On Load DOM
loadSong(songs[songIdx]);

function nextSong() {
    if (songIdx == 0) {
        songIdx++;
    }
    else {
        songIdx = 0;
    }
    loadSong(songs[songIdx]);
    playSong();
}

function prevSong() {
    if (songIdx == 0) {
        songIdx = 1;
    }
    else {
        songIdx = 0;
    }
    loadSong(songs[songIdx]);
    playSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //update progressbar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durtionMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durtionMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clicX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clicX / width) * duration;
}


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
audio.addEventListener('ended', nextSong);