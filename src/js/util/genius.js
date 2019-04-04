/**
 * Genius class
 * This class serves static methods to be used across the different canvases
 * Mostly related to calculations and some other smartass things.
 */
export class Genius {
  
  static rng(max = 100, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}