import { Role } from './role';

export interface User {
    $key: string;
    userName : string  ; 
    password : string ; 
    email : string ; 
    phone : string ;
    role : Role ; 
}
