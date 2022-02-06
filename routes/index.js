'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;

// importo el modelo de `todos`
var todos = require('../models/todos');

// middelware que chequea que el usuario este en mi listado
function validUser (req, res, next) {
    // `includes` retorna true si un arreglo tiene el elemento pasado por parametro
    if (todos.listPeople().includes(req.params.name)) return next();
    res.sendStatus(404);
}

// middelware que chequea que las props sean las que yo planteo
// validar que me pasen propiedades correctas de las tareas de esas personas
function checkProps (req, res, next) {
    // Object.keys(req.body) arrays con todos los keys del objeto que me pasen vía POST.
    // The every() method checks if all elements in an array pass a test (provided as a function).
    // si todos los keys del objeto son `complete` o `content` retorna true
    
    if ( Object.keys(req.body).every( prop => prop === 'complete' || prop === 'content')) return next();
    res.sendStatus(400);
}

// ruta que pide el listado de personas con tareas
router.get('/', function (req, res) {
    res.send(todos.listPeople());
});

// ruta que me pase las tareas de una persona en particular
// uso el middleware validUser para asegurarme que exista esa persona

router.get('/:name/tasks', validUser, function (req, res) {

    var tasks = todos.list(req.params.name)

    // req.query is a object, with key value for each query param
    // Example: with url:  /users/solano/tasks?status=complete&otracosa=5
    /* req.query = {
        "status": "complete",
        "otracosa" : 5,
    }*/
    //users/solano/tasks
    ///users/jesus/tasks?status=complete
    if (req.query.status) {

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
        tasks = tasks.filter( task => req.query.status === 'complete' ? task.complete : !task.complete); // task.complete===true
    }
    res.send(tasks)
});

// ruta que crea una nueva tarea para una persona en particular
// usando el middlerware checkProps para validar que me pasen propiedades correctas de las tareas de esas personas
router.post('/:name/tasks', checkProps,  function (req, res) {
    //res.sendStatus(201);
    res.status(201).send(todos.add(req.params.name, req.body))
});

// ruta que completa una tarea
router.put('/:name/tasks/:index', function (req, res) {
    res.send(todos.complete(req.params.name, req.params.index))
});

// ruta para borrar una tarea
router.delete('/:name/tasks/:index', function (req, res) {
    // paso el index a number porque params siempre toma strings ...(?)
  res.status(204).send(todos.remove(req.params.name, req.params.index))
});
