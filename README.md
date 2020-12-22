# LoanApp

This project is created using Django REST Framework (Python 3.6) and React.JS. This web application allows:
1. A new user to register themselves 
2. Complete KYC verification with Aadhaar, PAN or Passport 
3. Apply for various kinds of loans.

## Technologies Used
<ul>
<li> Python</li>
<li> Django REST Framework</li>
<li> MySQL </li>
<li> React.JS</li>
<li> react-bootstrap</li>
</ul>

## Additional Python modules required
<ul>
<li> django
<li> djangorestframework
<li> django-cors-headers
<li> mysqlclient
</ul>


## Usage

In the project directory, you can run:

### `python manage.py makemigrations`

Creates the migrations required to update the database

### `python manage.py migrate`

Updates the MySQL database and creates the database schema


### `python manage.py runserver`

Runs the app in the development mode.<br />
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to view it in the browser.

## To run the frontend seperately
In the project directory, run:

### `cd loanappclient`
Navigates to the root of the react app
### `npm install`
Installs necessary node packaged
### `npm start`
Runs the react app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can run `python manage.py runserver` in the project root directory to start the backend seperately.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Deployment

The app is deployed here: https://loanapp2.herokuapp.com/

