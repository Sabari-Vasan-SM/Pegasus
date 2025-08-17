# Pegasus - Google Form Auto Filler

Pegasus is a smart Chrome extension designed to streamline your experience with Google Forms by automatically filling in your personal details.

## Features

- **One-Time Setup**: Save your details like name, phone number, email, and address once in the secure options page.
- **Automatic Filling**: When you open a Google Form, Pegasus detects the fields and fills them with your saved information.
- **Human-like Typing**: To ensure compatibility and a natural interaction, the extension simulates human typing when filling out the fields.
- **Modern UI**: A clean and easy-to-use settings page to manage your information.
- **Secure**: Your data is stored locally on your browser using `chrome.storage.sync`, ensuring it's safe and private.

## How to Install and Use

### Installation

1.  **Download the files:** Clone or download this repository to your computer.
2.  **Open Chrome Extensions:** Open Google Chrome, type `chrome://extensions` in the address bar, and press Enter.
3.  **Enable Developer Mode:** Turn on the "Developer mode" toggle, usually found in the top-right corner.
4.  **Load the Extension:** Click the "Load unpacked" button and select the folder where you saved the extension files.
5.  **Ready to Go:** The Pegasus extension is now installed and ready to use!

### Saving Your Details

1.  **Access Options:** Right-click the Pegasus icon in your Chrome toolbar and select "Options".
2.  **Enter Information:** Fill in the fields with your details.
3.  **Save:** Click the "Save" button. Your information is now saved for auto-filling.

### Filling Google Forms

- Simply open any Google Form. Pegasus will automatically identify the relevant fields and fill them in for you.

## Project Files

- `manifest.json`: The core file that defines the extension's properties and permissions.
- `options.html`: The HTML structure for the settings page.
- `options.css`: The stylesheet that gives the settings page its modern look.
- `options.js`: Handles the logic for saving and retrieving user data on the options page.
- `content.js`: This script is injected into Google Forms to find the fields and fill them with your data.
- `background.js`: The service worker for the extension (can be used for future background tasks).
- `icons/`: Contains the icons for the extension.
