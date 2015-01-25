<head>
	<meta charset="utf-8">  
</head>
<?php    
  
    $pic_name=date("dMYHis");    
  
    // 生成图片的宽度    
    $pic_width=$_POST['width'];   
  
    // 生成图片的高度    
    $pic_height=$_POST['length'];    
  	echo $pic_width;
    function ResizeImage($im,$maxwidth,$maxheight,$name){    
        //取得当前图片大小   
        $width = imagesx($im);    
        $height = imagesy($im);    
        //生成缩略图的大小   
        if(($width > $maxwidth) || ($height > $maxheight)){    
            $widthratio = $maxwidth/$width;        
            $heightratio = $maxheight/$height;     
            if($widthratio < $heightratio){    
                $ratio = $widthratio;    
            }else{    
                $ratio = $heightratio;    
            }    
            $newwidth = $width * $ratio;    
            $newheight = $height * $ratio;    
           
            if(function_exists("imagecopyresampled")){    
                $newim = imagecreatetruecolor($newwidth, $newheight);    
                imagecopyresampled($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);    
            }else{    
                $newim = imagecreate($newwidth, $newheight);    
                imagecopyresized($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);    
            }    
            ImageJpeg ($newim,$name . ".jpg");    
            ImageDestroy ($newim);    
        }else{    
            ImageJpeg ($im,$name . ".jpg");    
        }    
    }    
  	echo $_FILES['image']['size'];
	echo $_FILES['image']['type'];
    if($_FILES['image']['size']){    
        //echo $_FILES['image']['type'];   
        if($_FILES['image']['type'] == "image/pjpeg"||$_FILES['image']['type'] == "image/jpg"||$_FILES['image']['type'] == "image/jpeg"){    
            $im = imagecreatefromjpeg($_FILES['image']['tmp_name']);    
        }elseif($_FILES['image']['type'] == "image/x-png" || $_FILES['image']['type'] == "image/png"){    
			echo "qq";
            $im = imagecreatefrompng($_FILES['image']['tmp_name']);    
        }elseif($_FILES['image']['type'] == "image/gif"){    
            $im = imagecreatefromgif($_FILES['image']['tmp_name']);    
        }   
		echo $im."...";
        if($im){    
            if(file_exists($pic_name.'.jpg')){    
                unlink($pic_name.'.jpg');    
            }    
			echo $im.",".$pic_width.",".$pic_height.",".$pic_name;
            ResizeImage($im,$pic_width,$pic_height,$pic_name);    
            ImageDestroy ($im);    
        }    
    }    
?>    
  
<img src="<? echo $pic_name.'.jpg'; ?>"><br><br>    
<form enctype="multipart/form-data" method="post" action="jpg.php">    
<br>    
<input type="file" name="image" size="50" value="浏览"><p>    
生成缩略图宽度：<input type="text" name="width" size="5"><p>   
生成缩略图长度：<input type="text" name="length" size="5"><p>   
<input type="submit" value="上传图片">    
</form>   