const CartSubmit = {
  currentForm: "cart-submit",
  formFields: [{
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter the title of your event"
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number"
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter your address"
    },
    {
      name: "from",
      label: "From",
      type: "date",
      placeholder: "Starting date"
    },
    {
      name: "to",
      label: "To",
      type: "date",
      placeholder: "Ending date"
    }
  ],
  formTitle: "Submit your cart"
}

export default CartSubmit