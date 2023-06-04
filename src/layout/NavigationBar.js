import { Link } from 'react-router-dom'

import classes from './NavigationBar.module.css'
import config from '../strings/navigationBarStr.json'

const NavigationBar = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>{config.title}</div>
            <nav>
                <ul>
                    <li>
                        <Link to={config.navigation.about}>About</Link>
                    </li>
                    <li>
                        <Link to={config.navigation.github_address}>GitHub</Link>
                    </li>
                    <li>
                        <Link to={config.navigation.linkedin_address}>Linkedin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationBar;