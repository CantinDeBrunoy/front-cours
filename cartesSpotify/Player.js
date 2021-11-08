class Player {
  constructor(listeTracks) {
    this.listeTracks = listeTracks;
    this.index = 0;
    this.currentIndex = 0;
    this.displayedTracks = [];


    this.nombreTrack = 1;
    this.isPlaying = false;

    
  }
  initPlayer() {

    

    let div = document.createElement('div')
    div.classList.add('player')
    document.body.appendChild(div)

    let divTracksAndArrows = document.createElement('div')
    divTracksAndArrows.classList.add('divTracksAndArrows')
    div.appendChild(divTracksAndArrows)

    //fleche gauche
    let boutonGauche = document.createElement('button')
    boutonGauche.classList.add('boutonGauche')
    boutonGauche.textContent = "<"
    divTracksAndArrows.appendChild(boutonGauche)

    //la diuv qui contient les sons
    let divAllTracks = document.createElement('div')
    divAllTracks.classList.add('divAllTracks')
    divTracksAndArrows.appendChild(divAllTracks)

    let audio = document.createElement('audio')
    audio.classList.add('balise-audio')
    //audio.style.display = "none"
    audio.controls = true
    div.appendChild(audio)


    //les sons
    // this.listeTracks.forEach((track) => {
    //   //creer une div pour une track
    //   this.createTrack(track)
    // })

    //fleche droite
    let boutonDroite = document.createElement('button')
    boutonDroite.classList.add('boutonDroite')
    boutonDroite.textContent = ">"
    divTracksAndArrows.appendChild(boutonDroite)

    this.addListeners(boutonGauche, boutonDroite)
    this.getDisplayedTracks()

    //this.afficherTrack()



  }
  addListeners(btnPrev, btnNext) {
    btnPrev.addEventListener('click', () => {
      // this.index = this.index - 1
      // if (this.index == -1) {
      //   this.index = this.listeTracks.length - 1
      // }

      // this.afficherTrack()
      this.currentIndex -= 1

      if (this.currentIndex == -1) {
        this.currentIndex = this.listeTracks.length - 1
      }
      //console.log(this.currentIndex)
      this.getDisplayedTracks()
    })
    btnNext.addEventListener('click', () => {
      // this.index = this.index + 1
      // this.index = this.index % this.listeTracks.length;
      // this.afficherTrack()

      this.currentIndex += 1
      this.currentIndex = this.currentIndex % this.listeTracks.length;
      console.log(this.currentIndex)
      this.getDisplayedTracks()
    })

    //touches
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 37:
          this.index = this.index - 1
          break;
        case 39:
          this.index = this.index + 1
          break;
      };
    }
  }
  createTrack(track,indexDeLaTrack){
    let divAllTracks = document.querySelector('.divAllTracks');
    //console.log(track)

    
    
    let trackPlayer = document.createElement('div')
      trackPlayer.classList.add(`track`)
      trackPlayer.style.setProperty('--background-image', "url(" + track.album.images[1].url + ")")
      if(indexDeLaTrack==this.nombreTrack){
        trackPlayer.style.width = 500+"px"
      }

      divAllTracks.appendChild(trackPlayer)

      

      //creer un span pour le titre
      let titrePlayer = document.createElement('span')
      titrePlayer.classList.add('titrePlayer')
      titrePlayer.textContent = track.name
      trackPlayer.appendChild(titrePlayer)



      trackPlayer.addEventListener('click', () => {
        let audio = document.querySelector('.balise-audio');
        //console.log(audio)
        audio.src = track.preview_url
        //audio.volume = 0.1;
        if (isPlaying) {
          isPlaying = false
          audio.pause()
        }
        else {
          isPlaying = true
          audio.play()
        }
      })

  }
  afficherTrack() {
    let div = document.querySelector('.divAllTracks');
    let allTracks = div.childNodes;
    console.log(allTracks[this.listeTracks.indexOf(this.listeTracks[this.index])]);
    allTracks.forEach((track, i) => {
      console.log(track)
      track.id = i
    })

    let premiereTrack = this.index - this.nombreTrack;
    if (premiereTrack < 0) {
      premiereTrack = this.listeTracks.length - this.nombreTrack + this.index
    }
    let trackActuel = this.index;

    let derniereTrack = (this.index + this.nombreTrack) % this.listeTracks.length;
    if (derniereTrack >= this.listeTracks.length) {
      console.log("zebi")
    }


    console.log(premiereTrack, trackActuel, derniereTrack)
    if (premiereTrack < derniereTrack) {
      console.log("normal")
      this.listeTracks.forEach((data) => {
        console.log(data.name);
      })
      for (let i = premiereTrack; i <= derniereTrack; ++i) {
        console.log(" j'affiche " + i)
        allTracks[this.listeTracks.indexOf(this.listeTracks[i])].style.setProperty('--display', "flex")

      }
    }
    else {
      console.log(" pas normal")
      this.listeTracks.forEach((data) => {
        console.log(data.name);
      })
      for (let i = premiereTrack; i <= this.listeTracks.length - 1; ++i) {
        console.log(" j'affiche " + i)
        allTracks[this.listeTracks.indexOf(this.listeTracks[i])].style.setProperty('--display', "flex")
      }
      for (let i = 0; i <= derniereTrack; ++i) {
        console.log(" j'affiche " + i)
        allTracks[this.listeTracks.indexOf(this.listeTracks[i])].style.setProperty('--display', "flex")
      }

    }



  }
  getDisplayedTracks(){
    
    //reset
    this.displayedTracks = []
    let div = document.querySelector('.divAllTracks');
    while (div.firstChild) {
      div.removeChild(div.lastChild);
    }

    //console.log(div)
    let allTracks = div.childNodes;
    //console.log(allTracks[this.listeTracks.indexOf(this.listeTracks[this.index])]);
    allTracks.forEach((track, i) => {
      //console.log(track)
      track.id = i
      track.style.setProperty('--display', "none")
    })

    this.listeTracks.forEach((data) =>{
      console.log(data.name)
    })
    for(let i =this.nombreTrack;i>0;--i){
      let index = this.currentIndex-i < 0 ? this.listeTracks.length-i + this.currentIndex : this.currentIndex -i
      console.log(index)
      this.displayedTracks.push(this.listeTracks[index])
    }
    this.displayedTracks.push(this.listeTracks[this.currentIndex])

    for(let i =1;i<this.nombreTrack+1;++i){
      let index = this.currentIndex+i > this.listeTracks.length-i ? 0 :  this.currentIndex+i
      console.log(index)
      this.displayedTracks.push(this.listeTracks[index])
    }

    this.displayedTracks.forEach((data) =>{
      console.log(data.name)
    })

    this.displayedTracks.forEach((track, i) =>{
      this.createTrack(track,i)
    } )
  }
};