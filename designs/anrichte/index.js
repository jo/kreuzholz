export class Anrichte {
  render ({ q1, q2, dx, dy, dz }) {
    const breite = 124;
    const decke_alpha = Math.PI*180/26;
    const arbeitsplatte_hoehe = 80;
    const arbeitsplatte_tiefe = 55;
    const boden_hoehe = 10;
    const boden_2_hoehe = 40;
    const seitenwand_rechts_abstand = 18;
    const regal_tiefe = 26;
    const regal_hoehe = 300;
    const gewuerzregal_tiefe = 7;
    const gewuerzregal_1_hoehe = arbeitsplatte_hoehe + 39;
    const gewuerzregal_2_hoehe = arbeitsplatte_hoehe + 49;
    const schrank_hoehe = arbeitsplatte_hoehe + 62;
    const schrankboden_1_hoehe = schrank_hoehe + 18;
    const schrankboden_1a_hoehe = schrank_hoehe + 34;
    const schrankboden_2_hoehe = schrank_hoehe + 53;
    const schrankboden_3_hoehe = regal_hoehe - 86;
      

    const seitenwand_rechts_hoehe = 300 - breite * Math.tan(decke_alpha);

    const b = Math.round(breite / q2);
    const arbeitsplatte_h = Math.round(arbeitsplatte_hoehe / q2);
    const arbeitsplatte_t = Math.round(arbeitsplatte_tiefe / q1);
    const boden_h = Math.round(boden_hoehe / q2);
    const boden_2_h = Math.round(boden_2_hoehe / q2);
    const regal_t = Math.round(regal_tiefe / q1);
    const regal_h = Math.round(regal_hoehe / q2);
    const gewuerzregal_t = Math.round(gewuerzregal_tiefe / q1);
    const gewuerzregal_1_h = Math.round(gewuerzregal_1_hoehe / q2);
    const gewuerzregal_2_h = Math.round(gewuerzregal_2_hoehe / q2);
    const schrank_h = Math.round(schrank_hoehe / q2);
    const schrankboden_1_h = Math.round(schrankboden_1_hoehe / q2);
    const schrankboden_1a_h = Math.round(schrankboden_1a_hoehe / q2);
    const schrankboden_2_h = Math.round(schrankboden_2_hoehe / q2);
    const schrankboden_3_h = Math.round(schrankboden_3_hoehe / q2);
    const seitenwand_rechts_h = Math.round(seitenwand_rechts_hoehe / q2);

    // steigung sinus
    const sm = 10;
    // anfang sinus
    const sa = 6;
    // Deckensteigung x
    const dh_m = 0.45;

    const laths = []
    const l = (name, a, b) => {
      laths.push({
        name,
        a,
        b
      })
    }
  
    for (let i = 0; i <= arbeitsplatte_t; i++) {
      const al = i > sa ? Math.PI + Math.PI/2 * (i - sa) / arbeitsplatte_t : Math.PI;
      const dl = sm + Math.cos(al) * sm;
      const dhd = dh_m * i;

      if (i % 2 === 0) {
        if (i === 0) {
          l("Montage Links", [i, dl + 1, schrank_h], [i, dl + 1, schrankboden_3_h]);
          l("Montage Rechts", [i, b - dl - 1, schrank_h], [i, b - dl - 1, schrankboden_3_h]);
          l("Rückblende", [i, dl + 1, arbeitsplatte_h + 4], [i, b - dl - 1, arbeitsplatte_h + 4]);
        }
        if (i > 0) l("Arbeitsplatte Füll", [i, dl + 1, arbeitsplatte_h], [i, b - dl - 1, arbeitsplatte_h]);
        if (i < gewuerzregal_t) {
          l("Gewürzregal 1 Füll", [i, dl + 1, gewuerzregal_1_h], [i, b - dl - 1, gewuerzregal_1_h]);
          l("Gewürzregal 2 Füll", [i, dl + 1, gewuerzregal_2_h], [i, b - dl - 1, gewuerzregal_2_h]);
        }
        if (i > 0 &&i > 0 && i < regal_t - 1) {
          l("Mittelwand", [i, b/2, schrank_h], [i, b/2, schrankboden_3_h]);
        }
        if (i < regal_t) {
          if (i === 0) {
            l("Schrankboden 0 Füllung", [i, dl + 2, schrank_h], [i, b - dl - 2, schrank_h]);
            l("Schrankboden 3 Füllung", [i, dl + 2, schrankboden_3_h], [i, b - dl - 2, schrankboden_3_h]);
          } else {
            if (i < regal_t - 2) {
              l("Schrankboden 0 Füllung", [i, dl + 1, schrank_h], [i, b/2 - 1, schrank_h]);
              l("Schrankboden 0 Füllung", [i, b/2 + 1, schrank_h], [i, b - dl - 1, schrank_h]);
              l("Schrankboden 3 Füllung", [i, dl + 1, schrankboden_3_h], [i, b/2 - 1, schrankboden_3_h]);
              l("Schrankboden 3 Füllung", [i, b/2 + 1, schrankboden_3_h], [i, b - dl - 1, schrankboden_3_h]);
            } else {
              l("Schrankboden 0 Füllung", [i, dl + 1, schrank_h], [i, b - dl - 1, schrank_h]);
              l("Schrankboden 3 Füllung", [i, dl + 1, schrankboden_3_h], [i, b - dl - 1, schrankboden_3_h]);
            }
          }
          l("Seitenwand Links", [i, dl, 0], [i, dl, regal_h - dhd]);
          l("Seitenwand Rechts", [i, b - dl, 0], [i, b - dl, seitenwand_rechts_h - dhd]);
        } else {
          l("Seitenwand Links", [i, dl, 0], [i, dl, arbeitsplatte_h]);
          l("Seitenwand Rechts", [i, b - dl, 0], [i, b - dl, arbeitsplatte_h]);
        }
      } else {
        if (i === 1) {
          for (let k = 1; k <= 4; k++) {
            l("Rückblende", [i, dl, arbeitsplatte_h + k], [i, b - dl, arbeitsplatte_h + k]);
          }
        }
        if (i < gewuerzregal_t) {
          l("Gewürzregal 1", [i, dl, gewuerzregal_1_h], [i, b - dl, gewuerzregal_1_h]);
          l("Gewürzregal 2", [i, dl, gewuerzregal_2_h], [i, b - dl, gewuerzregal_2_h]);
        }
        if (i < regal_t) {
          l("Schrankboden 0", [i, dl, schrank_h], [i, b - dl, schrank_h]);
          if (i > 1) l("Schrankboden 1", [i, dl, schrankboden_1_h], [i, b/2, schrankboden_1_h]);
          l("Schrankboden 1a", [i, dl, schrankboden_1a_h], [i, b - dl, schrankboden_1a_h]);
          if (i > 1) l("Schrankboden 2", [i, b/2, schrankboden_2_h], [i, b - dl, schrankboden_2_h]);
          l("Schrankboden 3", [i, dl, schrankboden_3_h], [i, b - dl, schrankboden_3_h]);
          l("Decke", [i, dl, regal_h - dhd], [i, b - dl, seitenwand_rechts_h - dhd]);
        }
        l("Arbeitsplatte", [i, dl, arbeitsplatte_h], [i, b - dl, arbeitsplatte_h]);
        l("Boden 1", [i, dl, boden_h], [i, b - dl, boden_h]);
        l("Boden 2", [i, dl, boden_2_h], [i, b - dl, boden_2_h]);
      }
    }

    return laths
  }
}
