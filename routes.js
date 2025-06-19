const routes = require('express').Router();
const Post = require('./post');
const Service = require('./service');
const Client = require('./client');

routes.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.post('/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

routes.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.post('/services', async (req, res) => {
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        icon: req.body.icon
    });

    try {
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

routes.get('/clients', async (req, res) => {
    try  {
        const clients = await Client.find();
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
}});

routes.post('/clients', async (req, res) => {
    const client = new Client({
        name: req.body.name,
        description: req.body.description,
        icon: req.body.icon
    });

    try {
        const savedClient = await client.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = routes;