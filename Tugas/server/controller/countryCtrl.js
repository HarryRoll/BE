import { sequelize } from "../models/init-models"

// realasi dengan Join ALL 
const findAll = async (req,res)=>{
    try{
        const country = await req.context.models.countries.findAll({
            include : [{
                all : true
            }]
        })
        return res.send(country)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const country = await req.context.models.countries.findOne({
            where:{country_id : req.params.id}
        })
        return res.send(country)
    } catch (error){
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const country = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : req.body.region_id
        })
        return res.send(country)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createR = async (req,res)=>{
    const cekReg = req.regions
    try {
        const country = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : cekReg.region_id
        })
        return res.send(country)
    }catch(error){
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const country = await req.context.models.countries.update({
            country_name : req.body.country_name,
            region_id : req.body.region_id
        },{returning : true, where:{country_id : req.params.id}})
        return res.send(country)
    } catch (error){
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try{
        const country = await req.context.models.countries.destroy({
            where:{country_id : req.params.id}
        })
        return res.send('delete '+country+' rows')
    }catch (error) {
        return res.status(404).send.error
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('update countries set country_name= :country_name, region_id= :region_id where country_id= :countryId',
        {replacements : {countryId : req.params.id,
                         country_name    : req.body.country_name,
                         region_id : req.body.region_id
                    },type : sequelize.QueryTypes.UPDATE})
        .then(result =>{
            return res.send(result +' berhasil di update')
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    createR,
    update,
    deleted,
    querySQL
}