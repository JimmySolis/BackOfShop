const router = require('express').Router();
const { includes } = require('lodash');
const { Category, Product } = require('../../models');


router.get('/', async (req, res) =>{
   res.json(await Category.findAll({ include: [{model : Product}]}))
});


router.get('/:id', async (req, res) => { 
  try {
     res.json(await Category.findByPk(req.params.id, { include:[{ model: Product }] }))
  } catch (error) {
    res.status(500).json({ message : `We can't find Category ${req.params.id}`})
  }
 
});

router.post('/', async (req, res) => {
  try {
    res.json(await Category.create({
      category_name : req.body.category_name
    }))
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  try {
    res.json(await Category.update({
      category_id : req.params.id,
      category_name : req.body.category_name
    },
    {
      where: {
        category_id : req.params.id
      }
    }
    ))
  } catch (error) {
    res.status(500).json({ message: `Could not updat Category ${req.body.category_id}`})
  }
});

router.delete('/:id', async (req, res) => {
try {
  res.json(await Category.destroy({ where: {
    category_id : req.params.id
  }
}))
} catch (error) {
  res.status(500).json({message : `Could note delete Category ${req.params.id}`})
}
});

module.exports = router;
