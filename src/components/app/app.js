import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import GotService from '../../services/gotService';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './app.css';


export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        selectedItem: 130,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {showRandomChar: !state.showRandomChar}
        })
    }
    
    render() {
        const {showRandomChar, error} = this.state

        if (error) {
            return <ErrorMessage/>
        }

        const randomChar = showRandomChar ? <RandomChar interval={3000}/> : null;

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <button className="toggle-btn" onClick={this.onToggleRandomChar} color="primary">
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>

                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/books/:id' exact render={
                            ({match}) => {
                                const {id} = match.params;
                             return <BooksItem bookId={id}/>
                            }
                        }/>
                        <Route path='/:id' exact render={
                            ({match}) => {
                                const {id} = match.params;
                                switch (id) {
                                    case 'characters':
                                        return <CharacterPage/>;
                                    case 'houses':
                                        return <HousesPage/>;
                                    case 'books':
                                        return <BooksPage/>;
                                    default:
                                        return <>
                                            <h1>Такой страницы не существует!</h1>
                                            <Link to="/">
                                                <button className="toggle-btn">Вернуться на главную страницу</button>
                                            </Link>
                                        </>
                                }
                            }
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};