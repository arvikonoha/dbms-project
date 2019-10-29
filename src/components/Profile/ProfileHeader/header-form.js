const HeaderForm = {
  currentForm: "update-basic",
  formFields: [{
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Update your Business title"
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Update your Business location"
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "Update your Business category"
    }
  ],
  formTitle: "Update your title,location or category",
  required: 'false'
}

export default HeaderForm