import { IReminder } from "../../interfaces/reminder.interface";
import style from './BirthdayTileComponent.module.scss';
import { parseISO, format, isEqual } from "date-fns";
import { DATE_FORMAT } from "../../data/date-format.data";

const BirthdayTileComponent = (props: { birthday: IReminder, daySelected?: Date }) => {
    let birthDate = format(parseISO(props.birthday.birth_date), DATE_FORMAT);

    const isEqualDate = (day: Date, event: string): boolean => {
        return isEqual(day, parseISO(event));
    }

    return (
        <div className={style['tile']}>
            <div className={style['data']}>
                {!props.daySelected && <h3>Birthday: <span>{birthDate}</span></h3>}
                {!!props.daySelected && isEqualDate(props.daySelected, props.birthday.birth_date) && <h3>Birthday: <span>{birthDate}</span></h3>}
                {!!props.daySelected && isEqualDate(props.daySelected, props.birthday.minus_two_weeks) && <h3>Upcoming: <span>{birthDate}</span></h3>}
                <p><span className={style['label']}>First name:</span> <span>{props.birthday.first_name}</span></p>
                <p><span className={style['label']}>Last name:</span> <span>{props.birthday.last_name}</span></p>
                <p><span className={style['label']}>Email:</span> <span>{props.birthday.email}</span></p>
            </div>
            <div className={style['interests']}>
                <h3>Interests:</h3>
                <p>{props.birthday.interests}</p>
            </div>
        </div>
    );
}

export default BirthdayTileComponent;