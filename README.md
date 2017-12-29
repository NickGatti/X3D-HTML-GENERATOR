# X3D HTML Generator:

[logo]: http://www.codn.io/img/portfolio/view.jpg "X3D HTML Generator"
![X3Dom HTML Generator][logo]

[Running code on my site](http://www.codn.io/x3dom-html-generator/)

[X3DOM Website](https://doc.x3dom.org/)

## Auto-Render a HTML View From your X3Dom, 3D Printer or X3D compatible files:

```
HTML View Layout based on education of the current X3D file.
Ex: X3D file is a heart, goal is to educate about a heart
Ex: X3D file is a car, goal is to educate about the car
Ex: X3D file is a model of a person, goal is to instruct how to perform exercises
Ex: X3D file is a drone, goal is to instruct on how to build the drone
```

### Note: Scaling for files must be in millimeters (or if using custom indicator must be in the same scale) when imaged for reference indicator to work correctly
```
<X3D>
  <Head>
  </Head>
  <Scene>
    <Background ... />
    <Viewpoint ... />
    <Transform scale='10000 10000 10000'>
      <Transform center="0 0 0" rotation="1 0 0 0.0">
        <Transform center="0 0 0" rotation="0 1 0 0.0">
          <Transform center="0 0 0" rotation="0 0 1 0.0">
          <Shape...
          </Shape
          </Transform>
        </Transform>
      </Transform>
    </Transform>
  </Scene>
</X3D>
```

X3D HTML Generator parses X3Dom and 3D Print compatible XML files then appends HTML to a page according to:

* Shape element and DEF attribute
* Material element and diffuseColor attribute

Also custom set values any 1 attribute within an element (usually "MetadataInteger") that contains another value, appended to button text.
We currently set these in the HTML itself.

Example:
We want the value 'aorta' in 'MetadataInteger' but only the value aorta where the XML element contains IPCCCID and theres more than one 'MetadataInterger' element in the XML.
```
<MetadataInteger containerField='value' name='IPCCCID' value='aorta'>
```
This is set in the HTML.

Then the parser appends HTML using .appendChild() with data out of an array of objects for buttons like 'Diagnosis Info' to work around not using an iFrame. In the future will use a framework to accomplish more of the appending.

## Future Plans and TODO list

```
Current: Integrate Information Views (modals) for event actions
1. ~3/2018 After semester 2 at Galvanize and more understanding of databases and the full stack, rewrite the structure so it's easier to implement into a full stack
2. ~5/2018 After semester 3 at Galvanize and more understanding of frameworks, add a framework like react.js, angular or vue
```

## Patch Notes

```
10-10-2017 Added Proper XML parsing support (no more sDEF or diffuseColorHex) total automatic file reading
10-10-2017 Added overflow-auto to html-div no more need to add a floating nav bar
10-11-2017 Removed need to add inline X3D html tag
10-11-2017 Added support for all extensions on the image file
10-11-2017 No longer need to ship X3Dom with the package
12-23-2017 Added support for compare3D button
12-23-2017 Added loading modal window
```

### Documentation

#### At the head:
I use Lato as a nice readable text and viewport.
```html
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
```

#### At the top of the body:

```html
<div id='x3d_generator_wrapper'>

    <div id='x3d_generator_info_button_wrapper'>
    </div>

    <div id="x3d_generator_shape_def_button_wrapper">
    </div>

    <div id='x3d_generator_x3d_content_wrapper'>

        <x3d id='x3d_generator_x3d_wrapper'>
            <scene id='x3d_generator_x3d_scene'>
            </scene>
        </x3d>

        <x3d id='x3d_generator_x3d_wrapper_reference'>
            <scene id='x3d_generator_x3d_scene_reference'>
            </scene>
        </x3d>

        <div id='x3d_generator_image_div'>
            <img id='x3d_generator_image_img_element'>
        </div>

        <div id='x3d_generator_html_outer_div'>
            <div id='x3d_generator_html_inner_div'>
            </div>
        </div>
    </div>
</div>
```

#### At the bottom of the HTML:
Then this JavaScript file must be inserted before we include the script that appends the buttons, or else we get errors (like jQuery).
Current this is a separate settings file it can be put straight into the HTML inside a script tag or not.
These values represent how button appending will work.

```javascript
    //IF USING THE AORTA EXAMPLE
    //Which X3D file to render
    let SETTINGS_FILE_xmlFile = '../database/clients/example-aorta/modelFile.x3d';
    //Specify the X3D reference file for the PIP window
    let SETTINGS_FILE_referenceFile = '../database/referenceModels/aorta/referenceModel.x3d';

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
    let SETTINGS_FILE_htmlInfoButtonHTML = [{
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
    let SETTINGS_FILE_instructionsHTML = [{
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
```

The X3Dom script is loaded by the button appending JavaScript, but we are loading the CSS from the HTML here:

```html
<link rel='stylesheet' type='text/css' href='http://www.x3dom.org/x3dom/release/x3dom.css' />
```

The next line is the button appending JavaScript and must be below the inline JavaScript in the HTML above

```html
<script type='text/javascript' src='js/index.js'></script>
<link rel='stylesheet' type='text/css' href='css/style.css' />
<script type='text/javascript' src='js/referenceModel.js'></script>
```

#### To get the 2D drawing to work:

Its filename must match the 'metaDataInfo' text and (at the moment) must be a .png file.

In the 'example-aorta.html' case the 'metaDataInfo' is 'aorta' so the file name must be 'aorta.png'.
___
 We locate the file in:
 '../database/metaDataInfo/2Dimages'
___
 The full path would be:
 '../database/metaDataInfo/2Dimages/aorta.png'
___

#### Lookout!
Some servers are caps sensitive, if you are not super savvy and something is not working check the caps, try to keep it consistent!


In the 'example-heart.html' case the 'metaDataInfo' is 'Heart' so the file name must be 'Heart.png'.
___
 We locate the file in:
 '../database/metaDataInfo/2Dimages'
___
 The full path would be:
 '../database/metaDataInfo/2Dimages/Heart.png'
___

### Authors, Credits and License Info

```
Authors and Credits (not including X3DOM)

Author of JavaScript, CSS and HTML:
Nicholas Gatti

Credit of idea to implement through automatic appending by XML 3D Print / X3D file parse
Nicholas Gatti

Credit to Justin Ryan for consultation regarding X3D file specification
```

#### Special Thanks to https://doc.x3dom.org/ Justin Ryan and Andreas Plesch

```
3D Render Canvas from https://doc.x3dom.org/
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
