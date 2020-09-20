import React, { useState } from 'react';

// Importing components
import { Dropdown } from './dropdown';
import { TransactionType } from './transactionType';
import { InputField } from './inputField';

export function Form() {
  // State stuff
  const [type, setType] = useState(undefined);
  const [origin, setOrigin] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [paymentSourceAccount, setPaymentSourceAccount] = useState(undefined);
  const [paymentTargetAccount, setPaymentTargetAccount] = useState(undefined);
  const [taxRelevance, setTaxRelevance] = useState(false);
  const [taxCategory, setTaxCategory] = useState(undefined);
  const [paymentMethod, setpaymentMethod] = useState(undefined);
  const [receipt, setReceipt] = useState(undefined);
  const [paymentReference, setPaymentReference] = useState(undefined);

  // Helper functions
  const submitPostRequest = (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_SERVICE_BASE_URL}/home/expenses`;

    const transactionAmount = transactionType.toLowerCase() === "expense" ? -1 * amount : amount;
    const body = {
      type, origin, description,
      tags: tags.filter(tag => tag.length > 0),
      date,
      amount: transactionAmount,
      source_bank_account: paymentSourceAccount,
      target_bank_account: paymentTargetAccount,
      agent: "Ivanna",
      currency: "EUR",
      tax_relevant: taxRelevance,
      tax_category: taxCategory,
      payment_method: paymentMethod,
      receipt,
      comment: paymentReference,
    };// TODO comment, currency, exchange_rate


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        alert(response.status + " " + response.statusText); //TODO show status
      })
      .catch(error => alert(error))
  }

  // Conditional rendering of the taxCategory element
  let taxCategoryElement = null;
  if (taxRelevance) {
    taxCategoryElement = (
      <Dropdown name="Tax category:" value={taxCategory} onChange={setTaxCategory} endpoint="/utils/taxCategories" />
    );
  }

  return (
    <div className="Form">

      <header>
        <h1>Accounting form prototype</h1>
      </header>

      <form
        onSubmit={submitPostRequest}>

        <Dropdown name="Type:" value={type} onChange={setType} endpoint="/utils/expenseTypes" />

        <InputField name="Origin:" value={origin} onChange={setOrigin} />

        <InputField name="Description:" value={description} onChange={setDescription} />

        <InputField name="Tags:" value={tags.join(" ")} onChange={setTags} doSplit={true} />

        <label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        < TransactionType name="Transaction type:" value={transactionType} setTransactionType={setTransactionType} />

        <label>
          <input type="number" placeholder="Amount:" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <InputField name="Payment Reference:" value={paymentReference} onChange={setPaymentReference} />

        <Dropdown name="Payment source account:" value={paymentSourceAccount} onChange={setPaymentSourceAccount} endpoint="/utils/bankAccounts" />

        <Dropdown name="Payment target account:" value={paymentTargetAccount} onChange={setPaymentTargetAccount} endpoint="/utils/bankAccounts" />

        <label className="wrapper">
          Is tax relevant:
            <button className="smallInlineButton" onClick={(e) => { e.preventDefault(); setTaxRelevance(!taxRelevance); }}></button>
        </label>

        {
          taxCategoryElement
        }

        <Dropdown name="Payment method:" value={paymentMethod} onChange={setpaymentMethod} endpoint="/utils/paymentMethods" />


        <label className="wrapper">
          Receipt:
            <div className="wrapperInside">
            <input className="hideInput" type="file" value={receipt} onChange={setReceipt} />
            <button className="smallInlineButton"></button>
          </div>
        </label>

        <button type="submit" >Submit</button>


      </form>

    </div >
  )
}