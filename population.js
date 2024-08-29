class Population {
    constructor(numIndividuals, individualTemplate) {
        this.pop = [];
        this.individualTemplate = individualTemplate;

        for(let i = 0; i < numIndividuals; i++) {
            let copy = new individualTemplate();
            this.pop.push(copy);
        }
    }

    breed() {
        // Sort the population in descending order of fitness
        let sortedPop = this.pop.sort((a, b) => b.fitness - a.fitness);
    
        // Select the top 10% of individuals
        let survivors = sortedPop.slice(0, Math.ceil(0.1 * sortedPop.length));
    
        // Randomly breed individuals from the survivors
        let offspring = [];
        while (offspring.length < this.pop.length) {
            let parent1 = survivors[randint(0, survivors.length - 1)];
            let parent2 = survivors[randint(0, survivors.length - 1)];
    
            let child = new this.individualTemplate();
            child.genome = parent1.genome.crossover(parent2.genome);
            child.genome.mutate();
    
            offspring.push(child);
        }
    
        // Replace the current population with the new generation
        this.pop = offspring;
    }

    averageFitness() {
        var totalFitness = this.pop.reduce(function(sum, individual) {
            return sum + individual.fitness;
        }, 0);
        var averageFitness = totalFitness / this.pop.length;
        return averageFitness;
    }
}