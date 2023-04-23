const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:category_id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.category_id).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    name: req.body.name,
  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:category_id', (req, res) => {
  // update a category by its `id` value
  Category.update(
  // Calls the update method on the Category model
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      // Gets the category based on the ID given in the request parameters
      where: {
        category_id: req.params.category_id,
      },  
    }
  )
    .then((updatedCategory) => {
      // Sends the updated category as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:category_id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
