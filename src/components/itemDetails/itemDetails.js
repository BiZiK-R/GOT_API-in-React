import React, {useState, useEffect} from 'react';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}


function ItemDetails({selectError, itemId, getData, children}) {

    const [item, upItem] = useState(null);

    useEffect(() => {
        updateItem()
    }, [itemId]);

    function updateItem() {

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                upItem(item)
            })
    }


    if (!item) {
        return <span className="select-error">{selectError}</span>
    }

    const {name} = item;

    return (
        <div className="item-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;