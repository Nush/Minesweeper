"use strict";
$(function(){
	var $vertical   = $('#vertical'),
		$horizontal = $('#horizontal'),
		$mine = $('#mine'),
		$start = $('#start');


	var select= '';
	for(var i = 1; i <= 20;i++){
		select+='<option value="'+i+'">'+i+'</option>'
	}
	$vertical.html(select);
	$horizontal.html(select);
	mineSelect(1,1);


	$vertical.on('change',function(){
		mineSelect($horizontal.val(),$vertical.val());
	});
	$horizontal.on('change',function(){
		mineSelect($horizontal.val(),$vertical.val());
	});

	function mineSelect(x,y){
		var mineSelect= '';
		for(var i = 1; i <= x*y;i++){
			mineSelect+='<option value="'+i+'">'+i+'</option>'
		}
		$mine.html(mineSelect);
	}

	$start.on('click',function(){
		console.log('マインスイーパーを始めます。');
		var ms = new MineSweeper($('#mine-table'));
		ms.createStage(Number($horizontal.val()),Number($vertical.val()));
		ms.setMines(Number($mine.val()));
		ms.startGame();

		console.log(ms);
	});

});