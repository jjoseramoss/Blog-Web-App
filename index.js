import express from 'express';
import bodyParser from 'body-parser';
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "ONEpiece4LIFE$",
    port: 5432
});
db.connect();




async function getAllPosts(){
    const result = await db.query("SELECT category, title, content FROM posts");
    let posts = [];
    result.rows.forEach((post) => {
        posts.push({category: post.category, title: post.title, content: post.content});
    });
    console.log(posts);
    return posts;
}

// Allows use of req.body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Allows use of static files in public folder
app.use(express.static("public"));

//data structure for posts

app.get('/', (req, res) => {
    res.render("home.ejs");
});

//Route for the blog page
app.get('/blog', async(req, res) => {
    const posts = await getAllPosts();
    res.render("index.ejs", {posts: posts});
});

//create function to add user data into new data table


app.post('/posts', async (req, res) => {
    try {
      const { category, title, content } = req.body;
  
      await db.query(
        'INSERT INTO posts (category, title, content) VALUES ($1, $2, $3)',
        [category, title, content]
      );
  
      res.redirect('/blog'); // Redirect to homepage after insertion
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});