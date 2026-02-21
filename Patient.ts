class Patient {
    #name! : string;
    #ageInMonths! : number;
    #conditions! : String[];

    get age() {
        return this.#ageInMonths;
    }

    get conditions() {
        return this.#conditions;
    }
}