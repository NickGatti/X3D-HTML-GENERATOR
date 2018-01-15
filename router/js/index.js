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

//START GLOBAL DECLARATIONS
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
//GLOBAL DECLARATIONS
let GLOBALCOMPARE3DTOGGLE = {
    state: 'indicator',
    size: 100,
    visibility: 'visible'
}
//GLOBAL DECLARATIONS
let GLOBALDATAOBJECT = {
    navBarData: {},
    x3DomObject: {},
    metaDataInfo: {}
};
//GLOBAL DECLARATIONS
let GLOBALLOADSEQUENCE = {
    state: 'Downloading files...',
    visibility: 'visible',
    modalState: false
}
//GLOBAL DECLARATIONS
let GLOBALMODAL = {
    width: 90,
    height: 20
}
//GLOBAL DECLARATIONS
let GLOBALOREQ = new XMLHttpRequest();
//END GLOBAL DECLARATIONS

//START PARSE XML FUNCTION
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
//END PARSE XML FUNCTION

//START APPEND X3D ELEMENT RENDER ON/OFF BUTTONS TO (RIGHT BUTTON DIV)
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
//END APPEND X3D ELEMENT RENDER ON/OFF BUTTONS TO (RIGHT BUTTON DIV)

//START COLOR X3D ELEMENT RENDER ON/OFF BUTTONS TO (RIGHT BUTTON DIV)
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
//END COLOR X3D ELEMENT RENDER ON/OFF BUTTONS TO (RIGHT BUTTON DIV)

//START FUNCTIONS FOR BUTTON TOGGLE SWITCHES
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

//TOGGLE FUNCTIONS
let switchDefaultButton = () => {
    if ( GLOBALBUTTONOBJECT.x3dwrapperToggle.state ) {
        GLOBALBUTTONOBJECT.x3dwrapperToggle.state = false;
    } else {
        GLOBALBUTTONOBJECT.x3dwrapperToggle.state = true;
    }
};

//TOGGLE FUNCTIONS
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

//TOGGLE FUNCTIONS
let toggleDivs = ( show ) => {
    switchDefaultButton();
    switchSelectedButton( show );
    usebuttonObject( show );
};

//TOGGLE FUNCTIONS
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
//END FUNCTIONS FOR BUTTON TOGGLE SWITCHES

//START COMPARE 3D (REFERENCE / AXIS INDICATOR) DIV RESIZER
//REFRENCE IS OTHER X3D FILE
let referenceResizer = () => {
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
//INDICATOR IS THE DUDE
let indicatorResizer = () => {
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
//END COMPARE 3D (REFERENCE / AXIS INDICATOR) DIV RESIZER

//START MAKE SURE THE PIP WINDOW IS IN THE RIGHT SPOT
let pipPlacer = () => {
    if ( GLOBALCOMPARE3DTOGGLE.state === 'reference' ) referenceResizer()
    if ( GLOBALCOMPARE3DTOGGLE.state === 'indicator' ) indicatorResizer()
    let pip = document.querySelector( '#x3d_generator_x3d_wrapper_reference' )
    pip.style.visibility = 'visible'
    pip.style.left = window.innerWidth - GLOBALCOMPARE3DTOGGLE.size - 14
    pip.style.top = window.innerHeight - GLOBALCOMPARE3DTOGGLE.size - 14
}
//END MAKE SURE THE PIP WINDOW IS IN THE RIGHT SPOT

//START SPECIAL TOGGLE FOR THE PIP WINDOW
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
//END SPECIAL TOGGLE FOR THE PIP WINDOW

//START GENERAL CREATE BUTTON FUNCTION TAKES TONS OF PARAMS
let createButton = ( node, color, text, id, form, button ) => {
    node.className = 'selectTab';
    if ( id ) node.id = id;
    node.innerHTML = text;
    node.style.background = 'deepskyblue';
    if ( button === true ) node.style.boxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 0.70)";
    form.appendChild( node );
};
//END GENERAL CREATE BUTTON FUNCTION TAKES TONS OF PARAMS

//START MORE PIP WINDOW VISBILITY TOGGLE FUNCTIONS
let compare3dVisiblityToggle = ( shouldBe ) => {
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
//END MORE PIP WINDOW VISBILITY TOGGLE FUNCTIONS

//START CREATE OUR CLICK EVENTS AND INIT ANY ATTRIBUES WE NEED TO SET FOR BUTTONS TO RUN
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
//END CREATE OUR CLICK EVENTS AND INIT ANY ATTRIBUES WE NEED TO SET FOR BUTTONS TO RUN

//START CREATE OUR INTERACTIVE EVENTS FOR OUR BUTTONS
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
//END CREATE OUR INTERACTIVE EVENTS FOR OUR BUTTONS

//START DADDY FUNCTION FOR BUTTONS
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
//END DADDY FUNCTION FOR BUTTONS

//START LOAD STATE DETECTION FOR SMOOTH LOADING AND USER NOTIFICATIONS
let applyX3Dsettings = () => {
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
            modalPopupTextSizer()
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
//LOAD STATE DETECTIONS

let detectState = () => {
    if ( document.readyState === "interactive" ||
        document.readyState === "loaded" ||
        document.readyState === "complete" ) {
        return true
    } else {
        return false
    }
}
//END LOAD STATE DETECTION FOR SMOOTH LOADING AND USER NOTIFICATIONS

//START HTTP REQUEST TO GET, PARSE AND START TO USE DATA FROM THE XML FILE FOR BUTTONS
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

    let reqListener = function () {
        popdataObjectect( this.responseText );
        run()
    }
    GLOBALOREQ.addEventListener( 'load', reqListener );
};
//END HTTP REQUEST TO GET, PARSE AND START TO USE DATA FROM THE XML FILE FOR BUTTONS

//START MODAL WINDOW TEXT RESIZING
let modalPopupTextSizer = () => {
    let modalPopup = document.querySelector( '#modalPopup' )
    let modalMoreButton = document.getElementById( 'modalMoreButton' )
    let modalCloseButton = document.getElementById( 'modalCloseButton' )
    let modalTextSize = Math.round( ( window.innerWidth ) / ( 45 + window.innerWidth / 400 ) )

    if ( modalTextSize <= 26 && modalTextSize > 11 ) {
        modalPopupText.style.fontSize = `${(window.innerWidth) / (45 + window.innerWidth / 400)}px`
    } else if ( modalTextSize < 11 ) {
        modalPopupText.style.fontSize = '12px'
    } else {
        modalPopupText.style.fontSize = '26px'
    }

    if ( modalTextSize <= 13 && modalTextSize > 9 ) {
        modalMoreButton.style.fontSize = `${(window.innerWidth) / (45 + window.innerWidth / 400)}px`
        modalCloseButton.style.fontSize = `${(window.innerWidth) / (45 + window.innerWidth / 400)}px`
    } else if ( modalTextSize < 9 ) {
        modalMoreButton.style.fontSize = '10px'
        modalCloseButton.style.fontSize = '10px'
    } else {
        modalMoreButton.style.fontSize = '14px'
        modalCloseButton.style.fontSize = '14px'
    }
}
//END MODAL WINDOW TEXT RESIZING

//START WHOLE WINDOW RESIZE EVENT DETECTIONS
let startWindowResizeEvent = () => {
    window.onresize = () => {
        modalPopupTextSizer()
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
//END WHOLE WINDOW RESIZE EVENT DETECTIONS

//START JAVASCRIPT OUR MODAL WINDOW ENTIRELY
let createLoadSequenceModal = () => {
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
    modalPopup.style.padding = '0 6px 6px 6px'
    modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility
    modalPopup.style.overflow = 'hidden'
    modalPopup.style.zIndex = 600

    let modalPopupText = document.createElement( 'div' )
    modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
    modalPopupText.id = 'modalPopupText'
    modalPopupText.style.height = 'auto'
    modalPopupText.style.overflow = 'hidden'
    modalPopupText.style.padding = '4px'
    modalPopupText.style.margin = '4px 0 4px 0'

    let modalButtonWrapper = document.createElement( 'div' )
    modalButtonWrapper.style.display = 'flex'
    modalButtonWrapper.style.flexFlow = 'row'
    modalButtonWrapper.style.justifyContent = 'center'
    modalButtonWrapper.style.alignItems = 'center'
    modalButtonWrapper.id = 'modalButtonWrapper'
    modalButtonWrapper.style.visibility = 'hidden'
    modalButtonWrapper.style.overflow = 'hidden'
    modalButtonWrapper.style.maxHeight = '20%'
    modalButtonWrapper.style.minHeight = '28px'

    let modalCloseButton = document.createElement( 'div' )
    modalCloseButton.innerText = 'Close'
    modalCloseButton.id = 'modalCloseButton'
    modalCloseButton.style.border = '1px solid black'
    modalCloseButton.style.padding = '3px 5px 3px 3px'
    modalCloseButton.style.borderRadius = '10%'
    modalCloseButton.style.boxShadow = '1px 1px 2px 0px rgba(0, 0, 0, 0.65)'
    modalCloseButton.style.pointer = 'pointer'
    modalCloseButton.style.userSelect = 'none'
    modalCloseButton.style.margin = '0 1rem 1px 1rem'
    modalCloseButton.style.overflow = 'hidden'
    modalCloseButton.style.objectFit = 'fill'

    let modalMoreButton = document.createElement( 'div' )
    modalMoreButton.innerText = 'More'
    modalMoreButton.id = 'modalMoreButton'
    modalMoreButton.style.border = '1px solid black'
    modalMoreButton.style.padding = '3px 5px 3px 3px'
    modalMoreButton.style.borderRadius = '10%'
    modalMoreButton.style.boxShadow = '1px 1px 2px 0px rgba(0, 0, 0, 0.65)'
    modalMoreButton.style.pointer = 'pointer'
    modalMoreButton.style.userSelect = 'none'
    modalMoreButton.style.margin = '0 1rem 1px 1rem'
    modalMoreButton.style.overflow = 'hidden'
    modalCloseButton.style.objectFit = 'fill'

    document.querySelector( 'body' ).appendChild( modalPopup )
    document.querySelector( '#modalPopup' ).appendChild( modalPopupText )
    document.querySelector( '#modalPopup' ).appendChild( modalButtonWrapper )
    document.querySelector( '#modalButtonWrapper' ).appendChild( modalCloseButton )
    document.querySelector( '#modalButtonWrapper' ).appendChild( modalMoreButton )
    modalPopupTextSizer()
}
//END JAVASCRIPT OUR MODAL WINDOW ENTIRELY

//START APPLY INTERACTIVE EVENTS TO OUR MODAL WINDOW
let X3DmodalInfoClickAppender = () => {
    let shapes = document.querySelectorAll( 'shape' )
    let modalPopupText = document.getElementById( 'modalPopupText' )
    let modalPopup = document.getElementById( 'modalPopup' )
    let modalPopupWrapper = document.getElementById( 'modalPopupWrapper' )
    modalButtonWrapper.style.visibility = 'inherit'
    for ( let shape in shapes ) {
        if ( shapes[ shape ].id ) {
            if ( shapes[ shape ].id.match( 'x3dModelFile__' ) ) {

                let infoWindowEducationPopupOn = function () {
                    if ( this === shapes[ shape ] ) {
                        modalPopupTextSizer()
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

    let modalMoreButton = document.getElementById( 'modalMoreButton' )
    let modalCloseButton = document.getElementById( 'modalCloseButton' )

    let removeHoverColorForEducationButton = function () {
        this.style.backgroundColor = 'inherit'
        this.style.transition = 'background-color 450ms linear'
    }

    let applyHoverColorForEducationButton = function () {
        this.style.backgroundColor = 'lime'
        this.style.transition = 'background-color 450ms linear'
    }

    let removeEducationModalWindow = () => {
        GLOBALLOADSEQUENCE.state = ''
        modalPopupText.innerHTML = GLOBALLOADSEQUENCE.state
        GLOBALLOADSEQUENCE.visibility = 'hidden'
        modalPopup.style.visibility = GLOBALLOADSEQUENCE.visibility
    }

    let modalMoreButtonMinimize = () => {
        modalPopupTextSizer()
        modalPopup.style.height = `${GLOBALMODAL.height}%`
        modalPopupText.style.overflow = 'hidden'
        modalMoreButton.innerText = 'More'
        modalMoreButton.removeEventListener( 'click', modalMoreButtonMinimize )
        modalMoreButton.addEventListener( 'click', modalMoreButtonExpand )
    }

    let modalMoreButtonExpand = () => {
        modalPopupTextSizer()
        modalPopup.style.height = '50%'
        modalPopupText.style.overflow = 'auto'
        modalPopupText.style.overflowX = 'hidden'
        modalMoreButton.innerText = 'Less'
        modalMoreButton.removeEventListener( 'click', modalMoreButtonExpand )
        modalMoreButton.addEventListener( 'click', modalMoreButtonMinimize )
    }

    modalCloseButton.addEventListener( 'click', removeEducationModalWindow )
    modalCloseButton.addEventListener( 'mouseenter', applyHoverColorForEducationButton )
    modalCloseButton.addEventListener( 'mouseleave', removeHoverColorForEducationButton )

    modalMoreButton.addEventListener( 'click', modalMoreButtonExpand )
    modalMoreButton.addEventListener( 'mouseenter', applyHoverColorForEducationButton )
    modalMoreButton.addEventListener( 'mouseleave', removeHoverColorForEducationButton )

    modalPopupTextSizer()
}
//END APPLY INTERACTIVE EVENTS TO OUR MODAL WINDOW

//START THIS IS SO WE CAN LOAD THE X3DOM SCRIPT WITHOUT USING HTML
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
//END THIS IS SO WE CAN LOAD THE X3DOM SCRIPT WITHOUT USING HTML

//START THIS IS SO WE DONT NEED THE INLINE HTML FOR THE SCENES
let appendInlineX3DHTML = () => {
    let inline = document.createElement( 'inline' );
    inline.id = 'x3d_inline_ID';
    document.getElementById( 'x3d_generator_x3d_scene' )
        .appendChild( inline );
    inline = document.createElement( 'inline' );
    inline.id = 'x3d_inline_ID_ref';
    document.getElementById( 'x3d_generator_x3d_scene_reference' )
        .appendChild( inline );
}
//END THIS IS SO WE DONT NEED THE INLINE HTML FOR THE SCENES

//START A LITTLE FUNCTION TO MICRO CONTROL OF A PRE-LOAD SEQUENCE
let startPreLoadSequence = () => {
    createLoadSequenceModal()
    appendInlineX3DHTML()
    startWindowResizeEvent()
}
//END A LITTLE FUNCTION TO MICRO CONTROL OF A PRE-LOAD SEQUENCE

//START HOW WE RUN THE PROGRAM IN THE FIRST PLACE THIS IS WHERE IT BEGINS - AT THE END
let initProgram = () => {
    startPreLoadSequence()

    loadScript( 'http://www.x3dom.org/download/x3dom.js', () => {
        return;
    } );
}

initProgram()
//END HOW WE RUN THE PROGRAM IN THE FIRST PLACE THIS IS WHERE IT BEGINS - AT THE END