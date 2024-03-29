const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k7bhf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    // cyclic commit for deployment
    try {
        await client.connect();
        const projectCollection = client.db('my-portfolio').collection('projects');
        app.get('/project', async (req, res) => {
            const query = {}
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query);
            res.send(project);
        })

        // console.log()
    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('My Portfolio');
});

app.listen(port, () => {
    console.log('my portfolio running on port', port)
})