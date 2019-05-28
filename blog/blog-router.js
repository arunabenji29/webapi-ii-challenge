const Blog = require('./db.js');

const router = require('express').Router();

//get all the blogs
router.get('/', (req, res) => {
    Blog.find(req.body)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

//get blog by id
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (blog) {

            res.status(200).json(blog);
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "The post information could not be retrieved." });
    };
});

//creating posts
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.title === '' || req.body.contents === '') {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        else {
            const blog = await Blog.insert(req.body)
            console.log(blog)


            res.status(201).json(blog);
        }

    }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });

    }
});

//creating comments for the posts
router.post('/:id/comments', async (req, res) => {

    const newComment = { text: req.body.text, post_id: req.params.id }

    try {
        let blog = null;

        console.log(newComment.text)
        if (newComment.text === '') {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
        else {
            blog = await Blog.insertComment(newComment)

            if (blog) {
                //   console.log('inside if :creating comments for posts: blog ',blog)  
                res.status(201).json(blog);
            }

            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        }
        //   console.log('creating comments for posts: ',blog)


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the comment to the database" });

    }
});

//get blog by id
router.get('/:id/comments', async (req, res) => {
    try {
        const blog = await Blog.findPostComments(req.params.id)

        if (blog) {

            res.status(200).json(blog);
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "The post information could not be retrieved." });
    };
});

//delete posts by id
router.delete('/:id', async (req, res) => {
    try {
        const count = await Blog.remove(req.params.id);
        if (count > 0) {
            res.status(200).json()
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }
    catch {
        res.status(500).json({ error: "The post could not be removed" })
    }
});

//update posts by id
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body)

        if (req.body.title === '' || req.body.contents === '') {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }

        else {
            const blog = await Blog.update(req.params.id, req.body);
            if (blog) {

                res.status(200).json(blog);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        }
        
    }
    catch (error) {
        res.status(500).json({ error: "The post information could not be modified." });
    };

})
module.exports = router;