(() => {
  "use strict";

  // Small DOM helpers keep the interface code concise without a framework.
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const HISTORY_KEY = "world-pulse.matches.v1";
  const COLORS = [
    "#79c7a2",
    "#df9c68",
    "#809edc",
    "#d57c78",
    "#c4a16b",
    "#b181c7",
    "#69b8c1",
    "#c4c96e",
  ];

  // Fixed world data. Each region is a node, and `edges` defines legal adjacency.
  const nations = [
    {
      id: "atlantic",
      name: "대서양 연방",
      short: "대서양",
      style: "외교주의",
      motto: "균형을 협상한다",
      capital: "east",
      start: ["east", "plains"],
    },
    {
      id: "amazon",
      name: "아마존 연맹",
      short: "아마존",
      style: "방어주의",
      motto: "밀림의 경계를 지킨다",
      capital: "brazil",
      start: ["brazil", "andes"],
    },
    {
      id: "europa",
      name: "유럽 협약국",
      short: "유럽",
      style: "기회주의",
      motto: "분열 속 기회를 찾는다",
      capital: "west_europe",
      start: ["west_europe", "scandinavia"],
    },
    {
      id: "northern",
      name: "북방 동맹",
      short: "북방",
      style: "팽창주의",
      motto: "새로운 국경을 연다",
      capital: "east_europe",
      start: ["east_europe", "siberia"],
    },
    {
      id: "indus",
      name: "인더스 공화국",
      short: "인더스",
      style: "고립주의",
      motto: "성장을 먼저 택한다",
      capital: "india",
      start: ["india", "central_asia"],
    },
    {
      id: "celestial",
      name: "천하 연합",
      short: "천하",
      style: "패권주의",
      motto: "동방의 질서를 세운다",
      capital: "china",
      start: ["china", "korea"],
    },
    {
      id: "pacific",
      name: "태평양 동맹",
      short: "태평양",
      style: "외교주의",
      motto: "바다를 잇는다",
      capital: "japan",
      start: ["japan", "se_asia"],
    },
    {
      id: "sahel",
      name: "사헬 연합",
      short: "사헬",
      style: "방어주의",
      motto: "자원의 길을 지킨다",
      capital: "west_africa",
      start: ["west_africa", "congo"],
    },
  ];
  const regions = [
    {
      id: "alaska",
      name: "알래스카",
      x: 125,
      y: 140,
      terrain: "산악",
      income: 1,
      people: 1,
    },
    {
      id: "pacific_nw",
      name: "태평양 북서부",
      x: 175,
      y: 195,
      terrain: "해안",
      income: 1,
      people: 1,
    },
    {
      id: "california",
      name: "캘리포니아",
      x: 165,
      y: 260,
      terrain: "해안",
      income: 2,
      people: 1,
    },
    {
      id: "plains",
      name: "대평원",
      x: 245,
      y: 220,
      terrain: "평야",
      income: 2,
      people: 2,
    },
    {
      id: "caribbean",
      name: "카리브",
      x: 300,
      y: 305,
      terrain: "해안",
      income: 1,
      people: 1,
    },
    {
      id: "east",
      name: "동부 해안",
      x: 315,
      y: 220,
      terrain: "해안",
      income: 2,
      people: 2,
    },
    {
      id: "greenland",
      name: "그린란드",
      x: 385,
      y: 112,
      terrain: "산악",
      income: 1,
      people: 1,
    },
    {
      id: "andes",
      name: "안데스",
      x: 325,
      y: 385,
      terrain: "산악",
      income: 1,
      people: 1,
    },
    {
      id: "amazon",
      name: "아마존",
      x: 390,
      y: 355,
      terrain: "평야",
      income: 2,
      people: 2,
    },
    {
      id: "brazil",
      name: "브라질 고원",
      x: 420,
      y: 400,
      terrain: "평야",
      income: 3,
      people: 2,
    },
    {
      id: "plata",
      name: "라플라타",
      x: 385,
      y: 455,
      terrain: "평야",
      income: 2,
      people: 1,
    },
    {
      id: "west_europe",
      name: "서유럽",
      x: 505,
      y: 190,
      terrain: "평야",
      income: 3,
      people: 2,
    },
    {
      id: "scandinavia",
      name: "스칸디나비아",
      x: 535,
      y: 130,
      terrain: "산악",
      income: 2,
      people: 1,
    },
    {
      id: "east_europe",
      name: "동유럽",
      x: 580,
      y: 205,
      terrain: "평야",
      income: 2,
      people: 2,
    },
    {
      id: "mediterranean",
      name: "지중해",
      x: 535,
      y: 270,
      terrain: "해안",
      income: 2,
      people: 1,
    },
    {
      id: "sahara",
      name: "사하라",
      x: 510,
      y: 335,
      terrain: "평야",
      income: 1,
      people: 1,
    },
    {
      id: "west_africa",
      name: "서아프리카",
      x: 495,
      y: 390,
      terrain: "해안",
      income: 2,
      people: 2,
    },
    {
      id: "congo",
      name: "콩고 분지",
      x: 560,
      y: 415,
      terrain: "평야",
      income: 2,
      people: 2,
    },
    {
      id: "cape",
      name: "희망봉",
      x: 555,
      y: 480,
      terrain: "해안",
      income: 2,
      people: 1,
    },
    {
      id: "siberia",
      name: "시베리아",
      x: 680,
      y: 145,
      terrain: "산악",
      income: 2,
      people: 1,
    },
    {
      id: "central_asia",
      name: "중앙아시아",
      x: 665,
      y: 225,
      terrain: "평야",
      income: 1,
      people: 1,
    },
    {
      id: "middle_east",
      name: "중동",
      x: 635,
      y: 290,
      terrain: "평야",
      income: 3,
      people: 1,
    },
    {
      id: "india",
      name: "인도",
      x: 700,
      y: 330,
      terrain: "평야",
      income: 3,
      people: 2,
    },
    {
      id: "china",
      name: "중국",
      x: 760,
      y: 235,
      terrain: "평야",
      income: 3,
      people: 2,
    },
    {
      id: "korea",
      name: "한반도",
      x: 815,
      y: 230,
      terrain: "산악",
      income: 2,
      people: 1,
    },
    {
      id: "japan",
      name: "일본",
      x: 855,
      y: 250,
      terrain: "해안",
      income: 3,
      people: 1,
    },
    {
      id: "se_asia",
      name: "동남아",
      x: 790,
      y: 325,
      terrain: "해안",
      income: 2,
      people: 2,
    },
    {
      id: "indonesia",
      name: "인도네시아",
      x: 830,
      y: 385,
      terrain: "해안",
      income: 2,
      people: 1,
    },
    {
      id: "australia",
      name: "오스트레일리아",
      x: 850,
      y: 450,
      terrain: "평야",
      income: 3,
      people: 1,
    },
    {
      id: "new_zealand",
      name: "뉴질랜드",
      x: 920,
      y: 485,
      terrain: "해안",
      income: 1,
      people: 1,
    },
  ];
  const edges = [
    ["alaska", "pacific_nw"],
    ["alaska", "greenland"],
    ["pacific_nw", "california"],
    ["pacific_nw", "plains"],
    ["california", "plains"],
    ["california", "caribbean"],
    ["plains", "east"],
    ["plains", "caribbean"],
    ["east", "caribbean"],
    ["east", "greenland"],
    ["caribbean", "andes"],
    ["caribbean", "amazon"],
    ["andes", "amazon"],
    ["andes", "plata"],
    ["amazon", "brazil"],
    ["brazil", "plata"],
    ["greenland", "scandinavia"],
    ["scandinavia", "west_europe"],
    ["scandinavia", "east_europe"],
    ["west_europe", "east_europe"],
    ["west_europe", "mediterranean"],
    ["east_europe", "mediterranean"],
    ["east_europe", "central_asia"],
    ["mediterranean", "sahara"],
    ["mediterranean", "middle_east"],
    ["sahara", "west_africa"],
    ["sahara", "congo"],
    ["west_africa", "congo"],
    ["congo", "cape"],
    ["cape", "brazil"],
    ["sahara", "middle_east"],
    ["east_europe", "siberia"],
    ["siberia", "central_asia"],
    ["siberia", "china"],
    ["central_asia", "middle_east"],
    ["central_asia", "china"],
    ["middle_east", "india"],
    ["india", "china"],
    ["india", "se_asia"],
    ["china", "korea"],
    ["korea", "japan"],
    ["china", "se_asia"],
    ["se_asia", "indonesia"],
    ["indonesia", "australia"],
    ["australia", "new_zealand"],
    ["japan", "se_asia"],
    ["pacific_nw", "japan"],
    ["east", "west_europe"],
    ["plata", "cape"],
    ["greenland", "west_europe"],
    ["california", "japan"],
    ["brazil", "west_africa"],
  ];
  const adjacency = Object.fromEntries(regions.map((r) => [r.id, []]));
  edges.forEach(([a, b]) => {
    adjacency[a].push(b);
    adjacency[b].push(a);
  });
  const regionById = Object.fromEntries(regions.map((r) => [r.id, r]));
  const terrainBonus = { 평야: 0, 해안: 0, 산악: 1 };
  const events = [
    {
      name: "세계 경기 둔화",
      desc: "교역 위축으로 모든 세력의 자금 수입이 줄었습니다.",
      type: "cash",
      value: -1,
    },
    {
      name: "신규 자원 발견",
      desc: "전략 자원이 발견되어 보유 지역의 수입이 늘었습니다.",
      type: "bonus",
      value: 2,
    },
    {
      name: "국경 긴장",
      desc: "강대국들의 경계가 높아져 외교 관계가 흔들립니다.",
      type: "tension",
      value: -8,
    },
    {
      name: "평화 정상회담",
      desc: "대화의 기류가 살아나 전쟁 중이 아닌 국가들의 관계가 개선됩니다.",
      type: "thaw",
      value: 7,
    },
    {
      name: "분리 독립 운동",
      desc:
        "한 지역에서 독립 운동이 일어났습니다. 통치 세력은 영향력을 잃습니다.",
      type: "revolt",
      value: 1,
    },
    {
      name: "군수 산업 호황",
      desc: "군수 산업의 호황으로 모든 세력이 병력을 보충했습니다.",
      type: "army",
      value: 1,
    },
    {
      name: "해상 봉쇄",
      desc: "주요 항로의 혼란으로 해안 지역의 교역이 줄었습니다.",
      type: "blockade",
      value: -1,
    },
    {
      name: "국경 분쟁",
      desc: "접경 지역의 우발 충돌로 양측 관계가 급격히 나빠졌습니다.",
      type: "border",
      value: -16,
    },
    {
      name: "기술 협력",
      desc: "국제 협력의 성과로 각 세력에 자금이 유입됩니다.",
      type: "cash",
      value: 2,
    },
    {
      name: "난민 위기",
      desc: "난민 이동으로 각국의 인력이 부족해졌습니다.",
      type: "people",
      value: -1,
    },
    {
      name: "지역 안정화",
      desc: "긴장이 완화되고 내정의 안정이 회복됩니다.",
      type: "stability",
      value: 1,
    },
    {
      name: "군비 경쟁",
      desc: "주변국들이 군사력을 늘리며 불안한 균형이 만들어집니다.",
      type: "armsrace",
      value: 1,
    },
  ];

  // Runtime state and deterministic randomness. A seed reproduces the same setup.
  let game = null,
    mapScale = 1,
    mapPanX = 0,
    mapPanY = 0,
    selectedRegion = null,
    toastTimer;
  let random = Math.random;
  function seeded(seed) {
    let h = 2166136261;
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    let a = h >>> 0;
    return () => {
      a += 0x6D2B79F5;
      let t = a;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function createNationOptions() {
    $("#nation-choice").innerHTML = nations.map((n, i) =>
      `<option value="${n.id}">${n.name} · ${n.style}</option>`
    ).join("");
  }
  function newSeed() {
    $("#seed-input").value = Math.random().toString(36).slice(2, 9)
      .toUpperCase();
  }
  function faction(id) {
    return game.factions.find((f) => f.id === id);
  }
  function owns(f) {
    return regions.filter((r) => game.owners[r.id] === f.id);
  }
  function relationKey(a, b) {
    return [a, b].sort().join("|");
  }
  function relation(a, b) {
    return game.relations[relationKey(a, b)] || 0;
  }
  function isWar(a, b) {
    return game.wars.includes(relationKey(a, b));
  }
  function isAlly(a, b) {
    return (game.alliances[relationKey(a, b)] || 0) >= game.turn;
  }
  function neighbours(id, ownerFilter) {
    return adjacency[id].map((k) => regionById[k]).filter((r) =>
      ownerFilter === undefined || game.owners[r.id] === ownerFilter
    );
  }
  function player() {
    return faction(game.playerId);
  }
  function pushLog(text, type = "normal", turn = game.turn) {
    game.log.unshift({ text, type, turn });
    if (game.log.length > 80) game.log.length = 80;
  }
  function snapshotResources(f) {
    return {
      cash: f.cash,
      people: f.people,
      army: f.army,
      territories: owns(f).length,
    };
  }
  function addTurnSample() {
    const sample = {
      turn: game.turn,
      at: new Date().toISOString(),
      player: snapshotResources(player()),
      factions: game.factions.map((f) => ({
        id: f.id,
        ...snapshotResources(f),
      })),
      actionCount: game.actionsThisTurn.length,
      actions: game.actionsThisTurn.map((a) => ({ ...a })),
      event: null,
      battles: [],
      diplomacy: [],
    };
    game.turnSamples.push(sample);
    return sample;
  }

  // New-match setup and map rendering.
  function startGame() {
    mapScale = 1;
    mapPanX = 0;
    mapPanY = 0;
    const seed = $("#seed-input").value.trim() ||
      "PULSE-" + Date.now().toString(36).toUpperCase();
    random = seeded(seed);
    const playerId = $("#nation-choice").value, goal = $("#goal-choice").value;
    const factions = nations.map((n, i) => ({
      id: n.id,
      name: n.name,
      short: n.short,
      style: n.style,
      motto: n.motto,
      capital: n.capital,
      color: COLORS[i],
      cash: 5 + Math.floor(random() * 3),
      people: 5 + Math.floor(random() * 2),
      army: 4 + Math.floor(random() * 3),
      stability: 4,
      goal: pick(["secure", "expand", "balance", "survive"]),
      alive: true,
      hegTurns: 0,
    }));
    const owners = {};
    regions.forEach((r) => owners[r.id] = null);
    factions.forEach((f) => {
      const n = nations.find((x) => x.id === f.id);
      n.start.forEach((id) => owners[id] = f.id);
    });
    const relations = {};
    for (let i = 0; i < factions.length; i++) {
      for (let j = i + 1; j < factions.length; j++) {
        relations[relationKey(factions[i].id, factions[j].id)] = Math.round(
          random() * 48 - 15,
        );
      }
    }
    game = {
      version: 1,
      balanceVersion: "0.2.0",
      seed,
      playerId,
      goal,
      turn: 1,
      maxTurns: 12,
      startedAt: new Date().toISOString(),
      endedAt: null,
      factions,
      owners,
      relations,
      alliances: {},
      wars: [],
      forts: {},
      developed: {},
      log: [],
      turnSamples: [],
      actionsThisTurn: [],
      pendingOrder: null,
      pendingVisuals: [],
      selected: null,
      ended: false,
      finish: null,
      eventQueue: events.map((_, i) => i).sort(() => random() - .5),
    };
    game.factions.forEach((f) => game.owners[f.capital] = f.id);
    selectedRegion = player().capital;
    game.selected = selectedRegion;
    game.initialState = {
      owners: { ...game.owners },
      relations: { ...game.relations },
      factions: game.factions.map((f) => ({
        id: f.id,
        style: f.style,
        cash: f.cash,
        people: f.people,
        army: f.army,
        capital: f.capital,
      })),
      eventOrder: game.eventQueue.map((i) => events[i].name),
      regions: regions.map((r) => ({
        id: r.id,
        income: r.income,
        people: r.people,
        terrain: r.terrain,
      })),
    };
    pushLog(
      `${player().name}이(가) 새 세계에 진입했습니다. 시드 ${seed}.`,
      "player",
    );
    const opening = addTurnSample();
    opening.playerStart = snapshotResources(player());
    $("#setup").classList.add("hidden");
    $("#records").classList.add("hidden");
    $("#game").classList.remove("hidden");
    renderAll();
  }
  function buildMapArt() {
    const art = $("#map-art");
    art.innerHTML =
      `<path d="M55 118 L90 80 160 72 205 92 257 78 304 99 325 128 304 158 279 169 266 199 240 210 229 251 204 263 189 242 169 222 145 220 128 188 97 181 78 153Z"/><path d="M280 277 L318 273 352 285 376 313 369 345 386 368 375 404 356 438 339 464 320 446 320 414 305 387 309 356 292 329Z"/><path d="M474 143 L495 124 528 116 547 128 558 155 544 177 526 181 519 204 500 211 483 195Z"/><path d="M489 224 L518 211 552 215 573 238 561 266 543 282 538 310 517 320 493 300 478 272Z"/><path d="M516 320 L552 299 581 308 598 334 589 371 601 404 583 440 568 475 545 470 532 439 516 417 501 384 508 350Z"/><path d="M567 122 L611 100 684 82 757 86 814 101 874 117 912 145 897 171 862 174 849 196 823 201 816 227 785 234 766 214 739 222 720 203 686 207 663 182 628 189 606 171 576 163Z"/><path d="M622 219 L658 202 686 212 694 240 679 268 658 280 633 267 614 245Z"/><path d="M673 284 L704 266 733 274 751 305 740 339 715 351 690 330 680 309Z"/><path d="M768 240 L794 226 821 238 826 263 810 283 787 278Z"/><path d="M769 301 L797 288 828 304 843 331 827 354 802 353 784 336Z"/><path d="M809 367 L849 353 891 370 909 404 891 438 865 455 832 444 811 416Z"/><path d="M899 457 L923 448 944 466 935 493 914 501 899 483Z" class="ice"/><path d="M345 66 L378 56 409 68 421 91 407 111 376 113 353 100Z" class="ice"/>`;
  }
  function renderMap() {
    buildMapArt();
    $("#map-links").innerHTML = edges.map(([a, b]) => {
      const ra = regionById[a],
        rb = regionById[b],
        w = game.owners[a] && game.owners[b] &&
          isWar(game.owners[a], game.owners[b]);
      return `<line class="map-link ${
        Math.abs(ra.x - rb.x) > 150 ? "sea" : ""
      } ${
        w ? "war" : ""
      }" x1="${ra.x}" y1="${ra.y}" x2="${rb.x}" y2="${rb.y}"/>`;
    }).join("");
    $("#map-regions").innerHTML = regions.map((r) => {
      const owner = game.owners[r.id],
        f = owner ? faction(owner) : null,
        sel = r.id === selectedRegion,
        cap = f && f.capital === r.id;
      return `<g class="region ${sel ? "selected" : ""} ${
        cap ? "capital" : ""
      }" data-region="${r.id}" tabindex="0" role="button" aria-label="${r.name}, ${
        f?.name || "중립"
      }"><circle class="region-ring" cx="${r.x}" cy="${r.y}" r="12"/><circle class="region-dot" cx="${r.x}" cy="${r.y}" r="7" fill="${
        f ? f.color : "#647579"
      }"/><text x="${r.x}" y="${r.y + 22}">${r.name}</text></g>`;
    }).join("");
    $$("#map-regions .region").forEach((el) => {
      el.addEventListener("click", () => selectRegion(el.dataset.region));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectRegion(el.dataset.region);
        }
      });
    });
    $("#map-legend").innerHTML = game.factions.map((f) =>
      `<span class="legend-faction"><i style="background:${f.color}"></i>${f.short}</span>`
    ).join("");
    $("#world-status").textContent = `세력 ${
      game.factions.filter((f) => owns(f).length).length
    } · 분쟁 ${game.wars.length}`;
    applyMapTransform();
    animatePendingMapEffects();
  }
  function renderResources() {
    const p = player();
    const growth = owns(p).reduce((s, r) => s + r.income, 0);
    $("#resource-strip").innerHTML = [["자금", "cash", growth], [
      "인력",
      "people",
      owns(p).reduce((s, r) => s + r.people, 0),
    ], ["군사력", "army", 0]].map(([label, key, delta]) =>
      `<div class="resource"><small>${label}</small><strong>${p[key]}</strong>${
        delta ? `<span class="res-delta">+${delta}</span>` : ""
      }</div>`
    ).join("");
    $("#turn-label").innerHTML = `TURN ${
      String(game.turn).padStart(2, "0")
    } <i>/ ${game.maxTurns}</i>`;
    $("#turn-progress").style.width = `${
      Math.min(100, game.turn / game.maxTurns * 100)
    }%`;
    $("#war-count").textContent = game.wars.length;
    $("#log-count").textContent = game.log.length;
    const count = readHistory().length;
    $("#record-count").textContent = count;
    $("#header-record-count").textContent = count;
  }
  function selectRegion(id) {
    if (game.ended) return;
    selectedRegion = id;
    game.selected = id;
    renderMap();
    renderCommand();
  }

  // Panels and controls. Player actions are staged as orders until turn end.
  function goalTitle() {
    return {
      influence: "영향력",
      hegemony: "패권",
      diplomacy: "외교",
      survival: "생존",
    }[game.goal];
  }
  function goalText() {
    return {
      influence: "7개 지역을 확보하면 즉시 승리합니다.",
      hegemony: "군사력 1위 상태를 2턴 유지하면 승리합니다.",
      diplomacy: "우호 세력과 합쳐 지역 12곳을 확보하면 승리합니다.",
      survival: "수도를 지키고 12턴을 마치면 생존 승리입니다.",
    }[game.goal];
  }
  function actionButton(icon, title, desc, cost, kind, disabled = false) {
    return `<button class="action-card ${
      game.pendingOrder?.type === kind ? "order-selected" : ""
    }" data-action="${kind}" ${
      disabled || game.actionsThisTurn.length ? "disabled" : ""
    }><span class="action-icon">${icon}</span><span><strong>${title}</strong><small>${desc}</small></span><span class="action-cost">${
      game.pendingOrder?.type === kind ? "선택됨" : cost
    }</span></button>`;
  }
  function renderCommand() {
    const p = player(),
      r = regionById[selectedRegion],
      owner = game.owners[r.id],
      of = owner ? faction(owner) : null,
      actionUsed = game.actionsThisTurn.length > 0;
    const own = owner === p.id;
    let acts = "";
    if (own) {
      acts += actionButton(
        "✦",
        "병력 보강",
        "군사력 +2 · 인력 +1",
        "자금 2",
        "recruit",
        p.cash < 2 || p.people < 1,
      );
      acts += actionButton(
        "⌂",
        "지역 개발",
        `${r.name} 수입 +1`,
        `자금 3`,
        "develop",
        p.cash < 3,
      );
      const targets = neighbours(r.id).filter((x) =>
        game.owners[x.id] !== p.id && !isAlly(p.id, game.owners[x.id] || "")
      );
      if (targets.length) {
        acts += actionButton(
          "⚔",
          "국경 공격",
          `${targets.length}개 인접 지역 중 선택`,
          "인력 1",
          "attack",
          p.people < 1,
        );
      }
    } else {
      acts += actionButton(
        "◇",
        "외교 제안",
        "관계가 좋은 주변 세력에 협정 제안",
        "행동 1회",
        "diplomacy",
        !owner || isWar(p.id, owner) || isAlly(p.id, owner),
      );
      acts +=
        `<p class="action-note">내 지역을 선택하면 병력 보강·개발·인접 지역 공격을 할 수 있습니다.</p>`;
    }
    const orderLabel = game.pendingOrder
      ? describeOrder(game.pendingOrder)
      : "";
    $("#command-panel").innerHTML =
      `<div class="section-kicker">YOUR FACTION · TURN ${
        String(game.turn).padStart(2, "0")
      }</div><div class="faction-title"><span class="faction-seal" style="background:${p.color}">${
        p.short.slice(0, 1)
      }</span><div><h2>${p.name}</h2><small>${p.style} · “${p.motto}”</small></div></div><div class="objective-card"><small>국가 목표 · ${goalTitle()}</small><strong>${goalDescription()}</strong><p>${goalText()}</p></div><div class="mini-stats"><div class="mini-stat"><small>통치 지역</small><strong>${
        owns(p).length
      }</strong></div><div class="mini-stat"><small>전쟁</small><strong>${
        game.wars.filter((k) => k.split("|").includes(p.id)).length
      }</strong></div><div class="mini-stat"><small>안정도</small><strong>${p.stability}/6</strong></div></div><div class="section-kicker">선택한 지역</div><div class="selected-card"><div class="selected-head"><h3>${r.name}</h3><span class="region-tag">${
        of ? of.short : "중립"
      }</span></div><div class="selected-sub">${r.terrain}${
        r.id === p.capital ? " · 수도" : ""
      }${
        game.forts[r.id] ? " · 요새" : ""
      }</div><div class="region-facts"><span>수입<b>+${
        r.income + (game.developed[r.id] || 0)
      }</b></span><span>인력<b>+${r.people}</b></span><span>방어<b>+${
        terrainBonus[r.terrain] + (game.forts[r.id] || 0)
      }</b></span></div></div>${
        game.pendingOrder
          ? `<div class="pending-order"><div><small>대기 중인 명령 · 턴 마감 때 실행</small><strong>${orderLabel}</strong></div><button id="cancel-order" class="tiny-btn">취소</button></div>`
          : ""
      }<div class="action-title">${
        own ? "이 지역에서 할 행동" : "가능한 행동"
      } · 턴당 1회</div><div class="action-list">${
        acts ||
        '<div class="empty-state">이 지역에서 가능한 행동이 없습니다.<br>다른 지역을 선택해 보세요.</div>'
      }</div>${
        actionUsed
          ? '<p class="action-note">이번 턴 명령이 처리됐습니다.</p>'
          : game.pendingOrder
          ? '<p class="action-note">다른 행동을 선택하면 명령을 바꿀 수 있습니다.</p>'
          : '<p class="action-note">행동을 고르고 턴 마감을 눌러야 실행됩니다.</p>'
      }`;
    $$("#command-panel [data-action]").forEach((b) =>
      b.addEventListener("click", () => doAction(b.dataset.action))
    );
    const cancel = $("#cancel-order");
    if (cancel) {
      cancel.onclick = () => {
        game.pendingOrder = null;
        renderAll();
      };
    }
  }
  function goalDescription() {
    return {
      influence: "대륙의 교차점에서 영향력을 넓히세요",
      hegemony: "힘의 균형을 뒤집고 우위를 지키세요",
      diplomacy: "협력으로 더 큰 세력을 이루세요",
      survival: "흔들리는 세계에서 수도를 지키세요",
    }[game.goal];
  }
  function renderDiplomacy() {
    const p = player();
    $("#diplomacy-panel").innerHTML =
      `<div class="section-kicker">RELATIONS · ${
        game.wars.filter((k) => k.split("|").includes(p.id)).length
      } ACTIVE CONFLICTS</div><p class="action-note">세력과의 관계, 동맹, 전쟁을 확인하고 제안할 수 있습니다.</p>` +
      game.factions.filter((f) => f.id !== p.id).map((f) => {
        const rel = relation(p.id, f.id),
          war = isWar(p.id, f.id),
          ally = isAlly(p.id, f.id),
          n = owns(f).length;
        return `<div class="nation-row"><i class="nation-swatch" style="background:${f.color}"></i><div><strong>${f.name}</strong><small>${f.style} · ${n}개 지역</small></div><div class="row-right">${
          war
            ? '<span class="war-badge">전쟁</span>'
            : ally
            ? "동맹"
            : `${rel > 0 ? "+" : ""}${rel}`
        }</div></div>${
          !war && !ally && n
            ? `<div class="diplomacy-action"><button class="tiny-btn" data-dip="alliance" data-target="${f.id}">동맹 제안</button><button class="tiny-btn" data-dip="pact" data-target="${f.id}">불가침</button><button class="tiny-btn" data-dip="improve" data-target="${f.id}">관계 개선</button></div>`
            : ""
        }${
          war
            ? `<div class="diplomacy-action"><button class="tiny-btn" data-dip="truce" data-target="${f.id}">휴전 제안</button></div>`
            : ""
        }`;
      }).join("");
    $$("#diplomacy-panel [data-dip]").forEach((b) =>
      b.addEventListener("click", () => {
        if (game.actionsThisTurn.length) {
          showToast("이번 턴 명령은 이미 처리됐습니다.", true);
          return;
        }
        stageOrder({
          type: "diplomacy",
          dipType: b.dataset.dip,
          targetFaction: b.dataset.target,
        });
      })
    );
  }
  function renderChronicle() {
    $("#chronicle-panel").innerHTML =
      `<div class="section-kicker">WORLD CHRONICLE · ${game.log.length} ENTRIES</div><div style="margin-top:18px">${
        game.log.map((e) =>
          `<div class="log-entry ${e.type}"><small>TURN ${
            String(e.turn).padStart(2, "0")
          }</small><p>${e.text}</p></div>`
        ).join("")
      }</div>`;
  }
  function renderAll() {
    renderMap();
    renderResources();
    renderCommand();
    renderDiplomacy();
    renderChronicle();
    $("#action-status").textContent = game.actionsThisTurn.length
      ? "이번 턴 명령 처리 완료"
      : game.pendingOrder
      ? "명령안 선택됨 · 턴 마감 시 실행"
      : "행동을 선택하세요";
    $("#end-turn").disabled = game.ended || game.processing ||
      !game.pendingOrder || game.actionsThisTurn.length > 0;
    $("#end-turn").classList.toggle(
      "ready",
      !!game.pendingOrder && !game.ended && !game.processing &&
        !game.actionsThisTurn.length,
    );
  }
  function describeOrder(order) {
    const r = order.region ? regionById[order.region] : null;
    const target = order.target ? regionById[order.target] : null;
    const actor = order.targetFaction ? faction(order.targetFaction) : null;
    return ({
      recruit: `${r?.name || "지역"}에서 병력 보강`,
      develop: `${r?.name || "지역"} 개발`,
      attack: `${r?.name || "지역"}에서 ${target?.name || "목표 지역"} 공격`,
      diplomacy: `${actor?.short || ""}에 ${
        ({
          alliance: "동맹 제안",
          pact: "불가침 제안",
          improve: "관계 개선",
          truce: "휴전 제안",
        })[order.dipType] || "외교 제안"
      }`,
    })[order.type] || "명령";
  }
  function addAction(type, detail) {
    const a = { type, detail, turn: game.turn, at: new Date().toISOString() };
    game.actionsThisTurn.push(a);
    const s = game.turnSamples.at(-1);
    if (s) {
      s.actions = game.actionsThisTurn.map((x) => ({ ...x }));
      s.actionCount = game.actionsThisTurn.length;
    }
  }
  function stageOrder(order) {
    if (game.actionsThisTurn.length || game.ended) return;
    game.pendingOrder = { ...order, stagedAt: new Date().toISOString() };
    pushLog(`명령안 작성 · ${describeOrder(game.pendingOrder)}.`, "player");
    renderAll();
    showToast("명령안을 저장했습니다. 턴 마감 전까지 바꿀 수 있습니다.");
  }
  function doAction(type) {
    if (game.actionsThisTurn.length || game.ended) return;
    const p = player(), r = regionById[selectedRegion];
    if (type === "recruit") {
      if (p.cash < 2 || p.people < 1) {
        return showToast("자금 또는 인력이 부족합니다.", true);
      }
      stageOrder({ type: "recruit", region: r.id });
    }
    if (type === "develop") {
      if (p.cash < 3) return showToast("자금이 부족합니다.", true);
      stageOrder({ type: "develop", region: r.id });
    }
    if (type === "attack") {
      const targets = neighbours(r.id).filter((x) =>
        game.owners[x.id] !== p.id && !isAlly(p.id, game.owners[x.id] || "")
      );
      showAttackPicker(r, targets);
      return;
    }
    if (type === "diplomacy") {
      if (!game.owners[r.id]) {
        return showToast("중립 지역에는 외교 제안을 할 수 없습니다.", true);
      }
      setTab("diplomacy");
      return;
    }
  }
  function showAttackPicker(from, targets) {
    if (!targets.length) {
      return showToast("인접한 공격 가능 지역이 없습니다.", true);
    }
    const root = $("#modal-root");
    root.innerHTML =
      `<div class="modal-backdrop"><div class="modal"><div class="eyebrow">BORDER OPERATION</div><h2>${from.name}에서 공격 명령</h2><p>목표를 고르면 명령안에 저장됩니다. 전투는 턴 마감 때 해결됩니다.</p><div class="action-list">${
        targets.map((r) => {
          const f = game.owners[r.id] ? faction(game.owners[r.id]) : null;
          const defense = 1 + terrainBonus[r.terrain] +
            (game.forts[r.id] || 0) + (f ? Math.floor(f.army / 4) : 0);
          const attack = player().army;
          return `<button class="action-card attack-target" data-target="${r.id}"><span class="action-icon">⚔</span><span><strong>${r.name} · ${
            f?.short || "중립"
          }</strong><small>현재 전력 ${attack} 대 ${defense} · ${r.terrain}</small></span><span class="action-cost">명령안 →</span></button>`;
        }).join("")
      }</div><div class="modal-actions"><button data-close>취소</button></div></div></div>`;
    root.querySelector("[data-close]").onclick = () => root.innerHTML = "";
    root.querySelectorAll("[data-target]").forEach((b) =>
      b.onclick = () => {
        const target = regionById[b.dataset.target];
        root.innerHTML = "";
        stageOrder({ type: "attack", region: from.id, target: target.id });
      }
    );
  }
  function applyPlayerOrder() {
    const order = game.pendingOrder;
    if (!order) return false;
    const p = player();
    if (order.type === "recruit") {
      if (p.cash < 2 || p.people < 1) {
        showToast("명령 실행에 필요한 자원이 부족합니다.", true);
        return false;
      }
      p.cash -= 2;
      p.people--;
      p.army += 2;
      addAction("recruit", { region: order.region, army: +2 });
      pushLog(`${p.name}이(가) 병력 2를 보강했습니다.`, "player");
    } else if (order.type === "develop") {
      if (game.owners[order.region] !== p.id || p.cash < 3) {
        showToast("개발 명령을 실행할 수 없습니다.", true);
        return false;
      }
      p.cash -= 3;
      game.developed[order.region] = (game.developed[order.region] || 0) + 1;
      addAction("develop", { region: order.region, income: +1 });
      pushLog(
        `${regionById[order.region].name}의 기반을 개발해 수입이 늘었습니다.`,
        "player",
      );
    } else if (order.type === "attack") {
      const from = regionById[order.region], to = regionById[order.target];
      if (
        !from || !to || game.owners[from.id] !== p.id ||
        !adjacency[from.id].includes(to.id) || game.owners[to.id] === p.id ||
        (game.owners[to.id] && isAlly(p.id, game.owners[to.id])) || p.people < 1
      ) {
        showToast(
          "공격 명령을 실행할 수 없습니다. 명령을 다시 선택해 주세요.",
          true,
        );
        return false;
      }
      resolveBattle(from, to, p, false);
    } else if (order.type === "diplomacy") {
      const target = faction(order.targetFaction);
      if (
        !target || !owns(target).length || isWar(p.id, target.id) ||
        (isAlly(p.id, target.id) && order.dipType !== "truce")
      ) {
        showToast("외교 상황이 바뀌어 명령을 실행할 수 없습니다.", true);
        return false;
      }
      diplomacyAction(order.dipType, target.id, p, false);
    }
    game.pendingOrder = null;
    return game.actionsThisTurn.length > 0;
  }

  // Combat and diplomacy are resolved only after the player commits the turn.
  function resolveBattle(from, to, attacker = player(), isAI = false) {
    if (attacker.people < 1) {
      if (!isAI) showToast("인력이 부족합니다.", true);
      return false;
    }
    const defenderId = game.owners[to.id],
      defender = defenderId ? faction(defenderId) : null;
    if (defender && isAlly(attacker.id, defender.id)) {
      if (!isAI) showToast("동맹 지역은 공격할 수 없습니다.", true);
      return false;
    }
    if (defender && !isWar(attacker.id, defender.id)) {
      game.wars.push(relationKey(attacker.id, defender.id));
      game.relations[relationKey(attacker.id, defender.id)] = clamp(
        relation(attacker.id, defender.id) - 35,
        -100,
        100,
      );
      pushLog(
        `${attacker.name}과(와) ${defender.name} 사이에 전쟁이 시작됐습니다.`,
        "war",
      );
    }
    const defenderPower = defender
      ? Math.max(
        1,
        1 + terrainBonus[to.terrain] + (game.forts[to.id] || 0) +
          Math.floor(defender.army / 4),
      )
      : 1;
    const attackRoll = attacker.army + Math.floor(random() * 4) - 1;
    const defenseRoll = defenderPower + Math.floor(random() * 4) - 1;
    const won = attackRoll >= defenseRoll;
    attacker.people = Math.max(0, attacker.people - 1);
    attacker.army = Math.max(1, attacker.army - (won ? 1 : 2));
    if (defender) {
      defender.army = Math.max(0, defender.army - (won ? 2 : 1));
      defender.stability = Math.max(0, defender.stability - (won ? 1 : 0));
    }
    const battle = {
      turn: game.turn,
      attacker: attacker.id,
      defender: defenderId || null,
      from: from.id,
      target: to.id,
      attack: attackRoll,
      defense: defenseRoll,
      won,
      capital: !!(defender && defender.capital === to.id),
    };
    game.pendingVisuals.push({ target: to.id, won });
    const sample = game.turnSamples.at(-1);
    if (sample) sample.battles.push(battle);
    if (won) {
      game.owners[to.id] = attacker.id;
      game.forts[to.id] = 0;
      if (defender && !owns(defender).length) {
        defender.alive = false;
        game.wars = game.wars.filter((k) =>
          !k.split("|").includes(defender.id)
        );
        pushLog(`${defender.name}이(가) 세계 무대에서 사라졌습니다.`, "war");
      }
      pushLog(
        `${attacker.name}이(가) ${to.name} 점령에 성공했습니다. (${attackRoll} : ${defenseRoll})`,
        "war",
      );
      if (!isAI && defender) {
        game.relations[relationKey(attacker.id, defender.id)] = clamp(
          relation(attacker.id, defender.id) - 15,
          -100,
          100,
        );
      }
    } else {pushLog(
        `${attacker.name}의 ${to.name} 공격이 격퇴됐습니다. (${attackRoll} : ${defenseRoll})`,
        "war",
      );}
    if (!isAI) {
      addAction("attack", {
        from: from.id,
        target: to.id,
        won,
        attack: attackRoll,
        defense: defenseRoll,
      });
    } else if (sample) {
      sample.actions.push({
        type: "ai_attack",
        faction: attacker.id,
        from: from.id,
        target: to.id,
        won,
      });
    }
    return won;
  }
  function diplomacyAction(type, targetId, actor = player(), isAI = false) {
    if (!isAI && game.actionsThisTurn.length) return;
    const target = faction(targetId);
    if (!target) return;
    const rel = relation(actor.id, target.id);
    const key = relationKey(actor.id, target.id);
    let accepted = false, desc = "";
    if (type === "improve") {
      if (!isAI && actor.cash < 1) {
        showToast("자금이 부족합니다.", true);
        return;
      }
      game.relations[key] = clamp(rel + 25, -100, 100);
      if (!isAI) actor.cash--;
      desc = `${actor.name}이(가) ${target.name}과(와) 관계를 개선했습니다.`;
      accepted = true;
    } else if (type === "alliance" || type === "pact") {
      const chance = clamp(
        .35 + rel / 150 + (target.style === "외교주의" ? .18 : 0) +
          (target.army < actor.army ? .08 : 0),
        .08,
        .92,
      );
      accepted = random() < chance;
      if (accepted) {
        game.alliances[key] = game.turn + (type === "alliance" ? 3 : 2);
        game.relations[key] = clamp(rel + 18, -100, 100);
        desc = `${actor.name}과(와) ${target.name}이(가) ${
          type === "alliance" ? "동맹" : "불가침 협정"
        }을 맺었습니다.`;
      } else {
        game.relations[key] = clamp(rel - 8, -100, 100);
        desc = `${target.name}이(가) ${actor.name}의 ${
          type === "alliance" ? "동맹" : "불가침"
        } 제안을 거절했습니다.`;
      }
    } else if (type === "truce") {
      accepted = random() <
        clamp(.48 + rel / 180 + (target.army < actor.army ? .15 : 0), .1, .9);
      if (accepted) {
        game.wars = game.wars.filter((k) => k !== key);
        game.relations[key] = clamp(rel + 20, -100, 100);
        desc = `${actor.name}과(와) ${target.name}이(가) 휴전에 합의했습니다.`;
      } else desc = `${target.name}이(가) 휴전 제안을 거절했습니다.`;
    }
    if (!isAI) addAction("diplomacy", { type, target: targetId, accepted });
    const sample = game.turnSamples.at(-1);
    if (sample) {
      sample.diplomacy.push({
        turn: game.turn,
        actor: actor.id,
        target: targetId,
        type,
        accepted,
        relation: relation(actor.id, targetId),
      });
    }
    pushLog(desc, isAI ? "normal" : "player");
    renderAll();
  }

  // AI scores actions against its borders, threats, resources, temperament and goal.
  function aiAct(f) {
    const owned = owns(f);
    if (!owned.length) return;
    const neighbors = owned.flatMap((from) =>
      adjacency[from.id].map((id) => ({ from, to: regionById[id] }))
    ).filter((x) =>
      game.owners[x.to.id] !== f.id &&
      !(game.owners[x.to.id] && isAlly(f.id, game.owners[x.to.id]))
    );
    const bordersUnderThreat = neighbors.filter((x) => {
      const other = game.owners[x.to.id];
      return other && owns(faction(other)).length &&
        (isWar(f.id, other) || relation(f.id, other) < -30);
    });
    const threats = [
      ...new Set(bordersUnderThreat.map((x) => game.owners[x.to.id])),
    ].map((id) => faction(id));
    const threatPower = threats.reduce((max, t) => Math.max(max, t.army), 0);
    const pressure = threats.length > 0 &&
      (threatPower >= f.army - 1 || isWar(f.id, threats[0].id));
    const targets = neighbors.map((x) => {
      const otherId = game.owners[x.to.id],
        enemy = otherId ? faction(otherId) : null;
      const defense = enemy
        ? 1 + terrainBonus[x.to.terrain] + (game.forts[x.to.id] || 0) +
          Math.floor(enemy.army / 4)
        : 1;
      const odds = clamp(.5 + (f.army - defense) / 8, .08, .94);
      const contested = enemy &&
        (isWar(f.id, enemy.id) || relation(f.id, enemy.id) < -30);
      const legal = !enemy || contested;
      const strategic = (x.to.id === f.capital ? 0 : 0) +
        (enemy?.capital === x.to.id ? 3 : 0) +
        (x.to.income * .55 + x.to.people * .3) + (enemy ? 2.3 : 1.6) +
        (f.style === "팽창주의" ? .8 : 0) +
        (f.style === "기회주의" && enemy && enemy.army < f.army ? 1 : 0);
      return { ...x, enemy, defense, odds, legal, value: strategic * odds };
    }).filter((x) => x.legal && x.odds >= .38).sort((a, b) =>
      b.value - a.value
    );
    const relationTargets = game.factions.filter((x) =>
      x.id !== f.id && owns(x).length && !isAlly(f.id, x.id)
    );
    const diplomaticTarget = relationTargets.map((t) => ({
      f: t,
      score: (t.army > f.army ? 2 : 0) +
        (bordersUnderThreat.some((b) => game.owners[b.to.id] === t.id)
          ? 2.5
          : 0) +
        (f.style === "외교주의" ? 2.1 : 0) + (t.style === "외교주의" ? .6 : 0) +
        (relation(f.id, t.id) > 0 ? 1 : 0) + random() * .45,
    })).sort((a, b) => b.score - a.score)[0];
    const devRegion =
      owned.filter((r) => (game.developed[r.id] || 0) < 2).sort((a, b) =>
        (b.income - (game.developed[b.id] || 0)) -
        (a.income - (game.developed[a.id] || 0))
      )[0];
    const turnsLeft = game.maxTurns - game.turn + 1;
    const recruitScore = f.cash >= 2 && f.people > 0
      ? 1.2 + (f.army < 4 ? 3.2 : 0) + (f.army < 6 ? 1.6 : 0) +
        (pressure ? 3.4 : 0) + (f.style === "방어주의" && pressure ? 1.1 : 0) +
        (f.goal === "balance" && f.army < 7 ? .8 : 0)
      : 0;
    const developScore = f.cash >= 3 && devRegion && turnsLeft >= 4
      ? 1.1 + (f.cash > 7 ? .9 : 0) + (f.style === "고립주의" ? 1.1 : 0) +
        (f.goal === "secure" ? 1 : 0) +
        (f.style === "패권주의" && f.army >= 6 ? .4 : 0)
      : 0;
    const expansionScore = targets.length
      ? (1.2 + targets[0].value + (f.style === "팽창주의" ? 1.4 : 0) +
        (f.goal === "expand" ? .9 : 0) +
        (f.style === "패권주의" && targets[0].to.income >= 2 ? 1 : 0))
      : 0;
    const diplomacyScore = diplomaticTarget
      ? (.45 + (pressure ? 1.8 : 0) + (f.style === "외교주의" ? 2.1 : 0) +
        (f.style === "고립주의" ? .4 : 0) +
        (f.goal === "survive" && pressure ? .7 : 0))
      : 0;
    const options = [["recruit", recruitScore], ["develop", developScore], [
      "expand",
      expansionScore,
    ], ["diplomacy", diplomacyScore]];
    const maxScore = Math.max(...options.map((x) => x[1]));
    // Situation sets the leading choice; small seeded noise keeps similar positions from playing identically.
    const weighted = options.map((
      [kind, value],
    ) => [kind, Math.max(0, value + random() * .8 - (maxScore * .28))]);
    let roll = random() * weighted.reduce((s, x) => s + x[1], 0),
      choice = "recruit";
    for (const [kind, value] of weighted) {
      roll -= value;
      if (roll <= 0) {
        choice = kind;
        break;
      }
    }
    const sample = game.turnSamples.at(-1);
    if (choice === "expand" && targets.length) {
      const op = targets[0];
      resolveBattle(op.from, op.to, f, true);
      pushLog(
        `${f.name}은(는) ${op.to.name}의 자원과 취약한 방어선을 노렸습니다.`,
        "normal",
      );
    } else if (choice === "recruit" && f.cash >= 2 && f.people > 0) {
      f.cash -= 2;
      f.people--;
      f.army += 2;
      if (sample) {
        sample.actions.push({
          type: "ai_recruit",
          faction: f.id,
          army: +2,
          reason: pressure ? "국경 위협에 대비" : "군사력 보강",
        });
      }
      pushLog(
        `${f.name}은(는) ${
          pressure ? "긴장된 국경에 대비해" : "군사력을 보강하기 위해"
        } 병력을 증강했습니다.`,
        "normal",
      );
    } else if (choice === "develop" && f.cash >= 3 && devRegion) {
      f.cash -= 3;
      game.developed[devRegion.id] = (game.developed[devRegion.id] || 0) + 1;
      if (sample) {
        sample.actions.push({
          type: "ai_develop",
          faction: f.id,
          region: devRegion.id,
          reason: "장기 수입 확보",
        });
      }
      pushLog(
        `${f.name}은(는) 장기 수입을 위해 ${devRegion.name}을(를) 개발했습니다.`,
        "normal",
      );
    } else if (choice === "diplomacy" && diplomaticTarget) {
      const target = diplomaticTarget.f;
      if (isWar(f.id, target.id)) diplomacyAction("truce", target.id, f, true);
      else diplomacyAction("alliance", target.id, f, true);
    } else if (f.cash >= 2 && f.people > 0) {
      f.cash -= 2;
      f.people--;
      f.army += 2;
      if (sample) {
        sample.actions.push({
          type: "ai_recruit",
          faction: f.id,
          army: +2,
          reason: "대체 행동",
        });
      }
    }
  }

  // World events, income, victory checks and turn progression.
  function applyEvent() {
    let idx = game.eventQueue.shift();
    if (idx === undefined) {
      game.eventQueue = events.map((_, i) => i).sort(() => random() - .5);
      idx = game.eventQueue.shift();
    }
    const e = events[idx], p = player();
    let detail = e.desc;
    if (e.type === "cash") {
      game.factions.forEach((f) => f.cash = Math.max(0, f.cash + e.value));
    }
    if (e.type === "bonus") {
      const target = pick(regions.filter((r) => game.owners[r.id]));
      if (target) {
        const f = faction(game.owners[target.id]);
        f.cash += e.value;
        detail = `${target.name} 자원 발견. ${f.name} 자금 +${e.value}.`;
      }
    }
    if (e.type === "tension" || e.type === "border") {
      const pairs = [];
      for (let i = 0; i < game.factions.length; i++) {
        for (let j = i + 1; j < game.factions.length; j++) {
          if (!isWar(game.factions[i].id, game.factions[j].id)) {
            pairs.push([game.factions[i], game.factions[j]]);
          }
        }
      }
      const pair = pick(pairs);
      if (pair) {
        const k = relationKey(pair[0].id, pair[1].id);
        game.relations[k] = clamp(
          relation(pair[0].id, pair[1].id) + e.value,
          -100,
          100,
        );
        detail = `${pair[0].short}과(와) ${pair[1].short}의 관계 ${e.value}.`;
      }
    }
    if (e.type === "thaw") {
      game.factions.forEach((a) =>
        game.factions.filter((b) => b.id !== a.id && !isWar(a.id, b.id))
          .forEach((b) => {
            const k = relationKey(a.id, b.id);
            game.relations[k] = clamp(relation(a.id, b.id) + 1, -100, 100);
          })
      );
    }
    if (e.type === "revolt") {
      const target = pick(regions.filter((r) => game.owners[r.id]));
      if (target) {
        const f = faction(game.owners[target.id]);
        f.stability = Math.max(0, f.stability - 1);
        if (
          f.id === p.id && f.stability === 0 && target.id !== f.capital &&
          random() < .25
        ) game.owners[target.id] = null;
        detail =
          `${f.name}의 ${target.name}에서 분리 독립 운동. 안정도 ${f.stability}/6.`;
      }
    }
    if (e.type === "army") {
      game.factions.forEach((f) => {
        if (owns(f).length) f.army++;
      });
    }
    if (e.type === "blockade") {
      game.factions.forEach((f) => {
        if (owns(f).some((r) => r.terrain === "해안")) {
          f.cash = Math.max(0, f.cash + e.value);
        }
      });
    }
    if (e.type === "people") {
      game.factions.forEach((f) => f.people = Math.max(0, f.people + e.value));
    }
    if (e.type === "stability") {
      game.factions.forEach((f) => f.stability = clamp(f.stability + 1, 0, 6));
    }
    if (e.type === "armsrace") {
      game.factions.forEach((f) => {
        if (owns(f).length && random() < .55) f.army++;
      });
    }
    const sample = game.turnSamples.at(-1);
    if (sample) {
      sample.event = { name: e.name, description: detail, type: e.type };
    }
    pushLog(`국제 사건 · ${e.name}. ${detail}`, "event");
  }
  function income() {
    game.factions.forEach((f) => {
      const rs = owns(f);
      if (!rs.length) return;
      const money = rs.reduce(
        (s, r) => s + r.income + (game.developed[r.id] || 0),
        0,
      );
      const people = rs.reduce((s, r) => s + r.people, 0);
      f.cash += money;
      f.people = Math.min(20, f.people + people);
      if (f.army > 6) f.cash = Math.max(0, f.cash - 1);
    });
  }
  function playerTerritories() {
    return owns(player()).length;
  }
  function diplomaticReach() {
    const p = player();
    let sum = owns(p).length;
    game.factions.filter((f) => f.id !== p.id && isAlly(p.id, f.id)).forEach(
      (f) => sum += owns(f).length,
    );
    return sum;
  }
  function checkImmediateWin() {
    const p = player();
    if (!owns(p).length) {
      finishGame(false, "모든 지역을 잃어 세력이 해체되었습니다.");
      return true;
    }
    const top =
      game.factions.filter((f) => owns(f).length).sort((a, b) =>
        b.army - a.army
      )[0];
    if (top) {
      top.hegTurns++;
      game.factions.filter((f) => f.id !== top.id).forEach((f) =>
        f.hegTurns = 0
      );
    }
    if (game.goal === "influence" && owns(p).length >= 7) {
      finishGame(true, "7개 지역을 확보해 영향력 목표를 달성했습니다.");
      return true;
    }
    if (game.goal === "hegemony" && top?.id === p.id && p.hegTurns >= 2) {
      finishGame(true, "군사력 1위를 2턴 유지해 패권을 장악했습니다.");
      return true;
    }
    if (game.goal === "diplomacy" && diplomaticReach() >= 12) {
      finishGame(true, "우호 세력과 함께 지역 12곳을 확보했습니다.");
      return true;
    }
    if (
      game.goal === "survival" && game.turn >= 12 &&
      game.owners[p.capital] === p.id
    ) {
      finishGame(true, "수도를 지키며 12턴을 버텼습니다.");
      return true;
    }
    return false;
  }
  function score(f) {
    const rs = owns(f);
    return rs.length * 4 + f.cash + f.army * 2 + f.stability * 2 +
      (game.owners[f.capital] === f.id ? 5 : 0) +
      game.factions.filter((o) => o.id !== f.id && isAlly(f.id, o.id)).reduce(
        (s, o) => s + owns(o).length,
        0,
      );
  }
  async function endTurn() {
    if (game.ended || game.processing) return;
    if (!game.pendingOrder) {
      showToast(
        "행동을 먼저 선택하세요. 행동 없이 턴을 넘길 수 없습니다.",
        true,
      );
      return;
    }
    game.processing = true;
    $("#end-turn").disabled = true;
    $("#phase-label").textContent = "명령 실행 중";
    if (!applyPlayerOrder()) {
      game.processing = false;
      renderAll();
      return;
    }
    renderAll();
    const aiFactions = game.factions.filter((f) => f.id !== game.playerId).sort(
      () => random() - .5,
    );
    for (const f of aiFactions) {
      if (!owns(f).length) continue;
      $("#phase-label").textContent = `${f.short} 정세 판단 중`;
      await new Promise((resolve) => setTimeout(resolve, 110));
      aiAct(f);
      renderAll();
      $("#phase-label").textContent = game.log[0]?.text ||
        `${f.short}이(가) 움직였습니다`;
      await new Promise((resolve) => setTimeout(resolve, 130));
    }
    $("#phase-label").textContent = "국제 사건 처리 중";
    await new Promise((resolve) => setTimeout(resolve, 180));
    applyEvent();
    income();
    const sample = game.turnSamples.at(-1);
    if (sample) {
      sample.playerEnd = snapshotResources(player());
      sample.scores = game.factions.map((f) => ({
        id: f.id,
        score: score(f),
        territories: owns(f).length,
        army: f.army,
      }));
      sample.wars = game.wars.slice();
      sample.alliances = { ...game.alliances };
    }
    game.processing = false;
    if (checkImmediateWin()) return;
    if (game.turn >= game.maxTurns) {
      const ranking = game.factions.filter((f) => owns(f).length).sort((a, b) =>
        score(b) - score(a)
      );
      const winner = ranking[0];
      const won = winner?.id === game.playerId;
      finishGame(
        won,
        won
          ? "12턴 종료 시 종합 점수 1위입니다."
          : `${
            winner?.name || "다른 세력"
          }이(가) 최종 점수 1위를 차지했습니다.`,
      );
      return;
    }
    game.turn++;
    game.actionsThisTurn = [];
    game.pendingOrder = null;
    const p = player();
    const next = addTurnSample();
    next.playerStart = snapshotResources(p);
    pushLog(`턴 ${game.turn} 시작. 세계의 긴장이 높아지고 있습니다.`, "normal");
    renderAll();
    animateTurnChange();
    $("#phase-label").textContent = "당신의 차례";
    $("#end-turn").disabled = true;
  }
  function finishGame(won, reason) {
    game.ended = true;
    game.endedAt = new Date().toISOString();
    game.finish = {
      won,
      reason,
      winner: won ? game.playerId : null,
      score: score(player()),
      ranking: game.factions.map((f) => ({
        id: f.id,
        score: score(f),
        territories: owns(f).length,
        army: f.army,
      })).sort((a, b) => b.score - a.score),
      durationMs: Date.now() - new Date(game.startedAt).getTime(),
    };
    const last = game.turnSamples.at(-1);
    if (last) {
      last.finish = { ...game.finish };
      last.playerEnd = snapshotResources(player());
    }
    pushLog(
      won ? `승리 · ${reason}` : `패배 · ${reason}`,
      won ? "player" : "war",
    );
    saveMatch();
    renderAll();
    showOutcome();
  }

  // Match history is local to this browser; export gives a portable balance dataset.
  function readHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  }
  function saveMatch() {
    const h = readHistory();
    h.unshift(JSON.parse(JSON.stringify(game)));
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 100)));
    } catch {
      showToast("저장 공간이 부족해 판 기록을 저장하지 못했습니다.", true);
    }
  }
  function showOutcome() {
    const root = $("#modal-root"), f = player(), won = game.finish.won;
    root.innerHTML =
      `<div class="modal-backdrop"><div class="modal"><div class="eyebrow">WORLD CYCLE COMPLETE · ${
        String(game.turn).padStart(2, "0")
      } TURNS</div><h2>${
        won ? "질서가 세워졌습니다" : "세계의 파도에 밀렸습니다"
      }</h2><p>${game.finish.reason}</p><div class="outcome-score"><div><small>최종 점수</small><b>${game.finish.score}</b></div><div><small>보유 지역</small><b>${
        owns(f).length
      }</b></div><div><small>전투</small><b>${
        game.turnSamples.reduce((s, t) => s + t.battles.length, 0)
      }</b></div></div><p>이번 판의 상세 기록이 브라우저에 저장되었습니다. 시드 <b>${game.seed}</b></p><div class="modal-actions"><button data-records>판 기록 보기</button><button class="confirm" data-new>새 세계 시작</button></div></div></div>`;
    root.querySelector("[data-records]").onclick = () => {
      root.innerHTML = "";
      showRecords();
    };
    root.querySelector("[data-new]").onclick = () => {
      root.innerHTML = "";
      returnToSetup();
    };
  }
  function showToast(msg, error = false) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.toggle("error", error);
    t.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add("hidden"), 2200);
  }
  function setTab(tab) {
    $$(".panel-tab").forEach((b) =>
      b.classList.toggle("active", b.dataset.tab === tab)
    );
    ["command", "diplomacy", "chronicle"].forEach((n) =>
      $("#" + n + "-panel").classList.toggle("hidden", n !== tab)
    );
  }
  function showRecords() {
    renderRecords();
    $("#game").classList.add("hidden");
    $("#setup").classList.add("hidden");
    $("#records").classList.remove("hidden");
  }
  function renderRecords() {
    const h = readHistory();
    const wins = h.filter((m) => m.finish?.won).length;
    const turns = h.length ? h.reduce((s, m) => s + m.turn, 0) / h.length : 0;
    const battles = h.reduce(
      (s, m) => s + m.turnSamples.reduce((x, t) => x + t.battles.length, 0),
      0,
    );
    const treaties = h.reduce(
      (s, m) => s + m.turnSamples.reduce((x, t) => x + t.diplomacy.length, 0),
      0,
    );
    $("#records-summary").innerHTML = [
      ["저장된 판", h.length],
      ["승률", h.length ? `${Math.round(wins / h.length * 100)}%` : "—"],
      ["평균 턴", h.length ? turns.toFixed(1) : "—"],
      ["전투 · 외교", `${battles} · ${treaties}`],
    ].map(([a, b]) =>
      `<div class="summary-card"><small>${a}</small><strong>${b}</strong></div>`
    ).join("");
    $("#records-list").innerHTML = h.length
      ? h.map((m) => {
        const p = m.factions.find((f) => f.id === m.playerId);
        const b = m.turnSamples.reduce((s, t) => s + t.battles.length, 0),
          d = m.turnSamples.reduce((s, t) => s + t.diplomacy.length, 0),
          ev = m.turnSamples.filter((t) => t.event).length;
        return `<article class="record-card"><div><h3>${
          p?.name || m.playerId
        } · ${m.finish?.won ? "승리" : "패배"}</h3><p>${
          new Date(m.startedAt).toLocaleString("ko-KR")
        } · ${m.turn}턴 · 시드 ${m.seed}</p></div><div class="record-metrics"><span class="metric-pill">지역 ${
          m.finish?.ranking?.find((x) => x.id === m.playerId)?.territories ??
            "—"
        }</span><span class="metric-pill">전투 ${b}</span><span class="metric-pill">외교 ${d}</span><span class="metric-pill">사건 ${ev}</span></div><div><span class="metric-pill">${
          m.finish?.reason || ""
        }</span></div><div class="record-result ${
          m.finish?.won ? "" : "loss"
        }">${m.finish?.score ?? 0}점</div></article>`;
      }).join("")
      : '<div class="records-empty">아직 저장된 판이 없습니다.<br>한 판을 마치면 밸런스 기록이 여기에 쌓입니다.</div>';
  }
  function exportHistory() {
    const h = readHistory();
    if (!h.length) return showToast("내보낼 기록이 없습니다.", true);
    const blob = new Blob([
      JSON.stringify(
        {
          format: "world-pulse-balance-v2",
          exportedAt: new Date().toISOString(),
          matches: h,
        },
        null,
        2,
      ),
    ], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `world-pulse-matches-${
      new Date().toISOString().slice(0, 10)
    }.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function clearHistory() {
    const root = $("#modal-root");
    root.innerHTML =
      `<div class="modal-backdrop"><div class="modal"><h2>판 기록을 삭제할까요?</h2><p>이 브라우저에 저장된 밸런스 기록 ${readHistory().length}개가 모두 삭제됩니다. 삭제 후 되돌릴 수 없습니다.</p><div class="modal-actions"><button data-no>취소</button><button class="confirm" data-yes>삭제</button></div></div></div>`;
    root.querySelector("[data-no]").onclick = () => root.innerHTML = "";
    root.querySelector("[data-yes]").onclick = () => {
      localStorage.removeItem(HISTORY_KEY);
      root.innerHTML = "";
      renderRecords();
      renderResources();
    };
  }
  function returnToSetup() {
    game = null;
    $("#game").classList.add("hidden");
    $("#records").classList.add("hidden");
    $("#setup").classList.remove("hidden");
    $("#modal-root").innerHTML = "";
    renderSetupCount();
  }
  function renderSetupCount() {
    const n = readHistory().length;
    $("#record-count").textContent = n;
    $("#header-record-count").textContent = n;
  }

  // Map navigation and lightweight motion effects.
  function applyMapTransform() {
    $("#map-world").setAttribute(
      "transform",
      `translate(${mapPanX} ${mapPanY}) scale(${mapScale})`,
    );
  }
  function zoom(d) {
    mapScale = clamp(mapScale + d, .8, 1.8);
    applyMapTransform();
  }
  function animatePendingMapEffects() {
    if (!game.pendingVisuals?.length) return;
    const pending = game.pendingVisuals.splice(0);
    requestAnimationFrame(() =>
      pending.forEach((v) => {
        const node = $(`#map-regions [data-region="${v.target}"]`);
        if (!node) return;
        const cls = v.won ? "capture-anim" : "battle-anim";
        node.classList.add(cls);
        node.addEventListener(
          "animationend",
          () => node.classList.remove(cls),
          { once: true },
        );
      })
    );
  }
  function animateTurnChange() {
    const el = $(".turn-display");
    el.classList.remove("turn-arrive");
    void el.offsetWidth;
    el.classList.add("turn-arrive");
    setTimeout(() => el.classList.remove("turn-arrive"), 650);
  }
  function bind() {
    $("#random-seed").onclick = newSeed;
    $("#start-game").onclick = startGame;
    $("#open-records").onclick = showRecords;
    $("#records-btn").onclick = showRecords;
    $("#back-to-setup").onclick = returnToSetup;
    $("#export-records").onclick = exportHistory;
    $("#clear-records").onclick = clearHistory;
    $("#new-game-btn").onclick = () => {
      if (game && !game.ended) {
        const root = $("#modal-root");
        root.innerHTML =
          `<div class="modal-backdrop"><div class="modal"><h2>새 세계를 시작할까요?</h2><p>현재 진행 중인 판은 완료 기록에 저장되지 않습니다.</p><div class="modal-actions"><button data-no>계속 플레이</button><button class="confirm" data-yes>새 세계</button></div></div></div>`;
        root.querySelector("[data-no]").onclick = () => root.innerHTML = "";
        root.querySelector("[data-yes]").onclick = () => {
          root.innerHTML = "";
          returnToSetup();
        };
      } else returnToSetup();
    };
    $("#end-turn").onclick = endTurn;
    $("#zoom-in").onclick = () => zoom(.15);
    $("#zoom-out").onclick = () => zoom(-.15);
    $("#zoom-reset").onclick = () => {
      mapScale = 1;
      mapPanX = 0;
      mapPanY = 0;
      applyMapTransform();
    };
    $$(".panel-tab").forEach((b) => b.onclick = () => setTab(b.dataset.tab));
    const viewport = $("#map-viewport");
    let dragPointer = null,
      dragLast = null,
      didDrag = false,
      suppressMapClick = false,
      pinchStart = null;
    const pointers = new Map();
    const point = (e) => ({ x: e.clientX, y: e.clientY });
    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    viewport.addEventListener("wheel", (e) => {
      if (!game) return;
      e.preventDefault();
      zoom(e.deltaY < 0 ? .05 : -.05);
    }, { passive: false });
    viewport.addEventListener("pointerdown", (e) => {
      if (!game) return;
      pointers.set(e.pointerId, point(e));
      if (!e.target.closest(".region")) viewport.setPointerCapture(e.pointerId);
      if (pointers.size === 1) {
        dragPointer = e.pointerId;
        dragLast = point(e);
        didDrag = false;
        viewport.classList.add("dragging");
      } else if (pointers.size === 2) {
        const pts = [...pointers.values()];
        pinchStart = { distance: distance(pts[0], pts[1]), scale: mapScale };
        dragPointer = null;
      }
    });
    viewport.addEventListener("pointermove", (e) => {
      if (!pointers.has(e.pointerId)) return;
      const prev = pointers.get(e.pointerId), next = point(e);
      pointers.set(e.pointerId, next);
      if (pointers.size >= 2 && pinchStart) {
        const pts = [...pointers.values()];
        mapScale = clamp(
          pinchStart.scale * distance(pts[0], pts[1]) /
            Math.max(1, pinchStart.distance),
          .8,
          1.8,
        );
        applyMapTransform();
        return;
      }
      if (dragPointer === e.pointerId) {
        const dx = next.x - prev.x, dy = next.y - prev.y;
        if (
          Math.hypot(
            next.x - (dragLast?.x ?? next.x),
            next.y - (dragLast?.y ?? next.y),
          ) > 5
        ) didDrag = true;
        const rect = viewport.getBoundingClientRect();
        mapPanX += dx * 1000 / rect.width;
        mapPanY += dy * 540 / rect.height;
        dragLast = next;
        applyMapTransform();
      }
    });
    const releasePointer = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (didDrag) {
        suppressMapClick = true;
        setTimeout(() => suppressMapClick = false, 80);
      }
      if (pointers.size < 2) pinchStart = null;
      if (pointers.size === 1) {
        const [id, pos] = [...pointers.entries()][0];
        dragPointer = id;
        dragLast = pos;
        didDrag = false;
      } else {
        dragPointer = null;
        viewport.classList.remove("dragging");
      }
    };
    viewport.addEventListener("pointerup", releasePointer);
    viewport.addEventListener("pointercancel", releasePointer);
    viewport.addEventListener("lostpointercapture", releasePointer);
    viewport.addEventListener("click", (e) => {
      if (suppressMapClick) {
        e.stopPropagation();
        suppressMapClick = false;
      }
    }, true);
  }
  function init() {
    createNationOptions();
    newSeed();
    renderSetupCount();
    bind();
  }
  init();
})();

