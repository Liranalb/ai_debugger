import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import strings from '../strings/strings_eng.json';

// rendering the navigation menu
const NavigationBar = () => {
    return (
        <header className={classes.header}>
            {/* Render the logo/title from localization strings */}
            <div className={classes.logo}>{strings.navbar.title}</div>
            <nav>
                <ul>
                    <li>
                        <Link to={strings.navbar.links.home}>Home</Link>
                    </li>
                    <li>
                        <Link to={strings.navbar.links.github_address}>GitHub</Link>
                    </li>
                    <li>
                        <Link to={strings.navbar.links.about}>About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationBar;