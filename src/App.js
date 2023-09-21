import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [guests, setGuests] = useState([]);
  const [allGuestsServer, setAllGuestsServer] = useState([]);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setAllGuestsServer(allGuests);
      console.log(`AllGuestsServer:`);
      console.log(allGuests);
    }
    getAllGuests().catch((error) => {
      console.log(error);
    });
  }, [guests]);

  useEffect(() => {
    async function createGuests() {
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
      console.log(`CreatedGuestServer:`);
      console.log(createdGuest);
    }
    createGuests().catch((error) => {
      console.log(error);
    });
  }, [guests]);

  useEffect(() => {
    async function getOneGuest() {
      const response = await fetch(`${baseUrl}/guests/:6`);
      const guest = await response.json();
      console.log(guest);
    }
    getOneGuest().catch((error) => {
      console.log(error);
    });
  }, []);

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
                    const newGuest = {
                      firstName: firstNameInput,
                      lastName: lastNameInput,
                      state: 'not attending',
                    };
                    const newGuestList = [
                      ...guests,
                      {
                        firstName: firstNameInput,
                        lastName: lastNameInput,
                        state: 'not attending',
                      },
                    ];
                    setGuests(newGuestList);
                    console.log(`AllGuestsArray:`);
                    console.log(newGuestList);

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
            <h2>Manage Guestlist:</h2>

            {allGuestsServer.map((g) => {
              return (
                <div
                  className="ExampleGuest"
                  key={`uniqueID-${g.firstName}`}
                  data-test-id="guest"
                >
                  <p>{g.firstName}</p>
                  <p>{g.lastName}</p>
                  <p>{g.attending ? 'Attending' : 'Not attending'}</p>
                  <button>Remove</button>
                  <input
                    type="checkbox"
                    aria-label="<first name> <last name> <attending status>"
                  />
                </div>
              );
            })}

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
