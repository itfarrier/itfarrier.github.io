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

  const INITIAL_PEERS = 5;
  const INITIAL_SEEDS = 1;
  const connections: Connection[] = [];
  const peers: Peer[] = [];
  const testTorrent = new Torrent(30);
  let isRotatePeers = -1;

  class Peer {
    actBits: Bit[] = [];
    ccolor: p5.Color;
    chue = 0;
    cxpos = 0; // x of where peer should be
    cypos = 0; // y of where peer should be
    ehue = 0;
    emovetime: number;
    expos: number;
    eypos: number;
    index = 0;
    knex: (Bit | Peer)[] = [];
    lastcheck = p5.millis();
    myBits: Bit[] = [];
    needBits: Bit[] = [];
    percent = p5.random(0, 1);
    pwait = p5.random(1, 9) * 1000;
    removing = 0;
    shue = 0;
    smovetime = p5.millis();
    sxpos = 0; // x of peer
    sypos = 0; // y of peer

    constructor() {
      let szv = peers.length;

      if (szv === 0) {
        szv++;
      }

      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.ellipseMode(p5.CENTER);

      const angle = 3;

      p5.rotate(p5.radians(angle));

      this.expos = p5.width / 2 + 230 * p5.cos(p5.radians(angle));
      this.eypos = p5.height / 2 + 230 * p5.sin(p5.radians(angle));
      this.emovetime = this.smovetime + 1250;

      p5.colorMode(p5.HSB);

      this.ccolor = p5.color(this.chue, p5.random(0, 255), p5.random(0, 255));

      p5.pop();

      this.setupBits();
    }

    bitRequest(peer: Peer, needBit: Bit) {
      if (peer.knex.length < 4) {
        const mz = new Connection(peer, this, needBit);

        peer.knex.push(this);

        this.actBits.push(needBit);

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

      this.myBits.forEach((myBit) => {
        p5.colorMode(p5.HSB);
        p5.fill(myBit.bitHue, 255, 255);
        p5.stroke(myBit.bitHue, 255, 255);

        const someCoordinate = this.cxpos - w / 2 + myBit.id;

        p5.line(someCoordinate, this.cypos - 5, someCoordinate, this.cypos + 5);
      });
    }

    findPeer() {
      this.needBits.forEach((needBit) => {
        this.needBits = p5.shuffle(this.needBits) as Bit[];

        peers.forEach((peer) => {
          if (
            peer.myBits.includes(needBit) &&
            !(peer.removing > 0) &&
            !(this.removing > 0) &&
            !peer.knex.includes(this) &&
            peer.index !== this.index &&
            !this.actBits.includes(needBit)
          ) {
            this.bitRequest(peer, needBit);
          }
        });
      });
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
      testTorrent.bits.forEach((bit) => {
        if (!this.myBits.includes(bit)) {
          this.needBits.push(bit);
        }
      });
    }
  }

  function addPeer() {
    peers.push(new Peer());
  }

  function addSeed() {
    const peer = new Peer();

    peers.push(peer);

    testTorrent.bits.forEach((bit) => {
      peer.myBits.push(bit);
    });

    peer.needBits = [];
  }

  function removeRandomPeer() {
    (p5.random(peers) as Peer).removing = 1;
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      addPeer();
    }

    if (p5.key === 's') {
      addSeed();
    }

    if (p5.key === 'r' || p5.keyCode === p5.DELETE || p5.keyCode === p5.BACKSPACE) {
      removeRandomPeer();
    }
  };

  p5.setup = () => {
    const size = p5.windowWidth > p5.windowHeight ? p5.windowHeight : p5.windowWidth;

    p5.createCanvas(size, size, p5.WEBGL);
    p5.textAlign(p5.CENTER);

    for (let i = 0; i < INITIAL_SEEDS; i++) {
      addSeed();
    }

    for (let i = 0; i < INITIAL_PEERS; i++) {
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
