# Todo Application

Write APIs to perform operations on the table `todo`, with the following columns:

**Todo Table**

| Column   | Type    |
| -------- | ------- |
| id       | INTEGER |
| todo     | TEXT    |
| category | TEXT    |
| priority | TEXT    |
| status   | TEXT    |
| due_date | DATE    |

## Important Notes

- Possible values for `priority`: `HIGH`, `MEDIUM`, `LOW`.
- Possible values for `status`: `TO DO`, `IN PROGRESS`, `DONE`.
- Possible values for `category`: `WORK`, `HOME`, `LEARNING`.
- Use `yyyy-MM-dd` format for dates with date-fns `format`

## Invalid Scenarios for All APIs

- **Invalid Status**: Returns `400` with message `Invalid Todo Status`
- **Invalid Priority**: Returns `400` with message `Invalid Todo Priority`
- **Invalid Category**: Returns `400` with message `Invalid Todo Category`
- **Invalid Due Date**: Returns `400` with message `Invalid Todo dueDate`

## API 1: Get Todos List

**Path:** `/todos`

**Method:** `GET`

**Query Parameters:**

- `status` - Filter by todo status
- `priority` - Filter by priority
- `category` - Filter by category
- `search_q` - Search in todo text

**Response:**

```json
{
  "status": true,
  "message": "fetched todos list successfully",
  "results": 2,
  "todos": [
    {
      "id": 2,
      "todo": "Buy a Car",
      "priority": "MEDIUM",
      "status": "TO DO",
      "category": "HOME",
      "due_date": "2021-09-22"
    }
  ]
}
```

## API 2: Get Todo by ID

**Path:** `/todos/:id`

**Method:** `GET`

**Response:**

```json
{
  "status": true,
  "message": "fetched todo details successfully",
  "todo": {
    "id": 1,
    "todo": "Learn Node JS",
    "priority": "HIGH",
    "status": "IN PROGRESS",
    "category": "LEARNING",
    "due_date": "2021-03-16"
  }
}
```

## API 3: Get Todos by Date

**Path:** `/agenda`

**Method:** `GET`

**Query Parameters:**

- `date` - Date in `yyyy-MM-dd` format

**Response:**

```json
{
  "status": true,
  "message": "fetched agenda todos successfully",
  "results": 1,
  "todos": [
    {
      "id": 3,
      "todo": "Clean the garden",
      "priority": "LOW",
      "status": "TO DO",
      "category": "HOME",
      "due_date": "2021-12-12"
    }
  ]
}
```

## API 4: Create Todo

**Path:** `/todos`

**Method:** `POST`

**Request Body:**

```json
{
  "todo": "Finalize event theme",
  "priority": "LOW",
  "status": "TO DO",
  "category": "HOME",
  "dueDate": "2021-02-22"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Todo created successfully",
  "data": {
    "todo": {
      "id": 6,
      "todo": "Finalize event theme",
      "priority": "LOW",
      "status": "TO DO",
      "category": "HOME",
      "due_date": "2021-02-22"
    }
  }
}
```

## API 5: Update Todo

**Path:** `/todos/:id`

**Method:** `PUT`

**Request Body:**

```json
{
  "todo": "Updated todo text",
  "status": "DONE",
  "priority": "HIGH",
  "category": "LEARNING",
  "dueDate": "2021-01-12"
}
```

**Response:**

```json
{
  "status": true,
  "message": "fetched todo details successfully",
  "todo": {
    "id": 1,
    "todo": "Updated todo text",
    "priority": "HIGH",
    "status": "DONE",
    "category": "LEARNING",
    "due_date": "2021-01-12"
  }
}
```

## API 6: Update Todo Status (Patch)

**Path:** `/todos/:id`

**Method:** `PATCH`

**Request Body:**

```json
{
  "status": "IN PROGRESS"
}
```

**Response:**

```json
{
  "status": true,
  "message": "updated todo status successfully",
  "todo": {
    "id": 1,
    "todo": "Learn Node JS",
    "priority": "HIGH",
    "status": "IN PROGRESS",
    "category": "LEARNING",
    "due_date": "2021-03-16"
  }
}
```

## API 7: Delete Todo

**Path:** `/todos/:id`

**Method:** `DELETE`

**Response:**

```json
{
  "status": true,
  "message": "task deleted successfully"
}
```

## Setup

Use `npm install` to install the required packages.

Export the express instance using default export syntax and use CommonJS module syntax.
