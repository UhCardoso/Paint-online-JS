function gerarPDF() {
    var canvas = document.getElementById('desenho');
    var ctx = canvas.getContext('2d');

    var imageData = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    doc.addImage(imageData, 'PNG', 10, 10);

    doc.save('desenho.pdf');
}