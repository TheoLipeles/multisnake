const { expect } = require("chai");
const Snake = require("./Snake");
const SnakeSegment = require("./SnakeSegment");
const Entity = require("./Entity");

/* global describe it beforeEach*/

describe("Snake", () => {
	let snake;
	beforeEach("creates a new snake", () => {
		snake = new Snake();
	});

	it("has id, length, direction, and head properties", () => {
		expect(snake).to.have.keys("length", "direction", "range", "head", "tail");
	});

	// it("has correct default values", () => {
	//   expect(snake).to.deep.equals({ length: 1, direction: { axis: "x", isNeg: false }, range: 45, head: new SnakeSegment(), tail: new SnakeSegment() });
	// });

	it("grows properly", () => {
		snake.grow();
		snake.grow();
		snake.grow();
		expect(snake.length).to.equal(4);
		let lengthCount = 0;
		let currSegment = snake.head;
		while (currSegment) {
			lengthCount++;
			currSegment = currSegment.next;
		}
		expect(lengthCount).to.equal(snake.length);
	});

	it("moves the head correctly", () => {
		const coincideEntity = new Entity(1, 0, 0);
		const nonCoincideEntity = new Entity(0, 0, 0);
		snake.move();
		expect(snake.head.coincides(coincideEntity)).to.be.equal(true);
		expect(snake.head.coincides(nonCoincideEntity)).to.be.equal(false);
	});

	it("changes direction", () => {
		snake.turn("y-");
		expect(snake.direction).to.deep.equal({ axis: "y", isNeg: true });
	});

	it("can move the head correctly after it turns", () => {
		const coincideEntity = new Entity(0, -2, 0);
		snake.turn("y-");
		snake.move();
		snake.move();
		expect(snake.head.coincides(coincideEntity)).to.be.equal(true);
	});

	it("moves all snake segments", () => {
		const segmentOne = new Entity(2, 0, -4);
		const segmentTwo = new Entity(2, 0, -3);
		const segmentThree = new Entity(2, 0, -2);
		snake.grow(); // 000 000
		snake.move(); // 100 000
		snake.grow(); // 100 100 000
		snake.grow();
		snake.move(); // 200 100 100
		snake.turn("z-");
		snake.turn("");
		snake.move(); // 20-1 200 100
		snake.move(); // 20-2 20-1 200
		snake.move(); // 20-3 20-2 20-1
		snake.move(); // 20-4 20-3 20-2
		expect(snake.head.coincides(segmentOne)).to.be.equal(true);
		expect(snake.head.next.coincides(segmentTwo)).to.be.equal(true);
		expect(snake.head.next.next.coincides(segmentThree)).to.be.equal(true);
	});

	it("dies completely", () => {
		snake.grow();
		snake.grow();
		snake.die();
		expect(snake.length).to.be.equal(1);
		expect(snake.head.next).to.be.equal(null);
		expect(snake.head.prev).to.be.equal(null);
		expect(snake.head).to.be.equal(snake.tail);
	});

	it("checks collision properly", () => {
		snake.grow();
		snake.move();
		expect(snake.collides(new Entity(0, 0, 0))).to.be.equal(true);
		expect(snake.collides(new Entity(1, 0, 0))).to.be.equal(true);
		expect(snake.collides(new Entity(2, 0, 0))).to.be.equal(false);
	});

	it("checks suicides properly", () => {
		snake.grow(5);
		expect(snake.suicides()).to.be.equal(false);
		snake.move();
		snake.turn("y-");
		expect(snake.suicides()).to.be.equal(false);
		snake.move();
		snake.turn("x-");
		expect(snake.suicides()).to.be.equal(false);
		snake.move();
		snake.turn("y+");
		expect(snake.suicides()).to.be.equal(false);
		snake.move();
		snake.turn("x+");
		snake.move();
		expect(snake.suicides()).to.be.equal(true);
	});
});
