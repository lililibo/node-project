(function () {
    var Banner = function () {
        this.pageNum = 1;
        this.pageSize = 3;
        this.totalPage = 0;
        this.bannerList = [];
        this.dom = {
            table: $('#banner-table tbody'),
            pagination: $('#pagination'),
            nameInput: $('#inputEmail3'),
            urlInput: $('#inputPassword3'),
            addModal: $('#addModal'),
            submitAdd: $('#bannerAdd'),
        }
    }
      // 新增数据的方法
    Banner.prototype.add = function () {
        var that = this;
        $.post('/banner/add', {
            bannerName: this.dom.nameInput.val(),
            bannerUrl: this.dom.urlInput.val()
        }, function (res) {
            if (res.code === 0) {
                layer.msg('添加成功');
                that.search();
            } else {
                layer.msg('网络异常，请稍后重试');
            }
            that.dom.addModal.modal('hide');
            that.dom.nameInput.val('');
            that.dom.urlInput.val('');
        });
    }
    // 查询的方法
    Banner.prototype.search = function () {
        var that = this;
        $.get('/banner/search', {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }, function (result) {
            if (result.code === 0) {
                layer.msg('查询成功');
                that.bannerList = result.data;
                that.totalPage = result.totalPage;
                that.renderTable();
                that.renderPage();
            } else {
                console.log(result.msg);
                layer.msg('网络异常，请稍后重试');
            }
        })
    }
    /**
     * 渲染table
     */
    Banner.prototype.renderTable = function () {
        this.dom.table.html('');
        for (var i = 0; i < this.bannerList.length; i++) {
            var item = this.bannerList[i];
            this.dom.table.append(
                `
                 <tr>
                     <td>${item._id}</td>
                     <td>${item.name}</td>
                     <td>
                        <img class="banner-img" src="${item.imgUrl}">
                     </td>
                     <td>
                        <a class="delete" data-id="${item._id}" href="javascript:;">删除</a>
                        <a class="update" data-id="${item._id}"  href="javascript:;">修改</a>
                    </td>
                 </tr>
                `
            )
        }
    }
    /**
     * 渲染分页
     */
    Banner.prototype.renderPage = function () {
        var prevClassName = this.pageNum === 1 ? 'disabled' : '';
        var nextClassName = this.pageNum === this.totalPage ? 'disabled' : '';
        this.dom.pagination.html('');
        this.dom.pagination.append(
            `
                <li class="${prevClassName}" data-num="${this.pageNum - 1}">
                <a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                </li>
            `
        )
        for (var i = 1; i <= this.totalPage; i++) {
            var className = this.pageNum === i ? 'active' : '';
            this.dom.pagination.append(
                `<li class="${className}" data-num="${i}"><a href="#">${i}</a></li>`
            )
        }
        this.dom.pagination.append(
            `
            <li class="${nextClassName}" data-num="${this.pageNum + 1}">
            <a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
            </li>
            `
        )
    }
    // 将所有 dom 事件的操作放在这里
    Banner.prototype.bindDOM = function () {
        var that = this;
        this.dom.submitAdd.click(function () {
            that.add();
        })
        this.dom.pagination.on('click', 'li', function () {
            var num = parseInt($(this).data('num'));
            if (that.pageNum === num || num < 1 || num > that.totalPage) {
                return;
            }
            that.pageNum = num;
            that.search();
        })
        this.dom.table.on('click', '.delete', function () {
            var id = $(this).data('id');
            layer.confirm('确认删除吗', function () {
                console.log('确认');
            }, function () {
                console.log('取消');
            })
        })
    }
    $(function () {
        var banner = new Banner();
        banner.bindDOM();
        banner.search();
    })
})();



















// $(function(){
//     var pageNum=1;
//     var pageSize=2;
//     search(pageNum,pageSize);
//     $('#bannerAdd').click(function(){
//         $.post('/banner/add',{
//             bannerName:$('#inputEmail3').val(),
//             bannerUrl:$('#inputPassword3').val()
//         },function(res){
//             console.log(res);
//             if(res.code===0){
//                 layer.msg('添加成功');
//             }else{
//                 console.log(res.msg);
//                 layer.msg('网络异常，请稍后重试');
//             }
//             $('#myModal').modal('hide');
//             $('#inputEmail3').val('');
//             $('#inputPassword3').val('');
//         });
//     })
// })
// /******
//  * 查询banner方法
//  * @param{Number}pageNum 当前的页数
//  * @param{Number}pageSize 每页显示的条数
//  */
// function search(pageNum,pageSize){
//     $.get ('/banner/search',{
//         pageNum:pageNum,
//         pageSize:pageSize
//     },function(result){
//         if(result.code===0){
//             layer.msg('查询成功');
//             for(var i=0;i<result.data.length;i++){
//                 var item=result.data[i];
//                 $('#banner-table tbody').append(
//                     `
//                     <tr>
//                         <td>${item._id}</td>
//                         <td>${item.name}</td>
//                         <td>
//                             <img class="banner-img" src="${item.imgUrl}">
//                         </td>
//                         <td>
//                             <a href="javascript:;">删除</a>
//                             <a href="javascript:;">修改</a>
//                         </td>
//                   </tr>
//                     `
//                 )
//             }
//         }else{
//             console.log(result.msg);
//             layer.msg('网络异常，请稍后重试');
//         }
//     })
// }