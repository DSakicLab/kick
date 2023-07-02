//INITIALIZING FUNCTION CALL
function check0(){
//READ FROM FORM
    var lines = $('#links').val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }
//REPORTING VARIABLE DEMO
demo = [];
demo1 = [];
demo2 = [];


//READ PARAMETERS & SET-UP
var param = Number(document.parameters0.oneNo.value);
var counter = 1;
//var loopMax = 0;
//var minDist = Number(document.parameters.threeNo.value);

var error1 = 0;
var status = "OK";
var errorCounter = 10;
if (param < 0.1){
param = 0.1;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
var coorArrRad = [];
var coorArrF = [];
coorA.lenght = 0;
coorArrX.length = 0;
coorArrY.length = 0;
coorArrZ.length = 0;
coorArrF.length = 0;


//READ INPUT
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
coor.push(0);
coorA[i] = coor[0];
coorArrX[i] = Number(coor[1]);
coorArrY[i] = Number(coor[2]);
coorArrZ[i] = Number(coor[3]);
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+"<br>");
}

var newA = [];
var newX = [];
var newY = [];
var newZ = [];
var newRad = [];
var newF = [];
var newC = [];

var AllA = [];
var AllX = [];
var AllY = [];
var AllZ = [];
var AllRad = [];
var AllF = [];
var AllC = [];

var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6}; 


for (i=0; i < texts.length; i++) { 
coorArrRad[i]=covRadius[coorA[i]];
}


var bond1 = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond1[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(coorArrRad[i]+coorArrRad[k]);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond1[i].push(k);
}
}
}
}

var atoms = [];
for (var i=0; i < texts.length; i++) {
atoms[i] = {elem: coorA[i], x: coorArrX[i], y: coorArrY[i], z: coorArrZ[i], bonds: bond1[i], resi: 0};
demo += ("<br>"+i+"  "+atoms[i].elem+" "+atoms[i].x+" "+atoms[i].y+" "+atoms[i].z+" "+atoms[i].bonds);
}

//count loop
for (count=0;count < counter ;count++){

demo += ("<br>");

for (i=0; i < texts.length; i++) { 
newRad[i]=covRadius[coorA[i]];
newF[i]=i;
newC[i]=count;
}

for (var i=0; i < texts.length; i++) {
var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param) + covRadius[coorA[i]];
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;

var dx = vectorX;
var dy = vectorY;
var dz = vectorZ;

newA[i] = coorA[i];
newX[i] = coorArrX[i]+dx;
newY[i] = coorArrY[i]+dy;
newZ[i] = coorArrZ[i]+dz;
}

var min_dist = 0;
var err = 0;

demo += ("<br>"+"Kick DONE"+"<br>");

//demo += ("Atom distances between atoms:"+"");
//DISTANCE CALCULATION
var dist = [];
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.2*(newRad[i]+newRad[k]);
var bondlengthBAD = 0.8*(newRad[i]+newRad[k]);
dist.push(somedist);
//demo += (i+" "+k+" ");
//demo += somedist;
//demo += (" "+bondlengthOK+" ");
if (somedist <= bondlengthBAD){
demo += (" SMALL DISTANCE ERROR ");
err++;
} 
}
//demo += ("<br>");
}

if (err != "0"){
	min_dist = 1;
	err = 0;
}

if (min_dist == "1") {
error1++;
status = "BAD";
count = count-1;
demo += ("SMALL DISTANCE No "+error1+"<br>");
} else {
status= "OK";
demo += ("  OK!<br>");
for (i=0; i < texts.length; i++){
AllA.push(newA[i]);
AllX.push(newX[i]);
AllY.push(newY[i]);
AllZ.push(newZ[i]);
AllRad.push(newRad[i]);
AllF.push(newF[i]);
AllC.push(newC[i]); 
demo += (newA[i]+" "+newX[i]+" "+newY[i]+" "+newZ[i]+" radius:"+newRad[i]+" frag: "+newF[i]+" count: "+newC[i]+"<br>");
}
}


demo += ("<br>");

//finish counter
}

demo += ("<br>"+"<strong>STRUCTURES:</strong>"+"<br>");
for (no=0; no < counter; no++){
	var no1 = no +1;
demo2 += (texts.length+"<br>");
demo2 += ("Structure: "+no1+"<br>");
for (i=0; i < AllA.length; i++){
if (AllC[i] == no){
demo2 += (AllA[i]+" "+AllX[i]+" "+AllY[i]+" "+AllZ[i]+" "+"<br>");
}
}
demo2 += ("<br>");
}

var bond = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((AllX[i]-AllX[k]),2);
var y2 = Math.pow((AllY[i]-AllY[k]),2);
var z2 = Math.pow((AllZ[i]-AllZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(AllRad[i]+AllRad[k]);
var bondlengthBAD = 0.8*(AllRad[i]+AllRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond[i].push(k);
}
}
}
}

var atomsAll = [];
//demo1 += ("<br>");
for (var i=0; i < texts.length; i++) {
atomsAll[i]={elem: AllA[i],x: AllX[i], y: AllY[i], z: AllZ[i], bonds: bond[i]};
}

$(function() {
  let element = $('#container-02');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


$(function() {
  let element = $('#container-01');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.2,color:"#ffff00"},stick:{radius:0.15,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});

document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;
//end function call
}

//INITIALIZING FUNCTION CALL
function check1(){
//READ FROM FORM
    var lines = $('#links').val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }
//REPORTING VARIABLE DEMO
demo = [];
demo1 = [];
demo2 = [];


//READ PARAMETERS & SET-UP
var param = Number(document.parameters1.oneNo.value);
var counter = 1;
var loopMax = Number(document.parameters1.threeNo.value);
//var minDist = Number(document.parameters.threeNo.value);

var error1 = 0;
var status = "OK";
var errorCounter = 10;
if (param < 0.1){
param = 0.1;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
var coorArrRad = [];
var coorArrF = [];
coorA.lenght = 0;
coorArrX.length = 0;
coorArrY.length = 0;
coorArrZ.length = 0;
coorArrF.length = 0;


//READ INPUT
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
coor.push(0);
coorA[i] = coor[0];
coorArrX[i] = Number(coor[1]);
coorArrY[i] = Number(coor[2]);
coorArrZ[i] = Number(coor[3]);
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+"<br>");
}

var newA = [];
var newX = [];
var newY = [];
var newZ = [];
var newRad = [];
var newF = [];
var newC = [];

var AllA = [];
var AllX = [];
var AllY = [];
var AllZ = [];
var AllRad = [];
var AllF = [];
var AllC = [];

var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6}; 


for (i=0; i < texts.length; i++) { 
coorArrRad[i]=covRadius[coorA[i]];
}


var bond1 = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond1[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(coorArrRad[i]+coorArrRad[k]);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond1[i].push(k);
}
}
}
}

var atoms = [];
for (var i=0; i < texts.length; i++) {
atoms[i] = {elem: coorA[i], x: coorArrX[i], y: coorArrY[i], z: coorArrZ[i], bonds: bond1[i], resi: 0};
demo += ("<br>"+i+"  "+atoms[i].elem+" "+atoms[i].x+" "+atoms[i].y+" "+atoms[i].z+" "+atoms[i].bonds);
}

//count loop
for (count=0;count < counter ;count++){

demo += ("<br>");

for (i=0; i < texts.length; i++) { 
newRad[i]=covRadius[coorA[i]];
newF[i]=i;
newC[i]=count;
}

for (var i=0; i < texts.length; i++) {
var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param) + covRadius[coorA[i]];
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;

var dx = vectorX;
var dy = vectorY;
var dz = vectorZ;

newA[i] = coorA[i];
newX[i] = coorArrX[i]+dx;
newY[i] = coorArrY[i]+dy;
newZ[i] = coorArrZ[i]+dz;
}

var min_dist = 0;
var err = 0;
var loop = loopMax;
demo += ("<br>"+"Kick DONE"+"<br>");
var coalescence=0;
while (coalescence==0){
//demo += ("Atom distances between atoms:"+"");
//DISTANCE CALCULATION
var dist = [];
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.2*(newRad[i]+newRad[k]);
var bondlengthBAD = 0.8*(newRad[i]+newRad[k]);
dist.push(somedist);
//demo += (i+" "+k+" ");
//demo += somedist;
//demo += (" "+bondlengthOK+" ");
if (somedist <= bondlengthBAD){
demo += (" SMALL DISTANCE ERROR ");
err++
break
coalescence=1;
} else {
if (somedist <= bondlengthOK){
//demo += ("Atom "+k+" in fragment: "+newF[k]+" is moved to fragment: "+newF[i]);
newF[k]=newF[i];
//loop if error till this condition is met! problem
}
}
//demo += ("<br>");
}
}


function average(p,c,i,a){return p + (c/a.length)};
var totalcentarx = newX.reduce(average,0);
var totalcentary = newY.reduce(average,0);
var totalcentarz = newZ.reduce(average,0);
//demo += ("<br>"+"totalcentar: "+totalcentarx+" "+totalcentary+" "+totalcentarz+"<br>");

var fragX = [];
var fragY = [];
var fragZ = [];
for (var l=0; l < texts.length; l++) {
fragX[l] = [];
fragX[l].length = 0;
fragY[l] = [];
fragY[l].length = 0;
fragZ[l] = [];
fragZ[l].length = 0;
for (var i=0; i < texts.length; i++) {
if (newF[i] == l){
fragX[l].push(newX[i]);
fragY[l].push(newY[i]);
fragZ[l].push(newZ[i]);
}
}
}

var fragXcentar = [];
var fragYcentar = [];
var fragZcentar = [];
for (var m=0; m < texts.length; m++) {
fragXcentar.push(fragX[m].reduce(average,0));
fragYcentar.push(fragY[m].reduce(average,0));
fragZcentar.push(fragZ[m].reduce(average,0));
//demo += ("Frag: "+m+" x: "+fragXcentar[m]+" y: "+fragYcentar[m]+" z: "+fragZcentar[m]+"<br>");
}

var deltaX = [];
var deltaY = [];
var deltaZ = [];
for (var m=0; m < texts.length; m++) {
var vx=totalcentarx-fragXcentar[m];
var vy=totalcentary-fragYcentar[m];
var vz=totalcentarz-fragZcentar[m];
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
deltaX[m]=(0.1+param/loopMax)*(vx/vecnorm); //step of 0.1 a.u. + param/loop in total
deltaY[m]=(0.1+param/loopMax)*(vy/vecnorm);
deltaZ[m]=(0.1+param/loopMax)*(vz/vecnorm);
}

var loop1 = loopMax - loop;
function countUnique(iterable) {
  return new Set(iterable).size;
}
var fragCount = countUnique(newF);
demo += ("Loop Number "+loop1+"   Number of fragments "+fragCount+"<br>");

for (i=0; i < texts.length; i++) { 
for (m=0; m < texts.length; m++) {
if (newF[i] == m) {
if (fragCount != "1") {
newX[i] = newX[i] + deltaX[m];
newY[i] = newY[i] + deltaY[m];
newZ[i] = newZ[i] + deltaZ[m];
}
}	
}
}

if (err != "0"){
coalescence = 1
}


loop--;
if (loop == 1){  
	coalescence = 1; //coalesce achieved; exit coalesce loop  <br>
	demo += ("Loop ended "+coalescence+"<br>");
} 

if (fragCount <= 1){  
	coalescence = 1; //coalesce achieved; exit coalesce loop  <br>
	demo += ("Coalescence "+coalescence+"<br>");
} 

//coalescence loop end
}

if (err != "0"){
	min_dist = 1;
	err = 0;
}

if (min_dist == "1") {
error1++;
status = "BAD";
count = count-1;
demo += ("SMALL DISTANCE No "+error1+"<br>");
} else {
status= "OK";
demo += ("  OK!<br>");
for (i=0; i < texts.length; i++){
AllA.push(newA[i]);
AllX.push(newX[i]);
AllY.push(newY[i]);
AllZ.push(newZ[i]);
AllRad.push(newRad[i]);
AllF.push(newF[i]);
AllC.push(newC[i]); 
demo += (newA[i]+" "+newX[i]+" "+newY[i]+" "+newZ[i]+" radius:"+newRad[i]+" frag: "+newF[i]+" count: "+newC[i]+"<br>");
}
}


demo += ("<br>");
//set initial number of fragments to number of atoms 
var fragCount = texts.length; 

//finish counter
}

demo += ("<br>"+"<strong>STRUCTURES:</strong>"+"<br>");
for (no=0; no < counter; no++){
	var no1 = no +1;
demo2 += (texts.length+"<br>");
demo2 += ("Structure: "+no1+"<br>");
for (i=0; i < AllA.length; i++){
if (AllC[i] == no){
demo2 += (AllA[i]+" "+AllX[i]+" "+AllY[i]+" "+AllZ[i]+" "+"<br>");
}
}
demo2 += ("<br>");
}

var bond = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((AllX[i]-AllX[k]),2);
var y2 = Math.pow((AllY[i]-AllY[k]),2);
var z2 = Math.pow((AllZ[i]-AllZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(AllRad[i]+AllRad[k]);
var bondlengthBAD = 0.8*(AllRad[i]+AllRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond[i].push(k);
}
}
}
}

var atomsAll = [];
//demo1 += ("<br>");
for (var i=0; i < texts.length; i++) {
atomsAll[i]={elem: AllA[i],x: AllX[i], y: AllY[i], z: AllZ[i], bonds: bond[i]};
}

$(function() {
  let element = $('#container-04');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


$(function() {
  let element = $('#container-03');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.2,color:"#ffff00"},stick:{radius:0.15,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});

document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;
//end function call
}

//INITIALIZING FUNCTION CALL
function check2(){
//READ FROM FORM
    var lines = $('#links').val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }
//REPORTING VARIABLE DEMO
demo = [];
demo1 = [];
demo2 = [];


//READ PARAMETERS & SET-UP
var param = Number(document.parameters2.oneNo.value);
var counter = 1;
//var minDist = Number(document.parameters2.threeNo.value);

var error1 = 0;
var status = "OK";
var errorCounter = 15;
if (param < 0.1){
param = 0.1;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
var coorArrF = [];
var coorArrRad = [];
coorA.lenght = 0;
coorArrX.length = 0;
coorArrY.length = 0;
coorArrZ.length = 0;
coorArrF.length = 0;


//READ INPUT
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
coor.push(0);
coorA[i] = coor[0];
coorArrX[i] = Number(coor[1]);
coorArrY[i] = Number(coor[2]);
coorArrZ[i] = Number(coor[3]);
coorArrF[i] = Number(coor[5]);
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+" Frag"+coorArrF[i]+"<br>");
}

demo += ("<br>");


//demo1 += ("<br>"+"TEST FILE (.xyz)"+"<br>");

var noatoms = counter*texts.length;
//demo1 += ("<br>"+noatoms+"<br>"+"TEST.xyz"+"<br>");


var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6}; 


for (i=0; i < texts.length; i++) { 
coorArrRad[i]=covRadius[coorA[i]];
}


var bond1 = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond1[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(coorArrRad[i]+coorArrRad[k]);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond1[i].push(k);
}
}
}
}

var atoms = [];
for (var i=0; i < texts.length; i++) {
atoms[i] = {elem: coorA[i], x: coorArrX[i], y: coorArrY[i], z: coorArrZ[i], bonds: bond1[i], resi: 0};
demo += ("<br>"+i+"  "+atoms[i].elem+" "+atoms[i].x+" "+atoms[i].y+" "+atoms[i].z+" "+atoms[i].bonds);
}


AtomsElem = [];
AtomsX = [];
AtomsY = [];
AtomsZ = [];
AtomsFrag = [];
AtomsCount = [];
AtomsBonds = [];
AtomsRad = [];

demo += ("<br>"+"<br>"+"<strong> COUNTER FUNCTION </strong>"+"<br>"+"<br>");
//COUNTER FUNCTION- MAIN FUNCTION
for (var count=0; count < counter; count++) {
if (error1 == errorCounter ) {
error1 = 0;
param = param + 0.1*param;
demo += ("Parameter adjusted to: "+param+"<br>");
}
var count1 = count+1;
demo += ("COUNT "+count1+" TAKE "+error1+"<br>");

//RANDOM VECTOR

var newA = [];
var newX = [];
var newY = [];
var newZ = [];

for (var i=0; i < texts.length; i++) {
  if (coorArrF[i] != 0) {
var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param) + 0.00001;
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;

var dx = vectorX;
var dy = vectorY;
var dz = vectorZ;

newA[i] = coorA[i];
newX[i] = coorArrX[i]+dx;
newY[i] = coorArrY[i]+dy;
newZ[i] = coorArrZ[i]+dz;
} else {
newA[i] = coorA[i];
newX[i] = coorArrX[i];
newY[i] = coorArrY[i];
newZ[i] = coorArrZ[i];
}
}


//DISTANCE CALCULATION
checkpoint3 = 1;
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthBAD) {
error1++;
status = "BAD";
count = -1;
demo += ("    SMALL DISTANCE No "+error1+"<br>");
checkpoint3 = 0;
} else {
demo += ("OK "+newA[i]+" "+newA[k]+" dist:"+somedist+" CovalentDist(80%):"+bondlengthBAD+"<br>");
}
}
}

if (checkpoint3 == 1) {
status = "OK";
demo2 += ("<br>"+texts.length+"<br>"); 
demo2 += ("Structure: "+count1+" "+status+"<br>");
for (i=0; i < texts.length; i++) {
AtomsElem.push(newA[i]);
AtomsX.push(newX[i]);
AtomsY.push(newY[i]);
AtomsZ.push(newZ[i]);
AtomsCount.push(count);
AtomsRad.push(coorArrRad[i]);
demo2 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+"<br>");
}
}


demo += ("<br>");
}

//END OF COUNTER FUNCTION



//CALCULATE INSIDE FRAGMENT BONDS FOR TEST.xyz AND VISUALIZATION

var bond = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((AtomsX[i]-AtomsX[k]),2);
var y2 = Math.pow((AtomsY[i]-AtomsY[k]),2);
var z2 = Math.pow((AtomsZ[i]-AtomsZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(AtomsRad[i]+AtomsRad[k]);
var bondlengthBAD = 0.8*(AtomsRad[i]+AtomsRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond[i].push(k);
}
}
}
}

var atomsAll = [];
//demo1 += ("FINAL"+"<br>");
for (var i=0; i < texts.length; i++) {
atomsAll[i]={elem: AtomsElem[i],x: AtomsX[i], y: AtomsY[i], z: AtomsZ[i], bonds: bond[i]};
demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+" "+bond[i]+"<br>");
}

demo += ("<br>"+"<strong> COUNTER FUNCTION END - SCRIPT FINISHED </strong>"+"<br>"+"<br>");

//FINALIZATION OF CALL FUNCTION
demo += ("<br>");
//PRINTING REPORTING VARIABLE DEMO
demo += ("<br>"+"DONE"+"<br>"+"Good luck!"+"<br>"+"Don't forget to cite!"+"<br>");


document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;

$(function() {
  let element = $('#container-06');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


$(function() {
  let element = $('#container-05');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.25,color:"#ffff00"},stick:{radius:0.20,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});


}	

function check3(){
    var lines = $('#links').val().split(/\n/);
    var texts = []
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }

var demo = [];
var demo1 = [];
var demo2 = [];

var param = Number(document.parameters3.oneNo.value);
var counter = 1;
//var minDist = 0.1;
var error1 = 0;
var errorCounter = Number(counter*5);
if (param < 1){
param = 1.0;
}

var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
var coorArrF = [];
var coorArrRad = [];
coorA.lenght = 0;
coorArrX.length = 0;
coorArrY.length = 0;
coorArrZ.length = 0;
coorArrF.length = 0;

//READ INPUT
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
coor.push(0);
coorA[i] = coor[0];
coorArrX[i] = Number(coor[1]);
coorArrY[i] = Number(coor[2]);
coorArrZ[i] = Number(coor[3]);
coorArrF[i] = Number(coor[6]);
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+" "+"<br>");
//end for i
}

demo += ("<br>");

function countUnique(iterable) {
  return new Set(iterable).size;
}
var fragCount = countUnique(coorArrF) - 1;

//DEFINE NUMBER OF ATOMS IN FRAGMENT
//FINDING CENTER OF EACH FRAGMENT
var sumcentarx = [];
var sumcentary = [];
var sumcentarz = [];
var atomsInFrag = [];
for (var i=0; i < texts.length; i++) {
for (var m=0; m <= fragCount; m++) {
sumcentarx.push(0);
sumcentary.push(0);
sumcentarz.push(0);
atomsInFrag.push(0);
if (coorArrF[i] == m) {
sumcentarx[m] = sumcentarx[m]+coorArrX[i];
sumcentary[m] = sumcentary[m]+coorArrY[i];
sumcentarz[m] = sumcentarz[m]+coorArrZ[i];
atomsInFrag[m] = atomsInFrag[m]+1;
}
}
}
var centarx = [];
var centary = [];
var centarz = [];
for (var m=0; m <= fragCount; m++) {
centarx[m] = sumcentarx[m] / atomsInFrag[m] ;
centary[m] = sumcentary[m] / atomsInFrag[m] ;
centarz[m] = sumcentarz[m] / atomsInFrag[m] ;
}


demo1 += ("<br>"+"TEST FILE (.xyz)"+"<br>");

var noatoms = atomsInFrag[0];
for (var m=1; m <= fragCount; m++) { 
noatoms = noatoms + counter*(atomsInFrag[m]);
}

demo1 += ("<br>"+noatoms+"<br>"+"TEST.xyz"+"<br>");

var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6}; 


for (i=0; i < texts.length; i++) { 
coorArrRad[i]=covRadius[coorA[i]];
}


var bond1 = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond1[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(coorArrRad[i]+coorArrRad[k]);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond1[i].push(k);
}
}
}
}

var atoms = [];
for (var i=0; i < texts.length; i++) {
atoms[i] = {elem: coorA[i], x: coorArrX[i], y: coorArrY[i], z: coorArrZ[i], bonds: bond1[i], resi: 0};
demo += ("<br>"+i+"  "+atoms[i].elem+" "+atoms[i].x+" "+atoms[i].y+" "+atoms[i].z+" "+atoms[i].bonds);
}

AtomsElem = [];
AtomsX = [];
AtomsY = [];
AtomsZ = [];
AtomsFrag = [];
AtomsCount = [];
AtomsBonds = [];
AtomsRad = [];


demo += ("<br>"+"<br>"+"<strong> COUNTER FUNCTION </strong>"+"<br>"+"<br>");
//COUNTER FUNCTION- MAIN FUNCTION
for (var count=0; count < counter; count++) {
if (error1 == errorCounter ) {
error1 = 0;
param = param + 0.1*param;
demo += ("Parameter adjusted to: "+param+"<br>");
}
var count1 = count+1;

var fragDx = [];
var fragDy = [];
var fragDz = [];

fragDx[0] = 0;
fragDy[0] = 0;
fragDz[0] = 0;

//VECTOR FOR THE FRAGMENT
for (var m=1; m <= fragCount; m++) {
var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param) + 0.1;
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;
//VECTOR IN ARRAY OF VECTORS
var dx = vectorX;
var dy = vectorY;
var dz = vectorZ;
fragDx[m] = dx;
fragDy[m] = dy;
fragDz[m] = dz;
}

//NEW FRAGMENT COORDINATES (without rotation)
var newA = [];
var newX = [];
var newY = [];
var newZ = [];
var sumcentarx = [];
var sumcentary = [];
var sumcentarz = [];
var atomsInFrag = [];

demo += ("New position in space:"+"<br>");
for (var i=0; i < texts.length; i++) {
for (var m=0; m <= fragCount; m++) {
if (Number(coorArrF[i]) == m) {
var ada = coorA[i];
var xdx = Number(coorArrX[i]) + fragDx[m];
var ydy = Number(coorArrY[i]) + fragDy[m];
var zdz = Number(coorArrZ[i]) + fragDz[m];
newA.push(ada);
newX.push(xdx);
newY.push(ydy);
newZ.push(zdz);
demo += ("&emsp;&emsp;"+i+" "+newA[i]+" "+newX[i]+" "+newY[i]+" "+newZ[i]+"<br>");
}
}
}


//FINDING CENTER OF FRAGMENT

for (var m=0; m <= fragCount; m++) {
sumcentarx.push(0);
sumcentary.push(0);
sumcentarz.push(0);
atomsInFrag.push(0);
for (var i=0; i < texts.length; i++) {
if (Number(coorArrF[i]) == m) {
sumcentarx[m] = sumcentarx[m]+newX[i];
sumcentarx[m] = sumcentary[m]+newY[i];
sumcentarz[m] = sumcentarz[m]+newZ[i];
atomsInFrag[m] = atomsInFrag[m]+1;
}
}
}
var centarx = [];
var centary = [];
var centarz = [];
for (var m=0; m <= fragCount; m++) {
centarx[m] = sumcentarx[m] / atomsInFrag[m];
centary[m] = sumcentary[m] / atomsInFrag[m];
centarz[m] = sumcentarz[m] / atomsInFrag[m];
//demo += ("Atoms in fragment "+m+" = "+atomsInFrag[m]+"<br>");
}


//ROTATION

function Vector(optional) { 
    if (optional) {
        this.x = optional.x
        this.y = optional.y
        this.z = optional.z
        this.w = optional.w
    } else {
        this.x = 0
        this.y = 0
        this.z = 0
        this.w = 0
    }
}

Vector.prototype.QuaternionMultiply = function(vectorB) {
    var out = new Vector();
    out.w = this.w*vectorB.w - this.x*vectorB.x - this.y*vectorB.y - this.z*vectorB.z;
    out.x = this.w*vectorB.x + this.x*vectorB.w + this.y*vectorB.z - this.z*vectorB.y;
    out.y = this.w*vectorB.y - this.x*vectorB.z + this.y*vectorB.w + this.z*vectorB.x;
    out.z = this.w*vectorB.z + this.x*vectorB.y - this.y*vectorB.x + this.z*vectorB.w;
    this.x = out.x;
    this.y = out.y;
    this.z = out.z;
    this.w = out.w;
}

Vector.prototype.rotate = function (inputaxis, inputangle) 
{
    var vector = new Vector(this);
    vector.w = 0;

    var axis = new Vector({ 
      x: inputaxis.x * Math.sin(inputangle/2),     
      y: inputaxis.y * Math.sin(inputangle/2),     
      z: inputaxis.z * Math.sin(inputangle/2),     
      w: Math.cos(inputangle/2)} 
      );

    var axisInv = new Vector({ x: -axis.x, y: -axis.y, z: -axis.z, w: axis.w}  );

    axis.QuaternionMultiply(vector);
    axis.QuaternionMultiply(axisInv);

    this.x = axis.x.toFixed(5);
    this.y = axis.y.toFixed(5);
    this.z = axis.z.toFixed(5);
}

Vector.prototype.length = function () {
  var length = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );  
  return length;
}

Vector.prototype.scale = function (scale) { 
  this.x *= scale
  this.y *= scale
  this.z *= scale
}

Vector.prototype.normalize = function() {
  //scales a vector back to a unit vector. It will have a length of 1

  var lengthval = this.length()

  if (lengthval != 0) {
    this.x /= lengthval;
    this.y /= lengthval;
    this.z /= lengthval; 
    return true 
  } else { 
    return false
  }
}

var point = [];
var pointlength = [];
var newXr = [];
var newYr = [];
var newZr = [];

for (var m=1; m <= fragCount; m++) {

var axisB = new Vector({  x: (Math.random())*2-1,  y: (Math.random())*2-1,  z: (Math.random())*2-1,  w: 0 });
//var angleC = Math.random()*Math.PI/2;
var angleC = Math.PI/2;
//var angleC = Math.PI/(Math.random()*2);
axisB.normalize();
var duz_axisB = axisB.length();
//demo += ("axisB "+ axisB.x.toFixed(5) + " " +axisB.y.toFixed(5)+" "+axisB.z.toFixed(5)+" "+axisB.length().toFixed(1)+"<br>");
//demo += ("angleC "+ angleC.toFixed(5) + "<br>");

demo += ("Radnom rotation of fragment in position:"+"<br>");

for (var i=0; i < texts.length; i++) {
if (Number(coorArrF[i]) == m) {
point[i] = new Vector({ x: newX[i]-centarx[m],  y: newY[i]-centary[m],  z: newZ[i]-centarz[m],  w: 0 });
pointlength[i]= point[i].length();
//demo += ("point"+i+" "+ point[i].x + " " +point[i].y+" "+point[i].z+" lenght "+pointlength[i]+"<br>");
point[i].normalize();
//demo += ("point"+i+" "+ point[i].x + " " +point[i].y+" "+point[i].z+" lenght "+point[i].length()+"<br>");

point[i].rotate(axisB, angleC);

point[i].scale(pointlength[i]);


//newXr[i]= point[i].x+centarx[m];
//newYr[i]= point[i].y+centary[m];
//newZr[i]= point[i].z+centarz[m];

newX[i]= point[i].x+centarx[m];
newY[i]= point[i].y+centary[m];
newZ[i]= point[i].z+centarz[m];

demo += ("&emsp;&emsp;"+newA[i] +" "+ newX[i] + " " +newY[i]+" "+newZ[i]+"<br>");
}
}
}
//END ROTATION


//DISTANCE CALCULATION
checkpoint4 = 1;
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthBAD) {
error1++;
status = "BAD";
count = -1;
demo += ("    SMALL DISTANCE No "+error1+"<br>");
checkpoint4 = 0;
} else {
demo += ("OK "+newA[i]+" "+newA[k]+" dist:"+somedist+" CovalentDist(80%):"+bondlengthBAD+"<br>");
}
}
}

if (checkpoint4 == 1) {
status = "OK";
demo2 += ("<br>"+texts.length+"<br>"); 
demo2 += ("Structure: "+count1+" "+status+"<br>");
for (i=0; i < texts.length; i++) {
AtomsElem.push(newA[i]);
AtomsX.push(newX[i]);
AtomsY.push(newY[i]);
AtomsZ.push(newZ[i]);
AtomsCount.push(count);
AtomsRad.push(coorArrRad[i]);
demo2 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+"<br>");
}
}

} //end counter function

//CALCULATE INSIDE FRAGMENT BONDS FOR TEST.xyz AND VISUALIZATION

var bond = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
		if (coorArrF[i] == coorArrF[k]){
var x2 = Math.pow((AtomsX[i]-AtomsX[k]),2);
var y2 = Math.pow((AtomsY[i]-AtomsY[k]),2);
var z2 = Math.pow((AtomsZ[i]-AtomsZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(AtomsRad[i]+AtomsRad[k]);
var bondlengthBAD = 0.8*(AtomsRad[i]+AtomsRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond[i].push(k);
}
}
}
}
}

var atomsAll = [];
//demo1 += ("FINAL"+"<br>");
for (var i=0; i < texts.length; i++) {
atomsAll[i]={elem: AtomsElem[i],x: AtomsX[i], y: AtomsY[i], z: AtomsZ[i], bonds: bond[i]};
demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+" "+bond[i]+"<br>");
}

demo += ("<br>"+"<strong> COUNTER FUNCTION END - SCRIPT FINISHED </strong>"+"<br>"+"<br>");

//FINALIZATION OF CALL FUNCTION
demo += ("<br>");
//PRINTING REPORTING VARIABLE DEMO
demo += ("<br>"+"DONE"+"<br>"+"Good luck!"+"<br>"+"Don't forget to cite!"+"<br>");


document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;

$(function() {
  let element = $('#container-08');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


$(function() {
  let element = $('#container-07');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.20,color:"#ffff00"},stick:{radius:0.15,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});


} //end function call

function check4(){
//READ FROM FORM
    var lines = $('#links').val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }
//REPORTING VARIABLE DEMO
demo = [];
demo1 = [];
demo2 = [];


//READ PARAMETERS & SET-UP
var param = Number(document.parameters4.oneNo.value);
var counter = 1;
var error1 = 0;
var status = "OK";
var errorCounter = 10;
if (param < 1){
param = 1.0;
}
// GENREAL FUNCTIONS
//ROTATION
function Vector(optional) { 
    if (optional) {
        this.x = optional.x
        this.y = optional.y
        this.z = optional.z
        this.w = optional.w
    } else {
        this.x = 0
        this.y = 0
        this.z = 0
        this.w = 0
    }
}

Vector.prototype.QuaternionMultiply = function(vectorB) {
    var out = new Vector();
    out.w = this.w*vectorB.w - this.x*vectorB.x - this.y*vectorB.y - this.z*vectorB.z;
    out.x = this.w*vectorB.x + this.x*vectorB.w + this.y*vectorB.z - this.z*vectorB.y;
    out.y = this.w*vectorB.y - this.x*vectorB.z + this.y*vectorB.w + this.z*vectorB.x;
    out.z = this.w*vectorB.z + this.x*vectorB.y - this.y*vectorB.x + this.z*vectorB.w;
    this.x = out.x;
    this.y = out.y;
    this.z = out.z;
    this.w = out.w;
}

Vector.prototype.rotate = function (inputaxis, inputangle) 
{
    var vector = new Vector(this);
    vector.w = 0;

    var axis = new Vector({ 
      x: inputaxis.x * Math.sin(inputangle/2),     
      y: inputaxis.y * Math.sin(inputangle/2),     
      z: inputaxis.z * Math.sin(inputangle/2),     
      w: Math.cos(inputangle/2)} 
      );

    var axisInv = new Vector({ x: -axis.x, y: -axis.y, z: -axis.z, w: axis.w}  );

    axis.QuaternionMultiply(vector);
    axis.QuaternionMultiply(axisInv);

    this.x = axis.x.toFixed(5);
    this.y = axis.y.toFixed(5);
    this.z = axis.z.toFixed(5);
}

Vector.prototype.length = function () {
  var length = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );  
  return length;
}

Vector.prototype.scale = function (scale) { 
  this.x *= scale
  this.y *= scale
  this.z *= scale
}

Vector.prototype.normalize = function() {
  //scales a vector back to a unit vector. It will have a length of 1

  var lengthval = this.length()

  if (lengthval != 0) {
    this.x /= lengthval;
    this.y /= lengthval;
    this.z /= lengthval; 
    return true 
  } else { 
    return false
  }
}

function countUnique(iterable) {
  return new Set(iterable).size;
}

function average(p,c,i,a){return p + (c/a.length)};

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
var coorArrF = [];
var coorArrRad = [];
coorA.lenght = 0;
coorArrX.length = 0;
coorArrY.length = 0;
coorArrZ.length = 0;
coorArrF.length = 0;
coorArrRad.length = 0;

//READ INPUT
var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6}; 

demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
coor.push(0);
coorA[i] = coor[0];
coorArrX[i] = Number(coor[1]);
coorArrY[i] = Number(coor[2]);
coorArrZ[i] = Number(coor[3]);
coorArrF[i] = Number(coor[6]);
coorArrRad[i] = covRadius[coorA[i]];
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+" Frag:"+coorArrF[i]+" CovRad:"+coorArrRad[i]+"<br>");
}

demo += ("<br>");

var fragCount = countUnique(coorArrF);

demo += ("<br>"+"Fragment Count: "+fragCount+"<br>");

var dist = [];
var bond1 = [];
//demo += ("<br>");
for (var i=0; i < texts.length; i++) {
	bond1[i]=new Array();
for (var k=0; k < texts.length; k++) {
	if (i != k ) {
		if (coorArrF[i] == coorArrF[k]){
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(coorArrRad[i]+coorArrRad[k]);
var bondlengthBAD = 0.8*(coorArrRad[i]+coorArrRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond1[i].push(k);
dist.push(somedist);
}
}
}
}
}


//ADDING MINIMAL DISTANCE AS AN AVERAGE OF BOND LENGHTS IN FRAGMENTS
var min_dist=dist.reduce(average,0);
demo += ("<br>"+"Minimal distance as an average of bonds inside fragments: "+min_dist+"<br>");

var atoms = [];
for (var i=0; i < texts.length; i++) {
atoms[i] = {elem: coorA[i], x: coorArrX[i], y: coorArrY[i], z: coorArrZ[i], bonds: bond1[i], resi: 0};
demo += ("<br>"+i+"  "+atoms[i].elem+" "+atoms[i].x+" "+atoms[i].y+" "+atoms[i].z+" "+atoms[i].bonds);
}

demo += ("<br>");

AtomsElem = [];
AtomsX = [];
AtomsY = [];
AtomsZ = [];
AtomsF = [];
AtomsFrag = [];
AtomsCount = [];
AtomsBonds = [];
AtomsRad = [];

var atomsInFrag = [];
var fragX = [];
var fragY = [];
var fragZ = [];
for (var m=0; m < fragCount; m++) {
atomsInFrag[m]=0;
fragX[m] = [];
fragY[m] = [];
fragZ[m] = [];
for (var i=0; i < texts.length; i++) {
if (coorArrF[i] == m){
atomsInFrag[m] = atomsInFrag[m] +1;
fragX[m].push(coorArrX[i]);
fragY[m].push(coorArrY[i]);
fragZ[m].push(coorArrZ[i]);
}
}
}

demo += ("<br>");

var fragXcentar = [];
var fragYcentar = [];
var fragZcentar = [];
for (var m=0; m < fragCount; m++) {
fragXcentar.push(fragX[m].reduce(average,0));
fragYcentar.push(fragY[m].reduce(average,0));
fragZcentar.push(fragZ[m].reduce(average,0));
demo += ("fragment-center: "+m+" x: "+fragXcentar[m]+" y: "+fragYcentar[m]+" z: "+fragZcentar[m]+"<br>");
}

var relA = [];
var relX = [];
var relY = [];
var relZ = [];
var relF = [];
var relRad = [];
for (var m=0; m < fragCount; m++) {
demo += ("&emsp;Fragment "+m+"<br>");
for (var i=0; i < texts.length; i++) {
if (coorArrF[i] == m) {
var ada = coorA[i];
var xdx = (coorArrX[i]) - fragXcentar[m] + 0.00001;
var ydy = (coorArrY[i]) - fragYcentar[m] + 0.00001;
var zdz = (coorArrZ[i]) - fragZcentar[m] + 0.00001;
relA.push(ada);
relX.push(xdx);
relY.push(ydy);
relZ.push(zdz);
relF.push(coorArrF[i]);
relRad.push(coorArrRad[i]);
demo += ("&emsp;&emsp;"+relA[i]+" "+relX[i]+" "+relY[i]+" "+relZ[i]+"<br>");
}
}
}
demo += ("<br>");


//COUNTER FUNCTION- MAIN FUNCTION
for (var count=0; count < counter; count++) {

var count1 = count+1;
demo += ("COUNT "+count1+" TAKE "+error1+"<br>");

//random atom and vector selection
var AllAtomsFragm = [];
AllAtomsFragm[0] = 0;
var RandomAtom = [];
RandomAtom[0] = 0;
var fragDx = [];
var fragDy = [];
var fragDz = [];
for (var m=1; m < fragCount; m++) {
//random atom selection
AllAtomsFragm[m] = atomsInFrag[m-1] + AllAtomsFragm[m-1];
demo += ("Random fragment "+m+" => Total No of atoms to choose "+AllAtomsFragm[m]);
RandomAtom[m] = Math.floor(Math.random() * AllAtomsFragm[m]);
demo += (" => Chosen random atom "+RandomAtom[m]+" "+relA[RandomAtom[m]]+"<br>");
//random vector
var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param)+min_dist;
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;
//VECTOR IN ARRAY OF VECTORS
fragDx[m] = vectorX;
fragDy[m] = vectorY;
fragDz[m] = vectorZ;
demo += ("Chosen random vector for fragment: "+m+"; x: "+fragDx[m]+"; y: "+fragDy[m]+"; z: "+fragDz[m]+" "+"<br>");
}

//rotation of fragments
var point = [];
var pointlength = [];
demo += ("Radnom rotation of fragment in position:"+"<br>");
for (var m=0; m < fragCount; m++) {
demo += ("&emsp;Fragment "+m+"<br>");
var axisB = new Vector({  x: (Math.random())*2-1,  y: (Math.random())*2-1,  z: (Math.random())*2-1,  w: 0 });
//var angleC = Math.random()*Math.PI/2;
var angleC = Math.PI/2;
//var angleC = Math.PI/(Math.random()*2);
axisB.normalize();
var duz_axisB = axisB.length();
//demo += ("axisB "+ axisB.x.toFixed(5) + " " +axisB.y.toFixed(5)+" "+axisB.z.toFixed(5)+" "+axisB.length().toFixed(1)+"<br>");
//demo += ("angleC "+ angleC.toFixed(5) + "<br>");
for (var i=0; i < texts.length; i++) {
if (Number(coorArrF[i]) == m) {
point[i] = new Vector({ x: relX[i],  y: relY[i],  z: relZ[i],  w: 0 });
pointlength[i]= point[i].length();
point[i].normalize();
point[i].rotate(axisB, angleC);
point[i].scale(pointlength[i]);
demo += ("&emsp;&emsp;"+relA[i] +" "+ point[i].x + " " +point[i].y+" "+point[i].z+"<br>");
}
}
}

var newA = [];
var newX = [];
var newY = [];
var newZ = [];
var newF = [];
var newC = [];
var newRad = [];

for (m=0; m < fragCount; m++) {
for (var i=0; i < texts.length; i++) {
if (relF[i] == 0) {
newA[i]=relA[i];
newX[i]=coorArrX[i];
newY[i]=coorArrY[i];
newZ[i]=coorArrZ[i];
newF[i]=relF[i];
newRad[i]=relRad[i];
}else{
newA[i]=relA[i];
newX[i]=newX[RandomAtom[m]]+fragDx[m]+point[i].x;
newY[i]=newY[RandomAtom[m]]+fragDy[m]+point[i].y;
newZ[i]=newZ[RandomAtom[m]]+fragDz[m]+point[i].z;
newF[i]=relF[i];
newRad[i]=relRad[i];
}
}
}	

//DISTANCE CALCULATION
checkpoint = 1;
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
	if(newF[i] != newF[k]){
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthBAD = 1.2*(newRad[i]+newRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthBAD) {
checkpoint=0;
} else {
//demo += ("OK "+newA[i]+" "+newA[k]+" dist:"+somedist+" CovalentDist(80%):"+bondlengthBAD+"<br>");
}
}
}
}

if (checkpoint == 0) {
error1++;
status = "BAD";
count = -1;
demo += ("    SMALL DISTANCE No "+error1+"<br>");
}

if (error1 == errorCounter ) {
error1 = 0;
param = param + 0.1*param;
demo += ("Parameter adjusted to: "+param+"<br>");
}

if (checkpoint == 1) {
status = "OK";
demo2 += ("<br>"+texts.length+"<br>"); 
demo2 += ("Structure: "+count1+" "+status+"<br>");
for (i=0; i < texts.length; i++) {
AtomsElem.push(newA[i]);
AtomsX.push(newX[i]);
AtomsY.push(newY[i]);
AtomsZ.push(newZ[i]);
AtomsCount.push(count);
AtomsF.push(newF[i]);
AtomsRad.push(newRad[i]);
demo2 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+"<br>");
}
}


}//END OF CALL FUNCTION


var noatoms = 0;
for (var m=0; m < fragCount; m++) { 
noatoms = noatoms + counter*(atomsInFrag[m]);
}

var bond = [];
//demo += ("<br>");
for (var i=0; i < noatoms; i++) {
	bond[i]=new Array();
for (var k=0; k < noatoms; k++) {
	if (i != k ) {
		if(AtomsF[i]==AtomsF[k]){
var x2 = Math.pow((AtomsX[i]-AtomsX[k]),2);
var y2 = Math.pow((AtomsY[i]-AtomsY[k]),2);
var z2 = Math.pow((AtomsZ[i]-AtomsZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var bondlengthOK = 1.4*(AtomsRad[i]+AtomsRad[k]);
var bondlengthBAD = 0.8*(AtomsRad[i]+AtomsRad[k]);
//demo += (i+" "+coorA[i]+" "+k+" "+coorA[k]+" "+somedist+"<br>");
if (somedist <= bondlengthOK && bondlengthBAD <= somedist) {
bond[i].push(k);
}
}
}
}
}

demo1 += ("<br>"+"TEST FILE (.xyz)"+"<br>");



demo1 += ("<br>"+noatoms+"<br>"+"TEST.xyz"+"<br>");

var atomsAll = [];
//demo1 += ("FINAL"+"<br>");
for (var i=0; i < noatoms; i++) {
atomsAll[i]={elem: AtomsElem[i],x: AtomsX[i], y: AtomsY[i], z: AtomsZ[i], bonds: bond[i]};
demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+" "+bond[i]+"<br>");
}

document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;

$(function() {
  let element = $('#container-10');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


$(function() {
  let element = $('#container-09');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.20,color:"#ffff00"},stick:{radius:0.15,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});

} //end function call