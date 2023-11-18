import type p5 from 'p5';

export const sketch = (p5: p5) => {
  class Bit {
    bitHue: number;
    id: number;

    constructor(id: number, bitHue: number) {
      this.bitHue = bitHue;
      this.id = id;
    }
  }

  class Connection {
    deadKibbles = 0;
    from: Peer;
    kibbles: Kibble[] = [];
    lastDraw = p5.millis();
    speed = p5.random(0, 100);
    stream = true;
    theBit: Bit;
    to: Peer;

    constructor(from: Connection['from'], to: Connection['to'], bit: Connection['theBit']) {
      this.from = from;
      this.theBit = bit;
      this.to = to;
    }

    createKibble() {
      const kibble = new Kibble();

      this.kibbles.push(kibble);
      this.lastDraw = p5.millis();
    }

    drawKibbles() {
      this.kibbles.forEach((kibble, index) => {
        if (p5.millis() > kibble.endTime) {
          this.kibbles.splice(index, 1);
          this.deadKibbles++;
        } else {
          const diff = (p5.millis() - kibble.startTime) / (kibble.endTime - kibble.startTime);
          const xpos = this.from.cxpos * (1 - diff) + this.to.cxpos * diff;
          const ypos = this.from.cypos * (1 - diff) + this.to.cypos * diff;

          p5.colorMode(p5.HSB);
          p5.fill(this.theBit.bitHue, 255, 255);
          p5.stroke(this.theBit.bitHue, 255, 255);
          p5.circle(xpos, ypos, kibble.big);
        }
      });
    }

    getIdxFrom() {
      return this.from.index;
    }

    getIdxTo() {
      return this.to.index;
    }

    manageKibbles() {
      if (this.from.removing >= 1 || this.to.removing >= 1 || this.deadKibbles > 125) {
        this.stream = false;
      } else {
        if (this.lastDraw < p5.millis() - this.speed) {
          this.createKibble();
        }
      }
    }
  }

  class Kibble {
    big = p5.random(0, 4);
    endTime: number;
    startTime: number;

    constructor() {
      const startTime = p5.millis();

      this.endTime = startTime + 5000;
      this.startTime = startTime;
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

  const peers: Peer[] = [];
  const connections: Connection[] = [];
  let isRotatePeers = -1;
  const testTorrent = new Torrent(30);
  const initialSeeders = 1;
  const initialPeers = 5;

  class Peer {
    actBits: Bit[];
    ccolor: p5.Color;
    chue: number;
    cxpos: number; // x of where peer should be
    cypos: number; // y of where peer should be
    ehue: number;
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
    sxpos: number; // x of peer
    sypos: number; // y of peer

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
      this.sxpos = 0;
      this.sypos = 0;
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + 1250;
      this.percent = pct;

      p5.colorMode(p5.HSB);

      this.lastcheck = p5.millis();
      this.chue = 5;
      this.ccolor = p5.color(this.chue, p5.random(0, 255), p5.random(0, 255));

      p5.pop();

      this.setupBits();
    }

    bitRequest(k: Peer, j) {
      if (k.knex.length < 4) {
        const mz = new Connection(k, peers[this.index], j);

        k.knex.push(peers[this.index]);

        this.actBits.push(j);

        connections.push(mz);
      }
    }

    drawSelf() {
      p5.fill(this.ccolor);
      p5.stroke(this.myBits.length);
      p5.noStroke();
      p5.ellipseMode(p5.CENTER);
      p5.circle(this.cxpos, this.cypos, 50);
      p5.fill(0);

      const w = testTorrent.bits.length - 1;

      p5.rect(this.cxpos - w / 2, this.cypos - 5, w, 10);

      for (let i = 0; i < this.myBits.length; i++) {
        const k = this.myBits[i];

        p5.colorMode(p5.HSB);
        p5.fill(k.bitHue, 255, 255);
        p5.stroke(k.bitHue, 255, 255);
        p5.line(this.cxpos - w / 2 + 1 * k.id, this.cypos - 5, this.cxpos - w / 2 + 1 * k.id, this.cypos + 5);
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

    moveSelf() {
      if (p5.millis() > this.emovetime) {
        this.cxpos = this.expos;
        this.cypos = this.eypos;
        this.chue = this.ehue;
      } else {
        const diff = (p5.millis() - this.smovetime) / (this.emovetime - this.smovetime);

        this.cxpos = this.sxpos * (1 - diff) + this.expos * diff;
        this.cypos = this.sypos * (1 - diff) + this.eypos * diff;
        this.chue = this.shue * (1 - diff) + this.ehue * diff;
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

      const angle = (360 / k) * i + isRotatePeers;

      p5.rotate(p5.radians(angle));

      this.sxpos = this.cxpos;
      this.sypos = this.cypos;
      this.expos = (p5.width / 4) * p5.cos(p5.radians(angle)); // screenX(0, 180, 0);
      this.eypos = (p5.height / 4) * p5.sin(p5.radians(angle)); // screenY(0, 180, 0);
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
  }

  function addPeer() {
    peers.push(new Peer(p5.random(0, 1)));
  }

  function addSeeder() {
    const p = new Peer(p5.random(0, 1));

    peers.push(p);

    for (let i = 0; i < testTorrent.bits.length; i++) {
      p.myBits.push(testTorrent.bits[i]);
    }

    p.needBits = [];
  }

  function removePeer() {
    const i = p5.int(p5.random(0, peers.length - 1));
    const toRemove = peers[i];

    if (toRemove) {
      toRemove.removing = 1;
    }
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      addPeer();
    }

    if (p5.key === 's') {
      addSeeder();
    }

    if (p5.key === 'r' || p5.keyCode === p5.DELETE || p5.keyCode === p5.BACKSPACE) {
      removePeer();
    }
  };

  p5.setup = () => {
    const size = p5.windowWidth > p5.windowHeight ? p5.windowHeight : p5.windowWidth;

    p5.createCanvas(size, size, p5.WEBGL);
    p5.textAlign(p5.CENTER);

    // establish initial seeds/peers
    for (let i = 0; i < initialSeeders; i++) {
      addSeeder();
    }

    for (let i = 0; i < initialPeers; i++) {
      addPeer();
    }
  };

  p5.draw = () => {
    p5.background(0, 0);

    if (isRotatePeers >= 0) {
      if (isRotatePeers < 360) {
        isRotatePeers += 0.2;
      } else {
        isRotatePeers = isRotatePeers - 360;
      }
    }

    connections.forEach((connection, index) => {
      connection.manageKibbles();
      connection.drawKibbles();

      if (!connection.kibbles.length && !connection.stream) {
        if (connection.to.removing >= 1) {
          connection.to.removing++;
        }

        if (connection.from.removing >= 1) {
          connection.from.removing++;
        }

        connection.from.knex.splice(connection.from.knex.indexOf(connection.to), 1);
        connection.to.myBits.push(connection.theBit);

        if (connection.to.needBits.includes(connection.theBit)) {
          connection.to.needBits.splice(connection.to.needBits.indexOf(connection.theBit), 1);
        }

        if (connection.to.knex.includes(connection.theBit)) {
          connection.to.knex.splice(connection.to.knex.indexOf(connection.theBit), 1);
        }

        connections.splice(index, 1);
      }
    });

    peers.forEach((peer, index) => {
      peer.moveSelf();
      peer.drawSelf();
      peer.reConfigure(index);

      if (peer.removing > 1) {
        peers.splice(index, 1);
      }
    });

    p5.shuffle(peers).forEach((peer: Peer) => {
      if (peer.lastcheck < p5.millis() - peer.pwait) {
        peer.findPeer();
        peer.lastcheck = p5.millis();
      }
    });
  };
};
