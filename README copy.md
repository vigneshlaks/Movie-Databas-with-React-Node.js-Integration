[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UBNdBQ9X)
# Homework 1: Basic Client-Server Web App with DynamoDB Integration

## Milestone 2: Building a Cloud-Hosted Indexer with a Simple UI Using React and Node.js

In this milestone, you will rewrite the backend logic from the previous milestone in JavaScript and
integrate it with a React frontend.

### Objectives

- **JavaScript Query Handling**: Transition the query handling logic previously written in Java for
  the backend into JavaScript to be executed within a Node.js environment.
- **React User Interface Development**: Build a user-friendly frontend using React. This interface
  should enable users to effortlessly interact with your backend services, providing a responsive
  and intuitive user experience.

### Setup

1. **Clone the Repository**: Clone the Milestone 2 repository into your `nets2120` directory.

2. **Launch AWS Academy**: Following Milestone 1's instructions, start a new session in AWS Learner
   Lab.

3. **Update AWS Credentials**: In your Docker container, update the `~/.aws/credentials` file with
   the current session's credentials. Remember that each AWS Learner Lab session lasts up to 4
   hours, and this step must be repeated every time you start a new session.
4. **Upload the Dataset**: We have provided a
   new [safe-for-work movies dataset](data/title.basics.sfw.tsv) containing 10,000 entries, filtered
   to exclude `isAdult` content. Create a new table on AWS DynamoDB and upload this dataset using
   your Milestone 1 loader, adhering to the same table schema and accepting the default settings
   during the table creation.

### Introduction to React and Node.js

React is a leading JavaScript library for developing dynamic and interactive user interfaces. It
enables the creation of web applications that can update and render efficiently as data changes,
without needing to reload the page. React focuses on the concept of components, which are reusable
and encapsulate the functionality of parts of the user interface.

Node.js is an open-source, cross-platform JavaScript runtime that executes JavaScript code
server-side. Known for its efficiency in handling concurrent connections and high throughput,
Node.js is perfect for developing scalable network applications. It forms the backbone of our
backend services, providing a robust environment for our web application's server-side logic.

### Understanding Async Programming and Handling Promises in Node.js

When developing the backend with Node.js, especially while interacting with databases like DynamoDB,
it's crucial to grasp the concepts of asynchronous programming and promises. This understanding
ensures that your server efficiently handles I/O-bound tasks, like database queries, without
blocking the main thread.

#### Asynchronous Programming in Node.js

Node.js operates on a non-blocking, event-driven architecture, ideal for building scalable network
applications. In this model, operations like reading from a file system or querying a database don't
halt the execution of your code; instead, these tasks are executed in the background, allowing your
application to handle other operations simultaneously.

#### Promises: Handling Asynchronous Operations

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
in JavaScript is an object representing the eventual completion or failure of an asynchronous
operation. It allows you to associate handlers with an asynchronous action's eventual success value
or failure reason. This makes managing asynchronous operations more manageable and avoids the
so-called "[callback hell](http://callbackhell.com/)."

#### Tips for Asynchronous Programming in Node.js

- **Async/Await Syntax**: To handle promises more intuitively, use the `async/await` syntax. Mark
  your functions with `async` where you plan to perform asynchronous operations, and use `await` to
  pause the execution until the Promise resolves.
    ```javascript
    app.get('/some-route', async (req, res) => {
      try {
        const result = await someAsyncOperation();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: 'Error performing the operation' });
      }
    });
    ```
- **Execution Order**: Remember, code within an `async` function after an `await` statement will
  wait for the Promise to resolve before executing. This is crucial for operations like database
  queries, where you need the result before sending a response back to the client.
- **Handling Empty Lists**: If your server unexpectedly returns empty lists or seems to respond
  before completing database queries, it likely stems from not properly awaiting Promises. Ensure
  that your response to the client is sent only after the asynchronous operation has completed.
- **Error Handling**: Use `try/catch` blocks within `async` functions to handle exceptions from
  rejected Promises. This prevents your backend from crashing due to unhandled promise rejections
  and allows you to send meaningful error responses to the client.

### Integrating React Frontend with Node.js Backend

In this milestone, you will connect a React-based frontend with a Node.js backend, facilitating
seamless data exchange between the user interface and the server.

1. **Frontend Requests**: Utilize Axios, a promise-based HTTP client for the browser and Node.js, to
   make HTTP requests from your React application. This allows your frontend to request data from or
   send data to your backend. An example Axios request looks like
   this: `const response = await axios.get('http://{URL of the API endpoint}')`;
2. **Backend Responses**: Your Node.js backend will handle these requests by performing necessary
   actions (such as database operations) and responding accordingly. Responses can be in various
   formats, including JSON, HTML, or status codes, using Node.js' express framework methods
   like `app.get`, `app.post`, `app.listen`, etc.

### Code Structure

#### Node.js Backend Overview

- [`server.js`](server/server.js): Central to the backend, this file initializes a web server
  capable of processing user search requests for movies. It configures the server to listen for HTTP
  requests, directing them to their respective handlers based on the search criteria specified in
  the web address.

#### React Frontend Overview

- **State Management** ([`App.js`](src/App.js)): Acts as the core of the React application, managing
  the state pertaining to movie searches and results display. It integrates a search form for
  inputting search parameters and manages the presentation of search results, fetched potentially
  from the backend, in an accessible and visually appealing manner.
- **Component Files**: React's architecture is component-based, facilitating modular UI design. For
  this project, we focus on two main components:
    - **[MovieCard](src/components/MovieCardComponent.jsx)**: Represents individual movie details in
      a card-like format.
    - **[SearchForm](src/components/SearchFormComponent.jsx)**: A form that users interact with to
      specify search parameters for movies.
- **Styling Files** ([`App.css`](src/App.css)): Contains CSS rules for styling the React components,
  enhancing the visual aspect of the application and ensuring a cohesive look and feel.

### Running the Code

You should run all the following commands from your Docker container and within the Milestone 2 root
directory. You may ignore the warnings about vulnerabilities when installing dependencies.

- **Install Dependencies**: `npm install`
- **Launch the Backend**: `npm run start-server`
- **Launch the Frontend**: `npm run start-web`

### Backend Development: Implementing Node.js Server Queries

#### API Endpoint Specification

- **Query Endpoint** (`/query`): This single endpoint consolidates the functionality of searching by
  title, year range, and genres into one versatile route. It performs searches based on specified
  field and value query parameters.
- **Parameters**:
    - `field`: Specifies the search criterion. Acceptable values are `title`, `years`, and `genres`.
    - `value`: The search term(s) corresponding to the chosen field.
        - For `title`, it supports a case-sensitive substring match.
        - For `years`, input should be in the format `{startYear},{endYear}` (end year is optional).
        - For `genres`, specify a comma-separated list of genres.
- **Usage Examples**:
    - **Title Search**: `/query?field=title&value=Casa` searches for titles containing the
      substring "Casa".
    - **Year Range Search**: `/query?field=years&value=1990,1995` filters entries between 1990 and
        1995. To search for a specific year, omit the end year: `/query?field=years&value=1990`.
    - **Genres Search**: `/query?field=genres&value=Animation,Musical` returns entries matching
      both "Animation" and "Musical" genres.

#### Extracting Query Parameters

Begin by retrieving the `field` and `value` from the request's query parameters. These are crucial
for formulating the DynamoDB query.

#### Input Validation

Ensure the presence of both `field` and `value` parameters. If any is missing, respond with
a `400 Bad Request` status, alongside an error message clarifying the necessity of both parameters:

```javascript
res.status(400).json({error: 'Field and value query parameters are required.'});
```

#### Preparing for the Query

- **Split Value into Words**: Transform the `value` parameter into an array of words
  using `.split()` and regular expressions. This assists in constructing a DynamoDB query capable of
  searching for multiple keywords within a given field.
- **Constructing the Query**: Adapt the queries you wrote for milestone 1 to JavaScript. Formulate
  your query parameters, specifying the target table (`TableName`), the query
  condition (`FilterExpression`), and attribute names and values involved in the
  query (`ExpressionAttributeNames` and `ExpressionAttributeValues`).

#### Executing the Query

You will send a `ScanCommand` to DynamoDB, specifying the query parameters you constructed. Read the
[documentation to scan a DynamoDB table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Scan.html)
for JavaScript SDK V3 to understand how to execute a scan command.

#### Handling the Query Response

- **Successful Queries**: On finding matching items, return them as a JSON response:
  ```javascript
  res.status(200).json(result.Items);
  ```
- **No Matching Items**: If no items match the query, respond with a `404 Not Found` status and an
  error message:
  ```javascript
  res.status(404).json({error: 'No matching items found.'});
  ```
- **Error Handling**: In the event of an error during the query, respond with
  a `500 Internal Server Error` status and an error message:
    ```javascript
    res.status(500).json({error: 'An error occurred while querying the database.'});
   ```

For detailed guidance on constructing and executing queries and/or scans with AWS DynamoDB, refer to
the [AWS DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html).
Note that we are using the SDK for JavaScript V3 for AWS DynamoDB.

### Frontend Development: Building the React Interface

For the frontend part of your project, we've supplied initial code, viewable
at `https://localhost:3000/` when you launch the frontend. Your objective is to expand upon this
foundation, focusing on the sections marked as TODO, to enhance the React user interface.

#### Part 1: Adding Search Functionality to App.js

**Goal**: Enable the application to execute search queries based on user inputs and display the
first 10 results.

##### API Call Setup:

- Within the `handleSearch` function, incorporate logic to initiate search requests to your backend.
  Utilize Axios for making a GET request to `http://localhost:8080/query`, with `searchParams`
  included as the query parameters.

##### Response Handling:

- Upon receiving a successful response, the backend will return a list of items. To maintain
  user-friendliness, limit the displayed results to the first 10. Apply `.slice(0, 10)`
  on `response.data` to extract these items. Then, update the application's state responsible for
  storing search results (`setSearchResults`) with these 10 items or fewer.

##### Managing Errors:

- Implement robust error handling to address scenarios where the API request may fail—for instance,
  if the backend service is down or the query parameters are invalid.
- Wrap the API call within a `try...catch` block to intercept any errors. In the `catch` section,
  provide feedback to the user by setting an appropriate error message (`setError`) and ensure any
  previous search results are cleared (`setSearchResults([])`).

#### Part 2: Displaying Search Results in App.js

**Goal**: Implement functionality to visually present search results, utilizing
the `MovieCardComponent` for each item.

##### Understanding the MovieCardComponent:

The `MovieCardComponent` is structured to accept a `movie` prop, showcasing various details such as
the title, year, and genre. Familiarize yourself with this component
in [`MovieCardComponent.jsx`](/src/components/MovieCardComponent.jsx) to understand how it processes
and displays the provided data.

##### Search Results Display:

1. Use [conditional rendering](https://react.dev/learn/conditional-rendering) to check
   if `searchResults` exists and is not empty.
2. If yes, use the `.map()` method to iterate over `searchResults`, rendering a `MovieCardComponent`
   for each item. Assign a unique `key` prop to each `MovieCardComponent` for efficient DOM updates,
   ideally using a distinctive attribute such as `result.originalTitle`.

##### Learning Resources:

For further insights into handling state, data passing, and iterating over lists in React, consult
the [official React documentation](https://react.dev/).

### Extra Credit: Querying Titles with Multiple Keywords (+10 points)

#### Objective

Refine the search functionality to support flexible multi-word queries. Instead of
strict substring matching, modify the system to return all matches that coincide with at least one
word in the title query. Additionally, improve the response by ranking results based on the number
of matched words in the title.

#### Implementation

You will add a route to the Node.js server that handles multi-word queries and modify the frontend
to display the results in the correct order.

The route should be named `/query-title-keywords` and should accept a `keywords` query parameter.
An example of a request to this route would be:
`http://localhost:8080/query-title-keywords?keywords=the%20dark%20knight` (Note that spaces are
encoded as `%20` in URLs).

- **Keyword Splitting**: Begin by splitting the `keywords` query parameter into an array of
  keywords, using space as the delimiter. Remember to first remove any leading or trailing spaces
  before splitting. This enables the handling of each word as an individual
  query criterion.
- **Query Formulation**: For each keyword in the array, construct a separate query to DynamoDB. This
  approach ensures that you capture all potential matches and count the number of keyword matches
  for each item.
- **Promise Aggregation**:
  Utilize [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
  to concurrently execute all queries generated from the individual keywords. This not only
  optimizes performance by running queries in parallel but also simplifies the handling of their
  collective results.
- **Result Ranking**: After retrieving results for each keyword, aggregate them and rank based on
  the frequency of keyword matches in the title. This might involve a custom sorting algorithm that
  prioritizes items matching a higher number of query keywords.

#### Testing

- Ensure that a multi-word query returns results that match at least one of the keywords, and that
  the results are ranked based on the number of keyword matches (i.e. your JSON response should be
  ordered by the number of keyword matches in descending order).
- Ensure that your frontend displays the results in the correct order.

### Feedback

We are switching from Markdown to YAML for feedback. Please use
a [YAML validator](https://jsonformatter.org/yaml-validator) to ensure that your file is valid
before submitting. Note that indentation is meaningful in YAML, and you can make a multi-line string
by using `|` followed by a newline and then indenting the string.

```yaml
my_feedback: |
  This is my feedback.
  It can be multiple lines.
  I can use colons: like this.
```

### Grading

This assignment is out of 100 points.

- 5 points: Submission of at least one accepted public test case 72 hours prior to the deadline
- 90 points: Auto-graded tests
- 5 points: Completion of [`feedback.yaml`](feedback.yaml)
- +10 points: Extra credit for implementing multi-word queries

### Submission

Submit via [Gradescope](https://www.gradescope.com/courses/677230) by uploading from GitHub.
