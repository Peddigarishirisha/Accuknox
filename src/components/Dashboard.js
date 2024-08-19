import React from 'react';
import WidgetForm from './Widgetform';
import './dashboard.css';

const Dashboard = ({ categories, addWidget, removeWidget }) => {
  return (
    <div className="dashboard-container">
      {categories.map((category) => (
        <div key={category.id} className="category">
          <h3>{category.name}</h3>
          <div className="widgets-row">
            {category.widgets.map((widget) => (
              <div key={widget.id} className="card">
                <h4>{widget.name}</h4>
                <p>{widget.text}</p>
                <button onClick={() => removeWidget(category.id, widget.id)}>X</button>
              </div>
            ))}
            <WidgetForm categoryId={category.id} addWidget={addWidget} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

