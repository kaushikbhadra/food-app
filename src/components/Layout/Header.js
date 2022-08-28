import React , {Fragment} from 'react'
import foodImage from '../../assets/meals.jpg'
import styles from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = () => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>FoodOrder</h1>
                <HeaderCartButton />
            </header>
            <div className={styles['main-image']}>
                <img src={foodImage} alt='A table full of delicious food.'/>
            </div>
        </Fragment>
    )
}

export default Header
