(function () {
  /* Stage 3 Blend v4.0 (3.5Y 60% + 1Y 40%) 7-Variable Peer Distribution Simulator
   * Loads 225 verified real KRX direct IPOs from /data/ipo_v4_pool.json
   * Safe Framing: Top-15 historical peer distribution (P10~P90, median, frequency), NO point-target claims.
   */
  var FALLBACK_POOL = [
    { code: '0162D0', name: '동원파츠', market: 'KOSDAQ', listingDate: '2026-11-10', url: '/posts/20261105-0162d0-동원파츠/', price: 26500, netFloatPct: 17.52, netEok: 430.3, lockup: 72.93, ltLockup: 27.80, vcOverhangPct: 43.37, retailComp: 1219.4, retailDepTril: 8.20, comp: 840.9, pre5dTemp: -13.39, relTurnover: 908.0, vwapPrem: 43.1, openRet: 92.83, highRet: 116.23, closeRet: 10.94, wickPct: 48.69, y1Eok: 47.1, y4cKrw: 17949, shape: 'BEAR_FADE' },
    { code: '468670', name: '브릴스', market: 'KOSDAQ', listingDate: '2026-10-01', url: '/posts/20260922-468670-브릴스/', price: 19500, netFloatPct: 21.01, netEok: 465.5, lockup: 85.39, ltLockup: 20.77, vcOverhangPct: 83.03, retailComp: 1676.3, retailDepTril: 12.10, comp: 1187.7, pre5dTemp: 0.92, relTurnover: 651.6, vwapPrem: 91.0, openRet: 216.92, highRet: 218.46, closeRet: 56.15, wickPct: 50.97, y1Eok: 261.4, y4cKrw: 66956, shape: 'BEAR_FADE' },
    { code: '420610', name: '인텔리빅스', market: 'KOSDAQ', listingDate: '2026-10-31', url: '/posts/20261026-420610-인텔리빅스/', price: 9000, netFloatPct: 11.86, netEok: 121.0, lockup: 73.12, ltLockup: 18.31, vcOverhangPct: 16.00, retailComp: 1410.9, retailDepTril: 3.97, comp: 1234.3, pre5dTemp: -1.57, relTurnover: 3726.3, vwapPrem: 185.0, openRet: 114.33, highRet: 292.78, closeRet: 244.44, wickPct: 12.31, y1Eok: 295.7, y4cKrw: 346500, shape: 'BULL_HOLD' },
    { code: '266690', name: '덕산넵코어스', market: 'KOSDAQ', listingDate: '2026-09-30', url: '/posts/20260921-266690-덕산넵코어스/', price: 14600, netFloatPct: 33.29, netEok: 918.3, lockup: 57.26, ltLockup: 23.75, vcOverhangPct: 72.79, retailComp: 332.8, retailDepTril: 1.82, comp: 868.6, pre5dTemp: 1.82, relTurnover: 685.7, vwapPrem: 52.0, openRet: 85.62, highRet: 96.58, closeRet: 23.15, wickPct: 37.35, y1Eok: 212.6, y4cKrw: 139120, shape: 'BEAR_FADE' },
    { code: '179880', name: '멜콘', market: 'KOSDAQ', listingDate: '2026-10-15', url: '/posts/20261007-179880-멜콘/', price: 12300, netFloatPct: 23.79, netEok: 368.7, lockup: 73.94, ltLockup: 18.62, vcOverhangPct: 63.28, retailComp: 1741.5, retailDepTril: 8.64, comp: 1136.8, pre5dTemp: -11.34, relTurnover: 886.5, vwapPrem: 84.0, openRet: 122.76, highRet: 134.15, closeRet: 42.03, wickPct: 39.34, y1Eok: 155.0, y4cKrw: 48270, shape: 'BEAR_FADE' },
    { code: '0153R0', name: '바로팜', market: 'KOSDAQ', listingDate: '2026-11-11', url: '/posts/20261105-0153r0-바로팜/', price: 16400, netFloatPct: 30.29, netEok: 594.4, lockup: 0.40, ltLockup: 0.00, vcOverhangPct: 51.04, retailComp: 19.3, retailDepTril: 0.09, comp: 152.4, pre5dTemp: -5.83, relTurnover: 490.3, vwapPrem: -12.0, openRet: -2.44, highRet: 5.91, closeRet: -28.17, wickPct: 32.18, y1Eok: -167.4, y4cKrw: -2919000, shape: 'BEAR_FADE' },
    { code: '439270', name: '크리에이츠', market: 'KOSDAQ', listingDate: '2026-10-29', url: '/posts/20261023-439270-크리에이츠/', price: 15000, netFloatPct: 39.43, netEok: 775.8, lockup: 0.48, ltLockup: 0.00, vcOverhangPct: 73.03, retailComp: 6.9, retailDepTril: 0.02, comp: 240.5, pre5dTemp: -0.45, relTurnover: 309.3, vwapPrem: -28.0, openRet: -20.00, highRet: -15.33, closeRet: -40.00, wickPct: 29.13, y1Eok: -310.3, y4cKrw: -11594000, shape: 'BEAR_FADE' },
    { code: '498150', name: '엠비디', market: 'KOSDAQ', listingDate: '2026-11-24', url: '/posts/20261118-000038-엠비디/', price: 7000, netFloatPct: 34.01, netEok: 341.4, lockup: 0.00, ltLockup: 0.00, vcOverhangPct: 59.00, retailComp: 172.9, retailDepTril: 0.14, comp: 187.1, pre5dTemp: -5.48, relTurnover: 490.7, vwapPrem: -22.0, openRet: -15.29, highRet: -4.29, closeRet: -39.57, wickPct: 36.87, y1Eok: -135.1, y4cKrw: -457700, shape: 'BEAR_FADE' }
  ];

  var STRATEGY_WEIGHT_PRESETS = {
    blend_v4: { v1: 17.04, v2: 8.98, v3: 15.40, v4: 13.01, v5: 34.87, v6: 6.70, v7: 4.00 },
    scarcity_overhang: { v1: 34, v2: 14, v3: 8, v4: 26, v5: 8, v6: 5, v7: 5 },
    inst_longterm: { v1: 16, v2: 30, v3: 28, v4: 10, v5: 6, v6: 6, v7: 4 },
    momentum_5d: { v1: 14, v2: 8, v3: 6, v4: 6, v5: 32, v6: 10, v7: 24 }
  };

  function percentile(arr, q) {
    if (!arr || !arr.length) return 0;
    var s = arr.slice().sort(function (a, b) { return a - b; });
    if (s.length === 1) return s[0];
    var pos = (Math.max(0, Math.min(100, q)) / 100) * (s.length - 1);
    var lo = Math.floor(pos);
    var hi = Math.ceil(pos);
    if (lo === hi) return s[lo];
    return s[lo] + (s[hi] - s[lo]) * (pos - lo);
  }

  function normalizeWeights7(rawW) {
    var keys = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'];
    var sum = 0;
    keys.forEach(function (k) { sum += Math.max(0, parseFloat(rawW[k]) || 0); });
    if (sum <= 0) {
      rawW = STRATEGY_WEIGHT_PRESETS.blend_v4;
      sum = 100;
    }
    var norm = {};
    var unit = {};
    keys.forEach(function (k) {
      var v = Math.max(0, parseFloat(rawW[k]) || 0);
      unit[k] = v / sum;
      norm[k] = (v / sum) * 100.0;
    });
    return { norm: norm, unit: unit };
  }

  function normCorp(name) {
    return (name || '').replace(/^(?:주식회사|\(주\)|㈜)\s*/g, '').replace(/\s*(?:주식회사|\(주\)|㈜)$/g, '').replace(/\s+/g, '').toLowerCase();
  }

  function fmtSignedPct(v, dec) {
    var d = dec === undefined ? 1 : dec;
    return (v >= 0 ? '+' : '') + v.toFixed(d) + '%';
  }

  function fmtSignedEok(v) {
    return (v >= 0 ? '+' : '') + v.toFixed(1) + '억';
  }

  function fmtSignedKrw(v) {
    var rounded = Math.round(v);
    return (rounded >= 0 ? '+' : '-') + Math.abs(rounded).toLocaleString('ko-KR') + '원';
  }

  function computeBlendV4Match(pool, inputs, rawWeights, excludeCode) {
    var wObj = normalizeWeights7(rawWeights || STRATEGY_WEIGHT_PRESETS.blend_v4);
    var uW = wObj.unit;

    var tV1 = Math.max(3.0, Math.min(95.0, parseFloat(inputs.netFloatPct) || 25.0));
    var tV2 = Math.max(0.0, Math.min(100.0, parseFloat(inputs.lockup) || 0.0));
    var tV3 = Math.max(0.0, Math.min(100.0, parseFloat(inputs.ltLockup) || 0.0));
    var tV4 = Math.max(0.0, Math.min(95.0, parseFloat(inputs.vcOverhang) || 0.0));
    var tV5 = Math.max(0.0, parseFloat(inputs.retailComp) || 0.0);
    var tV5Dep = Math.max(0.2, (tV5 / 1000.0) * 3.8);
    var tV6 = Math.max(0.0, parseFloat(inputs.instComp) || 0.0);
    var tV7 = parseFloat(inputs.pre5dTemp);
    if (isNaN(tV7)) tV7 = 0.0;

    var exUpper = (excludeCode || '').toUpperCase();
    var scored = pool.filter(function (c) {
      return !exUpper || (c.code || '').toUpperCase() !== exUpper;
    }).map(function (c) {
      var dV1 = Math.min(1.0, Math.abs(tV1 - (c.netFloatPct || 25.0)) / 42.0);
      var dV2 = Math.min(1.0, Math.abs(tV2 - (c.lockup || 0.0)) / 85.0);
      var dV3 = Math.min(1.0, Math.abs(tV3 - (c.ltLockup || 0.0)) / 50.0);
      var dV4 = Math.min(1.0, Math.abs(tV4 - (c.vcOverhangPct || 0.0)) / 45.0);
      var cDep = (c.retailDepTril !== undefined && c.retailDepTril !== null) ? c.retailDepTril : 2.5;
      var dV5 = Math.min(1.0, 0.65 * (Math.abs(tV5 - (c.retailComp || 0.0)) / 1600.0) + 0.35 * (Math.abs(tV5Dep - cDep) / 8.0));
      var dV6 = Math.min(1.0, Math.abs(tV6 - (c.comp || 0.0)) / 1300.0);
      var dV7 = Math.min(1.0, Math.abs(tV7 - (c.pre5dTemp || 0.0)) / 6.0);

      var wDist = (
        uW.v1 * dV1 +
        uW.v2 * dV2 +
        uW.v3 * dV3 +
        uW.v4 * dV4 +
        uW.v5 * dV5 +
        uW.v6 * dV6 +
        uW.v7 * dV7
      );
      var simPct = Math.max(12.0, (1.0 - wDist) * 100.0);
      return { item: c, simPct: simPct, wDist: wDist };
    });

    scored.sort(function (a, b) {
      if (a.wDist !== b.wDist) return a.wDist - b.wDist;
      return b.simPct - a.simPct;
    });

    var top5 = scored.slice(0, 5);
    var peers = scored.slice(0, Math.min(15, scored.length));
    var closes = peers.map(function (x) { return x.item.closeRet; });
    var turns = peers.map(function (x) { return x.item.relTurnover; }).filter(function (v) { return v > 0; });
    var y1s = peers.map(function (x) { return x.item.y1Eok || 0; });
    var y4cs = peers.map(function (x) { return x.item.y4cKrw || 0; });
    var wicks = peers.map(function (x) { return Math.abs(x.item.wickPct || 0); });

    var posCnt = closes.filter(function (v) { return v > 0; }).length;
    var bearCnt = peers.filter(function (x) { return (x.item.shape || 'BEAR_FADE') !== 'BULL_HOLD'; }).length;
    var bullCnt = peers.length - bearCnt;
    var domShape = bullCnt > bearCnt ? 'BULL_HOLD' : 'BEAR_FADE';
    var domCnt = domShape === 'BULL_HOLD' ? bullCnt : bearCnt;

    return {
      poolSize: pool.length,
      peerCount: peers.length,
      normWeights: wObj.norm,
      top5: top5,
      closeDist: {
        p10: percentile(closes, 10),
        p25: percentile(closes, 25),
        p50: percentile(closes, 50),
        p75: percentile(closes, 75),
        p90: percentile(closes, 90),
        posCnt: posCnt,
        posRate: peers.length ? (posCnt / peers.length) * 100.0 : 0
      },
      turnDist: {
        p10: percentile(turns, 10),
        p25: percentile(turns, 25),
        p50: percentile(turns, 50),
        p75: percentile(turns, 75),
        p90: percentile(turns, 90)
      },
      y1Dist: {
        p10: percentile(y1s, 10),
        p25: percentile(y1s, 25),
        p50: percentile(y1s, 50),
        p75: percentile(y1s, 75),
        p90: percentile(y1s, 90)
      },
      y4cDist: {
        p10: percentile(y4cs, 10),
        p25: percentile(y4cs, 25),
        p50: percentile(y4cs, 50),
        p75: percentile(y4cs, 75),
        p90: percentile(y4cs, 90)
      },
      wickP50: percentile(wicks, 50),
      domShape: domShape,
      domCnt: domCnt,
      domRate: peers.length ? (domCnt / peers.length) * 100.0 : 0
    };
  }

  function initWidget(widget, pool) {
    var v1Num = widget.querySelector('[data-sim-num="netFloatPct"]');
    var v1Range = widget.querySelector('[data-sim-range="netFloatPct"]');
    var v2Num = widget.querySelector('[data-sim-num="lockup"]');
    var v2Range = widget.querySelector('[data-sim-range="lockup"]');
    var v3Num = widget.querySelector('[data-sim-num="ltLockup"]');
    var v3Range = widget.querySelector('[data-sim-range="ltLockup"]');
    var v4Num = widget.querySelector('[data-sim-num="vcOverhang"]');
    var v4Range = widget.querySelector('[data-sim-range="vcOverhang"]');
    var v5Num = widget.querySelector('[data-sim-num="retailComp"]');
    var v5Range = widget.querySelector('[data-sim-range="retailComp"]');
    var v6Num = widget.querySelector('[data-sim-num="instComp"]');
    var v6Range = widget.querySelector('[data-sim-range="instComp"]');
    var v7Num = widget.querySelector('[data-sim-num="pre5dTemp"]');
    var v7Range = widget.querySelector('[data-sim-range="pre5dTemp"]');

    var wSliders = {
      v1: widget.querySelector('[data-weight-slider="v1"]'),
      v2: widget.querySelector('[data-weight-slider="v2"]'),
      v3: widget.querySelector('[data-weight-slider="v3"]'),
      v4: widget.querySelector('[data-weight-slider="v4"]'),
      v5: widget.querySelector('[data-weight-slider="v5"]'),
      v6: widget.querySelector('[data-weight-slider="v6"]'),
      v7: widget.querySelector('[data-weight-slider="v7"]')
    };

    var kpiTurnEl = widget.querySelector('[data-sim-kpi="relTurnover"]');
    var kpiTurnBandEl = widget.querySelector('[data-sim-kpi="turnBand"]');
    var kpiCloseMedEl = widget.querySelector('[data-sim-kpi="closeMedian"]');
    var kpiCloseBandEl = widget.querySelector('[data-sim-kpi="closeBand"]');
    var kpiY1MedEl = widget.querySelector('[data-sim-kpi="y1Median"]');
    var kpiY1BandEl = widget.querySelector('[data-sim-kpi="y1Band"]');
    var kpiShapeDomEl = widget.querySelector('[data-sim-kpi="shapeDom"]');
    var kpiShapeNoteEl = widget.querySelector('[data-sim-kpi="shapeNote"]');
    var topTbody = widget.querySelector('[data-sim-top3-tbody]');
    var distTbody = widget.querySelector('[data-sim-dist-tbody]');
    var prefillBanner = widget.querySelector('[data-sim-prefill-text]');
    var excludeCode = widget.getAttribute('data-exclude-code') || '';

    widget.querySelectorAll('[data-sim-pool-size]').forEach(function (el) {
      el.textContent = String(pool.length);
    });

    function setInputPair(numEl, rangeEl, val) {
      if (numEl && val !== null && val !== undefined) numEl.value = val;
      if (rangeEl && val !== null && val !== undefined) rangeEl.value = val;
    }

    function getRawWeights() {
      var def = STRATEGY_WEIGHT_PRESETS.blend_v4;
      return {
        v1: wSliders.v1 ? parseFloat(wSliders.v1.value) : def.v1,
        v2: wSliders.v2 ? parseFloat(wSliders.v2.value) : def.v2,
        v3: wSliders.v3 ? parseFloat(wSliders.v3.value) : def.v3,
        v4: wSliders.v4 ? parseFloat(wSliders.v4.value) : def.v4,
        v5: wSliders.v5 ? parseFloat(wSliders.v5.value) : def.v5,
        v6: wSliders.v6 ? parseFloat(wSliders.v6.value) : def.v6,
        v7: wSliders.v7 ? parseFloat(wSliders.v7.value) : def.v7
      };
    }

    function updateSimulation() {
      var inputs = {
        netFloatPct: v1Num ? parseFloat(v1Num.value) : 25.0,
        lockup: v2Num ? parseFloat(v2Num.value) : 40.0,
        ltLockup: v3Num ? parseFloat(v3Num.value) : 18.0,
        vcOverhang: v4Num ? parseFloat(v4Num.value) : 35.0,
        retailComp: v5Num ? parseFloat(v5Num.value) : 800.0,
        instComp: v6Num ? parseFloat(v6Num.value) : 800.0,
        pre5dTemp: v7Num ? parseFloat(v7Num.value) : 0.0
      };
      var res = computeBlendV4Match(pool, inputs, getRawWeights(), excludeCode);

      ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'].forEach(function (k) {
        var pctStr = res.normWeights[k].toFixed(1) + '%';
        widget.querySelectorAll('[data-norm-w="' + k + '"]').forEach(function (el) {
          el.textContent = pctStr;
        });
      });

      if (kpiTurnEl) kpiTurnEl.textContent = Math.round(res.turnDist.p50).toLocaleString('ko-KR') + '%';
      if (kpiTurnBandEl) {
        kpiTurnBandEl.innerHTML = 'IQR(P25~P75) <strong>' + Math.round(res.turnDist.p25).toLocaleString('ko-KR') + '% ~ ' + Math.round(res.turnDist.p75).toLocaleString('ko-KR') + '%</strong>';
      }
      if (kpiCloseMedEl) {
        kpiCloseMedEl.textContent = fmtSignedPct(res.closeDist.p50, 1);
        kpiCloseMedEl.className = 'alpha-kpi-value ' + (res.closeDist.p50 >= 0 ? 'pos-val' : 'neg-val');
      }
      if (kpiCloseBandEl) {
        kpiCloseBandEl.innerHTML = 'P10~P90 <strong>' + fmtSignedPct(res.closeDist.p10, 0) + ' ~ ' + fmtSignedPct(res.closeDist.p90, 0) + '</strong> · 과거 상회 <strong>' + res.closeDist.posCnt + '/' + res.peerCount + '건 (' + res.closeDist.posRate.toFixed(0) + '%)</strong>';
      }
      if (kpiY1MedEl) {
        kpiY1MedEl.textContent = fmtSignedEok(res.y1Dist.p50);
        kpiY1MedEl.className = 'alpha-kpi-value ' + (res.y1Dist.p50 >= 0 ? 'pos-val' : 'neg-val');
      }
      if (kpiY1BandEl) {
        kpiY1BandEl.innerHTML = 'IQR(P25~P75) <strong>' + fmtSignedEok(res.y1Dist.p25) + ' ~ ' + fmtSignedEok(res.y1Dist.p75) + '</strong>';
      }
      if (kpiShapeDomEl) kpiShapeDomEl.textContent = res.domShape;
      if (kpiShapeNoteEl) {
        kpiShapeNoteEl.innerHTML = '표본 내 <strong>' + res.domCnt + '/' + res.peerCount + '건 (' + res.domRate.toFixed(1) + '%)</strong> · 윗꼬리 중앙 <strong>' + res.wickP50.toFixed(1) + '%</strong>';
      }

      if (topTbody) {
        topTbody.innerHTML = res.top5.map(function (entry, idx) {
          var c = entry.item;
          var mktClass = c.market === 'KOSPI' ? 'mkt-kospi' : 'mkt-kosdaq';
          var nameHtml = c.url ? ('<a href="' + c.url + '"><strong>' + c.name + '</strong></a>') : ('<strong>' + c.name + '</strong>');
          var closeClass = c.closeRet >= 0 ? 'pos-val' : 'neg-val';
          var y1Class = (c.y1Eok || 0) >= 0 ? 'pos-val' : 'neg-val';
          return (
            '<tr>' +
              '<td><span class="sim-score-pill">#' + (idx + 1) + ' · ' + entry.simPct.toFixed(1) + '%</span></td>' +
              '<td>' + nameHtml + ' (<code>' + c.code + '</code>) <span class="mkt-pill ' + mktClass + '">' + c.market + '</span><div style="font-size:0.74rem;color:var(--subtle);">' + (c.listingDate || '') + '</div></td>' +
              '<td class="num"><strong>' + c.netFloatPct.toFixed(1) + '%</strong> <span style="color:var(--subtle);font-size:0.75rem;">(구주 ' + c.vcOverhangPct.toFixed(0) + '%)</span></td>' +
              '<td class="num"><strong>' + c.lockup.toFixed(1) + '%</strong> <span style="color:var(--subtle);font-size:0.75rem;">(장기 ' + c.ltLockup.toFixed(1) + '%)</span></td>' +
              '<td class="num"><strong style="color:var(--navy);">' + Math.round(c.relTurnover).toLocaleString('ko-KR') + '%</strong></td>' +
              '<td class="num">' + fmtSignedPct(c.openRet, 1) + ' → ' + fmtSignedPct(c.highRet, 1) + ' → <strong class="' + closeClass + '">' + fmtSignedPct(c.closeRet, 1) + '</strong></td>' +
              '<td class="num ' + y1Class + '">' + fmtSignedEok(c.y1Eok || 0) + '</td>' +
              '<td class="num neg-val">' + Math.abs(c.wickPct || 0).toFixed(1) + '%</td>' +
            '</tr>'
          );
        }).join('');
      }

      if (distTbody) {
        var rowsHtml = [
          {
            label: '공모가 대비 종가 변동률 (Y0)',
            vals: [fmtSignedPct(res.closeDist.p10, 1), fmtSignedPct(res.closeDist.p25, 1), fmtSignedPct(res.closeDist.p50, 1), fmtSignedPct(res.closeDist.p75, 1), fmtSignedPct(res.closeDist.p90, 1)]
          },
          {
            label: '당일 상대 수급회전율 (거래량÷실질유통)',
            vals: [Math.round(res.turnDist.p10).toLocaleString('ko-KR') + '%', Math.round(res.turnDist.p25).toLocaleString('ko-KR') + '%', Math.round(res.turnDist.p50).toLocaleString('ko-KR') + '%', Math.round(res.turnDist.p75).toLocaleString('ko-KR') + '%', Math.round(res.turnDist.p90).toLocaleString('ko-KR') + '%']
          },
          {
            label: '실질유통 기준 순증감액 (Y1)',
            vals: [fmtSignedEok(res.y1Dist.p10), fmtSignedEok(res.y1Dist.p25), fmtSignedEok(res.y1Dist.p50), fmtSignedEok(res.y1Dist.p75), fmtSignedEok(res.y1Dist.p90)]
          },
          {
            label: '청약 증거금 1억 환산 손익 (Y4c)',
            vals: [fmtSignedKrw(res.y4cDist.p10), fmtSignedKrw(res.y4cDist.p25), fmtSignedKrw(res.y4cDist.p50), fmtSignedKrw(res.y4cDist.p75), fmtSignedKrw(res.y4cDist.p90)]
          }
        ].map(function (r) {
          return (
            '<tr>' +
              '<td style="font-weight:700;color:var(--ink);">' + r.label + '</td>' +
              '<td class="num" style="text-align:right;color:var(--muted);">' + r.vals[0] + '</td>' +
              '<td class="num" style="text-align:right;">' + r.vals[1] + '</td>' +
              '<td class="num" style="text-align:right;font-weight:800;color:var(--navy);">' + r.vals[2] + '</td>' +
              '<td class="num" style="text-align:right;">' + r.vals[3] + '</td>' +
              '<td class="num" style="text-align:right;color:var(--muted);">' + r.vals[4] + '</td>' +
            '</tr>'
          );
        }).join('');
        distTbody.innerHTML = rowsHtml;
      }
    }

    if (!widget.getAttribute('data-sim-bound')) {
      widget.setAttribute('data-sim-bound', 'true');
      [
        [v1Num, v1Range], [v2Num, v2Range], [v3Num, v3Range],
        [v4Num, v4Range], [v5Num, v5Range], [v6Num, v6Range], [v7Num, v7Range]
      ].forEach(function (pair) {
        if (pair[0] && pair[1]) {
          pair[0].addEventListener('input', function () { pair[1].value = pair[0].value; updateSimulation(); });
          pair[1].addEventListener('input', function () { pair[0].value = pair[1].value; updateSimulation(); });
        }
      });

      Object.keys(wSliders).forEach(function (k) {
        if (wSliders[k]) {
          wSliders[k].addEventListener('input', function () {
            widget.querySelectorAll('[data-weight-preset]').forEach(function (b) { b.classList.remove('is-active'); });
            updateSimulation();
          });
        }
      });

      widget.querySelectorAll('[data-weight-preset]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var pKey = btn.getAttribute('data-weight-preset');
          var preset = STRATEGY_WEIGHT_PRESETS[pKey] || STRATEGY_WEIGHT_PRESETS.blend_v4;
          widget.querySelectorAll('[data-weight-preset]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
          Object.keys(wSliders).forEach(function (k) {
            if (wSliders[k] && preset[k] !== undefined) wSliders[k].value = preset[k];
          });
          updateSimulation();
        });
      });

      widget.querySelectorAll('[data-sim-preset]').forEach(function (chip) {
        chip.addEventListener('click', function () {
          widget.querySelectorAll('[data-sim-preset]').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
          var presetCode = (chip.getAttribute('data-sim-preset') || '').toUpperCase();
          var liveRec = pool.find(function (x) { return (x.code || '').toUpperCase() === presetCode; });
          if (liveRec) {
            setInputPair(v1Num, v1Range, liveRec.netFloatPct);
            setInputPair(v2Num, v2Range, liveRec.lockup);
            setInputPair(v3Num, v3Range, liveRec.ltLockup);
            setInputPair(v4Num, v4Range, liveRec.vcOverhangPct);
            setInputPair(v5Num, v5Range, liveRec.retailComp);
            setInputPair(v6Num, v6Range, liveRec.comp);
            setInputPair(v7Num, v7Range, liveRec.pre5dTemp);
          } else {
            setInputPair(v1Num, v1Range, chip.getAttribute('data-v1'));
            setInputPair(v2Num, v2Range, chip.getAttribute('data-v2'));
            setInputPair(v3Num, v3Range, chip.getAttribute('data-v3'));
            setInputPair(v4Num, v4Range, chip.getAttribute('data-v4'));
            setInputPair(v5Num, v5Range, chip.getAttribute('data-v5'));
            setInputPair(v6Num, v6Range, chip.getAttribute('data-v6'));
            setInputPair(v7Num, v7Range, chip.getAttribute('data-v7'));
          }
          excludeCode = chip.getAttribute('data-exclude') || presetCode;
          updateSimulation();
        });
      });
    }

    // Auto-prefill from current single post page
    if (widget.getAttribute('data-auto-prefill-post') === 'true') {
      var h1El = document.querySelector('article h1') || document.querySelector('.article-header h1');
      var titleText = h1El ? h1El.textContent : '';
      var proseText = (document.querySelector('.qti-prose') || {}).textContent || '';
      var combined = titleText + ' ' + proseText;

      var codeMatch = titleText.match(/\(([0-9A-Za-z]{6})\)/);
      var detectedCode = codeMatch ? codeMatch[1].toUpperCase() : '';
      var corpName = (titleText.split('공모주')[0] || '본 리포트 종목').trim();
      var corpNorm = normCorp(corpName);

      var known = pool.find(function (x) {
        return (detectedCode && (x.code || '').toUpperCase() === detectedCode) || (corpNorm && normCorp(x.name) === corpNorm);
      });
      if (known) {
        setInputPair(v1Num, v1Range, known.netFloatPct);
        setInputPair(v2Num, v2Range, known.lockup);
        setInputPair(v3Num, v3Range, known.ltLockup);
        setInputPair(v4Num, v4Range, known.vcOverhangPct);
        setInputPair(v5Num, v5Range, known.retailComp);
        setInputPair(v6Num, v6Range, known.comp);
        setInputPair(v7Num, v7Range, known.pre5dTemp);
        excludeCode = known.code;
        if (prefillBanner) {
          prefillBanner.innerHTML = '🎯 <strong>[' + known.name + ' (' + known.code + ')]</strong> KRX·DART 확정 7변수 자동 프리셋 완료 (V1 ' + known.netFloatPct.toFixed(1) + '% · V2 ' + known.lockup.toFixed(1) + '% · V5 ' + known.retailComp.toFixed(1) + ':1 · V7 ' + fmtSignedPct(known.pre5dTemp, 2) + ')';
        }
      } else {
        var cM = combined.match(/([\d,]+(?:\.\d+)?)\s*:\s*1/);
        var lM = combined.match(/확약[^\d]{0,16}([\d.]+)\s*%/);
        var flM = combined.match(/유통물량\s*비율[^\d]{0,16}([\d.]+)\s*%/) || combined.match(/유통[^\d]{0,12}([\d.]+)\s*%/);
        var cVal = cM ? parseFloat(cM[1].replace(/,/g, '')) : 800.0;
        var lVal = lM ? parseFloat(lM[1]) : 35.0;
        var nomFlPct = flM ? parseFloat(flM[1]) : 28.0;
        var deductFactor = Math.min(0.28, (lVal / 100.0) * 0.24);
        var netFlPct = Math.max(5.0, Math.round(nomFlPct * (1.0 - deductFactor) * 100) / 100);
        var ltVal = Math.round(lVal * 0.44 * 100) / 100;
        var vcVal = Math.round(Math.max(4.5, netFlPct * 0.45) * 10) / 10;
        var retVal = Math.round(cVal * 0.98 * 10) / 10;

        setInputPair(v1Num, v1Range, netFlPct);
        setInputPair(v2Num, v2Range, lVal);
        setInputPair(v3Num, v3Range, ltVal);
        setInputPair(v4Num, v4Range, vcVal);
        setInputPair(v5Num, v5Range, retVal);
        setInputPair(v6Num, v6Range, cVal);
        setInputPair(v7Num, v7Range, 0.0);
        excludeCode = detectedCode;
        if (prefillBanner) {
          prefillBanner.innerHTML = '🎯 <strong>[' + corpName + (detectedCode ? ' (' + detectedCode + ')' : '') + ']</strong> 공시 7변수 자동 프리셋 적용 (V1 ' + netFlPct.toFixed(1) + '% · V2 ' + lVal.toFixed(1) + '% · V6 ' + cVal.toFixed(1) + ':1)';
        }
      }
    }

    updateSimulation();
  }

  function bootSimulators() {
    var widgets = document.querySelectorAll('.quant-sim-widget');
    if (!widgets.length) return;
    var poolUrl = widgets[0].getAttribute('data-pool-url') || '/data/ipo_v4_pool.json';
    // Render immediately with fallback, then upgrade seamlessly when full 225-IPO JSON arrives
    widgets.forEach(function (w) { initWidget(w, FALLBACK_POOL); });
    if (typeof fetch === 'function') {
      fetch(poolUrl, { credentials: 'same-origin' })
        .then(function (resp) { return resp.ok ? resp.json() : null; })
        .then(function (data) {
          if (data && Array.isArray(data.items) && data.items.length >= 10) {
            widgets.forEach(function (w) { initWidget(w, data.items); });
          }
        })
        .catch(function () { /* keep fallback pool */ });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSimulators);
  } else {
    bootSimulators();
  }
})();
