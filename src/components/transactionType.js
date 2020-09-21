import React from 'react';

export function TransactionType(props) {

    return(
    <label>
          <select name={props.name} ref={props.register}>
            <option value="" hidden >{props.placeholder}</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="internal">Internal transaction</option>
        </select>
    </label>
    )
}