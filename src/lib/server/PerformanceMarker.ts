import 'server-only';

import crypto from 'node:crypto';

export default class PerformanceMarker {
  private marker;

  public constructor() {
    this.marker = crypto.randomUUID();
  }

  public start() {
    performance.mark(`${this.marker}_START`);
  }

  public end() {
    performance.mark(`${this.marker}_END`);
  }

  public measure() {
    return performance.measure(
      `${this.marker}_TOTAL`,
      `${this.marker}_START`,
      `${this.marker}_END`
    ).duration;
  }
}
