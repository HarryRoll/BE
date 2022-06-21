import { sequelize } from "../models/init-models"

// melakukan right join anatara table employees dan dependents
const findAll = async (req,res)=>{
    try{
        const employee = await req.context.models.employees.findAll({
            include : [{
                model : req.context.models.dependents,
                as : "dependents",
                right:true
            }]
        })
        return res.send(employee)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.findOne({
            where:{employee_id : req.params.id}
        })
        return res.send(employee)
    } catch (error){
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.create({
                employee_id: req.body.employee_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                hire_date: req.body.hire_date,
                job_id: req.body.job_id,
                salary: req.body.salary,
                manager_id: req.body.manager_id,
                department_id: req.body.department_id
        })
        return res.send(employee)
    }catch(error){
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.update({
            employee_id: req.body.employee_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            hire_date: req.body.hire_date,
            job_id: req.body.job_id,
            salary: req.body.salary,
            manager_id: req.body.manager_id,
            department_id: req.body.department_id
        },{returning : true, where:{employee_id : req.params.id}})
        return res.send(employee)
    } catch (error){
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try{
        const employee = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employee+' rows')
    }catch (error) {
        return res.status(404).send.error
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('select * from employees join departments using (department_id) join locations using(location_id) where location_id = :locationId',
        {replacements : {locationId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleted,
    querySQL
}