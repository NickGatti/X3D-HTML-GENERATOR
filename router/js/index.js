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

window.onresize = ( () => {
    if ( window.innerWidth > 601 ) {
        document.getElementById( 'toggleWrapper' )
            .style.display = 'flex';
    } else {
        document.getElementById( 'toggleWrapper' )
            .style.display = 'block';
    }
} );

let buttonToggle = {
    x3dwrapper: {
        id: 'x3dwrapper',
        toggle: true
    },
    instructions: {
        id: 'HTMLdiv',
        toggle: false
    },
    compareThreeDee: {
        id: 'HTMLdiv',
        toggle: false
    },
    diagnosis: {
        id: 'HTMLdiv',
        toggle: false
    },
    twoDeeDrawing: {
        id: 'twoDeeDrawing',
        toggle: false
    }
};

var oReq = new XMLHttpRequest();

let dataObj = {
    toggleBar: {},
    x3DomObject: {},
    metaDataInfo: {}
};

let quoteParse = ( ( startPos, aPos, bPos, res ) => {
    let output = null;
    for ( let i = aPos; !( res.slice( startPos, startPos + i )
            .endsWith( '"' ) ); i++ ) {
        output = res.slice( startPos + bPos, startPos + i );
    }
    return output;
} );

let createParseArray = ( ( input, text ) => {
    let startPos = text.indexOf( input ),
        stop = 0,
        XMLArray = [],
        output = [];
    for ( let i = startPos; stop <= 0; startPos + i++ ) {
        if ( startPos == -1 ) stop++;
        if ( startPos > 0 ) XMLArray.push( startPos );
        startPos = text.indexOf( input, i + startPos );
    }
    for ( let z = 0; z < XMLArray.length; z++ ) {
        output.push( quoteParse( XMLArray[ z ], input.length + 3, input.length + 2, text ) );
    }
    return output;
} );

let createParse = ( ( input, text ) => {
    return quoteParse( text.indexOf( input ), input.length + 3, input.length + 2, text );
} );

let appendToggleButtons = ( () => {
    let form = document.getElementById( 'toggleWrapper' ),
        div = document.createElement( 'div' );
    for ( let i = 0; i < dataObj.toggleBar.ID.length; i++ ) {
        div.className = 'selectTab';
        div.innerHTML = dataObj.toggleBar.text[ i ] + '<br> ON';
        div.id = dataObj.toggleBar.ID[ i ];
        form.appendChild( div );
        form = document.getElementById( 'toggleWrapper' );
        div = document.createElement( 'div' );
        document.getElementById( dataObj.toggleBar.ID[ i ] )
            .addEventListener( 'click', ( () => {
                let x3DomObject = document.getElementById( dataObj.x3DomObject.ID[ i ] );
                if ( x3DomObject ) {
                    if ( typeof x3DomObject.renderToggle === undefined ) {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                    } else if ( x3DomObject.renderToggle ) {
                        x3DomObject.setAttribute( 'render', true );
                        x3DomObject.renderToggle = false;
                        document.getElementById( dataObj.toggleBar.ID[ i ] )
                            .innerHTML = dataObj.toggleBar.text[ i ] + '<br> ON';
                    } else {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                        document.getElementById( dataObj.toggleBar.ID[ i ] )
                            .innerHTML = dataObj.toggleBar.text[ i ] + '<br> OFF';
                    }
                }
            } ) );
    }
} );

let hoverTransition = ( ( id, originalColor ) => {
    document.getElementById( id )
        .addEventListener( 'mouseover', ( () => {
            document.getElementById( id )
                .style.backgroundColor = 'lime';
        } ) );
    document.getElementById( id )
        .addEventListener( 'mouseout', ( () => {
            document.getElementById( id )
                .style.backgroundColor = originalColor;
        } ) );
    document.getElementById( id )
        .addEventListener( 'touchstart', ( () => {
            document.getElementById( id )
                .style.backgroundColor = 'lime';
        } ) );
    document.getElementById( id )
        .addEventListener( 'touchend', ( () => {
            document.getElementById( id )
                .style.backgroundColor = originalColor;
        } ) );
} );

let colorToggleButtons = ( () => {
    for ( let i = 0; i < dataObj.toggleBar.ID.length; i++ ) {
        document.getElementById( dataObj.toggleBar.ID[ i ] )
            .style.backgroundColor = dataObj.toggleBar.color[ i ];
        hoverTransition( dataObj.toggleBar.ID[ i ], dataObj.toggleBar.color[ i ] );
    }
} );

let useButtonToggleObj = ( () => {
    let output = '';
    for ( let key in buttonToggle ) {
        if ( buttonToggle[ key ].toggle ) {
            output = buttonToggle[ key ].id;
        } else {
            document.getElementById( buttonToggle[ key ].id )
                .style.display = 'none';
        }
    }
    document.getElementById( output )
        .style.display = 'flex';
} );

let switchDefaultButton = ( () => {
    if ( buttonToggle.x3dwrapper.toggle ) {
        buttonToggle.x3dwrapper.toggle = false;
    } else {
        buttonToggle.x3dwrapper.toggle = true;
    }
} );

let switchSelectedButton = ( ( show ) => {
    if ( buttonToggle[ show ].toggle ) {
        buttonToggle[ 'x3dwrapper' ].toggle = true;
        buttonToggle[ show ].toggle = false;
        return;
    }
    for ( let key in buttonToggle ) {
        buttonToggle[ key ].toggle = false;
    }
    buttonToggle[ show ].toggle = true;
} );

let toggleDivs = ( ( show ) => {
    switchDefaultButton();
    switchSelectedButton( show );
    useButtonToggleObj( show );
} );

let toggleHTML = ( ( which ) => {
    document.getElementById( 'displayHTML' )
        .innerHTML = '';
    let create = null;
    let container = null;
    let br = null;
    for ( let i = 0; i < which.length; i++ ) {
        let key = Object.keys( which[ i ] );
        if ( key == 'container' ) {
            container = document.createElement( which[ i ].container.outerType );
            for ( let z = 0; z < which[ i ].container.contents.length; z++ ) {
                create = document.createElement( which[ i ].container.innerType );
                create.innerHTML = which[ i ].container.contents[ z ];
                container.appendChild( create );
            }
            document.getElementById( 'displayHTML' )
                .appendChild( container );
        } else {
            create = document.createElement( key );
            create.innerHTML = which[ i ][ key ];
            document.getElementById( 'displayHTML' )
                .appendChild( create );
        }
        if ( i === which.length - 1 ) {
            for ( let x = 0; x < 6; x++ ) {
                br = document.createElement( 'br' );
                document.getElementById( 'displayHTML' )
                    .appendChild( br );
            }
        }
    }
} );

let appendInfoButtons = ( () => {
    let form = document.getElementById( 'infoWrapper' );

    let createButton = ( ( node, color, text, id ) => {
        node.className = 'selectTab';
        if ( id ) node.id = id;
        node.innerHTML = text;
        node.style.background = 'deepskyblue';
        form.appendChild( node );
    } );

    createButton( document.createElement( 'div' ), 'deepskyblue', 'Instructions', 'instructionsButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Hide/Show', 'showToggleWrapperButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Compare 3D', 'compareThreeDeeButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', displayHTMLinfoButtonText, 'displayHTMLinfoButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', '2D Drawing', 'twoDeeDrawingButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', metaDataInfoButtonText + ': ' + dataObj.metaDataInfo.ID );

    document.getElementById( 'showToggleWrapperButton' )
        .addEventListener( 'click', ( () => {
            if ( document.getElementById( 'toggleWrapper' )
                .style.visibility === 'hidden' ) {
                document.getElementById( 'toggleWrapper' )
                    .style.visibility = 'visible';
                if ( window.innerWidth > 600 ) {
                    document.getElementById( 'toggleWrapper' )
                        .style.display = 'flex';
                } else {
                    document.getElementById( 'toggleWrapper' )
                        .style.display = 'block';
                }
            } else {
                document.getElementById( 'toggleWrapper' )
                    .style.visibility = 'hidden';
                document.getElementById( 'toggleWrapper' )
                    .style.display = 'none';
            }
        } ) );
    document.getElementById( 'instructionsButton' )
        .addEventListener( 'click', ( () => {
            toggleHTML( instructionsJSON );
            toggleDivs( 'instructions' );
        } ) );
    document.getElementById( 'compareThreeDeeButton' )
        .addEventListener( 'click', ( () => {
            console.log( 'Nothing for this button yet!' );
        } ) );
    document.getElementById( 'displayHTMLinfoButton' )
        .addEventListener( 'click', ( () => {
            toggleHTML( displayHTMLinfoHTML );
            toggleDivs( 'diagnosis' );
        } ) );
    document.getElementById( 'twoDeeDrawingButton' )
        .addEventListener( 'click', ( () => {
            document.getElementById( 'imageDisplayID' )
                .src = '../database/metaDataInfo/2Dimages/' + dataObj.metaDataInfo.ID + '.png';
            toggleDivs( 'twoDeeDrawing' );
        } ) );

    hoverTransition( 'instructionsButton', 'deepskyblue' );
    hoverTransition( 'compareThreeDeeButton', 'deepskyblue' );
    hoverTransition( 'displayHTMLinfoButton', 'deepskyblue' );
    hoverTransition( 'twoDeeDrawingButton', 'deepskyblue' );
    hoverTransition( 'showToggleWrapperButton', 'deepskyblue' );
} );

let readXml = ( () => {
    oReq.open( 'GET', xmlFile );
    oReq.send();

    let popDataObject = ( ( text ) => {
        let value = createParseArray( 'sDEF', text );
        dataObj.toggleBar.text = value.map( ( data ) => {
            return data;
        } );
        dataObj.toggleBar.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < dataObj.toggleBar.ID.length; i++ ) {
            dataObj.toggleBar.ID[ i ] = dataObj.toggleBar.ID[ i ].replace( ' ', '_' );
        }
        dataObj.x3DomObject.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < dataObj.x3DomObject.ID.length; i++ ) {
            dataObj.x3DomObject.ID[ i ] = 'x3dModelFile__' + dataObj.x3DomObject.ID[ i ];
        }
        value = createParseArray( 'diffuseColorHex', text );
        dataObj.toggleBar.color = value.map( ( data ) => {
            return data;
        } );
        dataObj.metaDataInfo.ID = createParse( metaDataInfo, text );
    } );

    let run = ( () => {
        appendToggleButtons();
        colorToggleButtons();
        appendInfoButtons();
        document.getElementById( 'x3dwrapper' )
            .style.display = 'flex';
        document.getElementById( 'twoDeeDrawing' )
            .style.display = 'none';
        document.getElementById( 'HTMLdiv' )
            .style.display = 'none';
    } );

    function reqListener() {
        popDataObject( this.responseText );
        run();
    }
    oReq.addEventListener( 'load', reqListener );
} );
readXml();
