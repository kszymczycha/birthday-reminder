import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addReminder } from "../../store/remindersSlice";
import { IReminder } from "../../interfaces/reminder.interface";
import FormInputComponent from "../FormInputComponent";
import style from './BirthdayFormComponent.module.scss';
import { useNavigate } from 'react-router-dom';
import { subDays, parseISO, format, isAfter, isSameDay } from 'date-fns'

const BirthdayFormComponent = () => {
    const history = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IReminder>();
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<IReminder> = (data) => {
        var updatedDate = {
            ...data,
            birth_date: data.birth_date,
            minus_two_weeks: format(subDays(parseISO(data.birth_date), 14), "yyyy-MM-dd"),
            alert_display: false
        };
        dispatch(addReminder(updatedDate));
        history('/calendar');
    }

    return (
            <form className={style['birthday-form']} onSubmit={handleSubmit(onSubmit)}>
                <FormInputComponent label='First name' placeholder="Add first name" type='text' name='first_name' register={register} errors={errors}/>
                <FormInputComponent label='Last name' placeholder="Add last name" type='text' name='last_name' register={register} errors={errors}/>
                <FormInputComponent label='Email' placeholder="Add email address" type='email' name='email' register={register} errors={errors}/>
                <FormInputComponent label='Birthday' placeholder="Add birth date" type='date' name='birth_date' register={register} errors={errors} customValidation={
                    (date: string) => {
                        const objDate = parseISO(date);
                        const currentDate = new Date();
                        return isAfter(objDate, currentDate) || isSameDay(objDate, currentDate) || 'The date cannot be earlier';
                    }
                }/>
                <FormInputComponent label='Interests' placeholder="Add interests" type='textarea' name='interests' register={register} errors={errors} fieldAttributes={{
                    rows: 7
                }}/>
                <div className={style['submit-wrapper']}>
                    <button className={style['submit-btn']} type="submit">Submit</button>
                </div>
            </form>
    )
}

export default BirthdayFormComponent;