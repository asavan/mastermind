"use strict";
(self["webpackChunkmastermind"] = self["webpackChunkmastermind"] || []).push([[420],{

/***/ 420:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  hp: () => (/* binding */ QRCodeSVG)
});

// UNUSED EXPORTS: AbstractQRCodeWithImage, QRCodeCanvas, QRCodeRaw, QRCodeText

;// ./node_modules/@akamfoad/qr/dist/qr.mjs
// src/lib/mode.ts
var mode_default = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};

// src/lib/8BitByte.ts
var QR8bitByte = class {
  mode;
  data;
  constructor(data) {
    this.mode = mode_default.MODE_8BIT_BYTE;
    this.data = data;
  }
  getLength() {
    return this.data.length;
  }
  //   FIXME?
  write(buffer) {
    for (let i = 0; i < this.data.length; i++) {
      buffer.put(this.data.charCodeAt(i), 8);
    }
  }
};

// src/lib/ErrorCorrectLevel.ts
var ErrorCorrectLevel = {
  /**
   * Allows recovery of up to 7% data loss
   */
  L: 1,
  /**
   * Allows recovery of up to 15% data loss
   */
  M: 0,
  /**
   * Allows recovery of up to 25% data loss
   */
  Q: 3,
  /**
   * Allows recovery of up to 30% data loss
   */
  H: 2
};

// src/lib/RSBlock.ts
var QRRSBlock = class _QRRSBlock {
  totalCount;
  dataCount;
  constructor(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  static RS_BLOCK_TABLE = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
  ];
  static getRSBlocks(typeNumber, errorCorrectLevel) {
    const rsBlock = _QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == void 0) {
      throw new Error(
        "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel
      );
    }
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3 + 0];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j++) {
        list.push(new _QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  }
  static getRsBlockTable(typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case ErrorCorrectLevel.L:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case ErrorCorrectLevel.M:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case ErrorCorrectLevel.Q:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case ErrorCorrectLevel.H:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return void 0;
    }
  }
};

// src/lib/BitBuffer.ts
var QRBitBuffer = class {
  buffer;
  length;
  constructor() {
    this.buffer = [];
    this.length = 0;
  }
  get(index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  }
  put(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  }
  getLengthInBits() {
    return this.length;
  }
  putBit(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};

// src/lib/math.ts
var QRMath = {
  glog: function(n) {
    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  },
  gexp: function(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (let i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (let i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (let i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}
var math_default = QRMath;

// src/lib/Polynomial.ts
var QRPolynomial = class _QRPolynomial {
  num;
  constructor(num, shift) {
    if (num.length == void 0) {
      throw new Error(num.length + "/" + shift);
    }
    let offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  get(index) {
    return this.num[index];
  }
  getLength() {
    return this.num.length;
  }
  multiply(e) {
    const num = new Array(this.getLength() + e.getLength() - 1);
    for (let i = 0; i < this.getLength(); i++) {
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= math_default.gexp(math_default.glog(this.get(i)) + math_default.glog(e.get(j)));
      }
    }
    return new _QRPolynomial(num, 0);
  }
  mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }
    const ratio = math_default.glog(this.get(0)) - math_default.glog(e.get(0));
    const num = new Array(this.getLength());
    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }
    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= math_default.gexp(math_default.glog(e.get(i)) + ratio);
    }
    return new _QRPolynomial(num, 0).mod(e);
  }
};

// src/lib/util.ts
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function(data) {
    let d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function(data) {
    let d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d;
  },
  getBCHDigit: function(data) {
    let digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function(maskPattern, i, j) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i * j % 2 + i * j % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function(errorCorrectLength) {
    let a = new QRPolynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, math_default.gexp(i)], 0));
    }
    return a;
  },
  getLengthInBits: function(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case mode_default.MODE_NUMBER:
          return 10;
        case mode_default.MODE_ALPHA_NUM:
          return 9;
        case mode_default.MODE_8BIT_BYTE:
          return 8;
        case mode_default.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case mode_default.MODE_NUMBER:
          return 12;
        case mode_default.MODE_ALPHA_NUM:
          return 11;
        case mode_default.MODE_8BIT_BYTE:
          return 16;
        case mode_default.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case mode_default.MODE_NUMBER:
          return 14;
        case mode_default.MODE_ALPHA_NUM:
          return 13;
        case mode_default.MODE_8BIT_BYTE:
          return 16;
        case mode_default.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function(qrCode) {
    const moduleCount = qrCode.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0;
        const dark = qrCode.isDark(row, col);
        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (let c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }
            if (r == 0 && c == 0) {
              continue;
            }
            if (dark == qrCode.isDark(row + r, col + c)) {
              sameCount++;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (let row = 0; row < moduleCount - 1; row++) {
      for (let col = 0; col < moduleCount - 1; col++) {
        let count = 0;
        if (qrCode.isDark(row, col))
          count++;
        if (qrCode.isDark(row + 1, col))
          count++;
        if (qrCode.isDark(row, col + 1))
          count++;
        if (qrCode.isDark(row + 1, col + 1))
          count++;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }
    const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var util_default = QRUtil;

// src/lib/QRCode.ts
var QRCode = class _QRCode {
  typeNumber;
  errorCorrectLevel;
  modules;
  moduleCount;
  dataCache;
  dataList;
  constructor(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }
  // TODO  data may be anything, but we start with string
  addData(data) {
    const newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  }
  isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    return this.modules[row][col];
  }
  getModuleCount() {
    return this.moduleCount;
  }
  make() {
    if (this.typeNumber < 1) {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber < 40; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(
          typeNumber,
          this.errorCorrectLevel
        );
        const buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }
        for (let i = 0; i < this.dataList.length; i++) {
          const data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(
            data.getLength(),
            util_default.getLengthInBits(data.mode, typeNumber)
          );
          data.write(buffer);
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
      }
      this.typeNumber = typeNumber;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  }
  makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
      for (let col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }
    if (this.dataCache == null) {
      this.dataCache = _QRCode.createData(
        this.typeNumber,
        this.errorCorrectLevel,
        this.dataList
      );
    }
    this.mapData(this.dataCache, maskPattern);
  }
  setupPositionProbePattern(row, col) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r)
        continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c)
          continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          if (this.modules === null) {
            throw new Error("this.modules is null");
          }
          this.modules[row + r][col + c] = true;
        } else {
          if (this.modules === null) {
            throw new Error("this.modules is null");
          }
          this.modules[row + r][col + c] = false;
        }
      }
    }
  }
  getBestMaskPattern() {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      const lostPoint = util_default.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  }
  setupTimingPattern() {
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
    }
    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] != null) {
        continue;
      }
      this.modules[6][c] = c % 2 == 0;
    }
  }
  setupPositionAdjustPattern() {
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    const pos = util_default.getPatternPosition(this.typeNumber);
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i];
        const col = pos[j];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  }
  setupTypeNumber(test) {
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    const bits = util_default.getBCHTypeNumber(this.typeNumber);
    for (let i = 0; i < 18; i++) {
      const mod = !test && (bits >> i & 1) == 1;
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (let i = 0; i < 18; i++) {
      const mod = !test && (bits >> i & 1) == 1;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  }
  setupTypeInfo(test, maskPattern) {
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    const data = this.errorCorrectLevel << 3 | maskPattern;
    const bits = util_default.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i++) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }
    for (let i = 0; i < 15; i++) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    this.modules[this.moduleCount - 8][8] = !test;
  }
  mapData(data, maskPattern) {
    if (this.modules === null) {
      throw new Error("this.modules is null");
    }
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6)
        col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          if (this.modules[row][col - c] == null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            const mask = util_default.getMask(maskPattern, row, col - c);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
  static PAD0 = 236;
  static PAD1 = 17;
  static createData(typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    const buffer = new QRBitBuffer();
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), util_default.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error(
        "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")"
      );
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(_QRCode.PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(_QRCode.PAD1, 8);
    }
    return _QRCode.createBytes(buffer, rsBlocks);
  }
  static createBytes(buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 255 & buffer.buffer[i + offset];
      }
      offset += dcCount;
      const rsPoly = util_default.getErrorCorrectPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;
  }
};

// src/index.ts
var qrcode = (data, opt) => {
  opt = opt || {};
  const qr = new QRCode(
    opt.typeNumber || -1,
    opt.errorCorrectLevel || ErrorCorrectLevel.H
  );
  qr.addData(data);
  qr.make();
  return qr;
};


;// ./node_modules/@akamfoad/qrcode/dist/qrcode.mjs
// src/utils/invariant.ts
function invariant(condition, message) {
  if (condition)
    return;
  throw new Error(message);
}

// src/utils/ColorUtils.ts
var ColorUtils = class {
  static convertHexColorToBytes(hexColor) {
    invariant(
      typeof hexColor === "string",
      `Expected hexColor param to be a string instead got ${typeof hexColor}`
    );
    let hex = hexColor.replace("#", "");
    const isHexColor = /^([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(hex);
    invariant(
      isHexColor,
      `Expected hexColor to be of length 3, 4, 6 or 8 with 0-9 A-F characters, instead got ${hex} with length ${hex.length}`
    );
    const bytes = [];
    if (hex.length === 3) {
      hex += "F";
    } else if (hex.length === 6) {
      hex += "FF";
    }
    if (hex.length === 4) {
      bytes.push(...hex.split("").map((h) => parseInt(h.repeat(2), 16)));
    } else if (hex.length === 8) {
      bytes.push(parseInt(hex.substring(0, 2), 16));
      bytes.push(parseInt(hex.substring(2, 4), 16));
      bytes.push(parseInt(hex.substring(4, 6), 16));
      bytes.push(parseInt(hex.substring(6, 8), 16));
    }
    return bytes;
  }
};

// src/QRCodeRaw.ts

var ERROR_CORRECTION_LEVEL_LOW = "L";
var DEFAULT_CONSTRUCTOR_PARAMS = {
  level: ERROR_CORRECTION_LEVEL_LOW,
  padding: 1,
  invert: false,
  typeNumber: 0,
  errorsEnabled: false
};
var QRCodeRaw = class {
  value;
  level;
  typeNumber;
  padding;
  errorsEnabled;
  invert;
  qrCodeData;
  constructor(value, options = {}) {
    const params = { ...DEFAULT_CONSTRUCTOR_PARAMS, ...options };
    this.value = value;
    this.level = params.level;
    this.typeNumber = params.typeNumber;
    this.padding = params.padding;
    this.invert = params.invert;
    this.errorsEnabled = params.errorsEnabled;
  }
  setValue(value) {
    this.value = value;
    this._clearCache();
  }
  getDataSize() {
    const data = this.getData();
    return data ? data.length : 0;
  }
  _clearCache() {
    this.qrCodeData = null;
  }
  _getQrCodeData(modules) {
    const qrCodeData = [];
    const padding = this.padding;
    const invert = this.invert;
    const rowPadding = Array(padding * 2 + modules.length).fill(
      invert
    );
    const rowsPadding = Array(padding).fill(rowPadding);
    const columnPadding = Array(padding).fill(invert);
    if (padding) {
      qrCodeData.push(...rowsPadding);
    }
    modules.forEach((row) => {
      const qrCodeRow = [];
      qrCodeRow.push(
        ...columnPadding,
        ...row.map((isBlack) => invert ? !isBlack : isBlack),
        ...columnPadding
      );
      qrCodeData.push(qrCodeRow);
    });
    if (padding) {
      qrCodeData.push(...rowsPadding);
    }
    return qrCodeData;
  }
  getData() {
    if (!this.qrCodeData) {
      try {
        const qrcode = new QRCode(
          this.typeNumber,
          ErrorCorrectLevel[this.level]
        );
        qrcode.addData(this.value);
        qrcode.make();
        if (!qrcode.modules) {
          return null;
        }
        this.qrCodeData = this._getQrCodeData(qrcode.modules);
        Object.freeze(this.qrCodeData);
      } catch (error) {
        if (this.errorsEnabled) {
          throw error;
        }
        return null;
      }
    }
    return this.qrCodeData;
  }
};

// src/utils/DimensionUtils.ts
var DimensionUtils = class {
  static calculateDimension(value, canvasSize) {
    const isNumber = typeof value === "number";
    const isString = typeof value === "string";
    invariant(
      isNumber || isString,
      `value must be either string or number, instead got ${typeof value}`
    );
    if (isNumber) {
      return value;
    }
    if (value.indexOf("%") > 0) {
      return Math.round(parseFloat(value) / 100 * canvasSize) || 0;
    }
    return parseFloat(value) || 0;
  }
  static calculatePosition(value, size, canvasSize) {
    const isNumber = typeof value === "number";
    const isString = typeof value === "string";
    invariant(
      isNumber || isString,
      `value must be either string or number, instead got ${typeof value}`
    );
    if (isNumber)
      return value;
    if (value === "left" || value === "top") {
      return 0;
    }
    if (value === "right" || value === "bottom") {
      return canvasSize - size;
    }
    if (value === "center") {
      return Math.round((canvasSize - size) / 2);
    }
    const match = value.match(
      /^(?:(right|bottom|left|top)\s+)?(-?[0-9.]+)(%)?$/
    );
    invariant(!!match, `Expected position with number, instead got ${value}`);
    const isRight = match[1] === "right" || match[1] === "bottom";
    const isPercent = !!match[3];
    let val = parseFloat(match[2]) || 0;
    if (isPercent) {
      val = Math.round(val / 100 * canvasSize);
    }
    if (isRight) {
      val = canvasSize - val - size;
    }
    return Math.round(val);
  }
};

// src/AbstractQRCodeWithImage.ts
var DEFAULT_OPTIONS = {
  image: null
};
var DEFAULT_IMAGE_BORDER = 1;
var AbstractQRCodeWithImage = class extends QRCodeRaw {
  image = null;
  imageConfig = null;
  constructor(value, options = {}) {
    super(value, options);
    const params = { ...DEFAULT_OPTIONS, ...options };
    this.image = params.image;
  }
  _clearCache() {
    super._clearCache();
    this.imageConfig = null;
  }
  _getImageSource(imageConfig) {
    const source = imageConfig.source;
    if (typeof source === "string") {
      return source;
    }
    if (source instanceof Image) {
      return source.src;
    }
    if (source instanceof HTMLCanvasElement) {
      return source.toDataURL();
    }
    return null;
  }
  _getImageConfig() {
    if (this.imageConfig) {
      return this.imageConfig;
    }
    if (!this.image || !this.image.source || !this.image.width || !this.image.height) {
      return null;
    }
    const dataSize = this.getDataSize();
    if (!dataSize) {
      return null;
    }
    const source = this._getImageSource(this.image);
    if (!source) {
      return null;
    }
    const dataSizeWithoutPadding = dataSize - this.padding * 2;
    const width = DimensionUtils.calculateDimension(
      this.image.width,
      dataSizeWithoutPadding
    );
    const height = DimensionUtils.calculateDimension(
      this.image.height,
      dataSizeWithoutPadding
    );
    const x = DimensionUtils.calculatePosition(
      // @ts-expect-error make types stronger
      this.image.x,
      width,
      dataSizeWithoutPadding
    ) + this.padding;
    const y = DimensionUtils.calculatePosition(
      // @ts-expect-error make types stronger
      this.image.y,
      height,
      dataSizeWithoutPadding
    ) + this.padding;
    let border = DEFAULT_IMAGE_BORDER;
    if (typeof this.image.border === "number" || this.image.border === null) {
      border = this.image.border;
    }
    this.imageConfig = { source, border, x, y, width, height };
    return this.imageConfig;
  }
  getData() {
    if (this.qrCodeData) {
      return this.qrCodeData;
    }
    const data = super.getData();
    if (!data) {
      return data;
    }
    const imageConfig = this._getImageConfig();
    if (imageConfig !== null && imageConfig.width && imageConfig.height) {
      if (typeof imageConfig.border === "number") {
        const begX = Math.max(imageConfig.x - imageConfig.border, 0);
        const begY = Math.max(imageConfig.y - imageConfig.border, 0);
        const endX = Math.min(
          // @ts-expect-error make types stronger
          begX + imageConfig.width + imageConfig.border * 2,
          data.length
        );
        const endY = Math.min(
          // @ts-expect-error make types stronger
          begY + imageConfig.height + imageConfig.border * 2,
          data.length
        );
        for (let y = begY; y < endY; y += 1) {
          for (let x = begX; x < endX; x += 1) {
            data[y][x] = this.invert ? true : false;
          }
        }
      }
    }
    return data;
  }
};

// src/loader/ImageLoader.ts
var loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(img);
    img.src = url;
  });
};

// src/QRCodeCanvas.ts
var DEFAULT_OPTIONS2 = {
  fgColor: "#000",
  bgColor: "#FFF",
  scale: 10,
  size: null
};
var QRCodeCanvas = class extends AbstractQRCodeWithImage {
  fgColor;
  bgColor;
  scale;
  size;
  canvas;
  canvasContext;
  constructor(value, options = {}) {
    super(value, options);
    const params = { ...DEFAULT_OPTIONS2, ...options };
    this.fgColor = params.fgColor;
    this.bgColor = params.bgColor;
    this.scale = params.scale;
    this.size = params.size;
    this.canvas = document.createElement("canvas");
    const canvasContext = this.canvas.getContext("2d");
    if (canvasContext === null) {
      throw new Error("canvas context is null");
    }
    this.canvasContext = canvasContext;
  }
  _clearCache() {
    super._clearCache();
    this.canvas.width = 0;
  }
  _getCanvasSize() {
    const dataSize = this.getDataSize();
    if (!dataSize) {
      return null;
    }
    if (this.size) {
      return this.size;
    }
    if (this.scale) {
      return this.scale * dataSize;
    }
    return dataSize;
  }
  draw(canvas = null) {
    const dataSize = this.getDataSize();
    if (!dataSize) {
      return null;
    }
    const data = this.getData();
    if (!data) {
      return null;
    }
    const fgColor = ColorUtils.convertHexColorToBytes(this.fgColor);
    const bgColor = ColorUtils.convertHexColorToBytes(this.bgColor);
    let index = 0;
    const bytes = new Uint8ClampedArray(dataSize ** 2 * 4);
    data.forEach((row) => {
      row.forEach((isBlack) => {
        if (isBlack) {
          bytes.set(fgColor, index);
        } else {
          bytes.set(bgColor, index);
        }
        index += 4;
      });
    });
    const imageData = new ImageData(bytes, dataSize, dataSize);
    this.canvas.width = dataSize;
    this.canvas.height = dataSize;
    this.canvasContext.putImageData(imageData, 0, 0);
    const canvasSize = this._getCanvasSize();
    const qrCodeCanvas = canvas || document.createElement("canvas");
    qrCodeCanvas.width = canvasSize;
    qrCodeCanvas.height = canvasSize;
    const qrCodeCanvasContext = qrCodeCanvas.getContext("2d");
    qrCodeCanvasContext.imageSmoothingEnabled = false;
    qrCodeCanvasContext.drawImage(this.canvas, 0, 0, canvasSize, canvasSize);
    const drawImageResult = this._drawImage(
      // @ts-expect-error make types stronger
      qrCodeCanvasContext,
      // @ts-expect-error make types stronger
      canvasSize / dataSize
    );
    if (drawImageResult instanceof Promise) {
      return drawImageResult.then(() => {
        return qrCodeCanvas;
      });
    }
    return qrCodeCanvas;
  }
  // @ts-expect-error make types stronger
  _getImageSource(imageConfig) {
    const source = imageConfig.source;
    if (typeof source === "string") {
      return loadImage(source).then((image) => {
        this.image.source = image;
        imageConfig.source = image;
        return image;
      });
    }
    if (source instanceof Image) {
      return source;
    }
    if (source instanceof HTMLCanvasElement) {
      return source;
    }
    return null;
  }
  _drawImage(qrCodeCanvasContext, pixelSize) {
    const imageConfig = this._getImageConfig();
    if (!imageConfig) {
      return null;
    }
    if (imageConfig.source instanceof Promise) {
      return imageConfig.source.then((image) => {
        qrCodeCanvasContext.drawImage(
          image,
          // @ts-expect-error make types stronger
          imageConfig.x * pixelSize,
          // @ts-expect-error make types stronger
          imageConfig.y * pixelSize,
          // @ts-expect-error make types stronger
          imageConfig.width * pixelSize,
          // @ts-expect-error make types stronger
          imageConfig.height * pixelSize
        );
      });
    }
    qrCodeCanvasContext.drawImage(
      imageConfig.source,
      // @ts-expect-error make types stronger
      imageConfig.x * pixelSize,
      // @ts-expect-error make types stronger
      imageConfig.y * pixelSize,
      // @ts-expect-error make types stronger
      imageConfig.width * pixelSize,
      // @ts-expect-error make types stronger
      imageConfig.height * pixelSize
    );
    return true;
  }
  getCanvas() {
    return this.draw();
  }
  toDataUrl(type = "image/png", encoderOptions = 0.92) {
    const canvasOrPromise = this.draw();
    if (!canvasOrPromise) {
      return null;
    }
    if (canvasOrPromise instanceof Promise) {
      return canvasOrPromise.then((qrCodeCanvas) => {
        return qrCodeCanvas.toDataURL(type, encoderOptions);
      });
    }
    return canvasOrPromise.toDataURL(type, encoderOptions);
  }
};

// src/QRCodeSVG.ts
var TYPE_INT_WHITE = 0;
var TYPE_INT_BLACK = 1;
var TYPE_INT_PROCESSED = 2;
var DEFAULT_OPTIONS3 = {
  fgColor: "#000",
  bgColor: "#FFF"
};
var QRCodeSVG = class extends AbstractQRCodeWithImage {
  fgColor;
  bgColor;
  qrCodeSVG = null;
  height;
  width;
  qrCodeDataUrl = null;
  constructor(value, options = {}) {
    super(value, options);
    const params = { ...DEFAULT_OPTIONS3, ...options };
    this.fgColor = params.fgColor;
    this.bgColor = params.bgColor;
    this.width = params.width;
    this.height = params.height;
  }
  _clearCache() {
    super._clearCache();
    this.qrCodeSVG = null;
    this.qrCodeDataUrl = null;
  }
  _getDataInt() {
    const data = this.getData();
    if (!data) {
      return null;
    }
    return data.map((row) => {
      return row.map((isBlack) => {
        return isBlack ? TYPE_INT_BLACK : TYPE_INT_WHITE;
      });
    });
  }
  _getRects() {
    const dataInt = this._getDataInt();
    if (!dataInt) {
      return null;
    }
    const rects = [];
    const count = dataInt.length - 1;
    for (let y = 0; y <= count; y += 1) {
      let begX = -1;
      for (let x = 0; x <= count; x += 1) {
        const intType = dataInt[y][x];
        const isLast = x === count;
        const isBlack = intType === TYPE_INT_BLACK;
        if (isBlack && begX === -1) {
          begX = x;
        }
        if (begX !== -1 && (isLast || !isBlack)) {
          const endX = x - (isBlack ? 0 : 1);
          const rect = this._processRect(dataInt, begX, endX, y);
          if (rect) {
            rects.push(rect);
          }
          begX = -1;
        }
      }
    }
    return rects;
  }
  _processRect(dataInt, begX, endX, begY) {
    const count = dataInt.length - 1;
    let isNewRect = false;
    let isStopped = false;
    let height = 0;
    for (let y = begY; y <= count; y += 1) {
      for (let x = begX; x <= endX; x += 1) {
        const intType = dataInt[y][x];
        if (intType === TYPE_INT_WHITE) {
          isStopped = true;
          break;
        }
      }
      if (isStopped) {
        break;
      }
      for (let x = begX; x <= endX; x += 1) {
        if (dataInt[y][x] === TYPE_INT_BLACK) {
          isNewRect = true;
          dataInt[y][x] = TYPE_INT_PROCESSED;
        }
      }
      height += 1;
    }
    if (!isNewRect) {
      return null;
    }
    return {
      x: begX,
      y: begY,
      width: endX - begX + 1,
      height
    };
  }
  _getRelativeRects() {
    const rects = this._getRects();
    if (!rects) {
      return null;
    }
    const relativeRects = [];
    const rectsMap = {};
    let seqRectId = 0;
    rects.forEach((rect) => {
      const key = `${rect.width}:${rect.height}`;
      if (rectsMap[key]) {
        rectsMap[key].count += 1;
        if (!rectsMap[key].id) {
          rectsMap[key].id = `i${seqRectId.toString(32)}`;
          seqRectId += 1;
        }
      } else {
        rectsMap[key] = { count: 1, rect, relative: false, id: null };
      }
    });
    rects.forEach((rect) => {
      const key = `${rect.width}:${rect.height}`;
      const rectsMapItem = rectsMap[key];
      if (rectsMapItem.relative) {
        relativeRects.push({
          id: rectsMapItem.id,
          x: rect.x - rectsMapItem.rect.x,
          y: rect.y - rectsMapItem.rect.y
        });
      } else {
        if (rectsMapItem.id) {
          rect.id = rectsMapItem.id;
          rectsMapItem.relative = true;
        }
        relativeRects.push(rect);
      }
    });
    return relativeRects;
  }
  _buildSVG(rects) {
    const size = this.getDataSize();
    const tags = [
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" shape-rendering="crispEdges" viewBox="0 0 ${size} ${size}"${this.width ? ` width=${this.width}` : ""}${this.height ? ` height=${this.height}` : ""} >`
    ];
    if (this.bgColor) {
      tags.push(
        `<rect x="0" y="0" height="${size}" width="${size}" fill="${this.bgColor}"/>`
      );
    }
    rects.forEach((rect) => {
      if (rect.width && rect.height) {
        const rectId = rect.id ? `id="${rect.id}" ` : "";
        tags.push(
          `<rect ${rectId}x="${rect.x}" y="${rect.y}" height="${rect.height}" width="${rect.width}" fill="${this.fgColor}"/>`
        );
      } else {
        tags.push(
          `<use xlink:href="#${rect.id}" x="${rect.x}" y="${rect.y}"/>`
        );
      }
    });
    const imageConfig = this._getImageConfig();
    if (imageConfig && imageConfig.width && imageConfig.height) {
      tags.push(
        `<image xlink:href="${imageConfig.source}" x="${imageConfig.x}" y="${imageConfig.y}" width="${imageConfig.width}" height="${imageConfig.height}"/>`
      );
    }
    tags.push("</svg>");
    return tags.join("");
  }
  toString() {
    if (!this.qrCodeSVG) {
      const dataSize = this.getDataSize();
      if (!dataSize) {
        return null;
      }
      const rects = this._getRects();
      if (!rects) {
        return null;
      }
      this.qrCodeSVG = this._buildSVG(rects);
    }
    return this.qrCodeSVG;
  }
  toDataUrl() {
    if (!this.qrCodeDataUrl) {
      const dataSize = this.getDataSize();
      if (!dataSize) {
        return null;
      }
      const relativeRects = this._getRelativeRects();
      if (!relativeRects) {
        return null;
      }
      const svg = this._buildSVG(relativeRects);
      this.qrCodeDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
    }
    return this.qrCodeDataUrl;
  }
};

// src/QRCodeText.ts
var DEFAULT_OPTIONS4 = {
  blackSymbol: "\u2593\u2593",
  whiteSymbol: "  "
};
var QRCodeText = class extends QRCodeRaw {
  blackSymbol;
  whiteSymbol;
  qrCodeText;
  constructor(value, options = {}) {
    super(value, options);
    const params = { ...DEFAULT_OPTIONS4, ...options };
    this.blackSymbol = params.blackSymbol;
    this.whiteSymbol = params.whiteSymbol;
  }
  _clearCache() {
    super._clearCache();
    this.qrCodeText = null;
  }
  toString() {
    if (this.qrCodeText) {
      return this.qrCodeText;
    }
    const dataSize = this.getDataSize();
    if (!dataSize) {
      return null;
    }
    const data = this.getData();
    if (data === null) {
      return null;
    }
    const symbols = [];
    for (let y = 0; y < dataSize; y += 1) {
      for (let x = 0; x < dataSize; x += 1) {
        const isBlack = data[y][x];
        symbols.push(isBlack ? this.blackSymbol : this.whiteSymbol);
      }
      symbols.push("\n");
    }
    this.qrCodeText = symbols.join("");
    return this.qrCodeText;
  }
};



/***/ })

}]);