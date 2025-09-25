# 2FA with email
A Backend application that register users and implements a 2FA login using the user's email.

# Stack
- Typescript
- [NestJs](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Nodemailer](https://nodemailer.com/)

# Installation
1. Clone the repository:  
`git clone https://github.com/elenndev/2fa-backend.git`
2. Install the dependencies:  
`npm i`

# Usage
Run the project using: `npm run start:dev`, the application will be running on: `http://localhost:3000/`.

## Setting email sending service environment
This application uses [Nodemailer](https://nodemailer.com/) to send the emails with Gmail as a service, so you need to get your gmail app password, just follow this steps:
- Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
- Go to or search for 'App password'
- Choose the name of your app password and copy your new generated app password


***
## Creating an user
Make a POST request to `http://localhost:3000/users`, you need to include a **body**. Here's an example body in JSON:
```https
  {
    "username": "yourusername",
    "email": "yourEmail@mail.com",
    "password": "securepassword"
  }
```

**Important!**  
Create a user with an email that you have access to, it is essential for the next step.

## Auth
1. Login making a POST request to `http://localhost:3000/users/login`, if the credentials are correct, you will receive an email with the PIN code that you must use to confirm your identity. Here's an example body to this request:
```https
{
  "username": "yourusername",
  "password": "verysecurepassword"
}
```

2. To confirm the user identity, your Frontend must make a POST request to `http://localhost:3000/users/validate-auth`, and send in the body the username and the code the user is trying to validate. Here's an example:
```
{
    "username": "elenndev",
    "pin": "12812"
}
```

