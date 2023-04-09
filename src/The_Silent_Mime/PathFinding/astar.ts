import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";
import GraphUtils from "../../Wolfie2D/Utils/GraphUtils";
import Graph from "../../Wolfie2D/DataTypes/Graphs/Graph";
import EdgeNode from "../../Wolfie2D/DataTypes/Graphs/EdgeNode";

/**
 * The AstarStrategy class is an extension of the abstract NavPathStrategy class. For our navigation system, you can
 * now specify and define your own pathfinding strategy. Originally, the two options were to use Djikstras or a
 * direct (point A -> point B) strategy. The only way to change how the pathfinding was done was by hard-coding things
 * into the classes associated with the navigation system. 
 * 
 * - Peter
 */
export default class AstarStrategy extends NavPathStrat {

    /**
     * @see NavPathStrat.buildPath()
     */
    public buildPath(to: Vec2, from: Vec2): NavigationPath {
        let start = this.mesh.graph.snap(from);
        let end = this.mesh.graph.snap(to);

        let pathStack = new Stack<Vec2>(this.mesh.graph.numVertices);

        pathStack.push(this.mesh.graph.positions[end]);
        pathStack.push(to.clone());

        let path = this.aStar(this.mesh.graph, start, end);

        while (path !== null) {
            pathStack.push(this.mesh.graph.positions[path.gVal]);
            path = path.prev;
        }

        return new NavigationPath(pathStack);
    }

    public aStar(g: Graph, start: number, end: number): PathNode {
        let openList: PriorityQueue = new PriorityQueue();
        let closedList: Array<number> = new Array();    
        
        openList.enqueue(new PathNode(null, 0, this.calcH(start, end), start));

        while (openList.length() > 0) {
            let curNode = openList.dequeue();
            closedList.push(curNode.gVal);

            if (curNode.gVal == end) {
                return curNode;
            }

            let neighbor = g.edges[curNode.gVal];
            while (neighbor != null) {
                if (closedList.includes(neighbor.y)) {
                    neighbor = neighbor.next;
                    continue;
                }

                let neighborG = curNode.g + neighbor.weight;
                let neighborH = this.calcH(neighbor.y, end);

                let neighborNode = new PathNode(curNode, neighborG, neighborH, neighbor.y);

                let include = true;
                for (let i = 0; i < openList.length(); i++) {
                    if (openList.at(i).gVal == neighbor.y) {
                        if (openList.at(i).g < neighborNode.g) {
                            include = false;
                            break;
                        }
                        else {
                            openList.remove(i);
                            break;
                        }
                    }
                }

                if (include) {
                    openList.enqueue(neighborNode);
                }

                neighbor = neighbor.next;
            }
        }

        console.log("Path Not Found");
        return new PathNode(null, Infinity, Infinity, start);
    }

    public calcH(start: number, end: number): number {
        let startPos = this.mesh.graph.positions[start];
        let endPos = this.mesh.graph.positions[end];

        return Math.sqrt((startPos.x - endPos.x)^2 + (startPos.y - endPos.y)^2);
    }
}

class PathNode {
    prev: PathNode;
    g: number;
    h: number;
    f: number;
    gVal: number;

    constructor(p, g, h, val) {
        this.prev = p;
        this.g = g;
        this.h = h;
        this.f = this.g + this.h;
        this.gVal = val;
    }
}

class PriorityQueue {
    queArr: Array<PathNode>;

    constructor() {
        this.queArr = new Array();
    }

    enqueue(node: PathNode) {
        let contains = false;
        
        for (let i = 0; i < this.queArr.length; i++) {
            if (this.queArr[i].f > node.f) {
                this.queArr.splice(i, 0, node);
                contains = true;
                break;
            }
        }

        if (!contains) {
            this.queArr.push(node);
        }
    }

    remove(i: number) {
        this.queArr.splice(i, 1);
    }

    dequeue() {
        return this.queArr.shift();
    }

    length() {
        return this.queArr.length;
    }

    at(i: number) {
        return this.queArr[i];
    }
}