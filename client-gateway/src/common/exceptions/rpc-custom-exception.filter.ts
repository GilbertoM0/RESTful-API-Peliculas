import { Catch,ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Observable } from "rxjs";
import { RpcException } from "@nestjs/microservices";


@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
    catch(exception: RpcException, host: ArgumentsHost): 
    Observable<any> {
       const ctx = host.switchToHttp();
       const response = ctx.getResponse();
       const tcpError = exception.getError();


       if(typeof tcpError== 'object'
         && 'status' in tcpError
          && 'message' in tcpError
        ){
            const status = isNaN(+tcpError.status)?400: tcpError.status;
            return response.status(status).json(tcpError)
       }

       //console.log({tcpError})
       return response.status(401).json({ 
        status: 401,
        message: 'ya valio'
       })
    }

}