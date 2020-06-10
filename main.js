//mapping cac tag voi bien
var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreShow = document.getElementById('score');

//khoi tao mot so hinh ve
var birdImg = new Image();
var hinhnen = new Image();
var ongTop = new Image();
var ongButton = new Image();

//Nap cac hinh vao bien
birdImg.src = "images/bird.png";
hinhnen.src = "images/nenchinh.png";
ongTop.src = "images/ongtren.png";
ongButton.src = "images/ongduoi.png";

//Mot so bien khac
var score = 0;
var spaceHaiOng = 140; //khoang cach 1 ong voi ong tiep theo
var spaceMiddle; //khoang cach ong tren vs ong duoi

//load img de lay dc height va width
hinhnen.onload = function() {
	//tao ra 1 Object bird voi toa do bang cavas/2
	bird = {
		x: hinhnen.width/5,
		y: hinhnen.height/2
	}
	var ong=[];
	//ong dau tien ngoai cung ben phai, y=0
	ong[0] = {
		x: canvas.width,
		y: 0
	}
	 function run(){
	 	//load hinh anh vao
	 	context.drawImage(hinhnen, 0 , 0);
	 	context.drawImage(birdImg, bird.x, bird.y);

	 	//tao cac ong va xu ly
	 	for (var i = 0; i < ong.length; i++) {
	 		spaceMiddle = ongTop.height + spaceHaiOng;
	 		//ong tren theo toa do cua no, 
	 		//ong duoi theo ong tren
	 		context.drawImage(ongTop, ong[i].x, ong[i].y);
	 		context.drawImage(ongButton, ong[i].x, ong[i].y + spaceMiddle);

	 		//ong di chuyen len xuong
	 		ong[i].x -= 5;

	 		//ong di den giua thi them 1 ong nua
	 		if(ong[i].x == canvas.width/2){
	 			ong.push({
	 				x: canvas.width,
	 				y: Math.floor(Math.random()*ongTop.height)-ongTop.height
	 			});
	 		}
	 		//ong dung trai thi xoa ong do di
	 		//tranh day mang ong[] se lam cham CT
	 		if(ong[i].x == 0)ong.splice(0,1);

	 		//TINH DIEM	 		
	 		//neu bird toi may cay ong && (bird <= dau ongtren || bird >= dau ong duoi)
	 		if(bird.x == ong[i].x && ((bird.y <= ong[i].y+ongTop.height)||(bird.y+birdImg.height >= ong[i].y+ongTop.height+spaceHaiOng))){
	 			return;
	 		}
	 		//neu chim rot qua khu vuc le tren va le duoi
	 		if(bird.y+birdImg.height >= hinhnen.height || bird.y <= 0){
	 			return;
	 		}
	 		//neu vuot qua
	 		if(ong[i].x == bird.x) score++;

	 	}	

	 	//in score ra mang hinh
	 	scoreShow.innerHTML="score: "+score;

	 	//cho bird roi xuong
	 	bird.y+=3;
	 	requestAnimationFrame(run);
	 }

	 //bat su kien nhan cho bird bay len khi nhan
	 document.addEventListener("keydown", function(){
	 	bird.y -= 60;
	 });
	 //Toa do la goc tren trai, di theo chieu duong
	 run(); 		
}


