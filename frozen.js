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
var minDist = Number(document.parameters.threeNo.value);

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
coorArrF[i] = (coor[4]);
demo += (coorA[i]+" "+coorArrX[i]+" "+coorArrY[i]+" "+coorArrZ[i]+" Frag"+coorArrF[i]+"<br>");
}

demo += ("<br>");


demo1 += ("<br>"+"TEST FILE (.xyz)"+"<br>");

var noatoms = counter*texts.length;
demo1 += ("<br>"+noatoms+"<br>"+"TEST.xyz"+"<br>");


var atoms = [];
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
if (coorArrF[i] == "F") {
AtomsElem.push(coorA[i]);
AtomsX.push(coorArrX[i]);
AtomsY.push(coorArrY[i]);
AtomsZ.push(coorArrZ[i]);
AtomsFrag.push("F");
AtomsCount.push(0);
AtomsBonds.push(bond1[i]);
//demo1 += (AtomsElem[i]+" "+AtomsX[i]+" "+AtomsY[i]+" "+AtomsZ[i]+" bonds:"+AtomsBonds[i]+" counter:"+AtomsCount[i]+"<br>");
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
demo += ("COUNT "+count1+" TAKE "+error1+"<br>");

//RANDOM VECTOR

var newA = [];
var newX = [];
var newY = [];
var newZ = [];

for (var i=0; i < texts.length; i++) {
  if (coorArrF[i] != "F") {
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
var dist = [];
var dist_inside_frag = [];
for (var i=0; i < texts.length; i++) {
for (var k=i+1; k < texts.length; k++) {
var x2 = Math.pow((newX[i]-newX[k]),2);
var y2 = Math.pow((newY[i]-newY[k]),2);
var z2 = Math.pow((newZ[i]-newZ[k]),2);
var sum = x2 + y2 + z2;
var somedist = Math.sqrt(sum);
dist.push(somedist);
}
}

demo += ("Atom distances between fragments:"+"<br>");
demo += dist;
demo += ("<br>");

var min_dist = Math.min.apply(Math, dist);
demo += ("Minimal distance: "+min_dist+"<br>");

//DECISION ON DISTANCES
if (min_dist < minDist) {
error1++;
status = "BAD";
count = count-1;
demo += ("SMALL DISTANCE No "+error1+"<br>"+"<br>");
} else {
status= "OK";
demo += ("  OK!<br>");
for (var i=0; i < texts.length; i++) {
AtomsElem.push(newA[i]);
AtomsX.push(newX[i]);
AtomsY.push(newY[i]);
AtomsZ.push(newZ[i]);
AtomsCount.push(count);
}
}

demo2 += ("<br>"+texts.length+"<br>"); 
demo2 += ("Structure: "+count1+" "+status+"<br>");

for (var i=0; i < texts.length; i++) {
demo2 += (newA[i]+"  "+newX[i]+"  "+newY[i]+"  "+newZ[i]+"<br>");
}


demo += ("<br>");
}

//END OF COUNTER FUNCTION



//CALCULATE INSIDE FRAGMENT BONDS FOR TEST.xyz AND VISUALIZATION
var bond = [];
for (var i=0; i <= noatoms; i++) {
bond[i]=new Array();
for (var k=0; k <= noatoms; k++) {
if (i != k ) {
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
    var filename = "FrozenFragmentKick.xyz";

    download(filename, text);

//END OF CALL FUNCTION

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
            m.setStyle({resi:0},{sphere:{scale:0.3,color:"#ffff00"},stick:{radius:0.2,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});


}

//END OF SCRIPT