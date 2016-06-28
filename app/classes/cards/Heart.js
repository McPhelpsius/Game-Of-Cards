let Card = require("../Card");

class Heart extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Hearts';
        this.suitSVG = `<svg width="25" height="30" >
          <circle cx="14" cy="7" r="5" style="fill:red" />
          <circle cx="6" cy="7" r="5" style="fill:red" />
          <polygon points="10,4 18,10 10,18 2,10" style="fill:red" />
        </svg>`;
        this.smallSVG = `<svg width="12" height="12">
          <circle cx="8" cy="4" r="3" style="fill:red" />
          <circle cx="3" cy="4" r="3" style="fill:red" />
          <polygon points="6,4 11,5 6,11 0,5" style="fill:red" />
        </svg>`;
    }    
}

module.exports = Heart;