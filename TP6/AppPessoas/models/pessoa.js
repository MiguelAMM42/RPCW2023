var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
});

var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
});

var partido_politicoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
});

var pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    BI: String,
    CC: String,
    profissao: String,
    descrição: String,
    partido_politico: partido_politicoSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributosSchema,
    //id: String //ver se uso este ou o _id do Mongo
    _id: ObjectId
});
var pessoaModel = mongoose.model('pessoa', pessoaSchema);

module.exports = pessoaModel;



// o modelo vai ser usado nos controladores