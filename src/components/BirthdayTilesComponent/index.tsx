import { Fragment } from 'react';
import style from './BirthdayTilesComponent.module.scss';
import { addedReminders } from '../../store';
import { useSelector } from "react-redux";
import BirthdayTileComponent from "../BirthdayTileComponent";
import upcomingEvents from '../../utils/upcomingEvents.util';

const BirthdayTilesComponent = () => {
    const reminders = useSelector(addedReminders);
    const upcomingReminders = upcomingEvents([ ...reminders ], 3);
    return (
        <div className={style['tiles']}>
            {upcomingReminders.map((reminder, index) => (
                <Fragment key={index}>
                    <BirthdayTileComponent birthday={reminder} />
                </Fragment>
            ))}
            {!upcomingReminders.length && <p className={style['tiles-not-exists']}>Events not exists :(</p>}
        </div>
    );
}

export default BirthdayTilesComponent;