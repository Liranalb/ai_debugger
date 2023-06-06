import InputBox from './InputBox';
import SubmitButton from './SubmitBtn';
import Card from '../ui/Card';
import strings from '../strings/strings_eng.json'

const Home = () => {
    return (
        <form>
            <Card>
                <InputBox id="input_code" placeholder={strings.inputBox.placeHolderCode} />
            </Card>
            <Card>
                <InputBox id="input_logs" placeholder={strings.inputBox.placeHolderLogs} />
            </Card>
            <SubmitButton id="submit_button" buttonText={strings.submitButton}/>
        </form>
    );
}

export default Home;