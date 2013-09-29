
var i = 0;
var code = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', function(e) {
    if (i == code.length) {
	var div = document.createElement('div');
	var r = Math.random;
	var f = Math.floor;
	var w = window.innerWidth;
	var h = window.innerHeight;
	div.style.backgroundColor = '#' + f(r()*256).toString(16) + f(r()*256).toString(16) + f(r()*256).toString(16);
	var width = f(r() * (w/3-10))+10;
	var height = f(r() * (h/3-10))+10;
	div.style.width = width + 'px';
	div.style.height = height + 'px';
	div.style.position = 'fixed';
	div.style.top = f(r() * (h-height)) + 'px';
	div.style.left = f(r() * (w-width)) + 'px';
	document.getElementsByTagName('body')[0].appendChild(div);
    } else if (e.keyCode != code[i++]) {
	i = 0;
    }
});
