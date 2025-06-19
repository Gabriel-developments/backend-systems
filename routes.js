const routes = require('express').Router();
const Post = require('./post');
const Service = require('./service');
const Client = require('./clients');

// Rotas para Posts


routes.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }
        res.json(post);
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

routes.patch('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.description != null) {
            post.description = req.body.description;
        }
        if (req.body.image != null) {
            post.image = req.body.image;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

routes.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }
        await Post.deleteOne({ _id: req.params.id }); // Use deleteOne ou findByIdAndDelete
        res.json({ message: 'Post deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotas para Services


routes.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.get('/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service não encontrado' });
        }
        res.json(service);
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

routes.patch('/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service não encontrado' });
        }

        if (req.body.name != null) {
            service.name = req.body.name;
        }
        if (req.body.description != null) {
            service.description = req.body.description;
        }
        if (req.body.icon != null) {
            service.icon = req.body.icon;
        }

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

routes.delete('/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service não encontrado' });
        }
        await Service.deleteOne({ _id: req.params.id }); // Use deleteOne ou findByIdAndDelete
        res.json({ message: 'Service deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotas para Clients

routes.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client não encontrado' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
});

routes.patch('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client não encontrado' });
        }

        if (req.body.name != null) {
            client.name = req.body.name;
        }
        if (req.body.description != null) {
            client.description = req.body.description;
        }
        if (req.body.icon != null) {
            client.icon = req.body.icon;
        }

        const updatedClient = await client.save();
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

routes.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client não encontrado' });
        }
        await Client.deleteOne({ _id: req.params.id }); // Use deleteOne ou findByIdAndDelete
        res.json({ message: 'Client deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = routes;