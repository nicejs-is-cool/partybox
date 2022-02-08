export class User {
    constructor(public name: string, public color: string, public home?: string) {}
    toArray() {
        return [this.name, this.color, "bot", ""];
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    setColor(color: string) {
        this.color = color;
        return this;
    }
}