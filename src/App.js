import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [guests, setGuests] = useState([]);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function createGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: guests[guests.length - 1].firstName,
          lastName: guests[guests.length - 1].lastName,
        }),
      });
      const createdGuest = await response.json();
      console.log(createdGuest);
    }
    createGuest().catch((error) => {
      console.log(error);
    });
  }, [guests]);

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
                value={firstNameInput}
                onChange={(event) =>
                  setFirstNameInput(event.currentTarget.value)
                }
              />
            </div>
            <div className="LastName">
              <label htmlFor="Last name">Last Name:</label>
              <input
                id="Last name"
                value={lastNameInput}
                onChange={(event) => setLastNameInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    const newGuest = [
                      ...guests,
                      {
                        firstName: firstNameInput,
                        lastName: lastNameInput,
                        state: 'not attending',
                      },
                    ];
                    setGuests(newGuest);
                    console.log(newGuest);
                    setFirstNameInput('');
                    setLastNameInput('');
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
