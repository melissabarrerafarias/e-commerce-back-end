const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// /api/categories
router.get('/', (req, res) => {  // find all categories, be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name'
        ]
      }
    ]
  }).then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// /api/categories/:id
router.get('/:id', (req, res) => { // find one category by its `id` value, be sure to include its associated Products
  Category.findOne({
    attributes: [
      'id',
      'category_name'
    ],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name'
        ]
      }
    ]
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// /api/categories (POST)
router.post('/', (req, res) => {  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.json(400).json(err);
    })
});

// /api/categories/:id (PUT)
router.put('/:id', (req, res) => {  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// /api/category/:id (DELETE)
router.delete('/:id', (req, res) => { // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
