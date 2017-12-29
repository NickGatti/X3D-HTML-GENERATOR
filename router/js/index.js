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

let GLOBALBUTTONOBJECT = {
    x3dwrapperToggle: {
        id: 'x3d_generator_x3d_wrapper',
        state: true
    },
    instructionsToggle: {
        id: 'x3d_generator_html_outer_div',
        state: false
    },
    comparisonToggle: {
        id: 'x3d_generator_html_outer_div',
        state: false
    },
    htmlInfoToggle: {
        id: 'x3d_generator_html_outer_div',
        state: false
    },
    imageDisplayToggle: {
        id: 'x3d_generator_image_div',
        state: false
    }
};

let GLOBALCOMPARE3DTOGGLE = {
    state: 'indicator',
    size: 100,
    visibility: 'visible'
}

let GLOBALDATAOBJECT = {
    navBarData: {},
    x3DomObject: {},
    metaDataInfo: {}
};

let GLOBALLOADSEQUENCE = {
    state: 'Downloading files...',
    visibility: 'visible',
    modalState: false
}

let GLOBALMODAL = {
    width: 90,
    height: 20
}

startLoadSequence()

var GLOBALOREQ = new XMLHttpRequest();

let parseXML = ( fileText, element, attribute, mustContainElement, mustContainValue ) => {
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
};

let appendToggleButtons = () => {
    let form = document.getElementById( 'x3d_generator_shape_def_button_wrapper' ),
        div = document.createElement( 'div' );
    for ( let i = 0; i < GLOBALDATAOBJECT.navBarData.ID.length; i++ ) {
        div.className = 'selectTab';
        div.style.boxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 0.70)";
        div.innerHTML = GLOBALDATAOBJECT.navBarData.text[ i ] + '<br> ON';
        div.id = GLOBALDATAOBJECT.navBarData.ID[ i ];
        form.appendChild( div );
        form = document.getElementById( 'x3d_generator_shape_def_button_wrapper' );
        div = document.createElement( 'div' );
        document.getElementById( GLOBALDATAOBJECT.navBarData.ID[ i ] )
            .addEventListener( 'click', () => {
                let x3DomObject = document.getElementById( GLOBALDATAOBJECT.x3DomObject.ID[ i ] );
                if ( x3DomObject ) {
                    if ( typeof x3DomObject.renderToggle === undefined ) {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                    } else if ( x3DomObject.renderToggle ) {
                        x3DomObject.setAttribute( 'render', true );
                        x3DomObject.renderToggle = false;
                        document.getElementById( GLOBALDATAOBJECT.navBarData.ID[ i ] )
                            .innerHTML = GLOBALDATAOBJECT.navBarData.text[ i ] + '<br> ON';
                    } else {
                        x3DomObject.setAttribute( 'render', false );
                        x3DomObject.renderToggle = true;
                        document.getElementById( GLOBALDATAOBJECT.navBarData.ID[ i ] )
                            .innerHTML = GLOBALDATAOBJECT.navBarData.text[ i ] + '<br> OFF';
                    }
                }
            } );
    }
};

let colorToggleButtons = () => {
    for ( let i = 0; i < GLOBALDATAOBJECT.navBarData.ID.length; i++ ) {
        document.getElementById( GLOBALDATAOBJECT.navBarData.ID[ i ] )
            .style.backgroundColor = `rgb(
                      ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][0]) * 255 )} ,
                      ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][1]) * 255 )} ,
                      ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][2]) * 255 )}`;
        createHoverAndTouchButtonEvents( GLOBALDATAOBJECT.navBarData.ID[ i ], `rgb(
                  ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][0]) * 255 )} ,
                  ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][1]) * 255 )} ,
                  ${Math.round( ( GLOBALDATAOBJECT.navBarData.color[i][2]) * 255 )}` );
    }
};

let usebuttonObject = () => {
    let output = '';
    for ( let key in GLOBALBUTTONOBJECT ) {
        if ( GLOBALBUTTONOBJECT[ key ].state ) {
            output = GLOBALBUTTONOBJECT[ key ].id;
        } else {
            document.getElementById( GLOBALBUTTONOBJECT[ key ].id )
                .style.display = 'none';
        }
    }
    document.getElementById( output )
        .style.display = 'flex';
};

let switchDefaultButton = () => {
    if ( GLOBALBUTTONOBJECT.x3dwrapperToggle.state ) {
        GLOBALBUTTONOBJECT.x3dwrapperToggle.state = false;
    } else {
        GLOBALBUTTONOBJECT.x3dwrapperToggle.state = true;
    }
};

let switchSelectedButton = ( show ) => {
    if ( GLOBALBUTTONOBJECT[ show ].state ) {
        GLOBALBUTTONOBJECT[ 'x3dwrapperToggle' ].state = true;
        GLOBALBUTTONOBJECT[ show ].state = false;
        return;
    }
    for ( let key in GLOBALBUTTONOBJECT ) {
        GLOBALBUTTONOBJECT[ key ].state = false;
    }
    GLOBALBUTTONOBJECT[ show ].state = true;
};

let toggleDivs = ( show ) => {
    switchDefaultButton();
    switchSelectedButton( show );
    usebuttonObject( show );
};

let toggleHTML = ( which ) => {
    let innerDivHtml = document.getElementById( 'x3d_generator_html_inner_div' )
    innerDivHtml
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
            innerDivHtml
                .appendChild( container );
        } else {
            create = document.createElement( key );
            create.innerHTML = which[ i ][ key ];
            innerDivHtml
                .appendChild( create );
        }
        if ( i === which.length - 1 ) {
            for ( let x = 0; x < 6; x++ ) {
                br = document.createElement( 'br' );
                innerDivHtml
                    .appendChild( br );
            }
        }
    }
};

let toggleCompare3D = () => {
    let X3DreferenceInline = document.getElementById( 'x3d_inline_ID_ref' )
    let pip = document.querySelector( '#x3d_generator_x3d_wrapper_reference' )
    if ( GLOBALCOMPARE3DTOGGLE.state === 'indicator' ) {
        X3DreferenceInline
            .url = SETTINGS_FILE_referenceFile;
        GLOBALCOMPARE3DTOGGLE.state = 'reference'
        pipPlacer()
    } else {
        X3DreferenceInline
            .url = '../database/axisIndicator/axisIndicator.x3d';
        GLOBALCOMPARE3DTOGGLE.state = 'indicator'
        pip.style.width = '100px'
        pip.style.height = '100px'
        GLOBALCOMPARE3DTOGGLE.size = 100
        pipPlacer()
    }
}

let createButton = ( node, color, text, id, form, button ) => {
    node.className = 'selectTab';
    if ( id ) node.id = id;
    node.innerHTML = text;
    node.style.background = 'deepskyblue';
    if ( button === true ) node.style.boxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 0.70)";
    form.appendChild( node );
};

let createButtonClickEventsAndAttributes = () => {
    let shapeDefButtonWrapper = document.getElementById( 'x3d_generator_shape_def_button_wrapper' )
    document.getElementById( 'x3dShapeDefInfoButtonWrapperToggle' )
        .addEventListener( 'click', () => {
            if ( shapeDefButtonWrapper
                .style.visibility === 'hidden' ) {
                shapeDefButtonWrapper
                    .style.visibility = 'visible';
                if ( window.innerWidth > 600 ) {
                    shapeDefButtonWrapper
                        .style.display = 'flex';
                } else {
                    shapeDefButtonWrapper
                        .style.display = 'block';
                }
            } else {
                shapeDefButtonWrapper
                    .style.visibility = 'hidden';
                shapeDefButtonWrapper
                    .style.display = 'none';
            }
        } );
    document.getElementById( 'instructionsButton' )
        .addEventListener( 'click', () => {
            toggleHTML( SETTINGS_FILE_instructionsHTML );
            toggleDivs( 'instructionsToggle' );
            compare3dVisiblityToggle()
        } );
    document.getElementById( 'comparisonButton' )
        .addEventListener( 'click', () => {
            toggleCompare3D()
            compare3dVisiblityToggle()
        } );
    document.getElementById( 'htmlInfoButton' )
        .addEventListener( 'click', () => {
            toggleHTML( SETTINGS_FILE_htmlInfoButtonHTML );
            toggleDivs( 'htmlInfoToggle' );
            compare3dVisiblityToggle()
        } );
    document.getElementById( 'imageButton' )
        .addEventListener( 'click', () => {
            document.getElementById( 'x3d_generator_image_img_element' )
                .src = '../database/metaDataInfo/2Dimages/' + GLOBALDATAOBJECT.metaDataInfo.ID + '.' + SETTINGS_FILE_imageFileExtension;
            toggleDivs( 'imageDisplayToggle' );
            compare3dVisiblityToggle()
        } );
}

let createHoverAndTouchButtonEvents = ( id, originalColor ) => {
    let targetButton = document.getElementById( id )

    targetButton
        .addEventListener( 'mouseenter', () => {
            targetButton
                .style.backgroundColor = 'lime';
            targetButton
                .style.boxShadow = "5px 5px 5px 0px rgba(0, 0, 0, 0.70)";
            targetButton
                .style.transform = ( 'translateY(-0.50%) translateX(-0.875%)' )
        } );
    targetButton
        .addEventListener( 'mouseleave', () => {
            targetButton
                .style.backgroundColor = originalColor;
            targetButton
                .style.boxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 0.70)";
            targetButton
                .style.transform = ( 'translateY(0.50%) translateX(0.875%)' )
        } );
    targetButton.style.transition = 'box-shadow 250ms linear, transform 250ms linear, background-color 250ms linear'
};

let appendInfoButtons = () => {
    let form = document.getElementById( 'x3d_generator_info_button_wrapper' );

    createButton( document.createElement( 'div' ), 'deepskyblue', 'Instructions', 'instructionsButton', form, true );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Hide/Show', 'x3dShapeDefInfoButtonWrapperToggle', form, true );
    createButton( document.createElement( 'div' ), 'deepskyblue', 'Compare 3D', 'comparisonButton', form, true );
    createButton( document.createElement( 'div' ), 'deepskyblue', SETTINGS_FILE_htmlInfoButtonText, 'htmlInfoButton', form, true );
    createButton( document.createElement( 'div' ), 'deepskyblue', '2D Drawing', 'imageButton', form, true );
    createButton( document.createElement( 'div' ), 'deepskyblue', SETTINGS_FILE_metaDataInfoButtonText + ': ' + GLOBALDATAOBJECT.metaDataInfo.ID, false, form, false );

    createButtonClickEventsAndAttributes()

    createHoverAndTouchButtonEvents( 'instructionsButton', 'deepskyblue' );
    createHoverAndTouchButtonEvents( 'comparisonButton', 'deepskyblue' );
    createHoverAndTouchButtonEvents( 'htmlInfoButton', 'deepskyblue' );
    createHoverAndTouchButtonEvents( 'imageButton', 'deepskyblue' );
    createHoverAndTouchButtonEvents( 'x3dShapeDefInfoButtonWrapperToggle', 'deepskyblue' );
};

function compare3dVisiblityToggle( shouldBe ) {
    if ( document.querySelector( '#x3d_generator_x3d_wrapper' ).style.display === 'none' ) {
        document.querySelector( '#x3d_generator_x3d_wrapper_reference' ).style.visibility = 'hidden'
    } else if ( document.querySelector( '#x3d_generator_x3d_wrapper_reference' ).style.visibility === 'flex' ) {
        document.querySelector( '#x3d_generator_x3d_wrapper_reference' ).style.visibility = 'visible'
        syncViews()
    } else {
        document.querySelector( '#x3d_generator_x3d_wrapper_reference' ).style.visibility = 'visible'
        syncViews()
    }
}

let readXml = () => {
    GLOBALOREQ.open( 'GET', SETTINGS_FILE_xmlFile );
    GLOBALOREQ.send();

    let popdataObjectect = ( ( text ) => {
        let value = parseXML( text, 'Shape', 'DEF' );
        GLOBALDATAOBJECT.navBarData.text = value.map( ( data ) => {
            return data;
        } );
        GLOBALDATAOBJECT.navBarData.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < GLOBALDATAOBJECT.navBarData.ID.length; i++ ) {
            GLOBALDATAOBJECT.navBarData.ID[ i ] = GLOBALDATAOBJECT.navBarData.ID[ i ].replace( ' ', '_' );
        }
        GLOBALDATAOBJECT.x3DomObject.ID = value.map( ( data ) => {
            return data;
        } );
        for ( let i = 0; i < GLOBALDATAOBJECT.x3DomObject.ID.length; i++ ) {
            GLOBALDATAOBJECT.x3DomObject.ID[ i ] = 'x3dModelFile__' + GLOBALDATAOBJECT.x3DomObject.ID[ i ];
        }
        value = parseXML( text, 'Material', 'diffuseColor' );
        GLOBALDATAOBJECT.navBarData.color = value.map( ( data ) => {
            return data.split( ' ' );
        } );
        GLOBALDATAOBJECT.metaDataInfo.ID = parseXML( text, SETTINGS_FILE_metaDataInfoElement, SETTINGS_FILE_metaDataInfoAttribute, SETTINGS_FILE_mustContainElement, SETTINGS_FILE_mustContainValue );
    } );

    let run = () => {
        if ( detectState() === true ) {
            GLOBALLOADSEQUENCE.state = 'Generating HTML...'
            modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
            appendToggleButtons();
            colorToggleButtons();
            appendInfoButtons();
            document.getElementById( 'x3d_generator_x3d_wrapper' )
                .style.display = 'flex';
            document.getElementById( 'x3d_generator_image_div' )
                .style.display = 'none';
            document.getElementById( 'x3d_generator_html_outer_div' )
                .style.display = 'none';
            applyX3Dsettings()
        } else {
            setTimeout( run, 500 )
        }
    };

    function reqListener() {
        popdataObjectect( this.responseText );
        run()
    }
    GLOBALOREQ.addEventListener( 'load', reqListener );
};

function detectState() {
    if ( document.readyState === "interactive" ||
        document.readyState === "loaded" ||
        document.readyState === "complete" ) {
        return true
    } else {
        return false
    }
}

function createLoadSequenceModal() {
    let modalPopup = document.createElement( 'div' )
    modalPopup.id = 'modalPopup'
    modalPopup.style.backgroundColor = 'white'
    modalPopup.style.width = `${GLOBALMODAL.width}%`
    modalPopup.style.height = `${GLOBALMODAL.height}%`
    modalPopup.style.position = 'fixed'
    modalPopup.style.top = '0'
    modalPopup.style.left = `${(window.innerWidth / 2) - (( ( GLOBALMODAL.width / 100 ) / 2 ) * window.innerWidth)}px`
    modalPopup.style.border = '3px solid black'
    modalPopup.style.borderRadius = '0 0 15px 15px'
    modalPopup.style.boxShadow = '3px 2px 3px 0px rgba(0, 0, 0, 0.55)'
    modalPopup.style.display = 'flex'
    modalPopup.style.justifyContent = 'space-between'
    modalPopup.style.alignItems = 'center'
    modalPopup.style.flexFlow = 'column'
    modalPopup.style.zIndex = '500'
    modalPopup.style.padding = '0 6px 6px 6px'
    modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility

    let modalPopupText = document.createElement( 'div' )
    modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
    modalPopupText.id = 'modalPopupText'
    modalPopupText.style.height = '100px'
    modalPopupText.style.overflow = 'hidden'
    modalPopupText.style.zIndex = '501'

    let modalCloseButton = document.createElement( 'div' )
    modalCloseButton.innerHTML = 'Close'
    modalCloseButton.id = 'modalCloseButton'
    modalCloseButton.style.border = '1px solid black'
    modalCloseButton.style.padding = '3px'
    modalCloseButton.style.borderRadius = '10%'
    modalCloseButton.style.boxShadow = '1px 1px 2px 0px rgba(0, 0, 0, 0.65)'
    modalCloseButton.style.pointer = 'pointer'
    modalCloseButton.style.userSelect = 'none'
    modalCloseButton.width = '100px'
    modalCloseButton.height = '40px'

    document.querySelector( 'body' ).appendChild( modalPopup )
    document.querySelector( '#modalPopup' ).appendChild( modalPopupText )
    document.querySelector( '#modalPopup' ).appendChild( modalCloseButton )
    modalPopupTextSizer()
}

function startLoadSequence() {
    createLoadSequenceModal()
    appendInlineX3DHTML()
    startWindowResizeEvent()
}

function appendInlineX3DHTML() {
    let inline = document.createElement( 'inline' );
    inline.id = 'x3d_inline_ID';
    document.getElementById( 'x3d_generator_x3d_scene' )
        .appendChild( inline );
    inline = document.createElement( 'inline' );
    inline.id = 'x3d_inline_ID_ref';
    document.getElementById( 'x3d_generator_x3d_scene_reference' )
        .appendChild( inline );
}

function applyX3Dsettings() {
    GLOBALLOADSEQUENCE.state = 'Loading X3D Scenes, may take a couple minutes. Indicator may stop spinning, please be patient...'
    modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state

    let mainX3Dinline = document.getElementById( 'x3d_inline_ID' )
    let X3DreferenceInline = document.getElementById( 'x3d_inline_ID_ref' )

    let completeLoading = 0

    let completeFullLoadDetect = setInterval( () => {
        if ( completeLoading === 3 ) {
            pipPlacer()
            syncViews()
            X3DmodalInfoClickAppender()
            GLOBALLOADSEQUENCE.visibility = 'hidden'
            modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility
            clearInterval( completeFullLoadDetect )
        }
    }, 100 )

    let completeHalfLoadDetect = setInterval( () => {
        if ( completeLoading === 2 ) {
            pipPlacer()
            syncViews()
            clearInterval( completeHalfLoadDetect )
            completeLoading++
        }
    }, 100 )

    let loadMainScene = setInterval( () => {
        if ( document.getElementById( 'x3d_inline_ID' )
            .load ) {
            clearInterval( loadMainScene );
            completeLoading++
        }
        document.getElementById( 'x3d_inline_ID' )
            .url = SETTINGS_FILE_xmlFile;
        document.getElementById( 'x3d_inline_ID' )
            .namespacename = 'x3dModelFile';
        document.getElementById( 'x3d_inline_ID' )
            .mapdeftoid = true;
    }, 100 );

    let loadAxisIndicatorScene = setInterval( () => {
        if ( document.getElementById( 'x3d_inline_ID_ref' )
            .load ) {
            clearInterval( loadAxisIndicatorScene );
            completeLoading++
        }
        document.getElementById( 'x3d_inline_ID_ref' )
            .url = '../database/axisIndicator/axisIndicator.x3d';
        document.getElementById( 'x3d_inline_ID_ref' )
            .namespacename = 'referenceModel';
        document.getElementById( 'x3d_inline_ID_ref' )
            .mapdeftoid = true;
    }, 100 );
}

function pipPlacer() {
    if ( GLOBALCOMPARE3DTOGGLE.state === 'reference' ) referenceResizer()
    if ( GLOBALCOMPARE3DTOGGLE.state === 'indicator' ) indicatorResizer()
    let pip = document.querySelector( '#x3d_generator_x3d_wrapper_reference' )
    pip.style.visibility = 'visible'
    pip.style.left = window.innerWidth - GLOBALCOMPARE3DTOGGLE.size - 14
    pip.style.top = window.innerHeight - GLOBALCOMPARE3DTOGGLE.size - 14
}

function indicatorResizer() {
    let pip = document.querySelector( '#x3d_generator_x3d_wrapper_reference' )
    if ( window.innerWidth > 1101 ) {
        pip.style.width = '150px'
        pip.style.height = '150px'
        GLOBALCOMPARE3DTOGGLE.size = 150
    } else if ( window.innerWidth > 601 ) {
        pip.style.width = '100px'
        pip.style.height = '100px'
        GLOBALCOMPARE3DTOGGLE.size = 100
    } else {
        pip.style.width = '75px'
        pip.style.height = '75px'
        GLOBALCOMPARE3DTOGGLE.size = 75
    }
}

function referenceResizer() {
    let pip = document.querySelector( '#x3d_generator_x3d_wrapper_reference' )
    if ( window.innerWidth > 1601 ) {
        pip.style.width = '370px'
        pip.style.height = '370px'
        GLOBALCOMPARE3DTOGGLE.size = 370
    } else if ( window.innerWidth > 1101 ) {
        pip.style.width = '275px'
        pip.style.height = '275px'
        GLOBALCOMPARE3DTOGGLE.size = 275
    } else if ( window.innerWidth > 601 ) {
        pip.style.width = '150px'
        pip.style.height = '150px'
        GLOBALCOMPARE3DTOGGLE.size = 150
    } else {
        pip.style.width = '100px'
        pip.style.height = '100px'
        GLOBALCOMPARE3DTOGGLE.size = 100
    }
}

function startWindowResizeEvent() {
    window.onresize = () => {
        pipPlacer()
        let shapeDefButtonWrapper = document.getElementById( 'x3d_generator_shape_def_button_wrapper' )
        if ( window.innerWidth > 1101 ) {
            shapeDefButtonWrapper
                .style.display = 'flex';
        } else {
            shapeDefButtonWrapper
                .style.display = 'block';
        }
        let modalPopup = document.querySelector( '#modalPopup' )
        modalPopup.style.left = `${(window.innerWidth / 2) - (( ( GLOBALMODAL.width / 100 ) / 2) * window.innerWidth)}px`
        modalPopup.style.width = `${GLOBALMODAL.width}%`
        modalPopupTextSizer()
    };
}

function modalPopupTextSizer() {
    let modalPopup = document.querySelector( '#modalPopup' )
    let modalTextSize = Math.round( ( window.innerWidth ) / ( 45 + window.innerWidth / 400 ) )
    if ( modalTextSize <= 26 && modalTextSize > 11 ) {
        modalPopupText.style.fontSize = `${(window.innerWidth) / (45 + window.innerWidth / 400)}px`
    } else if ( modalTextSize <= 11 ) {
        modalPopupText.style.fontSize = '12px'
    } else {
        modalPopupText.style.fontSize = '26px'
    }
}

function X3DmodalInfoClickAppender() {
    let shapes = document.querySelectorAll( 'shape' )
    for ( let shape in shapes ) {
        if ( shapes[ shape ].id ) {
            if ( shapes[ shape ].id.match( 'x3dModelFile__' ) ) {

                function infoWindowEducationPopupOn() {

                    if ( this === shapes[ shape ] ) {
                        GLOBALLOADSEQUENCE.state = shapes[ shape ]._x3domNode._DEF + ': ' + SETTINGS_FILE_modalWindowInfo[ shapes[ shape ]._x3domNode._DEF ]
                        modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
                        GLOBALLOADSEQUENCE.visibility = 'visible'
                        modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility
                    }

                }

                shapes[ shape ].addEventListener( 'click', infoWindowEducationPopupOn )
            }
        }
    }
    document.getElementById( 'modalCloseButton' ).addEventListener( 'click', removeEducationModalWindow )

    function removeEducationModalWindow() {
        GLOBALLOADSEQUENCE.state = ''
        modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
        GLOBALLOADSEQUENCE.visibility = 'hidden'
        modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility
    }
}

let loadScript = ( url, callback ) => {

    let script = document.createElement( 'script' );
    script.type = 'text/javascript';

    if ( script.readyState ) { //IE
        script.onreadystatechange = () => {
            if ( script.readyState === 'loaded' ||
                script.readyState === 'complete' ) {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = () => {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName( 'body' )[ 0 ].appendChild( script );
    readXml();
};

loadScript( 'http://www.x3dom.org/download/x3dom.js', () => {
    return;
} );