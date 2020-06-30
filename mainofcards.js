class Deck {
 constructor(){
	 this.dealt_deck = [];
	 this.edge = [];
	 this.conq = [];
	 this.cancel_deck = [];
         this.dcheck = [];
 }

  rand_deck(){
	   let card = (name, x, y, num, posX, posY, view, check) => {
		 this.name = name;
		 this.num = num;
		 this.x = x;
		 this.y = y;
		 this.posX = posX;
		 this.posY = posY;
		 this.view = 1;
		 this.check = 1;
		 
		 return {name:this.name, x:this.x, y:this.y, number:this.num, posX:this.posX, posY:this.posY, view:this.view, check:this.check};
	 }
	 
	 let cards = ['12','13','14','15','16','17','18','19','110','1J','1Q','1K','1A',
	 '22','23','24','25','26','27','28','29','210','2J','2Q','2K','2A',
	 '32','33','34','35','36','37','38','39','310','3J','3Q','3K','3A','42',
	 '43','44','45','46','47','48','49','410','4J','4Q','4K','4A'];
	 let max = 53;
	 let posX = 1;
	 let posY = 1;
	 let found = "";
	 let nameC = "";
	 let num = "";
	 let y = 10;
	 let x = 10;
	 let rn = 0;
	 let countx = 0;
	 let county = 0;
	 
	 for ( let i = 0; i < 52; i++){
	   rn = Math.floor(Math.random() * (max - 1));
	   max--;
	   found = cards[rn];
	   if ( found.length > 2){
		   num = found[1] + found[2];
	   }else{
		   num = found[1];
	   }
	   nameC = "cards/" + cards[rn] + ".jpg";
	   if ((i != 50)&&(i != 51)){
	   this.dealt_deck[i] = card(nameC,x,y,num,posX,posY,1,1);
			 cards.splice(rn, 1);
	   }else if(i==50){
		   x = 10;
		   y = 450;
		   posX = 1;
		   posY = 6;
		   this.dealt_deck[i] = card(nameC,x,y,num,posX,posY,1,1);
			 cards.splice(rn, 1);
	   }else{
		   x = 150;
		   y = 450;
		   posX = 2;
		   posY = 6;
		   this.dealt_deck[i] = card(nameC,x,y,num,posX,posY,1,1);
			 cards.splice(rn, 1);
	   }
	   if (countx < 9){
		  x = x + 140;
		  posX++;
		  countx++;
		} else {
			x = 10;
			countx = 0;
			posX = 1;
		}
		if (county > 8){
		  y = y + 50;
		  county = 0;
		  posY++;
		}else{ county++;}
	 }
  }
}

 let cq = 0;
 
 init = () => {
    ChooseCard(e);
	cancel();
	drawCards();
}
window.onload = init;

ChoseCard = function init(x,y,k,cq) {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#E52B50";
	x = deck.dealt_deck[k].x;
	y = deck.dealt_deck[k].y;
	if ((cq == 1) && (deck.dealt_deck[k].view != 0)){
	ctx.strokeRect(x, y, 124, 180);
    ctx.drawImage(masIm[k], x, y, wd, hg);
	}else {
		drawCards();
	}
}

let delN = [];
let searchN = [];
let countF = 0;
let countW = 0;
let flag = 0;
let countdeck = 0;

document.addEventListener('click', ChooseCard, true);
function ChooseCard(e){
      cursorX = e.pageX;
	  console.log(cursorX);
      cursorY= e.pageY;
	  console.log(cursorY);
	  let nm = 40;
	  for (let i=0;i<10;i++){
		  for (let j=4;j>=0;j--){
			    if (deck.dealt_deck[nm].view == 1) { 
			    	deck.edge[i] = deck.dealt_deck[nm];
					searchN[i] = nm;
					j=-1; 
				}
				nm -= 10;
			  }
			  nm = 41 + i;
		  }
		  
	  deck.edge[10] = deck.dealt_deck[50];
	  deck.edge[11] = deck.dealt_deck[51];
	  
       for (let l=0;l<12;l++){
		   if((deck.edge[l].x <= cursorX) && ((deck.edge[l].x + 124) >= cursorX) && (deck.edge[l].y <= cursorY) && ((deck.edge[l].y + 180) >= cursorY) && (deck.edge[l].view != 0)){
				   flag = 1;
				   deck.conq[cq] = deck.edge[l];
				   if ((l != 10) && (l != 11)){
				   delN[cq] = searchN[l];}else if(l == 10){
					   delN[cq] = 50;
				   }else{ delN[cq] = 51}
				   console.log(" choosen " + deck.conq[cq].number);
				   cq++;
			   }
	   }

	   if ( flag == 1)
	   ChoseCard(deck.conq[0].x,deck.conq[0].y,delN[0],cq);
	   
	   if (cq == 2){
		 if ((deck.conq[0].number === deck.conq[1].number) && (deck.conq[0].name != deck.conq[1].name)) {
			 console.log(deck.conq[0].number + "=" + deck.conq[1].number);
			 deck.cancel_deck[countdeck] = deck.dealt_deck[delN[0]];
			 countdeck++;
			 deck.cancel_deck[countdeck] = deck.dealt_deck[delN[1]];
			 countdeck++;
			 deck.dealt_deck[delN[0]].view = 0;
			 deck.dealt_deck[delN[1]].view = 0;
			 drawCards();
		 }
		 cq = 0; 
	   }	
	   
	   countF = 0;
	   countW = 0;
	   nm = 40;
        for (let i=0;i<10;i++){
		  for (let j=4;j>=0;j--){
			    if (deck.dealt_deck[nm].view == 1) { 
			    	deck.edge[i] = deck.dealt_deck[nm];
					searchN[i] = nm;
			    	console.log(deck.edge[i]);
					j=-1; 
				}
				nm -= 10;
			  }
			  nm = 41 + i;
		  }	   

	   for (let t=0;t<11;t++){
		   for (let s=t+1;s<12;s++){
			   if ((deck.edge[t].view == 1) && (deck.edge[s].view == 1) && (deck.edge[t].number == deck.edge[s].number)){
				   countF += 1;
				   console.log(deck.edge[t].number + "=" + deck.edge[s].number);
			   }
		   }
	   }
	   
	   for (let g = 0;g<12;g++){
		   if (deck.edge[g].view == 1) countW++;
	   }
	   
	   if (countF == 0){
		   if (countW != 0){
		    alert("YOU LOOSE"); }else {finish = 1;
		    alert("YOU WON, MALADCA");
		   }
		   deck.rand_deck();
		   for (let j=0;j<52;j++){
             image = new Image();
             image.src = deck.dealt_deck[j].name;
         	 masIm[j] = image;
           }
		   drawCards();
          }
	   
}

let countLW = 0;
let nexts = 0;
let show = 1;
let countEnd = 0;
let num1 = 0;
let countS = 0;
let fcheck = 0;
let countR = 0;
let h = 0;
let rt = 0;
let finish = 1;

function check(){
	if (fcheck == 0){
	check_game();
	fcheck = 1;
	}
	   console.log(num1);
	   console.log(countLW);
	   console.log(countEnd);
	if(show == 0){
		    alert("YOU CAN WIN, DON'T MAKE A MISTAKE THERE!");
	   }else{alert("IT WILL BE UNREAL TO WIN");}
}

function check_game(){
	let nm = 40;
	nexts = 0;
	  for (let i=0;i<10;i++){
		  for (let j=4;j>=0;j--){
			    if (deck.dealt_deck[nm].check == 1) { 
			    	deck.edge[i] = deck.dealt_deck[nm];
					searchN[i] = nm;
					j=-1; 
				}
				nm -= 10;
			  }
			  nm = 41 + i;
		  }
		  
	  deck.edge[10] = deck.dealt_deck[50];
	  deck.edge[11] = deck.dealt_deck[51];
	  
	  for (let t=0;t<11;t++){
		   for (let s=t+1;s<12;s++){
			   if ((deck.edge[t].check == 1) && (deck.edge[s].check == 1) && (deck.edge[t].number == deck.edge[s].number) && (deck.edge[t] != deck.edge[s])){
                                   rt = deck.edge[t].posY * 10 - (10 - deck.edge[t].posX) - 1;
                                   
                                   deck.dcheck[h] = deck.dealt_deck[rt];
                                   h++;
                                   rt = deck.edge[s].posY * 10 - (10 - deck.edge[s].posX) - 1;
                                 
                                   deck.dcheck[h] = deck.dealt_deck[rt];
                                   h++;
				   deck.edge[t].check = 0;
				   deck.edge[s].check = 0;
				   countLW += 1;
				   nexts = 1;
				   check_game();
				   if(countLW > num1) num1 = countLW;
				   countLW = 1;
				   countEnd++;
				   deck.edge[t].check = 1;
				   deck.edge[s].check = 1;
			   }
		   }
	   }
           h-=2;
	   for(let g=0;g<52;g++){
		   if(deck.dealt_deck[g].check == 1) countR++;
	   }
	   if(countR == 0 && finish == 1){ show = 0; finish = 0;
             for(let spr=0;spr<52;spr++){
               console.log(deck.dcheck[spr]);
             }
           }
	   countR = 0;
	   if (countLW == 26) num1 = countLW;
}

function cancel(){
	if(countdeck>=2){
	for(let i=0;i<2;i++){
		for(let j=51;j>=0;j--){
			if(deck.dealt_deck[j]==deck.cancel_deck[countdeck-1]){
				countdeck--;
				deck.dealt_deck[j].view = 1;
				console.log(deck.dealt_deck[j]);
				x = deck.dealt_deck[j].x;
				y = deck.dealt_deck[j].y;
			    ctx.drawImage(masIm[deck.dealt_deck[j].posY*10 - (10 - deck.dealt_deck[j].posX) - 1], x, y, wd, hg);
				break;
			}
		}
	}
  }
}

function drawCards(){
ctx.drawImage(masIm[52],0,0,1450,700);
	for (let j=0;j<52;j++){
    if (deck.dealt_deck[j].view == 1){
	 x = deck.dealt_deck[j].x;
	 y = deck.dealt_deck[j].y;
     ctx.drawImage(masIm[j], x, y, wd, hg);
	}
  }
}