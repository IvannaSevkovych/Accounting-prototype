import React, { useState } from 'react';
import './App.css';
// Importing components
import { Dropdown } from './components/dropdown';
import { TransactionType } from './components/transactionType';
import { InputField } from './components/inputField';

function App() {
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
  
  // // Helper functions
  const submitPostRequest = () => {
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
      tax_relevant: taxRelevance,
      tax_category: taxCategory,
      payment_method: paymentMethod,
      receipt,
    };// TODO comment, currency, exchange_rate


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response=>{
      alert(response.status + " " + response.statusText); //TODO show status
    })
    .catch(error=>alert(error))
  }

  // Conditional rendering of the taxCategory element
  let taxCategoryElement = null;
  if (taxRelevance) {
    taxCategoryElement = (
      <Dropdown name="Tax category:" value={taxCategory} onChange={setTaxCategory} endpoint="/utils/taxCategories"/>
   );
  } 

  return (
    <div className="App">

      <header>
        <h1>Accounting form prototype</h1>
      </header>

      <form
        onSubmit={submitPostRequest}>

        <Dropdown name="Type:" value={type} onChange={setType} endpoint="/utils/expenseTypes"/>
        
        <InputField name="Origin:" value={origin} onChange={setOrigin} />

        <InputField name="Description:" value={description} onChange={setDescription} />

        <InputField name="Tags:" value={tags.join(" ")} onChange={setTags} doSplit={true} />

        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        < TransactionType name="Transaction type:" value={transactionType} setTransactionType={setTransactionType} />

        <label>
          Amount:
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <Dropdown name="Payment source account:" value={paymentSourceAccount} onChange={setPaymentSourceAccount} endpoint="/utils/bankAccounts"/>

        <Dropdown name="Payment target account:" value={paymentTargetAccount} onChange={setPaymentTargetAccount} endpoint="/utils/bankAccounts"/>

        <label>
          Tax relevant:
          <input type="checkbox" value={taxRelevance} onChange={(e) => setTaxRelevance(e.target.checked)} />
        </label>

        {
          taxCategoryElement
        }

        <Dropdown name="Payment method:" value={paymentMethod} onChange={setpaymentMethod} endpoint="/utils/paymentMethods"/>


        <label>
          Receipt:
          <input type="file" value={receipt} onChange={setReceipt} />
        </label>
        <input type="submit" value="Submit"/>


      </form>

    </div>
  )
}

export default App;
