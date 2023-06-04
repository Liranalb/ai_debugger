import NavigationBar from "./NavigationBar"
import classes from "../style/layout.css"

const Layout = (props) => {
    return (
        <div>
            <NavigationBar />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;