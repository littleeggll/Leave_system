// JavaScript Document
       !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Delaunator=e()}(this,function(){"use strict";function t(t){if(!ArrayBuffer.isView(t))throw new Error("Expected coords to be a typed array.");var o=1/0,l=1/0,f=-1/0,u=-1/0,v=t.length>>1,d=this.ids=new Uint32Array(v);this.coords=t;for(var g=0;g<v;g++){var _=t[2*g],x=t[2*g+1];_<o&&(o=_),x<l&&(l=x),_>f&&(f=_),x>u&&(u=x),d[g]=g}var p,c,y,w=(o+f)/2,z=(l+u)/2,E=1/0;for(g=0;g<v;g++){var k=e(w,z,t[2*g],t[2*g+1]);k<E&&(p=g,E=k)}for(E=1/0,g=0;g<v;g++)g!==p&&(k=e(t[2*p],t[2*p+1],t[2*g],t[2*g+1]))<E&&k>0&&(c=g,E=k);var m=1/0;for(g=0;g<v;g++)if(g!==p&&g!==c){var b=i(t[2*p],t[2*p+1],t[2*c],t[2*c+1],t[2*g],t[2*g+1]);b<m&&(y=g,m=b)}if(m===1/0)throw new Error("No Delaunay triangulation exists for this input.");if(r(t[2*p],t[2*p+1],t[2*c],t[2*c+1],t[2*y],t[2*y+1])<0){var A=c;c=y,y=A}var L=t[2*p],M=t[2*p+1],S=t[2*c],T=t[2*c+1],K=t[2*y],D=t[2*y+1],U=function(t,e,r,i,n,h){var s=(r-=t)*r+(i-=e)*i,a=(n-=t)*n+(h-=e)*h,o=r*h-i*n;return{x:t+.5*(h*s-i*a)/o,y:e+.5*(r*a-n*s)/o}}(L,M,S,T,K,D);for(this._cx=U.x,this._cy=U.y,function t(e,r,i,n,h,o){var l,f,u;if(n-i<=20)for(l=i+1;l<=n;l++){for(u=e[l],f=l-1;f>=i&&s(r,e[f],u,h,o)>0;)e[f+1]=e[f--];e[f+1]=u}else{var v=i+n>>1;for(f=n,a(e,v,l=i+1),s(r,e[i],e[n],h,o)>0&&a(e,i,n),s(r,e[l],e[n],h,o)>0&&a(e,l,n),s(r,e[i],e[l],h,o)>0&&a(e,i,l),u=e[l];;){do{l++}while(s(r,e[l],u,h,o)<0);do{f--}while(s(r,e[f],u,h,o)>0);if(f<l)break;a(e,l,f)}e[i+1]=e[f],e[f]=u,n-l+1>=f-i?(t(e,r,l,n,h,o),t(e,r,i,f-1,h,o)):(t(e,r,i,f-1,h,o),t(e,r,l,n,h,o))}}(d,t,0,d.length-1,U.x,U.y),this._hashSize=Math.ceil(Math.sqrt(v)),this._hash=[],g=0;g<this._hashSize;g++)this._hash[g]=null;var j=this.hull=n(t,p);this._hashEdge(j),j.t=0,j=n(t,c,j),this._hashEdge(j),j.t=1,j=n(t,y,j),this._hashEdge(j),j.t=2;var q,B,F=2*v-5,I=this.triangles=new Uint32Array(3*F),N=this.halfedges=new Int32Array(3*F);this.trianglesLen=0,this._addTriangle(p,c,y,-1,-1,-1);for(var V=0;V<d.length;V++)if(_=t[2*(g=d[V])],x=t[2*g+1],!(_===q&&x===B||(q=_,B=x,_===L&&x===M||_===S&&x===T||_===K&&x===D))){var C,G=this._hashKey(_,x),H=G;do{C=this._hash[H],H=(H+1)%this._hashSize}while((!C||C.removed)&&H!==G);for(j=C;r(_,x,j.x,j.y,j.next.x,j.next.y)>=0;)if((j=j.next)===C)throw new Error("Something is wrong with the input points.");var J=j===C,O=this._addTriangle(j.i,g,j.next.i,-1,-1,j.t);j.t=O,(j=n(t,g,j)).t=this._legalize(O+2),j.prev.prev.t===N[O+1]&&(j.prev.prev.t=O+2);for(var P=j.next;r(_,x,P.x,P.y,P.next.x,P.next.y)<0;)O=this._addTriangle(P.i,g,P.next.i,P.prev.t,-1,P.t),P.prev.t=this._legalize(O+2),this.hull=h(P),P=P.next;if(J)for(P=j.prev;r(_,x,P.prev.x,P.prev.y,P.x,P.y)<0;)O=this._addTriangle(P.prev.i,g,P.i,-1,P.t,P.prev.t),this._legalize(O+2),P.prev.t=O,this.hull=h(P),P=P.prev;this._hashEdge(j),this._hashEdge(j.prev)}this.triangles=I.subarray(0,this.trianglesLen),this.halfedges=N.subarray(0,this.trianglesLen)}function e(t,e,r,i){var n=t-r,h=e-i;return n*n+h*h}function r(t,e,r,i,n,h){return(i-e)*(n-r)-(r-t)*(h-i)}function i(t,e,r,i,n,h){var s=(r-=t)*r+(i-=e)*i,a=(n-=t)*n+(h-=e)*h;if(0===s||0===a)return 1/0;var o=r*h-i*n;if(0===o)return 1/0;var l=.5*(h*s-i*a)/o,f=.5*(r*a-n*s)/o;return l*l+f*f}function n(t,e,r){var i={i:e,x:t[2*e],y:t[2*e+1],t:0,prev:null,next:null,removed:!1};return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function h(t){return t.prev.next=t.next,t.next.prev=t.prev,t.removed=!0,t.prev}function s(t,r,i,n,h){return e(t[2*r],t[2*r+1],n,h)-e(t[2*i],t[2*i+1],n,h)||t[2*r]-t[2*i]||t[2*r+1]-t[2*i+1]}function a(t,e,r){var i=t[e];t[e]=t[r],t[r]=i}function o(t){return t[0]}function l(t){return t[1]}return t.from=function(e,r,i){r||(r=o),i||(i=l);for(var n=e.length,h=new Float64Array(2*n),s=0;s<n;s++){var a=e[s];h[2*s]=r(a),h[2*s+1]=i(a)}return new t(h)},t.prototype={_hashEdge:function(t){this._hash[this._hashKey(t.x,t.y)]=t},_hashKey:function(t,e){var r=t-this._cx,i=e-this._cy,n=1-r/(Math.abs(r)+Math.abs(i));return Math.floor((2+(i<0?-n:n))/4*this._hashSize)},_legalize:function(t){var e,r,i,n,h,s,a,o,l,f,u=this.triangles,v=this.coords,d=this.halfedges,g=d[t],_=t-t%3,x=g-g%3,p=_+(t+1)%3,c=_+(t+2)%3,y=x+(g+2)%3,w=u[c],z=u[t],E=u[p],k=u[y];if(e=v[2*w],r=v[2*w+1],i=v[2*z],n=v[2*z+1],h=v[2*E],s=v[2*E+1],a=v[2*k],o=v[2*k+1],l=(i-=a)*i+(n-=o)*n,f=(h-=a)*h+(s-=o)*s,(e-=a)*(n*f-l*s)-(r-=o)*(i*f-l*h)+(e*e+r*r)*(i*s-n*h)<0){u[t]=k,u[g]=w,this._link(t,d[y]),this._link(g,d[c]),this._link(c,y);var m=x+(g+1)%3;return this._legalize(t),this._legalize(m)}return c},_link:function(t,e){this.halfedges[t]=e,-1!==e&&(this.halfedges[e]=t)},_addTriangle:function(t,e,r,i,n,h){var s=this.trianglesLen;return this.triangles[s]=t,this.triangles[s+1]=e,this.triangles[s+2]=r,this._link(s,i),this._link(s+1,n),this._link(s+2,h),this.trianglesLen+=3,s}},t});

/*
  Thpace = Three + Space;
*/

class Thpace {
    constructor(canvas, settings) {
        if (!canvas) {
            console.log('Need a valid canvas element.');
            return;
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.triangles = [];
        this.particles = [];
        this.coordinateTable = {};
        this.baseCoordinateTable = {};
        this.settings = extend({
            triangleSize: 130,
            bleed: 200,
            noise: 60,
            color1: '#360033',
            color2: '#0b8793',
            pointVariationX: 20,
            pointVariationY: 35,
            pointAnimationSpeed: 15,
            image: false,
            imageOpacity: .4
        }, settings);

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        this.gradientOpacity = 1;
    }

    animate() {
        const ctx = this.ctx;

        ctx.clearRect(0,0,this.width, this.height);

        this.triangles.forEach((t) => {
            ctx.beginPath();

            var coords = [];
            coords.push({x: t[0][0], y: t[0][1]});
            coords.push({x: t[1][0], y: t[1][1]});
            coords.push({x: t[2][0], y: t[2][1]});

            var color = t[3];

            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            var dp = [0,1,2,0];
            dp.forEach((el, ind)=>{
                if(this.coordinateTable[coords[el].x] && this.coordinateTable[coords[el].x][coords[el].y] != undefined){


                    var c = {x:coords[el].x, y:coords[el].y};
                    var change = this.coordinateTable[coords[el].x][coords[el].y];


                    if(ind == 0){
                        ctx.moveTo(c.x+change.x, c.y+change.y);
                    }
                    else{
                        ctx.lineTo(c.x+change.x, c.y+change.y);
                    }
                }
            });

            ctx.fill();
            ctx.stroke();
        });


        this.particles.forEach(p=>{
            p.update();
        });

        this.particles.forEach(p=>{
            p.draw();
        });

        if(this.settings.image){
            var pat = ctx.createPattern(this.settings.image, 'repeat');
            ctx.globalAlpha = this.settings.imageOpacity;
            ctx.fillStyle = pat;
            ctx.fillRect(0,0, this.width, this.height);
            ctx.globalAlpha = 1;
        }

        this.animateCoordinateTable();
        requestAnimationFrame(this.animate.bind(this));
    }

    start() {
        this.animate();
    }

    generateTriangles() {
        var points = [];
        var coordinateTable = {};
        points.push([0, 0]);
        points.push([0, this.height]);
        points.push([this.width, 0]);
        points.push([this.width, this.height]);

        var bleed = this.settings.bleed;
        var size = this.settings.triangleSize;
        var noise = this.settings.noise;

        for (var i = 0 - bleed; i < this.width + bleed; i += size) {
            for (var j = 0 - bleed; j < this.height + bleed; j += size) {
                var x = i + getRandomInt(0, noise);
                var y = j + getRandomInt(0, noise);
                points.push([x,y]);
            }
        }


        const delaunay = Delaunator.from(points);
        const triangleList = delaunay.triangles

        var coordinates = [];

        for (let i = 0; i < triangleList.length; i += 3) {
            var t = [
                points[triangleList[i]],
                points[triangleList[i + 1]],
                points[triangleList[i + 2]],
                
            ];

            var coords = [];
            coords.push({x: t[0][0], y: t[0][1]});
            coords.push({x: t[1][0], y: t[1][1]});
            coords.push({x: t[2][0], y: t[2][1]});

            var color = gradient(getCenter(coords), this.width, this.height, this.settings.color1, this.settings.color2);

            t.push(color);


            for(var j = 0; j <= 2; j++){
                var p = points[triangleList[i+j]];
                var x = p[0];
                var y = p[1];
            }

            coordinates.push(t);
        }

        var baseCoordinateTable = {};
        coordinates.forEach(t=>{
            t.forEach(p=>{
                var x = p[0];
                var y = p[1];

                if(!coordinateTable[x]){
                    coordinateTable[x] = {};
                }

                var per = x/this.width;

                coordinateTable[x][y] = 0;

                if(!baseCoordinateTable[x]){
                    baseCoordinateTable[x] = {};
                }
                baseCoordinateTable[x][y] = per*2*Math.PI;
            });
        });

        this.triangles = coordinates;
        this.coordinateTable = coordinateTable;
        this.baseCoordinateTable = baseCoordinateTable;
    }

    generateParticles(){
        var particles = [];
        for(var i = 0; i < 250; i++){
            var pSet = {
                ctx: this.ctx,
                width: this.width,
                height: this.height
            }
            particles.push(new Particle(pSet));
        }
        this.particles = particles;
    }

    animateCoordinateTable(){
        Object.keys(this.coordinateTable).forEach(x=>{
            Object.keys(this.coordinateTable[x]).forEach(y=>{
                this.baseCoordinateTable[x][y] += this.settings.pointAnimationSpeed/1000;

                // console.log(this.baseCoordinateTable[x][y]);

                var changeX = (Math.cos(this.baseCoordinateTable[x][y])*this.settings.pointVariationX);
                var changeY = (Math.sin(this.baseCoordinateTable[x][y])*this.settings.pointVariationY);

                this.coordinateTable[x][y] = {
                    x: changeX,
                    y: changeY
                };
            });
        });
    }

    resize() {
        var p = this.canvas.parentElement;
        this.canvas.width = p.clientWidth;
        this.canvas.height = p.clientHeight;
        this.width = p.clientWidth;
        this.height = p.clientHeight;

        this.generateTriangles();
        this.generateParticles();
    }
}

class Particle{
    constructor(pSet){
        this.ctx = pSet.ctx;
        this.x = getRandomInt(0, pSet.width);
        this.y = getRandomInt(0, pSet.height);
        this.ox = this.x;
        this.oy = this.y;

        this.interval = getRandomInt(1000, 5000);
        this.limit = getRandomInt(5, 15);
        this.opacity = getRandomFloat(0.1, 0.7);
        this.r = getRandomFloat(1, 2);
    }
    update(){
        this.x = this.ox+(Math.cos(performance.now()/this.interval)*this.limit);
        this.y = this.oy+((Math.sin(performance.now()/this.interval)*this.limit)/2);
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        this.ctx.fillStyle = 'rgba(255,255,255, '+this.opacity+')';
        this.ctx.fill();
    }
}


function gradient(coords, width, height, leftColor, rightColor) {

    var x = coords.x;
    var y = coords.y;

    var per = 0;

    per = (x / width);

    var per2 = 0;

    per2 = (y/height);

    per = (per2 + per)/2;

    if(per > 1){
        per = 1;
    }
    else if(per < 0){
        per = 0;
    }


    var color1 = leftColor;
    var color2 = rightColor;
    var hex = function (x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(color1.substring(1, 3), 16) * per + parseInt(color2.substring(1, 3), 16) * (1 - per));
    var g = Math.ceil(parseInt(color1.substring(3, 5), 16) * per + parseInt(color2.substring(3, 5), 16) * (1 - per));
    var b = Math.ceil(parseInt(color1.substring(5, 7), 16) * per + parseInt(color2.substring(5, 7), 16) * (1 - per));

    var middle = "#" + hex(r) + hex(g) + hex(b);

    // if (up) {
    //     offset += 6;
    // }
    // if (offset > width * 2) {
    //     offset = 0;
    // }
    // if (debug) {

    //     //console.log(per);
    // }

    return middle;
}

function getPointBetweenPoints(p1, p2, d) {
    var dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    var t = d / dist;
    return {
        x: (((1 - t) * p1.x) + t * p2.x),
        y: (((1 - t) * p1.y) + t * p2.y),
    };
}

function getCenter(coords) {
    var sumX = 0;
    var sumY = 0;

    coords.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });

    return { x: sumX / coords.length, y: sumY / coords.length }
}

var extend = function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }

    return out;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbaFromHex(hex, a) {
    var rgb = hexToRgb(hex);

    return getRGBA(rgb.r, rgb.g, rgb.b, a);
}

function getRGBA(r, g, b, a) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

let canvas = document.getElementById('canvas');

let spaceboi = new Thpace(canvas);

spaceboi.start();

