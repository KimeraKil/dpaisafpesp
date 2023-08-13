var contadorG = 0;
var arr = [
    '147974',
    '315472',
    '331141',
    '378842',
    '389614',
    '390508',
    '398675',
    '425021',
    '475061',
    '487450',
    '495559',
    '498283',
    '500579',
    '508571',
    '509053',
    '525450',
    '540559',
    '541249',
    '549743',
    '587836',
    '613898',
    '617575',
    '617581',
    '659799',
    '685667',
    '687579',
    '687928',
    '691151',
    '700538',
    '705566',
    '707282',
    '708392',
    '720095',
    '721844',
    '725139'
    ]

var pai = [
    'Ricardo Nakano',
    'Mauricio',
    'Florêncio Lopes Santos',
    'Ary Francisco Negrão',
    'José Arnaldo Tsujita',
    'Deodato Americo',
    'Paulo Roberto Gonçalves',
    'Sandro Eduardo de Lima',
    'João Geraldo de Campos',
    'Ariovaldo',
    'Paulo Roberto Gonçalves',
    'Wagner',
    'Edvaldo Ragassi',
    'Leonardo',
    'Amilton',
    'Aroaldo',
    'Clóvis',
    'De: Gerente e Colaboradores'
]

var homenagem = [
    'Papus você é meu exemplo na vida. O melhor pai do mundo. Te Amo meu pai?',
    'Feliz dia dos Pais! Nós te amamos',
    'Papai, eu sou parte da sua vida e você é toda a minha história. Te amo!',
    'Agradeço à Deus por ter colocado esse diamante,cujo brilho reflete a sabedoria,como meu maior exemplo de ser humano neste mundo! Pai,Te amo!',
    'Obrigada, papai !!',
    'PICO , nosso Amor por você é eterno!!!! ( In Memorian )',
    'Feliz dia dos pais ao homem que nos ensinou o significado de amor puro, sincero e verdadeiro!',
    'Você é o melhor do mundo, te amo papi !!!!!!',
    'O amor sempre esteve presente nas suas atitudes e nas suas palavras. Te amo pai, feliz dia dos pais!!',
    'Um feliz e abençoado dia dos pais, ao sogro, pai e avô ¨Vardo¨! Que Deus abençoe com muitas felicidades!!!',
    'Obrigado, pai! Por ser a luz presente em nossas vidas e nos guiar no caminho do bem. Amamos você!',
    'Orgulho do pai que você se tornou e de como você se desdobra pra fazer nossa bebê feliz (e a mãe dela também). A gente te ama muito!',
    'Feliz dia dos pais ♥',
    'ti amamos paizinho',
    'ti amo muito',
    'você é nosso herói,ti amamos ',
    'Feliz Dia dos Pais!!!! Amamos muito você pai, um pai sempre maravilhoso!',
    'Ser pai é descobrir o que existe de melhor no coração. É estar presente na vida dos filhos, é lutar pela felicidade deles. Ser pai é ter a responsabilidade de cuidar, proteger e ensinar.'
]

var filho = [
    'Ricardo Nakano Jr',
    'Larissa e Tiago',
    'Beatriz S. J. Lopes',
    'Aryéli F. R. Negrão',
    'Catharina A. Tsujita',
    'Edu, Maira, Mari, Paulo',
    'Edimara e Eduardo',
    'Isadora Moretti',
    'Fernanda Lopes',
    'Ana Lúcia e Flávio',
    'Eduardo e Edimara',
    'Laura',
    'Carolina Ragassi',
    'Lucas',
    'Gabi',
    'Lucas e Leonardo',
    'Vanessa e Letícia',
    'Para: Todos os Pais'
]

var foto = [
    './img/0.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.jpg',
    './img/8.1.png',
    './img/9.png',
    './img/10.png',
    './img/11.png',
    './img/12.jpg',
    './img/13.jpg',
    './img/14.jpg',
    './img/15.jpg',
    './img/16.jpg',
    './img/afpesp-brasao-2x.png'
]

var mudar = 0;

setInterval(function(){
    contadorG = contadorG +1;
    animar(contadorG)
    //console.log(contadorG)
}, 15000)

$(document).ready(function(){    
    localStorage.clear()
})

function animar(contador){
    if(contador == 1){
        $('#fotoPai').prop('src', foto[mudar])
        $('#nomePai').text(pai[mudar])
        $('#textoP').text(homenagem[mudar])
        $('#deFilho').text(filho[mudar])
        $('#divFoto').toggleClass('AnimateReduzirDiv')
        $('#fpOpen').removeClass("someOFF")
        $('#fpOpen').addClass("AnimateFotoSim")
        $('#nomePai').toggleClass('AnimateEscrever')
        $('#textoP').toggleClass('AnimateAbrir')
        $('#deFilho').toggleClass('AnimateEscrever')
    } else if(contador == 3){
        $('#fpOpen').addClass("someOFF")
        $('#fpOpen').removeClass("AnimateFotoSim")
        $('#divFoto').removeClass('AnimateReduzirDiv')
        $('#divFoto').addClass('AnimateAumentarDiv')
        $('#nomePai').toggleClass('AnimateEscrever')
        $('#textoP').toggleClass('AnimateAbrir')
        $('#deFilho').toggleClass('AnimateEscrever')
    } else if(contador == 4){
        $('#divFoto').removeClass('AnimateAumentarDiv')
        contadorG = 0;
        if(mudar == 17){
            mudar = 0
        } else {
            mudar = mudar +1
        }        
        console.log (mudar)
    }
}

$('#btnSend').on('click', function(){
    validarCampos()
})

$('#arquivo').on('change', function(){
    var data = new FormData();
    data.append('arquivo', $('#arquivo')[0].files[0]); 
    $("#sltFoto").html('Carregando');   
    $.ajax({
        url: './config/salvar.php',
        data: data,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data) 
        {
            if(data == '1'){
                alert('Falha ao carregar arquivo')
            } if(data == '2'){
                alert('Arquivo muito grande, tamanho Máximo: 10MB')
            } if(data == '3'){
                alert('Formato invalido, arquivos aceitos: JPG, PNG e JPEG')
            } else {
                $("#sltFoto").html('Foto: OK');
                localStorage.setItem(2, data)
            }           
        }
    });
})

$('#numMat').on('keyup', function(){
    var matricula = $('#numMat').val()
    if(matricula.length == 6){
        $('.loadR').toggleClass('someOFF')
        $.ajax({
            url:"./config/conexao.php",
            type: "POST",
            data:{
                acao: 'chkMat', nMat: matricula
            },
            success:(result)=>{
                eVerificado = JSON.parse(result);
                if(result != 0){
                    if(eVerificado[0]['confirmado'] == 1){
                        alert ('Já existe uma Homenagem cadastrada, ao clicar em Enviar as informações e foto serão substituídas!')
                    }
                    $('#numMat').css('background-color', 'rgb(0, 255, 0)')
                    $('#numMat').css('color', 'white')
                    $('#btnSend').css('display', 'block')
                    localStorage.setItem(1, matricula)
               } else {
                    $('#numMat').css('background-color', 'red')
                    $('#numMat').css('color', 'white')
                    $('#btnSend').css('display', 'none')
               }
            }
        })
        $('.loadR').toggleClass('someOFF')
    } else if(matricula.length < 6){
        $('#numMat').css('background-color', 'white')
        $('#numMat').css('color', 'black')
        $('#btnSend').css('display', 'none')
    }
})

function validarCampos(){
    var fotoS = localStorage.getItem(2);
    var matVal = $('#numMat').val()
    var np = $('#nPai').val()
    var nth = $('#txHom').val()
    var nf = $('#nFilho').val()
    $('.loadR').toggleClass('someOFF')
    if(fotoS == null){
        alert('Selecione uma Foto')
        $('.loadR').toggleClass('someOFF')
    } else {
        if(np == ''){
            alert('Digite o Nome do Pai que será Homenageado')
            $('.loadR').toggleClass('someOFF')
        } else if(nth == ''){
            alert('Digite uma Homenagem')
            $('.loadR').toggleClass('someOFF')
        } else if(nf == '') {
            alert('Digite o Nome de quem esta Homenageando')
            $('.loadR').toggleClass('someOFF')
        } else {
            $.ajax({
                url:"./config/conexao.php",
                type: "POST",
                data:{
                    acao: 'save', matricula: matVal, npai:np, hom: nth, nfilho: nf, nFot: fotoS, confirM: 1
                },
                success:(result)=>{
                   alert(result)
                   $('.loadR').toggleClass('someOFF')
                }
            })
        }
    }
}
