let accessToken ;
let artiste = "wejdene"
let isPlaying = false;

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


const createRandomDiv = (data) =>{
   //creation de la div
   let body = document.body
   //console.log(body)
   let div = document.createElement('div')
   div.classList.add('randomDiv')
   body.appendChild(div)

   

   let span = document.createElement('span')
   span.classList.add('text')
   div.appendChild(span)

   div.addEventListener("mouseenter", function( event ) {
    console.log("toto")
});
   
   const isEven = Math.round(Math.random()*2) % 2 ===0
   const mult =  (isEven? 1 : -1)

   let popularity = data.popularity;

   let X = Math.random()*50 * mult;
   let Y = Math.random()*50 * mult;
   let scale = Math.random()*2;
   let width = popularity*5;
   
   let image = data.album.images[1].url
   let imageBg = data.album.images[0].url

   let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

   div.style.setProperty('--left', X+"%")
   div.style.setProperty('--top', Y+"%")
   
   setTimeout(() => {
       div.style.setProperty('--background-image', "url("+image+")")
       div.style.backgroundRepeat = "no-repeat";
       div.style.backgroundSize ="cover";
       div.style.setProperty('--width', width+"px")
       div.style.setProperty('--color', color)
       
       let textSize = 20;
       //s'il est plus petit
       for(let i =0;i<6;++i){
           textSize +=i;
           //console.log(textSize)
           span.style.setProperty('--font-size', textSize+"px")
       }

       span.textContent = data.name;

   },1000)




    div.addEventListener('click',() => {
        if(isPlaying) return
        isPlaying = true
        audio.volume = 0.1;
        audio.play()
        setTimeout(() =>{
            audio.pause(); 
            // body.style.background= image
            div.style.setProperty('--display', 'none')
            isPlaying = false
        },5000)
            body.style.backgroundImage = "url("+imageBg+")";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize ="cover";
            span.style.setProperty('--font-size', 0+"px")
            div.style.setProperty('--width', 0+"px")
     })

     //
     let audio = document.createElement('audio')
     audio.style.display = "none"
     audio.src = data.preview_url
     audio.controls = true
     div.appendChild(audio)

    

    //  let code = document.createElement('code')
    //  audio.appendChild(code)
   
}

const getRecommendations = async (artiste) => {

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

    


    // while(document.querySelectorAll('.randomDiv')){
    //     setTimeout(() => {
    //         const randomDiv = document.querySelector('.randomDiv');
    //         document.body.removeChild(randomDiv);
    //     },500)
        
    // }
    
    // if(randomDiv){
    //     console.log(randomDiv)
    //     randomDiv.forEach((div) =>{
           
    //     })
    // }
    

   //const wait = await timeout(2000)
   //console.log(wait)`
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
                   createRandomDiv(data)
               }                
           })
       
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

async function getRecommandations2() {
   const response = await fetch('fakeData.json');
   const data = await response.json();
}



auth()
addEventListener()

