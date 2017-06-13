const { expect } = require('chai')
const Entity = require('./Entity')
const SnakeSegment = require('./SnakeSegment')

/* global describe it */

describe('SnakeSegment', () => {
  it('extends from Entity', () => {
    expect(new SnakeSegment()).to.be.instanceOf(Entity)
  })

  const position = [5, 10, 15]
  let testSegment

  beforeEach('create a new snake segment', () => {
    testSegment = new SnakeSegment(...position)
  })

  it('has x, y, z, and next properties', () => {
    expect(testSegment).to.have.keys('x', 'y', 'z', 'next')
  })

  it('has correct property values', () => {
    expect(testSegment).to.include({ x: position[0], y: position[1], z: position[2] })
  })

  it('has default property values of 0', () => {
    const newSnakeSegment = new SnakeSegment()
    expect(newSnakeSegment).to.include({ x: 0, y: 0, z: 0 })
  })
})