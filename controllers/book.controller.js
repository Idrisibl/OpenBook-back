const Book = require("../models/Book.modele");
const Review = require("../models/Review.model");

module.exports.bookController = {
  createBook: async (req, res) => {
    const {
      name,
      genres,
      author,
      description,
      price,
      publicationYear,
      amountPages,
      size,
      coverType,
      left,
      discount,
      rating,
      image,
    } = req.body;

    try {
      const book = await Book.create({
        name,
        genres,
        author,
        description,
        price,
        publicationYear,
        amountPages,
        size,
        coverType,
        left,
        discount,
        rating,
        image,
      });
      return res.json(book);
    } catch (e) {
      return res.json("ошибка");
    }
  },

  getAllBook: async (req, res) => {
    try {
      const book = await Book.find({}).populate("genres author rating");
      res.json(book);
    } catch (error) {
      res.json({ error: "Ошибка при вызове" });
    }
  },
  getDiscountBook: async (req, res) => {
    try {
      const book = await Book.find({ discount: { $gt: 0 } }).populate(
        "genres author rating"
      );
      res.json(book);
    } catch (error) {
      res.json({ error: "Ошибка при вызове" });
    }
  },

  getNewBook: async (req, res) => {
    try {
      const book = await Book.find({ publicationYear: { $eq: 2022 } }).populate(
        "genres author rating"
      );
      res.json(book);
    } catch (error) {
      res.json({ error: "Ошибка при вызове" });
    }
  },

  getOneBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate(
        "genres author rating"
      );
      res.json(book);
    } catch (error) {
      res.json({ error: "Ошибка при вызове" });
    }
  },
  getBooksOnGenre: async (req, res) => {
    try {
      const book = await Book.find({
        genres: req.params.id,
      }).populate("genres author rating");
      res.json(book);
    } catch (error) {
      res.json({ error: "ошибка при просмотре книг определенного жанра" });
    }
  },
  getBooksOnAuthor: async (req, res) => {
    try {
      const book = await Book.find({
        author: req.params.id,
      }).populate("author genres rating");
      res.json(book);
    } catch (error) {
      res.json({ error: "ошибка при просмотре книг определенного автора" });
    }
  },

  addReview: async (req, res) => {
    try {
      const retAddReview = await Book.findByIdAndUpdate(req.params.id, {
        $push: {
          rating: req.body.rating,
        },
      });
      return res.json(retAddReview);
    } catch (error) {
      res.json({ error: "ошибка добавления отзыва" });
    }
  },

  increment: async (req, res) => {
    try {
      const result = await Book.findByIdAndUpdate(
        req.params.id,
        {
          amount: req.body.amount,
          //left: req.body.left,
        },
        { new: true }
      );
      return res.json(result);
    } catch (error) {
      res.json({ error: "Ошибка при увеличении" });
    }
  },
  decrement: async (req, res) => {
    try {
      const result = await Book.findByIdAndUpdate(
        req.params.id,
        {
          amount: req.body.amount,
          //left: req.body.left,
        },
        { new: true }
      );
      return res.json(result);
    } catch (error) {
      res.json({ error: "Ошибка при уменьшении" });
    }
  },
  
};
