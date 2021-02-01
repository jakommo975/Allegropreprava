export const checkValidity = (value, validation) => {
    if (validation.required){
        if (value === '' || value === null){
            return {
                valid: false,
                errorMessage: "This field is required.",
            }
        }
    }
    if (validation.minLength){
        if (value.length < validation.minLength){
            return {
                valid: false,
                errorMessage: `This field should be at least ${validation.minLength} characters long.`
            }
        }
    }
    return {
        valid: true,
        errorMessage: null,
    };
}

export const checkOverallValidity = (form) => {
    
}


