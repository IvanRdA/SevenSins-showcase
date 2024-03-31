// As almost all of the procedurals involves throwing dices to generate random numbers, I've instanced a class that could get or not a boolean to indicate if the result must be rounded or not. 
// Just have to indicate the number of faces (max number on the dice) and instance his getThrow() method.
export default class Dice {
    sizes: number

    constructor(sizes: number) {
        this.sizes = sizes
    }

    public getThrow(rounded?: boolean): number {
        const isRounded = rounded ?? true

        if(isRounded){
            return Math.floor(Math.random() * this.sizes)
        }else{
            return Math.random() * this.sizes
        }
    }
}