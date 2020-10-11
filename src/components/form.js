import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Importing components
import { Dropdown } from './dropdown';
import { TransactionType } from './transactionType';
import { InputField } from './inputField';

export function Form() {
  // State stuff
  const [taxRelevance, setTaxRelevance] = useState(false);
  const [receipt, setReceipt] = useState("");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      type: "",
      source_bank_account: "",
      target_bank_account: "",
      target_bank_account: "",
      payment_method: "",
      tax_category: "",
    }
  });

  // Helper functions
  const submitPostRequest = (data) => {
    console.log(data);

    // const url = `${process.env.REACT_APP_SERVICE_BASE_URL}/home/expenses`;

  //   const transactionAmount = transactionType.toLowerCase() === "expense" ? -1 * amount : amount;
  //   const body = {
  //     type, origin, description,
  //     tags: tags.filter(tag => tag.length > 0),
  //     date,
  //     amount: transactionAmount,
  //     source_bank_account: paymentSourceAccount,
  //     target_bank_account: paymentTargetAccount,
  //     agent: "Ivanna",
  //     currency: "EUR",
  //     tax_relevant: taxRelevance,
  //     tax_category: taxCategory,
  //     payment_method: paymentMethod,
  //     receipt,
  //     comment: paymentReference,
  //   };// TODO comment, currency, exchange_rate


  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(response => {
  //       alert(response.status + " " + response.statusText); //TODO show status
  //     })
  //     .catch(error => alert(error))
  }

  // Conditional rendering of the taxCategory element
  let taxCategoryElement = null;
  if (taxRelevance) {
    taxCategoryElement = (
      <Dropdown name="tax_category" placeholder="Tax category:" register={register} endpoint="/utils/taxCategories" />
    );
  }

  return (
    <div className="Form">

      <header>
        <h1>Accounting form prototype</h1>
      </header>

      <form
        onSubmit={handleSubmit(submitPostRequest)}>

        <Dropdown name="type" placeholder="Type:" register={register} required endpoint="/utils/expenseTypes" />

        <InputField name="origin" placeholder="Origin:" register={register}/>

        <InputField name="description" placeholder="Description:" register={register}/>

        <InputField name="tags" placeholder="Tags:" register={register} doNormalize={true} />

        <label>
          <input name="date" type="date" ref={register} />
        </label>

        < TransactionType name="transactionType" placeholder="Transaction type:" register={register}/>

        <label>
          <input name="amount" placeholder="Amount:" type="number" step="0.01" ref={register} />
        </label>

        <InputField name="paymentReference" placeholder="Payment Reference :" register={register} />

        <Dropdown name="source_bank_account" placeholder="Payment source :" register={register} endpoint="/utils/bankAccounts" />

        <Dropdown name="target_bank_account" placeholder="Payment target :" register={register} endpoint="/utils/bankAccounts" />

        <label className="wrapper">
          Is tax relevant:
            <button className="smallInlineButton" onClick={(e) => { e.preventDefault(); setTaxRelevance(!taxRelevance); }}></button>
        </label>

        {
          taxCategoryElement
        }

        <Dropdown name="payment_method" placeholder="Payment method:" register={register} endpoint="/utils/paymentMethods" />


        <label className="wrapper">
          Receipt:
            <div className="wrapperInside">
            <input className="hideInput" type="file" value={receipt} onChange={setReceipt} />
            <button className="smallInlineButton"></button>
          </div>
        </label>

        <button type="submit">Submit</button>


      </form>

    </div >
  )
}