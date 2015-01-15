"use strict";
$(function(){
	console.log('マインスイーパーを始めます。');
	var ms = new MineSweeper($('#stage'));
	ms.createStage(10,10);
	ms.setMines(10);
	console.log(ms);
});