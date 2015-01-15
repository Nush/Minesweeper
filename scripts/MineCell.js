"use strict";
var MineCell = function($cellElement){
	var cell = this;
	this.$cellElement = $cellElement;
	this.onFlag = false;
	this.existMine = false;
}
MineCell.prototype = {
	getMine: function(){
		return this.existMine;
	},
	setMine: function(existMine){
		this.existMine = existMine;
	},
	setCellElement: function($cellElement){
		this.$cellElement = $cellElement;
	},
	toggleFlag: function(){
		this.onFlag = !this.onFlag;

		if(this.onFlag){
			this.$cellElement.addClass('flag');
		} else {
			this.$cellElement.removeClass('flag');
		}
	},
	getOnFlag: function(){
		return this.onFlag;
	},
	open: function(aroundMines){
		var mines = (aroundMines > 0)?aroundMines:'';
		this.$cellElement.removeClass('normal').removeClass('flag').addClass('opened').text(mines);
	},
	isOpened: function(){
		return this.$cellElement.hasClass('opened');
	},
	hitMine: function(){
		this.$cellElement.removeClass('normal').addClass('mine');
	}
};