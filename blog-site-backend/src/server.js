import express from 'express';

// Initializing the Express app
const app = express();

// Sample articles data with initial upvotes and an empty comments array for each article
let articlesInfo = [
    { name: "learn-react", upvotes: 0, comments: [] },
    { name: "learn-node", upvotes: 0, comments: [] },
    { name: "mongodb", upvotes: 0, comments: [] },
];

// Middleware to parse incoming JSON requests
app.use(express.json());

// POST route to greet and log the request body
app.post('/hello', (req, res) => {
    console.log(req.body); // Logs the request body to the console
    res.send(`Hello! ${req.body.name}`); // Responds with a personalized greeting
});

// GET route to greet by name using URL parameters
app.get('/hello/:name', (req, res) => {
    console.log(req.params); // Logs the URL parameters

    const { name } = req.params; // Destructures the name from params
    res.send(`Hello! ${name}`); // Responds with a personalized greeting
});

// PUT route to upvote an article by name
app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params; // Destructures the name from params

    // Finds the article object in the articlesInfo array by name
    const article = articlesInfo.find(a => a.name === name);

    if (!article) {
        // If the article is not found, respond with an error message
        res.send('The article doesn\'t exist.');
    } else {
        // Increment the upvotes for the found article
        article.upvotes += 1;
        // Respond with the updated upvotes count
        res.send(`The article has ${article.upvotes} upvotes.`);
    }
});

// POST route to add a comment to an article by name
app.post('/api/articles/:name/comment', (req, res) => {
    const { name } = req.params; // Destructures the article name from params
    const { postedBy, text } = req.body; // Destructures postedBy and text from the request body

    // Finds the article object in the articlesInfo array by name
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        // If the article is found, add the comment to its comments array
        article.comments.push({ postedBy, text });
        // Respond with the updated comments array
        res.send(article.comments);
    } else {
        // If the article is not found, respond with an error message
        res.send(`The article titled ${name} doesn't exist.`);
    }
});

// Starts the server on port 8000 and logs a message to confirm
app.listen(8000, () => {
    console.log('Server is listening on port 8000.');
});
