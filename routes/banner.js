const express=require('express');
const BannerModel=require('../models/banner');
const router=express.Router();
router.post('/add',(req,res)=>{
    var banner=new BannerModel({
        name:req.body.bannerName,
        imgUrl:req.body.bannerUrl
    });
    banner.save(function(err){
        if(err){
            res.json({
                code:-1,
                msg:err.message
            })
        }else{
            res.json({
                code:0,
                msg:'ok'
            })
        }
    })
});
module.exports=router;