# Nodejs Useful Notes

Nodejs is just a javascript that could run on the server, instead of the client's browser

## Prerequisites

- HTML
- CSS
- Javascript

## JWT (JSON Web Tokens)

- JWT = user identification that is issued after user authentication
- after authentication, our rest api will make access token and refresh token
- access token = short time, refresh token = long time
- hazard = xss: cross-site scripting, csrf: cross site request forgery

#### Access Token

Explanation

- sent as JSON
- client stores in memory (automatically lost when the app is closed)
- don't store in local storage or cookie (if you can store things with javascript, a hacker could also retrieve it with javascript)

Summary

- issued at authorization
- client uses for api access until expires
- verified with middleware (everytime access token is used for making a request)
- new tokens issued at refresh request

#### Refresh Token

Explanation

- sent as httpOnly cookie (which is not asccessible via javascript)
- not accessible via javascript
- must have expiry at some point (requires user to login again)
- shouldn't have the ability to create new refresh token (this will grant
  indefinite access)

Summary

- issued at authorization
- client uses to request new access token
- verified with endpoint & database
- must be allowed to expire or logged out

## Authorization vs Authentication

- Authentication = the process of verifying who someone is
- Authorization = the process of verifying what resources a user has access to
- JSON web tokens:
  - confirm authentication
  - allow access to api endpoints
  - endpoints provide data resources
  - use authorization header

## User Roles and Permissions

- Provide different levels of access
- Sent in access token payload
- Verified with middleware

## Sources
- [Nodejs Tutorial for Beginners](https://www.youtube.com/watch?v=JZXQ455OT3A&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw)
