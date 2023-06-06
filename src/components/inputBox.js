import classes from './InputBox.module.css'
import strings from '../strings/inputBoxStr.json'
const inputBox = () => {
    return (
        <textarea className={ classes.inputbox } placeholder={strings.placeHolderCode} ></textarea>
    );
}

export default inputBox;