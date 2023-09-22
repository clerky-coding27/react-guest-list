import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [guests, setGuests] = useState([]);
  const [allGuestsServer, setAllGuestsServer] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function getAllGuestsInitial() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setAllGuestsServer(allGuests);
      setLoading(false);
      console.log(`AllGuestsServer:`);
      console.log(allGuests);
    }
    getAllGuestsInitial().catch((error) => {
      setLoading(true);
      console.log(error);
    });
  }, []);

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

  async function createGuests(newGuestList) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newGuestList[newGuestList.length - 1].firstName,
        lastName: newGuestList[newGuestList.length - 1].lastName,
      }),
    });
    const createdGuest = await response.json();
    setGuests([...allGuestsServer]);
    console.log(`CreatedGuestServer:`);
    console.log(createdGuest);
  }

  /*
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

  */

  async function handleRemove(g) {
    const response = await fetch(`${baseUrl}/guests/${g.id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    // setAllGuestsServer(response);
    console.log(deletedGuest);
    // console.log(allGuestsServer););
  }

  async function handleUpdateAttendingTrue(g) {
    const response = await fetch(`${baseUrl}/guests/${g.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
    setGuests([...allGuestsServer]);

    console.log(updatedGuest);
  }

  async function handleUpdateAttendingFalse(g) {
    const response = await fetch(`${baseUrl}/guests/${g.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: false }),
    });
    const updatedGuest = await response.json();
    setGuests([...allGuestsServer]);

    console.log(updatedGuest);
  }

  return (
    <div className="App">
      <header className="header">
        <p>Clara's Guestlist Creator</p>
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
              <label htmlFor="First name">First name</label>
              <input
                id="First name"
                value={firstNameInput}
                disabled={loading}
                onChange={(event) =>
                  setFirstNameInput(event.currentTarget.value)
                }
              />
            </div>
            <div className="LastName">
              <label htmlFor="Last name">Last name</label>
              <input
                id="Last name"
                value={lastNameInput}
                disabled={loading}
                onChange={(event) => setLastNameInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    /* const newGuest = {
                      firstName: firstNameInput,
                      lastName: lastNameInput,
                      state: 'not attending',
                    };
                    */
                    const newGuestList = [
                      ...guests,
                      {
                        firstName: firstNameInput,
                        lastName: lastNameInput,
                        state: 'not attending',
                      },
                    ];

                    setGuests(newGuestList);
                    createGuests(newGuestList).catch((error) => {
                      console.log(error);
                    });
                    // console.log(`AllGuestsArray:`);
                    // console.log(newGuestList);

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
            {loading
              ? 'Loading...'
              : allGuestsServer.map((g) => {
                  return (
                    <div
                      className="ExampleGuest"
                      key={`uniqueID-${g.firstName}-${g.id}`}
                      data-test-id="guest"
                    >
                      <p>
                        {g.firstName} {g.lastName}{' '}
                        {g.attending ? ' | Attending' : ' | Not attending'}
                      </p>

                      <label htmlFor="AttendingStatus">Attending Yes/No</label>
                      <input
                        type="checkbox"
                        id="AttendingStatus"
                        aria-label={`${g.firstName} ${g.lastName} ${g.attending}`}
                        checked={g.attending}
                        onChange={() => {
                          console.log(JSON.stringify(g.attending));
                          if (JSON.stringify(g.attending) === 'false') {
                            handleUpdateAttendingTrue(g).catch((error) => {
                              console.log(error);
                            });
                          } else {
                            handleUpdateAttendingFalse(g).catch((error) => {
                              console.log(error);
                            });
                          }
                        }}
                      />
                      <br />
                      <button
                        onClick={() => {
                          handleRemove(g).catch((error) => {
                            console.log(error);
                          });
                          const index = guests.indexOf(g);
                          guests.splice(index, 1);
                          console.log(guests);
                          setGuests([...allGuestsServer]);
                          // console.log(allGuestsServer);
                        }}
                      >
                        Remove
                      </button>
                      <br />
                      <br />
                    </div>
                  );
                })}
          </div>
        </div>
      </main>
      <hr />
      <footer>
        <p>Contact</p>
      </footer>
    </div>
  );
}
