var camera, scene, renderer,
    geometry, material, mesh;

// define the function
// for the curve though we need to specify start/end for t
function helixGen(a, b) {
    return function(t) {
        return [a * Math.cos(t), a * Math.sin(t), b * t]
    }
}

function helixGenPrime(a, b) {
    return function(t) {
        return [-a * Math.sin(t), a * Math.cos(t), b]
    }
}

// TODO use range generator
// TODO add first, last to range generator
function range(first, last, step) {
    var result = [];
    for (var i = first; i < last; i += step) {
        result.push(i);
    }
    result.push(last);
    return result;
}


function init() {

    camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.PlaneGeometry( 400, 400, 32, 32 );
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    mesh = new THREE.Mesh( geometry, material );
    //scene.add( mesh );

    var geometry = new THREE.Geometry();
    
    var radius = 200;
    var helix = helixGen(radius, 10.0);
    var helixPrime = helixGenPrime(radius, 10.0);
    var values = range(-4 * Math.PI, 4 * Math.PI, 0.1);

    values.forEach(function (t) {
        var pos = helix(t);
        geometry.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2])); 
    });

    var up = new THREE.Vector3(0, 0, 1);
    
    var startPos = helix(-4 * Math.PI);
    startPos = new THREE.Vector3(startPos[0], startPos[1], startPos[2]);
    var startNorm = helixPrime(-4 * Math.PI);
    startNorm = new THREE.Vector3(startNorm[0], startNorm[1], startNorm[2]);
    startNorm.normalize();
    startNorm.normalize();
    var startQuat = new THREE.Quaternion();
    startQuat.setFromUnitVectors(up, startNorm);

    var endPos = helix(4 * Math.PI);
    endPos = new THREE.Vector3(endPos[0], endPos[1], endPos[2]);
    var endNorm = helixPrime(4 * Math.PI);
    endNorm = new THREE.Vector3(endNorm[0], endNorm[1], endNorm[2]);
    endNorm.normalize();
    var endQuat = new THREE.Quaternion();
    endQuat.setFromUnitVectors(up, endNorm);
    
    material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var line = new THREE.Line( geometry, material );
    scene.add( line );

    geometry = new THREE.PlaneGeometry( 100, 100, 2, 2 );
    var material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1.0, 0.0, 0.0), 
        //side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    
    var plane1 = new THREE.Mesh( geometry, material );
    plane1.position.set(startPos.x, startPos.y, startPos.z);
    plane1.quaternion.multiply(startQuat);
    scene.add( plane1 );
    
    var plane2 = new THREE.Mesh( geometry, material );
    plane2.position.set(endPos.x, endPos.y, endPos.z);
    plane2.quaternion.multiply(endQuat);
    scene.add( plane2 );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x333333);
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    var controls = new THREE.OrbitControls(camera);
}

function render() {
    renderer.render( scene, camera );
}

init();
render();

var down = false;
document.addEventListener('mousedown', function () {
    down = true; 
});
document.addEventListener('mousemove', function () {
    if (down) {
        requestAnimationFrame(render);
    }
});
document.addEventListener('mouseup', function () {
    if (down) {
        down = false;
    }
});


var gl = renderer.context;
var available_extensions = gl.getSupportedExtensions();

