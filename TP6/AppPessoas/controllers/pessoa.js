var axios = require('axios')
var Student = require('../models/pessoa')
const { ObjectId } = require('mongodb');

// Student list
module.exports.list = () => {
    return Student
                .find()
                .sort({nome: 1}) // 1 = ascending, -1 = descending : para ordenação
        .then(docs => {
            //console.log("Pessoas encontradas:")
            return docs
        })
        .catch(err => {
            return err
        }
)
}

module.exports.getPessoa = id => {
    const objectId = new ObjectId(id);
    
    return Student.findOne({_id: objectId})
        .then(student => {
            return student
        })
        .catch(err => {
            console.log(err)
            return err
        }
)
}

module.exports.addPessoa = p => {
    console.log(p)
    return Student.create(p)
        .then(resposta => {
            return resposta
        })
        .catch(err => {
            return err
        })
}

module.exports.updatePessoa = p => {

    const objectId = new ObjectId(p._id);

    console.log(p)

    return Student.updateOne({_id: objectId}, p) // updateOne
        .then(resposta => {
            console.dir(resposta)
            return resposta
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

module.exports.deletePessoa = id => {
    const objectId = new ObjectId(id);

    return Student.deleteOne({_id: objectId})
    .then(resposta => {
        console.dir(resposta)
        return resposta
    })
    .catch(err => {
        return err
    })
}