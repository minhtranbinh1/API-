const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth');
router.use(express.json())
router.use(express.urlencoded());
// Get post API routes
router.get('/',verifyToken,async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user',['username'])
        res.json({success:true,posts});
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:"Interval server error"})
    }
})

// create post
router.post('/create',verifyToken,async (req, res) => {
    const {title,description,url,status} = req.body;
    if(!title)
    return res.status(400).json({success:false,message:"Title is require!!"});
    try {
        const newPost = new Post({
            title: title,
            description: description,
            url: (url.startsWith('https://')) ? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
        await newPost.save()
        return res.json({success:true,message:"Happy learning",post:newPost})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:"Interval server error"})
    }
})
// PUT request
router.put('/update/:id',verifyToken, async (req, res)=>{
    const {title,description,url,status} = req.body;
    if(!title)
    return res.status(400).json({success:false,message:"Title is require!!"});
    try {
        let upDatePost = {
            title: title,
            description: description || '',
            url: ((url.startsWith('https://')) ? url: `https://${url}`) || '',
            status: status || 'TO LEARN',
        }
        const upDatePostCondition = {_id: req.params.id ,user: req.userId}
        upDatePost = await Post.findOneAndUpdate(upDatePostCondition,upDatePost,{new: true});
        if(!upDatePost) return res.status(401).json({success: false,message:"Post not Authorization"})
        return res.json({success: true,message:"Success",post:upDatePost});

    } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:"Interval server error"})
    }
})
//delete
router.delete('/delete/:id',verifyToken,async (req, res)=>{
    try {
        const postDeleteCondition = {_id:req.params.id,user: req.userId}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition,{new: true});

        //User not authorization
        if(!deletedPost) return res.status(401).json({success: false,message:"Post not Authorization"})
        return res.json({success: true,post:deletedPost});

    } catch (error) {
        
    }
})
module.exports = router