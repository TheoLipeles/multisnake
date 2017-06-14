const SnakeSegment = require("./SnakeSegment");

module.exports = class Snake {
    constructor(direction = "x+") {
        this.length = 1;
        this.direction = {
            axis: direction[0],
            isNeg: direction[1] === "-"
        };
        this.head = new SnakeSegment();
        this.tail = this.head;
    }

    move() {
        let currSegment = this.tail;
        while (currSegment.prev) {
            currSegment.copyPosition(currSegment.prev);
            currSegment = currSegment.prev;
        }
        this.head[this.direction.axis] += Math.pow(-1, this.direction.isNeg);
    }

    grow() {
        this.length++;
        this.head = this.head.clone({ next: this.head });
        this.head.next.prev = this.head;
    }

    turn(direction) {
        if (direction) {
            this.direction = {
                axis: direction[0],
                isNeg: direction[1] === "-"
            };
        }
    }

    die() {
        this.head.next = null;
        this.tail = this.head;
        this.length = 1;
    }

    collides(entity) {
        let currSegment = this.head;
        while (currSegment) {
            if (entity.coincides(currSegment)) return true;
            currSegment = currSegment.next;
        }
        return false;
    }
};
