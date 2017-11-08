# X3DOM HTML Generator

[logo]: http://www.codn.io/img/portfolio/x3dom.jpg "X3Dom HTML Generator"
![X3Dom HTML Generator][logo]

[Running code on my site](http://www.codn.io/x3dom-html-generator/)

## Auto-Render HTML From your X3Dom or 3D Printer compatible files

X3DOM HTML Generator parses X3Dom and 3D Print compatible XML files then appends HTML to a page according to sDEF XML value (will soon parse XML for Shape DEF) and also appends colors to the sDEF through the diffuseColorHex value. Manually added XML values. Later on to decide more to add and which way to add them.

The parser also looks for one Meta Info value called EACTSID which extracts the now current IPCCCID value, which will change to a more dynamic and agnostic value later on.

Then the parser appends HTML using .appendChild() with data out of an array of objects for buttons like 'Diag Info' to work around not using an iFrame. In the future will use react.js to accomplish more of the appending.

### Documentation

#### At the head:
I use Lato as a nice readable text and viewport
```html
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
```

#### At the top of the body:
HTML Containing the Inline X3D must be a copy of this code (examples in the git)
```html
<div id='wrapper'>

    <div id='infoWrapper'>
    </div>

    <div id="toggleWrapper">
    </div>

    <div id='contentWrapper'>
        <x3d id='x3dwrapper'>
            <scene>
                <inline nameSpaceName='x3dModelFile' mapDEFToID='true' url='../database/clients/example-aorta/modelFile.x3d' />
            </scene>
        </x3d>

        <div id='twoDeeDrawing'>
            <img id='imageDisplayID'>
        </div>

        <div id='HTMLdiv'>
            <div id='displayHTML'>
            </div>
        </div>
    </div>
</div>
```

#### At the bottom of the body:
Then this JavaScript must be inserted before we include the script that appends the buttons, or else we get errors (like jQuery)
These values represent how button appending will work

```html
<script type="text/javascript">
    //Which X3Dom file to render
    let xmlFile = '../database/clients/example-aorta/modelFile.x3d';
    //The text for the 'displayHTMLinfoButton'
    let displayHTMLinfoButtonText = 'Diagnosis Info';
    //The text for the 'metaDataButton'
    let metaDataInfoButtonText = 'MetaData Info';
    //Which XML tag to look for to display on the metaDataButton
    let metaDataInfo = 'EACTSID';
    //What HTML to display when the Diag Info button is clicked
    let displayHTMLinfoHTML = [{
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
    let instructionsHTML = [{
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
</script>
```

The next line is the button appending JavaScript

```html
<script type='text/javascript' src='js/index.js'></script>
<link rel='stylesheet' type='text/css' href='css/style.css' />
```

The X3Dom script can be loaded from the top or bottom, but prefer here

```html
<script type='text/javascript' src='../X3DOM/x3dom.js'></script>
<link rel='stylesheet' type='text/css' href='../X3DOM/x3dom.css' />
```

#### To get the 2D drawing to work:
Its filename must match the metaDataInfo text and (at the moment) must be a png file.
In the example-aorta case the metaDataInfo is 'aorta' so the file name must be aorta.png
We locate the file in ../database/metaDataInfo/2Dimages
The full path would be ../database/metaDataInfo/2Dimages/aorta.png

#### Lookout!
Some servers are caps sensitive, if you are not super savvy and something is not working check the caps, try to keep it consistent!

### Authors Credits and License Info

```
Authors and Credits:

Nicholas Gatti
```

```
MIT License

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
```
