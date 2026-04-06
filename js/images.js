/* ================================================================
   DAREPACK — images.js — FINAL SAFE VERSION
   ================================================================ */
(function () {
  var I = {
    logo:            'images/logo.png',
    gts300e:         'images/gts300s.png',
    gts300s:         'images/gts300s.png',
    gts400e:         'images/gts400s.png',
    gts400s:         'images/gts400s.png',
    heroMachine:     'images/gts300s.png',
    augerFiller:     'images/auger-filler.png',
    cupFiller:       'images/cup-filler.png',
    servoBelt:       'images/servo-belt.png',
    netScale:        'images/servo-net-scale.png',
    standAlone:      'images/stand-alon-scale.png',
    linearWeigher:   'images/linear-weigher.png',
    screwConveyor:   'images/screw-conveyor.jpg',
    zTypeConveyor:   'images/feeding_ztype_conveyor.png',
    vibratoryFeeder: 'images/feeding_vibratory_feeder.png',
    beltConveyor: 'images/beltConveyer.png',
    turnRotaryTable: 'images/turn-rotary-table1.jpg',
    takeAway:        'images/take-away-conveyor2.jpg',
  };

  function set(sel, src) {
    document.querySelectorAll(sel).forEach(function(el){ el.src = src; });
  }

  set('.js-logo',              I.logo);
  set('.js-foot-logo',         I.logo);
  set('.slide-machine img',    I.heroMachine);
  set('.js-gts300e',           I.gts300e);
  set('.js-gts300s',           I.gts300s);
  set('.js-gts400e',           I.gts400e);
  set('.js-gts400s',           I.gts400s);
  set('.js-fillers',           I.augerFiller);
  set('.js-feeding',           I.screwConveyor);
  set('.js-feeding-belt',      I.beltConveyor);
  set('.js-feeding-screw',     I.screwConveyor);
  set('.js-feeding-vibratory', I.vibratoryFeeder);
  set('.js-feeding-ztype',     I.zTypeConveyor);
  set('.js-handling',          I.turnRotaryTable);
  set('.js-handling-new',      I.takeAway);
})();