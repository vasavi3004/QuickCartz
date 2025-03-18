# Shopping With Your Choice

A comprehensive web application for retail business management with inventory tracking and sales analytics.
Designed for store owners and employees to streamline operations and enhance customer service.

A web-based shopping management application that allows owners and employees to manage inventory, sales, and customer data.

## Features

- **User Authentication**: Secure login system with different access levels (owner, employee)
- **Inventory Management**: Add, edit, and remove products from inventory
- **Sales Tracking**: Record and manage customer purchases
- **Customer Management**: Store and update customer information
- **Reporting**: Generate sales and inventory reports

## Local Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, etc.)
- Basic understanding of HTML, CSS, and JavaScript

### Credential Setup
This project requires credentials for authentication. There are multiple ways to set this up:

#### Option 1: Local Development (config.js)
1. Create a file named `config.js` in the root directory of the project
2. Add the following code to the file, replacing the values with your actual credentials:

```javascript
predefinedUsers = {
  owner: { username: 'your-owner-username', password: 'your-owner-password', userType: 'owner' },
  employees: [
    { username: 'employee1', password: 'password1', userType: 'employee' },
    // Add more employees as needed
  ]
};
```

3. This file is in .gitignore and will not be committed to the repository

#### Option 2: GitHub Deployment (encoded-config.js)
For deploying on GitHub Pages without exposing plain text credentials:

1. Create a file named `encoded-config.js` with the following content:

```javascript
// Base64 encoded credentials
const encodedCredentials = "BASE64_ENCODED_CREDENTIALS_STRING";
```

2. To generate the BASE64_ENCODED_CREDENTIALS_STRING:
   - Use this command in the terminal: `echo '{"owner":{"username":"your-username","password":"your-password","userType":"owner"},"employees":[]}' | base64`
   - Or use an online base64 encoder with your JSON credentials

3. Add this file to your repository

#### Option 3: Using Environment Variables (Production)
For more secure production deployments, consider using a proper backend service that can securely handle environment variables.

### Data Configuration
The application uses local storage to maintain data persistence. Initial sample data can be added by:

1. Modifying the sample data in the `js/data.js` file
2. Or adding products through the owner interface after login

### Running the Application
1. Open `index.html` in your web browser to start the application
2. Login using the credentials configured in `config.js`
3. Navigate through the application using the menu options

## Project Structure

- `/css` - Contains styling files
- `/js` - JavaScript files for application functionality
- `/images` - Product and UI images
- `index.html` - Main entry point for the application

## Usage Guide

### Owner Access
- Full access to all features
- Can add/remove employee accounts
- Access to sales reports and analytics
- Inventory management capabilities

### Employee Access
- Limited access based on permissions
- Can process sales and update inventory
- View customer information

## GitHub Deployment Security Note

When deploying to GitHub Pages, sensitive information should never be stored in plain text. The encoded-config.js approach provides basic obfuscation but is not fully secure. For production applications, consider:

1. Using a proper authentication backend service
2. Implementing OAuth or other token-based authentication
3. Using environment variables through a CI/CD pipeline
4. Setting up a serverless function to handle authentication

## Support

For issues or questions, please contact the development team at [example@example.com]

## License

This project is licensed under the MIT License - see the LICENSE file for details
