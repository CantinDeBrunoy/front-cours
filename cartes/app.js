const btnPrev = document.querySelector('.fleche--prev')
const btnNext = document.querySelector('.fleche--next')

let nombreCartes = document.querySelectorAll('.carte').length
let compteur = 0;


const init = () => {

  const cards = document.querySelectorAll('.carte')

  const nbCards = cards.length - 1
  cards.forEach((card, i) => {

    if(i==0){
      card.classList.add('active')
    }
    const isEven = i % 2 ===0

    // 10, c'est l'offset entre chaque carte

    const mult =  (isEven? 1 : -1)

    const spaceX = (0.4 * Math.random() * mult) + 2
    const spaceY = (3 * Math.random() * mult) + 4

    const offsetX = `${i * spaceX}px`
    const offsetY = `${i * spaceY}px`

    // card.style.setProperty('--offsetX', offsetX)
    // card.style.setProperty('--offsetY', offsetY)
    card.style.setProperty('--offsetX', 50)
    card.style.setProperty('--offsetY', 50)

    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    card.style.setProperty('--color', color)

    card.style.setProperty('--rotationX',Math.random()*360+'deg')

    
    const z = nbCards - i
    //setTimeout(card.style.setProperty('--zIndex', z),1000)
    card.style.setProperty('--zIndex', z)

    let number = document.createElement('span')
    number.classList.add('chiffre')
    card.appendChild(number)
    number.textContent = Math.round(Math.random()*99);
  })
}


const moveCard = (direction,random) => {
  //Premiere carte deplacé
  
  const cards = document.querySelectorAll('.carte')
  cards.forEach((card, i) => {
    if(i==compteur){
      card.style.setProperty('--left',direction+'%')  
      card.style.setProperty('--rotationX',0+'deg')
      card.style.setProperty('--zIndex',compteur +nombreCartes )

      setTimeout(()=>{
        card.style.setProperty('--scale',1.5 )
      },1000)
      
    }
  })
  compteur++
  console.log(compteur)
  if(compteur==nombreCartes+1){
    resetDeck()
  }
}


const resetDeck = () =>{
  const cards = document.querySelectorAll('.carte')
  compteur = 0
  console.log("plus de cartes")
  cards.forEach((card, i) => {
    card.style.setProperty('--left',50+'%')
    card.style.setProperty('--rotationX',Math.random()*360+'deg')
    card.style.setProperty('--zIndex',nombreCartes - i )  
    card.style.setProperty('--scale',1 )
 
    
    })
}

const easterEgg = () =>{
  const cards = document.querySelectorAll('.carte')

  if(compteur==nombreCartes){
    setTimeout(()=>{
      resetDeck()
    },1500)
    
    return ;
  }


    cards.forEach((card,i) =>{
      if(i>=compteur){
        card.style.setProperty('--rotationX',Math.random()*360+'deg')
      }
          
    })
    setTimeout(()=>{
      easterEgg()
    },500)

    let deplacerCarte = Math.round(Math.random()*6)
    if(deplacerCarte==2){
      moveCard(20,false)
    }
    else if(deplacerCarte==6){
      moveCard(80,false)
    }

    
    

 // }
  
}

const addListeners = (compteur,nombreCartes) => {
  btnPrev.addEventListener('click',() => {
    moveCard(20,false)
  })
  btnNext.addEventListener('click',() => {
    moveCard(80,false)
  })

  document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 40:
          resetDeck()
          break;
        case 37:
          moveCard(20,true)
          break;
        case 39:
          moveCard(80,false)
          break;
        case 38:
          easterEgg()
          break;
    };
  }
}



init()
addListeners(compteur,nombreCartes)

