/*Copyright (c) 2017 Andreas Plesch, Waltham MA (email: andreasplesch atsign gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var vp_anatomicalModel, vp_referenceModel;
//vp stands for viewpoint

document.onload = function () {

    document.querySelector( '#x3d_generator_x3d_wrapper inline' ).onload = function () {
        //vp_anatomicalModel = document.querySelector('#x3dwrapper').runtime.viewpoint()._xmlNode;
        vp_anatomicalModel = document.getElementById( 'x3dModelFile__default' ); //looking into nameSpaceName of inline and name of viewpoint (e.g., default)
        vp_anatomicalModel.addEventListener( 'viewpointChanged', syncViews );
    };

    document.querySelector( '#x3d_generator_x3d_wrapper_reference inline' ).onload = function () {
        //vp_referenceModel = document.querySelector('#reference').runtime.viewpoint()._xmlNode;
        vp_referenceModel = document.getElementById( 'referenceModel__default' );
    };

}

function syncViews( evt ) {
    var o = evt.orientation;
    var p = evt.position;
    /*
    vp2.setAttribute('orientation',[o[0].x,o[0].y,o[0].z].join()+" "+o[1]);
    vp2.setAttribute('position', [p.x,p.y,p.z].join());
    */

    vp_referenceModel.setFieldValue( 'orientation', // necessary to convert to quaternion
        x3dom.fields.Quaternion.axisAngle( evt.orientation[ 0 ], evt.orientation[ 1 ] )
    );
    vp_referenceModel.setFieldValue( 'position', evt.position );

    //console.log(evt);
}