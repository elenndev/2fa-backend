# 2FA with email
A Backend application that register users and implements a 2FA login using the user's email.

# Installation
1. Clone the repository:  
`https://github.com/elenndev/2fa-backend.git`
2. Install the dependencies:  
`npm i`

# Usage
Run the project using: `npm run start:dev`, the application will be running on: `http://localhost:3000/`.

## Setting email sending service environment
The easiest and quickest tool to get ready for use that i found to use in this project is [Resend](https://resend.com/), you just need to create an account and they give you a quick start so you can get your API KEY and put it in the `.env`.  
You can still change and use your preferred tool to send the email, just change the code in the `emailSender.ts` file.
```
src/
├─ common/
│  ├─ emailSender.ts
```

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
1. Login making a POST request to `http://localhost:3000/users/login`, you will receive an email with the PIN code that you must use to confirm your identity. Here's an example body to this request:
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

## Additional routes 
```
```
```
```
```
