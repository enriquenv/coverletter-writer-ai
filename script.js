function createCoverLetter() {
    document.getElementById('loading').style.display = 'block';
    var cv = document.getElementById('cv').value;
    var position = document.getElementById('position').value;
    var mention = document.getElementById('mention').value;
    var language = document.getElementById('language').value;

    var data = {
        cv: cv,
        position: position,
        importantMention: mention,
        lang: language
    };

    console.log(data);

    fetch('https://nzjfeignq7.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        var draft = data.body;
        var letter = draft.replace(/\\n/g, "</br>");
        console.log(data);
        console.log(draft);

        document.getElementById('loading').style.display = 'none';
        document.getElementById('cover-letter').innerHTML = letter.slice(1, -1);
        document.getElementById('cover-letter').style.display = 'block';
        document.getElementById('copyButton').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

window.onload = function() {
    var saveCv = document.getElementById('save-yes');
    var cv = document.getElementById('cv');
    cv.value = localStorage.getItem('cv');
    saveCv.onchange = function() {
        if (saveCv.checked) {
            localStorage.setItem('cv', cv.value);
        } else {
            localStorage.removeItem('cv');
        }
    };
};

document.getElementById('copyButton').addEventListener('click', function() {
    var summary = document.getElementById('cover-letter').innerText;
    var tempInput = document.createElement('textarea');
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = summary;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
});
