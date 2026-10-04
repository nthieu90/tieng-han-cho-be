window.KOREAN_LESSONS_DATA = {
  "lessons": [
    {
      "id": "lesson-1",
      "lessonNumber": 1,
      "title": "Mở Đầu, 10 Nguyên Âm & 10 Phụ Âm Cơ Bản",
      "subtitle": "Bảng chữ cái Hangeul • Thuyết Tam Tài • Khẩu hình miệng • 23 Từ Vựng • Chống nhầm lẫn",
      "date": "2026-10-04",
      "theory": {
        "overview": {
          "name": "Hangeul (한글)",
          "creator": "Vua Sejong (세종대왕)",
          "holiday": "Ngày 9 tháng 10 hàng năm",
          "totalLetters": 40,
          "vowelsCount": "21 nguyên âm (10 cơ bản + 11 mở rộng)",
          "consonantsCount": "19 phụ âm (10 cơ bản + 4 bật hơi + 5 căng)"
        },
        "syllableRule": {
          "rule": "1 tiếng luôn được viết gọn và cân đối trong 1 ô vuông.",
          "parts": "Bắt buộc phải có 2 phần: Phụ Âm Đầu (PÂĐ) + Nguyên Âm (NÂ).",
          "direction": "Viết và đọc từ TRÁI SANG PHẢI, từ TRÊN XUỐNG DƯỚI.",
          "silentConsonant": "Phụ âm đầu 'ㅇ' là phụ âm câm (không phát ra âm thanh). Khi muốn đọc một tiếng chỉ có nguyên âm, khi viết vẫn bắt buộc phải viết 'ㅇ' ở đầu để đủ 2 phần."
        },
        "spacingRules": [
          { "rule": "Chữ trong cùng 1 từ", "detail": "Phải viết sát nhau, KHÔNG CÓ khoảng cách (Đúng: 아이; Sai: 아  이)." },
          { "rule": "Giữa các từ riêng biệt", "detail": "Phải VIẾT CÁCH RA (Đúng: 오이 여우; Sai: 오이여우)." }
        ],
        "tamTai": {
          "name": "Thuyết Tam Tài (Trời - Đất - Người)",
          "description": "3 yếu tố nền tảng sáng tạo nên toàn bộ nguyên âm:",
          "elements": [
            { "symbol": "•", "hantu": "Thiên (Trời)", "meaning": "Mặt trời tròn xoe trên cao" },
            { "symbol": "ㅡ", "hantu": "Địa (Đất)", "meaning": "Mặt đất bằng phẳng bao la" },
            { "symbol": "ㅣ", "hantu": "Nhân (Người)", "meaning": "Con người đứng thẳng kiên cường" }
          ]
        },
        "writingRules": [
          { "rule": "Kích thước PÂĐ", "detail": "Phụ âm đầu thường viết nhỏ hơn nguyên âm một chút (Đúng: 더, 녀, 셔; 조, 교...). Không nên viết quá to hoặc quá nhỏ." },
          { "rule": "Chiều cao chữ", "detail": "Chữ viết cao tầm 2 - 3 ô ly là vừa vặn, đều nhau." },
          { "rule": "Căn giữa nét ngắn", "detail": "Phụ âm đầu và nét ngắn phải ngang nhau, canh ngay giữa nguyên âm (Đúng: 아, 오; Sai nếu viết lệch)." },
          { "rule": "Nét ngắn rõ ràng", "detail": "Các nét phụ ngắn phải viết dứt khoát, không viết dính hoặc quá ngắn." },
          { "rule": "Không cắt nhau", "detail": "Phụ âm đầu và nguyên âm không được dính hay cắt xuyên qua nhau." },
          { "rule": "Khoảng cách hợp lý", "detail": "Khoảng cách giữa PÂĐ và NÂ vừa phải, không viết cách nhau quá xa (Sai: ㄷ ㅏ)." }
        ]
      },
      "lookAlikePairs": [
        {
          "id": "pair-1",
          "title": "Cặp Đảo Chữ: Con Cáo 🦊 vs Sữa Bò 🥛",
          "wordA": { "korean": "여우", "vietnamese": "Con cáo", "icon": "🦊", "highlight": "여" },
          "wordB": { "korean": "우유", "vietnamese": "Sữa bò", "icon": "🥛", "highlight": "유" },
          "storyTip": "🦊 여우 (Con cáo): Chữ '여' có 2 nét ngắn quay sang trái như 2 chiếc tai cáo nhọn, chữ '우' rủ xuống như cái đuôi.\n🥛 우유 (Sữa bò): Chữ '우' có 1 tia sữa, chữ '유' có 2 tia sữa đang bắn ra từ bình sữa!",
          "rule": "Có tai cáo '여' đứng đầu là Con Cáo; Có 2 tia sữa '유' ở đuôi là Sữa Bò!"
        },
        {
          "id": "pair-2",
          "title": "Cặp Đối Xứng Trái/Phải: Bố 👨 vs Mẹ 👩",
          "wordA": { "korean": "아버지", "vietnamese": "Bố, ba", "icon": "👨", "highlight": "아" },
          "wordB": { "korean": "어머니", "vietnamese": "Mẹ, má", "icon": "👩", "highlight": "어" },
          "storyTip": "👨 아버지 (Bố): Nét '아' quay sang PHẢI ➔ Bố mạnh mẽ tiến về phía trước che chở gia đình.\n👩 어머니 (Mẹ): Nét '어' quay sang TRÁI ➔ Mẹ dịu dàng ôm con vào lòng hướng về trái tim.",
          "rule": "Nét sang Phải là Bố (아); Nét sang Trái là Mẹ (어)!"
        },
        {
          "id": "pair-3",
          "title": "Cặp Nguyên Âm: Em Bé 👶 vs Dưa Leo 🥒",
          "wordA": { "korean": "아이", "vietnamese": "Em bé", "icon": "👶", "highlight": "아" },
          "wordB": { "korean": "오이", "vietnamese": "Dưa leo", "icon": "🥒", "highlight": "오" },
          "storyTip": "👶 아이 (Em bé): Chữ '아' nét ngang dang sang phải như em bé dang tay đòi bế.\n🥒 오이 (Dưa leo): Chữ '오' có nét nhô lên cao như ngọn dây leo mọc từ mặt đất.",
          "rule": "Nét ngang dang tay là Em Bé (아이); Nét chồi lên cao là Quả Dưa Leo (오이)!"
        },
        {
          "id": "pair-4",
          "title": "Cặp Thước Kẻ 📏 vs Đại Từ Tôi 🙋",
          "wordA": { "korean": "자", "vietnamese": "Cây thước kẻ", "icon": "📏", "highlight": "자" },
          "wordB": { "korean": "저", "vietnamese": "Tôi (khiêm tốn)", "icon": "🙋", "highlight": "저" },
          "storyTip": "📏 자: Nét sang phải (nguyên âm ㅏ) ➔ Thước kẻ đo dài sang phải.\n🙋 저: Nét sang trái (nguyên âm ㅓ) ➔ Hướng về bản thân mình ('Tôi').",
          "rule": "Nét sang Phải = Thước kẻ (자); Nét sang Trái = Tôi (저)!"
        }
      ],
      "consonantTheory": {
        "title": "Bài 2: 10 Phụ Âm Cơ Bản (Nguyên lý sáng tạo)",
        "principle": "Dựa vào hình dáng của cơ quan phát âm khi nói: Lưỡi, Môi, Răng, Cổ họng.",
        "sensoryTricks": [
          { "name": "Mẹo tờ giấy ăn (Luồng hơi)", "desc": "Cầm tờ giấy mỏng trước miệng: Đọc âm thường (ㅂ, ㄷ, ㄱ) giấy rung nhẹ; Đọc âm bật hơi (ㅍ, ㅌ, ㅋ) giấy bay mạnh!" },
          { "name": "Mẹo sờ thanh quản (Căng cơ)", "desc": "Đặt ngón tay lên cổ họng để cảm nhận độ nén hơi và căng cơ khi phát âm các phụ âm căng (ㅃ, ㄸ, ㄲ)." }
        ]
      },
      "vowels": [
        {
          "id": "v1",
          "char": "아",
          "raw": "ㅏ",
          "roman": "a",
          "vi": "a",
          "group": "doc",
          "strokeHint": "Nét đứng trước, 1 nét ngắn sang PHẢI",
          "mouthCategory": "Mở to miệng",
          "mouthTip": "Mở to miệng tự nhiên theo chiều dọc, hạ hàm dưới, đầu lưỡi chạm chân răng dưới.",
          "mouthShape": "open-wide"
        },
        {
          "id": "v2",
          "char": "야",
          "raw": "ㅑ",
          "roman": "ya",
          "vi": "ya",
          "group": "doc",
          "strokeHint": "Nét đứng trước, 2 nét ngắn sang PHẢI",
          "mouthCategory": "Lướt từ [i] sang [a]",
          "mouthTip": "Bắt đầu bằng khẩu hình bẹt mép của [i] rồi chuyển thật nhanh sang mở to miệng [a].",
          "mouthShape": "glide-open"
        },
        {
          "id": "v3",
          "char": "어",
          "raw": "ㅓ",
          "roman": "eo",
          "vi": "o / ơ",
          "group": "doc",
          "strokeHint": "1 nét ngắn sang TRÁI, rồi nét đứng",
          "mouthCategory": "Mở miệng vừa phải",
          "mouthTip": "Mở miệng hình chữ O tự nhiên, hạ cằm vừa phải, không chúm môi, phát âm hơi hướng 'ơ' của tiếng Việt.",
          "mouthShape": "open-mid"
        },
        {
          "id": "v4",
          "char": "여",
          "raw": "ㅕ",
          "roman": "yeo",
          "vi": "yo / yơ",
          "group": "doc",
          "strokeHint": "2 nét ngắn sang TRÁI, rồi nét đứng",
          "mouthCategory": "Lướt từ [i] sang [ơ]",
          "mouthTip": "Lướt nhanh từ khẩu hình [i] rồi hạ hàm mở miệng vừa phải sang [ơ/o].",
          "mouthShape": "glide-mid"
        },
        {
          "id": "v5",
          "char": "오",
          "raw": "ㅗ",
          "roman": "o",
          "vi": "ô",
          "group": "ngang",
          "strokeHint": "1 nét ngắn hướng LÊN, rồi nét ngang",
          "mouthCategory": "Chúm môi tròn xoe",
          "mouthTip": "Chúm môi thành hình tròn xoe chữ O đưa về phía trước, không bẹt miệng sang 2 bên.",
          "mouthShape": "round-o"
        },
        {
          "id": "v6",
          "char": "요",
          "raw": "ㅛ",
          "roman": "yo",
          "vi": "yô",
          "group": "ngang",
          "strokeHint": "2 nét ngắn hướng LÊN, rồi nét ngang",
          "mouthCategory": "Lướt từ [i] sang chúm môi [ô]",
          "mouthTip": "Bắt đầu bẹt mép [i] lướt nhanh sang chúm môi tròn xoe [ô].",
          "mouthShape": "glide-round-o"
        },
        {
          "id": "v7",
          "char": "우",
          "raw": "ㅜ",
          "roman": "u",
          "vi": "u",
          "group": "ngang",
          "strokeHint": "Nét ngang trước, 1 nét ngắn hướng XUỐNG",
          "mouthCategory": "Chu môi nhọn",
          "mouthTip": "Chu môi nhọn ra phía trước như đang huýt sáo, lỗ môi tròn nhỏ xíu.",
          "mouthShape": "round-u"
        },
        {
          "id": "v8",
          "char": "유",
          "raw": "ㅠ",
          "roman": "yu",
          "vi": "yu",
          "group": "ngang",
          "strokeHint": "Nét ngang trước, 2 nét ngắn hướng XUỐNG",
          "mouthCategory": "Lướt từ [i] sang chu môi [u]",
          "mouthTip": "Lướt nhanh từ [i] sang chu môi nhọn như huýt sáo [u].",
          "mouthShape": "glide-round-u"
        },
        {
          "id": "v9",
          "char": "으",
          "raw": "ㅡ",
          "roman": "eu",
          "vi": "ư",
          "group": "ngang",
          "strokeHint": "1 nét ngang phẳng (Đất)",
          "mouthCategory": "Bẹt mép cười mỉm",
          "mouthTip": "Kéo mép sang hai bên như đang cười mỉm, hai hàm răng gần khép lại, lưỡi nâng cao.",
          "mouthShape": "spread-smile"
        },
        {
          "id": "v10",
          "char": "이",
          "raw": "ㅣ",
          "roman": "i",
          "vi": "i",
          "group": "doc",
          "strokeHint": "1 nét đứng thẳng (Người)",
          "mouthCategory": "Cười tươi kéo ngang",
          "mouthTip": "Kéo rộng khóe miệng sang hai bên như cười thật tươi, mặt lưỡi nâng sát vòm họng trên.",
          "mouthShape": "spread-wide"
        }
      ],
      "consonantsAll": [
        {
          "id": "c1",
          "char": "ㅇ",
          "name": "Hình tròn",
          "sound": "Không đọc (PÂ câm)",
          "organ": "Cổ họng mở",
          "organDesc": "Mô phỏng cổ họng hình tròn mở rộng để luồng khí đi ra tự nhiên.",
          "examples": { "ㅗ": "오", "ㅛ": "요", "ㅓ": "어", "ㅕ": "여" }
        },
        {
          "id": "c2",
          "char": "ㄱ",
          "name": "Giống số 7",
          "sound": "[k / g]",
          "organ": "Cuống lưỡi",
          "organDesc": "Mô phỏng cuống lưỡi cong lên chạm vào vòm họng trên để chặn hơi.",
          "examples": { "ㅗ": "고", "ㅛ": "교", "ㅓ": "거", "ㅕ": "겨" }
        },
        {
          "id": "c3",
          "char": "ㄴ",
          "name": "Giống chữ L",
          "sound": "[n]",
          "organ": "Đầu lưỡi",
          "organDesc": "Mô phỏng đầu lưỡi cong lên chạm vào chân răng trên (nướu răng).",
          "examples": { "ㅗ": "노", "ㅛ": "뇨", "ㅓ": "너", "ㅕ": "녀" }
        },
        {
          "id": "c4",
          "char": "ㄷ",
          "name": "Giống chữ C",
          "sound": "[t / d]",
          "organ": "Đầu lưỡi chặn răng",
          "organDesc": "Tạo từ nét chữ ㄴ thêm 1 nét ngang, đầu lưỡi chạm vào răng trên rồi bật nhẹ ra.",
          "examples": { "ㅗ": "도", "ㅛ": "됴", "ㅓ": "더", "ㅕ": "뎌" }
        },
        {
          "id": "c5",
          "char": "ㄹ",
          "name": "Giống số 2",
          "sound": "[l / r]",
          "organ": "Lưỡi uốn lượn",
          "organDesc": "Mô phỏng hình dáng chiếc lưỡi uốn cong lên vòm miệng khi rung nhẹ.",
          "examples": { "ㅗ": "로", "ㅛ": "료", "ㅓ": "러", "ㅕ": "려" }
        },
        {
          "id": "c6",
          "char": "ㅁ",
          "name": "Vuông / Chữ nhật",
          "sound": "[m]",
          "organ": "Đôi môi",
          "organDesc": "Mô phỏng hai bờ môi mím khép lại tạo thành hình chữ nhật.",
          "examples": { "ㅗ": "모", "ㅛ": "묘", "ㅓ": "머", "ㅕ": "며" }
        },
        {
          "id": "c7",
          "char": "ㅂ",
          "name": "Nửa li nước",
          "sound": "[p / b]",
          "organ": "Bật mở môi",
          "organDesc": "Tạo từ hình chữ nhật ㅁ thêm 2 nét nhô lên, biểu thị luồng khí bật mở bờ môi.",
          "examples": { "ㅗ": "보", "ㅛ": "뵤", "ㅓ": "버", "ㅕ": "벼" }
        },
        {
          "id": "c8",
          "char": "ㅅ",
          "name": "Sắc rồi huyền",
          "sound": "[s / sh]",
          "organ": "Răng",
          "organDesc": "Mô phỏng hình dáng chiếc răng, hai hàm khép gần nhau để luồng khí xì qua.",
          "examples": { "ㅗ": "소", "ㅛ": "쇼", "ㅓ": "서", "ㅕ": "셔" }
        },
        {
          "id": "c9",
          "char": "ㅈ",
          "name": "Nét 7 rồi huyền",
          "sound": "[ch / j]",
          "organ": "Răng và đầu lưỡi",
          "organDesc": "Tạo từ chữ ㅅ thêm nét ngang trên đỉnh, luồng khí cọ xát đầu lưỡi và răng.",
          "examples": { "ㅗ": "조", "ㅛ": "죠", "ㅓ": "저", "ㅕ": "져" }
        },
        {
          "id": "c10",
          "char": "ㅎ",
          "name": "Chữ O đội mũ",
          "sound": "[h]",
          "organ": "Cổ họng thở nhẹ",
          "organDesc": "Mô phỏng cổ họng thở hơi nhẹ từ sâu bên trong qua vòm họng.",
          "examples": { "ㅗ": "호", "ㅛ": "효", "ㅓ": "허", "ㅕ": "혀" }
        }
      ],
      "vocabulary": [
        { "id": "w_new1", "korean": "이", "vietnamese": "Số 2 (hai)", "pronounce": "i", "category": "Con số", "icon": "2️⃣", "note": "Số đếm thuần Hán" },
        { "id": "w_new2", "korean": "오", "vietnamese": "Số 5 (năm)", "pronounce": "ô", "category": "Con số", "icon": "5️⃣", "note": "Số đếm thuần Hán" },
        { "id": "w_new3", "korean": "요", "vietnamese": "ạ (đuôi câu kính ngữ)", "pronounce": "yô", "category": "Giao tiếp", "icon": "🙏", "note": "Viết ở cuối câu để biểu thị sự lịch sự, lễ phép" },
        { "id": "w_new4", "korean": "아이", "vietnamese": "Em bé, trẻ con", "pronounce": "a-i", "category": "Con người", "icon": "👶", "note": "Viết sát nhau không cách: 아이" },
        { "id": "w_new5", "korean": "오이", "vietnamese": "Quả dưa leo, dưa chuột", "pronounce": "ô-i", "category": "Thực vật", "icon": "🥒", "note": "Món rau củ thanh mát giòn ngon" },
        { "id": "w_new6", "korean": "여우", "vietnamese": "Con cáo", "pronounce": "yơ-u", "category": "Động vật", "icon": "🦊", "note": "Loài vật thông minh nhanh nhẹn" },
        { "id": "w_new7", "korean": "우유", "vietnamese": "Sữa bò, sữa tươi", "pronounce": "u-yu", "category": "Đồ uống", "icon": "🥛", "note": "Thức uống bổ dưỡng cho bé mỗi ngày" },
        { "id": "w1", "korean": "자", "vietnamese": "Cây thước kẻ", "pronounce": "cha", "category": "Đồ vật", "icon": "📏", "note": "Vật dụng học tập quen thuộc" },
        { "id": "w2", "korean": "저", "vietnamese": "Tôi, em, cháu", "pronounce": "chơ", "category": "Xưng hô", "icon": "🙋", "note": "Đại từ xưng hô lịch sự, khiêm tốn" },
        { "id": "w3", "korean": "가수", "vietnamese": "Ca sĩ", "pronounce": "ka-su", "category": "Nghề nghiệp", "icon": "🎤", "note": "Người biểu diễn bài hát" },
        { "id": "w4", "korean": "호주", "vietnamese": "Nước Úc", "pronounce": "hô-chu", "category": "Địa danh", "icon": "🦘", "note": "Quốc gia chuột túi Australia" },
        { "id": "w5", "korean": "여기", "vietnamese": "Ở đây, chỗ này", "pronounce": "yơ-ki", "category": "Vị trí", "icon": "📍", "note": "Chỉ địa điểm gần người nói" },
        { "id": "w6", "korean": "어느 나라", "vietnamese": "Nước nào?", "pronounce": "ơ-nư na-ra", "category": "Câu hỏi", "icon": "🌏", "note": "Dùng khi hỏi quốc tịch hoặc đất nước" },
        { "id": "w7", "korean": "바ダ", "vietnamese": "Biển", "pronounce": "pa-da", "category": "Thiên nhiên", "icon": "🌊", "note": "Bãi biển trong xanh lượn sóng" },
        { "id": "w8", "korean": "기자", "vietnamese": "Nhà báo, phóng viên", "pronounce": "ki-cha", "category": "Nghề nghiệp", "icon": "📰", "note": "Người viết tin tức thời sự" },
        { "id": "w9", "korean": "아버지", "vietnamese": "Bố, ba, cha", "pronounce": "a-bơ-ji", "category": "Gia đình", "icon": "👨", "note": "Cách gọi người cha trang trọng, lễ phép" },
        { "id": "w10", "korean": "어머니", "vietnamese": "Mẹ, má", "pronounce": "ơ-mơ-ni", "category": "Gia đình", "icon": "👩", "note": "Cách gọi người mẹ kính trọng" },
        { "id": "w11", "korean": "요리사", "vietnamese": "Đầu bếp", "pronounce": "yô-ri-sa", "category": "Nghề nghiệp", "icon": "👨‍🍳", "note": "Người nấu các món ăn ngon" },
        { "id": "w12", "korean": "이야기", "vietnamese": "Câu chuyện", "pronounce": "i-ya-ki", "category": "Giao tiếp", "icon": "📖", "note": "Chuyện kể, tâm sự, trò chuyện" },
        { "id": "w13", "korean": "아니요", "vietnamese": "Dạ không, Không phải", "pronounce": "a-ni-yô", "category": "Giao tiếp", "icon": "🙅", "note": "Từ chối, phủ định lịch sự (NO)" },
        { "id": "w14", "korean": "구두", "vietnamese": "Đôi giày tây / Giày da", "pronounce": "ku-du", "category": "Đồ vật", "icon": "👞", "note": "Giày trang trọng đi làm, đi tiệc" },
        { "id": "w15", "korean": "가지", "vietnamese": "Quả cà tím", "pronounce": "ka-ji", "category": "Thực vật", "icon": "🍆", "note": "Loại rau củ màu tím thơm ngon" },
        { "id": "w16", "korean": "모기", "vietnamese": "Con muỗi", "pronounce": "mô-ki", "category": "Động vật", "icon": "🦟", "note": "Loài côn trùng hay vo ve đốt ngứa" }
      ]
    }
  ]
};
