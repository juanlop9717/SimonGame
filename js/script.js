
$(document).ready(function(){
	// Pertinent Varibles

	var simonValue = [];
	var randomCall;
	var colorActual;
	var colorIndex;
	var actualId;
	var counter = 0;
	var colorsOld = ["#094a8f","#FC0102","#00a74a","#cca707"];
	var colorsNew = ["#1c8cff", " #ff4c4c", " #13ff7c", " #fed93f" ];
	var i = 0;
	var counter2 = 0;
	var checkCount;
	var strictMode = true;

	//Activate/Desactivate strict mode 



	$("#strick").on('click', function(){
		strictMode = !strictMode;
		console.log(strictMode);
	})

	//Function that reset everythings

	function resetAll(){
		$("#count").html("0")
		counter2 = 0;
		counter = 0 ; 
		i = 0;
		simonValue = [];
	}


	// Function that changes for 1s the color to memorize
	function changeColor(){	
		if(i < simonValue.length){
			
			setTimeout(function(){
					// Variable to save temporary the color for the callback
					let tempElement = simonValue[i] + 1;
					// Change to blind color
					$('#btn'+ tempElement).css({backgroundColor: colorsNew[simonValue[i]]});
					// Back to the original color after the time delay
					setTimeout(function(){
					backColor();
				}, 800);
			},800);
	    }
	   
	}

	// Back to the original color
	function backColor(){
			let tempElement = simonValue[i] + 1;
			$('#btn' + tempElement).css({backgroundColor : colorsOld[simonValue[i]]});
			i++;
			changeColor();
	};

	// Generate the random position next to Blind

    function randomBlind(){
    	i = 0;
    	counter2 = 0; 
    	counter++;
		// Make a random call 
	    randomCall = Math.floor(Math.random()*4);
	    actualId =  1 + randomCall;
	    // Add the simon blind to an array
	    simonValue.push(randomCall);
	    console.log(simonValue);
	    // Change the color of the actual Button
	    changeColor();

	}
	// Function that check if the user Value is valid 
	function colorActual(index){
		counter2++;

		// If the click user is equal to the actual value
		if(index == simonValue[counter2-1]){
			checkCount = true;
		}
		if(index != simonValue[counter2-1]){

			// Decide wether is using strict mode
			if(strictMode){
				
				simonValue.pop();
				counter -= 1;
				randomBlind();
			}
			else{
				checkCount = false;
				$("#lose").modal('show');
				resetAll();
			}
			
		}
		if(checkCount && counter2 == counter){
			$("#count").html(counter);
			setTimeout(randomBlind, 300);
		}
	}




	// Click events
	$("#start").click(function(){
		
		randomBlind();
	});

	$("#btn1").click(function(){
		colorActual(0);
	});

	$("#btn2").click(function(){
		colorActual(1);
	});

	$("#btn3").click(function(){
		colorActual(2);
	});

	$("#btn4").click(function(){
		colorActual(3);
		
	});

	$("#resetGame").click(function(){
		$("#lose").modal('hide');
		randomBlind();
	})





})