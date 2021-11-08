let taskName;
let taskDescription;
let taskPlace;
let taskTime;
let colors = document.querySelector('.colors').childNodes;
let color;
let taskColor;
let tabAllTasks = [];

function getAllItems() {
    var archive = {}
    keys = Object.keys(localStorage)
    i = keys.length;

    while ( i-- ) {
        archive[keys[i]] = localStorage.getItem( keys[i] );
        console.log(JSON.parse(archive[keys[i]]));
        new Task(JSON.parse(archive[keys[i]]).title,JSON.parse(archive[keys[i]]).place,JSON.parse(archive[keys[i]]).time,JSON.parse(archive[keys[i]]).description,JSON.parse(archive[keys[i]]).color)
        //new Task(taskName,taskPlace,taskTime,taskDescription,taskColor)
        //addTodoInHTML(JSON.parse(archive[keys[i]]));
    }
    //console.log(archive);
}


const addEventListener = () =>{
    //inputs
    const inputTaskName = document.querySelector('.input-tasksName');
    const inputTaskDescription = document.querySelector('.input-tasksDescription');
    const inputTaskTime = document.querySelector('.input-tasksTime');
    const inputTaskPlace = document.querySelector('.input-tasksPlace');
    //btn
    const btn = document.querySelector('.bouton-tasks');

    //inputListeners

    inputTaskName.addEventListener('change', (e) => {
        taskName = e.target.value 
    });

    inputTaskTime.addEventListener('change', (e) => {
        taskTime = e.target.value 
    });

    inputTaskPlace.addEventListener('change', (e) => {
        taskPlace = e.target.value 
    });

    inputTaskDescription.addEventListener('change', (e) => {
        taskDescription = e.target.value 
    });

    //btnListener

    //creer des couleurs

    colors.forEach((color,i)=>{
        if(i%2!=0){
            taskColor = color.getAttribute("value")
            color.style.setProperty('--backgroundColor', taskColor)
            color.style.setProperty('--borderColor', "")
        }
    })
    colors.forEach(color => {
        
        color.addEventListener('click',()=>{
            const children = color.parentNode.children
            for(let element of children){
                element.style.setProperty('--borderColor', "")
            }
            taskColor = color.getAttribute("value")
            color.style.setProperty('--borderColor', "solid black")
            
        })
    });
 
    btn.addEventListener('click',() => {
        const title = taskName;
        const place = taskPlace;
        const time = taskTime;
        const description = taskDescription;
        const color = taskColor;
        const isActive = true;
        const newTask = {title,place,description,isActive,time,color}
        localStorage.setItem(title, JSON.stringify(newTask));
        const task = new Task(taskName,taskPlace,taskTime,taskDescription,taskColor)
        console.log(task);
        
        tabAllTasks.push(task)
      })
}


addEventListener()
getAllItems()