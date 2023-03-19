var axios = require('axios')

module.exports.toDo = () => {
    return axios.get('http://localhost:3000/toDo?_sort=id')
        .then((resposta) =>{
            return resposta.data
        })
        .catch((erro) =>{
            return erro
        })
}

module.exports.resolved = () => {
    return axios.get('http://localhost:3000/resolved?_sort=id')
        .then((resposta) =>{
            return resposta.data
        })
        .catch((erro) =>{
            return erro
        })
}


module.exports.newTask = task => {
    return axios.post('http://localhost:3000/toDo', task)
        .then((resposta) =>{
            console.log(resposta.status)
        })
        .catch((erro) =>{
            console.log(erro)
            return erro
        })
}



module.exports.deleteToDo = id => {
    return axios.delete('http://localhost:3000/toDo/' + id)
        .then(resposta => {
            console.log(resposta.status)
        })
        .catch((erro) =>{
            console.log(erro)
            return erro
        }
    )
}

module.exports.deleteResolved = id => {
    return axios.delete('http://localhost:3000/resolved/' + id)
        .then(resposta => {
            console.log(resposta.status)
        })
        .catch((erro) =>{
            console.log(erro)
            return erro
        }
    )
}



module.exports.resolve = task => {
    let deleteToDo = "http://localhost:3000/toDo/" + task.id
                            
    // copy result to resultNoID , without the id
    const resultNoID = Object.assign({}, task);
    delete resultNoID.id;
                        
    return axios.delete(deleteToDo)
        .then(response1 => {
            axios.post('http://localhost:3000/resolved', resultNoID);
        })
        .then(response2 => {
            console.log("Task resolved");
        })
        .catch(errors => {
            console.log("Erro: " + errors);
        })

}


module.exports.undo = task => {
    let deleteResolved = "http://localhost:3000/resolved/" + task.id
                            
    // copy result to resultNoID , without the id
    const resultNoID = Object.assign({}, task);
    delete resultNoID.id;
                        
    return axios.delete(deleteResolved)
        .then(response1 => {
            axios.post('http://localhost:3000/toDo', resultNoID);
        })
        .then(response2 => {
            console.log("Task undone");
        })
        .catch(errors => {
            console.log("Erro: " + errors);
        })

}

module.exports.editToDo = task => {
    return axios.put('http://localhost:3000/resolved/' + task.id, task)
        .then(function(resp) {
            console.log("Task edited");
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
}

module.exports.editDone = task => {
    return axios.put('http://localhost:3000/resolved/' + task.id, task)
        .then(function(resp) {
            console.log("Task edited");
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
}



