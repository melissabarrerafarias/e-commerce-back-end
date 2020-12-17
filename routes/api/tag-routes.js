const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// /api/tags
router.get('/', (req, res) => { // find all tags, be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'product_name',
          'price',
          'stock'
        ],
        through: ProductTag,
        as: 'product_info'
      }
    ],
  }).then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// /api/tags/:id
router.get('/:id', (req, res) => { // find a single tag by its `id`, be sure to include its associated Product data
Tag.findOne({
  attributes: [
    'id', 
    'tag_name'
  ], 
  where: {
    id: req.params.id
  },
  include: [
    {
      model: Product,
      attributes: [
        'product_name',
        'price',
        'stock'
      ],
      through: ProductTag,
      as: 'product_info'
    }
  ]
}).then(tagData => {
  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this id' });
    return;
  }
  res.json(tagData);
}).catch(err => {
  console.log(err);
  res.status(500).json(err);
});

});

// /api/tags
router.post('/', (req, res) => { // create a new tag

});

// /api/tags/:id
router.put('/:id', (req, res) => { // update a tag's name by its `id` value

});

// /api/tags/:id
router.delete('/:id', (req, res) => { // delete on tag by its `id` value

});

module.exports = router;
