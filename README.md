# X3DOM HTML Generator

[logo]: http://www.codn.io/img/portfolio/x3dom.jpg "X3Dom HTML Generator"
![X3Dom HTML Generator][logo]

[Running code on my site](http://www.codn.io/x3dom-html-generator/)

## Auto-Render HTML From your X3Dom or 3D Printer compatible files

X3DOM HTML Generator parses X3Dom and 3D Print compatible XML files then appends HTML to a page according to sDEF XML value (will soon parse XML for Shape DEF) and also appends colors to the sDEF through the diffuseColorHex value. Manually added XML values. Later on to decide more to add and which way to add them.

The parser also looks for one Meta Info value called EACTSID which extracts the now current IPCCCID value, which will change to a more dynamic and agnostic value later on.

Then the parser appends HTML using .appendChild() with data out of an array of objects for buttons like 'Diag Info' to work around not using an iFrame. In the future will use react.js to accomplish more of the appending.



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
