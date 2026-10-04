/**
 * App Học Tiếng Hàn Cho Bé - Logic tương tác, Flashcards 3D, Đọc Chậm & 2 Chế Độ Đố Vui
 */

// 1. Quản lý trạng thái ứng dụng
const AppState = {
  lessonsData: null,
  currentLesson: null,
  allCards: [],
  filteredCards: [],
  currentCardIndex: 0,
  isCardFlipped: false,
  
  // Trạng thái Đọc chính tả (Dictation)
  dictation: {
    isRunning: false,
    isPaused: false,
    timerInterval: null,
    totalSeconds: 8,
    remainingSeconds: 8,
    repeatCount: 2, // 1 hoặc 2 lần
    poolType: 'vocab', // 'all', 'vowels', 'vocab'
    voiceMode: 'ko', // 'ko': Đọc tiếng Hàn; 'vi': Đọc nghĩa TV; 'both': Đọc cả 2
    hideText: true,
    currentWord: null,
    history: [],
    speechRate: 0.9,
    slowRate: 0.65
  },

  // Trạng thái Ghép vần (Syllable Builder) - 10 Phụ âm cơ bản
  builder: {
    selectedConsonant: 'ㅇ',
    selectedVowel: 'ㅏ',
    consonantsList: [
      { char: 'ㅇ', name: 'Tròn (Câm)', index: 11 },
      { char: 'ㄱ', name: 'Giống số 7 [k]', index: 0 },
      { char: 'ㄴ', name: 'Giống chữ L [n]', index: 2 },
      { char: 'ㄷ', name: 'Giống chữ C [t]', index: 3 },
      { char: 'ㄹ', name: 'Giống số 2 [l/r]', index: 5 },
      { char: 'ㅁ', name: 'Vuông [m]', index: 6 },
      { char: 'ㅂ', name: 'Nửa li [p/b]', index: 7 },
      { char: 'ㅅ', name: 'Sắc/huyền [s]', index: 9 },
      { char: 'ㅈ', name: 'Nét 7 [ch]', index: 12 },
      { char: 'ㅎ', name: 'Đội mũ [h]', index: 18 }
    ],
    vowelsList: [
      { char: 'ㅏ', name: 'a (phải)', index: 0 },
      { char: 'ㅑ', name: 'ya (2 phải)', index: 2 },
      { char: 'ㅓ', name: 'ơ/o (trái)', index: 4 },
      { char: 'ㅕ', name: 'yơ (2 trái)', index: 6 },
      { char: 'ㅗ', name: 'ô (trên)', index: 8 },
      { char: 'ㅛ', name: 'yô (2 trên)', index: 12 },
      { char: 'ㅜ', name: 'u (dưới)', index: 13 },
      { char: 'ㅠ', name: 'yu (2 dưới)', index: 17 },
      { char: 'ㅡ', name: 'ư (đất)', index: 18 },
      { char: 'ㅣ', name: 'i (người)', index: 20 }
    ]
  },

  // Trạng thái Minigame
  quiz: {
    score: 0,
    currentQuestionIndex: 1,
    mode: 'listen', // 'listen' hoặc 'meaning' (cho nghĩa TV -> chọn chữ Hàn)
    currentQuestion: null,
    options: []
  }
};

// 2. Web Speech API - Phát âm giọng chuẩn tiếng Hàn & tiếng Việt
const VoiceService = {
  koreanVoice: null,
  vietnameseVoice: null,

  init() {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }
    this.loadVoices();
    window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
  },

  loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    // Giọng tiếng Hàn
    this.koreanVoice = voices.find(v => v.lang === 'ko-KR' || v.lang === 'ko_KR') ||
                       voices.find(v => v.lang && v.lang.startsWith('ko'));
    // Giọng tiếng Việt
    this.vietnameseVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN') ||
                           voices.find(v => v.lang && v.lang.startsWith('vi'));
  },

  speak(text, rate = 0.9, onEnd = null) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate; // 0.9x chuẩn, 0.6x - 0.65x đọc chậm
    utterance.pitch = 1.05;

    if (this.koreanVoice) {
      utterance.voice = this.koreanVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  },

  speakVietnamese(text, rate = 0.9, onEnd = null) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    if (this.vietnameseVoice) {
      utterance.voice = this.vietnameseVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }
};

// 3. Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', async () => {
  VoiceService.init();

  if (window.KOREAN_LESSONS_DATA) {
    AppState.lessonsData = window.KOREAN_LESSONS_DATA;
  } else {
    try {
      const res = await fetch('./data/lessons.json');
      AppState.lessonsData = await res.json();
    } catch (e) {
      console.error('Không tải được file lessons.json', e);
    }
  }

  if (AppState.lessonsData && AppState.lessonsData.lessons.length > 0) {
    AppState.currentLesson = AppState.lessonsData.lessons[0];
    initAllModules();
  }
});

function initAllModules() {
  setupNavigationTabs();
  prepareCardsData();
  renderFlashcards();
  setupDictationModule();
  setupBuilderModule();
  renderTheoryModule();
  setupQuizModule();
}

// 4. Tab Navigation
function setupNavigationTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

// 5. Chuẩn bị dữ liệu thẻ Flashcard
function prepareCardsData() {
  const lesson = AppState.currentLesson;
  AppState.allCards = [];

  // 10 Nguyên âm
  lesson.vowels.forEach(v => {
    AppState.allCards.push({
      type: 'vowel',
      korean: v.char,
      subChar: v.raw,
      vietnamese: `Nguyên âm ${v.vi.toUpperCase()}`,
      pronounce: `Phát âm: [${v.roman}]`,
      note: v.strokeHint,
      icon: '✨',
      category: '10 Nguyên âm'
    });
  });

  // 23 Từ vựng
  lesson.vocabulary.forEach(w => {
    AppState.allCards.push({
      type: 'vocab',
      korean: w.korean,
      subChar: '',
      vietnamese: w.vietnamese,
      pronounce: `Đọc: "${w.pronounce}"`,
      note: `${w.note} (${w.category})`,
      icon: w.icon,
      category: w.category
    });
  });

  AppState.filteredCards = [...AppState.allCards];
}

// 6. MODULE FLASHCARDS 3D
function renderFlashcards() {
  const cardStage = document.getElementById('card-stage');
  const frontKorean = document.getElementById('card-korean-front');
  const cardTag = document.getElementById('card-tag');
  const cardHint = document.getElementById('card-hint');
  const cardAudioBtn = document.getElementById('card-audio-btn');
  const cardAudioSlowBtn = document.getElementById('card-audio-slow-btn');

  const backIcon = document.getElementById('card-back-icon');
  const backVietnamese = document.getElementById('card-back-vietnamese');
  const backPronounce = document.getElementById('card-back-pronounce');
  const backNote = document.getElementById('card-back-note');
  const cardCounter = document.getElementById('card-counter');

  const prevBtn = document.getElementById('card-prev-btn');
  const nextBtn = document.getElementById('card-next-btn');

  function updateCard() {
    if (AppState.filteredCards.length === 0) return;
    const item = AppState.filteredCards[AppState.currentCardIndex];
    
    cardStage.classList.remove('flipped');
    AppState.isCardFlipped = false;

    // Mặt trước
    frontKorean.textContent = item.korean;
    cardTag.textContent = item.category;
    cardHint.textContent = item.type === 'vowel' ? `Nét gốc: ${item.subChar}` : 'Chạm để lật xem nghĩa 👉';

    // Mặt sau
    backIcon.textContent = item.icon;
    backVietnamese.textContent = item.vietnamese;
    backPronounce.textContent = item.pronounce;
    backNote.textContent = item.note;

    cardCounter.textContent = `${AppState.currentCardIndex + 1} / ${AppState.filteredCards.length}`;

    // Tự động đọc chuẩn khi đổi thẻ
    VoiceService.speak(item.korean, 0.9);
  }

  // Sự kiện lật thẻ
  cardStage.onclick = (e) => {
    if (e.target.closest('.audio-btn-group') || e.target.closest('button')) return;
    cardStage.classList.toggle('flipped');
    AppState.isCardFlipped = !AppState.isCardFlipped;
  };

  // Nút nghe âm thanh chuẩn
  cardAudioBtn.onclick = (e) => {
    e.stopPropagation();
    const item = AppState.filteredCards[AppState.currentCardIndex];
    VoiceService.speak(item.korean, 0.9);
  };

  // Nút nghe phát âm CHẬM cho bé
  cardAudioSlowBtn.onclick = (e) => {
    e.stopPropagation();
    const item = AppState.filteredCards[AppState.currentCardIndex];
    VoiceService.speak(item.korean, 0.65);
  };

  prevBtn.onclick = () => {
    if (AppState.currentCardIndex > 0) {
      AppState.currentCardIndex--;
      updateCard();
    } else {
      AppState.currentCardIndex = AppState.filteredCards.length - 1;
      updateCard();
    }
  };

  nextBtn.onclick = () => {
    if (AppState.currentCardIndex < AppState.filteredCards.length - 1) {
      AppState.currentCardIndex++;
      updateCard();
    } else {
      AppState.currentCardIndex = 0;
      updateCard();
    }
  };

  // Bộ lọc thẻ
  const filterBtns = document.querySelectorAll('.filter-pills .pill-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      if (filter === 'all') {
        AppState.filteredCards = [...AppState.allCards];
      } else if (filter === 'vowel') {
        AppState.filteredCards = AppState.allCards.filter(c => c.type === 'vowel');
      } else if (filter === 'vocab') {
        AppState.filteredCards = AppState.allCards.filter(c => c.type === 'vocab');
      }
      AppState.currentCardIndex = 0;
      updateCard();
    };
  });

  updateCard();
}

// 7. MODULE ĐỌC CHÍNH TẢ NGẪU NHIÊN (DICTATION)
function setupDictationModule() {
  const voiceModeSelect = document.getElementById('dict-voice-mode');
  const poolSelect = document.getElementById('dict-pool-select');
  const intervalSlider = document.getElementById('dict-interval-slider');
  const intervalVal = document.getElementById('dict-interval-val');
  const repeatSelect = document.getElementById('dict-repeat-select');
  const hideToggle = document.getElementById('dict-hide-toggle');

  const wordBox = document.getElementById('dict-word-box');
  const subHint = document.getElementById('dict-subhint');
  const startBtn = document.getElementById('dict-start-btn');
  const pauseBtn = document.getElementById('dict-pause-btn');
  const stopBtn = document.getElementById('dict-stop-btn');
  const repeatCurrentBtn = document.getElementById('dict-repeat-current-btn');
  const repeatSlowBtn = document.getElementById('dict-repeat-slow-btn');
  const timerCircle = document.getElementById('timer-progress');
  const timerNum = document.getElementById('timer-num');
  const historyList = document.getElementById('dict-history-list');
  const historyCount = document.getElementById('dict-history-count');

  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 40;
  timerCircle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;
  timerCircle.style.strokeDashoffset = 0;

  if (voiceModeSelect) {
    voiceModeSelect.onchange = (e) => {
      AppState.dictation.voiceMode = e.target.value;
      updateWordDisplay();
    };
  }

  intervalSlider.oninput = (e) => {
    AppState.dictation.totalSeconds = parseInt(e.target.value, 10);
    intervalVal.textContent = `${AppState.dictation.totalSeconds}s`;
  };

  repeatSelect.onchange = (e) => {
    AppState.dictation.repeatCount = parseInt(e.target.value, 10);
  };

  poolSelect.onchange = (e) => {
    AppState.dictation.poolType = e.target.value;
  };

  hideToggle.onchange = (e) => {
    AppState.dictation.hideText = e.target.checked;
    updateWordDisplay();
  };

  function getActiveWordPool() {
    const type = AppState.dictation.poolType;
    if (type === 'vowels') return AppState.allCards.filter(c => c.type === 'vowel');
    if (type === 'vocab') return AppState.allCards.filter(c => c.type === 'vocab');
    return AppState.allCards;
  }

  function setTimerProgress(percent) {
    const offset = CIRCLE_CIRCUMFERENCE - (percent * CIRCLE_CIRCUMFERENCE);
    timerCircle.style.strokeDashoffset = offset;
  }

  function updateWordDisplay() {
    const current = AppState.dictation.currentWord;
    if (!current) {
      wordBox.textContent = 'Sẵn Sàng!';
      wordBox.classList.remove('hidden-mode');
      subHint.textContent = 'Bấm "Bắt Đầu" để giáo viên đọc cho bé chép vào vở';
      return;
    }

    const mode = AppState.dictation.voiceMode;

    if (AppState.dictation.hideText) {
      wordBox.textContent = '✍️ ? ? ?';
      wordBox.classList.add('hidden-mode');
      if (mode === 'vi') {
        subHint.textContent = `🇻🇳 Đang đọc nghĩa: "${current.vietnamese}" ${current.icon} ➔ Bé nhớ và viết chữ tiếng Hàn vào vở!`;
      } else if (mode === 'both') {
        subHint.textContent = `🔄 Nghe nghĩa "${current.vietnamese}" + âm "${current.korean}" ➔ Chép chữ Hàn vào vở!`;
      } else {
        subHint.textContent = `Bé lắng nghe và chép vào vở ô ly... (Gợi ý: ${current.category})`;
      }
    } else {
      wordBox.textContent = current.korean;
      wordBox.classList.remove('hidden-mode');
      subHint.textContent = `${current.vietnamese} (${current.pronounce})`;
    }
  }

  function pickNextRandomWord() {
    const pool = getActiveWordPool();
    if (pool.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  function playCurrentWordSpeech(onDone) {
    const word = AppState.dictation.currentWord;
    if (!word) return;

    const mode = AppState.dictation.voiceMode;

    if (mode === 'vi') {
      // Đọc nghĩa tiếng Việt
      const textToSpeak = word.vietnamese;
      if (AppState.dictation.repeatCount === 2) {
        VoiceService.speakVietnamese(textToSpeak, 0.9, () => {
          setTimeout(() => {
            if (!AppState.dictation.isRunning || AppState.dictation.isPaused) return;
            VoiceService.speakVietnamese(textToSpeak, 0.9, onDone);
          }, 1400);
        });
      } else {
        VoiceService.speakVietnamese(textToSpeak, 0.9, onDone);
      }
    } else if (mode === 'both') {
      // Đọc tiếng Việt trước rồi đọc tiếng Hàn
      VoiceService.speakVietnamese(word.vietnamese, 0.9, () => {
        setTimeout(() => {
          if (!AppState.dictation.isRunning || AppState.dictation.isPaused) return;
          VoiceService.speak(word.korean, AppState.dictation.speechRate, onDone);
        }, 1200);
      });
    } else {
      // Mặc định: Đọc tiếng Hàn
      if (AppState.dictation.repeatCount === 2) {
        VoiceService.speak(word.korean, AppState.dictation.speechRate, () => {
          setTimeout(() => {
            if (!AppState.dictation.isRunning || AppState.dictation.isPaused) return;
            VoiceService.speak(word.korean, AppState.dictation.speechRate, onDone);
          }, 1400);
        });
      } else {
        VoiceService.speak(word.korean, AppState.dictation.speechRate, onDone);
      }
    }
  }

  function stepDictation() {
    if (!AppState.dictation.isRunning || AppState.dictation.isPaused) return;

    const nextWord = pickNextRandomWord();
    AppState.dictation.currentWord = nextWord;
    AppState.dictation.history.push(nextWord);
    addWordToHistoryUI(nextWord, AppState.dictation.history.length);

    updateWordDisplay();

    playCurrentWordSpeech(() => {
      startCountdown();
    });
  }

  function startCountdown() {
    clearInterval(AppState.dictation.timerInterval);
    AppState.dictation.remainingSeconds = AppState.dictation.totalSeconds;
    timerNum.textContent = AppState.dictation.remainingSeconds;
    setTimerProgress(1);

    const stepMs = 100;
    const totalMs = AppState.dictation.totalSeconds * 1000;
    let elapsedMs = 0;

    AppState.dictation.timerInterval = setInterval(() => {
      if (AppState.dictation.isPaused) return;

      elapsedMs += stepMs;
      const remainMs = Math.max(0, totalMs - elapsedMs);
      const remainSec = Math.ceil(remainMs / 1000);
      
      AppState.dictation.remainingSeconds = remainSec;
      timerNum.textContent = remainSec;
      setTimerProgress(remainMs / totalMs);

      if (elapsedMs >= totalMs) {
        clearInterval(AppState.dictation.timerInterval);
        stepDictation();
      }
    }, stepMs);
  }

  function addWordToHistoryUI(word, index) {
    historyCount.textContent = `(${index} từ)`;
    const tag = document.createElement('div');
    tag.className = 'history-tag';
    tag.innerHTML = `<span>#${index}. <strong>${word.korean}</strong></span> <small>(${word.vietnamese})</small> 🔊`;
    tag.onclick = () => VoiceService.speak(word.korean, 0.9);
    historyList.prepend(tag);
  }

  startBtn.onclick = () => {
    AppState.dictation.isRunning = true;
    AppState.dictation.isPaused = false;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    stopBtn.style.display = 'inline-flex';
    repeatCurrentBtn.style.display = 'inline-flex';
    repeatSlowBtn.style.display = 'inline-flex';

    stepDictation();
  };

  pauseBtn.onclick = () => {
    AppState.dictation.isPaused = !AppState.dictation.isPaused;
    pauseBtn.innerHTML = AppState.dictation.isPaused ? '▶️ Tiếp Tục' : '⏸️ Tạm Dừng';
  };

  stopBtn.onclick = () => {
    AppState.dictation.isRunning = false;
    AppState.dictation.isPaused = false;
    clearInterval(AppState.dictation.timerInterval);

    startBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    repeatCurrentBtn.style.display = 'none';
    repeatSlowBtn.style.display = 'none';

    if (AppState.dictation.currentWord) {
      wordBox.textContent = AppState.dictation.currentWord.korean;
      wordBox.classList.remove('hidden-mode');
      subHint.textContent = `Hoàn thành buổi chép vở! Bé đã chép ${AppState.dictation.history.length} từ. Dò kết quả bên dưới nhé 👇`;
    }
    timerNum.textContent = '0';
    setTimerProgress(0);
  };

  repeatCurrentBtn.onclick = () => {
    const word = AppState.dictation.currentWord;
    if (!word) return;
    if (AppState.dictation.voiceMode === 'vi') {
      VoiceService.speakVietnamese(word.vietnamese, 0.9);
    } else {
      VoiceService.speak(word.korean, 0.9);
    }
  };

  repeatSlowBtn.onclick = () => {
    const word = AppState.dictation.currentWord;
    if (!word) return;
    if (AppState.dictation.voiceMode === 'vi') {
      VoiceService.speakVietnamese(word.vietnamese, 0.7);
    } else {
      VoiceService.speak(word.korean, 0.65);
    }
  };
}

// 8. MODULE PHÒNG GHÉP CHỮ KỲ DIỆU (10 PHỤ ÂM CƠ BẢN)
function setupBuilderModule() {
  const consonantGrid = document.getElementById('builder-consonant-grid');
  const vowelGrid = document.getElementById('builder-vowel-grid');
  const resultCell = document.getElementById('builder-result-cell');
  const resultRoman = document.getElementById('builder-result-roman');
  const speakBtn = document.getElementById('builder-speak-btn');
  const speakSlowBtn = document.getElementById('builder-speak-slow-btn');

  // Render 10 phụ âm
  consonantGrid.innerHTML = '';
  AppState.builder.consonantsList.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = `char-pick-btn ${item.char === AppState.builder.selectedConsonant ? 'selected' : ''}`;
    btn.innerHTML = `${item.char}<small>${item.name}</small>`;
    btn.onclick = () => {
      document.querySelectorAll('#builder-consonant-grid .char-pick-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      AppState.builder.selectedConsonant = item.char;
      updateSyllable();
    };
    consonantGrid.appendChild(btn);
  });

  // Render 10 nguyên âm
  vowelGrid.innerHTML = '';
  AppState.builder.vowelsList.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = `char-pick-btn ${item.char === AppState.builder.selectedVowel ? 'selected' : ''}`;
    btn.innerHTML = `${item.char}<small>${item.name}</small>`;
    btn.onclick = () => {
      document.querySelectorAll('#builder-vowel-grid .char-pick-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      AppState.builder.selectedVowel = item.char;
      updateSyllable();
    };
    vowelGrid.appendChild(btn);
  });

  function composeHangul(consonantChar, vowelChar) {
    const cItem = AppState.builder.consonantsList.find(c => c.char === consonantChar);
    const vItem = AppState.builder.vowelsList.find(v => v.char === vowelChar);
    if (!cItem || !vItem) return consonantChar + vowelChar;

    const unicode = 0xAC00 + (cItem.index * 21 + vItem.index) * 28;
    return String.fromCharCode(unicode);
  }

  function updateSyllable() {
    const syllable = composeHangul(AppState.builder.selectedConsonant, AppState.builder.selectedVowel);
    resultCell.textContent = syllable;
    resultRoman.textContent = `Ghép: [${AppState.builder.selectedConsonant}] + [${AppState.builder.selectedVowel}] = "${syllable}"`;
    VoiceService.speak(syllable, 0.9);
  }

  speakBtn.onclick = () => {
    VoiceService.speak(resultCell.textContent, 0.9);
  };

  speakSlowBtn.onclick = () => {
    VoiceService.speak(resultCell.textContent, 0.65);
  };

  updateSyllable();
}

// 9. MODULE KHÁM PHÁ LÝ THUYẾT & 10 PHỤ ÂM
function renderTheoryModule() {
  const container = document.getElementById('theory-content');
  if (!container || !AppState.currentLesson) return;

  const theory = AppState.currentLesson.theory;
  const consonants = AppState.currentLesson.consonantsAll;

  container.innerHTML = `
    <div class="theory-card">
      <h3>👑 Bảng Chữ Cái Hangeul (한글)</h3>
      <p>Do <strong>${theory.overview.creator}</strong> sáng lập để giúp nhân dân dễ học, dễ đọc.</p>
      <p style="margin-top: 6px;">Kỷ niệm vào <strong>${theory.overview.holiday}</strong>. Gồm tổng cộng <strong>${theory.overview.totalLetters} chữ cái</strong>:</p>
      <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
        <span style="background: #EEF2FF; padding: 6px 14px; border-radius: 12px; font-weight: 700; color: #3730A3;">✨ ${theory.overview.vowelsCount}</span>
        <span style="background: #FEF3C7; padding: 6px 14px; border-radius: 12px; font-weight: 700; color: #92400E;">🎯 ${theory.overview.consonantsCount}</span>
      </div>
    </div>

    <div class="theory-card">
      <h3>☀️ Thuyết Tam Tài (Trời • Đất ㅡ Người ㅣ)</h3>
      <p>${theory.tamTai.description}</p>
      <div class="tam-tai-grid">
        ${theory.tamTai.elements.map(el => `
          <div class="tam-tai-item">
            <div class="tam-tai-symbol">${el.symbol}</div>
            <h4>${el.hantu}</h4>
            <p>${el.meaning}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="theory-card">
      <h3>📏 Quy Tắc Viết Chữ & Khoảng Cách</h3>
      <div class="rule-list">
        <div class="rule-item">
          <strong>1 Ô Vuông:</strong> ${theory.syllableRule.rule}
        </div>
        <div class="rule-item">
          <strong>Phụ âm câm 'ㅇ':</strong> ${theory.syllableRule.silentConsonant}
        </div>
        ${theory.spacingRules.map(s => `
          <div class="rule-item" style="border-left-color: #F59E0B;">
            <strong>${s.rule}:</strong> ${s.detail}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="theory-card">
      <h3>🗣️ 10 Phụ Âm Cơ Bản (Nguyên Lý Mô Phỏng Cơ Quan Phát Âm)</h3>
      <p style="color: #64748B; margin-bottom: 14px;">Dựa vào hình dáng của: <em>Lưỡi, Môi, Răng, Cổ họng</em> khi phát âm.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
        ${consonants.map((c, i) => `
          <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; padding: 12px; border-radius: 12px;">
            <div style="font-size: 1.8rem; font-weight: 800; color: #1E3A8A;">${i + 1}. ${c.char}</div>
            <div style="font-weight: 700; color: #334155; margin-top: 4px;">${c.name}</div>
            <div style="font-size: 0.85rem; color: #64748B;">Phát âm: ${c.sound}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="theory-card">
      <h3>✍️ Lưu Ý Giúp Bé Viết Đẹp Chuẩn Ô Ly</h3>
      <div class="rule-list">
        ${theory.writingRules.map(r => `
          <div class="rule-item">
            <span><strong>${r.rule}:</strong> ${r.detail}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 10. MODULE MINIGAME: 2 CHẾ ĐỘ (NGHE ÂM ➔ CHỌN NGHĨA & CHO NGHĨA ➔ CHỌN CHỮ HÀN)
function setupQuizModule() {
  const modeListenBtn = document.getElementById('quiz-mode-listen-btn');
  const modeMeaningBtn = document.getElementById('quiz-mode-meaning-btn');
  const promptArea = document.getElementById('quiz-prompt-area');
  const optionsGrid = document.getElementById('quiz-options-grid');
  const scoreVal = document.getElementById('quiz-score-val');
  const questionNum = document.getElementById('quiz-question-num');
  const nextQBtn = document.getElementById('quiz-next-btn');

  // Chuyển đổi qua lại giữa 2 chế độ
  modeListenBtn.onclick = () => {
    modeListenBtn.classList.add('active');
    modeMeaningBtn.classList.remove('active');
    AppState.quiz.mode = 'listen';
    generateQuestion();
  };

  modeMeaningBtn.onclick = () => {
    modeMeaningBtn.classList.add('active');
    modeListenBtn.classList.remove('active');
    AppState.quiz.mode = 'meaning';
    generateQuestion();
  };

  function generateQuestion() {
    const vocabPool = AppState.allCards.filter(c => c.type === 'vocab');
    if (vocabPool.length < 4) return;

    // Chọn ngẫu nhiên đáp án đúng
    const correct = vocabPool[Math.floor(Math.random() * vocabPool.length)];
    
    // Chọn 3 đáp án sai
    const wrongs = [];
    while (wrongs.length < 3) {
      const candidate = vocabPool[Math.floor(Math.random() * vocabPool.length)];
      if (candidate.korean !== correct.korean && !wrongs.some(w => w.korean === candidate.korean)) {
        wrongs.push(candidate);
      }
    }

    const allOptions = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    AppState.quiz.currentQuestion = correct;
    AppState.quiz.options = allOptions;

    questionNum.textContent = `Câu hỏi #${AppState.quiz.currentQuestionIndex}`;
    nextQBtn.style.display = 'none';
    optionsGrid.innerHTML = '';

    if (AppState.quiz.mode === 'listen') {
      // CHẾ ĐỘ 1: Nghe âm thanh -> Chọn hình/nghĩa TV
      promptArea.innerHTML = `
        <div style="margin: 12px 0;">
          <div class="audio-btn-group">
            <button id="quiz-speak-btn" class="quiz-listen-btn" title="Bấm nghe chuẩn">
              <span>🔊</span>
            </button>
            <button id="quiz-speak-slow-btn" class="card-audio-btn-slow" style="font-size: 1.1rem; padding: 12px 20px;">
              <span>🐢 Nghe Chậm</span>
            </button>
          </div>
          <p style="font-weight: 700; color: #64748B; margin-top: 8px;">Bé lắng nghe và chọn bức tranh đúng nhé!</p>
        </div>
      `;

      document.getElementById('quiz-speak-btn').onclick = () => VoiceService.speak(correct.korean, 0.9);
      document.getElementById('quiz-speak-slow-btn').onclick = () => VoiceService.speak(correct.korean, 0.65);

      allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerHTML = `
          <span class="opt-icon">${opt.icon}</span>
          <strong>${opt.vietnamese}</strong>
          <small style="color: #64748B;">"${opt.korean}"</small>
        `;
        btn.onclick = () => handleAnswer(opt, btn);
        optionsGrid.appendChild(btn);
      });

      // Phát âm tự động
      setTimeout(() => VoiceService.speak(correct.korean, 0.9), 300);

    } else {
      // CHẾ ĐỘ 2 (Yêu cầu mới): Cho nghĩa tiếng Việt -> Chọn chữ tiếng Hàn tương ứng
      promptArea.innerHTML = `
        <div class="quiz-prompt-box">
          <div class="quiz-prompt-icon">${correct.icon}</div>
          <div class="quiz-prompt-vi">${correct.vietnamese}</div>
          <p style="color: #6B7280; font-weight: 600; margin-top: 6px;">(${correct.note})</p>
          <div style="margin-top: 10px; font-weight: 800; color: #4F46E5;">👉 Đố bé chữ tiếng Hàn nào dưới đây tương ứng?</div>
        </div>
      `;

      allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn quiz-korean-opt';
        btn.innerHTML = `
          <span>${opt.korean}</span>
          <small style="font-size: 0.85rem; font-family: 'Nunito', sans-serif; color: #6B7280; font-weight: 600;">[ ${opt.pronounce} ]</small>
        `;
        btn.onclick = () => handleAnswer(opt, btn);
        optionsGrid.appendChild(btn);
      });
    }
  }

  function handleAnswer(selectedOpt, btnElement) {
    const allBtns = optionsGrid.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    const correct = AppState.quiz.currentQuestion;

    if (selectedOpt.korean === correct.korean) {
      btnElement.classList.add('correct');
      AppState.quiz.score += 10;
      scoreVal.textContent = `${AppState.quiz.score} điểm`;
      VoiceService.speak("정답입니다!", 1.0); // Khen tiếng Hàn
    } else {
      btnElement.classList.add('wrong');
      // Highlight đáp án đúng
      allBtns.forEach(b => {
        if (b.innerText.includes(correct.korean) || b.innerText.includes(correct.vietnamese)) {
          b.classList.add('correct');
        }
      });
      // Đọc lại từ đúng
      setTimeout(() => VoiceService.speak(correct.korean, 0.85), 600);
    }
    nextQBtn.style.display = 'inline-flex';
  }

  nextQBtn.onclick = () => {
    AppState.quiz.currentQuestionIndex++;
    generateQuestion();
  };

  generateQuestion();
}
