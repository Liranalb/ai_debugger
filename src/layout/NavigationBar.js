import { Link } from 'react-router-dom'

import classes from './NavigationBar.module.css'
import strings from '../strings/navigationBarStr.json'

const NavigationBar = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>{strings.title}</div>
            <nav>
                <ul>
                    <li>
                        <Link to={strings.navigation.about}>About</Link>
                    </li>
                    <li>
                        <Link to={strings.navigation.github_address}>GitHub</Link>
                    </li>
                    <li>
                        <Link to={strings.navigation.linkedin_address}>Linkedin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationBar;