document.addEventListener("DOMContentLoaded", function () {
    let keyword = "";
    let romanized = "";
    let input = "";
    let gameStarted = false;
    let mistake = false;
    let score = 0;
    let timeLeft = 60;
    let timer;

    const keywords = [
        { kanji: "有村", romaji: "arimura" },
        { kanji: "大旭", romaji: "hiroaki" },
        { kanji: "長期的", romaji: "choukiteki" },
        { kanji: "スピード", romaji: "supi-do" },
        { kanji: "AI", romaji: "ai" },
        { kanji: "からあげ", romaji: "karaage" },
        { kanji: "キングダム", romaji: "kingudamu" },
        { kanji: "BIグループ", romaji: "biguru-pu" },
        { kanji: "行動指針", romaji: "koudousisinn" },
        { kanji: "BIグループ", romaji: "biguru-pu" },
        { kanji: "ロバート", romaji: "roba-to" },
        { kanji: "ダイアン", romaji: "daiann" },
        { kanji: "ヴィジョン", romaji: "vijyonn" },
        { kanji: "チーム", romaji: "ti-mu" },
        { kanji: "ニルヴァーナ", romaji: "niruva-na" },
        { kanji: "プログラミング", romaji: "puroguramingu" },
        { kanji: "お笑い芸人", romaji: "owaraigeininn" },
    ];

    const gameContainer = document.getElementById("game-container");

    function startGame() {
        score = 0;
        timeLeft = 60;
        gameStarted = true;
        nextKeyword();
        updateUI();
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                endGame();
            }
            updateUI();
        }, 1000);
    }

    function nextKeyword() {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        keyword = randomKeyword.kanji;
        romanized = randomKeyword.romaji;
        input = "";
    }

    function resetGame() {
        clearInterval(timer);
        keyword = "";
        romanized = "";
        input = "";
        gameStarted = false;
        score = 0;
        timeLeft = 60;
        updateUI();
    }

    function endGame() {
        clearInterval(timer);
        gameStarted = false;
        updateUI();
    }

    function handleTyping(key) {
        if (key === romanized[input.length]) {
            input += key;
            if (input.length === romanized.length) {
                score += 10;
                nextKeyword();
            }
            updateUI();
        } else {
            mistake = true;
            updateUI();
            setTimeout(() => {
                mistake = false;
                updateUI();
            }, 100);
        }
    }

    function updateUI() {
        if (!gameStarted) {
            gameContainer.innerHTML = `
                <p id="start-message" class="mb-4 text-blue-600">スペースキーでスタート</p>
                <p id="reset-message" class="text-blue-600">エスケープキーでリセット</p>
                ${score > 0 ? `<p class="text-2xl mb-4 text-blue-700">最終スコア: ${score}</p>` : ''}
            `;
        } else {
            gameContainer.innerHTML = `
                <div class="flex justify-between mb-4">
                    <p class="text-2xl text-blue-700">スコア: ${score}</p>
                    <p class="text-2xl text-blue-700">残り時間: ${timeLeft}秒</p>
                </div>
                <p class="text-3xl mb-2 text-blue-700">${keyword}</p>
                <p class="text-xl mb-4 text-blue-500">${romanized}</p>
                <p class="text-4xl ${mistake ? "bg-red-500" : "bg-blue-200"} p-4 rounded transition-colors duration-100">
                    ${input}<span class="text-blue-400">${romanized.slice(input.length)}</span>
                </p>
            `;
        }
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === " " && !gameStarted) {
            startGame();
        } else if (e.key === "Escape") {
            resetGame();
        } else if (gameStarted) {
            handleTyping(e.key);
        }
    });
    
});