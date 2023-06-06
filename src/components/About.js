import strings from '../strings/about_strings.json'
import style from './About.module.css'
import Card from '../ui/Card';

const About = () => {
    return (
        <Card>
            <div className={style.textBox}>
            <h1>About</h1>
                {strings.about}</div>
        </Card>
    );
}

export default About;