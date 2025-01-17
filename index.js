import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

//Allows use of static files in public folder
app.use(express.static("public"));

// Allows use of req.body
app.use(bodyParser.urlencoded({ extended: true }));

//data structure for posts
const posts = [
    { title: "School is hard", content: "Professors and procrastinating can make school hard", category: "Other"},
    { title: "Why School Matters", content: "IT is important to build connections and network", category: "Other"},
    { title: "Computer Science is HARD", content: "Although Comp Sci is hard it is very interesting and fun to learn", category: "Computer Science"}
];

app.get('/', (req, res) => {
    res.render("home.ejs");
});

//Route for the blog page
app.get('/blog', (req, res) => {
    res.render("index.ejs", {posts: posts});
});

//create function to add user data into new data table


app.post('/submit', (req, res) =>{
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    };
    posts.push(newPost);
    res.redirect('/blog')

    // res.render("index.ejs", { title: articleTitle, content: articleContent})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});