const express = require('express');
const {DynamoDBClient, ScanCommand} = require("@aws-sdk/client-dynamodb");
const cors = require('cors');

const app = express();
const port = 8080;

// Enable CORS
app.use(cors());


const dynamoDBClient = new DynamoDBClient({
  region: "us-east-1",
});

const tableName = 'movies';

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

app.get('/query', async (req, res) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return res.status(400).json({ error: 'Field and value query parameters are required.' });
  }

  try {
    let params;

    switch (field) {
      case 'title':
        params = {
          TableName: tableName,
          FilterExpression: 'contains(primaryTitle, :titleValue)',
          ExpressionAttributeValues: {
            ':titleValue': {
              "S": value
            }
          }
        };
        break;
      case 'years':
        const [startYear, endYear] = value.split(',');
        // TODO make sure that startYear and endYear are parsable to ints/number?
        let filterExpressionYear;
        if (endYear) {
          filterExpressionYear = 'startYear >= :startYear AND endYear <= :endYear';
        } else {
          filterExpressionYear = 'startYear = :startYear';
        }
        params = {
          TableName: tableName,
          FilterExpression: filterExpressionYear,
          ExpressionAttributeValues: {
            ':startYear': {
              "N": String(parseInt(startYear))
            },
            ...(endYear && { ':endYear': { "N": String(parseInt(endYear)) } })
          }
        };
        break;
      case 'genres':
        const genres = value.split(',');
        const conditions = genres.map((genre, index) => `contains(genres, :genre${index})`).join(' AND ');
      
        const expressionAttributeValues = {};
        genres.forEach((genre, index) => {
          expressionAttributeValues[`:genre${index}`] = { "S": genre };
        });
      
        params = {
          TableName: tableName,
          FilterExpression: conditions,
          ExpressionAttributeValues: expressionAttributeValues
        };
        break;
      default:
        return res.status(400).json({ error: 'Invalid param' });
    }

    const command = new ScanCommand(params);

    const results = await dynamoDBClient.send(command);
    
    if (results.Items && results.Items.length > 0) {
      return res.status(200).json(results.Items);
    } else {
      return res.status(404).json({ error: 'No matching items found.' });
    }
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'An error occurred while querying the database.' });
  }
});


// TODO: Route Handler for EC: Querying Titles with Multiple Keywords
app.get('/query-title-keywords', async (req, res) => {
  res.send('Unimplemented');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
