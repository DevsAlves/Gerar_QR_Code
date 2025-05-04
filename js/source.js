const container = document.querySelector(".container")
const qrCodeBtn = document.querySelector("#qr-form button")
const qrCodeInput = document.querySelector("#qr-form input")
const qrCodeImg = document.querySelector("#qr-code img")
const qrCodeDownload = document.querySelector("#download-qrcode")
const buttonDownload = document.querySelector("#button-download")
const reload = document.querySelector("#reload-page")
const buttonReload = document.querySelector("#button-reload")

// Gera o Qr Code
function generateQrCode() {
    const qrCodeInputValue = qrCodeInput.value

    if (!qrCodeInputValue) {
        return
    }

    qrCodeBtn.innerText = "Gerando código..."

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}}`
    // Criando uma constante para depois pegar o resultado para o download
    const resultQrCode = qrCodeImg.src


    qrCodeImg.addEventListener("load" , () => {
        container.classList.add("active")
        qrCodeDownload.classList.add("active")
        reload.classList.add("active")
        qrCodeBtn.innerText = "Código gerado !!"
    })

    // Adicionando um atributo no botão para utilizar depois 
    buttonDownload.setAttribute('data-url', resultQrCode)
}

qrCodeBtn.addEventListener("click" , () => {
    generateQrCode()
})

qrCodeInput.addEventListener("keydown" , (e) => {
    if(e.code === "Enter") {
        generateQrCode()
    }
})

// Limpa o Qr Code
qrCodeInput.addEventListener("keyup" , () => {
    if(!qrCodeInput.value) {
        container.classList.remove("active")
        qrCodeBtn.innerText = "Gerar QR Code"
    }
})


// Baixar Qr code
buttonDownload.addEventListener("click", async (e) => {
    e.preventDefault();

    const imageUrl = buttonDownload.getAttribute('data-url');
    if (!imageUrl) return;

    // Está varivável pega a imagem pelo link 
    const response = await fetch(imageUrl);

    // Pega a imagem e converte para binário
    const blob = await response.blob();

    // Criando uma URL temporária  
    const objectUrl = URL.createObjectURL(blob);


    // Criando um elemento a 
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'qrcode.png';

    // Adiciona a tag a 
    document.body.appendChild(a);

    // Da um clique nele para fazer o donwload 
    a.click();

    // Depois remove
    document.body.removeChild(a);

    // Apaga o link temporário
    URL.revokeObjectURL(objectUrl); // limpa da memória
});


// Recarrega a  página 
buttonReload.addEventListener("click" , (e) => { 
    location.reload()
})
