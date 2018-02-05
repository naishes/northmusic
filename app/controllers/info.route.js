const express = require('express');
const router = express.Router();
const usersModel = require('../models/user.model');
const colabModel = require('../models/colab.model');
const speakerModel = require('../models/speaker.model');
const patrModel = require('../models/patrocinio.model');
const bilheteModel = require('../models/bilhete.model');

router.get('/', global.secure('admin'),  function(request, response){
    usersModel.listparticipante(function(participante){
        patrModel.listpatrocinio(function(patrocinio){
            colabModel.listacolab(function(colaborador){
                speakerModel.listaspeaker(function(speaker){
                    bilheteModel.listabilhete(function(bilheteira){

                    



        response.set("Content-Type", "text/html");
        response.render('./admin/info', {
            speaker : speaker,
            patrocinio : patrocinio,
            colaborador : colaborador,
            bilheteira : bilheteira
        });
    });
});
});

    });
});
});


module.exports = router;


