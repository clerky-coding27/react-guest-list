import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [firstNameInput, setFirstNameInput] = useState('xyz');

  return (
    <div className="App">
      <header className="header">
        <p>Header</p>
      </header>
      <main>
        <h1>GuestList</h1>
        <div className="CreateGuest">
          <h2>Add Guest Name:</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="FirstName">
              <label htmlFor="First name">First Name:</label>
              <input
                id="First name"
                onChange={(event) => setFirstNameInput(event.target.value)}
              />
            </div>
            <div className="LastName">
              <label htmlFor="Last name">Last Name:</label>
              <input
                id="Last name"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    const newGuest = {
                      firstName: firstNameInput,
                      state: 'not attending',
                    };
                    console.log(newGuest);
                  }
                }}
              />
            </div>
          </form>
        </div>
        <hr />
        <div className="GuestList-Section">
          <div className="GuestList">
            <div className="ExampleGuest" key="uniqueID" data-test-id="guest">
              <p>FirstNameVariable</p>
              <p>LastNameVariable</p>
              <p>StatusVariable - default not attending</p>
              <button>Remove</button>
              <input
                type="checkbox"
                aria-label="<first name> <last name> <attending status>"
              />
              <hr />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
