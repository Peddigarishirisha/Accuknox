import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './main.css';
import { BsArrowRepeat } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { IoTime } from "react-icons/io5";
import { PiGreaterThanThin } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbBellRinging } from "react-icons/tb";

const Main = () => {
  // Initial categories with widgets
  const initialCategories = [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Cloud Accounts', text: 'This is some random text for Widget 1' },
        { id: 2, name: 'Cloud Accounts Risk Assessment', text: 'This is some random text for Widget 2' },
      ],
    },
    {
      id: 2,
      name: 'CWP Dashboard',
      widgets: [
        { id: 1, name: 'Tap 5 name spaces specific amount', text: 'This is some random text for Widget 1' },
        { id: 2, name: 'Workload Alerts', text: 'This is some random text for Widget 2' },
      ],
    },
    {
      id: 3,
      name: 'Registry Scan',
      widgets: [
        { id: 1, name: 'Image Risk Assessment', text: 'This is some random text for Widget 1' },
        { id: 2, name: 'Image Security issues', text: 'This is some random text for Widget 2' },
      ],
    },
  ];

  // State hooks
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new widget to a category
  const addWidget = (categoryId, widget) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, { ...widget, id: Date.now() }] }
          : category
      )
    );
  };

  // Remove a widget from a category
  const removeWidget = (categoryId, widgetId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
          : category
      )
    );
  };

  // Show the form for adding a new widget
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Hide the form and reset the input fields
  const handleCancel = () => {
    setShowForm(false);
    setWidgetName('');
    setWidgetText('');
    setSelectedCategory(null);
  };

  // Confirm the addition of the new widget
  const handleConfirm = () => {
    if (selectedCategory && widgetName && widgetText) {
      addWidget(selectedCategory, { name: widgetName, text: widgetText });
      handleCancel();
    }
  };

  // Filter categories and widgets based on the search term
  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="App">
      {/* New Navbar */}
      <nav className="top-navbar">
        <div className="top-navbar-left">
          <p>Home</p>
          <span><PiGreaterThanThin /></span>
          <h4>Dashboard</h4>
        </div>
        <div className="top-navbar-right">
          <input
            type="text"
            placeholder="Search Anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="dropdown-button"><IoIosArrowDown /></button>
          <button className="profile-button"><TbBellRinging /></button>
          <button className="profile-button"><CgProfile /></button>
        </div>
      </nav>

      {/* Existing Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="dashboard-link">CNAPP Dashboard</h2>
        </div>
        <div className="navbar-right">
          <button className="navbar-button" onClick={handleShowForm}>Add Widget +</button>
          <button className="navbar-button"><BsArrowRepeat /></button>
          <button className="navbar-button">:</button>
          <button className="navbar-button"><IoTime /> Last 2 days <GoChevronDown /></button>
        </div>
      </nav>

      {/* Widget Form */}
      {showForm && (
        <div className="widget-form-container">
          <div className="widget-form-header">
            <span>Add Widget</span>
            <button style={{color:'white',fontSize:'20px'}} onClick={handleCancel}>×</button>
          </div>
          <h3>Personalize your dashboard by adding the following widget:</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
          <div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
            </div>
        </div>
      )}

      <Dashboard categories={filteredCategories} addWidget={addWidget} removeWidget={removeWidget} />
    </div>
  );
};

export default Main;
