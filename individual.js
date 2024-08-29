class Individual {
    constructor(inputs, outputs) {
        this.genome = new Genome(inputs, outputs, false);
        this.fitness = 0;
    }
}