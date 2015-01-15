"use strict";
var MineSweeper = function($stage){
	var stage = this;
	this.$stage = $stage;
	this.mines = 0;
	this.stageWidth = 0;
	this.stageHeight = 0;

	this.map = null;
}
MineSweeper.prototype = {
	createStage: function(numX,numY){
		var cell = this;
		this.stageWidth = numX;
		this.stageHeight = numY;

		console.log('ステージを作成します。');
		this.map = [];
		var $table = $('<table>');
		for(var y = 0 ; y < this.stageHeight; y++){
			this.map[y] = [];
			var $tr = $('<tr>');
			for(var x = 0; x < this.stageWidth; x++){
				var $td = $('<td data-x="'+x+'" data-y="'+y+'">')
				//.text(x+':'+y)
				.addClass('cell').addClass('normal')
				.on('click',function(){
					cell.clickCell($(this).data('y'),$(this).data('x'));
				}).on('contextmenu',function(){
					cell.toggleFlag($(this).data('y'),$(this).data('x'));
					return false;
				}).appendTo($tr);
				this.map[y][x] = new MineCell($td);
			}
			$tr.appendTo($table);
		}
		this.$stage.empty().append($table);
	},
	createStageWithMine: function(numX,numY,mines){
		this.createStage();
		this.setMines(mines);
	},
	setMines: function(mines){
		if((this.stageWidth*this.stageHeight) <= this.mines) { console.log('地雷の数が多すぎます'); return;}
		console.log(mines+'個 のマインを設置します。');
		this.mines = mines;

		var settedMines = 0;
		while(1){
			var x = Math.floor( Math.random() * this.stageWidth );
			var y = Math.floor( Math.random() * this.stageHeight );

			if(!this.map[y][x].getMine()){
				console.log(y,x,'に設置しました。');
				this.map[y][x].setMine(true);
				settedMines++;
			} else {
				console.log(y,x,'はすでに設置済みでした・・・。');
			}

			if(settedMines == this.mines){
				break;
			}
		}
	},
	toggleFlag: function(posY,posX){
		if(this.map[posY][posX].isOpened()){
			return;
		}
		this.map[posY][posX].toggleFlag();
	},
	clickCell: function(posY,posX){
		if(this.map[posY][posX].getOnFlag()){
			return;
		}
		if(this.map[posY][posX].getMine()){
			console.log('ゲームオーバーです。');
			this.map[posY][posX].hitMine();
			return;
		}
		this.checkAroundCells(posY,posX);

		if(this.isClear()){
			console.log('クリアです！');
		}
	},
	checkAroundCells: function(posY,posX){
		if(this.map[posY][posX].isOpened()){
			return;
		}

		console.log(posY,posX,'周囲をチェックします。');

		var aroundMines = 0;
		// 左端でない
		if(posX > 0){
			// 右
			aroundMines += this.map[posY][posX-1].getMine()?1:0;
			// 右上
			if(posY > 0){
				aroundMines += this.map[posY-1][posX-1].getMine()?1:0;
			}
			// 右下
			if(posY < this.stageHeight-1){
				aroundMines += this.map[posY+1][posX-1].getMine()?1:0;
			}
		}
		if(posX < this.stageWidth-1){
			// 左
			aroundMines += this.map[posY][posX+1].getMine()?1:0;
			// 左上
			if(posY > 0){
				aroundMines += this.map[posY-1][posX+1].getMine()?1:0;
			}
			// 左下
			if(posY < this.stageHeight-1){
				aroundMines += this.map[posY+1][posX+1].getMine()?1:0;
			}
		}
		if(posY > 0){
			aroundMines += this.map[posY-1][posX].getMine()?1:0;
		}
		if(posY < this.stageHeight-1){
			aroundMines += this.map[posY+1][posX].getMine()?1:0;
		}

		this.map[posY][posX].open(aroundMines);

		if(aroundMines === 0){
			if(posX > 0){
				// 右
				this.checkAroundCells(posY,posX-1);
				// 右上
				if(posY > 0){
					this.checkAroundCells(posY-1,posX-1);
				}
				// 右下
				if(posY < this.stageHeight-1){
					this.checkAroundCells(posY+1,posX-1);
				}
			}
			if(posX < this.stageWidth-1){
				// 左
				this.checkAroundCells(posY,posX+1);
				// 左上
				if(posY > 0){
					this.checkAroundCells(posY-1,posX+1);
				}
				// 左下
				if(posY < this.stageHeight-1){
					this.checkAroundCells(posY+1,posX+1);
				}
			}
			if(posY > 0){
				this.checkAroundCells(posY-1,posX);
			}
			if(posY < this.stageHeight-1){
				this.checkAroundCells(posY+1,posX);
			}
		}
	},
	isClear: function(){
		return $('td.normal,td.flag').size() === this.mines;
	}
};