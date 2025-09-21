import { 
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs"

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
    removePasswordFromResponse(data: any): any {
        // Return immediately if null, undefined, or not an object
        if(!data || typeof data !== "object") {
            return data;
        }

        // Handle object (arrays)
        if(Array.isArray(data)){
            return data.map(d => this.removePasswordFromResponse(d))
        }

        // Skip if it's a Date instance
        if(data instanceof Date) {
            return data;
        }

        // Create swallow copy of the object
        const result = { ...data };

        // Remove only password related fields
        if('password' in result) delete result.password;

        // Process each property recursively 
        Object.keys(result).forEach(key => {
            if(result[key] && typeof result[key] === 'object'){
                // Skip processing if it's a Date instance
                if(result[key] instanceof Date){
                    return;
                }
                result[key] = this.removePasswordFromResponse(result[key]);
            }
        });

        return result;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map(data => this.removePasswordFromResponse(data))
        );
    }
}