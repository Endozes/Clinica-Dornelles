(function(){
var S={estetica:['Botox','Limpeza de pele','Tratamento para acne','Diástase abdominal','Depilação a laser'],podologia:['Atendimento podológico','Avaliação']};
var P={estetica:{n:'5547996442767',who:'Rafaela'},podologia:{n:'554799131892',who:'Beti'}};
var f=document.getElementById('f'),w=document.getElementById('wpp'),sel=document.getElementById('serv');
function tipo(){return f.querySelector('input[name=tipo]:checked').value}
function fill(){sel.innerHTML='<option value="">Quero uma avaliação</option>'+S[tipo()].map(function(x){return '<option>'+x+'</option>'}).join('')}
fill();
f.querySelectorAll('input[name=tipo]').forEach(function(r){r.addEventListener('change',fill)});
document.querySelectorAll('[data-pick]').forEach(function(a){a.addEventListener('click',function(){var r=f.querySelector('input[name=tipo][value='+a.dataset.pick+']');r.checked=true;fill()})});
w.addEventListener('input',function(){var d=w.value.replace(/\D/g,'').slice(0,11),o=d;if(d.length>2)o='('+d.slice(0,2)+') '+d.slice(2);if(d.length>7)o='('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);w.value=o});
f.addEventListener('submit',function(e){
  e.preventDefault();
  var n=document.getElementById('nome'),ok=true,dg=w.value.replace(/\D/g,'');
  document.getElementById('e-nome').textContent='';document.getElementById('e-wpp').textContent='';n.classList.remove('err');w.classList.remove('err');
  if(n.value.trim().length<2){document.getElementById('e-nome').textContent='Informe seu nome.';n.classList.add('err');ok=false}
  if(dg.length<10){document.getElementById('e-wpp').textContent='Informe um WhatsApp válido com DDD.';w.classList.add('err');ok=false}
  if(!ok)return;
  var t=tipo(),p=P[t],s=sel.value||'Quero uma avaliação',per=f.querySelector('input[name=per]:checked').value;
  var msg='Olá, '+p.who+'! Gostaria de agendar um horário ('+(t==='estetica'?'Estética':'Podologia')+').\n\nNome: '+n.value.trim()+'\nWhatsApp: '+w.value+'\nServiço: '+s+'\nMelhor período: '+per;
  var url=p.n?'https://wa.me/'+p.n+'?text='+encodeURIComponent(msg):p.link;
  document.getElementById('wa').href=url;f.style.display='none';document.getElementById('ok').style.display='block';
  try{window.open(url,'_blank','noopener')}catch(x){}
});
})();
