const express = require("express");
const app = express();

const { createUser, fetchUserByEmail } = require("./seed");
const { createItem, fetchItems } = require("./seed");
const { createReview, fetchUserReviews, editReview, deleteReview } = require("./seed");

app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message || err });
});

app.post('/signup', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await createUser({ email, username, password });
        res.json(user);
    } catch (error) {
        next(error);
    }
});

app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/logout', (req, res) => {
    res.json({ message: "Logout successful" });
});

app.post('/items', async (req, res, next) => {
    try {
        const { name, rating } = req.body;
        const item = await createItem({ name, rating });
        res.json(item);
    } catch (error) {
        next(error);
    }
});

app.get('/items', async (req, res, next) => {
    try {
        const items = await fetchItems();
        res.json(items);
    } catch (error) {
        next(error);
    }
});

app.post('/reviews', async (req, res, next) => {
    try {
        const { userId, itemId, comment, rating } = req.body;
        const review = await createReview({ userId, itemId, comment, rating });
        res.json(review);
    } catch (error) {
        next(error);
    }
});

app.get('/reviews/user/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userReviews = await fetchUserReviews(userId);
        res.json(userReviews);
    } catch (error) {
        next(error);
    }
});

app.put('/reviews/:reviewId', async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const { comment, rating } = req.body;
        const updatedReview = await editReview(reviewId, { comment, rating });
        res.json(updatedReview);
    } catch (error) {
        next(error);
    }
});

app.delete('/reviews/:reviewId', async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        await deleteReview(reviewId);
        res.json({ message: "Review deleted successfully." });
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

