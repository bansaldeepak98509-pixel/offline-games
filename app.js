(function(){
var A=document.getElementById('area'),I=document.getElementById('info'),M=document.getElementById('menu'),S=document.getElementById('stage'),T=document.getElementById('gt');
var stopFn=null,swipeCb=null,G={};
function best(k,v){try{var o=+localStorage.getItem(k)||0;if(v>o){localStorage.setItem(k,v);o=v}return o}catch(e){return v||0}}
function el(c,t){var d=document.createElement('div');d.className=c;if(t!=null)d.textContent=t;return d}
function rnd(n){return Math.floor(Math.random()*n)}
var ctx={A:A,I:I,el:el,rnd:rnd,best:best};

/* 1. Merge 2048 */
G.g2048={n:'Merge 2048',i:'🔢',s:function(){
 var g,sc,pv=null,col={2:'#c9d4ff',4:'#a9bcff',8:'#8fa6ff',16:'#7f8cff',32:'#9a7bff',64:'#b878ff',128:'#35e0c0',256:'#2cd0b2',512:'#f7c948',1024:'#ff9f45',2048:'#ff5d73'};
 A.innerHTML='<div class="grid g4" id="b"></div><div class="row"><button class="alt" id="u">Undo</button><button id="r">Naya game</button></div>';
 var b=A.querySelector('#b');
 function emp(){return [0,1,2,3].map(function(){return [0,0,0,0]})}
 function add(){var e=[];g.forEach(function(r,i){r.forEach(function(v,j){if(!v)e.push([i,j])})});if(e.length){var p=e[rnd(e.length)];g[p[0]][p[1]]=Math.random()<.9?2:4}}
 function draw(){b.innerHTML='';g.forEach(function(r){r.forEach(function(v){var d=el('c',v||'');if(v){d.style.background=col[v]||'#ff5d73';d.style.color='#0d1124';if(v>=1024)d.style.fontSize='1.2rem'}b.appendChild(d)})});I.textContent='Score '+sc+' · Best '+best('mg_2048',sc)}
 function slide(a){a=a.filter(Boolean);var o=[];for(var i=0;i<a.length;i++){if(a[i]==a[i+1]){o.push(a[i]*2);sc+=a[i]*2;i++}else o.push(a[i])}while(o.length<4)o.push(0);return o}
 function can(){for(var i=0;i<4;i++)for(var j=0;j<4;j++){if(!g[i][j]||(j<3&&g[i][j]==g[i][j+1])||(i<3&&g[i][j]==g[i+1][j]))return true}return false}
 function mv(d){
  var snap=JSON.stringify(g),old=sc,ng=emp();
  for(var i=0;i<4;i++){var line=[],j;
   for(j=0;j<4;j++)line.push(d==0?g[i][j]:d==1?g[i][3-j]:d==2?g[j][i]:g[3-j][i]);
   var o=slide(line);
   for(j=0;j<4;j++){if(d==0)ng[i][j]=o[j];else if(d==1)ng[i][3-j]=o[j];else if(d==2)ng[j][i]=o[j];else ng[3-j][i]=o[j]}}
  if(JSON.stringify(ng)==snap){sc=old;return}
  pv={g:JSON.parse(snap),s:old};g=ng;add();draw();if(!can())I.textContent='Game over · Score '+sc;
 }
 function start(){g=emp();sc=0;pv=null;add();add();draw()}
 A.querySelector('#r').onclick=start;
 A.querySelector('#u').onclick=function(){if(pv){g=pv.g;sc=pv.s;pv=null;draw()}};
 swipeCb=mv;start();
}};

/* 2. Memory Match */
G.mem={n:'Memory Match',i:'🃏',s:function(){
 var em=['🐶','🐱','🦊','🐼','🐸','🦁','🐵','🐙'],d=em.concat(em).sort(function(){return Math.random()-.5}),op=[],mv=0,ok=0,lock=false;
 A.innerHTML='<div class="grid g4" id="b"></div><div class="row"><button id="r">Naya game</button></div>';
 var b=A.querySelector('#b');I.textContent='Moves 0';
 d.forEach(function(e){var c=el('c','?');c.onclick=function(){
  if(lock||c.classList.contains('on')||c.classList.contains('hit'))return;
  c.textContent=e;c.classList.add('on');op.push([c,e]);
  if(op.length==2){mv++;I.textContent='Moves '+mv;lock=true;
   if(op[0][1]==op[1][1]){op.forEach(function(p){p[0].classList.remove('on');p[0].classList.add('hit')});op=[];lock=false;ok++;if(ok==8)I.textContent='Jeet gaye! 🎉 Moves '+mv}
   else setTimeout(function(){op.forEach(function(p){p[0].textContent='?';p[0].classList.remove('on')});op=[];lock=false},700)}
 };b.appendChild(c)});
 A.querySelector('#r').onclick=function(){launch('mem')};
}};

/* 3. Tic Tac Toe vs computer */
G.ttt={n:'Tic Tac Toe',i:'❌',s:function(){
 var L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],p=['','','','','','','','',''],end=false;
 A.innerHTML='<div class="grid g3" id="b"></div><div class="row"><button id="r">Naya game</button></div>';
 var b=A.querySelector('#b');
 function w(q,m){return L.some(function(l){return l.every(function(i){return q[i]==m})})}
 function full(q){return q.every(Boolean)}
 function mm(q,t){if(w(q,'O'))return 1;if(w(q,'X'))return -1;if(full(q))return 0;var bs=t=='O'?-2:2;for(var i=0;i<9;i++)if(!q[i]){q[i]=t;var s=mm(q,t=='O'?'X':'O');q[i]='';bs=t=='O'?Math.max(bs,s):Math.min(bs,s)}return bs}
 function ai(){var fr=[],m;p.forEach(function(v,i){if(!v)fr.push(i)});
  if(Math.random()<.2)m=fr[rnd(fr.length)];
  else{var bs=-2;fr.forEach(function(i){p[i]='O';var s=mm(p,'X');p[i]='';if(s>bs){bs=s;m=i}})}
  p[m]='O'}
 function draw(){b.innerHTML='';p.forEach(function(v,i){var c=el('c',v);c.style.color=v=='X'?'#35e0c0':'#ff5d73';c.onclick=function(){click(i)};b.appendChild(c)})}
 function status(){if(w(p,'X')){end=true;I.textContent='Tum jeet gaye! 🎉'}else if(w(p,'O')){end=true;I.textContent='Computer jeet gaya'}else if(full(p)){end=true;I.textContent='Draw'}}
 function click(i){if(end||p[i])return;p[i]='X';status();if(!end){ai();status()}draw()}
 I.textContent='Tum X ho';draw();
 A.querySelector('#r').onclick=function(){launch('ttt')};
}};

/* 4. Snake */
G.snake={n:'Snake',i:'🐍',s:function(){
 var N=15,Z=24,s,d,nd,f,sc,t;
 A.innerHTML='<canvas id="cv" width="360" height="360"></canvas><div class="row"><button id="r">Naya game</button></div>';
 var cv=A.querySelector('#cv'),x=cv.getContext('2d'),D=[[-1,0],[1,0],[0,-1],[0,1]];
 function food(){do{f=[rnd(N),rnd(N)]}while(s.some(function(p){return p[0]==f[0]&&p[1]==f[1]}))}
 function draw(){x.fillStyle='#1e2440';x.fillRect(0,0,360,360);x.fillStyle='#ff5d73';x.fillRect(f[0]*Z+3,f[1]*Z+3,Z-6,Z-6);
  s.forEach(function(p,i){x.fillStyle=i?'#35e0c0':'#8ff5df';x.fillRect(p[0]*Z+1,p[1]*Z+1,Z-2,Z-2)});
  I.textContent='Score '+sc+' · Best '+best('mg_snake',sc)}
 function tick(){d=nd;var h=[s[0][0]+d[0],s[0][1]+d[1]];
  if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||s.some(function(p){return p[0]==h[0]&&p[1]==h[1]})){clearInterval(t);I.textContent='Game over · Score '+sc;return}
  s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){sc++;food()}else s.pop();draw()}
 function start(){clearInterval(t);s=[[7,7],[6,7],[5,7]];d=nd=[1,0];sc=0;food();draw();t=setInterval(tick,140)}
 swipeCb=function(k){var n=D[k];if(!(n[0]==-d[0]&&n[1]==-d[1]))nd=n};
 A.querySelector('#r').onclick=start;start();
 return function(){clearInterval(t)};
}};

/* 5. Slide puzzle */
G.slide={n:'Slide Puzzle',i:'🧩',s:function(){
 var t,e,mvs;
 A.innerHTML='<div class="grid g4" id="b"></div><div class="row"><button id="r">Shuffle</button></div>';
 var b=A.querySelector('#b');
 function nbrs(i){var r=[],x=i%4,y=Math.floor(i/4);if(x>0)r.push(i-1);if(x<3)r.push(i+1);if(y>0)r.push(i-4);if(y<3)r.push(i+4);return r}
 function solved(){for(var i=0;i<15;i++)if(t[i]!=i+1)return false;return true}
 function draw(){b.innerHTML='';
  t.forEach(function(v,i){var c=el('c',v||'');
   if(v){c.style.background='#7f8cff';c.style.color='#0d1124'}else c.style.background='transparent';
   c.onclick=function(){if(v&&nbrs(e).indexOf(i)>-1){t[e]=v;t[i]=0;e=i;mvs++;draw()}};
   b.appendChild(c)});
  I.textContent=solved()?'Solve ho gaya! 🎉 Moves '+mvs:'Moves '+mvs}
 function init(){t=[];for(var i=1;i<16;i++)t.push(i);t.push(0);e=15;
  for(var k=0;k<200;k++){var nb=nbrs(e),j=nb[rnd(nb.length)];t[e]=t[j];t[j]=0;e=j}
  mvs=0;draw()}
 A.querySelector('#r').onclick=init;init();
}};

function launch(id){
 if(stopFn)stopFn();stopFn=null;swipeCb=null;
 A.innerHTML='';I.textContent='';T.textContent=G[id].i+' '+G[id].n;M.hidden=true;S.hidden=false;
 stopFn=G[id].s(ctx)||null;
}
function home(){if(stopFn)stopFn();stopFn=null;swipeCb=null;S.hidden=true;M.hidden=false}
window.launch=launch;

Object.assign(G,window.EXTRA||{});
Object.keys(G).forEach(function(k){
 var b=document.createElement('button');b.className='card';
 b.innerHTML='<span>'+G[k].i+'</span>'+G[k].n;b.onclick=function(){launch(k)};
 document.getElementById('list').appendChild(b);
});
document.getElementById('back').onclick=home;
document.addEventListener('keydown',function(e){
 var m={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3}[e.key];
 if(m!==undefined&&swipeCb){e.preventDefault();swipeCb(m)}
});
var sx=null,sy=null;
S.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
S.addEventListener('touchend',function(e){
 if(sx==null||!swipeCb)return;
 var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;
 if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
 if(Math.abs(dx)>Math.abs(dy))swipeCb(dx<0?0:1);else swipeCb(dy<0?2:3);
});
})();
