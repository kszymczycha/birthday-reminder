import { IFormInput } from "../../interfaces/form-input.interface";
import style from './FormInputComponent.module.scss';

const useFormInputComponentHook = (props: IFormInput) => {
    let inputValidation: any = { 
        required: 'Field is required',
        minLength: {
            value: 4,
            message: 'Min length is 4'
        },
        maxLength: {
            value: 200,
            message: 'Max length is 200'
        }
    };

    if (!!props.customValidation) {
        inputValidation = {
            ...inputValidation,
            validate: props.customValidation
        }
    }

    return { inputValidation };
}

const FormInputComponent = (props: IFormInput) => {
    const { inputValidation } = useFormInputComponentHook(props);

    return (
        <div className={style['input-wrapper']}>
            <label className={style['label']} htmlFor={props.name}>{props.label}</label>
            {props.type !== 'textarea' 
                ? <input className={`${style['input']} ${props.errors[props.name] ? style['error'] : ''}`} placeholder={props.placeholder} type={props.type} id={props.name} { ...props.register(props.name, { ...inputValidation }) } />
                : <textarea placeholder={props.placeholder} className={`${style['input']} ${props.errors[props.name] && style['error']}`} type={props.type} id={props.name} { ...props.register(props.name, { ...inputValidation }) } { ...props.fieldAttributes }/>}
            {props.errors[props.name] && <div className={style['error-wrapper']}><p className={style['error']}>{props.errors[props.name].message}</p></div>}
        </div>
    );
}

export default FormInputComponent;