import React from 'react';

export function TransactionType(props) {
 
    const handleChange = (e) => {
        props.setTransactionType(e.target.value);
    }

    return(
    <label>
          <select value={props.value} onChange={handleChange}>
            <option value="" hidden >{props.name}</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="internal">Internal transaction</option>
        </select>
    </label>
    )
}