import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
//Allows use of static files in public folder
app.use(express.static("public"));

//data structure for posts
const posts = [
    { title: "School is hard", content: "Professors and procrastinating can make school hard" },
    { title: "Second Post", content: "This is the content of the second post" }
];

// Allows use of req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render("index.ejs", {posts: posts});
});

//create function to add user data into new data table


app.post('/submit', (req, res) =>{
    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/')

    res.render("index.ejs", { title: articleTitle, content: articleContent})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});