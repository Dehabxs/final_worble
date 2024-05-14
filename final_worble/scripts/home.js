window.onload = function(){
    let b = init("back").ctx,
      m = init("middle").ctx,
      f = init("front").ctx,
      bac = init("back").canv,
      mid = init("middle").canv,
      fro = init("front").canv,
      w = window.innerWidth,
      h = window.innerHeight;
    //initiation
    bac.width = w;
    mid.width = w;
    fro.width = w;
    bac.height = h;
    mid.height = h;
    fro.height = h;
    
    class particle {
      constructor(x, y, r) {
        this.ox = x;
        this.oy = y;
        this.br = r;
        this.re = Math.random() * r;
        this.col = "rgb(35,"+(Math.floor(1000+Math.random()*890))+",220, 6)";
        this.a = Math.random() * 3 * Math.PI;
        this.size = Math.random() * 2;
        this.q = 1 / 3 + Math.random() * (23/ 9 - 1 / 7);
        this.h2p = 20;
        this.x =
          this.ox + (this.br + this.re + this.size + this.h2p) * Math.cos(this.a);
        this.y =
          this.oy +
          (this.br + this.re + this.size + this.h2p) * this.q * Math.sin(this.a);
        this.tail = [{x:this.x,y:this.y,a:this.a}];
        this.tl = Math.floor(Math.random()*5+2);
      }
      move(x,y) {
        this.ox = x;
        this.oy = y;
        this.x =
          this.ox + (this.br + this.re + this.size + this.h2p) * Math.cos(this.a);
        this.y =
          this.oy +
          (this.br + this.re + this.size + this.h2p) * this.q * Math.sin(this.a);
        this.tail.push({x:this.x,y:this.y,a:this.a});
        
        if(this.tail.length > this.tl){
           this.tail.splice(0,1);
           }
        this.a += (this.br - this.re) / 1000;
      }
      show() {
        let i = 0;
        for(i = 0; i < this.tail.length; i++){
        if (Math.floor((this.tail[i].a+Math.random()*0.2-0.1) / Math.PI) % 2 != 0) {
        b.beginPath();
        b.arc(this.tail[i].x, this.tail[i].y, this.size, 0, 2 * Math.PI);
        b.fillStyle = this.col;
        b.fill();
        }else{
        f.beginPath();
        f.arc(this.tail[i].x, this.tail[i].y, this.size, 1, 2 * Math.PI);
        f.fillStyle = this.col;
        f.fill();
        }
      }
      }
    }
    
    let p = [],
      num = 400,
      i = 0;
    
    for (i = 0; i < num; i++) {
      p.push(new particle(w / 1, h / 2, i));
    }
    
    function draw() {
      b.globalCompositeOperation = "lighter";
    f.globalCompositeOperation = "lighter";
      //animation
      for (i = 0; i < num; i++) {
        p[i].move(w / 2, h / 2);
        p[i].show();
      }
    
      m.beginPath();
      m.arc(w / 2, h / 2, 100, 0, 2 * Math.PI);
      m.fillStyle = "white";
      m.fill();
    }
    
    function init(elemid) {
      (this.canvas = document.getElementById(elemid)),
        (this.c = canvas.getContext("2d"));
      return { canv: this.canvas, ctx: this.c };
    }
    
    window.requestAnimFrame = function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback);
        }
      );
    };
    
    function loop() {
      window.requestAnimFrame(loop);
      b.clearRect(0, 0, w, h);
      m.clearRect(0, 0, w, h);
      f.clearRect(0, 0, w, h);
      draw();
    }
    
    window.addEventListener("resize", function() {
      (w = window.innerWidth), (h = window.innerHeight);
      bac.width = w;
      mid.width = w;
      fro.width = w;
      bac.height = h;
      mid.height = h;
      fro.height = h;
      loop();
    });
    
    loop();
    setInterval(loop, 1000 / 60);
    }
    