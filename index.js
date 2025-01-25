import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';

const app = express();
const port = 3000;

const posts = new Map();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

let displaypostobject = null;
let editpostobject = null;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    await fetchLatestPosts();
    res.render("index.ejs", { posts: posts, postsString: JSON.stringify(Array.from(posts))});
});

app.post("/post", (req, res) => {
    editpostobject = req.body;
    res.json({ success: true });
});

app.get("/post", (req, res) => {
    if (editpostobject === null) {
        res.render("post.ejs");
    } else {
        res.render("post.ejs", { key: editpostobject["key"], name: editpostobject["name"], blog: editpostobject["blog"], blogtitle: editpostobject["blogtitle"]});
        editpostobject = null;
    }
});

app.post("/display-post", async (req, res) => {
    if ('edit' in req.body && req.body["edit"] === true) {
        await db.query("UPDATE blogs SET name=$1, blogtitle=$2, blog=$3, date=$4 WHERE key=$5",[req.body["name"], req.body["blogtitle"], req.body["blog"], currentDate(), req.body["key"]]);
        await fetchLatestPosts();
    }
    const data = { key: req.body["key"], name: req.body["name"], blogtitle: req.body["blogtitle"], blog: req.body["blog"], date: posts.get(req.body["key"]).date };
    displaypostobject = data;
    res.json({ success: true });
    
});

app.get("/display-post", (req, res) => {
    if (displaypostobject) {
        const data = { key: displaypostobject["key"], name: displaypostobject["name"], blogtitle: displaypostobject["blogtitle"], blog: displaypostobject["blog"], date: displaypostobject["date"] };
        res.render("displaypost.ejs", data);
    } else {
        res.status(404).send("Post not found.");
    }
    displaypostobject = null;
});

app.post("/delete-post", async (req, res) => {
    await db.query("DELETE FROM blogs WHERE key=$1", [req.body["key"]]);
    await fetchLatestPosts();
    res.json({ success: true });
});

app.post("/submit", async (req, res) => {
    const name = req.body["name"];
    const blogtitle = req.body["blog-title"];
    let blog = req.body["blog"];
    const date = currentDate();

    const key = "post" + Date.now();
    await db.query("INSERT INTO blogs (key, name, blogtitle, blog, date) VALUES ($1,$2,$3,$4,$5)",[key, name, blogtitle, blog, date]);
    await fetchLatestPosts();
    res.render("index.ejs", { posts: posts , postsString: JSON.stringify(Array.from(posts))});
});

app.post("/delete-all", async (req, res) => {
    await db.query("DELETE FROM blogs");
    await fetchLatestPosts();
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});

function currentDate() {
    const dateObj = new Date();
    const month   = dateObj.getUTCMonth(); // months from 1-12
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();

    return monthNames[month] + " " + day + "," + " " + year;
}

async function fetchLatestPosts() {
    try {
        const result = await db.query("SELECT * FROM blogs ORDER BY key DESC");
        posts.clear();
        result.rows.forEach((blog) => {
            const newObject = {
                name: blog.name,
                blogtitle: blog.blogtitle,
                blog: blog.blog,
                date: blog.date
            };
            posts.set(blog.key, newObject);
        });
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}
