export interface UserProps {
    name: string,
    email: string,
    is_admin: boolean,
}

export interface AuthProviderProps {
    user: UserProps | null;
    status: AuthStatus;
    login: (credintials: LoginUser) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => void;
}


export type LoginUser = {
    email: string,
    password: string,
    remember?: boolean
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthorized' | 'loggedout';


// Resource loading status
export type Status = 'pending' | 'success' | 'error' | 'idle';

// Emplpoyeer related types
export type Employee = {
    id?: number
    first_name: string,
    last_name: string,
    email: string,
    company_id?: number | '',
    company?: {
        name: string,
        id: number
    },
    phone: string
}

export type CompanyDropDown = {
    id: number,
    name: string
}

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

// Validation based types
export type ErrorBag = {
    [key: string]: string[];
}

export type ValidationObject = { [key: string]: string | number | object | null | boolean }

export type Rules = {
    emptyFeilds: boolean;
    emailFormat: boolean;
};



