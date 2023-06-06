import classes from './SubmitBtn.module.css'

const SubmitButton = ({buttonText, id}) => {
    return (
        <div className={classes.center}>
            <button className={classes.button} id={id}>{buttonText}</button>
        </div>
    );

}


export default SubmitButton