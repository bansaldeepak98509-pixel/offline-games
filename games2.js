window.EXTRA={};
(function(E){
var COLS=['#ff5d73','#35e0c0','#f7c948','#7f8cff'];

E.tap={n:'Tap Rush',i:'👆',s:function(c){var A=c.A,I=c.I,n=0,t=0,run=false,iv;
 A.innerHTML='<button id="t" style="width:min(70vw,280px);aspect-ratio:1;border-radius:50%;font-size:2.4rem">TAP</button>';
 I.textContent='10 sec mein jitna tap karo · Best '+c.best('mg_tap',0);
 A.querySelector('#t').onclick=function(){
  if(!run){run=true;n=0;t=10;iv=setInterval(function(){t--;I.textContent='Time '+t+' · Taps '+n;if(t<=0){clearInterval(iv);run=false;I.textContent='Score '+n+' · Best '+c.best('mg_tap',n)}},1000)}
  if(run){n++;I.textContent='Time '+t+' · Taps '+n}};
 return function(){clearInterval(iv)}}};

E.react={n:'Reaction Test',i:'⚡',s:function(c){var A=c.A,I=c.I,st=0,to,state=0;
 A.innerHTML='<button id="b" style="width:min(92vw,400px);height:300px;font-size:1.4rem;background:#ff5d73;color:#fff">Start karne ke liye tap karo</button>';
 var b=A.querySelector('#b');
 b.onclick=function(){
  if(state==0){state=1;b.textContent='Ruko...';b.style.background='#ff5d73';b.style.color='#fff';
   to=setTimeout(function(){state=2;st=Date.now();b.textContent='ABHI TAP!';b.style.background='#35e0c0';b.style.color='#06241e'},1000+c.rnd(3000))}
  else if(state==1){clearTimeout(to);state=0;b.textContent='Bahut jaldi! Dobara tap karo'}
  else{var ms=Date.now()-st;state=0;b.style.background='#7f8cff';b.style.color='#06241e';b.textContent=ms+' ms · Dobara tap karo';I.textContent='Best '+(10000-c.best('mg_rx',10000-ms))+' ms'}};
 return function(){clearTimeout(to)}}};

E.mole={n:'Whack-a-Mole',i:'🔨',s:function(c){var A=c.A,I=c.I,sc=0,left=0,iv,up=-1,cells=[];
 A.innerHTML='<div class="grid g3" id="b"></div><div class="row"><button id="r">Start</button></div>';
 var b=A.querySelector('#b');
 for(var k=0;k<9;k++)(function(k){var d=c.el('c','');d.onclick=function(){if(left>0&&k==up){sc++;up=-1;d.textContent='💥';I.textContent='Score '+sc}};cells.push(d);b.appendChild(d)})(k);
 A.querySelector('#r').onclick=function(){clearInterval(iv);sc=0;left=33;
  iv=setInterval(function(){left--;cells.forEach(function(d){d.textContent=''});
   if(left<=0){clearInterval(iv);up=-1;I.textContent='Score '+sc+' · Best '+c.best('mg_mole',sc);return}
   up=c.rnd(9);cells[up].textContent='🐹';I.textContent='Score '+sc+' · Time '+Math.ceil(left*.6)},600)};
 I.textContent='Start dabao, 20 sec';
 return function(){clearInterval(iv)}}};

E.simon={n:'Simon Memory',i:'🎵',s:function(c){var A=c.A,I=c.I,seq=[],pos=0,lock=true,ds=[],to=[];
 A.innerHTML='<div class="grid" id="b" style="grid-template-columns:1fr 1fr"></div><div class="row"><button id="r">Start</button></div>';
 var b=A.querySelector('#b');
 function flash(i){ds[i].style.opacity='1';to.push(setTimeout(function(){ds[i].style.opacity='.45'},300))}
 function next(){seq.push(c.rnd(4));pos=0;I.textContent='Level '+seq.length;
  seq.forEach(function(v,k){to.push(setTimeout(function(){flash(v)},k*600+300))});
  to.push(setTimeout(function(){lock=false},seq.length*600+300))}
 COLS.forEach(function(col,i){var d=c.el('c','');d.style.background=col;d.style.opacity='.45';
  d.onclick=function(){if(lock)return;flash(i);
   if(i!=seq[pos]){lock=true;I.textContent='Game over · Level '+seq.length+' · Best '+(c.best('mg_simon',seq.length-1)+1);return}
   pos++;if(pos==seq.length){lock=true;to.push(setTimeout(next,700))}};
  ds.push(d);b.appendChild(d)});
 A.querySelector('#r').onclick=function(){to.forEach(clearTimeout);to=[];seq=[];lock=true;next()};
 I.textContent='Pattern yaad rakho aur dohrao';
 return function(){to.forEach(clearTimeout)}}};

E.color={n:'Color Match',i:'🎨',s:function(c){var A=c.A,I=c.I,names=['Laal','Hara','Peela','Neela'],sc=0,t=0,iv,ans=0,on=false;
 A.innerHTML='<div id="w" style="font-size:3rem;font-weight:800;height:90px;display:flex;align-items:center">Ready?</div><div class="grid" id="b" style="grid-template-columns:1fr 1fr;aspect-ratio:auto"></div><div class="row"><button id="r">Start (30s)</button></div>';
 var w=A.querySelector('#w'),b=A.querySelector('#b');I.textContent='Shabd ka RANG chuno, matlab nahi';
 function q(){var a=c.rnd(4),k=c.rnd(4);w.textContent=names[a];w.style.color=COLS[k];ans=k}
 COLS.forEach(function(col,i){var d=c.el('c','');d.style.background=col;d.style.height='80px';
  d.onclick=function(){if(!on)return;if(i==ans)sc++;else sc=Math.max(0,sc-1);I.textContent='Score '+sc+' · Time '+t;q()};b.appendChild(d)});
 A.querySelector('#r').onclick=function(){clearInterval(iv);sc=0;t=30;on=true;q();
  iv=setInterval(function(){t--;I.textContent='Score '+sc+' · Time '+t;if(t<=0){clearInterval(iv);on=false;w.textContent='Khatam';w.style.color='#eef0ff';I.textContent='Score '+sc+' · Best '+c.best('mg_color',sc)}},1000)};
 return function(){clearInterval(iv)}}};

E.flap={n:'Flappy Dot',i:'🟡',s:function(c){var A=c.A,I=c.I,y,v,p,sc,t;
 A.innerHTML='<canvas id="cv" width="300" height="400" style="aspect-ratio:3/4;width:min(75vw,300px)"></canvas><div class="row"><button id="r">Restart</button></div>';
 var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 function tick(){v+=.35;y+=v;p.forEach(function(o){o.x-=2.5});
  if(p[0].x<-40){p.shift();sc++}
  if(p[p.length-1].x<160)p.push({x:340,g:80+c.rnd(240)});
  x.fillStyle='#1e2440';x.fillRect(0,0,300,400);x.fillStyle='#35e0c0';
  p.forEach(function(o){x.fillRect(o.x,0,40,o.g-65);x.fillRect(o.x,o.g+65,40,400)});
  x.fillStyle='#f7c948';x.beginPath();x.arc(80,y,10,0,7);x.fill();
  I.textContent='Score '+sc+' · Best '+c.best('mg_flap',sc);
  var hit=y<10||y>390;p.forEach(function(o){if(o.x<90&&o.x+40>70&&(y-10<o.g-65||y+10>o.g+65))hit=true});
  if(hit){clearInterval(t);I.textContent='Game over · Score '+sc+' · Best '+c.best('mg_flap',sc)}}
 function start(){clearInterval(t);y=200;v=0;p=[{x:320,g:200}];sc=0;t=setInterval(tick,20)}
 cv.onpointerdown=function(){v=-6};
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};

E.lights={n:'Lights Out',i:'💡',s:function(c){var A=c.A,I=c.I,g,m;
 A.innerHTML='<div class="grid" id="b" style="grid-template-columns:repeat(5,1fr)"></div><div class="row"><button id="r">Naya level</button></div>';
 var b=A.querySelector('#b');
 function tog(i){var x=i%5,y=(i-x)/5;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var a=x+d[0],e=y+d[1];if(a>=0&&a<5&&e>=0&&e<5)g[e*5+a]^=1})}
 function draw(){b.innerHTML='';
  g.forEach(function(v,i){var d=c.el('c',v?'💡':'');d.style.background=v?'#f7c948':'#2a3156';d.onclick=function(){tog(i);m++;draw()};b.appendChild(d)});
  I.textContent=g.every(function(v){return !v})?'Sab band! 🎉 Moves '+m:'Saari lights band karo · Moves '+m}
 function init(){g=[];for(var i=0;i<25;i++)g.push(0);m=0;for(var k=0;k<12;k++)tog(c.rnd(25));draw()}
 A.querySelector('#r').onclick=init;init()}};

E.math={n:'Math Rush',i:'➗',s:function(c){var A=c.A,I=c.I,sc=0,t=0,iv,ans,on=false,ds=[];
 A.innerHTML='<div id="q" style="font-size:2.6rem;font-weight:800;height:80px;display:flex;align-items:center">Ready?</div><div class="grid" id="b" style="grid-template-columns:1fr 1fr;aspect-ratio:auto"></div><div class="row"><button id="r">Start (30s)</button></div>';
 var q=A.querySelector('#q'),b=A.querySelector('#b');
 for(var i=0;i<4;i++){var d=c.el('c','');d.style.height='80px';ds.push(d);b.appendChild(d)}
 function nq(){var a=2+c.rnd(12),e=2+c.rnd(12),o=c.rnd(3);
  ans=o==0?a+e:o==1?a*e:a-e;q.textContent=a+(o==0?' + ':o==1?' × ':' − ')+e;
  var k=c.rnd(4),used=[ans];
  ds.forEach(function(d,i){var v=ans;if(i!=k){do{v=ans+c.rnd(11)-5}while(used.indexOf(v)>-1);used.push(v)}
   d.textContent=v;d.onclick=function(){if(!on)return;if(v==ans)sc++;else sc=Math.max(0,sc-1);I.textContent='Score '+sc+' · Time '+t;nq()}})}
 A.querySelector('#r').onclick=function(){clearInterval(iv);sc=0;t=30;on=true;nq();
  iv=setInterval(function(){t--;I.textContent='Score '+sc+' · Time '+t;if(t<=0){clearInterval(iv);on=false;q.textContent='Khatam';I.textContent='Score '+sc+' · Best '+c.best('mg_math',sc)}},1000)};
 return function(){clearInterval(iv)}}};

E.idle={n:'Coin Tapper',i:'🪙',s:function(c){var A=c.A,I=c.I,coins=0,per=1,auto=0,cp=20,ca=50,iv;
 try{var s=JSON.parse(localStorage.getItem('mg_idle'));if(s){coins=s.coins;per=s.per;auto=s.auto;cp=s.cp;ca=s.ca}}catch(e){}
 A.innerHTML='<button id="t" style="width:min(60vw,240px);aspect-ratio:1;border-radius:50%;font-size:4rem;background:#f7c948">🪙</button><div class="row"><button class="alt" id="u1"></button><button class="alt" id="u2"></button></div>';
 var u1=A.querySelector('#u1'),u2=A.querySelector('#u2');
 function ui(){I.textContent='Coins '+Math.floor(coins)+' · +'+per+'/tap · +'+auto+'/sec';u1.textContent='Tap +1 ('+cp+')';u2.textContent='Auto +1 ('+ca+')';
  try{localStorage.setItem('mg_idle',JSON.stringify({coins:coins,per:per,auto:auto,cp:cp,ca:ca}))}catch(e){}}
 A.querySelector('#t').onclick=function(){coins+=per;ui()};
 u1.onclick=function(){if(coins>=cp){coins-=cp;per++;cp=Math.ceil(cp*1.6);ui()}};
 u2.onclick=function(){if(coins>=ca){coins-=ca;auto++;ca=Math.ceil(ca*1.7);ui()}};
 iv=setInterval(function(){coins+=auto;ui()},1000);ui();
 return function(){clearInterval(iv)}}};

E.catchf={n:'Catch Fall',i:'🍎',s:function(c){var A=c.A,I=c.I,px=150,o,sc,lv,t;
 A.innerHTML='<canvas id="cv" width="300" height="400" style="aspect-ratio:3/4;width:min(75vw,300px)"></canvas><div class="row"><button id="r">Restart</button></div>';
 var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 function mv(e){var r=cv.getBoundingClientRect();px=(e.clientX-r.left)*300/r.width}
 cv.onpointermove=mv;cv.onpointerdown=mv;
 function tick(){if(c.rnd(40)==0)o.push({x:20+c.rnd(260),y:0,b:c.rnd(5)==0});
  x.fillStyle='#1e2440';x.fillRect(0,0,300,400);x.fillStyle='#35e0c0';x.fillRect(px-30,380,60,10);x.font='24px serif';
  o.forEach(function(a){a.y+=3+sc/15;x.fillText(a.b?'💣':'🍎',a.x-12,a.y)});
  o=o.filter(function(a){
   if(a.y>=380&&a.y<=395&&Math.abs(a.x-px)<36){if(a.b)lv--;else sc++;return false}
   if(a.y>400){if(!a.b)lv--;return false}return true});
  I.textContent='Score '+sc+' · Jaan '+'❤'.repeat(Math.max(lv,0))+' · Best '+c.best('mg_catch',sc);
  if(lv<=0){clearInterval(t);I.textContent='Game over · Score '+sc+' · Best '+c.best('mg_catch',sc)}}
 function start(){clearInterval(t);o=[];sc=0;lv=3;t=setInterval(tick,20)}
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};
})(window.EXTRA);
