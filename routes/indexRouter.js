const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/banner.html',(req,res)=>{
    res.render('banner');
});
router.get('/banner.html',(req,res)=>{
    res.render('banner');
})
module.exports=router;