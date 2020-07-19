const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
async index(req,res){
    const {tech} = req.query;

    const spots = await Spot.find({techs: tech});

    return res.json(spots);
},

async store(req,res){
    const {
        company,
        price,
        techs,
    } = req.body;
    const thumbnail_name = req.file.filename;
    const {user_id} = req.headers;
    
    const user = await User.findById(user_id);

    if(!user){
        return res.status(400).json({error: 'User does not exists.'})
    }

    const spot = await Spot.create({
        user: user_id,
        thumbnail_name,
        thumbnail_url: `http://192.168.0.5:3333/uploads/${thumbnail_name}`,
        company,
        price,
        techs: techs.split(',').map(tech =>tech.trim()),

    })
    return res.json(spot);
}
}