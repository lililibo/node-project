const express=require('express');
const async=require('async');
const BannerModel=require('../models/bannerModel');
const router=express.Router();
// 添加banenr  - http://localhost:3000/banner/add
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
// 搜索or查询banner - http://localhost:3000/banner/search
router.get('/search',(req,res)=>{
    let pageNum=parseInt(req.query.pageNum) || 1;
    let pageSize=parseInt(req.query.pageSize) || 2;
    async.parallel([
        function(cb){
            BannerModel.find().count().then(num=>{cb(null,num);}).catch(err=>{
                cb(err);
            })
        },
        function(cb){
            BannerModel.find().skip(pageNum*pageSize-pageSize).limit(pageSize).then(data=>{
                cb(null,data);
            }).catch(err=>{
                cb(err);
            })
        }
    ],function(err,result){
        console.log(result);
        if(err){
            res.json({
                code:-1,
                msg:err.message
            })
        }else{
            res.json({
                code:0,
                msg:'ok',
                data:result[1],
                totalPage:Math.ceil(result[0]/pageSize)
            })
        }
    })
});
// 删除 - http://localhost:3000/banner/delete
router.post('/delete',(req,res)=>{
    let id=req.body.id;
    // 操作 BannerModel 删除方法第一种
  // BannerModel.deleteOne({
  //   _id: id
  // }).then((data) => {
  //   console.log(data);
  //   if (data.deletedCount > 0) {
  //     res.json({
  //       code: 0, 
  //       msg: 'ok'
  //     })
  //   } else {
  //     return Promise.reject(new Error('未找到相关数据'));
  //     // res.json({
  //     //   code: -1,
  //     //   msg: '未找到相关数据'
  //     // })
  //   }
  // }).catch(error => {
  //   res.json({
  //     code: -1, 
  //     msg: error.message
  //   })
  // })
  BannerModel.findOneAndDelete({
      _id:id
  }).then(data=>{
      if(data){
          res.json({
              code:0,
              msg:'ok'
          })
      }else{
          res.json({
              code:-1,
              msg:'未找到相关记录'
          })
      }
      console.log(data);
  }).catch(error=>{
      res.json({
          code:-1,
          msg:error.message
      })
  })
})
module.exports=router;