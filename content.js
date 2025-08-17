function typeLikeHuman(element, text, delay = 80) {
    if (!element) return;
    element.focus();
    element.value = "";

    let i = 0;
    function typeNext() {
        if (i < text.length) {
            element.value += text[i];
            element.dispatchEvent(new Event('input', { bubbles: true }));
            i++;
            setTimeout(typeNext, delay);
        } else {
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    typeNext();
}

chrome.storage.sync.get(["name", "phone", "email", "address"], (data) => {
    const questions = document.querySelectorAll('.Qr7Oae');

    let delayBetweenFields = 0;

    questions.forEach(question => {
        const label = question.innerText.toLowerCase();
        let input = question.querySelector('input');
        let textarea = question.querySelector('textarea');

        if (label.includes("name") && data.name) {
            setTimeout(() => typeLikeHuman(input || textarea, data.name), delayBetweenFields);
            delayBetweenFields += data.name.length * 80 + 300;
        } else if ((label.includes("phone") || label.includes("mobile")) && data.phone) {
            setTimeout(() => typeLikeHuman(input || textarea, data.phone), delayBetweenFields);
            delayBetweenFields += data.phone.length * 80 + 300;
        } else if (label.includes("email") && data.email) {
            setTimeout(() => typeLikeHuman(input || textarea, data.email), delayBetweenFields);
            delayBetweenFields += data.email.length * 80 + 300;
        } else if (label.includes("address") && data.address) {
            setTimeout(() => typeLikeHuman(input || textarea, data.address), delayBetweenFields);
            delayBetweenFields += data.address.length * 80 + 300;
        }
    });
});
