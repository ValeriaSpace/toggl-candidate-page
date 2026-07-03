(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- data ---------- */
  var ICONS={trust:'../assets/value-trust.png',communication:'../assets/value-communication.png',respect:'../assets/value-respect.png',speed:'../assets/value-speed.png',ownership:'../assets/value-ownership.png',innovation:'../assets/value-innovation.png',freedom:'../assets/value-freedom.png'};
  var VALUES = [
    {name:"Trust", icon:ICONS.trust, d:"Central to our products and our operations. No micromanagement, no surveillance — here or in what we build."},
    {name:"Communication", icon:ICONS.communication, d:"We err on the side of over-communicating. It's the oxygen of a remote team."},
    {name:"Respect", icon:ICONS.respect, d:"We embrace diversity and support individual needs."},
    {name:"Sustained speed", icon:ICONS.speed, d:"Agile and fast — at a pace we can keep up, to stay ahead of the competition."},
    {name:"Ownership", icon:ICONS.ownership, d:"It keeps our culture thriving and encourages initiative and innovation."},
    {name:"Innovativeness", icon:ICONS.innovation, d:"Committed to being bold and creative in the pursuit of continuous improvement."},
    {name:"Freedom", icon:ICONS.freedom, d:"We advocate for autonomy and individuality — in how, when, and where you work."}
  ];

  var HOW = [
    {tab:"Results, not hours", h:"Output is what counts",
     big:"We measure success by achievements, not hours spent. Stop at 4pm for your kid, wrap up that evening — no guilt, just productivity. Teams work across time zones without constraints.",
     side:"<b>In practice:</b> flexible hours, any time zone, and performance conversations about what you shipped — never about when you were online."},
    {tab:"Async-first", h:"Written, thoughtful, undisturbed",
     big:"We maximize asynchronous communication through Notion and Slack to bridge time zones and protect deep work. Transparency is the default — everyone is empowered to find information independently.",
     side:"<b>In practice:</b> fewer meetings, more writing. It's anchored in our <a class='ext-link' href='https://www.notion.so/toggl/RAFT-Results-and-Accountability-First-at-Toggl-2e5886716e884b85abff01fbb4b9b73f'>RAFT principles ↗</a> — Results and Accountability First at Toggl."},
    {tab:"Trust, not surveillance", h:"No one is watching over your shoulder",
     big:"We've built our culture — and our products — on trust, not monitoring. No micromanagement; instead, we empower people and expect ownership in return.",
     side:"<b>In practice:</b> our tools enhance productivity without invasive tracking. Trust isn't a feature; it's the principle. <a class='ext-link' href='https://toggl.com/track/anti-surveillance-statement/'>Read our anti-surveillance statement ↗</a>"},
    {tab:"Small teams", h:"Tribes with real ownership",
     big:"We're organized into Tribes: cross-functional groups owning outcomes for a specific type of user. Inside them, teams of 3–5 prototype, test, ship, and iterate — no heavy approval layers.",
     side:"<b>In practice:</b> problems are well defined, success is measurable, and teams are trusted to decide based on user feedback."},
    {tab:"Together IRL", h:"Remote doesn't mean distant",
     big:"We bring the whole team together for three annual meetups — one team meetup and two company-wide, expenses covered. We invite and expect everyone to join.",
     side:"<b>In practice:</b> between meetups, bi-weekly all-hands video calls we call <b>Kitchen Fires</b> keep everyone aligned and learning together."}
  ];

  var STEPS = [
    {t:"Skills test <span class='or'>and / or</span> video intro",
     d:"We use skill and video tests for initial screening — prioritizing what you can do over what your resume says."},
    {t:"Home assignment <span class='or'>or</span> live coding test drive",
     d:"The home assignment is a piece of actual work closely related to the role — your chance to show hands-on skills. For engineers, it's a real-time coding assessment instead."},
    {t:"Cultural interview",
     d:"A video call with our Talent team to explore our culture and assess mutual fit — your values, and your unique contribution."},
    {t:"Hiring manager interview <span class='or'>or</span> role play",
     d:"A deep dive into your technical background, the team, and the role. For sales roles, this may be a role play — think managing a disgruntled customer or delivering a pitch."},
    {t:"Paid test week",
     d:"A 3–5 day engagement working flexibly on typical tasks at €19/hour — using Toggl to track time, naturally. A real glimpse into working with us, in both directions."},
    {t:"Offer",
     d:"We extend offers to candidates we believe will excel here and make the team better. Welcome aboard."}
  ];

  var APPLY = [
    {t:"Your contract depends on where you live",
     html:"<p>All of our open positions are meant to be <b>full-time, permanent opportunities</b>. Our headquarters are in Estonia, so all <b>Estonian residents are hired as permanent employees</b>. Candidates everywhere else are hired as <b>independent contractors or mandataries</b> — it's what makes worldwide hiring and flexibility possible.</p>"},
    {t:"Salary in job ads is always gross (bruto)",
     html:"<p>The salary listed in our job descriptions is always the <b>gross amount, before any taxes</b> — regardless of contract type or location. What that means for your net:</p>" +
      "<div class='salary-cols'><div class='salary-col'><b>Based in Estonia</b><p>Hired as an employee, your net salary will usually be around 20–22% lower than the listed gross, based on local tax rates.</p></div>" +
      "<div class='salary-col'><b>Based outside Estonia</b><p>The salary is still shown as gross. Your final net depends on the tax rules, social contributions, and employment setup in your country of residence.</p></div></div>"},
    {t:"Everyone gets the same deal",
     html:"<p>Employees, contractors, and mandataries all receive the <b>same Toggl benefits</b> and follow the same internal policies. Questions about your specific setup? Ask us during the process — we'd rather over-communicate than surprise you.</p>"}
  ];

  /* ---------- values explorer ---------- */
  var pillsWrap = document.querySelector(".value-pills");
  var content = document.getElementById("value-content");
  var vicon = document.getElementById("value-icon");
  function selectValue(i){
    VALUES.forEach(function(v,j){ v.el.setAttribute("aria-selected", i===j ? "true" : "false"); });
    content.innerHTML = "<h3>" + VALUES[i].name + "</h3><p>" + VALUES[i].d + "</p>";
    vicon.src = VALUES[i].icon;
    if(!reduced){
      content.classList.remove("value-fade");
      void content.offsetWidth;
      content.classList.add("value-fade");
    }
  }
  VALUES.forEach(function(v,i){
    var b = document.createElement("button");
    b.className = "value-pill";
    b.setAttribute("role","tab");
    b.textContent = v.name;
    b.addEventListener("click", function(){ selectValue(i); });
    v.el = b;
    pillsWrap.appendChild(b);
  });
  selectValue(0);

  /* ---------- how-we-work tabs ---------- */
  var tabsWrap = document.querySelector(".tabs");
  var panelsWrap = document.getElementById("how-panels");
  HOW.forEach(function(t,i){
    var b = document.createElement("button");
    b.className = "tab";
    b.setAttribute("role","tab");
    b.id = "tab-" + i;
    b.setAttribute("aria-controls","panel-" + i);
    b.textContent = t.tab;
    b.addEventListener("click", function(){ selectTab(i); });
    t.btn = b;
    tabsWrap.appendChild(b);

    var p = document.createElement("div");
    p.className = "tab-panel";
    p.id = "panel-" + i;
    p.setAttribute("role","tabpanel");
    p.setAttribute("aria-labelledby","tab-" + i);
    p.innerHTML = "<div><h3>" + t.h + "</h3><p class='big'>" + t.big + "</p></div><div class='side'>" + t.side + "</div>";
    t.panel = p;
    panelsWrap.appendChild(p);
  });
  function selectTab(i){
    HOW.forEach(function(t,j){
      t.btn.setAttribute("aria-selected", i===j ? "true" : "false");
      t.panel.classList.toggle("show", i===j);
    });
  }
  selectTab(0);

  /* ---------- hiring timeline ---------- */
  var tl = document.getElementById("timeline");
  STEPS.forEach(function(s,i){
    var el = document.createElement("div");
    el.className = "t-step" + (i===0 ? " open" : "");
    el.innerHTML =
      "<div class='t-node'>" + String(i+1).padStart(2,"0") + "</div>" +
      "<button class='t-head' aria-expanded='" + (i===0) + "' aria-controls='t-body-" + i + "'>" +
        "<h3>" + s.t + "</h3><span class='chev' aria-hidden='true'>+</span></button>" +
      "<div class='t-body' id='t-body-" + i + "'><div class='t-body-in'><p>" + s.d + "</p></div></div>";
    var head = el.querySelector(".t-head");
    head.addEventListener("click", function(){
      var open = el.classList.toggle("open");
      head.setAttribute("aria-expanded", open);
    });
    tl.appendChild(el);
  });

  /* ---------- apply accordions ---------- */
  var accWrap = document.getElementById("apply-accordions");
  APPLY.forEach(function(a,i){
    var el = document.createElement("div");
    el.className = "acc" + (i===0 ? " open" : "");
    el.innerHTML =
      "<button class='acc-head' aria-expanded='" + (i===0) + "' aria-controls='acc-body-" + i + "'>" +
        "<h3>" + a.t + "</h3><span class='chev' aria-hidden='true'>+</span></button>" +
      "<div class='acc-body' id='acc-body-" + i + "'><div class='acc-body-in'>" + a.html + "</div></div>";
    var head = el.querySelector(".acc-head");
    head.addEventListener("click", function(){
      var open = el.classList.toggle("open");
      head.setAttribute("aria-expanded", open);
    });
    accWrap.appendChild(el);
  });

  /* ---------- scroll reveal (staggered) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function(el){ el.classList.add("in"); });
  } else {
    var pending = [];
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          var delay = (pending.push(e.target) - 1);
          e.target.style.transitionDelay = Math.min(delay * 70, 280) + "ms";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
      setTimeout(function(){ pending = []; }, 400);
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---------- external links open in a new tab ---------- */
  document.querySelectorAll('a[href^="http"]').forEach(function(a){
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- progress bar ---------- */
  var bar = document.querySelector(".progress");
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
})();
