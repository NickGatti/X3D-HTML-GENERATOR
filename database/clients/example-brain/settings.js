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

//Which X3D file to render
let SETTINGS_FILE_xmlFile = '../database/clients/example-brain/modelFile.x3d';
//Specify the X3D reference file for the PIP window
let SETTINGS_FILE_referenceFile = '../database/referenceModels/brain/referenceModel.x3d'

//The text for the 'metaDataButton'
let SETTINGS_FILE_metaDataInfoButtonText = 'MetaData Info';

//Image file extension
let SETTINGS_FILE_imageFileExtension = 'png';

//The XML element to find the metaDataInfoAttribute in
//We are looking for <MetadataInteger containerField='value' name='IPCCCID' value='aorta'>
let SETTINGS_FILE_metaDataInfoElement = 'MetadataInteger';

//The XML element for MetadataInteger must contain
//We are looking for name='IPCCCID'
let SETTINGS_FILE_mustContainElement = 'name';

//The XML value for mustContainElement to look for
//We are looking for name = 'IPCCCID'
let SETTINGS_FILE_mustContainValue = 'IPCCCID';

//Which XML attribute to look for to display on the metaDataButton
//Here value = "aorta"
let SETTINGS_FILE_metaDataInfoAttribute = 'value';

//The text for the 'htmlInfoButton'
let SETTINGS_FILE_htmlInfoButtonText = 'Diagnosis Info';

//What HTML to display when the 'displayHTMLinfo' button is clicked
let SETTINGS_FILE_htmlInfoButtonHTML = [ {
        "p": "Example p tag"
    },
    {
        "container": {
            "outerType": "ul",
            "innerType": "li",
            "contents": [
                "example list and list items",
                "example list and list items",
                "example list and list items",
                "example list and list items"
            ]
        }
    }
];
// What HTML to display when the instructions button is clicked
let SETTINGS_FILE_instructionsHTML = [ {
        "h2": "Instructions"
    },
    {
        "p": "Mouse Button"
    },
    {
        "p": "LMB (Left Mouse Button) - Rotate, hold and move"
    },
    {
        "p": "MMB (Middle Mouse Button or Wheel) -  Zoom, hold and move"
    },
    {
        "p": "RMB (Right Mouse Button) - Pan, hold and move"
    }
];

let SETTINGS_FILE_modalWindowInfo = {
    'Brain': 'Brain info...',
}