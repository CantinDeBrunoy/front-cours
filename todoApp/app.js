let taskName;
let taskDescription;
let taskPlace;
let taskTime;
let colors = document.querySelector('.colors').childNodes;
let color;
let taskColor;
let tabAllTasks = [];

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
            taskColor = color.getAttribute("value")
            color.style.setProperty('--borderColor', "solid black")
        })
    });
 
    btn.addEventListener('click',() => {
       
        const task = new Task(taskName,taskPlace,taskTime,taskDescription,taskColor)
        tabAllTasks.push(task)
      })
}


addEventListener()
