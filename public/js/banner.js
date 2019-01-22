$(function(){
    $('#bannerAdd').click(function(){
        $.post('/banner/add',{
            bannerName:$('#inputEmail3').val(),
            bannerUrl:$('#inputPassword3').val()
        },function(res){
            console.log(res);
            if(res.code===0){

            }else{
                console.log(res.msg)
                alert('网络异常，请稍后重试')
            }
            $('#myModal').modal('hide');
        });
    })
})