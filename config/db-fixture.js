var mongoose = require('mongoose')
        , Type = mongoose.model('WarningType'),
                User = mongoose.model('User');

module.exports = function () {
    var yumarx = new User({
       firstname: 'Yumarx',
       phone:'+18097084664',
       email:'jumarpolanco@gmail.com',
       password:'654321'
    });
    
    var robo = new Type({
        name:'robo',
        label:'Robo',
        priority:'3'
    });
    
    var asalto = new Type({
        name:'asalto',
        label:'Asalto',
        priority:'3'
    });
    
    var accidente = new Type({
        name:'accidente',
        label:'Accidente',
        priority:'1'
    });
    
    var homicidio = new Type({
        name:'homicidio',
        label:'Homicidio',
        priority:'5'
    });
    
    var sospechoso = new Type({
        name:'sospechoso',
        label:'Sospechoso',
        priority:'1'
    });
    
    var fuego = new Type({
        name:'fuego',
        label:'Fuego',
        priority:'2'
    });
    
    
    //database insertion
    yumarx.save();
    homicidio.save();
    fuego.save();
    sospechoso.save();
    accidente.save();
    asalto.save();
    robo.save();

}

