import NavigationBar from "./NavigationBar"
import classes from './Layout.module.css'

const Layout = (props) => {
    return (
        <div>
            <NavigationBar />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;