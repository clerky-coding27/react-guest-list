# Guest List App

## Overview

Welcome to the Guest List App, a React-based application designed to streamline the management of your event's guest list. This application offers a user-friendly interface with features aimed at enhancing the overall event planning experience.

👷 **This project is still under construction** 👷
## Features

### Adding a Guest

- Add a guest seamlessly using separate first name and last name fields.
- Intuitive labels accompany each input, ensuring clarity for users.
- Guests are created effortlessly by pressing "Return" in the last name input.
- After creation, both fields are automatically cleared, and guests are marked as not attending by default.
- Each guest, along with their details, is neatly contained within a div element identified by `data-test-id="guest"`.

### Edit Existing Guests

- Allow users to edit the first and last names of existing guests for flexibility.

### Deleting Guests

- Remove guests with a button labeled "Remove."
- Buttons are equipped with an `aria-label` attribute for accessibility (e.g., "Remove John Doe").
- Conveniently remove all guests marked as attending.




### Attending Status

- Toggle a guest's attending status by clicking on a checkbox.
- The checkbox includes an `aria-label` for clear identification (e.g., "John Doe attending status").
- On the first click, guests are marked as attending (checkbox checked).
- On the second click, the attending status is updated to not attending (checkbox unchecked).

### Filters

- Filter guests to show only those not attending or attending.
- Reset filters with a single click to display the complete guest list.

## API Integration

- Integrates with an API for efficient storage and retrieval of guest data.
- Changes are automatically saved to the API.
- A loading message is displayed during API fetch on page load, ensuring a smooth user experience.
- Form fields are disabled while loading to prevent interference.

## Views

- The default view displays a comprehensive list of all guests.
- Two tables were created since the testing porgram did not like the <table>. This will be fixed!


If you have suggestions or find ways to improve, don't hesitate to open an issue or submit a pull request. Happy coding!
