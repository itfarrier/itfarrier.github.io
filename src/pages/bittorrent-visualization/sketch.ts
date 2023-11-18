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
  const peers: Peer[] = [];
  const tmp = [];
  const connections = [];
  const rot = -1;
  const testTorrent = new Torrent(30);
  const initialSeeders = 1;
  const initialPeers = 5;

  class Peer {
    actBits: unknown[];
    ccolor: p5.Color;
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
    myBits: Bit[];
    needBits: Bit[];
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

    bitRequest(k, j) {
      if (k.knex.size() < 4) {
        const mz = new Connection(k, peers[this.index], j);

        k.knex.add(peers[this.index]);

        this.actBits.push(j);

        connections.push(mz);
      }
    }

    findPeer() {
      for (let i = 0; i < this.needBits.length; i++) {
        this.needBits = p5.shuffle(this.needBits);

        const b = this.needBits[i];

        for (let o = 0; o < peers.length; o++) {
          const p = peers[o];

          if (
            p.myBits.includes(b) &&
            !(p.removing > 0) &&
            !(this.removing > 0) &&
            !p.knex.includes(peers[this.index]) &&
            p.index != this.index &&
            !this.actBits.includes(b)
          ) {
            this.bitRequest(p, b);
          }
        }
      }
    }

    reConfigure(i: number) {
      let k;

      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.ellipseMode(p5.CENTER);

      if (peers.length == 0) {
        k = 1;
      } else {
        k = peers.length;
      }

      this.index = i;

      const angle = (360 / k) * i + rot;

      p5.rotate(p5.radians(angle));

      this.sxpos = this.cxpos;
      this.sypos = this.cypos;
      this.expos = p5.width / 2 + 180 * p5.cos(p5.radians(angle)); // screenX(0, 180, 0);
      this.eypos = p5.height / 2 + 180 * p5.sin(p5.radians(angle)); // screenY(0, 180, 0);
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + 3000;

      p5.pop();

      this.shue = this.chue;
      this.ehue = (255 / peers.length - 1) * i;
      this.ccolor = p5.color(this.chue, 255, 255, 133);
    }

    setupBits() {
      for (let i = 0; i < testTorrent.bits.length; i++) {
        if (!this.myBits.includes(testTorrent.bits[i])) {
          this.needBits.push(testTorrent.bits[i]);
        }
      }
    }

    moveSelf() {
      if (p5.millis() > this.emovetime) {
        this.cxpos = this.expos;
        this.cypos = this.eypos;
        this.chue = this.ehue;
      } else {
        let diff = (p5.millis() - this.smovetime) / (this.emovetime - this.smovetime);

        this.cxpos = this.sxpos * (1 - diff) + this.expos * diff;
        this.cypos = this.sypos * (1 - diff) + this.eypos * diff;
        this.chue = this.shue * (1 - diff) + this.ehue * diff;
      }
    }

    drawSelf() {
      p5.fill(this.ccolor);
      p5.stroke(this.myBits.length);
      // strokeWeight(1);
      p5.noStroke();
      p5.ellipseMode(p5.CENTER);
      p5.ellipse(this.cxpos, this.cypos, 50, 50);
      p5.fill(0);

      let w = testTorrent.bits.length - 1;

      p5.rect(this.cxpos - w / 2, this.cypos - 5, w, 10);

      for (let i = 0; i < this.myBits.length; i++) {
        let k = this.myBits[i];

        p5.colorMode(p5.HSB);
        p5.stroke(k.bitHue, 255, 255);
        p5.line(this.cxpos - w / 2 + 1 * k.id, this.cypos - 5, this.cxpos - w / 2 + 1 * k.id, this.cypos + 5);
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
