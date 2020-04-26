const express = require('express');
const subscriberRouter =express.Router();

const Subscriber =require('../models/subscribers')
//gettingALL
subscriberRouter.get('/',async (req,res,next)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})
//gettingOne
subscriberRouter.get('/:id',getSubscribers,(req,res)=>{
    res.send(res.subscriber)
    })
//CreatingOne
subscriberRouter.post('/', async (req, res) => {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscriberToChannel: req.body.subscriberToChannel
    })
    try {
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
    //update
subscriberRouter.patch('/:id',getSubscribers,async(req,res)=>{
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
      }
      if (req.body.subscribedToChannel != null) {
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
      }
      try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    })
//deleteOne
subscriberRouter.delete('/:id',getSubscribers,async(req,res)=>{
    try{
       await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
    })

    async function getSubscribers(req,res,next){
        let subscriber;
        try{
         subscriber= await Subscriber.findById(req.params.id);
            if(subscriber===null){
               return res.status(404).json({
                   message:"cant find any sub"
               })

            }

        }catch(err){
            return res.status(500).json({ message: err.message })
        }
        res.subscriber=subscriber;
      next();
    }
module.exports=subscriberRouter;