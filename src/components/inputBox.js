import classes from './InputBox.module.css'

const InputBox = ({ id, placeholder }) => {
    return (
        <textarea className={ classes.inputbox } id={id} placeholder={ placeholder }></textarea>
    );
}

export default InputBox;