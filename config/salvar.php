<?php

if(isset($_FILES['arquivo'])){    

    $arquivo = $_FILES['arquivo'];

    if($arquivo['error'])
        die("1");
    

    if($arquivo['size'] > 10485760)
        die("2");
    
    $pasta = "arquivos/";
    $nomeArquivo = $arquivo['name'];
    $novoNome = uniqid();
    $extensaoArquivo = strtolower(pathinfo($nomeArquivo, PATHINFO_EXTENSION));

    if($extensaoArquivo != "jpg" && $extensaoArquivo != "png" && $extensaoArquivo != "jpeg")
        die("3");
    
    $path = $pasta . $novoNome . "." . $extensaoArquivo;

    $deu_certo = move_uploaded_file($arquivo["tmp_name"], $path);

    $img = file_get_contents($path);

    $data = base64_encode($img);

    echo $data;

    $dir = "./arquivos";
    $di = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
    $ri = new RecursiveIteratorIterator($di, RecursiveIteratorIterator::CHILD_FIRST);

    foreach ( $ri as $file ) {
        $file->isDir() ?  rmdir($file) : unlink($file);
    }
}