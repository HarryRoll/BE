import 'dotenv/config';
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models,{sequelize} from "./models/init-models";
import routes from "./routes/indexRoutes";

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors())
app.use(async(req,res,next)=>{
    req.context = {models}
    next()
})

app.use("/region",routes.RegRoute)
app.use("/department",routes.departRoute)
app.use("/job",routes.jobRoute)
app.use("/country",routes.countryRoute)
app.use("/location",routes.locRoute)
app.use("/dependent",routes.depenRoute)
app.use("/employee",routes.employRoute)

const dropDatabaseSync = false

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log(`server is listening on port ${port}`)})
})