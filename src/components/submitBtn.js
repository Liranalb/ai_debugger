import classes from './SubmitBtn.module.css'

const SubmitButton = ({buttonText}) => {
    return (
        <div className={classes.center}>
            <button className={classes.button}>{buttonText}</button>
        </div>
    );

}

export default SubmitButton