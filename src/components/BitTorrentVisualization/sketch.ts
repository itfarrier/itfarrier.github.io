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
    lastDraw: number;
    speed: number;
    stream = true;
    theBit: Bit;
    to: Peer;

    constructor(from: Connection['from'], to: Connection['to'], bit: Connection['theBit']) {
      this.from = from;
      this.lastDraw = p5.millis();
      this.speed = p5.floor(p5.random(30, 500));
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
          p5.strokeWeight(kibble.big);
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

  const HUE_SLOTS = 20;
  const INITIAL_PEERS = 8;
  const INITIAL_SEEDS = 2;

  const connections: Connection[] = [];
  const peers: Peer[] = [];
  const testTorrent = new Torrent(30);

  let isRotatePeers = -1;
  let nextHueSlot = 0;

  function modelToScreen(cx: number, cy: number, angleDeg: number, radius: number): [number, number] {
    const r = p5.radians(angleDeg);

    return [cx + radius * p5.cos(r), cy + radius * p5.sin(r)];
  }

  class Peer {
    actBits: Bit[] = [];
    barBuffer: null | p5.Graphics = null;
    ccolor: p5.Color;
    chue = 5;
    cxpos = 0;
    cypos = 0;
    ehue = 0;
    emovetime: number;
    expos: number;
    eypos: number;
    hueSlot = 0;
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
    sxpos = 0;
    sypos = 0;

    constructor() {
      const cx = p5.width / 2;
      const cy = p5.height / 2;

      this.sxpos = cx;
      this.sypos = cy;

      p5.push();
      p5.translate(cx, cy);
      p5.ellipseMode(p5.CENTER);

      const angle = 3;

      p5.rotate(p5.radians(angle));

      [this.expos, this.eypos] = modelToScreen(cx, cy, angle, 230);
      this.emovetime = this.smovetime + 1250;
      this.hueSlot = nextHueSlot++ % HUE_SLOTS;

      p5.colorMode(p5.HSB);

      this.ccolor = p5.color(this.chue, 255, 255, 133);

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
      if (!Number.isFinite(this.cxpos) || !Number.isFinite(this.cypos)) {
        return;
      }

      const w = testTorrent.bits.length - 1;
      const r = 25;
      const barH = 10;
      const cxR = Math.round(this.cxpos);
      const cyR = Math.round(this.cypos);
      const left = cxR - Math.floor(w / 2);
      const top = cyR - 5;

      if (!this.barBuffer || this.barBuffer.width !== w) {
        this.barBuffer = p5.createGraphics(w, barH);
        this.barBuffer.pixelDensity(1);
      }

      const buf = this.barBuffer;

      buf.clear();
      buf.colorMode(p5.HSB);

      this.myBits.forEach((myBit) => {
        buf.stroke(myBit.bitHue, 255, 255);
        buf.line(myBit.id, 0, myBit.id, barH);
      });

      buf.noStroke();

      p5.colorMode(p5.HSB);
      p5.fill(this.ccolor);
      p5.noStroke();
      p5.ellipseMode(p5.CENTER);
      p5.circle(cxR, cyR, 50);

      const ctx = p5.drawingContext as CanvasRenderingContext2D;

      ctx.save();

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255,255,255,1)';

      ctx.fillRect(left, top, w, barH);
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cxR, cyR, r, 0, Math.PI * 2);
      ctx.clip();
      p5.image(buf, left, top);
      ctx.restore();
    }

    findPeer() {
      const shuffled = p5.shuffle([...this.needBits]);

      shuffled.forEach((needBit) => {
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
        this.chue = this.ehue;
        this.cxpos = this.expos;
        this.cypos = this.eypos;
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

      const cx = p5.width / 2;
      const cy = p5.height / 2;
      this.sxpos = this.cxpos;
      this.sypos = this.cypos;
      [this.expos, this.eypos] = modelToScreen(cx, cy, angle, 180);
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + 3000;

      p5.pop();

      this.shue = this.chue;
      this.ehue = (255 * this.hueSlot) / HUE_SLOTS;
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
    p5.random(peers).removing = 1;
  }

  p5.keyPressed = () => {
    if (p5.key === '+' || p5.key === '=') {
      addPeer();
    }

    if (p5.key === 's') {
      addSeed();
    }

    if (p5.key === '-') {
      removeRandomPeer();
    }
  };

  p5.setup = () => {
    const size = p5.windowWidth > p5.windowHeight ? p5.windowHeight : p5.windowWidth;

    p5.createCanvas(size, size);
    p5.textAlign(p5.CENTER);

    for (let i = 0; i < INITIAL_SEEDS; i++) {
      addSeed();
    }

    for (let i = 0; i < INITIAL_PEERS; i++) {
      addPeer();
    }
  };

  p5.draw = () => {
    p5.clear();

    if (isRotatePeers >= 0) {
      if (isRotatePeers < 360) {
        isRotatePeers += 0.2;
      } else {
        isRotatePeers = isRotatePeers - 360;
      }
    }

    for (let i = connections.length - 1; i >= 0; i--) {
      const connection = connections[i];

      if (!connection) {
        continue;
      }

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

        connections.splice(i, 1);
      }
    }

    for (let i = peers.length - 1; i >= 0; i--) {
      const peer = peers[i];

      if (!peer) {
        continue;
      }

      peer.moveSelf();
      peer.drawSelf();
      peer.reConfigure(i);

      if (peer.removing > 1) {
        peers.splice(i, 1);
      }
    }

    p5.shuffle(peers).forEach((peer: Peer) => {
      if (peer.lastcheck < p5.millis() - peer.pwait) {
        peer.findPeer();
        peer.lastcheck = p5.millis();
      }
    });
  };
};
