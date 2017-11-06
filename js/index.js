/*
** Author  : Nick Gatti
** Contact : https://www.linkedin.com/in/nick-gatti/
** Nick    : https://github.com/NickGatti
** Licence : MIT License

Copyright (c) 2017 Nicholas Gatti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
let instructionsJSON = [ {
    h2: "Instructions"
}, {
    p: "Mouse Button"
}, {
    p: "LMB (Left Mouse Button) - Rotate, hold and move"
}, {
    p: "MMB (Middle Mouse Button or Wheel) -  Zoom, hold and move"
}, {
    p: "RMB (Right Mouse Button) - Pan, hold and move"
} ];
window.onresize = () => {
    document.getElementById( "toggleWrapper" )
        .style.display = 601 < window.innerWidth ? "flex" : "block"
};
let buttonToggle = {
    x3dwrapper: {
        id: "x3dwrapper",
        toggle: !0
    },
    instructions: {
        id: "HTMLdiv",
        toggle: !1
    },
    compareThreeDee: {
        id: "HTMLdiv",
        toggle: !1
    },
    diagnosis: {
        id: "HTMLdiv",
        toggle: !1
    },
    twoDeeDrawing: {
        id: "twoDeeDrawing",
        toggle: !1
    }
};
var oReq = new XMLHttpRequest;
let dataObj = {
        toggleBar: {},
        anatomicalModel: {},
        IPCCCID: {}
    },
    quoteParse = ( a, b, c, d ) => {
        let e = null;
        for ( let f = b; !d.slice( a, a + f )
            .endsWith( "\"" ); f++ ) e = d.slice( a + c, a + f );
        return e
    },
    createParseArray = ( a, b ) => {
        let c = b.indexOf( a ),
            d = 0,
            e = [],
            f = [];
        for ( let g = c; 0 >= d; c + g++ ) - 1 == c && d++, 0 < c && e.push( c ), c = b.indexOf( a, g + c );
        for ( let g = 0; g < e.length; g++ ) f.push( quoteParse( e[ g ], a.length + 3, a.length + 2, b ) );
        return f
    },
    createParse = ( a, b ) => {
        return quoteParse( b.indexOf( a ), a.length + 3, a.length + 2, b )
    },
    appendToggleButtons = () => {
        let a = document.getElementById( "toggleWrapper" ),
            b = document.createElement( "div" );
        for ( let c = 0; c < dataObj.toggleBar.ID.length; c++ ) b.className = "selectTab", b.innerHTML = dataObj.toggleBar.text[ c ] + "<br> ON", b.id = dataObj.toggleBar.ID[ c ], a.appendChild( b ), a = document.getElementById( "toggleWrapper" ), b = document.createElement( "div" ), document.getElementById( dataObj.toggleBar.ID[ c ] )
            .addEventListener( "click", () => {
                let d = document.getElementById( dataObj.anatomicalModel.ID[ c ] );
                d && ( void 0 === typeof d.renderToggle ? ( d.setAttribute( "render", !1 ), d.renderToggle = !0 ) : d.renderToggle ? ( d.setAttribute( "render", !0 ), d.renderToggle = !1, document.getElementById( dataObj.toggleBar.ID[ c ] )
                    .innerHTML = dataObj.toggleBar.text[ c ] + "<br> ON" ) : ( d.setAttribute( "render", !1 ), d.renderToggle = !0, document.getElementById( dataObj.toggleBar.ID[ c ] )
                    .innerHTML = dataObj.toggleBar.text[ c ] + "<br> OFF" ) )
            } )
    },
    hoverTransition = ( a, b ) => {
        document.getElementById( a )
            .addEventListener( "mouseover", () => {
                document.getElementById( a )
                    .style.backgroundColor = "lime"
            } ), document.getElementById( a )
            .addEventListener( "mouseout", () => {
                document.getElementById( a )
                    .style.backgroundColor = b
            } ), document.getElementById( a )
            .addEventListener( "touchstart", () => {
                document.getElementById( a )
                    .style.backgroundColor = "lime"
            } ), document.getElementById( a )
            .addEventListener( "touchend", () => {
                document.getElementById( a )
                    .style.backgroundColor = b
            } )
    },
    colorToggleButtons = () => {
        for ( let a = 0; a < dataObj.toggleBar.ID.length; a++ ) document.getElementById( dataObj.toggleBar.ID[ a ] )
            .style.backgroundColor = dataObj.toggleBar.color[ a ], hoverTransition( dataObj.toggleBar.ID[ a ], dataObj.toggleBar.color[ a ] )
    },
    useButtonToggleObj = () => {
        let a = "";
        for ( let b in buttonToggle ) buttonToggle[ b ].toggle ? a = buttonToggle[ b ].id : document.getElementById( buttonToggle[ b ].id )
            .style.display = "none";
        document.getElementById( a )
            .style.display = "flex"
    },
    switchDefaultButton = () => {
        buttonToggle.x3dwrapper.toggle = !buttonToggle.x3dwrapper.toggle
    },
    switchSelectedButton = a => {
        if ( buttonToggle[ a ].toggle ) return buttonToggle.x3dwrapper.toggle = !0, void( buttonToggle[ a ].toggle = !1 );
        for ( let b in buttonToggle ) buttonToggle[ b ].toggle = !1;
        buttonToggle[ a ].toggle = !0
    },
    toggleDivs = a => {
        switchDefaultButton(), switchSelectedButton( a ), useButtonToggleObj( a )
    },
    toggleHTML = a => {
        document.getElementById( "displayHTML" )
            .innerHTML = "";
        let b = null,
            c = null,
            d = null;
        for ( let f, e = 0; e < a.length; e++ ) {
            if ( f = Object.keys( a[ e ] ), "container" == f ) {
                c = document.createElement( a[ e ].container.outerType );
                for ( let g = 0; g < a[ e ].container.contents.length; g++ ) b = document.createElement( a[ e ].container.innerType ), b.innerHTML = a[ e ].container.contents[ g ], c.appendChild( b );
                document.getElementById( "displayHTML" )
                    .appendChild( c )
            } else b = document.createElement( f ), b.innerHTML = a[ e ][ f ], document.getElementById( "displayHTML" )
                .appendChild( b );
            if ( e === a.length - 1 )
                for ( let g = 0; 6 > g; g++ ) d = document.createElement( "br" ), document.getElementById( "displayHTML" )
                    .appendChild( d )
        }
    },
    appendInfoButtons = () => {
        let a = document.getElementById( "infoWrapper" ),
            b = ( c, d, e, f ) => {
                c.className = "selectTab", f && ( c.id = f ), c.innerHTML = e, c.style.background = "deepskyblue", a.appendChild( c )
            };
        b( document.createElement( "div" ), "deepskyblue", "Instructions", "instructionsButton" ), b( document.createElement( "div" ), "deepskyblue", "Hide/Show", "showToggleWrapperButton" ), b( document.createElement( "div" ), "deepskyblue", "Compare 3D", "compareThreeDeeButton" ), b( document.createElement( "div" ), "deepskyblue", "Diag Info", "diagnosisButton" ), b( document.createElement( "div" ), "deepskyblue", "2D Drawing", "twoDeeDrawingButton" ), b( document.createElement( "div" ), "deepskyblue", "IPCCCID: " + dataObj.IPCCCID.ID ), document.getElementById( "showToggleWrapperButton" )
            .addEventListener( "click", () => {
                "hidden" === document.getElementById( "toggleWrapper" )
                    .style.visibility ? ( document.getElementById( "toggleWrapper" )
                        .style.visibility = "visible", document.getElementById( "toggleWrapper" )
                        .style.display = 600 < window.innerWidth ? "flex" : "block" ) : ( document.getElementById( "toggleWrapper" )
                        .style.visibility = "hidden", document.getElementById( "toggleWrapper" )
                        .style.display = "none" )
            } ), document.getElementById( "instructionsButton" )
            .addEventListener( "click", () => {
                toggleHTML( instructionsJSON ), toggleDivs( "instructions" )
            } ), document.getElementById( "compareThreeDeeButton" )
            .addEventListener( "click", () => {
                console.log( "Nothing for this button yet!" )
            } ), document.getElementById( "diagnosisButton" )
            .addEventListener( "click", () => {
                toggleHTML( diagHTML ), toggleDivs( "diagnosis" )
            } ), document.getElementById( "twoDeeDrawingButton" )
            .addEventListener( "click", () => {
                document.getElementById( "imageDisplayID" )
                    .src = "../database/IPCCCID/2Dimages/" + dataObj.IPCCCID.ID + ".png", toggleDivs( "twoDeeDrawing" )
            } ), hoverTransition( "instructionsButton", "deepskyblue" ), hoverTransition( "compareThreeDeeButton", "deepskyblue" ), hoverTransition( "diagnosisButton", "deepskyblue" ), hoverTransition( "twoDeeDrawingButton", "deepskyblue" ), hoverTransition( "showToggleWrapperButton", "deepskyblue" )
    },
    readXml = () => {
        oReq.open( "GET", xmlFile ), oReq.send();
        let b = d => {
                let e = createParseArray( "sDEF", d );
                dataObj.toggleBar.text = e.map( f => {
                    return f
                } ), dataObj.toggleBar.ID = e.map( f => {
                    return f
                } );
                for ( let f = 0; f < dataObj.toggleBar.ID.length; f++ ) dataObj.toggleBar.ID[ f ] = dataObj.toggleBar.ID[ f ].replace( " ", "_" );
                dataObj.anatomicalModel.ID = e.map( f => {
                    return f
                } );
                for ( let f = 0; f < dataObj.anatomicalModel.ID.length; f++ ) dataObj.anatomicalModel.ID[ f ] = "anatomicalModel__" + dataObj.anatomicalModel.ID[ f ];
                e = createParseArray( "diffuseColorHex", d ), dataObj.toggleBar.color = e.map( f => {
                    return f
                } ), dataObj.IPCCCID.ID = createParse( "EACTSID", d )
            },
            c = () => {
                appendToggleButtons(), colorToggleButtons(), appendInfoButtons(), document.getElementById( "x3dwrapper" )
                    .style.display = "flex", document.getElementById( "twoDeeDrawing" )
                    .style.display = "none", document.getElementById( "HTMLdiv" )
                    .style.display = "none"
            };
        oReq.addEventListener( "load", function () {
            b( this.responseText ), c()
        } )
    };
readXml();
