<?php
    include_once("config.inc.php");
    $return = new stdClass;
        $return->error = '';

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if(!empty($_POST) && (!empty($_POST['name']))){

                    $name = $_POST['name'];
                    $father_last_name = $_POST['father_last_name'];
                    $mother_last_name = $_POST['mother_last_name'];
                    $birth = $_POST['birth'];
                    $console = $_POST['console'];
                    $version = $_POST['version'];
                    $city = $_POST['city'];
                    $roster = $_POST['roster'];
                    $handle = $_POST['handle'];
                    $email = $_POST['email'];
                    

                    if($_POST['name'] != ""){
                        $name = $_POST['name'];
                    }

                    if($_POST['father_last_name'] != ""){
                        $father_last_name = $_POST['father_last_name'];
                    }

                    if($_POST['birth'] != ""){
                        $birth = $_POST['birth'];
                    }

                    if($_POST['console'] != ""){
                        $console = $_POST['console'];
                    }

                    if($_POST['version'] != ""){
                        $version = $_POST['version'];
                    }

                    if($_POST['city'] != ""){
                        $city = $_POST['city'];
                    }

                    if($_POST['roster'] != ""){
                        $roster = $_POST['roster'];
                    }

                    if($_POST['handle'] != ""){
                        $handle = $_POST['handle'];
                    }

                    if($_POST['email'] != ""){
                        $email = $_POST['email'];
                    }

                    $mother_last_name = $_POST['mother_last_name'];

                    /*$userInfo = array(
                        "name"=>$name,
                        "mail"=>$mail,
                        "company"=>$company,
                        "phone"=>$phone,
                        "msj"=>$msj
                    );*/

                    $mysqli = mysqli_init();
                    if (@$mysqli) {
                        if (@$mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5)) {
                            if (@$mysqli->real_connect($_dbHost, $_dbUser, $_dbPass, $_dbBase, $_dbPort)){
                                if ($stmt = $mysqli->prepare("INSERT INTO register (name, father_last_name, mother_last_name, birth, console, version, city, roster, handle, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")){
                                    $stmt->bind_param("sssdssssss", $name, $father_last_name, $mother_last_name, $birth, $console, $version, $city, $roster, $handle, $email);
                                    if (!$stmt->execute()) {
                                     $return->error = 'Invalid data';
                                    }else{
                                        $return->response = "1";
                                    }
                                }
                                $mysqli->close();
                            } else {
                                $return->error = 'Invalid data';
                            }
                        } else {
                            $return->error = 'Invalid data';
                        }
                    } else {
                        $return->error = 'Invalid data';
                    } 

                    echo 1;

                    //$support = new connector_EntitySupport();
                    //$result = $support->save($userInfo,"Register");
                    
                    echo json_encode($return);
                    
                }
            }else{
                $return->error = 'Invalid data';
                echo json_encode($return);
            }
        
?>