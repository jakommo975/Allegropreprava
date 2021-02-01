export const bannerForm = {
    name: {
        elementConfig: {
            type: 'text',
            placeholder: '',
            label: 'Name',
            infoText: "Name of the banner.",
        },
        validation: {
            required: true,
        },
        value: '',
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },

    order: {
        elementConfig: {
            type: 'select',
            placeholder: '',
            label: 'Order',
            infoText:"Determines the order of this banner among other banners in the category. Set to 1 if you want this banner to be placed on the top of the page.",
        },
        validation: {
            required: true,
        },
        options: [
            {value: 1, displayValue: "1"},
            {value: 2, displayValue: "2"},
            {value: 3, displayValue: "3"},
        ],
        value: 1,
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },

    category: {
        elementConfig: {
            type: 'select',
            placeholder: '',
            label: 'Category',
            infoText:"The category where should be this banner placed.",
        },
        validation: {
            required: true,
        },
        options: [
            {value: "elektronika", displayValue: "Elektronika"},
            {value: "auto-moto", displayValue: "Auto-Moto"},
        ],
        value: '',
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },

    publish: {
        elementConfig: {
            type: 'checkbox',
            placeholder: '',
            label: 'Publish',
            infoText:"Check if you want this banner to be published on webiste.",
        },
        validation: {
            required: true,
        },
        value: false,
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },

    displayName: {
        elementConfig: {
            type: 'checkbox',
            placeholder: '',
            label: 'Display Name',
            infoText: "Check if you want the name, to be displayed as the header above the banner." ,
        },
        validation: {
            required: true,
        },
        value: false,
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },

    deleted: {
        elementConfig: {
            type: 'checkbox',
            placeholder: '',
            label: 'Deleted',
        },
        validation: {
            required: true,
        },
        value: false,
        valid: false,
        errorMessage: "",
        touched: false,
        focused: false,
    },
    
}
