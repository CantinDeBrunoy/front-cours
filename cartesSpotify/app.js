let accessToken ;
let artiste = "wejdene"
let isPlaying = false;




const init = (player) => {
    player.initPlayer()
   
    
  }



const getUrlParameter = (sParam) => {
   let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
       sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
       sParameterName,
       i;
   let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
   sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
   for (i = 0; i < sURLVariables.length; i++) {
       sParameterName = sURLVariables[i].split('=');
       if (sParameterName[0] === sParam) {
           return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
       }
   }
};

const auth = () => {
   accessToken = getUrlParameter('access_token');
   let client_id = 'b576d60177a04708a12b714b9c593d05';
   let redirect_uri = encodeURIComponent('http://127.0.0.1:5500/');
   console.log(redirect_uri);
   const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`; 
   if(accessToken == null || accessToken == "" || accessToken == undefined){
     window.location.replace(redirect);
   }

   console.log(accessToken)
}





const getRecommendations = async (artiste) => {
    let listeTracks = [];
    let currentTrack = 0;

    //var oldChild = 
    let randomDiv = document.querySelectorAll('.randomDiv');
    const nombreDiv = randomDiv.length

    let i = 0;
    let toto = setInterval(() => {
        if(i===nombreDiv){
            clearInterval(toto)
            return
        }
        document.body.removeChild(randomDiv[i]);
        ++i;
    },50)    
    toto

   let tableauTemp = []
   fetch(`https://api.spotify.com/v1/search?q=${artiste}&type=track`, {
       method: "GET",
       headers: {
           Authorization: `Bearer ${accessToken}`
           }
       })
       .then(response => response.json())
       .then((data) => {
           console.log(data)
           Object.values(data.tracks.items).forEach((data) =>{
               if(!tableauTemp.includes(data.name)&&data.album.album_type=="album"&&data.preview_url!=null){
                   tableauTemp.push(data.name)
                   listeTracks.push(data)
               }                
           })
           let player = new Player(listeTracks)
           init(player)
       
       })
}

const addEventListener = () =>{
   const input = document.querySelector('.input');
   const btn = document.querySelector('.bouton');
   const div = document.querySelector('.randomDiv');

   input.addEventListener('change', (e) => {
       artiste = e.target.value 
   });

   btn.addEventListener('click',() => {
       getRecommendations(artiste)
       // input.style.setProperty('--display', 'none')
       // btn.style.setProperty('--display', 'none')
     })
}



auth()
addEventListener()

