class Connection {
    constructor(fromNode, toNode, weight, enabled, innovation) {
        this.fromNode = fromNode; // Node from which the connection originates
        this.toNode = toNode; // Node to which the connection leads
        this.weight = weight; // Weight of the connection
        this.enabled = enabled; // Boolean indicating whether the connection is enabled
        this.innovation = innovation; // Unique identifier for the connection
    }

    mutateWeight(mutationRate) {
        let rand = random(0, 1);
        let a = 0.02; //Probability of case 1 
        let b = 0.02; //Probability of case 2
        let c = 0.02; //Probability of case 3

        if(rand < a) { //Replace with new value
            this.weight = random(-1, 1);
            return 0;
        }

        if(rand < a + b) { //Multiply by random percentage
            this.weight *= random(0.5, 1.5);
            return 0;
        }

        if(rand < a + b + c) { //Add random number
            this.weight += random(-1, 1);
            return 0;
        }

        //Add random gaussian number gigachad
        this.weight += gaussianRandom() * mutationRate;
    }

    copy(nodeMap) {
        let fromNodeCopy = nodeMap.get(this.fromNode.id);
        let toNodeCopy = nodeMap.get(this.toNode.id);

        let copy = new Connection(fromNodeCopy, toNodeCopy, this.weight, this.enabled, this.innovation);

        return copy;
    }
}