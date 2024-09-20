import React, { useState } from 'react';
import './App.css';

function App() {
  const [formFields, setFormFields] = useState([]);

  // Handle adding new fields when clicked from the sidebar
  const addField = (type) => {
    const newField = { type, label: '', placeholder: '', required: false };
    setFormFields([...formFields, newField]);
  };

  // Handle field changes
  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  // Remove field
  const removeField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  // Toggle required validation
  const toggleRequired = (index) => {
    const updatedFields = [...formFields];
    updatedFields[index].required = !updatedFields[index].required;
    setFormFields(updatedFields);
  };

  // Render field with edit and delete options
  const renderField = (field, index) => {
    return (
      <div key={index} className="form-element">
        <label>{field.label || 'Field Label'}</label>
        {field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder || 'Enter text here'}
            required={field.required}
          />
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder || 'Enter text here'}
            required={field.required}
          />
        )}
        <div className="field-actions">
          <button onClick={() => handleFieldChange(index, 'label', prompt('Edit label:', field.label))}>
            Edit Label
          </button>
          <button onClick={() => handleFieldChange(index, 'placeholder', prompt('Edit placeholder:', field.placeholder))}>
            Edit Placeholder
          </button>
          <button onClick={() => toggleRequired(index)}>
            {field.required ? 'Remove Required' : 'Make Required'}
          </button>
          <button onClick={() => removeField(index)}>Delete</button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <h1>Form Editor</h1>
      </header>

      <div className="editor">
        {/* Sidebar with form fields */}
        <nav className="sidebar">
          <h2>Form Fields</h2>
          <button onClick={() => addField('text')}>Text Input</button>
          <button onClick={() => addField('textarea')}>Text Area</button>
          <button onClick={() => addField('email')}>Email Field</button>
          <button onClick={() => addField('tel')}>Phone Number</button>
          <button onClick={() => addField('button')}>Button</button>
        </nav>

        {/* Main output area for live editing */}
        <main className="output-area">
          <h2>Form Preview</h2>
          {formFields.map((field, index) => renderField(field, index))}
        </main>
      </div>
    </div>
  );
}

export default App;
