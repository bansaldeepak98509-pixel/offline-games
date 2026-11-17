(function(E){
var CV='<canvas id="cv" width="300" height="400" style="aspect-ratio:3/4;width:min(75vw,300px)"></canvas><div class="row"><button id="r">Restart</button></div>';
function px(cv,e){var r=cv.getBoundingClientRect();return (e.clientX-r.left)*300/r.width}

E.mine={n:'Minesweeper',i:'💣',s:function(c){var A=c.A,I=c.I,N=8,M=10,m,v,f,flag=false,over,b;
 A.innerHTML='<div class="row"><button class="alt" id="m">Mode: Khodo</button><button id="r">Naya</button></div><div class="grid" id="b" style="grid-template-columns:repeat(8,1fr);gap:3px;padding:4px"></div>';
 b=A.querySelector('#b');
 function nb(i){var r=[],x=i%N,y=(i-x)/N;for(var a=-1;a<2;a++)for(var e=-1;e<2;e++){var X=x+a,Y=y+e;if((a||e)&&X>=0&&X<N&&Y>=0&&Y<N)r.push(Y*N+X)}return r}
 function cnt(i){return nb(i).filter(function(j){return m[j]}).length}
 function init(){m=[];v=[];f=[];over=false;for(var i=0;i<N*N;i++){m.push(0);v.push(0);f.push(0)}var k=0;while(k<M){var p=c.rnd(N*N);if(!m[p]){m[p]=1;k++}}draw()}
 function open(i){if(v[i]||f[i])return;v[i]=1;if(!cnt(i)&&!m[i])nb(i).forEach(open)}
 function draw(){b.innerHTML='';var safe=0;
  m.forEach(function(x,i){var d=c.el('c','');d.style.fontSize='1.1rem';
   if(v[i]){d.style.background='#3d4a8a';d.textContent=m[i]?'💥':(cnt(i)||'')}
   else if(over&&m[i])d.textContent='💣';
   else if(f[i])d.textContent='🚩';
   if(v[i]&&!m[i])safe++;
   d.onclick=function(){if(over)return;if(flag){if(!v[i])f[i]^=1}else{if(f[i])return;if(m[i]){over=true;v[i]=1}else open(i)}draw()};
   b.appendChild(d)});
  var won=safe==N*N-M;if(won)over=true;
  I.textContent=won?'Jeet gaye! 🎉':over?'Boom! Game over':'Mines: '+M+' · Flags: '+f.reduce(function(a,x){return a+x},0)}
 A.querySelector('#m').onclick=function(){flag=!flag;this.textContent=flag?'Mode: Flag':'Mode: Khodo'};
 A.querySelector('#r').onclick=init;init()}};

E.c4={n:'Connect 4',i:'🔴',s:function(c){var A=c.A,I=c.I,R=6,C=7,g,end;
 A.innerHTML='<div class="grid" id="b" style="grid-template-columns:repeat(7,1fr);aspect-ratio:7/6;gap:5px;padding:6px"></div><div class="row"><button id="r">Naya game</button></div>';
 var b=A.querySelector('#b'),D=[[0,1],[1,0],[1,1],[1,-1]];
 function win(p){for(var r=0;r<R;r++)for(var q=0;q<C;q++)for(var j=0;j<4;j++){var k=0;for(;k<4;k++){var y=r+D[j][0]*k,x=q+D[j][1]*k;if(y<0||y>=R||x<0||x>=C||g[y][x]!=p)break}if(k==4)return true}return false}
 function drop(col,p){for(var r=R-1;r>=0;r--)if(!g[r][col]){g[r][col]=p;return r}return -1}
 function ai(){var cols=[0,1,2,3,4,5,6].filter(function(x){return !g[0][x]}),pick=null;
  [2,1].forEach(function(p){cols.forEach(function(x){if(pick===null){var r=drop(x,p);if(win(p))pick=x;g[r][x]=0}})});
  if(pick===null)pick=cols[c.rnd(cols.length)];drop(pick,2)}
 function draw(){b.innerHTML='';for(var r=0;r<R;r++)for(var q=0;q<C;q++)(function(q,v){var d=c.el('c',v?'●':'');d.style.color=v==1?'#ff5d73':'#f7c948';d.style.fontSize='2rem';d.onclick=function(){play(q)};b.appendChild(d)})(q,g[r][q])}
 function play(col){if(end||g[0][col])return;drop(col,1);
  if(win(1)){end=true;I.textContent='Tum jeet gaye! 🎉'}
  else if(g[0].every(Boolean)){end=true;I.textContent='Draw'}
  else{ai();if(win(2)){end=true;I.textContent='Computer jeet gaya'}else if(g[0].every(Boolean)){end=true;I.textContent='Draw'}}
  draw()}
 function init(){g=[];for(var r=0;r<R;r++)g.push([0,0,0,0,0,0,0]);end=false;I.textContent='Tum laal ho · column tap karo';draw()}
 A.querySelector('#r').onclick=init;init()}};

E.brick={n:'Breakout',i:'🧱',s:function(c){var A=c.A,I=c.I,pd,bx,by,vx,vy,br,sc,t,lv;
 A.innerHTML=CV;var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 cv.onpointermove=cv.onpointerdown=function(e){pd=px(cv,e)};
 function start(){clearInterval(t);pd=150;bx=150;by=300;vx=2.5;vy=-3.5;sc=0;lv=3;br=[];
  for(var r=0;r<5;r++)for(var q=0;q<7;q++)br.push({x:q*42+3,y:r*18+30,a:1,r:r});t=setInterval(tick,16)}
 function tick(){bx+=vx;by+=vy;if(bx<5||bx>295)vx=-vx;if(by<5)vy=-vy;
  if(by>370&&by<385&&Math.abs(bx-pd)<35&&vy>0){vy=-vy;vx=(bx-pd)/10}
  if(by>400){lv--;bx=150;by=300;vy=-3.5;vx=2.5}
  br.forEach(function(o){if(o.a&&bx>o.x&&bx<o.x+40&&by>o.y&&by<o.y+16){o.a=0;vy=-vy;sc++}});
  x.fillStyle='#1e2440';x.fillRect(0,0,300,400);
  br.forEach(function(o){if(o.a){x.fillStyle=['#ff5d73','#ff9f45','#f7c948','#35e0c0','#7f8cff'][o.r];x.fillRect(o.x,o.y,40,16)}});
  x.fillStyle='#eef0ff';x.fillRect(pd-35,380,70,8);x.beginPath();x.arc(bx,by,5,0,7);x.fill();
  I.textContent='Score '+sc+' · Jaan '+Math.max(lv,0)+' · Best '+c.best('mg_brick',sc);
  if(lv<=0||sc==35){clearInterval(t);I.textContent=(sc==35?'Jeet gaye! 🎉':'Game over')+' · Score '+sc}}
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};

E.stack={n:'Stack Tower',i:'🏗️',s:function(c){var A=c.A,I=c.I,bl,cur,dir,sc,t,dead;
 A.innerHTML=CV;var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 function draw(){x.fillStyle='#1e2440';x.fillRect(0,0,300,400);var off=Math.max(0,bl.length-12);
  bl.concat([cur]).forEach(function(o,i){x.fillStyle='hsl('+(i*28%360)+',70%,60%)';x.fillRect(o.x,400-(i-off+1)*24,o.w,22)})}
 function tick(){cur.x+=dir*(2+sc*.12);if(cur.x<0||cur.x+cur.w>300)dir=-dir;draw()}
 function start(){clearInterval(t);bl=[{x:100,w:100}];cur={x:0,w:100};dir=1;sc=0;dead=false;I.textContent='Tap karke block rokho';t=setInterval(tick,16)}
 cv.onpointerdown=function(){if(dead)return;var tp=bl[bl.length-1],l=Math.max(cur.x,tp.x),r=Math.min(cur.x+cur.w,tp.x+tp.w);
  if(r-l<=0){dead=true;clearInterval(t);I.textContent='Game over · Height '+sc+' · Best '+c.best('mg_stack',sc);return}
  bl.push({x:l,w:r-l});sc++;cur={x:0,w:r-l};I.textContent='Height '+sc+' · Best '+c.best('mg_stack',sc)};
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};

E.pong={n:'Pong',i:'🏓',s:function(c){var A=c.A,I=c.I,pd,ax,bx,by,vx,vy,sc,lv,t;
 A.innerHTML=CV;var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 cv.onpointermove=cv.onpointerdown=function(e){pd=px(cv,e)};
 function reset(d){bx=150;by=200;vx=2*(c.rnd(2)?1:-1);vy=3*d}
 function start(){clearInterval(t);pd=150;ax=150;sc=0;lv=3;reset(1);t=setInterval(tick,16)}
 function tick(){bx+=vx;by+=vy;if(bx<5||bx>295)vx=-vx;
  ax+=Math.max(-2.3,Math.min(2.3,bx-ax));
  if(by>=372&&by<=386&&Math.abs(bx-pd)<35&&vy>0){vy=-vy*1.05;vx=(bx-pd)/9}
  if(by<=24&&by>=10&&Math.abs(bx-ax)<35&&vy<0){vy=-vy;vx=(bx-ax)/9}
  if(by<0){sc++;reset(1)}if(by>400){lv--;reset(-1)}
  x.fillStyle='#1e2440';x.fillRect(0,0,300,400);x.fillStyle='#ff5d73';x.fillRect(ax-35,14,70,8);
  x.fillStyle='#35e0c0';x.fillRect(pd-35,380,70,8);x.fillStyle='#eef0ff';x.beginPath();x.arc(bx,by,5,0,7);x.fill();
  I.textContent='Score '+sc+' · Jaan '+Math.max(lv,0)+' · Best '+c.best('mg_pong',sc);
  if(lv<=0){clearInterval(t);I.textContent='Game over · Score '+sc}}
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};

E.hang={n:'Hangman',i:'🔤',s:function(c){var A=c.A,I=c.I,W=['ANDROID','PUZZLE','JUNGLE','ROCKET','MONKEY','GALAXY','CRICKET','BANANA','TIGER','PLANET','WIZARD','DRAGON','CASTLE','PIRATE','MARKET','GARDEN','BRIDGE','SILVER','THUNDER','FESTIVAL'],w,g,l;
 A.innerHTML='<div id="w" style="font-size:2rem;letter-spacing:.2em;font-weight:800;min-height:48px"></div><div id="k" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:min(92vw,400px)"></div><div class="row"><button id="r">Naya shabd</button></div>';
 var d=A.querySelector('#w'),k=A.querySelector('#k');
 function ui(){var s=w.split('').map(function(x){return g.indexOf(x)>-1||l<=0?x:'_'}).join(' '),ok=w.split('').every(function(x){return g.indexOf(x)>-1});
  d.textContent=s;I.textContent=ok?'Jeet gaye! 🎉':l<=0?'Haar gaye! Shabd: '+w:'Galti ki jagah: '+'❤'.repeat(l);
  k.querySelectorAll('button').forEach(function(b){b.disabled=ok||l<=0||g.indexOf(b.textContent)>-1;b.style.opacity=b.disabled?.35:1})}
 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(ch){var b=document.createElement('button');b.className='alt';b.style.padding='8px 10px';b.textContent=ch;
  b.onclick=function(){g.push(ch);if(w.indexOf(ch)<0)l--;ui()};k.appendChild(b)});
 function init(){w=W[c.rnd(W.length)];g=[];l=6;ui()}
 A.querySelector('#r').onclick=init;init()}};

E.hilo={n:'Higher or Lower',i:'🎴',s:function(c){var A=c.A,I=c.I,cur,st=0,over=false;
 A.innerHTML='<div id="n" style="font-size:6rem;font-weight:800;height:130px;display:flex;align-items:center">?</div><div class="row"><button id="h">Higher ⬆</button><button class="alt" id="l">Lower ⬇</button></div><div class="row"><button class="alt" id="r">Naya game</button></div>';
 var n=A.querySelector('#n');
 function ui(m){n.textContent=cur;I.textContent=m||'Agla number bada hoga ya chhota? Streak '+st+' · Best '+c.best('mg_hilo',st)}
 function g(h){if(over)return;var x=1+c.rnd(13);if(x==cur){ui('Barabar! Dobara try karo');return}
  if((h&&x>cur)||(!h&&x<cur)){st++;cur=x;ui()}else{over=true;cur=x;ui('Galat! Streak '+st+' · Best '+c.best('mg_hilo',st))}}
 A.querySelector('#h').onclick=function(){g(true)};A.querySelector('#l').onclick=function(){g(false)};
 A.querySelector('#r').onclick=function(){st=0;over=false;cur=1+c.rnd(13);ui()};
 cur=1+c.rnd(13);ui()}};

E.numm={n:'Number Memory',i:'🧠',s:function(c){var A=c.A,I=c.I,lv=1,d,to;
 A.innerHTML='<div id="n" style="font-size:2.6rem;font-weight:800;letter-spacing:.1em;height:80px;display:flex;align-items:center"></div><input id="i" inputmode="numeric" style="display:none;font-size:1.6rem;width:220px;text-align:center;padding:10px;border-radius:10px;border:2px solid #35e0c0;background:#1e2440;color:#eef0ff"><div class="row"><button id="o" style="display:none">OK</button><button class="alt" id="r">Start</button></div>';
 var n=A.querySelector('#n'),inp=A.querySelector('#i'),ok=A.querySelector('#o');
 function show(){d='';for(var k=0;k<lv+2;k++)d+=c.rnd(10);n.textContent=d;inp.style.display=ok.style.display='none';inp.value='';I.textContent='Level '+lv+' · Yaad karo';
  to=setTimeout(function(){n.textContent='?';inp.style.display=ok.style.display='';inp.focus();I.textContent='Number likho'},1200+lv*500)}
 ok.onclick=function(){if(inp.value==d){lv++;show()}else{I.textContent='Galat! Sahi: '+d+' · Level '+lv+' · Best '+c.best('mg_numm',lv);n.textContent='';inp.style.display=ok.style.display='none'}};
 A.querySelector('#r').onclick=function(){clearTimeout(to);lv=1;show()};
 I.textContent='Start dabao';
 return function(){clearTimeout(to)}}};

E.dodge={n:'Dodge',i:'☄️',s:function(c){var A=c.A,I=c.I,pd,o,sc,t;
 A.innerHTML=CV;var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 cv.onpointermove=cv.onpointerdown=function(e){pd=px(cv,e)};
 function start(){clearInterval(t);pd=150;o=[];sc=0;t=setInterval(tick,16)}
 function tick(){sc++;if(c.rnd(Math.max(8,30-Math.floor(sc/100)))==0)o.push({x:c.rnd(260),w:25+c.rnd(40),y:-20});
  x.fillStyle='#1e2440';x.fillRect(0,0,300,400);x.fillStyle='#ff5d73';var hit=false;
  o.forEach(function(a){a.y+=3+sc/400;x.fillRect(a.x,a.y,a.w,18);if(a.y>360&&a.y<394&&pd+10>a.x&&pd-10<a.x+a.w)hit=true});
  o=o.filter(function(a){return a.y<400});
  x.fillStyle='#35e0c0';x.fillRect(pd-10,374,20,20);
  I.textContent='Score '+Math.floor(sc/10)+' · Best '+c.best('mg_dodge',Math.floor(sc/10));
  if(hit){clearInterval(t);I.textContent='Game over · Score '+Math.floor(sc/10)}}
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};

E.piano={n:'Piano Tiles',i:'🎹',s:function(c){var A=c.A,I=c.I,rows,sc,t,dead;
 A.innerHTML=CV;var cv=A.querySelector('#cv'),x=cv.getContext('2d');
 function start(){clearInterval(t);rows=[];for(var i=0;i<5;i++)rows.push({c:c.rnd(4),y:300-i*100,d:0});sc=0;dead=false;t=setInterval(tick,16)}
 function over(){dead=true;clearInterval(t);I.textContent='Game over · Score '+sc+' · Best '+c.best('mg_piano',sc)}
 function tick(){var sp=3+sc*.06;rows.forEach(function(r){r.y+=sp});
  if(rows[rows.length-1].y>=0)rows.push({c:c.rnd(4),y:rows[rows.length-1].y-100,d:0});
  x.fillStyle='#eef0ff';x.fillRect(0,0,300,400);x.fillStyle='#c9d4ff';[75,150,225].forEach(function(l){x.fillRect(l,0,1,400)});
  rows.forEach(function(r){if(!r.d&&r.y>=400){over();return}x.fillStyle=r.d?'#9aa3d6':'#14182b';x.fillRect(r.c*75+1,r.y+1,73,98)});
  rows=rows.filter(function(r){return r.y<400||!r.d});
  if(!dead)I.textContent='Score '+sc+' · Best '+c.best('mg_piano',sc)}
 cv.onpointerdown=function(e){if(dead)return;var col=Math.floor(px(cv,e)/75),r=rows.filter(function(r){return !r.d})[0];
  if(r&&r.c==col){r.d=1;sc++}else over()};
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)}}};
})(window.EXTRA);
