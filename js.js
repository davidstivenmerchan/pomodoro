let tareas = [];
let formulario = document.getElementById("formulario");
let caja = document.getElementById("caja");
let btn_envio = document.getElementById("boton_envio");
let caja_tareas = document.querySelector(".tareas");
let tituloTarea = document.querySelector(".tituloTarea");
caja_tareas.setAttribute("Ocupado","no");
let caja_tiempo = document.querySelector(".tiempo");
let contador = 10;



formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(caja.value!=""){
        crearTarea(caja.value);
        caja.value="";
        agregarTarea();
    }
    
})
function tiempo_descanso(){
    caja_tiempo.innerHTML = `00:${contador <10 ? `0${contador}` :`${contador}`}`;
    tituloTarea.innerHTML = `Descanso`;
    contador--;
    if(contador==-1){
        clearInterval(tiempoDescanso);
        tituloTarea.innerHTML = ``;
    }
}

function regresion_tiempo(id){
    
    caja_tiempo.innerHTML = `00:${contador <10 ? `0${contador}` :`${contador}`}`;
    contador--;
    if(contador==-1){
        clearInterval(tiempo);
        caja_tareas.setAttribute("Ocupado","no");
        ocupadaCajaTareas = caja_tareas.getAttribute("Ocupado");
        console.log(ocupadaCajaTareas);
        let id_tareas = tareas.findIndex((tarea)=>tarea.id == id);
        tareas[id_tareas].completado = true;
        contador=5;
        console.log(contador)

        
        tiempoDescanso = setInterval(()=>{
            tiempo_descanso();
        },1000); 
        
        tareas.forEach(tarea =>{
            console.log(tarea);
        })
        
        agregarTarea()     
    }
}

function crearTarea(valor){
    const nuevaTarea = {
        id:(Math.random() * 100).toString(36).slice(2),
        titulo:valor,
        completado:false
    }
    tareas.unshift(nuevaTarea);
    tareas.forEach((tarea)=>{
        console.log(tarea);
    }) 
}

function agregarTarea(){
    const html = tareas.map((tarea) => {
    return `
    <div>
        ${tarea.completado ? '<p>Tarea Terminada</p>' : `<button class="btn_tarea" id="${tarea.id}" titulo="${tarea.titulo}">Comenzar</button>`} 
        <div>${tarea.titulo}</div>
    </div>
    `
});

caja_tareas.innerHTML = html.join(" ");

let btns_tarea = document.querySelectorAll(".btn_tarea");

let ocupadaCajaTareas = caja_tareas.getAttribute("Ocupado");

btns_tarea.forEach(btn_tarea =>{
    btn_tarea.addEventListener("click",()=>{
        contador=10;

        let tareaid = btn_tarea.getAttribute("id");
        if(ocupadaCajaTareas=="no"){
            let titulo = btn_tarea.getAttribute("titulo");
            
            tituloTarea.innerHTML = `${titulo}`;
            btn_tarea.textContent = 'En progreso';
            caja_tareas.setAttribute("Ocupado","si");
            ocupadaCajaTareas = caja_tareas.getAttribute("Ocupado");
            console.log(ocupadaCajaTareas)
    
            tiempo = setInterval(() => {
                regresion_tiempo(tareaid);
              }, 1000);
            
        }else{
           suspenderTarea = window.confirm("no se puede colcoar otra tarea porque ya hay una , quiere suspender la tarea actual?");
           if(suspenderTarea){

            clearInterval(tiempo);
            let titulo = btn_tarea.getAttribute("titulo");
            
            tituloTarea.innerHTML = `${titulo}`;
            btn_tarea.textContent = 'En progreso';
            caja_tareas.setAttribute("Ocupado","si");
            ocupadaCajaTareas = caja_tareas.getAttribute("Ocupado");
            console.log(ocupadaCajaTareas)
    
            tiempo = setInterval(() => {
                regresion_tiempo(tareaid);
              }, 1000);
           }else{
               console.log("La tarea NO fue suspendida")
           }
        }        
    });
});

}



