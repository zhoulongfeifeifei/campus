var laypage =layui.laypage;
var ids=getUrlParam('id');
// console.log(getUrlParam('typeid'))
aa();
function aa(current){ 
	var model = {}
    model.typeid = ids;
    model.pageIndex = current
var GetList_KnowledgeByTypeid = {
		        url: "XAWebBanpai/GetList_KnowledgeByTypeid",
		        type: "POST",
		        data:model
		};
		commonFn(GetList_KnowledgeByTypeid, function(json) {

			// console.log(getUrlParam('schoolid'))
			if(getUrlParam('schoolid') == 0){
				$('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
				                      '<a class="btn btn-green" onclick="javascript:history.go(-1)">返回</a>'
				                      );
				$('#herder').html('<tr>'+
		                             '<th>序号</th>'+
		                             '<th>标题</th>'+
		                             '<th>图片</th>'+
		                             '<th>内容</th>'+
		                             '<th>作者</th>'+
		                             '<th>上传时间</th>'+    
			                       '</tr>'
					);
			     $('#box_form_box').empty();
		               $.each(json.resultData, function(i, n) {
		               	// console.log(n)
		                str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
		                   html += '<tr>'+
		                                '<td>'+ (i+1) +'</td>'+
		                                '<td>'+ n.title +'</td>'+
		                                '<td>'+
		                                 ' <img src="'+ n.img +'" style="height:100px;">'+
		                                '</td>'+
		                                '<td>'+ n.detail +'</td>'+
		                               '<td>'+ n.signName +'</td>'+
		                               '<td>'+ str1 +'</td>'+  
		                            '</tr>'
		               });
		               $('#box_form_box').append(html); 
			}else if(getUrlParam('schoolid') == 1){
			    $('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
			                          '<a class="btn btn-green" href="resource.html">返回</a>'+
			                          '<a class="btn btn-blue" href="zyxz.html?type='+ getUrlParam('typeid') +'&name='+ getUrlParam('name') +'&typeId='+ json.typeid +'&id='+ ids +'&schoolId='+ getUrlParam('schoolid') +'">新增</a>'
			                          );
	    		$('#herder').html('<tr>'+
	                                 '<th>序号</th>'+
	                                 '<th>标题</th>'+
	                                 '<th>图片</th>'+
	                                 '<th>内容</th>'+
	                                 '<th>作者</th>'+
	                                 '<th>上传时间</th>'+
	                                 '<th>操作</th>'+   
	    	                       '</tr>'
	    			);
        	     $('#box_form_box').empty();
                       $.each(json.resultData, function(i, n) {
                       	// console.log(n)
                        str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                           html += '<tr>'+
                                        '<td>'+ (i+1) +'</td>'+
                                        '<td>'+ n.title +'</td>'+
                                        '<td>'+
                                         '<img src="'+ n.img +'" style="height:100px;">'+
                                        '</td>'+
                                        '<td>'+ n.detail +'</td>'+
                                       '<td>'+ n.signName +'</td>'+
                                       '<td>'+ str1 +'</td>'+ 
                                       '<td class="edit">'+
                                         '<a class="text link" href="zyxz.html?name='+ getUrlParam('name') +'&num='+ n.id +'&type='+ getUrlParam('typeid') +'&typeId='+ json.typeid +'&img=0'+'&id='+ ids +'&schoolId='+ getUrlParam('schoolid') +'">编辑</a>'+
                                         '<a class="text red link del" data-id="556" href=javascript:del("'+n.id+'")>删除</a>'+
                                       '</td>'+  
                                    '</tr>'
                       });
                       
                       $('#box_form_box').append(html);

			}
		// console.log(json)	
		var str1 = '';	
		var html = '';     
		    laypage({
                     cont: 'page',
                     pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
	                 curr : json.pageIndex,
	                 groups: 5,
                    jump: function(e, first){ //触发分页后的回调                
	                     
	                     if(!first){ //一定要加此判断，否则初始时会无限刷 
	                          aa(e.curr);
	                          // console.log(e.curr);
	                      }
                      },
                      skin: 'molv', //皮肤
                      first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                      last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                      prev: false, //若不显示，设置false即可
                      next: false //若不显示，设置false即可
                  });
				     

		});
}



//删除

function del(id){
    if(confirm('确定删除？')) {
      var Delete_Knowledge = {
                      url:"XAWebBanpai/Delete_Knowledge",
                      type:"GET",
                      data:{
                        id:id
                      }
                };
                commonFn(Delete_Knowledge, function(json) {
                	console.log(json)
                  if(json==true){
                      aa(); 
                  }
                });
    }
  
}
 
