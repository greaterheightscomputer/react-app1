import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//The Component that render  each item

const ExpenseListItem = ({id, description, amount, createdAt }) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-tem__title">{description}</h3>
            <span className="list-tem__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
        </div>
        <h3 className="list-tem__amount">{'₦'+numeral(amount / 100).format('0,0.00')}</h3>        
    </Link> 
);

export default ExpenseListItem;

