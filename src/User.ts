export class User {
    constructor(public name: string, public color: string, public home?: string) {}
    toArray(bot: boolean = true) {
        return [this.name, this.color, bot ? "bot" : "", ""];
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