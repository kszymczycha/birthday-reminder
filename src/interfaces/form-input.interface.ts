export interface IFormInput {
    label: string;
    type: string;
    name: string;
    register: any;
    errors: any;
    placeholder: string;
    fieldAttributes?: any;
    customValidation?: any;
}