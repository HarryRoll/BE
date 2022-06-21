import { sequelize } from "../models/init-models"

// inner join 2 table department dengan employees
const findAll = async (req,res)=>{
    try{
        const department = await req.context.models.departments.findAll({
            include : [{
                model : req.context.models.employees,
                as : "employees",
                required : true
        }]
    })
        return res.send(department)
    }catch(error){
        return res.status(404).send(error)
    }
}

//input 2 table locations dan departments
const createR = async (req,res)=>{
    const cekLoc = req.locations
    try {
        const department = await req.context.models.departments.create({
            department_name : req.body.department_name,
            location_id : cekLoc.location_id
        })
        return res.send(department)
    }catch(error){
        return res.status(404).send(error)
    }
}


const findOne = async (req,res)=>{
    try {
        const department = await req.context.models.departments.findOne({
            where:{department_id : req.params.id}
        })
        return res.send(department)
    } catch (error){
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const department = await req.context.models.departments.create({
            department_name : req.body.department_name,
            location_id : req.body.location_id
        })
        return res.send(department)
    }catch(error){
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const department = await req.context.models.departments.update({
            department_name : req.body.department_name,
            location_id : req.body.location_id
        },{returning : true, where:{department_id : req.params.id}})
        return res.send(department)
    } catch (error){
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try{
        const department = await req.context.models.departments.destroy({
            where:{department_id : req.params.id}
        })
        return res.send('delete '+department+' rows')
    }catch (error) {
        return res.status(404).send.error
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('insert into departments (department_id, department_name, location_id) values (:departmentId, :department_name, :location_id)',
        {replacements : {departmentId : req.params.id,
                        department_name : req.body.department_name,
                        location_id : req.body.location_id               
        },type : sequelize.QueryTypes.INSERT})
        .then(result =>{
            return res.send(result + ' data berhasil di input')
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    createR,
    findOne,
    create,
    update,
    deleted,
    querySQL
}