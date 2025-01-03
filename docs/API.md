# API Documentation

## Base URL

'http://localhost:5000/api'


## Authentication
### Register User
- **POST** `/auth/register`
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string",
        "email": "string"
    }
    ```
- **Response**: 201 Created

### Login User
- **POST** `/auth/login`
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response**: 200 OK
    ```json
    {
        "token": "string"
    }
    ```

## Governance
### Create Proposal
- **POST** `/governance/proposals`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string"
    }
    ```
- **Response**: 201 Created

### Get Proposals
- **GET** `/governance/proposals`
- **Response**: 200 OK
    ```json
    [
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "voteCount": "number"
        }
    ]
    ```

## Staking
### Stake Tokens
- **POST** `/staking/stake`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
    ```json
    {
        "amount": "number"
    }
    ```
- **Response**: 200 OK
