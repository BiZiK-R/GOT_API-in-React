import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import GotService from '../../services/gotService';
import './randomChar.css';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function RandomChar({interval}) {

    const gotService = new GotService();

    const [char, upChar] = useState({}),
          [loading, upLoading] = useState(true),
          [error, upError] = useState(false);

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, interval);
        return () => {
            clearInterval(timerId);
        }
    }, [])

    function onCharLoaded(char)  {
        upChar(char);
        upLoading(false);        
    }

    function onError() {
        upError(true);
        upLoading(false);
    }

    function updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

RandomChar.defaultProps = {
    interval: 1500,
}

RandomChar.propTypes = {
    interval: PropTypes.number,
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;
