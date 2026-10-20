'use strict';

/* ==========================================================================
   CẤU HÌNH THIỆP HOA MẪU (BẠN CÓ THỂ TÙY CHỈNH THEO Ý MUỐN TẠI ĐÂY)
   ========================================================================== */
const config = {
    // Tên hoặc danh xưng người gửi (Ví dụ: Anh, Em, Chồng, Con, Bạn...)
    sender: "Anh",

    // Tên hoặc danh xưng người nhận (Ví dụ: Bé Iu, Em, Vợ yêu, Mẹ kính yêu...)
    recipient: "Bé Iu",

    // Dịp kỷ niệm hiển thị trên đầu trang
    theme: "20 THÁNG 10 · MỘT NGÀY THẬT ĐẶC BIỆT",

    // Danh sách đường dẫn ảnh kỷ niệm (để rỗng [] sẽ tự động dùng tranh hoa mẫu)
    photos: ["anh6.jpg"],

    // Chú thích nhỏ dưới ảnh kỷ niệm
    caption: "Người anh luôn muốn tặng hoa. ♡",

    // Đường dẫn file nhạc phát khi chạm vào màn hình (hỗ trợ file .mp3)
    music: "../music/dep.mp3",

    // Nội dung bức thư chúc mừng trong tấm thiệp:
    letter: `
Chúc mừng ngày 20/10, người anh thương nhất!

Anh muốn tặng em một bó hoa thật đặc biệt. Mỗi bông hoa là một điều anh luôn mong ước cho em: bình an, niềm vui, những ước mơ sớm thành hiện thực và thật nhiều yêu thương đong đầy.

Cảm ơn em vì những quan tâm dịu dàng, những nụ cười ấm áp khiến một ngày bình thường cũng trở nên thật ngọt ngào và đáng nhớ.

Chúc em luôn rạng rỡ, tự tin làm những điều mình thích. Khi mệt mỏi hãy nhớ luôn có anh ở đây đồng hành và chở che cho em.

Thương em rất nhiều. ♡
    `
};

/* ==========================================================================
   DANH SÁCH 5 BÔNG HOA & THÔNG ĐIỆP Ý NGHĨA
   ========================================================================== */
const flowers = [
    { id: 'tulip', name: 'Tulip', message: 'Mong những ngày của em luôn có điều để mong chờ.' },
    { id: 'sunflower', name: 'Hướng dương', message: 'Anh thích nhất là khi em cười rạng rỡ.' },
    { id: 'rose', name: 'Hoa hồng', message: 'Có những lời nói mãi vẫn chưa đủ: anh thương em.' },
    { id: 'daisy', name: 'Cúc nhỏ', message: 'Cảm ơn em vì sự xuất hiện giản dị mà quý giá.' },
    { id: 'baby', name: 'Baby trắng', message: 'Mong mình cùng nhau đi qua thật nhiều mùa hoa nữa.' }
];

/* ==========================================================================
   KHỞI TẠO BIẾN & HỆ THỐNG ÂM THANH
   ========================================================================== */
const $ = id => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let current = 'front';
let selected = [];
let tied = false;

// Khởi tạo audio phát nhạc nền .mp3
const audio = new Audio();
let isMusicPlaying = false;

function setupAudioSource(src) {
    if (!src) return;
    audio.src = src;
    audio.loop = true;
    audio.volume = 0.5; // Âm lượng 50%

    // Tự động thử fallback nếu mở ở thư mục gốc hoặc thư mục con
    audio.onerror = () => {
        if (audio.src.includes('../music/')) {
            audio.src = audio.src.replace('../music/', 'music/');
        }
    };
}
setupAudioSource(config.music);

// Phát nhạc khi người dùng tương tác lần đầu
function playMusic() {
    if (!isMusicPlaying && audio.src) {
        audio.play().then(() => {
            isMusicPlaying = true;
        }).catch(() => {
            // Chờ tương tác người dùng tiếp theo
        });
    }
}

// Bắt sự kiện chạm/click để phát nhạc tự động
document.addEventListener('click', playMusic);
document.addEventListener('touchstart', playMusic);
document.addEventListener('pointerdown', playMusic);
document.addEventListener('keydown', playMusic);

/* ==========================================================================
   HÀM CHUYỂN ĐỔI MÀN HÌNH & XỬ LÝ ẢNH
   ========================================================================== */
function show(id) {
    current = id;
    ['front', 'choose', 'wrap'].forEach(s => $(s).hidden = s !== id);
    window.scrollTo(0, 0);
}

function svgFlower(id) {
    return `<svg viewBox="0 0 120 240" aria-hidden="true"><use href="#${id}"/></svg>`;
}

// Tranh hoa vẽ nghệ thuật SVG dự phòng nếu không có file ảnh
function illustration(i) {
    const bg = ['#d8dfcb', '#ead6cf', '#e8dfc7'][i % 3];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="520"><rect width="420" height="520" fill="${bg}"/><rect x="25" y="25" width="370" height="470" rx="160" fill="none" stroke="#fff9e6"/><path d="M212 380Q190 267 210 165" fill="none" stroke="#7e986e" stroke-width="7"/><path d="M205 302Q111 274 125 237Q190 237 205 302m5 31q100-35 92-72q-78 5-92 72" fill="#9fb088"/><g fill="${['#ce8f9d', '#e8c980', '#f9f3df'][i % 3]}"><ellipse cx="210" cy="136" rx="27" ry="53"/><ellipse cx="210" cy="136" rx="27" ry="53" transform="rotate(72 210 190)"/><ellipse cx="210" cy="136" rx="27" ry="53" transform="rotate(144 210 190)"/><ellipse cx="210" cy="136" rx="27" ry="53" transform="rotate(216 210 190)"/><ellipse cx="210" cy="136" rx="27" ry="53" transform="rotate(288 210 190)"/></g><circle cx="210" cy="190" r="30" fill="#bda474"/><text x="210" y="437" text-anchor="middle" font-family="'Dancing Script', cursive" font-weight="600" font-size="28" fill="#65775c">${['A little love', 'You make me bloom', 'Forever, with you'][i % 3]}</text><text x="210" y="469" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="10" letter-spacing="3" fill="#879076">SPECIAL DAY</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const samplePhotos = [0, 1, 2].map(illustration);

function getPhoto(i) {
    const list = config.photos && config.photos.length ? config.photos : samplePhotos;
    return list[i % list.length];
}

function setPhoto(el, i) {
    el.onerror = () => {
        // Thử đường dẫn cùng thư mục nếu không thấy ở thư mục cha
        if (el.src.includes('../anh7.jpg')) {
            el.src = 'anh7.jpg';
            return;
        }
        el.onerror = null;
        el.src = samplePhotos[i % 3];
    };
    el.src = getPhoto(i);
}

/* ==========================================================================
   MÀN 1: BẤM CHUÔNG & MỞ CỬA TIỆM HOA
   ========================================================================== */
$('ringBell').onclick = async () => {
    $('ringBell').disabled = true;
    playMusic();
    $('shopWrap').classList.add('open');
    $('shopSign').textContent = 'Mở cửa ♡';

    const recipient = config.recipient || "Bé Iu";
    $('welcome').textContent = `Chào ${recipient}, bó hoa của ${recipient} đang chờ ♡`;
    $('welcome').hidden = false;
    $('frontHint').style.opacity = '0';

    await new Promise(r => setTimeout(r, reduced ? 300 : 2300));
    show('choose');
};

/* ==========================================================================
   MÀN 2: CHỌN HOA VÀ CẮM VÀO BÓ
   ========================================================================== */
function addToBouquet(index, target) {
    const layouts = [
        [[67, 20, 92, 220, -17], [116, -6, 78, 210, -8]],
        [[197, -15, 87, 220, 8], [268, 38, 63, 174, 22]],
        [[147, 16, 102, 228, 0], [94, 66, 81, 184, -14], [217, 66, 82, 182, 13]],
        [[253, 13, 79, 212, 13], [55, 65, 67, 175, -24]],
        [[38, 8, 85, 235, -20], [281, 13, 81, 230, 24], [231, -15, 72, 206, 15]]
    ];

    const e = document.createElement('div');
    e.className = 'bouquet-cluster';
    e.style.zIndex = String([2, 1, 4, 2, 0][index]);

    let art = '<svg viewBox="0 0 400 390" aria-hidden="true">';
    for (const [x, y, w, h, r] of layouts[index]) {
        art += `<g transform="rotate(${r} ${x + w / 2} ${y + h * 0.78})"><use href="#${flowers[index].id}" x="${x}" y="${y}" width="${w}" height="${h}"/></g>`;
    }
    art += '</svg>';
    e.innerHTML = art;
    $(target).append(e);
}

// Hiệu ứng hoa bay mượt mà vào bó hoa khi chạm chọn
function animatePick(button, index) {
    if (reduced) return;
    const from = button.getBoundingClientRect();
    const to = $('chooseBouquet').getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'flying-flower';
    el.innerHTML = svgFlower(flowers[index].id);
    el.style.left = from.left + 'px';
    el.style.top = from.top + 'px';
    document.body.append(el);

    requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.transform = `translate(${to.left + to.width / 2 - from.left - 50}px, ${to.top + 20 - from.top}px) scale(.6) rotate(15deg)`;
        el.style.opacity = '0';
    }));

    setTimeout(() => el.remove(), 850);
}

// Khởi tạo các nút chọn hoa trên kệ
flowers.forEach((flower, index) => {
    const b = document.createElement('button');
    b.className = 'flower-choice';
    b.setAttribute('aria-label', 'Chọn ' + flower.name);
    b.innerHTML = svgFlower(flower.id) + `<span>${flower.name}</span>`;

    b.onclick = () => {
        if (selected.includes(index)) return;
        selected.push(index);
        b.classList.add('selected');
        b.disabled = true;

        animatePick(b, index);
        addToBouquet(index, 'chosenFlowers');
        $('emptyBouquet').hidden = true;
        $('selectionCount').textContent = `${selected.length} / 5 BÔNG HOA`;
        playMusic();

        // Đã chọn đủ 5 bông -> hiển thị nút Tiếp tục
        if (selected.length === 5) {
            setTimeout(() => {
                $('wrapButton').hidden = false;
            }, reduced ? 0 : 900);
        }
    };
    $('flowerShelf').append(b);
});

// Chuyển sang màn hình gói hoa
$('wrapButton').onclick = () => {
    if (selected.length !== 5) return;
    $('wrappedFlowers').replaceChildren();
    selected.forEach(i => addToBouquet(i, 'wrappedFlowers'));
    show('wrap');
};

/* ==========================================================================
   MÀN 3: GÓI HOA, THẮT NƠ VÀ MỞ THIỆP
   ========================================================================== */
$('tieBow').onclick = async () => {
    if (tied) return;
    tied = true;
    $('tieBow').disabled = true;
    $('wrappedBouquet').classList.add('tied');
    playMusic();

    const sender = config.sender || "Anh";
    $('wrapTitle').innerHTML = `Một bó hoa,<br>cho người ${sender} <em>thương nhất.</em>`;
    $('wrapHint').textContent = `${sender} còn giấu một tấm thiệp trong bó hoa…`;

    await new Promise(r => setTimeout(r, reduced ? 100 : 1100));
    $('openCard').hidden = false;
    $('wrapHint').textContent = `Chạm vào tấm thiệp nhỏ để đọc lời ${sender} gửi.`;
};

// Mở hộp thoại bức thư
function openLetter() {
    setPhoto($('letterPhoto'), 0);
    $('letter').showModal();
    $('letter').scrollTop = 0;
}

$('openCard').onclick = openLetter;
$('closeCard').onclick = () => $('letter').close();
$('letterPhoto').onclick = () => openPhoto(0, config.caption || `Người ${config.sender || 'anh'} luôn muốn tặng hoa. ♡`);

// Mở hộp thoại xem ảnh phóng to
function openPhoto(i, caption) {
    setPhoto($('largePhoto'), i);
    $('photoCaption').textContent = caption;
    $('photoViewer').showModal();
}

$('closePhoto').onclick = () => $('photoViewer').close();

/* ==========================================================================
   ÁP DỤNG CẤU HÌNH VÀ THAM SỐ VÀO GIAO DIỆN
   ========================================================================== */
function applyConfig() {
    const recipient = config.recipient || "Bé Iu";
    const sender = config.sender || "Anh";
    const theme = config.theme || "20 THÁNG 10 · MỘT NGÀY THẬT ĐẶC BIỆT";
    const caption = config.caption || `Người ${sender} luôn muốn tặng hoa. ♡`;

    // Cập nhật tiêu đề tab trình duyệt
    document.title = `Tiệm hoa của ${recipient} ♡`;

    // Cập nhật ngày kỷ niệm trên banner
    if ($('dateLabel')) $('dateLabel').textContent = theme;

    // Cập nhật biển hiệu tiệm hoa
    const shopBoardTitle = $('shopBoardTitle');
    if (shopBoardTitle) {
        const fullTitle = `TIỆM HOA CỦA ${recipient.toUpperCase()}`;
        shopBoardTitle.textContent = fullTitle;
        if (fullTitle.length > 24) {
            shopBoardTitle.setAttribute('font-size', '17');
        } else if (fullTitle.length > 18) {
            shopBoardTitle.setAttribute('font-size', '20');
        } else if (fullTitle.length > 14) {
            shopBoardTitle.setAttribute('font-size', '23');
        } else {
            shopBoardTitle.setAttribute('font-size', '26');
        }
    }

    if ($('shopSign')) $('shopSign').textContent = `Chờ ${recipient} ♡`;
    if ($('frontHint')) $('frontHint').textContent = `Chạm chiếc chuông bên cửa. ${sender} đang đợi ${recipient}.`;

    // Cập nhật màn chọn hoa
    if ($('chooseTitle')) $('chooseTitle').innerHTML = `${recipient} chọn hoa,<br>${sender} gửi <em>yêu thương.</em>`;
    if ($('chooseLead')) $('chooseLead').textContent = `Chạm từng bông hoa để đặt vào bó. Chọn đủ 5 bông để hoàn thành bó hoa của ${recipient}.`;
    if ($('emptyBouquet')) $('emptyBouquet').innerHTML = `Bó hoa của ${recipient}<br>đang chờ những điều dịu dàng.`;

    // Cập nhật thẻ quà gắn trên bó hoa
    if ($('tagMessage')) $('tagMessage').innerHTML = `Gửi người<br>${sender} thương ♡`;

    // Cập nhật tiêu đề thư, chú thích và chữ ký
    if ($('letterTitle')) $('letterTitle').innerHTML = `Gửi <span class="recipient">${recipient}</span> của ${sender},`;
    if ($('letterCaption')) $('letterCaption').textContent = caption;
    if ($('letterSignature')) $('letterSignature').textContent = `Thương ${recipient}, ${sender} ♡`;

    document.querySelectorAll('.recipient').forEach(e => e.textContent = recipient);

    // Cập nhật nội dung thư
    if ($('letterText')) {
        $('letterText').textContent = typeof config.letter === 'string'
            ? config.letter.trim()
            : (Array.isArray(config.letter) ? config.letter.join('\n\n') : config.letter);
    }

    // Cập nhật thông điệp ý nghĩa của 5 loài hoa
    if (flowers && flowers.length >= 5) {
        flowers[0].message = `Mong những ngày của ${recipient} luôn có điều để mong chờ.`;
        flowers[1].message = `${sender} thích nhất là khi ${recipient} cười rạng rỡ.`;
        flowers[2].message = `Có những lời nói mãi vẫn chưa đủ: ${sender} thương ${recipient}.`;
        flowers[3].message = `Cảm ơn ${recipient} vì sự xuất hiện giản dị mà quý giá.`;
        flowers[4].message = `Mong mình cùng nhau đi qua thật nhiều mùa hoa nữa.`;
    }
}

// Hỗ trợ đọc nhanh tham số URL nếu người dùng truyền vào (ví dụ: ?to=Mẹ&from=Con)
(function checkUrlParams() {
    try {
        const params = new URLSearchParams(window.location.search);
        const to = params.get('to');
        const from = params.get('from');
        const theme = params.get('theme');
        const caption = params.get('caption');
        const music = params.get('m') || params.get('music');

        if (to) config.recipient = to.trim();
        if (from) config.sender = from.trim();
        if (theme) config.theme = theme.trim();
        if (caption) config.caption = caption.trim();
        if (music) {
            config.music = music.trim();
            setupAudioSource(config.music);
        }
    } catch (_) {}
    applyConfig();
})();

// Tạm dừng nhạc khi ẩn tab và phát lại khi mở lại tab
document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('sleep', document.hidden);
    if (document.hidden) {
        audio.pause();
    } else if (audio.src && isMusicPlaying) {
        audio.play().catch(() => {});
    }
});
