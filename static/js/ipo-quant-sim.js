(function () {
      var INTRADAY_PROFILES = {
        high_50_plus: {
          title: '고확약 우수형 (의무보유확약 50% 이상 평균 · 브릴스·진코스텍·덕산넵코어스)',
          open15: '43.3%',
          turnover: '296.7%',
          openAlpha: '+61.93%p',
          closeRet: '+54.57%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 43.3, turn: 128.5, price: '+61.67%', isPos: true, pattern: '개장 동시호가 체결 및 정적·동적 VI 발동, 의무보유확약 잠김 효과로 유통 호가 공백 발생' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 20.8, turn: 190.2, price: '+64.57%', isPos: true, pattern: '미확약 기관 배정물량 1차 출회에도 당일 VWAP(거래량가중평균가) 상단 지지 유지' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.8, turn: 228.2, price: '+59.27%', isPos: true, pattern: '초반 급등분 일부 소화 후 오전 1차 지지선 구축 및 기관·외국인 손바뀜' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 6.4, turn: 247.2, price: '+57.23%', isPos: true, pattern: '거래량 급감 및 오전 VWAP 부근 좁은 박스권 등락' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 7.6, turn: 269.7, price: '+56.00%', isPos: true, pattern: '운용사·연기금 패시브/액티브 편입 유입 여부에 따른 오후 추세 확정' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 9.1, turn: 296.7, price: '+54.57%', isPos: true, pattern: '당일 단기 데이트레이딩 물량 청산 후에도 공모가 대비 높은 프리미엄 종가 마감' }
          ]
        },
        mid_25_50: {
          title: '중확약 표준형 (의무보유확약 25%~50% 평균 · 산일전기·전진건설로봇·에이치브이엠·이노스페이스)',
          open15: '46.2%',
          turnover: '291.2%',
          openAlpha: '+66.98%p',
          closeRet: '+63.40%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 46.2, turn: 134.5, price: '+66.53%', isPos: true, pattern: '개장 첫 15분간 일간 거래량의 46.2% 집중, 시초가 갭상승 및 VI 발동' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 21.8, turn: 198.0, price: '+66.93%', isPos: true, pattern: '미확약 기관 매물 소화 과정, VWAP 지지 시 오전 고점 재돌파 시도' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 11.9, turn: 232.7, price: '+64.45%', isPos: true, pattern: '유통물량 2회전(200%) 돌파 후 단기 지지선 확인 및 거래량 완만화' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 5.8, turn: 249.6, price: '+62.00%', isPos: true, pattern: '점심 시간대 거래 비중 5.8%로 축소, 오전 종가 부근 횡보' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 6.5, turn: 268.5, price: '+62.78%', isPos: true, pattern: 'KOSPI·KOSDAQ 우량 업종(전력·로봇·방산) 중심으로 오후 기관 재매수 유입' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 7.8, turn: 291.2, price: '+63.40%', isPos: true, pattern: '종가 동시호가 수급 유입 및 시초가 수준 강보합 유지 마감' }
          ]
        },
        low_under_20: {
          title: '저확약 변동성형 (의무보유확약 20% 미만 평균 · 더본코리아·스카이랩스·크리에이츠)',
          open15: '52.4%',
          turnover: '253.7%',
          openAlpha: '+9.93%p',
          closeRet: '+1.30%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 52.4, turn: 133.0, price: '+9.67%', isPos: true, pattern: '개장 첫 15분에 당일 거래량의 절반 이상(52.4%) 집중, 미확약 물량 즉시 출회' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 23.1, turn: 191.6, price: '+8.60%', isPos: true, pattern: '09:15~10:00 구간 누적 거래비중 75.5% 도달, VWAP 하향 이탈 시 낙폭 확대 주의' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 10.1, turn: 217.2, price: '+5.07%', isPos: true, pattern: '초반 급등분 반납 후 공모가 부근 지지력 테스트' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 4.5, turn: 228.6, price: '+3.43%', isPos: true, pattern: '매수 호가 공백 확대 및 거래량 급감(4.5%)' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 4.4, turn: 239.8, price: '+2.33%', isPos: true, pattern: '추가 매수세 부재 시 계단식 완만한 조정 흐름' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 5.5, turn: 253.7, price: '+1.30%', isPos: true, pattern: '장 막판 당일 데이트레이딩·미수 청산 물량 출회로 시초가 대비 낮은 종가 형성' }
          ]
        },
        '475150': {
          title: '산일전기 (475150 · KOSPI · 확약 42.70% · 유통 21.80% · 지수 대비 Alpha +91.92%p)',
          open15: '44.5%',
          turnover: '312.4%',
          openAlpha: '+91.92%p',
          closeRet: '+118.50%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 44.5, turn: 139.0, price: '+91.40%', isPos: true, pattern: 'KOSPI 상장 첫 15분간 139.0% 회전하며 시초가 +91.4% 출발' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 21.0, turn: 204.6, price: '+98.20%', isPos: true, pattern: '미확약 물량 전량 흡수하며 VWAP 상향 돌파(+98.2%)' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.5, turn: 243.7, price: '+104.50%', isPos: true, pattern: '공모가 대비 +100% 돌파 후 기관 순매수 지속' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 6.2, turn: 263.0, price: '+103.80%', isPos: true, pattern: '+103% 구간 견조한 고점 박스권 유지' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 7.3, turn: 285.8, price: '+111.00%', isPos: true, pattern: '오후 기관·외국인 추가 매수 유입으로 당일 고점 경신' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 8.5, turn: 312.4, price: '+118.50%', isPos: true, pattern: '당일 KOSPI(-0.52%) 대비 종가 Alpha +119.02%p로 고점 마감' }
          ]
        },
        '468670': {
          title: '브릴스 (468670 · KOSDAQ · 확약 85.39% · 유통 26.42% · 지수 대비 Alpha +84.34%p)',
          open15: '42.0%',
          turnover: '346.2%',
          openAlpha: '+84.34%p',
          closeRet: '+78.60%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 42.0, turn: 145.4, price: '+84.10%', isPos: true, pattern: '85.39% 초고확약에 따른 유통물량 품귀로 개장 직후 +84.1% 형성' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 20.4, turn: 216.0, price: '+88.50%', isPos: true, pattern: '출회 가능한 미확약 물량(14.6%) 조기 소진으로 오전 고점 +88.5% 기록' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 13.1, turn: 261.4, price: '+83.20%', isPos: true, pattern: '시초가(+84.1%) 부근 강력한 하방 경직성 확인' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 6.5, turn: 283.9, price: '+81.00%', isPos: true, pattern: '점심 구간 거래량 축소 속 +80% 상단 지지' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 8.2, turn: 312.3, price: '+80.20%', isPos: true, pattern: '누적 회전율 300% 돌파 후에도 매물 압력 제한적' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 9.8, turn: 346.2, price: '+78.60%', isPos: true, pattern: '당일 KOSDAQ(-0.24%) 대비 종가 Alpha +78.84%p 마감' }
          ]
        },
        '480110': {
          title: '더본코리아 (480110 · KOSPI · 확약 19.20% · 유통 31.00% · 지수 대비 Alpha +21.48%p)',
          open15: '51.8%',
          turnover: '294.0%',
          openAlpha: '+21.48%p',
          closeRet: '+14.80%',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 51.8, turn: 152.3, price: '+21.30%', isPos: true, pattern: '개장 첫 15분간 거래량 51.8% 집중, 시초가 +21.3% 형성 후 변동성 확대' },
            { slot: '09:15~10:00', stage: '② 미확약 기관 1차 차익실현 · VWAP 공방', vol: 22.7, turn: 219.0, price: '+24.00%', isPos: true, pattern: '개인 매수세 유입으로 오전 고점(+24.0%) 터치 후 미확약 기관 매물 출회' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 10.5, turn: 249.9, price: '+18.60%', isPos: true, pattern: '시초가 하회 후 +18% 구간 1차 지지선 형성' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 호가 스프레드 수렴', vol: 4.8, turn: 264.0, price: '+16.90%', isPos: true, pattern: '거래량 급감 및 +16~17% 구간 박스권 등락' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 이탈 분기', vol: 4.6, turn: 277.5, price: '+15.80%', isPos: true, pattern: '오후 미확약 잔여 물량 소화 및 완만한 조정' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 데이트레이딩 청산', vol: 5.6, turn: 294.0, price: '+14.80%', isPos: true, pattern: '당일 KOSPI(-0.18%) 대비 종가 Alpha +14.98%p 마감' }
          ]
        }
      };

      document.querySelectorAll('[data-alpha-filter-group]').forEach(function (group) {
        var targetTableId = group.getAttribute('data-alpha-filter-group');
        var table = document.getElementById(targetTableId);
        if (!table) return;
        group.querySelectorAll('[data-alpha-filter]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var filter = btn.getAttribute('data-alpha-filter');
            group.querySelectorAll('[data-alpha-filter]').forEach(function (b) {
              b.classList.toggle('is-active', b === btn);
            });
            table.querySelectorAll('tbody tr').forEach(function (row) {
              var mkt = row.getAttribute('data-market') || '';
              var isHigh = row.getAttribute('data-lockup-high') === 'true';
              var show = true;
              if (filter === 'KOSPI') show = (mkt === 'KOSPI');
              else if (filter === 'KOSDAQ') show = (mkt === 'KOSDAQ');
              else if (filter === 'HIGH30') show = isHigh;
              row.style.display = show ? '' : 'none';
            });
          });
        });
      });

      document.querySelectorAll('.intraday-analyzer').forEach(function (analyzer) {
        var titleEl = analyzer.querySelector('[data-intraday-title]');
        var open15El = analyzer.querySelector('[data-intraday-open15]');
        var turnEl = analyzer.querySelector('[data-intraday-turnover]');
        var alphaEl = analyzer.querySelector('[data-intraday-alpha]');
        var closeEl = analyzer.querySelector('[data-intraday-close]');
        var tbody = analyzer.querySelector('[data-intraday-tbody]');

        function renderProfile(key) {
          var prof = INTRADAY_PROFILES[key] || INTRADAY_PROFILES.mid_25_50;
          if (titleEl) titleEl.textContent = prof.title;
          if (open15El) open15El.textContent = prof.open15;
          if (turnEl) turnEl.textContent = prof.turnover;
          if (alphaEl) alphaEl.textContent = prof.openAlpha;
          if (closeEl) closeEl.textContent = prof.closeRet;
          if (tbody) {
            tbody.innerHTML = prof.buckets.map(function (b) {
              var barWidth = Math.min(100, Math.round((b.vol / 55.0) * 100));
              var priceClass = b.isPos ? 'pos-val' : 'neg-val';
              return (
                '<tr>' +
                  '<td style="font-family:var(--font-mono);font-weight:700;color:var(--navy);white-space:nowrap;">' + b.slot + '</td>' +
                  '<td style="font-weight:600;white-space:nowrap;">' + b.stage + '</td>' +
                  '<td class="vol-bar-cell"><div class="vol-bar-wrap"><div class="vol-bar-track"><div class="vol-bar-fill" style="width:' + barWidth + '%;"></div></div><span class="vol-bar-num">' + b.vol.toFixed(1) + '%</span></div></td>' +
                  '<td style="text-align:right;font-family:var(--font-mono);font-weight:600;white-space:nowrap;">' + b.turn.toFixed(1) + '%</td>' +
                  '<td style="text-align:right;font-family:var(--font-mono);white-space:nowrap;" class="' + priceClass + '">' + b.price + '</td>' +
                  '<td style="color:var(--text-body);font-size:0.82rem;">' + b.pattern + '</td>' +
                '</tr>'
              );
            }).join('');
          }
        }

        analyzer.querySelectorAll('[data-intraday-profile]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-intraday-profile');
            analyzer.querySelectorAll('[data-intraday-profile]').forEach(function (b) {
              b.classList.toggle('is-active', b === btn);
            });
            renderProfile(key);
          });
        });

        if (analyzer.getAttribute('data-auto-match-lockup') === 'true') {
          var parentSection = analyzer.closest('[data-post-desc]');
          var descText = parentSection ? (parentSection.getAttribute('data-post-desc') || '') : '';
          var m = descText.match(/확약\s*([\d.]+)%/);
          if (m) {
            var lkVal = parseFloat(m[1]);
            var targetKey = lkVal >= 50.0 ? 'high_50_plus' : (lkVal >= 20.0 ? 'mid_25_50' : 'low_under_20');
            var targetBtn = analyzer.querySelector('[data-intraday-profile="' + targetKey + '"]');
            if (targetBtn) {
              targetBtn.click();
            }
          }
        }
      });

      /* Wave 6 Master Prompt v3.0: 7-Variable Weighted Relative IPO Simulator with Auto-100% Weight Normalization */
      var HISTORICAL_IPO_DB = [
        {
          code: '468670', name: '브릴스', market: 'KOSDAQ', url: '/posts/20260922-468670-브릴스/',
          price: 15000, comp: 1187.74, lockup: 85.39, ltLockup: 41.20,
          nominalFloatPct: 26.42, netFloatPct: 16.08, vcOverhangPct: 6.80,
          retailComp: 1412.0, retailDepTril: 5.42,
          pre5dKospi: 0.95, pre5dKosdaq: 1.80, pre5dTemp: 1.55,
          nominalEok: 585.4, netEok: 356.2,
          relTurnover: 568.9, vwapPrem: 82.00, supplyIntensity: 1035.5, tradeValEok: 3688.2,
          openRet: 84.10, highRet: 94.00, lowRet: 76.00, closeRet: 78.60, wickPct: 7.94,
          peakSlot: '09:15~10:00',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 42.0, price: 84.10, pattern: '실질 유통비율 16.08%(초고확약 85.4%) 품귀로 개장 직후 VI 발동' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · 당일 고점', vol: 20.4, price: 88.50, pattern: '미확약(14.6%) 조기 소화 후 당일 최고가(+94.00%) 도달' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 13.1, price: 83.20, pattern: '시초가(+84.1%) 및 VWAP(+82.0%) 상단 강력한 지지 확인' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 6.5, price: 81.00, pattern: '거래비중 6.5% 축소, +80% 상단 박스권 유지' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 8.2, price: 80.20, pattern: '상대 수급강도 500% 돌파 후에도 구주 오버행(6.8%) 매도 제한적' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 9.8, price: 78.60, pattern: '윗꼬리 밀림폭 -7.94% 방어하며 +78.60% 고점권 마감' }
          ]
        },
        {
          code: '475150', name: '산일전기', market: 'KOSPI', url: '',
          price: 35000, comp: 1184.50, lockup: 42.70, ltLockup: 24.80,
          nominalFloatPct: 21.80, netFloatPct: 15.47, vcOverhangPct: 4.20,
          retailComp: 423.5, retailDepTril: 16.88,
          pre5dKospi: 1.42, pre5dKosdaq: 0.85, pre5dTemp: 1.25,
          nominalEok: 560.0, netEok: 397.3,
          relTurnover: 442.6, vwapPrem: 110.00, supplyIntensity: 929.5, tradeValEok: 3692.6,
          openRet: 91.40, highRet: 121.43, lowRet: 88.00, closeRet: 118.50, wickPct: 1.32,
          peakSlot: '14:30~15:30',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 44.5, price: 91.40, pattern: '실질 유통비율 15.47% · 구주 오버행 4.20% 최저 구조로 시가 +91.4% 출발' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · VWAP 돌파', vol: 21.0, price: 98.20, pattern: '미확약 차익물량 전량 흡수하며 VWAP(+110.0%) 상향 돌파' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.5, price: 104.50, pattern: '공모가 대비 +100% 돌파 및 기관 순매수 지속' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 6.2, price: 103.80, pattern: '점심 구간 +103% 고점 박스권 견조한 지지' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 7.3, price: 111.00, pattern: '연기금·운용사 패시브/액티브 편입 수요 유입으로 고점 경신' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 당일 최고가 마감', vol: 8.5, price: 118.50, pattern: '상대 회전율 442.6% · 당일 최고가(+121.43%) 근접한 +118.50% 마감' }
          ]
        },
        {
          code: '476060', name: '전진건설로봇', market: 'KOSPI', url: '',
          price: 16500, comp: 920.10, lockup: 35.80, ltLockup: 19.40,
          nominalFloatPct: 24.40, netFloatPct: 18.39, vcOverhangPct: 7.50,
          retailComp: 1087.3, retailDepTril: 8.28,
          pre5dKospi: 1.15, pre5dKosdaq: 0.90, pre5dTemp: 1.08,
          nominalEok: 430.0, netEok: 324.1,
          relTurnover: 396.1, vwapPrem: 71.50, supplyIntensity: 679.4, tradeValEok: 2201.7,
          openRet: 72.00, highRet: 82.73, lowRet: 63.03, closeRet: 65.40, wickPct: 9.49,
          peakSlot: '09:15~10:00',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 45.2, price: 72.00, pattern: '실질 유통비율 18.39% 경량 구조로 개장 직후 수급 집중' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · 당일 고점', vol: 21.8, price: 74.80, pattern: '09:15~10:00 구간 당일 최고가(+82.73%) 도달 후 차익실현 소화' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.0, price: 69.50, pattern: '오전 VWAP(+71.5%) 지지선 테스트 및 손바뀜' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 6.0, price: 67.20, pattern: '점심 거래 소강 및 +67% 구간 횡보' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 6.8, price: 66.80, pattern: '오후 기관 수급 균형 유지' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 8.2, price: 65.40, pattern: '상대 회전율 396.1% · 윗꼬리 -9.49% 수준의 +65.40% 종가 마감' }
          ]
        },
        {
          code: '462520', name: '에이치브이엠', market: 'KOSDAQ', url: '',
          price: 18000, comp: 837.20, lockup: 31.40, ltLockup: 15.80,
          nominalFloatPct: 23.50, netFloatPct: 18.52, vcOverhangPct: 11.40,
          retailComp: 960.5, retailDepTril: 5.18,
          pre5dKospi: 0.45, pre5dKosdaq: 0.72, pre5dTemp: 0.64,
          nominalEok: 480.0, netEok: 378.2,
          relTurnover: 366.7, vwapPrem: 57.80, supplyIntensity: 578.6, tradeValEok: 2188.0,
          openRet: 64.50, highRet: 72.50, lowRet: 45.00, closeRet: 48.20, wickPct: 14.09,
          peakSlot: '09:00~09:15',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · 당일 고점', vol: 46.5, price: 64.50, pattern: '개장 첫 15분 내 최고가(+72.50%) 도달 후 미확약 물량 출회' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 차익실현 · VWAP 공방', vol: 22.0, price: 61.20, pattern: '미확약(68.6%) 및 구주 오버행(11.4%) 차익실현으로 VWAP 공방' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 11.8, price: 55.40, pattern: '오전 조정을 거치며 +55% 구간 1차 지지 확인' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 5.7, price: 52.00, pattern: '거래량 감소 및 호가 수렴' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 6.2, price: 50.10, pattern: '오후 단기 매물 소화 과정' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 7.8, price: 48.20, pattern: '상대 회전율 366.7% · 윗꼬리 -14.09%, 종가 +48.20% 마감' }
          ]
        },
        {
          code: '250030', name: '진코스텍', market: 'KOSDAQ', url: '/posts/20261008-250030-진코스텍/',
          price: 11000, comp: 1097.62, lockup: 72.70, ltLockup: 34.50,
          nominalFloatPct: 58.44, netFloatPct: 45.52, vcOverhangPct: 24.80,
          retailComp: 1145.0, retailDepTril: 3.45,
          pre5dKospi: 0.30, pre5dKosdaq: 0.55, pre5dTemp: 0.48,
          nominalEok: 520.0, netEok: 405.0,
          relTurnover: 353.7, vwapPrem: 49.10, supplyIntensity: 527.3, tradeValEok: 2135.6,
          openRet: 52.30, highRet: 59.82, lowRet: 38.18, closeRet: 41.20, wickPct: 11.65,
          peakSlot: '09:15~10:00',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 43.8, price: 52.30, pattern: '장기확약(34.5%)·총확약(72.7%) 효과로 실질유통비율(45.5%) 부담 상쇄' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · 당일 고점', vol: 21.2, price: 54.00, pattern: '09:15~10:00 구간 당일 최고가(+59.82%) 형성' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.8, price: 47.80, pattern: '구주 오버행(24.8%) 물량 일부 출회 소화' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 6.4, price: 45.20, pattern: '점심 구간 +45% 선 박스권 횡보' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 7.1, price: 43.00, pattern: '오후 눌림목 지지 확인' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 8.7, price: 41.20, pattern: '상대 회전율 353.7%(명목 527.3%) 기록하며 종가 +41.20% 마감' }
          ]
        },
        {
          code: '266690', name: '덕산넵코어스', market: 'KOSDAQ', url: '/posts/20260921-266690-덕산넵코어스/',
          price: 14600, comp: 868.64, lockup: 57.26, ltLockup: 23.75,
          nominalFloatPct: 40.15, netFloatPct: 33.32, vcOverhangPct: 18.40,
          retailComp: 912.4, retailDepTril: 4.98,
          pre5dKospi: 0.60, pre5dKosdaq: 0.42, pre5dTemp: 0.47,
          nominalEok: 1106.4, netEok: 918.3,
          relTurnover: 323.4, vwapPrem: 46.16, supplyIntensity: 472.6, tradeValEok: 4339.8,
          openRet: 48.60, highRet: 53.49, lowRet: 40.48, closeRet: 43.90, wickPct: 6.25,
          peakSlot: '09:15~10:00',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 44.2, price: 48.60, pattern: '실질 유통비율 33.32%(629만 주) 중 개장 15분 만에 142.9% 상대 회전' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · 당일 고점', vol: 20.8, price: 51.20, pattern: '미확약 1차 물량 흡수하며 09:34 당일 최고가(22,410원, +53.49%) 형성' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 12.6, price: 46.80, pattern: '당일 VWAP(21,340원, 프리미엄 +46.16%) 부근 1차 지지선 확인' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 6.3, price: 45.50, pattern: '거래비중 6.3% 축소 및 VWAP 보합권 수렴' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 수급 분기 · 눌림목', vol: 7.4, price: 44.80, pattern: '오후 저점(20,510원, +40.48%) 테스트 후 저가 매수 유입' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 8.7, price: 43.90, pattern: '상대 수급강도 323.4% + VWAP 프리미엄 +46.16% = 명목 472.6% 마감' }
          ]
        },
        {
          code: '451220', name: '이노스페이스', market: 'KOSDAQ', url: '',
          price: 43300, comp: 598.90, lockup: 28.60, ltLockup: 11.20,
          nominalFloatPct: 26.10, netFloatPct: 22.01, vcOverhangPct: 14.90,
          retailComp: 1150.7, retailDepTril: 8.28,
          pre5dKospi: -0.20, pre5dKosdaq: -0.35, pre5dTemp: -0.31,
          nominalEok: 790.0, netEok: 666.0,
          relTurnover: 314.0, vwapPrem: 31.10, supplyIntensity: 411.9, tradeValEok: 2743.4,
          openRet: 38.20, highRet: 42.96, lowRet: 19.63, closeRet: 21.50, wickPct: 15.01,
          peakSlot: '09:00~09:15',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · 당일 고점', vol: 48.6, price: 38.20, pattern: '개장 15분에 거래량 48.6% 집중, 고가(+42.96%) 터치 후 매물 출회' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 차익실현 · VWAP 공방', vol: 22.4, price: 33.50, pattern: '미확약(71.4%) 및 VC 오버행(14.9%) 출회로 VWAP 하향 테스트' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 11.2, price: 28.40, pattern: '오전 매물 소화 및 +28% 선 지지 모색' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 5.4, price: 25.00, pattern: '거래량 축소 구간' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 5.6, price: 23.20, pattern: '오후 완만한 조정' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 6.8, price: 21.50, pattern: '상대 회전율 314.0% · 윗꼬리 -15.01%, 종가 +21.50% 마감' }
          ]
        },
        {
          code: '480110', name: '더본코리아', market: 'KOSPI', url: '',
          price: 34000, comp: 775.40, lockup: 19.20, ltLockup: 8.40,
          nominalFloatPct: 31.00, netFloatPct: 26.66, vcOverhangPct: 9.20,
          retailComp: 772.8, retailDepTril: 11.82,
          pre5dKospi: -0.45, pre5dKosdaq: -0.80, pre5dTemp: -0.56,
          nominalEok: 1050.0, netEok: 903.0,
          relTurnover: 341.8, vwapPrem: 19.40, supplyIntensity: 408.1, tradeValEok: 3685.7,
          openRet: 21.30, highRet: 29.00, lowRet: 12.94, closeRet: 14.80, wickPct: 11.01,
          peakSlot: '09:15~10:00',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 폭발 · VI 구간', vol: 51.8, price: 21.30, pattern: '일반청약 증거금 11.82조 모멘텀으로 개장 첫 15분 거래비중 51.8% 집중' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 소화 · 당일 고점', vol: 22.7, price: 24.00, pattern: '오전 고가(+29.00%) 기록 후 미확약(80.8%) 기관 매물 출회' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 10.5, price: 18.60, pattern: '시초가 하회 후 +18% 선 1차 지지' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 4.8, price: 16.90, pattern: '거래 소강 및 박스권 등락' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 4.6, price: 15.80, pattern: '오후 잔여 차익매물 소화' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 5.6, price: 14.80, pattern: '상대 회전율 341.8% · 윗꼬리 -11.01%, 종가 +14.80% 마감' }
          ]
        },
        {
          code: '386380', name: '스카이랩스', market: 'KOSDAQ', url: '/posts/20260831-386380-스카이랩스/',
          price: 13500, comp: 63.41, lockup: 10.93, ltLockup: 3.10,
          nominalFloatPct: 27.29, netFloatPct: 26.11, vcOverhangPct: 19.80,
          retailComp: 84.5, retailDepTril: 0.34,
          pre5dKospi: -0.60, pre5dKosdaq: -1.15, pre5dTemp: -0.99,
          nominalEok: 511.5, netEok: 489.2,
          relTurnover: 259.7, vwapPrem: 8.40, supplyIntensity: 281.7, tradeValEok: 1378.1,
          openRet: 14.50, highRet: 18.00, lowRet: 1.11, closeRet: 3.20, wickPct: 12.54,
          peakSlot: '09:00~09:15',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 수급 집중 · 당일 고점', vol: 52.4, price: 14.50, pattern: '개장 15분 내 최고가(+18.00%) 터치 후 미확약(89.1%)·VC 물량 출회' },
            { slot: '09:15~10:00', stage: '② 미확약 차익실현 · VWAP 하회', vol: 23.1, price: 11.20, pattern: '09:15~10:00 구간 VWAP 하향 이탈로 단기 조정' },
            { slot: '10:00~11:30', stage: '③ 오전 지지선 확인 · 손바뀜', vol: 10.1, price: 7.80, pattern: '공모가 상단 지지력 테스트' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 4.5, price: 5.90, pattern: '거래량 급감 구간' },
            { slot: '13:30~14:30', stage: '⑤ 오후 기관 재유입 / 분기', vol: 4.4, price: 4.50, pattern: '오후 호가 공백 속 약보합' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 5.5, price: 3.20, pattern: '상대 회전율 259.7% · 공모가 소폭 상회(+3.20%) 마감' }
          ]
        },
        {
          code: '439270', name: '크리에이츠', market: 'KOSDAQ', url: '/posts/20261023-439270-크리에이츠/',
          price: 19500, comp: 240.46, lockup: 0.50, ltLockup: 0.15,
          nominalFloatPct: 39.47, netFloatPct: 39.35, vcOverhangPct: 28.50,
          retailComp: 182.0, retailDepTril: 0.89,
          pre5dKospi: -0.85, pre5dKosdaq: -1.65, pre5dTemp: -1.41,
          nominalEok: 776.5, netEok: 774.2,
          relTurnover: 219.2, vwapPrem: -10.80, supplyIntensity: 195.6, tradeValEok: 1514.5,
          openRet: -6.80, highRet: -3.33, lowRet: -15.90, closeRet: -14.10, wickPct: 11.14,
          peakSlot: '09:00~09:15',
          buckets: [
            { slot: '09:00~09:15', stage: '① 개장 매물 출회 · 고점 형성', vol: 53.0, price: -6.80, pattern: '실질 유통비율 39.35% · VC 오버행 28.5% 부담으로 개장 직후 매물 집중' },
            { slot: '09:15~10:00', stage: '② 미확약 1차 매도 · VWAP 하회', vol: 23.6, price: -9.40, pattern: '미확약 물량 연속 출회로 낙폭 확대' },
            { slot: '10:00~11:30', stage: '③ 오전 저점 탐색 · 손바뀜', vol: 9.8, price: -11.20, pattern: '단기 투매 진정 및 지지선 모색' },
            { slot: '11:30~13:30', stage: '④ 점심 거래 소강 · 스프레드 수렴', vol: 4.2, price: -12.50, pattern: '거래대금 급감(4.2%)' },
            { slot: '13:30~14:30', stage: '⑤ 오후 수급 관망', vol: 4.3, price: -13.30, pattern: '추가 매수세 부재 속 횡보' },
            { slot: '14:30~15:30', stage: '⑥ 종가 동시호가 · 데이트레이딩 청산', vol: 5.1, price: -14.10, pattern: '상대 회전율 219.2%(VWAP -10.8%), 종가 -14.10% 마감' }
          ]
        }
      ];

      var STRATEGY_WEIGHT_PRESETS = {
        balanced: { v1: 24, v2: 20, v3: 12, v4: 14, v5: 12, v6: 10, v7: 8 },
        scarcity_overhang: { v1: 34, v2: 16, v3: 8, v4: 26, v5: 6, v6: 5, v7: 5 },
        inst_longterm: { v1: 16, v2: 30, v3: 28, v4: 10, v5: 4, v6: 8, v7: 4 },
        momentum_5d: { v1: 16, v2: 12, v3: 4, v4: 4, v5: 26, v6: 10, v7: 28 }
      };

      function normalizeWeights7(rawW) {
        var keys = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'];
        var sum = 0;
        keys.forEach(function (k) {
          sum += Math.max(0, parseFloat(rawW[k]) || 0);
        });
        if (sum <= 0) {
          rawW = STRATEGY_WEIGHT_PRESETS.balanced;
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

      function computeSimMatch(inputs, rawWeights, excludeCode) {
        var wObj = normalizeWeights7(rawWeights || STRATEGY_WEIGHT_PRESETS.balanced);
        var uW = wObj.unit;

        var tV1 = Math.max(3.0, Math.min(95.0, parseFloat(inputs.netFloatPct) || 33.32));
        var tV2 = Math.max(0.0, Math.min(100.0, parseFloat(inputs.lockup) || 57.26));
        var tV3 = Math.max(0.0, Math.min(100.0, parseFloat(inputs.ltLockup) || 23.75));
        var tV4 = Math.max(0.0, Math.min(85.0, parseFloat(inputs.vcOverhang) || 18.40));
        var tV5 = Math.max(0.0, parseFloat(inputs.retailComp) || 912.4);
        var tV6 = Math.max(0.0, parseFloat(inputs.instComp) || 868.6);
        var tV7 = parseFloat(inputs.pre5dTemp);
        if (isNaN(tV7)) tV7 = 0.47;

        var scored = HISTORICAL_IPO_DB.filter(function (c) {
          return !excludeCode || c.code !== excludeCode;
        }).map(function (c) {
          var dV1 = Math.min(1.0, Math.abs(tV1 - c.netFloatPct) / 42.0);
          var dV2 = Math.min(1.0, Math.abs(tV2 - c.lockup) / 85.0);
          var dV3 = Math.min(1.0, Math.abs(tV3 - c.ltLockup) / 50.0);
          var dV4 = Math.min(1.0, Math.abs(tV4 - c.vcOverhangPct) / 45.0);
          var dV5 = Math.min(1.0, Math.abs(tV5 - c.retailComp) / 1500.0);
          var dV6 = Math.min(1.0, Math.abs(tV6 - c.comp) / 1300.0);
          var dV7 = Math.min(1.0, Math.abs(tV7 - c.pre5dTemp) / 4.5);

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
          return b.simPct - a.simPct;
        });

        var top3 = scored.slice(0, 3);
        var wSum = top3.reduce(function (acc, x) { return acc + x.simPct; }, 0) || 1.0;

        var avgV1Top = top3.reduce(function (acc, x) { return acc + x.item.netFloatPct * x.simPct; }, 0) / wSum;
        var avgV2Top = top3.reduce(function (acc, x) { return acc + x.item.lockup * x.simPct; }, 0) / wSum;
        var avgV3Top = top3.reduce(function (acc, x) { return acc + x.item.ltLockup * x.simPct; }, 0) / wSum;
        var avgV4Top = top3.reduce(function (acc, x) { return acc + x.item.vcOverhangPct * x.simPct; }, 0) / wSum;
        var avgV5Top = top3.reduce(function (acc, x) { return acc + x.item.retailComp * x.simPct; }, 0) / wSum;
        var avgV6Top = top3.reduce(function (acc, x) { return acc + x.item.comp * x.simPct; }, 0) / wSum;
        var avgV7Top = top3.reduce(function (acc, x) { return acc + x.item.pre5dTemp * x.simPct; }, 0) / wSum;

        var baseRelTurn = top3.reduce(function (acc, x) { return acc + x.item.relTurnover * x.simPct; }, 0) / wSum;
        var baseVwapPrem = top3.reduce(function (acc, x) { return acc + x.item.vwapPrem * x.simPct; }, 0) / wSum;
        var baseOpen = top3.reduce(function (acc, x) { return acc + x.item.openRet * x.simPct; }, 0) / wSum;
        var baseHigh = top3.reduce(function (acc, x) { return acc + x.item.highRet * x.simPct; }, 0) / wSum;
        var baseClose = top3.reduce(function (acc, x) { return acc + x.item.closeRet * x.simPct; }, 0) / wSum;
        var baseWick = top3.reduce(function (acc, x) { return acc + x.item.wickPct * x.simPct; }, 0) / wSum;

        var dNetPct = avgV1Top - tV1;
        var dLk = tV2 - avgV2Top;
        var dLt = tV3 - avgV3Top;
        var dVc = avgV4Top - tV4;
        var dRet = (tV5 - avgV5Top) / 100.0;
        var dComp = (tV6 - avgV6Top) / 100.0;
        var dTemp = tV7 - avgV7Top;

        var expRelTurn = Math.max(120.0, Math.min(820.0,
          baseRelTurn + dNetPct * 4.2 + dLk * 1.1 + dLt * 0.9 + dVc * 1.8 + dRet * 2.4 + dComp * 1.5 + dTemp * 9.5
        ));
        var expOpen = Math.max(-25.0, Math.min(160.0,
          baseOpen + dNetPct * 0.65 + dLk * 0.32 + dLt * 0.28 + dVc * 0.45 + dRet * 0.85 + dComp * 0.65 + dTemp * 4.8
        ));
        var highSpread = Math.max(2.5,
          (baseHigh - baseOpen) + Math.max(0, dLk * 0.06) + Math.max(0, dLt * 0.08) + Math.max(0, dNetPct * 0.15)
        );
        var expHigh = expOpen + highSpread;
        var expWick = Math.max(1.2, Math.min(24.0,
          baseWick - dLk * 0.05 - dLt * 0.07 - dVc * 0.12 - dTemp * 0.45
        ));
        var expClose = expHigh - ((100.0 + expHigh) * (expWick / 100.0));
        var expVwapPrem = Math.max(-20.0, Math.min(145.0,
          baseVwapPrem + (expOpen - baseOpen) * 0.72 + (expClose - baseClose) * 0.28
        ));
        var expSup = expRelTurn * (1.0 + (expVwapPrem / 100.0));

        var peakSlot = '09:15~10:00';
        if (tV2 < 26.0 || tV4 >= 24.0 || expRelTurn < 265.0) {
          peakSlot = '09:00~09:15 (개장 15분 초단기 고점)';
        } else if (tV2 >= 40.0 && tV3 >= 22.0 && tV1 <= 19.0 && expRelTurn >= 410.0) {
          peakSlot = '09:15~10:00 / 14:30~15:30 (종가 고점형)';
        } else {
          peakSlot = '09:15~10:00 (미확약 1차 소화 후 고점)';
        }

        var buckets = [];
        var cumShare = 0.0;
        for (var i = 0; i < 6; i++) {
          var vShare = top3.reduce(function (acc, x) { return acc + x.item.buckets[i].vol * x.simPct; }, 0) / wSum;
          var pRatio = 0.0;
          if (i === 0) pRatio = expOpen;
          else if (i === 1) pRatio = (tV2 >= 26.0) ? expHigh : (expOpen * 0.85 + expClose * 0.15);
          else if (i === 2) pRatio = expOpen * 0.55 + expClose * 0.45;
          else if (i === 3) pRatio = expOpen * 0.35 + expClose * 0.65;
          else if (i === 4) pRatio = expOpen * 0.20 + expClose * 0.80;
          else pRatio = expClose;

          cumShare += vShare;
          var cumRelTurn = expRelTurn * (cumShare / 100.0);
          var cumSup = expSup * (cumShare / 100.0);
          buckets.push({
            slot: top3[0].item.buckets[i].slot,
            stage: top3[0].item.buckets[i].stage,
            vol: vShare,
            cumRelTurn: cumRelTurn,
            cumSup: cumSup,
            price: pRatio,
            pattern: top3[0].item.buckets[i].pattern
          });
        }

        return {
          normWeights: wObj.norm,
          top3: top3,
          expRelTurn: expRelTurn,
          expVwapPrem: expVwapPrem,
          expSup: expSup,
          expOpen: expOpen,
          expHigh: expHigh,
          expClose: expClose,
          expWick: expWick,
          peakSlot: peakSlot,
          buckets: buckets
        };
      }

      document.querySelectorAll('.quant-sim-widget').forEach(function (widget) {
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

        var kpiRelTurnEl = widget.querySelector('[data-sim-kpi="relTurnover"]');
        var kpiVwapNoteEl = widget.querySelector('[data-sim-kpi="vwapNote"]');
        var kpiRangeEl = widget.querySelector('[data-sim-kpi="openHigh"]');
        var kpiCloseEl = widget.querySelector('[data-sim-kpi="closeRet"]');
        var kpiWickEl = widget.querySelector('[data-sim-kpi="wick"]');
        var kpiPeakEl = widget.querySelector('[data-sim-kpi="peakSlot"]');
        var kpiPeakNoteEl = widget.querySelector('[data-sim-kpi="peakNote"]');
        var top3Tbody = widget.querySelector('[data-sim-top3-tbody]');
        var intradayTbody = widget.querySelector('[data-sim-intraday-tbody]');
        var prefillBanner = widget.querySelector('[data-sim-prefill-text]');
        var excludeCode = widget.getAttribute('data-exclude-code') || '';

        function setInputPair(numEl, rangeEl, val) {
          if (numEl && val !== null && val !== undefined) numEl.value = val;
          if (rangeEl && val !== null && val !== undefined) rangeEl.value = val;
        }

        function getRawWeights() {
          return {
            v1: wSliders.v1 ? parseFloat(wSliders.v1.value) : 24,
            v2: wSliders.v2 ? parseFloat(wSliders.v2.value) : 20,
            v3: wSliders.v3 ? parseFloat(wSliders.v3.value) : 12,
            v4: wSliders.v4 ? parseFloat(wSliders.v4.value) : 14,
            v5: wSliders.v5 ? parseFloat(wSliders.v5.value) : 12,
            v6: wSliders.v6 ? parseFloat(wSliders.v6.value) : 10,
            v7: wSliders.v7 ? parseFloat(wSliders.v7.value) : 8
          };
        }

        function updateSimulation() {
          var inputs = {
            netFloatPct: v1Num ? parseFloat(v1Num.value) : 33.32,
            lockup: v2Num ? parseFloat(v2Num.value) : 57.26,
            ltLockup: v3Num ? parseFloat(v3Num.value) : 23.75,
            vcOverhang: v4Num ? parseFloat(v4Num.value) : 18.40,
            retailComp: v5Num ? parseFloat(v5Num.value) : 912.4,
            instComp: v6Num ? parseFloat(v6Num.value) : 868.6,
            pre5dTemp: v7Num ? parseFloat(v7Num.value) : 0.47
          };
          var rawW = getRawWeights();
          var res = computeSimMatch(inputs, rawW, excludeCode);

          // Update normalized 100% weight badges on both weight panel and variable cards
          ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'].forEach(function (k) {
            var pctStr = res.normWeights[k].toFixed(1) + '%';
            widget.querySelectorAll('[data-norm-w="' + k + '"]').forEach(function (el) {
              el.textContent = pctStr;
            });
          });

          if (kpiRelTurnEl) kpiRelTurnEl.textContent = res.expRelTurn.toFixed(1) + '%';
          if (kpiVwapNoteEl) {
            var vpSign = res.expVwapPrem >= 0 ? '+' : '';
            kpiVwapNoteEl.innerHTML = 'VWAP 프리미엄 <strong>' + vpSign + res.expVwapPrem.toFixed(1) + '%</strong> · 명목 수급강도 <strong>' + res.expSup.toFixed(1) + '%</strong>';
          }
          if (kpiRangeEl) {
            var oSign = res.expOpen >= 0 ? '+' : '';
            var hSign = res.expHigh >= 0 ? '+' : '';
            kpiRangeEl.textContent = oSign + res.expOpen.toFixed(1) + '% → ' + hSign + res.expHigh.toFixed(1) + '%';
          }
          if (kpiCloseEl) {
            var cSign = res.expClose >= 0 ? '+' : '';
            kpiCloseEl.innerHTML = '시가 대비 고가 탄력 <strong>+' + (res.expHigh - res.expOpen).toFixed(1) + '%p</strong> · 예상 종가 <strong>' + cSign + res.expClose.toFixed(1) + '%</strong>';
          }
          if (kpiWickEl) kpiWickEl.textContent = '-' + res.expWick.toFixed(2) + '%';
          if (kpiPeakEl) kpiPeakEl.textContent = res.peakSlot.split(' ')[0];
          if (kpiPeakNoteEl) kpiPeakNoteEl.textContent = res.peakSlot;

          if (top3Tbody) {
            top3Tbody.innerHTML = res.top3.map(function (entry, idx) {
              var c = entry.item;
              var mktClass = c.market === 'KOSPI' ? 'mkt-kospi' : 'mkt-kosdaq';
              var nameHtml = c.url ? ('<a href="' + c.url + '"><strong>' + c.name + '</strong></a>') : ('<strong>' + c.name + '</strong>');
              var oStr = (c.openRet >= 0 ? '+' : '') + c.openRet.toFixed(2) + '%';
              var hStr = (c.highRet >= 0 ? '+' : '') + c.highRet.toFixed(2) + '%';
              var cStr = (c.closeRet >= 0 ? '+' : '') + c.closeRet.toFixed(2) + '%';
              var vpStr = (c.vwapPrem >= 0 ? '+' : '') + c.vwapPrem.toFixed(1) + '%';
              return (
                '<tr>' +
                  '<td><span class="sim-score-pill">#' + (idx + 1) + ' · ' + entry.simPct.toFixed(1) + '%</span></td>' +
                  '<td>' + nameHtml + ' (<code>' + c.code + '</code>) <span class="mkt-pill ' + mktClass + '">' + c.market + '</span></td>' +
                  '<td class="num"><strong>' + c.netFloatPct.toFixed(2) + '%</strong> <span style="color:var(--subtle);font-size:0.75rem;">(VC ' + c.vcOverhangPct.toFixed(1) + '%)</span></td>' +
                  '<td class="num"><strong>' + c.lockup.toFixed(1) + '%</strong> <span style="color:var(--subtle);font-size:0.75rem;">(장기 ' + c.ltLockup.toFixed(1) + '%)</span></td>' +
                  '<td class="num"><strong style="color:var(--navy);">' + c.relTurnover.toFixed(1) + '%</strong> <span style="color:var(--subtle);font-size:0.75rem;">(VWAP ' + vpStr + ' · 명목 ' + c.supplyIntensity.toFixed(0) + '%)</span></td>' +
                  '<td class="num">' + oStr + ' → <strong class="pos-val">' + hStr + '</strong> → ' + cStr + '</td>' +
                  '<td class="num neg-val">-' + c.wickPct.toFixed(2) + '%</td>' +
                  '<td style="font-family:var(--font-mono);font-weight:700;color:var(--navy);">' + c.peakSlot + '</td>' +
                '</tr>'
              );
            }).join('');
          }

          if (intradayTbody) {
            intradayTbody.innerHTML = res.buckets.map(function (b) {
              var barW = Math.min(100, Math.round((b.vol / 55.0) * 100));
              var pSign = b.price >= 0 ? '+' : '';
              var pClass = b.price >= 0 ? 'pos-val' : 'neg-val';
              return (
                '<tr>' +
                  '<td style="font-family:var(--font-mono);font-weight:700;color:var(--navy);white-space:nowrap;">' + b.slot + '</td>' +
                  '<td style="font-weight:600;white-space:nowrap;">' + b.stage + '</td>' +
                  '<td class="vol-bar-cell"><div class="vol-bar-wrap"><div class="vol-bar-track"><div class="vol-bar-fill" style="width:' + barW + '%;"></div></div><span class="vol-bar-num">' + b.vol.toFixed(1) + '%</span></div></td>' +
                  '<td style="text-align:right;font-family:var(--font-mono);font-weight:700;color:var(--navy);white-space:nowrap;">' + b.cumRelTurn.toFixed(1) + '% <span style="color:var(--subtle);font-size:0.75rem;">(명목 ' + b.cumSup.toFixed(0) + '%)</span></td>' +
                  '<td style="text-align:right;font-family:var(--font-mono);white-space:nowrap;" class="' + pClass + '">' + pSign + b.price.toFixed(2) + '%</td>' +
                  '<td style="color:var(--text-body);font-size:0.82rem;">' + b.pattern + '</td>' +
                '</tr>'
              );
            }).join('');
          }
        }

        [
          [v1Num, v1Range],
          [v2Num, v2Range],
          [v3Num, v3Range],
          [v4Num, v4Range],
          [v5Num, v5Range],
          [v6Num, v6Range],
          [v7Num, v7Range]
        ].forEach(function (pair) {
          var nEl = pair[0];
          var rEl = pair[1];
          if (nEl && rEl) {
            nEl.addEventListener('input', function () {
              rEl.value = nEl.value;
              updateSimulation();
            });
            rEl.addEventListener('input', function () {
              nEl.value = rEl.value;
              updateSimulation();
            });
          }
        });

        Object.keys(wSliders).forEach(function (k) {
          var sEl = wSliders[k];
          if (sEl) {
            sEl.addEventListener('input', function () {
              widget.querySelectorAll('[data-weight-preset]').forEach(function (b) {
                b.classList.remove('is-active');
              });
              updateSimulation();
            });
          }
        });

        widget.querySelectorAll('[data-weight-preset]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var pKey = btn.getAttribute('data-weight-preset');
            var preset = STRATEGY_WEIGHT_PRESETS[pKey] || STRATEGY_WEIGHT_PRESETS.balanced;
            widget.querySelectorAll('[data-weight-preset]').forEach(function (b) {
              b.classList.toggle('is-active', b === btn);
            });
            Object.keys(wSliders).forEach(function (k) {
              if (wSliders[k] && preset[k] !== undefined) {
                wSliders[k].value = preset[k];
              }
            });
            updateSimulation();
          });
        });

        widget.querySelectorAll('[data-sim-preset]').forEach(function (chip) {
          chip.addEventListener('click', function () {
            widget.querySelectorAll('[data-sim-preset]').forEach(function (c) {
              c.classList.toggle('is-active', c === chip);
            });
            setInputPair(v1Num, v1Range, chip.getAttribute('data-v1'));
            setInputPair(v2Num, v2Range, chip.getAttribute('data-v2'));
            setInputPair(v3Num, v3Range, chip.getAttribute('data-v3'));
            setInputPair(v4Num, v4Range, chip.getAttribute('data-v4'));
            setInputPair(v5Num, v5Range, chip.getAttribute('data-v5'));
            setInputPair(v6Num, v6Range, chip.getAttribute('data-v6'));
            setInputPair(v7Num, v7Range, chip.getAttribute('data-v7'));
            excludeCode = chip.getAttribute('data-exclude') || '';
            updateSimulation();
          });
        });

        // Auto-prefill from current single post page when data-auto-prefill-post="true"
        if (widget.getAttribute('data-auto-prefill-post') === 'true') {
          var titleText = (document.querySelector('.article-header h1') || {}).textContent || '';
          var leadText = (document.querySelector('.article-lead') || {}).textContent || '';
          var proseText = (document.querySelector('.prose') || {}).textContent || '';
          var combined = titleText + ' ' + leadText + ' ' + proseText;

          var codeMatch = titleText.match(/\(([0-9A-Za-z]{6})\)/);
          var detectedCode = codeMatch ? codeMatch[1].toUpperCase() : '';
          var corpName = (titleText.split('공모주')[0] || '본 리포트 종목').trim();

          var known = HISTORICAL_IPO_DB.find(function (x) { return x.code === detectedCode; });
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
              prefillBanner.innerHTML = '🎯 <strong>[' + known.name + ' (' + known.code + ')]</strong> 7대 상대값 변수 자동 프리셋 완료 (V1 실질유통비율 ' + known.netFloatPct.toFixed(2) + '% · V2 최종확약 ' + known.lockup.toFixed(2) + '% · V3 장기확약 ' + known.ltLockup.toFixed(2) + '% · V4 구주오버행 ' + known.vcOverhangPct.toFixed(1) + '% · V5 일반청약 ' + known.retailComp.toFixed(1) + ':1 · V6 기관경쟁률 ' + known.comp.toFixed(1) + ':1 · V7 5일 지수온도 ' + (known.pre5dTemp >= 0 ? '+' : '') + known.pre5dTemp.toFixed(2) + '%)';
            }
          } else {
            var cM = combined.match(/([\d,]+(?:\.\d+)?)\s*:\s*1/);
            var lM = combined.match(/확약[^\d]{0,16}([\d.]+)\s*%/);
            var flM = combined.match(/유통물량\s*비율[^\d]{0,16}([\d.]+)\s*%/) || combined.match(/유통[^\d]{0,12}([\d.]+)\s*%/);

            var cVal = cM ? parseFloat(cM[1].replace(/,/g, '')) : 850.0;
            var lVal = lM ? parseFloat(lM[1]) : 35.0;
            var nomFlPct = flM ? parseFloat(flM[1]) : 30.0;
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
            setInputPair(v7Num, v7Range, 0.47);
            excludeCode = detectedCode;
            if (prefillBanner) {
              prefillBanner.innerHTML = '🎯 <strong>[' + corpName + (detectedCode ? ' (' + detectedCode + ')' : '') + ']</strong> 리포트 7대 상대값 변수 자동 프리셋 완료 (V1 실질유통비율 ' + netFlPct.toFixed(2) + '% · V2 최종확약 ' + lVal.toFixed(2) + '% · V3 장기확약 ' + ltVal.toFixed(2) + '% · V4 구주오버행 ' + vcVal.toFixed(1) + '% · V6 기관경쟁률 ' + cVal.toFixed(1) + ':1)';
            }
          }
        }

        updateSimulation();
      });
    })();
