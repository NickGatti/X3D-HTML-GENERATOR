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
const SETTINGS_FILE_xmlFile = '../database/clients/example-aorta/modelFile.x3d';
//Specify the X3D reference file for the PIP window
const SETTINGS_FILE_referenceFile = '../database/referenceModels/aorta/referenceModel.x3d';

//The text for the 'metaDataButton'
const SETTINGS_FILE_metaDataInfoButtonText = 'MetaData Info';

//Image file extension
const SETTINGS_FILE_imageFileExtension = 'png';

//The XML element to find the metaDataInfoAttribute in
//We are looking for <MetadataInteger containerField='value' name='IPCCCID' value='aorta'>
const SETTINGS_FILE_metaDataInfoElement = 'MetadataInteger';

//The XML element for MetadataInteger must contain
//We are looking for name='IPCCCID'
const SETTINGS_FILE_mustContainElement = 'name';

//The XML value for mustContainElement to look for
//We are looking for name = 'IPCCCID'
const SETTINGS_FILE_mustContainValue = 'IPCCCID';

//Which XML attribute to look for to display on the metaDataButton
//Here value = "aorta"
const SETTINGS_FILE_metaDataInfoAttribute = 'value';

//The text for the 'htmlInfoButton'
const SETTINGS_FILE_htmlInfoButtonText = 'Diagnosis Info';

//What HTML to display when the 'displayHTMLinfo' button is clicked
const SETTINGS_FILE_htmlInfoButtonHTML = [ {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
        "p": "Example p tag"
    }, {
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
const SETTINGS_FILE_instructionsHTML = [ {
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

const SETTINGS_FILE_modalWindowInfo = {
    // Backticks (backquote) used for aorta value
    'Aorta': `

    <p>The largest artery in the body, the aorta arises from the left ventricle of the heart, goes up (ascends) a little ways, bends over (arches), then goes down (descends) through the chest and through the abdomen to where ends by dividing into two arteries called the common iliac arteries that go to the legs.</p>
    <p>Anatomically, the aorta is traditionally divided into the ascending aorta, the aortic arch, and the descending aorta. The descending aorta is, in turn, subdivided into the thoracic aorta (that descends within the chest) and the abdominal aorta (that descends within the belly).</p><p>The aorta gives off branches that go to the head and neck, the arms, the major organs in the chest and abdomen, and the legs.</p><p>It serves to supply them all with oxygenated blood.</p>
    <p>The aorta is the central conduit from the heart to the body.</p><p>Source: <a target="_blank" href="https://www.medicinenet.com/script/main/art.asp?articlekey=2295">http://www.medicinenet.com/script/main/art.asp?articlekey=2295</a></p>`,

    'Calcification': 'Calcification info...'
}