import Navbar from './layouts/Navbar';
import style from './App.module.scss';

const App = () => {
    return (
        <div className={style['app']}>
            <div className={style['app-container']}>
                <div className={style['app-main']}>
                    <h1 className={style['app-name']}>Birthday Reminder</h1>
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export default App;