const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    image.src = "loading.gif";
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({ "inputs": inputTxt.value }),
        }
    );
    if (response.ok) {
        const result = await response.blob();
        return result;
    } else {
        throw new Error('Limit of the users using the website is reached. Please try after some time sorry for the inconvenience caused.');
    }
}

button.addEventListener('click', async function () {
    try {
        const response = await query();
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    } catch (error) {
        image.src = "";
        image.alt = error.message;
        image.classList.add("error-message");
    }
});
