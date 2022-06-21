import { sequelize } from "../models/init-models"

//input 2 tabel
const createNext = async (req,res,next)=>{
    try {
        const location = await req.context.models.locations.create({
            location_id : req.body.location_id,
            street_address: req.body.street_address,
            postal_code: req.body.postal_code,
            city: req.body.city,
            state_province: req.body.state_province,
            country_id: req.body.country_id
        })
        req.locations = location
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}




const findAll = async (req,res)=>{
    try{
        const location = await req.context.models.locations.findAll()
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const location = await req.context.models.locations.findOne({
            where:{location_id : req.params.id}
        })
        return res.send(location)
    } catch (error){
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const location = await req.context.models.locations.create({
            location_id : req.body.location_id,
            street_address: req.body.street_address,
            postal_code: req.body.postal_code,
            city: req.body.city,
            state_province: req.body.state_province,
            country_id: req.body.country_id
        })
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const location = await req.context.models.locations.update({
            location_id : req.body.location_id,
            street_address: req.body.street_address,
            postal_code: req.body.postal_code,
            city: req.body.city,
            state_province: req.body.state_province,
            country_id: req.body.country_id
        },{returning : true, where:{location_id : req.params.id}})
        return res.send(location)
    } catch (error){
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try{
        const location = await req.context.models.locations.destroy({
            where:{location_id : req.params.id}
        })
        return res.send('delete '+location+' rows')
    }catch (error) {
        return res.status(404).send.error
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query("select * from locations join countries using (country_id) join regions using(region_id) where region_name = 'Europe' and location_id= :locationId",
        {replacements : {locationId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    createNext,
    findAll,
    findOne,
    create,
    update,
    deleted,
    querySQL
}