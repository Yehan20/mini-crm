import type { ErrorBag, Rules, ValidationObject } from "../types/types";


// Custom simple validator
export const validate = (value: ValidationObject, rule: Rules, ignore?: string[]) => {

    const isBagFilled = (obj: ErrorBag) => {
        return Object.values(obj).some(arr => arr.length > 0);
    }

    const errorBag: ErrorBag = {
    };

    // Loop through the object and check the rules applied when need to check for more rules we can add more login
    for (const prop in value) {

        if (!errorBag[prop]) errorBag[prop] = [];

        // empty rule
        if (!(ignore?.includes(prop)) && rule.emptyFeilds && (value[prop] === "" || value[prop] === null)) {
            console.log(prop, ignore);
            errorBag[prop].push(`${prop} required`);
        }

        // email rule
        if (rule.emailFormat && value[prop] && prop === "email") {

            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!regex.test(value[prop] as string)) {

                errorBag["email"].push(`invalid email format`);
            }
        }

        if (rule.phoneFormat && value[prop] && prop === "phone") {

            const regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

            if (!regex.test(value[prop] as string)) {

                errorBag["phone"].push(`invalid phone number format`);
            }
        }
        //  can add more rules
       
    }

    // check if the bag is filled 
    const errorBagFilled = isBagFilled(errorBag)

    return {
        errorBag,
        errorBagFilled

    };
}
