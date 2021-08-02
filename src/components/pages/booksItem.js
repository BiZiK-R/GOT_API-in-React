import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/gotService';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return(
            <ItemDetails  
                itemId={this.props.bookId} 
                getData={this.gotService.getBook}
                selectError={'Please select a book'}>
                <Field field='publiser' label='Publiser'/>
                <Field field='released' label='Released'/>
                <Field field='numberOfPages' label='Number Of Pages'/>
            </ItemDetails>
        )
    }
}