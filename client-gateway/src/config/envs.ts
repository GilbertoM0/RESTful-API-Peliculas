import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars{
    PORT:number;
    PRODUCT_MICROSERVICE_HOST: string;
    PRODUCT_MICROSERVICE_PORT: number;
} 

const envsSchema = joi.object({
    PORT:joi.number().required(),
    PRODUCT_MICROSERVICE_HOST:joi.string().required(),
    PRODUCT_MICROSERVICE_PORT:joi.number().required(),
    
}) 
.unknown(true);

const {error, value} = envsSchema.validate(process.env); 

//console.log({error});
//console.log({envVars});
 
if(error){
    throw new Error(`Error de validacion en la configuracion: ${error.message}`);
}  

const envsVars:EnvVars = value;

export const envs = {
    port: envsVars.PORT,
    productsMicroserviceHost:envsVars.PRODUCT_MICROSERVICE_HOST,
    productsMicroservicePort:envsVars.PRODUCT_MICROSERVICE_PORT,
}