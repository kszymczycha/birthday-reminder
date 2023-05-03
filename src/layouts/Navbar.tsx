import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import BirthdayForm from '../pages/BirthdayForm';
import Calendar from '../pages/Calendar';
import style from './Navbar.module.scss';

const Navbar = () => {
    return (
        <>
            <nav className={style['navbar']}>
                <ul className={style['navbar-list']}>
                    <li className={style['navbar-list-item']}><Link className={style['navbar-list-item-link']} to="/birthday-reminder">Home</Link></li>
                    <li className={style['navbar-list-item']}><Link className={style['navbar-list-item-link']} to="/birthday-form">New reminder</Link></li>
                    <li className={style['navbar-list-item']}><Link className={style['navbar-list-item-link']} to="/calendar">Calendar</Link></li>
                </ul>
            </nav>
            <div className={style['pages']}>
                <Routes>
                    <Route path="/birthday-reminder" element={<Home />} />
                    <Route path="/birthday-form" element={<BirthdayForm />} />
                    <Route path="/calendar" element={<Calendar />} />
                </Routes>
            </div>
        </>
    )
}

export default Navbar;