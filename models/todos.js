// Cada modelo de nuestro sistema es una entidad, por ejemplo, Peliculas, Actores, c/u sería un modelo.

'use strict'; //https://www.geeksforgeeks.org/strict-mode-javascript/

var tasks = {}
 // acá vamos a guardar nuestras personas y tareas

module.exports = {
  reset: function () {
    tasks = {}; // esta función ya esta armada :D
    /*
    {
      "jesus" : [
        {"content": "dar review checkpoint", "complete" : false},
        {"content": "lecture node-postgres", "complete" : true}
      ]
      "pepe" : [{"content": "almorzar", "complete": false}],
      "juan" : [{"content": "almorzar", "complete": false}],
      "jose" : [{"content": "almorzar", "complete": false}],
    }
    */
  },
  


  // listPeople devuelve el listado de las personas con tareas

  
  listPeople: function () {
    // Object.keys() method returns an array of the given object's property names
    return Object.keys(tasks);
  },

  // agrego una tarea a una persona
  add: function (name, task) {
    
    // si el nombre no existe, creo uno nuevo asignadole un array vacio
    if(!tasks[name]) tasks[name] = []

    // si la tarea que me pasan por parámetro no viene con la opción complete, se la agrego como falsa.
    task.complete = task.complete || false;

    // le agrego la tarea a ese usuario
    tasks[name].push(task)

    //finalmente retorno la tarea agregada, por convencion, como el .pop() retorna el elemento sacado, always return
    return task;
  },

  // devuelvo el arreglo de tareas de una persona en particular
  list: function(name){
    return tasks[name]
  },

  // dado un nombre y un indice paso esa tarea como completada
  complete: function(name, index){
    // chequeo de seguridad
    if (tasks[name][index]) tasks[name][index].complete = true;
  },

  // borro una de las tareas y las retorno
  remove: function(name, index){
    // The splice() method adds/removes items to/from an array, and returns the removed item(s).
    // https://www.w3schools.com/jsref/jsref_splice.asp
    return tasks[name].splice(index, 1);
  }

};
