import InputBox from './InputBox';
import GptAnsBox from './GptAnsBox';
import SubmitButton from './SubmitBtn';
import Card from '../ui/Card';

const Home = () => {
    return (
        <form>
            <Card>
                <InputBox />
            </Card>
            <Card>
                <InputBox />
            </Card>     
            <SubmitButton />
        </form>
    );

}

export default Home;