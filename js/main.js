'use strict';

/* =============================================
   TEACHER DATA — full profiles
============================================= */
var TEACHERS = {
  math: [
    {
      id: 'luka',
      name: 'Luka Vardosanidze',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Luka specializes in higher-level mathematics with a particular focus on algebra, calculus, and competition preparation. His analytical, structured teaching method has helped dozens of students achieve top scores in national and international competitions. He believes in building deep conceptual understanding before moving to practice.',
      traits: ['Algebra', 'Calculus', 'Problem Solving', 'Competition Prep'],
      languages: ['Georgian', 'English'],
      styles: ['Structured', 'Analytical', 'Rigorous'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:5, creative:3, patient:4, structured:5, conversational:2 }
    },
    {
      id: 'maia',
      name: 'Maia Khustsishvili',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Maia brings mathematics to life through visual and conceptual approaches. Her lessons make abstract ideas tangible, and her patient, encouraging style creates a safe space for students to ask questions and explore. Particularly strong in geometry and foundational mathematics.',
      traits: ['Geometry', 'Visual Learning', 'Foundations', 'Conceptual'],
      languages: ['Georgian', 'Russian'],
      styles: ['Visual', 'Patient', 'Encouraging'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:4, creative:5, patient:5, structured:3, conversational:4 }
    },
    {
      id: 'saba',
      name: 'Saba Inaneishvili',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Saba is a dynamic, fast-paced teacher who thrives in competitive environments. His lessons are intense and efficient, ideal for students aiming for top exam performance and olympiad participation. Known for his sharp problem-solving techniques and direct teaching style.',
      traits: ['Competition Math', 'Speed', 'Logic', 'Olympiad Prep'],
      languages: ['Georgian', 'English'],
      styles: ['Fast-paced', 'Competitive', 'Direct'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:5, creative:2, patient:2, structured:5, conversational:2 }
    },
    {
      id: 'nino',
      name: 'Nino Yuljanishvili',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Nino is the teacher who never gives up on a student. Her step-by-step approach ensures that no one falls behind, and her warm, supportive attitude builds confidence alongside mathematical ability. Perfect for students who need to strengthen their foundations or have had difficult experiences with math.',
      traits: ['Step-by-step', 'Supportive', 'Foundations', 'Confidence Building'],
      languages: ['Georgian'],
      styles: ['Patient', 'Supportive', 'Methodical'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:3, creative:3, patient:5, structured:4, conversational:5 }
    },
    {
      id: 'cotne',
      name: 'Cotne Mgeladze',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Cotne bridges the gap between abstract math and the real world. His lessons use statistics, data, and everyday examples to make mathematics immediately relevant and engaging. Strong in applied mathematics and statistics, he is ideal for students who want to understand why math matters.',
      traits: ['Statistics', 'Applied Math', 'Real World', 'Data'],
      languages: ['Georgian', 'English'],
      styles: ['Conversational', 'Applied', 'Contextual'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:4, creative:4, patient:3, structured:3, conversational:5 }
    },
    {
      id: 'ana',
      name: 'Ana Nachyebia',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Ana prepares students for university-level mathematics and rigorous national exams. Her thorough, disciplined approach leaves no topic uncovered. Students who work with Ana gain not just knowledge but the academic habits that will serve them throughout higher education.',
      traits: ['Calculus', 'University Prep', 'Rigor', 'Exam Strategy'],
      languages: ['Georgian', 'English'],
      styles: ['Rigorous', 'Thorough', 'Disciplined'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:5, creative:2, patient:4, structured:5, conversational:3 }
    },
    {
      id: 'megi',
      name: 'Megi Diasamnidze',
      role: 'Mathematics Teacher',
      subject: 'math',
      bio: 'Megi makes mathematics an adventure. Her creative, exploratory teaching methods inspire curiosity and a genuine love of numbers. She uses stories, games, and unconventional approaches to help students discover mathematical concepts for themselves, making learning deeply memorable.',
      traits: ['Creative Methods', 'Conceptual', 'Exploratory', 'Engaging'],
      languages: ['Georgian', 'English', 'Russian'],
      styles: ['Creative', 'Exploratory', 'Inspiring'],
      fbLink: 'https://www.facebook.com/share/188TVSar8k/?mibextid=wwXIfr',
      scores: { analytical:3, creative:5, patient:5, structured:2, conversational:4 }
    }
  ],
  french: [
    {
      id: 'naniko',
      name: 'Naniko Gogoladze',
      role: 'French Language Teacher',
      subject: 'french',
      bio: 'Naniko brings the precision and elegance of the French language to every lesson. With a focus on grammar, reading, and written expression, she builds a solid linguistic foundation that enables true fluency. Her structured, analytical approach is ideal for students preparing for DELF/DALF examinations or academic study in French.',
      traits: ['Grammar', 'Reading', 'Writing', 'DELF/DALF Prep'],
      languages: ['Georgian', 'French', 'English'],
      styles: ['Structured', 'Analytical', 'Academic'],
      fbLink: 'https://www.facebook.com/share/185ffAZPgR/?mibextid=wwXIfr',
      scores: { analytical:5, creative:3, patient:4, structured:5, conversational:2 }
    },
    {
      id: 'natali',
      name: 'Natali Baratashvili',
      role: 'French Language Teacher',
      subject: 'french',
      bio: 'Natali is passionate about French culture and authentic communication. Her immersive, conversational teaching style replicates real-life French interactions, helping students gain confidence and fluency quickly. From Parisian slang to classic literature, Natali makes French culture accessible and exciting.',
      traits: ['Conversation', 'Culture', 'Fluency', 'Immersion'],
      languages: ['Georgian', 'French', 'English', 'Russian'],
      styles: ['Conversational', 'Cultural', 'Immersive'],
      fbLink: 'https://www.facebook.com/share/185ffAZPgR/?mibextid=wwXIfr',
      scores: { analytical:2, creative:5, patient:5, structured:2, conversational:5 }
    }
  ]
};

/* =============================================
   QUIZ QUESTIONS
============================================= */
var QUESTIONS = {
  math: [
    {
      text: 'When you encounter a difficult math problem, what is your instinct?',
      options: [
        { label: 'Analyze it step by step methodically', trait: 'analytical' },
        { label: 'Draw or visualize it', trait: 'creative' },
        { label: 'Ask for help and go slowly', trait: 'patient' },
        { label: 'Follow a formula or structure', trait: 'structured' },
        { label: 'Talk it through with someone', trait: 'conversational' }
      ]
    },
    {
      text: 'Which learning environment suits you best?',
      options: [
        { label: 'Quiet, focused solo study', trait: 'structured' },
        { label: 'Hands-on experiments and examples', trait: 'creative' },
        { label: 'Small group discussions', trait: 'conversational' },
        { label: 'One-on-one tutoring at my own pace', trait: 'patient' },
        { label: 'Competitive, fast-paced challenges', trait: 'analytical' }
      ]
    },
    {
      text: 'Which area of mathematics excites you most?',
      options: [
        { label: 'Algebra and equations', trait: 'analytical' },
        { label: 'Geometry and shapes', trait: 'creative' },
        { label: 'Statistics and real-world data', trait: 'conversational' },
        { label: 'Calculus and rates of change', trait: 'structured' },
        { label: 'Building solid foundations', trait: 'patient' }
      ]
    },
    {
      text: 'How do you prefer to be corrected when you make a mistake?',
      options: [
        { label: 'Direct and immediate feedback', trait: 'analytical' },
        { label: 'Guided discovery — let me find the error', trait: 'creative' },
        { label: 'Gently, with encouragement', trait: 'patient' },
        { label: 'Systematic review of each step', trait: 'structured' },
        { label: 'Through a conversation about the concept', trait: 'conversational' }
      ]
    },
    {
      text: 'How quickly do you usually grasp new concepts?',
      options: [
        { label: 'Very fast — I like to be challenged', trait: 'analytical' },
        { label: 'At my own pace, no rush', trait: 'patient' },
        { label: 'Faster when I see a diagram or model', trait: 'creative' },
        { label: 'When I follow clear structured steps', trait: 'structured' },
        { label: 'When it connects to everyday life', trait: 'conversational' }
      ]
    },
    {
      text: 'What is your main goal in studying mathematics?',
      options: [
        { label: 'Ace exams and competitions', trait: 'analytical' },
        { label: 'Build a solid foundation', trait: 'patient' },
        { label: 'Develop logical thinking skills', trait: 'structured' },
        { label: 'Connect math to real life', trait: 'conversational' },
        { label: 'Appreciate the beauty of numbers', trait: 'creative' }
      ]
    }
  ],
  french: [
    {
      text: 'What matters most to you in learning French?',
      options: [
        { label: 'Being able to hold a real conversation', trait: 'conversational' },
        { label: 'Understanding grammar rules deeply', trait: 'analytical' },
        { label: 'Reading French literature', trait: 'analytical' },
        { label: 'Immersion in French culture', trait: 'creative' },
        { label: 'Writing correctly and fluently', trait: 'structured' }
      ]
    },
    {
      text: 'How do you best retain new vocabulary?',
      options: [
        { label: 'Flashcards and repetition drills', trait: 'structured' },
        { label: 'Using words in stories or context', trait: 'creative' },
        { label: 'Hearing and repeating out loud', trait: 'conversational' },
        { label: 'Grammar rules and word patterns', trait: 'analytical' },
        { label: 'At a slow and steady pace', trait: 'patient' }
      ]
    },
    {
      text: 'Which French skill do you most want to improve?',
      options: [
        { label: 'Speaking confidently', trait: 'conversational' },
        { label: 'Grammar accuracy', trait: 'analytical' },
        { label: 'Listening comprehension', trait: 'conversational' },
        { label: 'Essay writing', trait: 'structured' },
        { label: 'Reading speed', trait: 'analytical' }
      ]
    },
    {
      text: 'How do you like your lessons to be structured?',
      options: [
        { label: 'Free-flowing and conversational', trait: 'conversational' },
        { label: 'Strict grammar-first approach', trait: 'structured' },
        { label: 'Creative exercises and role-play', trait: 'creative' },
        { label: 'Gradual, zero pressure', trait: 'patient' },
        { label: 'Intensive and fast-paced', trait: 'analytical' }
      ]
    },
    {
      text: 'What is your dream outcome with French?',
      options: [
        { label: 'Travel and speak with locals', trait: 'conversational' },
        { label: 'Read Victor Hugo in the original', trait: 'analytical' },
        { label: 'Pass a DELF or DALF exam', trait: 'structured' },
        { label: 'Watch French films without subtitles', trait: 'creative' },
        { label: 'Build basic everyday confidence', trait: 'patient' }
      ]
    },
    {
      text: 'How do you react when you make a grammar mistake?',
      options: [
        { label: 'I want it corrected immediately', trait: 'analytical' },
        { label: 'I prefer to self-correct', trait: 'creative' },
        { label: 'I learn better with encouragement', trait: 'patient' },
        { label: 'I want a full explanation of the rule', trait: 'structured' },
        { label: 'I move on and absorb it gradually', trait: 'conversational' }
      ]
    }
  ]
};

/* =============================================
   STATE
============================================= */
var state = {
  subject: '',
  questionIndex: 0,
  answers: [],
  selectedOption: null,
  scoredTeachers: []
};

/* =============================================
   HELPERS
============================================= */
function el(id) { return document.getElementById(id); }

function initials(name) {
  var parts = name.split(' ');
  var result = '';
  for (var i = 0; i < Math.min(parts.length, 2); i++) {
    if (parts[i] && parts[i][0]) result += parts[i][0];
  }
  return result;
}

/* =============================================
   PAGE NAV
============================================= */
function showPage(id) {
  var all = document.querySelectorAll('.page');
  for (var i = 0; i < all.length; i++) all[i].classList.remove('active');
  var t = el(id);
  if (t) t.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =============================================
   SUBJECT SELECT
============================================= */
function selectSubject(subj, card) {
  state.subject = subj;
  var cards = document.querySelectorAll('.subj-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  if (card) card.classList.add('selected');
  var btn = el('contBtn');
  if (btn) btn.classList.add('ready');
  var lbl = el('selLabel');
  if (lbl) lbl.textContent = subj === 'math' ? 'Mathematics' : 'French Language';
}

function quickSelect(subj) {
  state.subject = subj;
  var cards = document.querySelectorAll('.subj-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  var c = el('sc-' + subj);
  if (c) c.classList.add('selected');
  var btn = el('contBtn');
  if (btn) btn.classList.add('ready');
  var lbl = el('selLabel');
  if (lbl) lbl.textContent = subj === 'math' ? 'Mathematics' : 'French Language';
  showPage('subjects');
}

/* =============================================
   QUIZ
============================================= */
function startQuiz() {
  if (!state.subject) return;
  state.questionIndex = 0;
  state.answers = [];
  state.selectedOption = null;
  updateStepUI(2);
  var badge = el('qBadge');
  if (badge) badge.textContent = state.subject === 'math' ? 'Mathematics' : 'French Language';
  showPage('quiz');
  renderQuestion();
}

function renderQuestion() {
  var data = QUESTIONS[state.subject];
  var q = data[state.questionIndex];
  var total = data.length;
  var num = state.questionIndex + 1;

  if (el('qNum')) el('qNum').textContent = String(num);
  if (el('qTotal')) el('qTotal').textContent = String(total);
  if (el('qLabel')) el('qLabel').textContent = 'Question ' + (num < 10 ? '0' + num : num);
  if (el('qText')) el('qText').textContent = q.text;
  if (el('progressFill')) el('progressFill').style.width = (Math.round((state.questionIndex / total) * 100)) + '%';

  state.selectedOption = state.answers[state.questionIndex] || null;
  var letters = ['A','B','C','D','E'];
  var wrap = el('optionsWrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  for (var i = 0; i < q.options.length; i++) {
    (function(idx, opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt-btn' + (state.selectedOption === opt.trait ? ' sel' : '');

      var letter = document.createElement('span');
      letter.className = 'opt-letter';
      letter.textContent = letters[idx];

      var txt = document.createElement('span');
      txt.className = 'opt-text';
      txt.textContent = opt.label;

      btn.appendChild(letter);
      btn.appendChild(txt);

      btn.addEventListener('click', function() {
        var all = wrap.querySelectorAll('.opt-btn');
        for (var j = 0; j < all.length; j++) all[j].classList.remove('sel');
        btn.classList.add('sel');
        state.answers[state.questionIndex] = opt.trait;
        state.selectedOption = opt.trait;
        var nb = el('nextBtn');
        if (nb) {
          nb.classList.add('ready');
          nb.textContent = state.questionIndex === data.length - 1 ? 'See My Match \u2192' : 'Next \u2192';
        }
      });
      wrap.appendChild(btn);
    })(i, q.options[i]);
  }

  var nb = el('nextBtn');
  if (nb) {
    nb.className = 'btn-next' + (state.selectedOption ? ' ready' : '');
    nb.textContent = state.questionIndex === data.length - 1 ? 'See My Match \u2192' : 'Next \u2192';
  }
}

function nextQuestion() {
  if (!state.answers[state.questionIndex]) return;
  var data = QUESTIONS[state.subject];
  if (state.questionIndex < data.length - 1) {
    state.questionIndex++;
    renderQuestion();
  } else {
    computeResult();
  }
}

function prevQuestion() {
  if (state.questionIndex > 0) {
    state.questionIndex--;
    renderQuestion();
  } else {
    showPage('subjects');
  }
}

/* =============================================
   MATCHING
============================================= */
function computeResult() {
  var pool = TEACHERS[state.subject];
  var tc = { analytical:0, creative:0, patient:0, structured:0, conversational:0 };
  var keys = Object.keys(tc);

  for (var i = 0; i < state.answers.length; i++) {
    var a = state.answers[i];
    if (a && tc[a] !== undefined) tc[a]++;
  }

  var total = 0;
  for (var k = 0; k < keys.length; k++) total += tc[keys[k]];
  if (total === 0) total = 1;

  var scored = pool.map(function(t) {
    var score = 0;
    for (var ki = 0; ki < keys.length; ki++) {
      score += (tc[keys[ki]] / total) * t.scores[keys[ki]];
    }
    return { teacher: t, pct: Math.round((score / 5) * 100) };
  });
  scored.sort(function(a, b) { return b.pct - a.pct; });

  state.scoredTeachers = scored;
  renderResult(scored);
  updateStepUI(3);
  showPage('result');
}

/* =============================================
   RESULT PAGE
============================================= */
function renderResult(scored) {
  var best = scored[0];
  var t = best.teacher;
  var subLabel = state.subject === 'math' ? 'Mathematics' : 'French Language';
  var ini = initials(t.name);

  var rSub = el('resultSub');
  if (rSub) rSub.textContent = 'Based on your ' + subLabel + ' assessment, here is your personalized teacher recommendation.';

  var bestCard = el('bestCard');
  if (bestCard) {
    var traitsHTML = '';
    for (var ti = 0; ti < t.traits.length; ti++) {
      traitsHTML += '<span class="trait-tag">' + t.traits[ti] + '</span>';
    }

    bestCard.innerHTML = [
      '<div class="best-wrap">',
        '<div class="best-stripe"></div>',
        '<div class="best-body">',
          '<div class="best-top">',
            '<div class="best-avatar">' + ini + '</div>',
            '<div class="best-info">',
              '<div class="best-badge">&#10022; Best Match</div>',
              '<div class="best-name">' + t.name + '</div>',
              '<div class="best-subj">' + subLabel + ' &middot; Expert Teacher</div>',
            '</div>',
          '</div>',
          '<div class="best-grid">',
            '<div>',
              '<div class="best-sect-label">Teaching Strengths</div>',
              '<div class="traits-wrap">' + traitsHTML + '</div>',
            '</div>',
            '<div>',
              '<div class="best-sect-label">Teaching Style</div>',
              '<div class="traits-wrap">' + t.styles.map(function(s) { return '<span class="trait-tag">' + s + '</span>'; }).join('') + '</div>',
            '</div>',
            '<div class="compat-sect">',
              '<div class="compat-top">',
                '<div class="best-sect-label" style="margin:0">Compatibility Score</div>',
                '<div class="compat-pct">' + best.pct + '%</div>',
              '</div>',
              '<div class="compat-track"><div class="compat-fill" id="compatFill" style="width:0%"></div></div>',
            '</div>',
          '</div>',
          '<button class="btn-profile" onclick="openModal(\'' + t.id + '\')">&#128196; View Full Profile &amp; Book Session</button>',
        '</div>',
      '</div>'
    ].join('');

    setTimeout(function() {
      var fill = el('compatFill');
      if (fill) fill.style.width = best.pct + '%';
    }, 150);
  }

  var runnersWrap = el('runnersWrap');
  if (runnersWrap) {
    var html = '';
    for (var ri = 1; ri < scored.length; ri++) {
      var item = scored[ri];
      var rt = item.teacher;
      html += [
        '<div class="runner-row" onclick="openModal(\'' + rt.id + '\')">',
          '<div class="run-av">' + initials(rt.name) + '</div>',
          '<div class="run-name">' + rt.name + '</div>',
          '<div class="run-right">',
            '<div class="run-bar-track"><div class="run-bar-fill" style="width:' + item.pct + '%"></div></div>',
            '<div class="run-pct">' + item.pct + '%</div>',
            '<div class="run-view">View Profile &rarr;</div>',
          '</div>',
        '</div>'
      ].join('');
    }
    runnersWrap.innerHTML = html;
  }
}

/* =============================================
   MODAL — open / close
============================================= */
function openModal(teacherId) {
  var teacher = null;
  var allPools = [].concat(TEACHERS.math, TEACHERS.french);
  for (var i = 0; i < allPools.length; i++) {
    if (allPools[i].id === teacherId) { teacher = allPools[i]; break; }
  }
  if (!teacher) return;

  var overlay = el('teacherModal');
  if (!overlay) return;

  var ini = initials(teacher.name);
  var subLabel = teacher.subject === 'math' ? 'Mathematics' : 'French Language';
  var logoSrc = teacher.subject === 'math' ? 'assets/logo-ema.jpg' : 'assets/logo-efla.jpg';
  var mainLogoSrc = 'assets/logo-eea.jpg';

  var langsHTML = teacher.languages.map(function(l) { return '<span class="modal-tag lang">' + l + '</span>'; }).join('');
  var traitsHTML = teacher.traits.map(function(t) { return '<span class="modal-tag">' + t + '</span>'; }).join('');
  var stylesHTML = teacher.styles.map(function(s) { return '<span class="modal-tag">' + s + '</span>'; }).join('');

  var box = overlay.querySelector('.modal-box');
  if (!box) return;

  box.innerHTML = [
    '<div class="modal-header">',
      '<div class="modal-avatar">' + ini + '</div>',
      '<div class="modal-header-info">',
        '<div class="modal-subject-badge">' + subLabel + '</div>',
        '<div class="modal-name">' + teacher.name + '</div>',
        '<div class="modal-role">' + teacher.role + ' &middot; Elite Education Academy</div>',
      '</div>',
      '<button class="modal-close" onclick="closeModal()">&#10005;</button>',
    '</div>',
    '<div class="modal-body">',

      '<div class="modal-sect">',
        '<div class="modal-sect-title">About</div>',
        '<p class="modal-bio">' + teacher.bio + '</p>',
      '</div>',

      '<div class="modal-sect">',
        '<div class="modal-sect-title">Specializations</div>',
        '<div class="modal-tags">' + traitsHTML + '</div>',
      '</div>',

      '<div class="modal-sect">',
        '<div class="modal-sect-title">Teaching Style</div>',
        '<div class="modal-tags">' + stylesHTML + '</div>',
      '</div>',

      '<div class="modal-sect">',
        '<div class="modal-sect-title">Languages</div>',
        '<div class="modal-tags">' + langsHTML + '</div>',
      '</div>',

      '<div class="modal-sect">',
        '<div class="modal-sect-title">Academy Affiliations</div>',
        '<div class="modal-logos">',
          '<img src="' + mainLogoSrc + '" alt="EEA Logo" class="modal-logo" />',
          '<img src="' + logoSrc + '" alt="Subject Academy Logo" class="modal-logo" />',
        '</div>',
      '</div>',

      '<div class="booking-sect" id="bookingSect">',
        '<div class="booking-title">Book a Session</div>',
        '<p class="booking-sub">Fill in your details and preferred time. We will contact you within 24 hours to confirm your session with ' + teacher.name + '.</p>',

        '<div class="booking-form" id="bookingForm">',
          '<div class="form-row">',
            '<div class="form-group">',
              '<label class="form-label">Your Name</label>',
              '<input type="text" class="form-input" id="bName" placeholder="Full name" />',
            '</div>',
            '<div class="form-group">',
              '<label class="form-label">Phone / Email</label>',
              '<input type="text" class="form-input" id="bContact" placeholder="How to reach you" />',
            '</div>',
          '</div>',
          '<div class="form-row">',
            '<div class="form-group">',
              '<label class="form-label">Preferred Date</label>',
              '<input type="date" class="form-input" id="bDate" />',
            '</div>',
            '<div class="form-group">',
              '<label class="form-label">Preferred Time</label>',
              '<select class="form-select" id="bTime">',
                '<option value="">Select a time</option>',
                '<option>09:00 - 10:00</option>',
                '<option>10:00 - 11:00</option>',
                '<option>11:00 - 12:00</option>',
                '<option>12:00 - 13:00</option>',
                '<option>14:00 - 15:00</option>',
                '<option>15:00 - 16:00</option>',
                '<option>16:00 - 17:00</option>',
                '<option>17:00 - 18:00</option>',
                '<option>18:00 - 19:00</option>',
                '<option>19:00 - 20:00</option>',
              '</select>',
            '</div>',
          '</div>',
          '<div class="form-group">',
            '<label class="form-label">Message (optional)</label>',
            '<textarea class="form-textarea" id="bMessage" placeholder="Tell us about your goals or any specific topics you want to focus on..."></textarea>',
          '</div>',
          '<div class="booking-actions">',
            '<button class="btn-book" onclick="submitBooking(\'' + teacher.name + '\', \'' + teacher.subject + '\')">',
              '&#128231; Send Booking Request',
            '</button>',
            '<div class="booking-divider"><span>or connect directly on Facebook</span></div>',
            '<a class="btn-facebook" href="' + teacher.fbLink + '" target="_blank" rel="noopener">',
              '<div class="fb-icon">f</div>',
              'Message on Facebook',
            '</a>',
          '</div>',
        '</div>',

        '<div class="booking-success" id="bookingSuccess">',
          '<div class="success-icon">&#10003;</div>',
          '<div class="success-title">Request Sent!</div>',
          '<div class="success-text">Your booking request has been sent to the academy. We will contact you within 24 hours to confirm your session with ' + teacher.name + '.</div>',
        '</div>',

      '</div>',

    '</div>'
  ].join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  var minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  var dateInput = el('bDate');
  if (dateInput) dateInput.min = minDate.toISOString().split('T')[0];
}

function closeModal() {
  var overlay = el('teacherModal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   BOOKING SUBMIT — mailto link
============================================= */
function submitBooking(teacherName, subject) {
  var name = (el('bName') ? el('bName').value : '') || '';
  var contact = (el('bContact') ? el('bContact').value : '') || '';
  var date = (el('bDate') ? el('bDate').value : '') || '';
  var time = (el('bTime') ? el('bTime').value : '') || '';
  var message = (el('bMessage') ? el('bMessage').value : '') || '';

  if (!name.trim()) { alert('Please enter your name.'); return; }
  if (!contact.trim()) { alert('Please enter your phone or email.'); return; }
  if (!date) { alert('Please select a preferred date.'); return; }
  if (!time) { alert('Please select a preferred time.'); return; }

  var subjectLine = encodeURIComponent('Booking Request — ' + teacherName + ' (' + (subject === 'math' ? 'Mathematics' : 'French Language') + ')');
  var body = encodeURIComponent(
    'Hello,\n\n' +
    'A student has requested to book a session:\n\n' +
    'Student Name: ' + name + '\n' +
    'Contact: ' + contact + '\n' +
    'Teacher: ' + teacherName + '\n' +
    'Subject: ' + (subject === 'math' ? 'Mathematics' : 'French Language') + '\n' +
    'Preferred Date: ' + date + '\n' +
    'Preferred Time: ' + time + '\n' +
    (message ? 'Message: ' + message + '\n' : '') +
    '\nPlease confirm the session at your earliest convenience.\n\n' +
    'Best regards,\nElite Education Academy Website'
  );

  window.location.href = 'mailto:vardo.contact@gmail.com?subject=' + subjectLine + '&body=' + body;

  var form = el('bookingForm');
  var success = el('bookingSuccess');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
}

/* =============================================
   STEP INDICATOR
============================================= */
function updateStepUI(active) {
  for (var i = 1; i <= 3; i++) {
    var s = el('step' + i);
    if (!s) continue;
    s.classList.remove('active', 'done');
    if (i < active) s.classList.add('done');
    else if (i === active) s.classList.add('active');
  }
}

/* =============================================
   RESTART
============================================= */
function restart() {
  state.subject = '';
  state.answers = [];
  state.questionIndex = 0;
  state.selectedOption = null;
  state.scoredTeachers = [];
  var cards = document.querySelectorAll('.subj-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  var btn = el('contBtn');
  if (btn) btn.classList.remove('ready');
  var lbl = el('selLabel');
  if (lbl) lbl.textContent = '-- Select a subject above --';
  updateStepUI(1);
  showPage('hero');
}

/* =============================================
   INIT
============================================= */
document.addEventListener('DOMContentLoaded', function() {
  showPage('hero');

  var overlay = el('teacherModal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});
