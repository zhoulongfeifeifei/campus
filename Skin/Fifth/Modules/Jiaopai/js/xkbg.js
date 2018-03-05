
var ids=getUrlParam('id');
var types=getUrlParam('types');
var typeid=getUrlParam('typeid');
var typeidm=getUrlParam('typeidm');
var tid=getUrlParam('tid');
var str1 = '';
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

			// console.log(json)
			if(getUrlParam('typeid') == 1){
    			if(getUrlParam('schoolid') == 0){
    				$('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
    				                      '<a class="btn btn-green" href="ZaoDu.html?deviceid='+ getUrlParam('deviceid') +'">返回</a>'
    				                      );
    				$('#herder').html('<tr>'+
    		                             '<th>序号</th>'+
    		                             '<th>标题</th>'+
    		                             '<th>内容</th>'+
    		                             '<th>上传时间</th>'+   
    			                       '</tr>'
    					);
    		               $.each(json.resultData, function(i, n) {
    		               	console.log(n)
    		                str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    		                   html += '<tr>'+
    		                                '<td>'+ (i+1) +'</td>'+
    		                                '<td>'+ n.title +'</td>'+
    		                                '<td>'+ n.detail +'</td>'+
    		                                '<td>'+ str1 +'</td>'+ 
    		                            '</tr>'
    		               });
    		               $('#box_form_box').append(html); 
    			}else if(getUrlParam('schoolid') == 1){
    			    $('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
    			                          '<a class="btn btn-green" href="javascript:history.go(-1)">返回</a>'+
    			                          '<a class="btn btn-blue" href="zsxz.html?type='+ getUrlParam('typeid') +'&name='+ getUrlParam('name') +'&typeId='+ json.typeid +'&id='+ tid +'&idm=0&schoolId='+ getUrlParam('schoolid') +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('classname')+'">新增</a>'
    			                          );
    	    		$('#herder').html('<tr>'+
    	                                 '<th>序号</th>'+
    	                                 '<th>标题</th>'+ 
    	                                 '<th>内容</th>'+
    	                                 '<th>上传时间</th>'+
    	                                 '<th>操作</th>'+ 	                                    
    	    	                       '</tr>'
    	    			);
            	     $('#box_form_box').empty();
                           $.each(json.resultData, function(i, n) {
                           	console.log(n)
                            str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                               html += '<tr>'+
                                            '<td>'+ (i+1) +'</td>'+
                                            '<td>'+ n.title +'</td>'+
                                            '<td style="word-break:break-all" width="110">'+ n.detail +'</td>'+
                                            '<td>'+ str1 +'</td>'+
                                           '<td class="edit" style="width:70px;">'+
                                             '<a class="text link" href="zsxz.html?name='+ getUrlParam('name') +'&num='+ n.id +'&type='+ getUrlParam('typeid') +'&typeId='+ json.typeid +'&img=0'+'&id='+ tid +'&idm='+ids+'&schoolId='+ getUrlParam('schoolid') +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('classname')+'">编辑</a>'+
                                             '<a class="text red link del" data-id="556" href=javascript:del("'+n.id+'")>删除</a>'+
                                           '</td>'+                                         
                                        '</tr>'
                           });
                           
                           $('#box_form_box').append(html);

    			}
    		// console.log(json)	
    		var html = '';  
			}else{
					if(getUrlParam('schoolid') == 0){
						$('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
						                      '<a class="btn btn-green" href="ZaoDu.html?deviceid='+ getUrlParam('deviceid') +'">返回</a>'
						                      );
						$('#herder').html('<tr>'+
				                             '<th>序号</th>'+
				                             '<th>标题</th>'+
				                             '<th>图片</th>'+
				                             '<th>内容</th>'+   
					                       '</tr>'
							);
				               $.each(json.resultData, function(i, n) {
				               	console.log(n)
				                str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
				                   html += '<tr>'+
				                                '<td>'+ (i+1) +'</td>'+
				                                '<td>'+ n.title +'</td>'+
				                                '<td>'+ n.img +'</td>'+
				                                '<td>'+ n.detail +'</td>'+ 
				                            '</tr>'
				               });
				               $('#box_form_box').append(html); 
					}else if(getUrlParam('schoolid') == 1){
					    $('.bar-header').html(' <span class="text font-18 blue">'+ decodeURI(getUrlParam('name')) +'</span>'+
					                          '<a class="btn btn-green" href="javascript:history.go(-1)">返回</a>'+
					                          '<a class="btn btn-blue" href="zsxz.html?type='+ getUrlParam('typeid') +'&name='+ getUrlParam('name') +'&typeId='+ json.typeid +'&id=0&idm='+typeidm+'&schoolId='+ getUrlParam('schoolid') +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('classname')+'">新增</a>'
					                          );
			    		$('#herder').html('<tr>'+
			                                 '<th>序号</th>'+
			                                 '<th>标题</th>'+ 
			                                 '<th>图片</th>'+
			                                 '<th>内容</th>'+
			                                 '<th>操作</th>'+ 	                                    
			    	                       '</tr>'
			    			);
		        	     $('#box_form_box').empty();
		                       $.each(json.resultData, function(i, n) {
		                       	console.log(n)
		                        str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
		                           html += '<tr>'+
		                                        '<td>'+ (i+1) +'</td>'+
		                                        '<td>'+ n.title +'</td>'+
		                                        '<td>'+
                                                  '<img src="'+ n.img +'" style="height:100px;width:100px">'+
		                                        '</td>'+
		                                        '<td style="word-break:break-all" width="70">'+ n.detail +'</td>'+
		                                        
		                                       '<td class="edit" style="width:70px;">'+
		                                         '<a class="text link" href="zsxz.html?name='+ getUrlParam('name') +'&num='+ n.id +'&type='+ getUrlParam('typeid') +'&typeId='+ json.typeid +'&img=0'+'&id='+ ids +'&idm='+typeidm+'&schoolId='+ getUrlParam('schoolid') +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('classname')+'">编辑</a>'+
		                                         '<a class="text red link del" data-id="556" href=javascript:del("'+n.id+'")>删除</a>'+
		                                       '</td>'+                                         
		                                    '</tr>'
		                       });
		                       
		                       $('#box_form_box').append(html);

					}
				// console.log(json)	
				var html = '';  
			}
   
		  				     

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
 if(typeid==0)
 {
  $('.muban-wrap').html('<iframe id="eboardFrame" src="xklb.html?id='+ ids +'&idm='+typeidm+'&type='+typeid+'&classname='+getUrlParam('classname')+'"></iframe>')
 }
 else
 {
  $('.muban-wrap').html('<iframe id="eboardFrame" src="xklb.html?id='+ tid +'&idm='+ids+'&type='+typeid+'&classname='+getUrlParam('classname')+'"></iframe>')
 }

