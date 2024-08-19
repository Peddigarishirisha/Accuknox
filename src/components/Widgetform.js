import React, { useState } from 'react';
import './widgetform.css'; // Import Widget styles here

const WidgetForm = ({ categoryId, addWidget }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAddWidget = () => {
    if (widgetName && widgetText) {
      addWidget(categoryId, { name: widgetName, text: widgetText });
      setWidgetName('');
      setWidgetText('');
    }
  };

  return (
    <div className='addcard'>
      <input
        type="text"
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Widget Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />
      <button onClick={handleAddWidget}>+ Add Widget</button>
    </div>
  );
};

export default WidgetForm;
