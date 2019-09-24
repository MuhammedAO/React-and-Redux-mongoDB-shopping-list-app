const express = require('express');

const router = express.Router();

//Item model
const Item = require('../../models/Item');

//@ route GET api/item
//Desc: Get All items
router.get('/', (req,res) =>{
 Item.find()
 .sort({date:-1})
 .then(items => res.json(items));
});

//@ route Post api/item
//Desc: create item
//construct an {} into the DB
router.post('/', (req,res) =>{
  const newItem = new Item({
      name:req.body.name
  });  

  newItem.save()
  .then(item => res.json(item));
});


//@ route Delete api/item/:id
//Desc: Delete Post
//delete an {} from the DB
router.delete('/:id', (req,res) =>{
Item.findById(req.params.id)
.then(item => item.remove()
.then(() => res.json({success:true})))
.catch(err => res.status(404).json({success:false}));
});
   

module.exports = router;