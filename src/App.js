import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <main>
        <h1>GuestList</h1>
        <div className="CreateGuest">
          <h2>Add Guest Name:</h2>
          <div className="FirstName">
            <label htmlFor="First name">First Name:</label>
            <input id="First name" />
          </div>
          <div className="LastName">
            <label htmlFor="Last name">First Name:</label>
            <input id="Last name" />
          </div>
        </div>
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
