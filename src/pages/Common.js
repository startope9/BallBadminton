
import './common.css'
import TypingText from './effect/TypingText'

export default function Common() {
    return (
        <div>
            <div class="container" >
                <img src={require('../images/chika.JPG')} alt='blah' />
                <div class="centered">
                    <TypingText text="Ball Badminton" />
                </div>
            </div>
        </div>
    )
}
