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

//INITIALIZING FUNCTION CALL
function check(){
//READ FROM TEXTAREA MAJOR
    var lines = $('#major').val().split(/\n/);
    var textsMajor = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            textsMajor.push($.trim(lines[i]));
        }
    }

    var lines1 = $('#minor').val().split(/\n/);
    var textsMinor = [];
    for (var i=0; i < lines1.length; i++) {
        if (/\S/.test(lines1[i])) {
            textsMinor.push($.trim(lines1[i]));
        }
    }

//REPORTING VARIABLE DEMO
demo = [];
demo2 = [];

//READ PARAMETERS & SET-UP
var param = Number(document.parameters.oneNo.value);
var counter = Number(document.parameters.twoNo.value);
var minDist = Number(document.parameters.threeNo.value);
var fragCount = Number(document.parameters.fourNo.value);
var repet = Number(document.parameters.fiveNo.value);
var error1 = 0;
var errorCounter = 10;
if (param < 1){
param = 1.0;
}

//DECLARE ARRAYS AND VARIABLES FOR INPUT
var majorCoorA = [];
var majorCoorX = [];
var majorCoorY = [];
var majorCoorZ = [];
var majorCoorF = [];

var minorCoorA = [];
var minorCoorX = [];
var minorCoorY = [];
var minorCoorZ = [];
var minorCoorF = [];

//READ INPUT
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>"+"<strong> INPUT: </strong>"+"<br>");
demo += ("<br>"+"Frozen fragment"+"<br>");
for (var i=0; i < textsMajor.length; i++) {
var majorCoor = textsMajor[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
majorCoor.push(0);
majorCoorA[i] = majorCoor[0];
majorCoorX[i] = Number(majorCoor[1]);
majorCoorY[i] = Number(majorCoor[2]);
majorCoorZ[i] = Number(majorCoor[3]);
majorCoorF[i] = Number(majorCoor[4]);
demo += (majorCoorA[i]+" "+majorCoorX[i]+" "+majorCoorY[i]+" "+majorCoorZ[i]+"<br>");
}
demo += (majorCoorA.length+"<br>");

demo += ("<br>"+"Non-frozen fragments"+"<br>");
for (var i=0; i < textsMinor.length; i++) {
var minorCoor = textsMinor[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
minorCoor.push(0);
minorCoorA[i] = minorCoor[0];
minorCoorX[i] = Number(minorCoor[1]);
minorCoorY[i] = Number(minorCoor[2]);
minorCoorZ[i] = Number(minorCoor[3]);
minorCoorF[i] = Number(minorCoor[4]);
demo += (minorCoorA[i]+" "+minorCoorX[i]+" "+minorCoorY[i]+" "+minorCoorZ[i]+" Frag"+minorCoorF[i]+"<br>");
}
demo += (minorCoorA.length+"<br>");
demo += ("<br>");

//DEFINE NUMBER OF ATOMS IN FRAGMENT
//FINDING CENTER OF EACH FRAGMENT
var sumcentarx = [];
var sumcentary = [];
var sumcentarz = [];
var atomsInFrag = [];
sumcentarx[0]=0;
sumcentary[0]=0;
sumcentarz[0]=0;
atomsInFrag[0]=0;
for (var m=1; m <= fragCount; m++) {
sumcentarx[m]=0;
sumcentary[m]=0;
sumcentarz[m]=0;
atomsInFrag[m]=0;
for (var i=0; i < textsMinor.length; i++) {
if (minorCoorF[i] == m) {
sumcentarx[m] = sumcentarx[m]+minorCoorX[i];
sumcentary[m] = sumcentary[m]+minorCoorY[i];
sumcentarz[m] = sumcentarz[m]+minorCoorZ[i];
atomsInFrag[m] = atomsInFrag[m]+1;
}
}
}
var centarx = [];
var centary = [];
var centarz = [];
for (var m=1; m <= fragCount; m++) {
centarx[m] = sumcentarx[m] / atomsInFrag[m] ;
centary[m] = sumcentary[m] / atomsInFrag[m] ;
centarz[m] = sumcentarz[m] / atomsInFrag[m] ;
}

//RELATIVE COORDINATES OF EACH FRAGMENT FROM CENTER OF THE FRAGMENT
demo += ("<strong> RELATIVE FRAGMENT COORDINATES </strong>"+"<br>");
var relA = [];
var relX = [];
var relY = [];
var relZ = [];
for (var m=1; m <= fragCount; m++) {
demo += ("&emsp;Fragment "+m+"<br>");
demo += ("&emsp;Number of atoms "+atomsInFrag[m]+"<br>");
demo += ("&emsp;Center of mass "+centarx[m]+" "+centary[m]+" "+centarz[m]+" "+"<br>");
for (var i=0; i < textsMinor.length; i++) {
if (minorCoorF[i] == m) {
var ada = minorCoorA[i];
var xdx = (minorCoorX[i]) - centarx[m] + 0.00001;
var ydy = (minorCoorY[i]) - centary[m] + 0.00001;
var zdz = (minorCoorZ[i]) - centarz[m] + 0.00001;
relA.push(ada);
relX.push(xdx);
relY.push(ydy);
relZ.push(zdz);
demo += ("&emsp;&emsp;"+relA[i]+" "+relX[i]+" "+relY[i]+" "+relZ[i]+"<br>");
}
}
}
demo += ("<br>");  

demo += ("<br>"+"<br>"+"<strong> COUNTER FUNCTION </strong>"+"<br>"+"<br>");

//COUNTER LOOP- MAIN FUNCTION
for (var count=0; count < counter; count++) {
var count1 = count+1;
demo += ("COUNT "+count1+"<br>");

//add frozen to variable
var atomsAllA = [];
var atomsAllX = [];
var atomsAllY = [];
var atomsAllZ = [];
var atomsAllF = [];
var atomsAllR = [];
var atomsAllC = [];


for (i=0; i < textsMajor.length; i++) {
atomsAllA.push(majorCoorA[i]);
atomsAllX.push(majorCoorX[i]);
atomsAllY.push(majorCoorY[i]);
atomsAllZ.push(majorCoorZ[i]);
atomsAllF.push(0);
atomsAllR.push(0);
atomsAllC.push(count);
}

//REPETITION LOOP
for (var rep=1; rep <= repet; rep++){
demo += ("REPETITION "+rep+"<br>");


//FRAGMENT LOOP
for (frag=1; frag <= fragCount; frag++) {
demo += ("FRAGMENT "+frag+"<br>");

if (error1 == errorCounter ) {
error1 = 0;
param = param + 0.1*param;
demo += ("Parameter adjusted to: "+param+"<br>");
}

//random atom
var randomatom = [];
demo += ("Random fragment "+frag+". Total No of atoms to choose "+atomsAllA.length+"<br>");
randomatom=Math.floor(Math.random() * atomsAllA.length);
demo += ("Chosen random atom "+randomatom+" "+atomsAllA[randomatom]+" "+atomsAllX[randomatom]+" "+atomsAllY[randomatom]+" "+atomsAllZ[randomatom]+"<br>");


var vx = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vy = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vz = (Math.round(Math.random()) * 2 - 1)*Math.random()+0.0001;
var vx2 = Math.pow(vx,2);
var vy2 = Math.pow(vy,2);
var vz2 = Math.pow(vz,2);
var vsum = vx2 + vy2 + vz2;
var vecnorm = Math.sqrt(vsum);
var vecsize = Math.random()*(param) + minDist;
var vectorX = (vx / vecnorm) * vecsize ;
var vectorY = (vy / vecnorm) * vecsize ;
var vectorZ = (vz / vecnorm) * vecsize ;
var ranX = vectorX + atomsAllX[randomatom];
var ranY = vectorY + atomsAllY[randomatom];
var ranZ = vectorZ + atomsAllZ[randomatom];
demo += ("Random point "+ranX+" "+ranY+" "+ranZ+" "+"<br>");

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
var axisB = new Vector({  x: (Math.random())*2-1,  y: (Math.random())*2-1,  z: (Math.random())*2-1,  w: 0 });
var angleC = Math.PI/2;
axisB.normalize();
var duz_axisB = axisB.length();

var testX = [];
var testY = [];
var testZ = [];
demo += ("Radnom rotation of fragment in position:"+"<br>");
for (var i=0; i < textsMinor.length; i++) {
if (minorCoorF[i] == frag) {
point[i] = new Vector({ x: relX[i],  y: relY[i],  z: relZ[i],  w: 0 });
pointlength[i]= point[i].length();  
point[i].normalize();
point[i].rotate(axisB, angleC);
point[i].scale(pointlength[i]);
testX[i]=point[i].x + ranX;
testY[i]=point[i].y + ranY;
testZ[i]=point[i].z + ranZ;
demo += (minorCoorA[i]+" "+testX[i]+" "+testY[i]+" "+testZ[i]+" "+"<br>");
}
}

var dist = [];
for (var k=0; k < atomsAllA.length; k++) {
for (var i=0; i < textsMinor.length; i++) {
if (minorCoorF[i] == frag) {
var x2 = Math.pow((testX[i]-atomsAllX[k]),2);
var y2 = Math.pow((testY[i]-atomsAllY[k]),2);
var z2 = Math.pow((testZ[i]-atomsAllZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
dist.push(somedist);
}
}
}

var min_dist = Math.min.apply(Math, dist);
demo += ("Minimal distance: "+min_dist+"<br>");

//DECISION ON DISTANCES
if (min_dist < minDist) {
frag=frag-1;
error1++;
demo += ("SMALL DISTANCE No "+error1+"<br>"+"<br>");
} else {
demo += ("  OK!<br>");

for (i=0; i < textsMinor.length; i++) {
if (minorCoorF[i] == frag){ 
atomsAllA.push(minorCoorA[i]);
atomsAllX.push(testX[i]);
atomsAllY.push(testY[i]);
atomsAllZ.push(testZ[i]);
atomsAllF.push(frag);
atomsAllC.push(count);
atomsAllR.push(rep);
}
}

}

//FRAGMENT LOOP END
}
//REPETITION LOOP END
}
//COUNTER LOOP END

demo += ("<br>");
demo += (atomsAllA.length+"<br>");
demo += ("Structure: "+count1+"<br>");
for (i=0; i < atomsAllA.length; i++) {
  demo += (atomsAllA[i]+" "+atomsAllX[i]+" "+atomsAllY[i]+" "+atomsAllZ[i]+" "+"<br>");
}

demo2 += (atomsAllA.length+"<br>");
demo2 += ("Structure: "+count1+"<br>");
for (i=0; i < atomsAllA.length; i++) {
  demo2 += (atomsAllA[i]+" "+atomsAllX[i]+" "+atomsAllY[i]+" "+atomsAllZ[i]+" "+"<br>");
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
    var filename = "KickMax.xyz";

    download(filename, text);


//FINALIZATION OF CALL FUNCTION
demo += ("<br>");
//PRINTING REPORTING VARIABLE DEMO
demo += ("<br>"+"DONE"+"<br>"+"Good luck!"+"<br>"+"Don't forget to cite!"+"<br>");
document.getElementById('demo').innerHTML = demo ;
//END CALL FUNCTION
}