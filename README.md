﻿# Simple TODOS

## Overview
Simple TODOS is a lightweight and user-friendly web application for managing your tasks. This application allows you to create, mark as completed, uncomplete, delete, download, and upload your to-do list in JSON format. The application saves tasks locally using `localStorage`.

## Features
- **Create Todos**: Add new tasks to your list.
- **Complete/Uncomplete Todos**: Mark tasks as completed or revert them to incomplete.
- **Delete Todos**: Remove tasks from the list.
- **Download Todos as JSON**: Save all tasks as a JSON file.
- **Upload Todos from JSON**: Load a list of tasks from a JSON file.
- **Wipe Todos**: Clear all tasks.
- **Persistent Storage**: Uses `localStorage` to save tasks even after a page refresh.

## Installation & Usage
### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-todos.git
   cd simple-todos
   ```
2. Open `index.html` in a browser.

### Controls
- **Adding a Todo**: Enter a task in the input field and click the submit button.
- **Mark as Completed**: Click the checkmark button.
- **Uncomplete a Task**: Click the 'X' button.
- **Delete a Task**: Click the trash icon.
- **Download Todos**: Click the download button to save tasks as `todos.json`.
- **Upload Todos**: Select a JSON file and click the upload button to load tasks.
- **Wipe Todos**: Click the explosion button to clear all tasks.

## File Structure
```
Simple TODOS/
│── index.html       # Main HTML file
│── style.css        # Stylesheet
│── script.js        # JavaScript logic
│── README.md        # Documentation
```

## Technologies Used
- HTML
- CSS
- JavaScript (localStorage for persistence)

## JSON Format
Example of the `todos.json` format:
```json
[
  {
    "id": 1,
    "name": "Buy groceries",
    "completed": false
  },
  {
    "id": 2,
    "name": "Finish project",
    "completed": true
  }
]
```
