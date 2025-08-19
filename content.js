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

function fillTextField(element, value) {
    if (element) {
        typeLikeHuman(element, value);
        return true;
    }
    return false;
}

function fillRadioOrCheckbox(questionElement, value) {
    const options = questionElement.querySelectorAll('[role="radio"], [role="checkbox"]');
    const valueLower = value.toLowerCase();

    for (const option of options) {
        const labelElement = option.querySelector('.docssharedWizToggleLabeledLabelText');
        if (labelElement && labelElement.innerText.toLowerCase() === valueLower) {
            option.click();
            return true;
        }
    }
    return false;
}

function fillDateField(questionElement, value) {
    const dateParts = value.split(/[-/]/); // YYYY-MM-DD or MM/DD/YYYY
    if (dateParts.length !== 3) return false;

    const year = dateParts[0].length === 4 ? dateParts[0] : dateParts[2];
    const month = dateParts[1];
    const day = dateParts[0].length === 4 ? dateParts[2] : dateParts[0];

    const yearInput = questionElement.querySelector('input[aria-label="Year"], input[placeholder="YYYY"]');
    const monthInput = questionElement.querySelector('input[aria-label="Month"], input[placeholder="MM"]');
    const dayInput = questionElement.querySelector('input[aria-label="Day"], input[placeholder="DD"]');

    if (yearInput && monthInput && dayInput) {
        typeLikeHuman(yearInput, year);
        typeLikeHuman(monthInput, month);
        typeLikeHuman(dayInput, day);
        return true;
    }
    
    const singleDateInput = questionElement.querySelector('input[type="date"]');
    if (singleDateInput) {
        singleDateInput.value = `${year}-${month}-${day}`;
        singleDateInput.dispatchEvent(new Event('input', { bubbles: true }));
        singleDateInput.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }

    return false;
}


chrome.storage.sync.get(null, (data) => {
    if (!data) return;

    const questions = document.querySelectorAll('.Qr7Oae');
    let delay = 0;

    const allFields = [
        { field: 'name', value: data.name },
        { field: 'phone', value: data.phone },
        { field: 'email', value: data.email },
        { field: 'address', value: data.address },
        ...(data.customFields || [])
    ];

    questions.forEach(question => {
        const labelElement = question.querySelector('.M7eMe');
        if (!labelElement) return;

        const label = labelElement.innerText.toLowerCase();

        for (const item of allFields) {
            if (item.value && label.includes(item.field.toLowerCase())) {
                setTimeout(() => {
                    const input = question.querySelector('input[type="text"], input:not([type])');
                    const textarea = question.querySelector('textarea');

                    let filled = false;

                    // Try filling different types of fields
                    if (input || textarea) {
                        filled = fillTextField(input || textarea, item.value);
                    }
                    if (!filled) {
                        filled = fillRadioOrCheckbox(question, item.value);
                    }
                    if (!filled) {
                        filled = fillDateField(question, item.value);
                    }
                }, delay);
                
                delay += item.value.length * 80 + 500; // Add delay for next field
                break; // Move to next question once a match is found and filled
            }
        }
    });
});
