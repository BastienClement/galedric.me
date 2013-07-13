(function() {
	var animation = false;
	
	var currentPercent = 0.5;
	var targetPercent = 0.5;

	var visible, seeable, offset;
	
	var bgwidth = 2900;
	
	var factor = 1.1;
	var velocity = 0.075;
	
	var requestAnimationFrame = (
		window.requestAnimationFrame
	||  window.webkitRequestAnimationFrame
	||  window.mozRequestAnimationFrame
	||  window.msRequestAnimationFrame
	||  (function(fn) { setTimeout(fn, 1000/60); })
	);
	
	function animate() {
		if(!animation) {
			return;
		}
		
		var delta = Math.abs(targetPercent-currentPercent);
		
		if(delta > velocity) {
			delta = velocity;
		} else {
			animation = false;
		}
		
		if(targetPercent < currentPercent) {
			delta *= -1;
		}
		
		moveTo(currentPercent+delta);
		
		if(animation) {
			requestAnimationFrame(animate);
		}
	}
	
	function animateTo(percent) {
		targetPercent = percent;
		
		if(!animation) {
			animation = true;
			animate();
		}
	}
	
	function moveTo(percent) {
		if(seeable > bgwidth) // Background too small
			return;
		
		currentPercent = percent;
		var position = -offset-percent*(seeable-visible);
		document.body.style.backgroundPositionX = position+"px";
	}
	
	function sync() {
		visible = document.body.offsetWidth;
		seeable = visible*factor;
		offset = bgwidth-seeable;
		
		moveTo(currentPercent);
	}
	
	sync();
	
	document.addEventListener("mousemove", function(e) {
		sync();
		
		var x = e.pageX;
		animateTo(x/visible);
	});
	
	document.addEventListener("touchmove", function(e) {
		var x = e.pageX;
		animateTo(x/visible);
		
		e.preventDefault();
	});
	
	window.addEventListener("resize", function() {
		sync();
	});
})();
