//DOWNLOAD FUNCTION
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



function check(){
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


var param = Number(document.parameters.oneNo.value);
var counter = Number(document.parameters.twoNo.value);
var minDist = Number(document.parameters.threeNo.value);
var fragCount = Number(document.parameters.fourNo.value);
var error1 = 0;
var errorCounter = Number(counter*5);
if (param < 1){
param = 1.0;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
//demo += (count1+"<br>");
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
coorArrX[i] = coor[1];
coorArrY[i] = coor[2];
coorArrZ[i] = coor[3];
coorArrF[i] = coor[4];
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+" "+"<br>");
//end for i
}

demo += ("<br>");


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


//var atoms = [];
var bond1 = [];
for (var i=0; i < texts.length; i++) {
bond1[i] = new Array();
for (var k=0; k < texts.length; k++) {
if (coorArrF[i] == coorArrF[k]) {
if (i != k) {
var x2 = Math.pow((coorArrX[i]-coorArrX[k]),2);
var y2 = Math.pow((coorArrY[i]-coorArrY[k]),2);
var z2 = Math.pow((coorArrZ[i]-coorArrZ[k]),2);
var sum = x2 + y2 + z2;
var somedist1 = Math.sqrt(sum);
var checkDist1 = (somedist1 < 1.6);
var checkDist2 = (somedist1 < 1.2);
if (checkDist1 && coorA[i] == "O") {
bond1[i].push(k);
} 
if (checkDist1 && coorA[i] == "C") {
bond1[i].push(k);
} 
if (checkDist1 && coorA[i] == "N") {
bond1[i].push(k);
} 
if (checkDist2 && coorA[i] == "H") {
bond1[i].push(k);
}
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
for (var i=0; i < texts.length; i++) {
if (coorArrF[i] == "0") {
//demo1 += (relA[i]+" "+relX[i]+" "+relY[i]+" "+relZ[i]+"<br>");
AtomsElem.push(coorA[i]);
AtomsX.push(coorArrX[i]);
AtomsY.push(coorArrY[i]);
AtomsZ.push(coorArrZ[i]);
AtomsFrag.push(0);
AtomsCount.push(0);
AtomsBonds.push(bond1[i]);
//demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+" bonds:"+AtomsBonds[i]+" frag:"+AtomsFrag[i]+" counter:"+AtomsCount[i]+"<br>");
}
}


    
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
/*
for (var m=1; m <= fragCount; m++) {
var checkSphere = 0;
while (checkSphere == 0) {
var dx = (Math.random()*2-1)*(param+0.001);
var dy = (Math.random()*2-1)*(param+0.001);
var dz = (Math.random()*2-1)*(param+0.001);
var dx2 = Math.pow(dx,2);
var dy2 = Math.pow(dy,2);
var dz2 = Math.pow(dz,2);
var dsum = dx2 + dy2 + dz2;
var sphere = Math.sqrt(dsum);
//demo += (sphere+" ");
if (sphere < param) {
var checkSphere = 1;
fragDx[m] = dx;
fragDy[m] = dy;
fragDz[m] = dz;
//demo += (" sphere "+sphere+" check "+checkSphere+" FragMove "+fragDx[m]+" "+fragDy[m]+" "+fragDz[m]+"<br>");
} else {
var checkSphere = 0;
}
}
}
*/

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
var vecsize = Math.random()*(param) + minDist/2;
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


//DISTANCE
demo += ("Atom distances:"+"<br>");

var dist = [];
var dist_inside_frag = [];
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
//demo += somedist;
//demo += ("<br>");

//SORTING INTER AND INTRA FRAGMENT DISTANCES
if (coorArrF[i] == coorArrF[k]) {
dist_inside_frag.push(somedist);
} else {
dist.push(somedist);
}
demo += (i+" "+k+" "+somedist+"<br>");
}
}
demo += ("<br>");

var min_dist = Math.min.apply(Math, dist);
demo += ("Minimal distance: "+min_dist+"<br>");

//DECISION ON DISTANCES
if (min_dist < minDist) {
error1++;
count = count-1;
demo += ("SMALL DISTANCE No "+error1+"<br>"+"<br>");
} else {
demo += ("  OK!<br>");
for (var m=1; m <= fragCount; m++) {
for (var i=0; i < texts.length; i++) {
if (coorArrF[i] == m){ 
//demo1 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+" frag:"+m+" counter:"+count+"<br>");
AtomsElem.push(newA[i]);
AtomsX.push(newX[i]);
AtomsY.push(newY[i]);
AtomsZ.push(newZ[i]);
AtomsFrag.push(m);
AtomsCount.push(count);
}
}
}

demo2 += ("<br>"+texts.length+"<br>"); 
demo2 += ("Structure: "+count1+" "+status+"<br>");
for (var m=0; m <= fragCount; m++) {
for (var i=0; i < texts.length; i++) {
if (coorArrF[i] == m){ 
demo2 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+"<br>");
}
}
}

demo += ("<br>");
}


//END OF COUNTER FUNCTION
}

//CALCULATE INSIDE FRAGMENT BONDS FOR TEST.xyz AND VISUALIZATION
var bond = [];
for (var i=0; i <= noatoms; i++) {
bond[i]=new Array();
for (var k=0; k <= noatoms; k++) {
if (i != k ) {
if (AtomsFrag[i] == AtomsFrag[k]) { 
if (AtomsCount[i] == AtomsCount[k]) {
var x2 = Math.pow((AtomsX[i]-AtomsX[k]),2);
var y2 = Math.pow((AtomsY[i]-AtomsY[k]),2);
var z2 = Math.pow((AtomsZ[i]-AtomsZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
var checkDist1 = (somedist < 1.6);
var checkDist2 = (somedist < 1.2);
//demo1 += ("<br>"+AtomsElem[i]+" "+AtomsElem[k]+"   "+i+" "+k+"   "+somedist+" ");
if (checkDist1 && AtomsElem[i] == "O") {
bond[i].push(k);
} 
if (checkDist1 && AtomsElem[i] == "C") {
bond[i].push(k);
} 
if (checkDist1 && AtomsElem[i] == "N") {
bond[i].push(k);
} 
if (checkDist2 && AtomsElem[i] == "H") {
bond[i].push(k);
}
}
}
}
}
}

var atomsAll = [];
//demo1 += ("<br>");
for (var i=0; i < noatoms; i++) {
atomsAll[i]={elem: AtomsElem[i],x: AtomsX[i], y: AtomsY[i], z: AtomsZ[i], bonds: bond[i]};
demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+"<br>");
}

demo += ("<br>"+"<strong> COUNTER FUNCTION END - SCRIPT FINISHED </strong>"+"<br>"+"<br>");

//FINALIZATION OF CALL FUNCTION
demo += ("<br>");
//PRINTING REPORTING VARIABLE DEMO
demo += ("<br>"+"DONE"+"<br>"+"Good luck!"+"<br>"+"Don't forget to cite!"+"<br>");


document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;


//DOWNLOAD
// Generate download of kick.xyz file with some content
    var text = br2nl(demo2,true);
    var filename = "wiggle.xyz";

    download(filename, text);



$(function() {
  let element = $('#container-01');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atoms);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.zoomTo();
            viewer.render();
});


    
$(function() {
  let element = $('#container-02');
  let config = { backgroundColor: 'white' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atomsAll);
            m.addAtoms(atoms)
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            m.setStyle({resi:0},{sphere:{scale:0.3,color:"#ffff00"},stick:{radius:0.2,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});   

//END OF CALL FUNCTION
}