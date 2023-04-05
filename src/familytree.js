// =========================================================================================@@
// Last Updated Date: Jun 5, 2022
// Last Updated By: ajay
// Status Level: 1-4
// ===========================================================================================

import * as d3 from 'd3'
import { dagConnect, sugiyama, layeringSimplex, decrossOpt, sugiCoordVertical } from 'd3-dag'

class FamilyTree {

    constructor(data, svg) {


      // make dag from edge list
      this.dag = dagConnect()(data.links);

      console.log(this.dag)
      console.log('decedents', this.dag.descendants())

      const layout = sugiyama()
         .nodeSize(() => [50, 120])
         .layering(layeringSimplex())
         .decross(decrossOpt())
         // .coord(sugiCoordVertical());

      console.log('A', this.dag.proots[0].x)
      console.log('layout 2', layout(this.dag))
      console.log('B', this.dag.proots[0].x)

      const g = svg.append("g")
      var node = g.selectAll('g.node')
          .data(this.dag.descendants(), node => node.id)

      // insert new nodes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', (d) => "translate(" + d.y + "," + d.x + ")")
          // .attr("transform", _ => "translate(" + source.y0 + "," + source.x0 + ")")
          // .on('click', node => {
          //    node.click();
          //    this.draw(node);
          // })
          .attr('visible', true);

          nodeEnter.append('circle')
              .attr('class', 'person')
              .attr('r', 1e-6)

    //         // dag must be a node with id undefined. fix if necessary
    //         if (this.dag.id != undefined) {
    //             this.root = this.dag.copy();
    //             this.root.id = undefined;
    //             this.root.children = [this.dag];
    //             this.dag = this.root;
    //         }
    //
    //         // get all d3-dag nodes and convert to family tree nodes
    //         this.nodes = this.dag.descendants().map(node => {
    //             if (node.id in data.unions) return new Union(node, this)
    //             else if (node.id in data.persons) return new Person(node, this);
    //         });
    //
    //         // relink children arrays: use family tree nodes instead of d3-dag nodes
    //         this.nodes.forEach(n => n._children = n._children.map(c => c.ftnode));
    //
    //         // make sure each node has an id
    //         this.number_nodes = 0;
    //         this.nodes.forEach(node => {
    //             node.id = node.id || this.number_nodes;
    //             this.number_nodes++;
    //         })
    //
    //         // set root node
    //         this.root = this.find_node_by_id(start_node_id);
    //         this.root.visible = true;
    //         this.dag.children = [this.root];
    //
    //     }
    //     // if no edges but only nodes are defined: root = dag
    //     else if (Object.values(data.persons).length > 0) {
    //
    //         const root_data = data.persons[start_node_id];
    //         this.root = new d3.dagNode(start_node_id, root_data);
    //         this.root = new Person(this.root, this);
    //         this.root.visible = true;
    //         this.number_nodes = 1;
    //         this.nodes = [this.root];
    //
    //         // dag must be a node with id undefined
    //         this.dag = new d3.dagNode(undefined, {});
    //         this.dag.children = this.root;
    //     }
    }
    //
    // update_roots() {
    //     this.dag.children = [this.root];
    //     const FT = this;
    //
    //     function find_roots_recursive(node) {
    //         node.get_visible_inserted_neighbors().forEach(node => {
    //             if (node.is_root()) FT.dag.children.push(node);
    //             find_roots_recursive(node);
    //         });
    //     };
    //     find_roots_recursive(this.root);
    // };
    //
    // find_node_by_id(id) {
    //     return this.nodes.find(node => node.id == id);
    // };

};

export { FamilyTree }
