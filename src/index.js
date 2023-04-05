// =========================================================================================@@
// Last Updated Date: Jun 5, 2022
// Last Updated By: ajay
// Status Level: 1-4
// ===========================================================================================

import * as d3 from 'd3'
import { FamilyTree } from './familytree.js'
import data from './data.js'

//  // insert svg object to hold the family tree
 const svg = d3.select("body").append("svg")
     .attr("width", document.body.offsetWidth)
     .attr("height", document.documentElement.clientHeight);

 // make family tree object
const FT = new FamilyTree(data, svg)
