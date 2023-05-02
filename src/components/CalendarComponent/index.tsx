import { Fragment } from 'react';
import { useState } from 'react';
import weekDays from "../../data/week-days.data";
import { startOfToday, eachDayOfInterval, getDay, endOfMonth, format, parse, isToday, isEqual, parseISO, add, sub } from 'date-fns';
import style from './CalendarComponent.module.scss';
import { addedReminders } from '../../store';
import { useSelector } from "react-redux";
// import { WEEK, MONTH } from '../../data/calendar-period.data';
import ModalComponent from '../ModalComponent';
import useModal from '../../hooks/use-modal.hook';
import { IReminder } from '../../interfaces/reminder.interface';
import BirthdayTileComponent from "../BirthdayTileComponent";
import { DATE_FORMAT } from '../../data/date-format.data';
import { startColClasses } from '../../data/start-col-classes.data';

const CalendarComponent = () => {
    let reminders = useSelector(addedReminders);
    let today = startOfToday();
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    let days = eachDayOfInterval({ start: firstDayCurrentMonth , end: endOfMonth(firstDayCurrentMonth) });
    // let [ period, setPeriod ] = useState<string>(MONTH);
    const { isOpen, toggle } = useModal();
    const [ modalData, setModalData ] = useState<IReminder[]>([]);
    const [ daySelected, setDaySelected ] = useState<Date>(new Date());

    const handleOpenModal = (day: Date) => {
        setDaySelected(day);
        const events = getEventsForDay(day);
        setModalData(events);
        toggle();
    }

    const handleCloseModal = () => {
        toggle();
        setModalData([]);
    }

    const getEventsForDay = (day: Date): IReminder[] => {
        let birthdays = reminders.filter(reminder => isEqual(parseISO(reminder.birth_date), day));
        let alerts = reminders.filter(reminder => isEqual(parseISO(reminder.minus_two_weeks), day));
        return [ ...birthdays, ...alerts ];
    }

    const isEvent = (day: Date, field_name: keyof IReminder) => {
        return reminders.some(reminder => isEqual(parseISO(reminder[field_name]), day));
    }

    // const handleChangePeriod = (period: string) => {
    //     setPeriod(period);
    // }

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    const prevMonth = () => {
        let firstDayNextMonth = sub(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }
        
    return( 
        <>
            <div className={style['calendar']}>
                <div className={style['calendar-header']}>
                    <h3 className={style['month-year']}>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h3>
                    <div className={style['btn-wrapper']}>
                        <button onClick={prevMonth} className={style['nav-btn']}>&laquo; Prev</button>
                        <button onClick={nextMonth}  className={style['nav-btn']}>Next &raquo;</button>
                    </div>
                </div>

                <div className={style['week-days']}>
                    {weekDays.map(day => (
                        <div className={style['name']} key={day}>{day}</div>
                    ))}
                </div>

                <div className={style['days']}>        
                    {days.map((day, dayIndex) => {
                        let isBirthday = isEvent(day, 'birth_date');
                        let isAlert = isEvent(day, 'minus_two_weeks');
                        let dayNumber = getDay(day);
                        let startColClass = startColClasses[dayNumber];

                        return (
                            <div 
                                className={`${style['name']} ${dayIndex === 0 ? style[startColClass] : ''} ${!!isAlert ? style['alert'] : ''} ${!!isBirthday ? style['birthday'] : ''} ${isToday(day) ? style['today'] : ''}`} 
                                key={day.toString()} 
                                onClick={(!!isBirthday || !!isAlert) ? () => handleOpenModal(day) : () => undefined}
                            >
                                <time dateTime={format(day, DATE_FORMAT)}>{format(day, 'd')}</time>
                            </div>
                        )
                    })}
                </div>
                {/* <div className={style['calendar-footer']}>
                    <div className={style['btn-wrapper']}>
                        <button 
                            className={`${style['period-btn']} ${period === WEEK ? style['active'] : ''}`}
                            onClick={() => handleChangePeriod(WEEK)}
                        >
                            Week
                        </button>
                        <button 
                            className={`${style['period-btn']} ${period === MONTH ? style['active'] : ''}`}
                            onClick={() => handleChangePeriod(MONTH)}
                        >
                            Month
                        </button>
                    </div>
                </div> */}
            </div>
            <ModalComponent 
                isOpen={isOpen} 
                children={(
                    <> 
                        <div className={style['modal']}>
                            <div className={style['btn-wrapper']}>
                                <button onClick={handleCloseModal} className={style['close-btn']}> X </button>
                            </div>
                            <div className={style['modal-content']}>
                                <h2>Events/reminders for {format(daySelected, DATE_FORMAT)}</h2>
                                <div className={style['events']}>
                                    {modalData.map((birthday, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <BirthdayTileComponent birthday={birthday} daySelected={daySelected}/>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )} 
                toggle={toggle} 
            />
        </>
    );
}

export default CalendarComponent;