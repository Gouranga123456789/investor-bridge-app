import React from 'react';

function Dashboard() {
  return (
    <div>
      <h2>Welcome to your Dashboard!</h2>
      <p>You can only see this page if you are logged in.</p>
      <p>
        From here, you could (for example) fetch and display all the 
        business proposals if your role is 'Investor'.
      </p>
    </div>
  );
}

export default Dashboard;