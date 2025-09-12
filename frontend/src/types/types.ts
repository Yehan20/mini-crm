// Auth Context Related types and interfaces
export interface LoginProps {
    email: string,
    password: string,
    remember?: boolean
}

export interface UserProps {
    name: string,
    email: string,
    is_admin: boolean,
}

export type authStatus = 'idle' | 'authenticated' | 'unauthorized' | 'loggedout';

export interface AuthProviderProps {
    user: UserProps | null;
    status: authStatus;
    login: (credintials: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => void;
}


// Resource loading status
export type Status = 'pending' | 'success' | 'error' | 'idle';


// Emplpoyeer related types
export type Employee = {
    id?: number
    first_name: string,
    last_name: string,
    email: string,
    company_id?: number | '',
    company?:{
       name:string,
       id:number
    },
    phone: string
}

export type CompanyDropDown = {
    id: number,
    name: string
}
export type errorBagProp = {

    first_name: string[],
    last_name: string[],
    email: string[],
    phone: string[],
    company_id: string[]
};


// Company related types
export type Company = {
    id?: number,
    name: string,
    employees_count?: number
    email: string,
    logo: File | null | string,
    website: string
    employees?: Employee[];
    
}


// Login prop 
export type LoginPropType = {
    email: string;
    password: string;
};

