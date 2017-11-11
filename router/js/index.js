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

let buttonObject = {
    x3dwrapperToggle: {
        id: 'x3d_gen_x3d_wrapper',
        state: true
    },
    instructionsToggle: {
        id: 'html_outer_div_ID',
        state: false
    },
    comparisonToggle: {
        id: 'html_outer_div_ID',
        state: false
    },
    htmlInfoToggle: {
        id: 'html_outer_div_ID',
        state: false
    },
    imageDisplayToggle: {
        id: 'image_div_ID',
        state: false
    }
};

var oReq = new XMLHttpRequest();

let dataObject = {
    navBarData: {},
    x3DomObject: {},
    metaDataInfo: {}
};

let parseXML = ( ( fileText, element, attribute, mustContainElement, mustContainValue ) => {
    if ( window.DOMParser ) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString( fileText, "text/xml" );
    } else // Internet Explorer
    {
        xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" );
        xmlDoc.async = false;
        xmlDoc.loadXML( fileText );
    }

    let elementAttribute = xmlDoc.getElementsByTagName( element );

    let output = [];

    for ( let i = 0; i < elementAttribute.length; i++ ) {
        if ( mustContainElement && mustContainValue ) {
            if ( elementAttribute[ i ].getAttribute( mustContainElement ) == mustContainValue ) {
                if ( elementAttribute[ i ].getAttribute( attribute ) ) output.push( elementAttribute[ i ].getAttribute( attribute ) );
            }
        } else {
            if ( elementAttribute[ i ].getAttribute( attribute ) ) output.push( elementAttribute[ i ].getAttribute( attribute ) );
        }

    }

    return output;
} );


let appendToggleButtons = ( () => {
    let form = document.getElementById( 'x3d_gen_shape_def_button_wrapper' ),
        div = document.createElement( 'div' );
    for ( let i = 0; i < dataObject.navBarData.ID.length; i++ ) {
        div.className = 'selectTab';
        div.innerHTML = dataObject.navBarData.text[ i ] + '<br> ON';
        div.id = dataObject.navBarData.ID[ i ];
        form.appendChild( div );
        form = document.getElementById( 'x3d_gen_shape_def_button_wrapper' );
        div = document.createElement( 'div' );
        document.getElementById( dataObject.navBarData.ID[ i ] )
            .addEventListener( 'click', ( () => {
                let x3DomObject = document.getElementById( dataObject.x3DomObject.ID[ i ] );
                if ( x3DomObject ) {
                    if ( typeof x3DomObject.renderToggle === undefined ) {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                    } else if ( x3DomObject.renderToggle ) {
                        x3DomObject.setAttribute( 'render', true );
                        x3DomObject.renderToggle = false;
                        document.getElementById( dataObject.navBarData.ID[ i ] )
                            .innerHTML = dataObject.navBarData.text[ i ] + '<br> ON';
                    } else {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                        document.getElementById( dataObject.navBarData.ID[ i ] )
                            .innerHTML = dataObject.navBarData.text[ i ] + '<br> OFF';
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
    for ( let i = 0; i < dataObject.navBarData.ID.length; i++ ) {
        document.getElementById( dataObject.navBarData.ID[ i ] )
            .style.backgroundColor = `rgb(
                      ${Math.round( ( dataObject.navBarData.color[i][0]) * 255 )} ,
                      ${Math.round( ( dataObject.navBarData.color[i][1]) * 255 )} ,
                      ${Math.round( ( dataObject.navBarData.color[i][2]) * 255 )}`;
        hoverTransition( dataObject.navBarData.ID[ i ], `rgb(
                  ${Math.round( ( dataObject.navBarData.color[i][0]) * 255 )} ,
                  ${Math.round( ( dataObject.navBarData.color[i][1]) * 255 )} ,
                  ${Math.round( ( dataObject.navBarData.color[i][2]) * 255 )}` );
    }
} );

let usebuttonObject = ( () => {
    let output = '';
    for ( let key in buttonObject ) {
        if ( buttonObject[ key ].state ) {
            output = buttonObject[ key ].id;
        } else {
            document.getElementById( buttonObject[ key ].id )
                .style.display = 'none';
        }
    }
    document.getElementById( output )
        .style.display = 'flex';
} );

let switchDefaultButton = ( () => {
    if ( buttonObject.x3dwrapperToggle.state ) {
        buttonObject.x3dwrapperToggle.state = false;
    } else {
        buttonObject.x3dwrapperToggle.state = true;
    }
} );

let switchSelectedButton = ( ( show ) => {
    if ( buttonObject[ show ].state ) {
        buttonObject[ 'x3dwrapperToggle' ].state = true;
        buttonObject[ show ].state = false;
        return;
    }
    for ( let key in buttonObject ) {
        buttonObject[ key ].state = false;
    }
    buttonObject[ show ].state = true;
} );

let toggleDivs = ( ( show ) => {
    switchDefaultButton();
    switchSelectedButton( show );
    usebuttonObject( show );
} );

let toggleHTML = ( ( which ) => {
    document.getElementById( 'html_inner_div_ID' )
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
            document.getElementById( 'html_inner_div_ID' )
                .appendChild( container );
        } else {
            create = document.createElement( key );
            create.innerHTML = which[ i ][ key ];
            document.getElementById( 'html_inner_div_ID' )
                .appendChild( create );
        }
        if ( i === which.length - 1 ) {
            for ( let x = 0; x < 6; x++ ) {
                br = document.createElement( 'br' );
                document.getElementById( 'html_inner_div_ID' )
                    .appendChild( br );
            }
        }
    }
} );

let appendInfoButtons = ( () => {
    let form = document.getElementById( 'x3d_gen_info_button_wrapper' );

    let createButton = ( ( node, color, text, id ) => {
        node.className = 'selectTab';
        if ( id ) node.id = id;
        node.innerHTML = text;
        node.style.background = 'deepskyblue';
        form.appendChild( node );
    } );

    createButton( document.createElement( 'div' ), 'deepskyblue', 'Instructions', 'instructionsButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Hide/Show', 'x3dShapeDefInfoButtonWrapperToggle' );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Compare 3D', 'comparisonButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', htmlInfoButtonText, 'htmlInfoButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', '2D Drawing', 'imageButton' );
    createButton( document.createElement( 'div' ), 'deepskyblue', metaDataInfoButtonText + ': ' + dataObject.metaDataInfo.ID );

    document.getElementById( 'x3dShapeDefInfoButtonWrapperToggle' )
        .addEventListener( 'click', ( () => {
            if ( document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                .style.visibility === 'hidden' ) {
                document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                    .style.visibility = 'visible';
                if ( window.innerWidth > 600 ) {
                    document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                        .style.display = 'flex';
                } else {
                    document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                        .style.display = 'block';
                }
            } else {
                document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                    .style.visibility = 'hidden';
                document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
                    .style.display = 'none';
            }
        } ) );
    document.getElementById( 'instructionsButton' )
        .addEventListener( 'click', ( () => {
            toggleHTML( instructionsHTML );
            toggleDivs( 'instructionsToggle' );
        } ) );
    document.getElementById( 'comparisonButton' )
        .addEventListener( 'click', ( () => {
            console.log( 'Nothing for this button yet!' );
        } ) );
    document.getElementById( 'htmlInfoButton' )
        .addEventListener( 'click', ( () => {
            toggleHTML( htmlInfoButtonHTML );
            toggleDivs( 'htmlInfoToggle' );
        } ) );
    document.getElementById( 'imageButton' )
        .addEventListener( 'click', ( () => {
            document.getElementById( 'image_img_ID' )
                .src = '../database/metaDataInfo/2Dimages/' + dataObject.metaDataInfo.ID + '.png';
            toggleDivs( 'imageDisplayToggle' );
        } ) );

    hoverTransition( 'instructionsButton', 'deepskyblue' );
    hoverTransition( 'comparisonButton', 'deepskyblue' );
    hoverTransition( 'htmlInfoButton', 'deepskyblue' );
    hoverTransition( 'imageButton', 'deepskyblue' );
    hoverTransition( 'x3dShapeDefInfoButtonWrapperToggle', 'deepskyblue' );
} );

let readXml = ( () => {
    oReq.open( 'GET', xmlFile );
    oReq.send();

    let popdataObjectect = ( ( text ) => {
        let value = parseXML( text, 'Shape', 'DEF' );
        dataObject.navBarData.text = value.map( ( data ) => {
            return data;
        } );
        dataObject.navBarData.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < dataObject.navBarData.ID.length; i++ ) {
            dataObject.navBarData.ID[ i ] = dataObject.navBarData.ID[ i ].replace( ' ', '_' );
        }
        dataObject.x3DomObject.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < dataObject.x3DomObject.ID.length; i++ ) {
            dataObject.x3DomObject.ID[ i ] = 'x3dModelFile__' + dataObject.x3DomObject.ID[ i ];
        }
        value = parseXML( text, 'Material', 'diffuseColor' );
        dataObject.navBarData.color = value.map( ( data ) => {
            return data.split( ' ' );
        } );
        dataObject.metaDataInfo.ID = parseXML( text, metaDataInfoElement, metaDataInfoAttribute, mustContainElement, mustContainValue );
    } );

    let run = ( () => {
        appendToggleButtons();
        colorToggleButtons();
        appendInfoButtons();
        document.getElementById( 'x3d_gen_x3d_wrapper' )
            .style.display = 'flex';
        document.getElementById( 'image_div_ID' )
            .style.display = 'none';
        document.getElementById( 'html_outer_div_ID' )
            .style.display = 'none';
    } );

    function reqListener() {
        popdataObjectect( this.responseText );
        run();
    }
    oReq.addEventListener( 'load', reqListener );
} );

let inline = document.createElement( 'inline' );
inline.id = 'x3d_inline_ID';
document.getElementById( 'x3d_scene_ID' )
    .appendChild( inline );

document.addEventListener( "load", ( () => {
    readXml();
    console.log( 'Loaded document...' );
    let loadScene = setInterval( () => {
        console.log( 'Attempting to load X3D Scene..' );
        if ( document.getElementById( 'x3d_inline_ID' )
            .load ) {
            console.log( 'Loaded X3D Scene' );
            clearInterval( loadScene );
        }
        document.getElementById( 'x3d_inline_ID' )
            .url = xmlFile;
        document.getElementById( 'x3d_inline_ID' )
            .namespacename = 'x3dModelFile';
        document.getElementById( 'x3d_inline_ID' )
            .mapdeftoid = true;
    }, 10 );
} ) );

window.onresize = ( () => {
    if ( window.innerWidth > 1101 ) {
        document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
            .style.display = 'flex';
    } else {
        document.getElementById( 'x3d_gen_shape_def_button_wrapper' )
            .style.display = 'block';
    }
} );
