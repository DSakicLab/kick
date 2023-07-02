//INITIALIZING FUNCTION CALL
function check(){
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
var param = Number(document.parameters.oneNo.value);
var counter = Number(document.parameters.twoNo.value);
var loopMax = Number(document.parameters.threeNo.value);
//var minDist = Number(document.parameters.threeNo.value);

var error1 = 0;
var status = "OK";
var errorCounter = Number(counter);
if (param < 0.1){
param = 0.1;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var coorA = [];
var coorArrX = [];
var coorArrY = [];
var coorArrZ = [];
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


//count loop
for (count=0;count < counter ;count++){

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
var bondlengthOK = 1.1*(newRad[i]+newRad[k]);
var bondlengthBAD = 0.7*(newRad[i]+newRad[k]);
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

//REPLACE <br> with /n
function br2nl (str, replaceMode) {
  var replaceStr = (replaceMode) ? "\n" : '';
  // Includes <br>, <BR>, <br />, </br>
  return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
}

//DOWNLOAD
// Generate download of kick.xyz file with some content
    var text = br2nl(demo2,true);
    var filename = "CoalescenceKick.xyz";

    download(filename, text);



document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;
//end function call
}