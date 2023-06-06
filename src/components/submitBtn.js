import classes from './SubmitBtn.module.css'

const SubmitButton = () => {
    return (
        <div className={classes.center}>
            <button className={classes.button}>Submit Code and Logs To GPT-4</button>
        </div>
    );

}

export default SubmitButton