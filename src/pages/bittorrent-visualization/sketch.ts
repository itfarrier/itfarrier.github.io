import type p5 from 'p5';

export const sketch = (p5: p5) => {
  class Bit {
    bitHue: number;
    id: number;

    constructor(i: number, hu: number) {
      this.id = i;
      this.bitHue = hu;
    }
  }

  class Kibble {
    big: number;
    endtime: number;
    starttime: number;

    constructor() {
      this.starttime = 0;
      this.endtime = 0;
      this.big = p5.random(0, 4);
    }
  }

  class Torrent {
    bits: Bit[] = [];

    constructor(totbits: number) {
      for (let i = 0; i < totbits; i++) {
        const ll = (255 / totbits) * i;
        const k = new Bit(i, ll);

        this.bits.push(k);
      }
    }
  }

  const angle = 0;
  const peers = [];
  const tmp = [];
  const connections = [];
  const rot = -1;
  const testTorrent = new Torrent(30);
  const initialSeeders = 1;
  const initialPeers = 5;

  p5.setup = () => {
    p5.createCanvas(450, 450, p5.WEBGL);
    p5.fill(256);
    p5.fill(0);
    p5.textAlign(p5.CENTER);
  };
};
