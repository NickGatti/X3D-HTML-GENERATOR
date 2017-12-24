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
let xmlFile = '../database/clients/example-brain/modelFile.x3d';
let referenceFile = '../database/referenceModels/brain/referenceModel.x3d'

//The text for the 'metaDataButton'
let metaDataInfoButtonText = 'MetaData Info';

//Image file extension
let imageFileExtension = 'png';

//The XML element to find the metaDataInfoAttribute in
//We are looking for <MetadataInteger containerField='value' name='IPCCCID' value='aorta'>
let metaDataInfoElement = 'MetadataInteger';

//The XML element for MetadataInteger must contain
//We are looking for name='IPCCCID'
let mustContainElement = 'name';

//The XML value for mustContainElement to look for
//We are looking for name = 'IPCCCID'
let mustContainValue = 'IPCCCID';

//Which XML attribute to look for to display on the metaDataButton
//Here value = "aorta"
let metaDataInfoAttribute = 'value';

//The text for the 'htmlInfoButton'
let htmlInfoButtonText = 'Diagnosis Info';

//What HTML to display when the 'displayHTMLinfo' button is clicked
let htmlInfoButtonHTML = [ {
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
let instructionsHTML = [ {
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