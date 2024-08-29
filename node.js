const activations = ["abs", "clamped", "cube", "exp", "gauss", "hat", "identity", "inv", "log", "relu", "elu", "sigmoid", "tanh", "square", "sin"];

class Node {
    constructor(id, type, layer) {
        this.id = id; // Unique identifier for the node
        this.type = type; // Type of the node ('sensor', 'hidden', 'output'), didn't end up using this :')
        this.layer = layer; //The layer the node is in, lol

        this.inputSum = 0; // Sum of inputs
        this.outputValue = 0; // Output value of the node
        this.outputConnections = []; // List of connections to other nodes
        this.activation = randint(0, activations.length - 1); //Activation function randomly chose from array
        this.bias = random(-1, 1); //Random bias from -1 to 1
    }

    mutateBias(mutationRate) {
        let rand = random(0, 1);
        let a = 0.02; //Probability of case 1 
        let b = 0.02; //Probability of case 2
        let c = 0.02; //Probability of case 3

        if(rand < a) { //Replace with new value
            this.bias = random(-1, 1);
            return 0;
        }

        if(rand < a + b) { //Multiply by random percentage
            this.bias *= random(0.5, 1.5);
            return 0;
        }

        if(rand < a + b + c) { //Add random number
            this.bias += random(-1, 1);
            return 0;
        }

        //Add random gaussian number, like gaussian distribution, like the bell curve thing, like its close to 0 basically
        this.bias += gaussianRandom() * mutationRate;
    }

    mutateActivation() {
        this.activation = randint(0, activations.length - 1);
    }

    activate() {
        // Apply activation function 
        this.outputValue = activationFunctions[activations[this.activation]](this.inputSum + this.bias);
        
        // Reset input sum
        this.inputSum = 0;

        // For each output connection, send the output value * connection weight
        for(let i = 0; i < this.outputConnections.length; i++) {
            if(this.outputConnections[i].enabled) {
                this.outputConnections[i].toNode.inputSum += this.outputValue * this.outputConnections[i].weight;
            }
        }
    }

    copy() {
        let copy = new Node(this.id, this.type, this.layer);
        copy.bias = this.bias;
        copy.activation = this.activation;

        return copy;
    }

    incrementLayer() {
        this.layer++;
        for(let conn of this.outputConnections) {
            conn.toNode.incrementLayer();
        }
    }
}