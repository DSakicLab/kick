
//var val1 = 0.9; //fraction of covalent to declare a bond (minimal) var val1 = Number(document.parameters.val1.value);
//var val2 = 1.1; //fraction of covalent to declare a bond (maximal)
//var val3 = 1.4; //fraction of covalent to declare not to close (between fragments)
var val4 = 2.0; //fraction of covalent to declare too far (between fragments)


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

function Atom(optional){
  if (optional){
    this.elem = optional.elem
    this.x = optional.x
    this.y = optional.y
    this.z = optional.z
    this.w = 0
    this.f = optional.f
    this.rad = optional.rad
    this.resi = optional.c
    this.bonds = optional.bonds
  }else{
    this.elem = "X"
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0
    this.f = 0
    this.rad = 0
    this.resi = 0
    this.bonds = 0
  }
}

function DistVec(first,second,optional,dist,cov){
    if (optional){
    this.first = first;
    this.second = second;
    this.x = optional.x;
    this.y = optional.y;
    this.z = optional.z;
    this.dist = dist;  
    this.cov = cov;
    }
    else{
    this.first = 0;
    this.second = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.dist = 0;  
    this.cov = 0; 
    }
}

Atom.prototype.Distance = function(vector){
var out = Math.sqrt(Math.pow(this.x-vector.x,2)+Math.pow(this.y-vector.y,2)+Math.pow(this.z-vector.z,2));
return out;
}

Atom.prototype.CovBond = function(vector){
  var covbond = this.rad + vector.rad;
  return covbond.toFixed(5);
}

Atom.prototype.plus1 = function(vector){
var out = new Atom({
x : this.x + vector.x,
y : this.y + vector.y,
z : this.z + vector.z,
});
//    this.x = out.x.toFixed(5);
//    this.y = out.y.toFixed(5);
//    this.z = out.z.toFixed(5);
this.x = out.x;
this.y = out.y;
this.z = out.z;

}

Atom.prototype.minus1 = function(vector){
var out = new Atom();
out.x = this.x - (vector.x);
out.y = this.y - (vector.y);
out.z = this.z - (vector.z);
//    this.x = out.x.toFixed(5);
//    this.y = out.y.toFixed(5);
//    this.z = out.z.toFixed(5);
this.x = out.x;
this.y = out.y;
this.z = out.z;

}

Atom.prototype.RandGen = function(){
this.x = Math.random()*2-1;
this.y = Math.random()*2-1;
this.z = Math.random()*2-1;
}

Atom.prototype.QuaternionMultiply = function(vectorB) {
    var out = new Atom();
    out.w = this.w*vectorB.w - this.x*vectorB.x - this.y*vectorB.y - this.z*vectorB.z;
    out.x = this.w*vectorB.x + this.x*vectorB.w + this.y*vectorB.z - this.z*vectorB.y;
    out.y = this.w*vectorB.y - this.x*vectorB.z + this.y*vectorB.w + this.z*vectorB.x;
    out.z = this.w*vectorB.z + this.x*vectorB.y - this.y*vectorB.x + this.z*vectorB.w;
    this.x = out.x;
    this.y = out.y;
    this.z = out.z;
    this.w = out.w;
}

Atom.prototype.rotate = function(inputaxis, inputangle) 
{
    var vector = new Atom(this);
    vector.w = 0;

    var axis = new Atom({ 
      x: inputaxis.x * Math.sin(inputangle/2),     
      y: inputaxis.y * Math.sin(inputangle/2),     
      z: inputaxis.z * Math.sin(inputangle/2),     
      w: Math.cos(inputangle/2)} 
      );

    var axisInv = new Atom({ x: -axis.x, y: -axis.y, z: -axis.z, w: axis.w}  );

    axis.QuaternionMultiply(vector);
    axis.QuaternionMultiply(axisInv);

    this.x = axis.x.toFixed(5);
    this.y = axis.y.toFixed(5);
    this.z = axis.z.toFixed(5);
}

Atom.prototype.size = function() {
  var size = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);  
  return size;
}

Atom.prototype.scale = function(scale) { 
  this.x = this.x*scale;
  this.y = this.y*scale;
  this.z = this.z*scale;
}

Atom.prototype.normalize = function() {
  //scales a vector back to a unit vector. It will have a length of 1
  var lengthval = this.size()

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

var covRadius = {He:0.28, H:0.31, F:0.57, Ne:0.58, O:0.66, N:0.71, C:0.76, B:0.85, Be:0.96, Cl:1.02, S:1.05, Ar:1.06, P:1.07, S:1.11, Kr:1.16, As:1.19, Ge:1.2, Se:1.2, Br:1.2, Al:1.21, Zn:1.22, Ga:1.22, Ni:1.24, Co:1.26, Li:1.28, Cu:1.32, Hg:1.32, Pt:1.36, Au:1.36, Te:1.38, Cr:1.39, Mg:1.39, Pd:1.39, Sn:1.39, Sb:1.39, I:1.39, Xe:1.4, Po:1.4, Mg:1.41, Ir:1.41, Rh:1.42, In:1.42, Cd:1.44, Os:1.44, Ag:1.45, Tl:1.45, Ru:1.46, Pb:1.46, Tc:1.47, Bi:1.48, At:1.5, Ra:1.5, Re:1.51, V:1.53, Mo:1.54, Ti:1.6, W:1.62, Nb:1.64, Na:1.66, Cm:1.69, Sc:1.7, Ta:1.7, Zr:1.75, Hf:1.28, Ca: 1.76, Am:1.8, Yb:1.87, Lu:1.87, Pu:1.87, Er:1.89, Y:1.9, Tm:1.9, Np:1.9, Dy:1.92, Ho:1.92, Tb:1.94, Sr:1.95, Gd:1.96, U:1.96, Sm:1.98, Eu:1.98, Pm:1.99, Pa:2, Nd:2.01, K:2.03, Pr:2.03, Ce:2.04, Th:2.06, La:2.07, Ba:2.15, Ac:2.15, Rb:2.2, Ra:2.21, Cs:2.44, Fr:2.6, X:0.01}; 


//FUNCTION VISUALIZATION
function viz(){

var val1 = Number(document.parameters.val1.value);
var val2 = Number(document.parameters.val2.value);
var val3 = Number(document.parameters.val3.value);
//var val4 = Number(document.parameters.val4.value);

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
//demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>");


var atom = [];
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
atom[i] = new Atom({elem: coor[0], x: Number(coor[1]), y: Number(coor[2]), z: Number(coor[3]), f: Number(coor[4]), rad: Number(covRadius[coor[0]]), c: 0});
}

var bond = [];
for (var i=0; i < atom.length; i++) {
bond[i] = [];
for (var k=0; k < atom.length; k++) {
if (atom[i].f == atom[k].f){
if (i != k) {
//var dist = atom[i].Distance(atom[k]);
//demo += (i+" "+k+" "+dist+"<br>");
var dist = atom[i].Distance(atom[k]);
var cov = atom[i].CovBond(atom[k]);
if (val1*cov <= dist && dist <= val2*cov){
bond[i].push(k);
}
}
}
}
atom[i].bonds = bond[i];
}

for (var i=0; i < atom.length; i++){
//demo += Object.values(atom[i]);
//demo += atom[i].bonds;
demo += ("<br>");
}


$(function() {
  let element = $('#container-01');
  let config = { backgroundColor: '#fbfbfb' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atom);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.addStyle({elem:'X'},{sphere:{scale:0.1,color:"#ffff00"}});
            viewer.zoomTo();
            viewer.render();
});

var demo1 = [];
var demo2 = [];
demo1 += ("*3Dmol.js: molecular visualization with WebGL<br>"+
"N. Rego, D. Koes, <em>Bioinformatics</em> <strong>2015</strong>, <em>31</em>(8), 1322 - 1324.<br>")
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;
document.getElementById('demo').innerHTML = demo ;
} //END OF FUNCTION FIZUALIZE


//FUNCTION GENERATE
function gen(){

var val1 = Number(document.parameters.val1.value);
var val2 = Number(document.parameters.val2.value);
var val3 = Number(document.parameters.val3.value);
//var val4 = Number(document.parameters.val4.value);

var demo1 = [];
var demo2 = [];
//var demo2 = ("<br>"+"<strong> GENERATED STRUCUTRES </strong>"+"<br>");

demo1 += ("*3Dmol.js: molecular visualization with WebGL<br>"+
"N. Rego, D. Koes, <em>Bioinformatics</em> <strong>2015</strong>, <em>31</em>(8), 1322 - 1324.<br>"+
"Grey atoms denote initial atom positions.");

var method = Number(document.parameters1.method.value);

if (method == 6) {
demo1 +=(" Dummy atoms (X) are centers of fragments. Thin lines show displacement vectors.<br>");
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> KICK PROCEDURE FROM ORIGIN</strong>"+"<br>");
demo1 += ("This version needs additional input that defines molecular fragments. Atoms belonging to a molecular fragment "
  +"have the same number tag after xyz coordinates. Benefits of this approach is getting a set of input structures that have "
  +"basic connectivity intact, while sacrificing un-biased exploration of the potential energy surface. Original Saunders "
  +"procedure randomly \"kicks\" atoms from their initial positions. To make a really relative initial position independent "
  +"stochastic search, we have to choose randomly a new relative place from which \"kick\" starts should be chosen. Using a "
  +"bit of chemical logic here, we know that final result of the kick procedure should produce a sphere of fragments around "
  +"the non-frozen fragment. Two versions can be done:<br><em>1) VERSION</em> find centers of all fragments, recalculate atom "
  +"positions inside each fragment relative to the center of the fragment, reposition centers of the fragment in the cartesian "
  +"origin, and from there do kick/rotate procedure as seen in WIGGLE script. <br> <em>2) VERSION</em> finds a random atom and "
  +"use its coordinates as a starting point of the randomly generated vector.<br> In this variant, first version is used as follows:"
  +"<br> In the first step, a geometric center (C) of each fragment is located, and relative coordinates of each atom in fragment is "
  +"determined. On those coordinates, a random rotation operation is performed. For each non-frozen fragment, a random displacement vector (V) is generated. Length of said vector is equal to "
  +"randomly chosen fraction of sum of distance parameter and average distance of atoms in the fragment to the center of the fragment. "
  +"New point (P) for each fragment is set by combining coordinates of Origin (x: 0.0, y: 0.0, z: 0.0) and vector V. In each fragment-point (P) "
  +"fragment-center (C) of randomly rotated fragment is placed. This procedure completely ignores initial relative position "
  +"of each fragment. Additional selection criteria is enforced here; distance between any two atoms found in different fragments "
  +"needed to be larger than sum of covalent radius's of those two atoms. <br>Articles published with this procedure in our group "
  +"include: \"Kinetics and Mechanism of Oxidation of Hydroxyurea Derivatives\" A. Budimir, T. Weitner, I. Kos, D. Šakić, M. "
  +"Gabričević, E. Bešić, M. Biruš. <em>Croat. Chem. Acta</em> <strong>2011</strong>, <em>84</em>(2), 133-147.<br> \"A computational "
  +"study of the chlorination and hydroxylation of amines by hypochlorous acid\" D. Šakić, M. Hanževački, D. M. Smith, V. Vrček, "
  +"<em>Org. Biomol. Chem.</em> <strong>2015</strong>, <em>13</em>, 11740 - 11752.<br>");
demo1 += ("<br>");
}

if (method == 5) {
demo1 +=(" Dummy atoms (X) are centers of fragments. Thin lines show displacement vectors.<br>");
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> WIGGLE PROCEDURE </strong>"+"<br>");
demo1 += ("This version needs additional input that defines molecular fragments. Atoms belonging to a molecular fragment have "
+"the same number tag after xyz coordinates. Benefits of this approach is getting a set of input structures that have basic "
+"connectivity intact, while sacrificing un-biased exploration of the potential energy surface. For each non-frozen fragment, "
+"a randomly directed vector is generated, where length of said vector equals randomly chosen fraction of sum of distance "
+"parameter and average distance of atoms in the fragment to the center of the fragment. After atoms of each fragment are "
+"displaced alongside fragment vector to a new position, each non-frozen fragment is randomly rotated. This version partially "
+"remembers relative initial positions of each fragment, thus fragments \"wiggle\" from initial positions.<br> "
+"Articles published with this procedure in our group include: \"Racemization of oxazepam and chiral 1,4-benzodiazepines. "
+"DFT study of the reaction mechanism in aqueous solution\"<br> L. Hok, L. Božičević, H. Sremec, D. Šakić, V. Vrček, <em>Org. Biomol. Chem.</em> <strong>2019</strong>, <em>17</em>, 1471-1479.<br>")
demo1 += ("<br>");
}

if (method == 4) {
demo1 +=(" Dummy atoms (X) are centers of fragments. Thin lines show displacement vectors.<br>");
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> KICK PROCEDURE </strong>"+"<br>");
demo1 += ("This version needs additional input that defines molecular fragments. Atoms belonging to a molecular fragment "
  +"have the same number tag after xyz coordinates. Benefits of this approach is getting a set of input structures that have "
  +"basic connectivity intact, while sacrificing un-biased exploration of the potential energy surface. Original Saunders "
  +"procedure randomly \"kicks\" atoms from their initial positions. To make a really relative initial position independent "
  +"stochastic search, we have to choose randomly a new relative place from which \"kick\" starts should be chosen. Using a "
  +"bit of chemical logic here, we know that final result of the kick procedure should produce a sphere of fragments around "
  +"the non-frozen fragment. Two versions can be done:<br><em>1) VERSION</em> find centers of all fragments, recalculate atom "
  +"positions inside each fragment relative to the center of the fragment, reposition centers of the fragment in the cartesian "
  +"origin, and from there do kick/rotate procedure as seen in WIGGLE script. <br> <em>2) VERSION</em> finds a random atom and "
  +"use its coordinates as a starting point of the randomly generated vector.<br> In this variant, second version is used as follows:"
  +"<br> In the first step, a geometric center (C) of each fragment is located, and relative coordinates of each atom in fragment is "
  +"determined. On those coordinates, a random rotation operation is performed. For each non-frozen fragment, a random atom (A) is "
  +"chosen, from fragments with lower number, and a random displacement vector (V) is generated. Length of said vector is equal to "
  +"randomly chosen fraction of sum of distance parameter and average distance of atoms in the fragment to the center of the fragment. "
  +"New point (P) for each fragment is set by combining coordinates of atom A and vector V. In each fragment-point (P) "
  +"fragment-center (C) of randomly rotated fragment is placed. This procedure completely ignores initial relative position "
  +"of each fragment. Additional selection criteria is enforced here; distance between any two atoms found in different fragments "
  +"needed to be larger than sum of covalent radius's of those two atoms. <br>Articles published with this procedure in our group "
  +"include: \"Kinetics and Mechanism of Oxidation of Hydroxyurea Derivatives\" A. Budimir, T. Weitner, I. Kos, D. Šakić, M. "
  +"Gabričević, E. Bešić, M. Biruš. <em>Croat. Chem. Acta</em> <strong>2011</strong>, <em>84</em>(2), 133-147.<br> \"A computational "
  +"study of the chlorination and hydroxylation of amines by hypochlorous acid\" D. Šakić, M. Hanževački, D. M. Smith, V. Vrček, "
  +"<em>Org. Biomol. Chem.</em> <strong>2015</strong>, <em>13</em>, 11740 - 11752.<br>");
demo1 += ("<br>");
}

if (method == 3) {
demo1 +=(" Dummy atoms (X) denote first displacement position. Thin lines show displacement vectors.<br>");
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> COALESCENCE VERSION </strong>"+"<br>");
demo1 += ("Coalescence kick procedure was developed by Boris Averkiev in the Boldyrev group at Utah University. \"Geometry and Electronic Structure of Doped Clusters via the Coalescence Kick Method\" <br>" 
+"B. Averkiev, <strong>2009</strong>, Ph.D. dissertation, <em>Utah State University, Logan, Utah,</em> 18-25.<br>"
+"Algorithm written in c++ by Boris Averkiev can be found at https:\/\/github.com\/averkiev75\/Coalescence-Kick\ repository.<br>"
+"\"To avoid above-mentioned drawbacks of the original version of Kick Method, we designed the modified \"Coalescence\" Kick Method. "
+"In this method initially generated random structure is first checked for connectivity, and then if the structure is fragmented, the "
+"coalescence procedure is applied to it. Two atoms are considered to be connected if the inter-atomic distance satisfies the sum of "
+"their covalent (or van der Waals) radii.\"<br>"
+"Coalescence is in \"push(ing) all fragments of structure to the center of mass simultaneously.\" But to do this, after random "
+"generation of coordinates, a distance matrix is made. Then close atoms are group together as fragment, and complete fragment "
+"is then moved by certain amount to the recalculated center of the mass of the complete system. As atoms are moved closer, "
+"fragments are getting larger, aka coalescing, until all atoms are in the same fragment. This can be implemented into the "
+"original Saunders stochastic search procedure.<br>");
demo1 += ("<br>");
}

if (method == 2) {
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> SAUNDERS FROZEN FRAGMENT </strong>"+"<br>");
demo1 += ("This version is the first adaptation of the original procedure (M. Saunders, <em>J. Comput. Chem.</em> <strong>2004</strong>, <em>25</em>, 621 - 626.), where one molecular fragment is defined, and kept frozen while the rest is \"kicked\" around. <br> Articles published with this procedure in our group include: \"Chlorination of ammonia and aliphatic amines by Cl2: DFT study of medium and substituent effects\" V. Vrček, H. Meštrić, <em>J. Phys. Org. Chem.</em> <strong>2008</strong>, <em>22</em>(1), 59-68.<br> \"Prereactive complexes in chlorination of benzene, triazine, and tetrazine: A quantum chemical study\" D. Šakić, V. Vrček, <em>J. Phys. Chem. A</em> <strong>2012</strong>, <em>116</em>(4), 1298-1306.<br><br>");
demo1 += ("<br>");
}

if (method == 1) {
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> SAUNDERS STOCHASTIC SEARCH FROM ORIGIN</strong>"+"<br>");
demo1 += ("The kick script is based on the stochastic search procedure originally defined by prof. Martin Saunders:"
  +"\"Stochastic Search for Isomers on a Quantum Mechanical Surface\" M. Saunders, <em>J. Comput. Chem.</em> <strong>2004</strong>, <em>25</em>, 621 - 626.<br>"
  +"This version \"kicks\" randomly each atom from Origin (x: 0.0, y: 0.0, z:0.0) providing investigation of potential energy surface without bias."+"<br>")
demo1 += ("<br>");
}

if (method == 0) {
demo1 += ("<br>");
demo1 += ("<br>"+"<strong> SAUNDERS ORIGINAL STOCHASTIC SEARCH </strong>"+"<br>");
demo1 += ("The kick script is based on the stochastic search procedure originally defined by prof. Martin Saunders:"
  +"\"Stochastic Search for Isomers on a Quantum Mechanical Surface\" M. Saunders, <em>J. Comput. Chem.</em> <strong>2004</strong>, <em>25</em>, 621 - 626.<br>"
  +"The original Fortran code was rewritten in Javascript for web version. This version \"kicks\" randomly each atom from its current position, "
  +"providing investigation of potential energy surface with minimal bias (information about starting positions is kept). <br>Articles published with this procedure in our group include: "
  +"Stochastic Search for Isomers of the <em>sec</em>-Butyl Cation\" V. Vrček, O. Kronja, M. Saunders, <em>J. Chem. Theory Comput.</em> <strong>2007</strong>, <em>3</em>(3), 1223-1230.<br>"
  +"Although, original script did not check for the minimal distance clash between atoms, the same was added for quick elimination of unfit structures."+"<br>");
demo1 += ("<br>");
}

//READ FROM FORM
    var lines = $('#links').val().split(/\n/);
    var texts = [];
    for (var i=0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
        }
    }
//REPORTING VARIABLE DEMO

var demo = [];
demo += ("<br>"+"<strong> SCRIPT MECHANIC: </strong>"+"<br>"+"<br>");

var atom = [];
for (var i=0; i < texts.length; i++) {
var coor = texts[i].replace("     "," ").replace("    "," ").replace("   "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," ").split(" ");
  atom[i] = new Atom({elem: coor[0], x: Number(coor[1]), y: Number(coor[2]), z: Number(coor[3]), f: Number(coor[4]), rad: Number(covRadius[coor[0]]), c: 0});
  //atom[i] = new Atom({elem: coor[0], x: Number(coor[1]), y: Number(coor[2]), z: Number(coor[3]), f: Number(coor[4]), rad: Number(covRadius[coor[0]]), resi: 0});
}

var bond = [];
for (var i=0; i < atom.length; i++) {
bond[i] = [];
for (var k=0; k < atom.length; k++) {
if (atom[i].f == atom[k].f){
if (i != k) {
//var dist = atom[i].Distance(atom[k]);
//demo += (i+" "+k+" "+dist+"<br>");
var dist = atom[i].Distance(atom[k]);
var cov = atom[i].CovBond(atom[k]);
if (val1*cov <= dist && dist <= val2*cov){
bond[i].push(k);
}
}
}
}
atom[i].bonds = bond[i];
}

for (var i=0; i < atom.length; i++){
demo += Object.values(atom[i]);
//demo += atom[i].bonds;
demo += ("<br>");
}

demo += ("Covalent bond length: "+"<br>");
for (var i=0; i < atom.length; i++) {
for (var k=i+1; k < atom.length; k++) {
var cov = atom[i].CovBond(atom[k]);
demo += (i+atom[i].elem+" "+k+atom[k].elem+" "+cov+"<br>");
}
}


var testAtom = [];
for (i=0; i < atom.length; i++){
testAtom[i]=new Atom(atom[i]);
}


var fragments = [...new Set(testAtom.map(x => x.f))];
demo += ("<br>"+"Fragments: "+fragments.length+"<br>");

var frag = [];
var aInF = [];
var m = 0;
for (n=0; n < fragments.length; n++){
m = fragments[n];
frag[m] = new Atom();
aInF[m] = 0;
for (i=0; i < testAtom.length; i++){
if (testAtom[i].f == m){
frag[m].x += testAtom[i].x;
frag[m].y += testAtom[i].y;
frag[m].z += testAtom[i].z;
aInF[m] = aInF[m]+1;
}
}
}

if (method <=1){
var centar = [];
for (i=0; i < testAtom.length; i++){
testAtom[i].f = i;
centar[i] = new Atom(testAtom[i]);
testAtom[i].minus1(centar[i]);
}
}

if (4 <= method){
var centar = [];
for (n=0; n < fragments.length; n++){
  var m = fragments[n];
//demo += (m+" "+frag[m].x+"<br>");
centar[m] = new Atom();
centar[m].x = frag[m].x / aInF[m];
centar[m].y = frag[m].y / aInF[m];
centar[m].z = frag[m].z / aInF[m];
//demo += (m+" "+centar[m].x+"<br>");
}
}

if (4 <= method){
var dist1 = [];
var distFragAvg = [];
var m = 0;
for (n=0; n < fragments.length; n++) {
m = fragments[n];
dist1[m] = 0;
for (i=0; i < atom.length; i++){
if (atom[i].f == m){
dist1[m] += atom[i].Distance(centar[m]);
}
}
distFragAvg.push(dist1[m]/aInF[m]);
}
}

if (4 <= method){
var m = 0;
for (n=0; n < fragments.length; n++){
m = fragments[n];
  demo += ("Fragment "+m+"<br>");
for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
demo += Object.values(testAtom[i]);
demo += (" => ");
testAtom[i].minus1(centar[m]);
demo += Object.values(testAtom[i]);
demo += ("<br>"); 
}
}
}
}

var newAtom = [];
for (i=0; i < atom.length; i++){
newAtom[i]=new Atom(atom[i]);
newAtom[i].resi = 0;
}

var newPointStart = [];
var newPointEnd = [];

//BEGINING OF COUNTER
demo += ("<br>");
var counter = Number(document.parameters.oneNo.value);
var error1 = 0;
var errorCounter = 5;
var good1 = 0;
var goodCounter = 2;
var param = Number(document.parameters.twoNo.value);
demo1 += ("Parameter set to: "+param+"<br>");
demo1 += ("Parameter adjusted from "+param);

for (count=0; count < counter; count++){ //counter loop

count1=count+1;
demo += ("<br>"+"Counter "+count1+"<br>");

var check=0;
while (check == 0){ //while check loop start

var tempVec = [];
var ranVec = [];
var rotVec = [];
var point = [];
var end = [];
var angle = Math.PI/2;

if (method == 0){ //SAUNDERS ORIGINAL
for (i=0; i < atom.length; i++){
tempVec[i] = new Atom(atom[i]);
ranVec[i] = new Atom();
ranVec[i].RandGen();
ranVec[i].normalize();
ranVec[i].scale(Math.random()*(tempVec[i].rad+param));
point[i] = new Atom(atom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
end[i].plus1(ranVec[i]);
tempVec[i].plus1(ranVec[i]);
tempVec[i].f = i;
//demo1 += (point[i].x+" "+point[i].y+" "+point[i].z+" "+"<br>");
}  
} //SAUNDERS ORIGINAL END


if (method == 1){ //SAUNDERS FROM ORIGIN
for (i=0; i < atom.length; i++){
tempVec[i] = new Atom(testAtom[i]);
ranVec[i] = new Atom();
ranVec[i].RandGen();
ranVec[i].normalize();
ranVec[i].scale(Math.random()*(tempVec[i].rad+param));
point[i] = new Atom(testAtom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
end[i].plus1(ranVec[i]);
tempVec[i].plus1(ranVec[i]);
//demo1 += (point[i].x+" "+point[i].y+" "+point[i].z+" "+"<br>");
}  
} //SAUNDERS FROM ORIGIN END

if (method == 2){ //SAUNDERS FROZEN
for (i=0; i < atom.length; i++){
tempVec[i] = new Atom(atom[i]);
ranVec[i] = new Atom();
if(atom[i].f != 0){
ranVec[i].RandGen();
ranVec[i].normalize();
ranVec[i].scale(Math.random()*(tempVec[i].rad+param));
point[i] = new Atom(atom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
end[i].plus1(ranVec[i]);
tempVec[i].plus1(ranVec[i]);
} else {
point[i] = new Atom(atom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
}
//demo1 += (point[i].x+" "+point[i].y+" "+point[i].z+" "+"<br>");
}  
} //SAUNDERS FROZEN END

if (method == 3){ //COALESCENCE ATOM
var o=1;
for (i=0; i < atom.length; i++){
tempVec[i] = new Atom(atom[i]);
ranVec[i] = new Atom();
if(atom[i].f != 0){
ranVec[i].RandGen();
ranVec[i].normalize();
ranVec[i].scale(Math.random()*(tempVec[i].rad+param));
point[i] = new Atom(atom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
end[i].plus1(ranVec[i]);
tempVec[i].plus1(ranVec[i]);
tempVec[i].f=o; 
o=o+1;
} else {
point[i] = new Atom(atom[i]);
point[i].elem = "Z";
end[i] = new Atom(point[i]);
}
//demo1 += (point[i].x+" "+point[i].y+" "+point[i].z+" "+"<br>");
} 
} //COALESCENCE ATOM END

if (method == 4) { //KICK
var m=0;
demo += ("Fragment "+m+"<br>");
point[m] = centar[m];
point[m].elem = "Z";
end[m] = centar[m];
for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
tempVec[i] = new Atom(atom[i]);
demo += (Object.values(tempVec[i])+"<br>");
}
}

for (n=1; n < fragments.length; n++){
m = fragments[n];
demo += ("Fragment "+m+"<br>");
ranVec[m] = new Atom();
ranVec[m].RandGen();
ranVec[m].normalize();
ranVec[m].scale(distFragAvg[m]+Math.random()*(distFragAvg[m]+param));
rotVec[m] = new Atom();
rotVec[m].RandGen();
rotVec[m].normalize();

point[m] = new Atom(tempVec[Math.floor(Math.random()*tempVec.length)]);
point[m].elem = "Z";
 //kick

end[m] = new Atom(point[m]);
end[m].plus1(ranVec[m]);

for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
tempVec[i] = new Atom(testAtom[i]);
var size = tempVec[i].size();
tempVec[i].normalize();
tempVec[i].rotate(rotVec[m], angle);
tempVec[i].scale(size*2);
tempVec[i].plus1(ranVec[m]);
tempVec[i].plus1(point[m]);
  demo += (Object.values(tempVec[i])+"<br>");
}
}
}
} //KICK END

if (method == 5) { //WIGGLE
var m=0;
point[m] = centar[m];
end[m] = centar[m];
point[m].elem = "Z";
demo += ("Fragment "+m+"<br>");
for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
tempVec[i] = new Atom(atom[i]);
demo += (Object.values(tempVec[i])+"<br>");
}
}

for (n=1; n < fragments.length; n++){
m = fragments[n];
demo += ("Fragment "+m+"<br>");
ranVec[m] = new Atom();
ranVec[m].RandGen();
ranVec[m].normalize();
ranVec[m].scale(distFragAvg[m]+Math.random()*(distFragAvg[m]+param));
rotVec[m] = new Atom();
rotVec[m].RandGen();
rotVec[m].normalize();

point[m] = new Atom(centar[m]); //wiggle
point[m].elem = "Z";

end[m] = new Atom(point[m]);
end[m].plus1(ranVec[m]);

for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
tempVec[i] = new Atom(testAtom[i]);
var size = tempVec[i].size();
tempVec[i].normalize();
tempVec[i].rotate(rotVec[m], angle);
tempVec[i].scale(size*2);
tempVec[i].plus1(ranVec[m]);
tempVec[i].plus1(point[m]);
  demo += (Object.values(tempVec[i])+"<br>");
}
}
}
} //WIGGLE END


if (method == 6) { //KICK ORIGIN
for (n=0; n < fragments.length; n++){
m = fragments[n];
demo += ("Fragment "+m+"<br>");
ranVec[m] = new Atom();
ranVec[m].RandGen();
ranVec[m].normalize();
ranVec[m].scale(distFragAvg[m]+Math.random()*(distFragAvg[m]+param));
rotVec[m] = new Atom();
rotVec[m].RandGen();
rotVec[m].normalize();

point[m] = new Atom(); //wiggle
point[m].elem = "Z";

end[m] = new Atom(point[m]);
end[m].plus1(ranVec[m]);

for (i=0; i < atom.length; i++){
if (testAtom[i].f == m){  
tempVec[i] = new Atom(testAtom[i]);
var size = tempVec[i].size();
tempVec[i].normalize();
tempVec[i].rotate(rotVec[m], angle);
tempVec[i].scale(size*2);
tempVec[i].plus1(ranVec[m]);
tempVec[i].plus1(point[m]);
  demo += (Object.values(tempVec[i])+"<br>");
}
}
}
} //KICK ORIGIN END

demo += ("<br>");

//CHECK TIME!
check = 1; //EVERYTHING GOES

if (4 <= method){ //only between different fragment distances
for (i=0; i < tempVec.length; i++){
for (k=i+1; k < tempVec.length; k++){
if (i != k){
if (tempVec[i].f != tempVec[k].f){
var dist = tempVec[i].Distance(tempVec[k]);
var cov = tempVec[i].CovBond(tempVec[k]);
demo += (i+" "+k+" "+dist);
if (dist < val3*cov){
check = 0 //do loop again
demo += (" Error! "+"<br>");
} else {
demo += ("<br>");
}
}
}
}
}
} 

//COALESCENCE - finding good starting kick
if(method == 3){
var fragm = [...new Set(tempVec.map(x => x.f))];
var coalCheck = 0;
//var loopCounter = Math.floor(fragm.length/2);
var loopCounter = fragm.length+3;
var loop = 0;
demo += ("<br>");

while (coalCheck == 0){
//distance check only
for (i=0; i < tempVec.length; i++){
for (k=i+1; k < tempVec.length; k++){
if (i != k){
if (tempVec[k].f != 0) {
var dist = tempVec[i].Distance(tempVec[k]);
var cov = tempVec[i].CovBond(tempVec[k]);
demo += (i+" "+k+" "+dist);

if (dist < val1*cov){
check = 0 //do loop again
demo += (" Error! "+"<br>");
coalCheck = 1; //out of coalescence loop
} else {
if (dist < val2*cov){
demo += (" Fragment contract: atom: "+k+" frag: "+tempVec[k].f+" => frag: "+tempVec[i].f);
tempVec[k].f = tempVec[i].f;
//distlistCoal[i] = new DistVec(i,k,distCoal[i],dist,cov);
}
demo += ("<br>");
}

}
}
}
}

var somedist = [];
var mindist = [];
var var1 = [];
var var2 = [];
var var3 = [];
fragm = [...new Set(tempVec.map(x => x.f))];
demo += ("<br>");
demo += (" Fragment count "+fragm.length);
demo += ("<br>");
for (n=0; n<fragm.length; n++){
somedist[n] = [];
var1[n] = [];
var2[n] = [];
for (i=0; i<tempVec.length;i++){
if (tempVec[i].f == n){
for (k=0; k<tempVec.length;k++){
if (tempVec[k].f != n){
for (m=n+1; m<fragm.length; m++){
if (tempVec[k].f == fragm[m]){
somedist[n].push(tempVec[i].Distance(tempVec[k]));
var1[n].push(i);
var2[n].push(k);
}
}
}
}
}  
}
demo += ("Frag "+n+" distances "+somedist[n]+"<br>");
mindist[n] = Math.min.apply(Math, somedist[n]);
demo += ("Frag "+n+" minimal distance "+mindist[n]+"<br>");
var3[n] = somedist[n].indexOf(mindist[n]);
demo += ("Minimal between atoms "+var1[n][var3[n]]+" "+var2[n][var3[n]]+"<br>");
}

var firstToChange = mindist.indexOf(Math.min.apply(Math,mindist));
demo += ("<br>"+"First to change "+var1[firstToChange][var3[firstToChange]]+" "+var2[firstToChange][var3[firstToChange]]+"<br>");
//demo += ("<br>"+"First to change "+var1[n][var3[firstToChange]]+" "+var2[n][var3[firstToChange]]+"<br>");

var changeNew = new Atom();
changeNew.plus1(tempVec[var2[firstToChange][var3[firstToChange]]]);
demo += ("To be moved: "+Object.values(changeNew)+"<br>");
var changeOld = new Atom();
changeOld.plus1(tempVec[var1[firstToChange][var3[firstToChange]]]);
demo += ("Closer to: "+Object.values(changeOld)+"<br>");
var vecChange = new Atom(changeOld);
vecChange.minus1(changeNew);
demo += ("Change vector: "+Object.values(vecChange)+"<br>");
var vecChangeSize = (changeOld.Distance(changeNew)-tempVec[var2[firstToChange][var3[firstToChange]]].rad-tempVec[var1[firstToChange][var3[firstToChange]]].rad);
demo += ("Distance: "+changeOld.Distance(changeNew)+" Size: "+vecChangeSize+"<br>");
vecChange.normalize();
vecChange.scale(vecChangeSize);
changeNew.plus1(vecChange);

demo += ("Difference from old "+Object.values(tempVec[var2[firstToChange][var3[firstToChange]]])+"<br>");
demo += ("Difference from to new "+Object.values(changeNew)+"<br>");
tempVec[var2[firstToChange][var3[firstToChange]]].x = changeNew.x;
tempVec[var2[firstToChange][var3[firstToChange]]].y = changeNew.y;
tempVec[var2[firstToChange][var3[firstToChange]]].z = changeNew.z;
tempVec[var2[firstToChange][var3[firstToChange]]].f = tempVec[var1[firstToChange][var3[firstToChange]]].f;
demo += ("<br>");


if (fragm.length <= 2) {
coalCheck=1;
} else {
loop++
}

demo += ("Loop "+loop+"<br>");

if (loop == loopCounter){
coalCheck=1
  loop=0;
}

//coalCheck=1;

} //end while loop coalCheck
} //end method 3 check

if (method <= 2){ //between atoms, excluding 0 fragment
for (i=0; i < tempVec.length; i++){
for (k=i+1; k < tempVec.length; k++){
if (i != k){
if (tempVec[k].f != 0) {
var dist = tempVec[i].Distance(tempVec[k]);
var cov = tempVec[i].CovBond(tempVec[k]);
demo += (i+" "+k+" "+dist);
if (dist < cov){ //sum of covalent radius as limit
  check = 0 //do loop again
demo += (" Error! "+"<br>");
} else {
demo += ("<br>");
}
}
}
}
}
}

if (check == 0){
  error1++;
  good1 = 0;
  demo += (" Error! "+error1+"/"+errorCounter+"<br>"+"<br>");
}

if (check == 1){
  good1++;
  error1 = error1 -1;
  if (error1 <= 0){
  error1 = 0;
  }
  demo += (" Good! "+good1+"/"+goodCounter+"<br>"+"<br>");
  demo += (tempVec.length+"<br>");
  demo += ("strucutre No"+count1+"<br>");
  for (i=0; i < tempVec.length; i++){
  demo += (tempVec[i].elem+" "+tempVec[i].x+" "+tempVec[i].y+" "+tempVec[i].z+"<br>");
}

}

if (error1 == errorCounter){
  error1 = 0;
  param = param + 0.1;
  demo += (" Parametar adjusted: "+param+"<br>"+"<br>");
  demo1 += ("=> "+param.toFixed(2)+" ");
}

if (goodCounter <= good1){
  good1 = 0;
  param = param - 0.1;
  if (param <= 0){
  param = 0;
  }
  demo += (" Parametar adjusted: "+param+"<br>"+"<br>");
  demo1 += ("=> "+param.toFixed(2)+" ");
  if (error1 != 0){
//  demo1 += (" Parametar decreased to: "+param+"<br>");
}
}
//check=1

} //while check loop end

demo2 += (tempVec.length+"<br>");
demo2 += ("Structure No."+count1+" generated by kick procedure"+"<br>");
for (i=0; i < tempVec.length; i++){
demo2 += (tempVec[i].elem+" "+tempVec[i].x.toFixed(4)+" "+tempVec[i].y.toFixed(4)+" "+tempVec[i].z.toFixed(4)+"<br>");
}
demo2 += ("<br>");

var alnewatom=newAtom.length;
for (i=0; i < tempVec.length; i++){
newAtom[alnewatom+i]=new Atom(tempVec[i]);
newAtom[alnewatom+i].resi=count1;
newAtom[alnewatom+i].bonds=0;
}

var alpoint=newPointStart.length;
for (i=0; i < point.length; i++){
newPointStart[i+alpoint] = new Atom(point[i]);
newPointEnd[i+alpoint] = new Atom(end[i]);
}


if (method == 0){
var alpoint=newPointStart.length;
for (i=0; i < point.length; i++){
newPointStart[i+alpoint] = new Atom(point[i]);
newPointEnd[i+alpoint] = new Atom(end[i]);
//demo1 += (newPointStart[i+alpoint].x+" "+newPointStart[i+alpoint].y+" "+newPointStart[i+alpoint].z+"<br>");
//demo1 += (newPointEnd[i+alpoint].x+" "+newPointEnd[i+alpoint].y+" "+newPointEnd[i+alpoint].z+"<br>");
}
}

//for (i=newAtom.length-atom.length; i < newAtom.length; i++){
//newAtom[i].resi = count1;
//}

} //counter loop END


demo1 += ("<br>"+"<strong>ALL ATOMS FROM ALL STRUCTURES</strong>"+"<br>");

var bond = [];
demo += ("<br>");
for (i=0; i < newAtom.length; i++){
bond[i] = [];
for (k=0; k < newAtom.length; k++){
if (newAtom[i].f == newAtom[k].f){
if (newAtom[i].resi == newAtom[k].resi){
if (i != k) {
var dist = newAtom[i].Distance(newAtom[k]);
var cov = newAtom[i].CovBond(newAtom[k]);
if (val1*cov <= dist && dist <= val2*cov){
bond[i].push(k);
}
}  
}
}
}
newAtom[i].bonds = bond[i];
demo += (Object.values(newAtom[i])+"<br>");
}



//visualization
$(function() {
  let element = $('#container-01');
  let config = { backgroundColor: '#fbfbfb' };
  let viewer = $3Dmol.createViewer( element, config );
            var m = viewer.addModel();
            m.addAtoms(atom);
            m.addAtoms(newAtom);
            m.addAtoms(newPointStart);
            m.addAtoms(newPointEnd);
            for (i=0; i<newPointStart.length; i++){
viewer.addLine({start:newPointStart[i],end:newPointEnd[i]});
};
if (method == 3){
for (i=0; i<newPointEnd.length; i++){
viewer.addLine({start:newPointEnd[i],end:newAtom[i]});
};};
            //m.addAtoms(tempVec);
            m.setStyle({},{sphere:{scale:0.3},stick:{radius:0.2}});
            viewer.setStyle({resi:'0'},{sphere:{scale:0.2,color:"#cccccc"},stick:{radius:0.15,color:"#cccccc"}});
            viewer.setStyle({elem:'X'},{sphere:{scale:0.1,color:"#eeeeee"}});
            viewer.setStyle({elem:'Z'},{sphere:{scale:0.1,color:"#000000"}});
            viewer.zoomTo();
            viewer.render();
});

demo1 += ("<br>"+"<strong>GENERATED NEW STRUCTURES</strong>"+"<br>");

document.getElementById('demo').innerHTML = demo ;
document.getElementById('demo1').innerHTML = demo1 ;
document.getElementById('demo2').innerHTML = demo2 ;

//REPLACE <br> with /n
function br2nl (str, replaceMode) {
  var replaceStr = (replaceMode) ? "\n" : '';
  // Includes <br>, <BR>, <br />, </br>
  return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
}

//DOWNLOAD
// Generate download of kick.xyz file with some content
    var text = br2nl(demo2,true);
    var downloadBox = document.getElementById("download");


    if (downloadBox.checked == true){
        if (method == 0){
    var filename = "Saunders.xyz";
    }
        if (method == 1){
    var filename = "SaundOrigin.xyz";
    }
        if (method == 2){
    var filename = "SaundFrozen.xyz";
    }
        if (method == 3){
    var filename = "Coalesc.xyz";
    }
        if (method == 4){
    var filename = "Kick.xyz";
    }
        if (method == 5){
    var filename = "Wiggle.xyz";
    }
        if (method == 6){
    var filename = "KickOrigin.xyz";
    }
    download(filename, text);
    }

} //END OF FUNCTION GENERATE

