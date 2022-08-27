const router = require('express').Router();
const { response } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => { res.json( await Tag.findAll({
  attributes: ['tag_id', 'tag_name'],
  include:[{ model: Product}]}))
});

router.get('/:id', async (req, res) => {
  try {
    res.json( await Tag.findByPk(req.params.id,{
    attributes: ['tag_id', 'tag_name'],
    include:[{ model: Product}]}))
  } catch (error) {
    res.status(500).json({message: `We can't find Tag ${req.params.id}`})
  }
});

router.post('/', async (req, res) => {
  try {
    res.json(await Tag.create({
      tag_name : req.body.tag_name
    }))
  } catch (error) {
    res.status(500).json({message: `We couldn't make your tag!`})
  }
});

router.put('/:id', async(req, res) => {
  try {
    res.json( await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where:{
        tag_id: req.params.id
      }
    }))
  } catch (error) {
    res.status(500).json({message:`We could not update your Tage!`})
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    res.json(Tag.destroy({
      where: {
        tag_id: req.params.id
      }
    }))
  } catch (error) {
    res.status(500).json({message:`We could not update your Tage!`})
  }
});

module.exports = router;
