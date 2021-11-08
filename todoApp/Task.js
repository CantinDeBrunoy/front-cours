class Task {
    constructor(title,place,time,description,color) {
        this.title = title;
        this.place = place;
        this.time = time;
        this.description = description;
        this.isActive = true;
        this.color = color
        this.initTask()
    }
    initTask() {
        var task = JSON.parse(localStorage.getItem(this.title));

        const TasksList = document.querySelector('.TasksList');
        //creation de la task
        let newTask = document.createElement('div')
        newTask.classList.add('task')
        newTask.style.setProperty('--borderColor', "solid "+this.color)
        TasksList.appendChild(newTask)

        //creation cote gauche

        let leftSide = document.createElement('div')
        leftSide.classList.add('leftSide')
        newTask.appendChild(leftSide)
        
        //creation cote droite

        let rightSide = document.createElement('div')
        rightSide.classList.add('rightSide')
        newTask.appendChild(rightSide)

        

        //creation done

        let newBoutonDelete = document.createElement('button')
        newBoutonDelete.classList.add('newBoutonDelete')
        newBoutonDelete.textContent = "done"
        leftSide.appendChild(newBoutonDelete)

        //creation done

        let newBoutonDelete2 = document.createElement('button')
        newBoutonDelete2.classList.add('newBoutonDelete2')
        newBoutonDelete2.textContent = "delete"
        leftSide.appendChild(newBoutonDelete2)

        //creation span nom 

        let newTaskName = document.createElement('span')
        newTaskName.classList.add('newTaskName')
        newTaskName.textContent = this.title
        rightSide.appendChild(newTaskName)
        

        

        //creation div temps lieu

        let newTaskDivTimePlace = document.createElement('div')
        newTaskDivTimePlace.classList.add('newTaskDivTimePlace')
        rightSide.appendChild(newTaskDivTimePlace)

        //creation temps

        let newTaskTime = document.createElement('span')
        newTaskTime.classList.add('newTaskTime')
        newTaskTime.textContent = this.time
        newTaskDivTimePlace.appendChild(newTaskTime)

        //creation lieu

        let newTaskPlace = document.createElement('span')
        newTaskPlace.classList.add('newTaskPlace')
        newTaskPlace.textContent = " - "+this.place
        newTaskDivTimePlace.appendChild(newTaskPlace)

        //creation description

        let newTaskDescritpion = document.createElement('span')
        newTaskDescritpion.classList.add('newTaskDescritpion')
        newTaskDescritpion.textContent = this.description
        rightSide.appendChild(newTaskDescritpion)

        //listener du bouton
        newBoutonDelete.addEventListener('click',()=>{
            if(this.isActive === true){
                this.isActive = false;
                task.isActive = false;
                newTask.style.opacity = 0.5;
                newTaskName.style.textDecoration = "line-through"
                newBoutonDelete.textContent = "restaurer"
                console.log(task);
                localStorage.setItem(this.title, JSON.stringify(task));
            }
            else{
                this.isActive = true;
                newTask.style.opacity = 1;
                newTaskName.style.textDecoration = ""
                newBoutonDelete.textContent = "done"
                task.isActive = true;
                console.log(task);
                localStorage.setItem(this.title, JSON.stringify(task));
            }
            console.log(this.isActive);
        })

        newBoutonDelete2.addEventListener('click',()=>{
            newTask.remove()
            localStorage.removeItem(this.title);
        })

        console.log(task);
        if(task.isActive == false){
            newTask.style.opacity = 0.5;
            newTaskName.style.textDecoration = "line-through"
            newBoutonDelete.textContent = "restaurer"
        }

        
    }
}