# X3DOM HTML Generator:

[logo]: http://www.codn.io/img/portfolio/x3dom.png "X3Dom HTML Generator"
![X3Dom HTML Generator][logo]

[Running code on my site](http://www.codn.io/x3dom-html-generator/)

## Auto-Render HTML From your X3Dom or 3D Printer compatible files:

X3DOM HTML Generator parses X3Dom and 3D Print compatible XML files then appends HTML to a page according to:

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
1. ~Soon Add support for .jpg, .svg and .png in the 2D images
2. ~3/2018 After semester 2 at Galvanize and more understanding of databases and the full stack, rewrite the structure so it's easier to implement into a full stack
3. ~5/2018 After semester 4 at Galvanize and more understanding of frameworks, add a framework like react.js, angular or vue
4. ~Unknown ETA Wait to see what to do about the Compare 3D button
```

## Patch Notes

```
10-10-2017 Added Proper XML parsing support (no more sDEF or diffuseColorHex) total automatic file reading
10-10-2017 Added overflow-auto to html-div no more need to add a floating nav bar
10-11-2017 Removed need to add inline X3D html tag
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
<div id='x3d_gen_wrapper'>

    <div id='x3d_gen_info_button_wrapper'>
    </div>

    <div id="x3d_gen_shape_def_button_wrapper">
    </div>

    <div id='x3d_gen_x3d_content_wrapper'>
        <x3d id='x3d_gen_x3d_wrapper'>
            <scene id='x3d_gen_x3d_scene'>
            </scene>
        </x3d>

        <div id='x3d_gen_image_div'>
            <img id='x3d_gen_image_img_element'>
        </div>

        <div id='x3d_gen_html_outer_div'>
            <div id='x3d_gen_html_inner_div'>
            </div>
        </div>
    </div>
</div>
```

#### At the bottom of the body:
Then this JavaScript must be inserted before we include the script that appends the buttons, or else we get errors (like jQuery).

These values represent how button appending will work.

```html
<script type="text/javascript">
    //IF USING THE AORTA EXAMPLE
    //Which X3D file to render
    let xmlFile = '../database/clients/example-aorta/modelFile.x3d';

    //The text for the 'metaDataButton'
    let metaDataInfoButtonText = 'MetaData Info';

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
    let htmlInfoButtonHTML = [{
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

The X3Dom script can be loaded from the top or bottom, but it is best performing to load it right here before the button appending JavaScript

```html
<script type='text/javascript' src='../X3DOM/x3dom.js'></script>
<link rel='stylesheet' type='text/css' href='../X3DOM/x3dom.css' />
```

The next line is the button appending JavaScript and must be below the inline JavaScript in the HTML above

```html
<script type='text/javascript' src='js/index.js'></script>
<link rel='stylesheet' type='text/css' href='css/style.css' />
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
