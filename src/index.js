class List {
    constructor(name) {
        this.name = name;
        this.data = this.initData();
    }
    add(payload) {
        const Object = {
            id: Date.now(),
            ...payload
        };

        this.data.push(Object);
        this.save();
    }
    remove(id) {
        this.data = this.data.filter(e => e.id !== id);
        this.save();
    }
    update(id, payload) {
        this.data = this.data.map(j => {
            if(j.id !== id) {

                return j;
            }

            return {...j, ...payload};
        });
        this.save();
    }
    save () {
        const jsonData = JSON.stringify(this.data);

        localStorage.setItem(this.name, jsonData);
    }
    initData() {
        const jsonData = localStorage.getItem(this.name);

        return JSON.parse(jsonData) || [];
    }
}
class TotoList extends List {

    add(text) {
        const note = {
            isComplete: false,
            value: text
        };

        super.add(note);
    }
    update(id, text) {
        super.update(id, {value: text});
    }
    setNoteComplete(id) {
        this.data = this.data.map(j => {
            if (j.id === id) {
                j.isComplete = true;
            }

            return j;
        });
        this.save();
    }
    get statistic() {
        const complete = this.data.filter(j => Boolean(j.isComplete)).length;

        return {
            complete,
            total: this.data.length
        };
    }
}
new TotoList('todo');