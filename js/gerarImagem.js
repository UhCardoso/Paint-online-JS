function gerarImagem() {
    var canvas = document.getElementById('desenho');
    var url = canvas.toDataURL('image/png');

    var link = document.createElement('a');
    link.download = 'minha-imagem.png';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}