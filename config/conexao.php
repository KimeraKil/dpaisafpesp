<?php 

$pdo = new PDO('mysql:host=localhost;dbname=cardapios', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

if(isset($_POST['acao'])){
    $acao = $_POST['acao'];
    if($acao == 'chkMat'){
        $nM = $_POST['nMat'];
        $arr = [];
        $sql = $pdo->query("SELECT * FROM homenagem WHERE matricula=$nM");
        if($sql->rowCount()>0){
        foreach($sql->fetchAll()as $value){
            $homenagem = array('id' => $value['id'],
                        'matricula' => $value['matricula'],
                        'nomepai' => $value['nomepai'],
                        'homenagem' => $value['homenagem'],
                        'nomefilho' => $value['nomefilho'],
                        'foto' => 'data:image/png;base64,'.$value['foto'],
                        'confirmado' => $value['confirmado']
                        );
                        array_push($arr, $homenagem);         
        }
        echo json_encode($arr);
        } else {
            echo json_encode(0);
        }
    } else if($acao == 'save'){
        $nMat = $_POST['matricula'];
        $nPai = $_POST['npai'];
        $nHom = $_POST['hom'];
        $nFil = $_POST['nfilho'];
        $nFt = $_POST['nFot'];
        $nCon = $_POST['confirM'];

        $stmt = $pdo->prepare('UPDATE `homenagem` SET nomepai=:npai, homenagem=:hom, nomefilho=:nfilho, foto=:fotin, confirmado=:confirM WHERE matricula=:idd');
        $stmt->bindValue(':idd', $nMat);
        $stmt->bindValue(':npai', $nPai);
        $stmt->bindValue(':hom', $nHom);
        $stmt->bindValue(':nfilho', $nFil);
        $stmt->bindValue(':fotin', $nFt);
        $stmt->bindValue(':confirM', $nCon);
        $stmt->execute();

        echo 'Homenagem Salva com Sucesso';
    }
}