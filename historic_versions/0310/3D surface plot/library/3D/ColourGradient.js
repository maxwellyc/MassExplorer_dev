/*
 * ColourGradient.js
 *
 *
 * Copyright (c) 2011 Greg Ross
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the project's author nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/**
 * Class that is used to define a path through RGB space.
 * @author Greg Ross
 * @constructor
 * @param minValue the value that will return the first colour on the path in RGB space
 * @param maxValue the value that will return the last colour on the path in RGB space
 * @param rgbColourArray the set of colours that defines the dirctional path through RGB space.
 * The length of the array must be greater than two.
 */
greg.ross.visualisation.ColourGradient = function(minValue, maxValue, rgbColourArray)
{
	function RGB2HTML(red, green, blue)
	{
	    var decColor = red + 256 * green + 65536 * blue;
	    return decColor.toString(16);
	}

	/**
	 * Return a colour from a position on the path in RGB space that is proportioal to
	 * the number specified in relation to the minimum and maximum values from which the
	 * bounds of the path are derived.
	 * @member greg.ross.visualisation.ColourGradient
	 * @param value
	 */
	this.getColour = function(value)
	{
		if (value < minValue || value > maxValue || rgbColourArray.length == 1)
		{
			var colr = {
				red: rgbColourArray[0].red,
				green:rgbColourArray[0].green,
				blue:rgbColourArray[0].blue
			};
			
			return colr;
		}
			
		var scaledValue = mapValueToZeroOneInterval(value, minValue, maxValue);
		
		return getPointOnColourRamp(scaledValue);
	}
	
	function getPointOnColourRamp(value)
	{
		var numberOfColours = rgbColourArray.length;
		var scaleWidth = 1 / (numberOfColours - 1);
		var index = (value / scaleWidth);
		var index = parseInt(index + "");
				
		index = index ==  (numberOfColours - 1) ? index - 1 : index;
		
		var rgb1 = rgbColourArray[index];
		var rgb2 = rgbColourArray[index + 1];
		
		var closestToOrigin, furthestFromOrigin;
		
		if (distanceFromRgbOrigin(rgb1) > distanceFromRgbOrigin(rgb2))
		{
			closestToOrigin = rgb2;
			furthestFromOrigin = rgb1;
		}
		else
		{
			closestToOrigin = rgb1;
			furthestFromOrigin = rgb2;
		}
		
		var t;
		
		if (closestToOrigin == rgb2)
			t = 1 - mapValueToZeroOneInterval(value, index * scaleWidth, (index + 1) * scaleWidth);
		else
			t = mapValueToZeroOneInterval(value, index * scaleWidth, (index + 1) * scaleWidth);
			
		var diff = [
			t * (furthestFromOrigin.red - closestToOrigin.red),
			t * (furthestFromOrigin.green - closestToOrigin.green), 
			t * (furthestFromOrigin.blue - closestToOrigin.blue)];
		
		var r = closestToOrigin.red + diff[0];
		var g = closestToOrigin.green + diff[1];
		var b = closestToOrigin.blue + diff[2];
		
		r = parseInt(r);
		g = parseInt(g);
		b = parseInt(b);
		
		var colr = {
			red:r,
			green:g,
			blue:b
		};
		
		return colr;
	}

	function distanceFromRgbOrigin(rgb)
	{
		return (rgb.red * rgb.red) + (rgb.green * rgb.green) + (rgb.blue * rgb.blue);
	}

	function mapValueToZeroOneInterval(value, minValue, maxValue)
	{
		if (minValue == maxValue) return 0;
		
		var factor = (value - minValue) / (maxValue - minValue);
		return factor;
	}
}

// Define a colour gradient.
var colour1 = {
red: 0,
green: 0,
blue: 255
};
var colour2 = {
red: 0,
green: 255,
blue: 255
};
var colour3 = {
red: 0,
green: 255,
blue: 0
};
var colour4 = {
red: 255,
green: 255,
blue: 0
};
var colour5 = {
red: 255,
green: 0,
blue: 0
};
var colours = [colour1, colour2, colour3, colour4, colour5];

// Define the range of values from min to max in which all your inputs lie.
var minValue = 1;
var maxValue = 300;

// Instantiate the object to calculate colout based upon an observation.
var colourGradientObject = new greg.ross.visualisation.ColourGradient(minValue, maxValue, colours);

// Get a reference to the canvas for displaying the legend.
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var legendWidth = 40

// Fill the legend with all possible colours from the gradient/ramp.
for (var i = 0; i < c.height; i++) {
    
    var rgbColour = colourGradientObject.getColour(i);
    
    var colr = "rgb(" + rgbColour.red + "," + rgbColour.green + "," + rgbColour.blue + ")";
    ctx.fillStyle = colr;
    
    ctx.fillRect(0,i,legendWidth,1);
    
}

// Render the legend text
ctx.fillStyle = "#000";
var numLabels = 10.0;
var interval = c.height/numLabels

for (var i = 0; i < numLabels; i++) {
    
    ctx.fillText(i, legendWidth+5, i*interval+15);
}

// Draw a border around the colour ramp.
ctx.rect(0.5,0,legendWidth,c.height);
ctx.strokeStyle = 'black';
ctx.stroke();
