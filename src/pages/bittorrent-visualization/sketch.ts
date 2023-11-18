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

  const angle = 0;
  const peers = [];
  const tmp = [];
  const connections = [];
  const rot = -1;
  const testTorrent = new Torrent(30);
  const initialSeeders = 1;
  const initialPeers = 5;

  class Peer {
    actBits: unknown[];
    ccolor: string;
    chue: number; // x of peer
    cxpos: number; // y of peer
    cypos: number; // x of where peer should be
    ehue: number; // y of where peer should be
    emovetime: number;
    expos: number;
    eypos: number;
    index: number;
    knex: unknown[];
    lastcheck: number;
    myBits: unknown[];
    needBits: unknown[];
    percent: number;
    pwait: number;
    removing: number;
    shue: number;
    smovetime: number;
    sxpos: number;
    sypos: number;

    constructor(pct: number) {
      let szv = peers.length;

      if (szv === 0) {
        szv++;
      }

      this.pwait = p5.random(1, 9) * 1000;
      this.myBits = [];
      this.needBits = [];
      this.knex = [];
      this.actBits = [];

      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.ellipseMode(p5.CENTER);

      const angle = 3;

      p5.rotate(p5.radians(angle));
      this.expos = p5.width / 2 + 230 * p5.cos(p5.radians(angle)); // screenX(0, 230)
      this.eypos = p5.height / 2 + 230 * p5.sin(p5.radians(angle)); // screenY(0, 230)
      this.sxpos = p5.width / 2;
      this.sypos = p5.height / 2;
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + 1250;
      this.percent = pct;
      p5.colorMode(p5.HSB);

      this.lastcheck = p5.millis();

      this.chue = 5;

      p5.pop();
      this.setupBits();
    }

    setupBits() {
      for (let i = 0; i < testTorrent.bits.length; i++) {
        if (!this.myBits.includes(testTorrent.bits[i])) {
          this.needBits.push(testTorrent.bits[i]);
        }
      }
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

  p5.setup = () => {
    p5.createCanvas(450, 450, p5.WEBGL);
    p5.fill(256);
    p5.fill(0);
    p5.textAlign(p5.CENTER);
  };
};
