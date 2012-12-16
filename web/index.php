<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Keynote</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<meta name="Description" content="Keynote is a whole new way of doing presentations"/>
		<meta name="Keywords" content="Mark Veltzer, veltzer, powerpoint, presentations, keynote, xml, web"/>
	</head>
	<body>
		<h1>Welcome to the keynote web site</h1>
		<p>
		This is the web site for Keynote.
		If you want to see a demo and learn about keynot checkout <a href="../keynotejs/keynote.php?presentation=../presentations/keynote.xml">this</a> presentation.
		</p>
		<p>
		Mark Veltzer, <?php 
			$copyYear = 2012;
			$curYear = date('Y');
			echo $copyYear . (($copyYear != $curYear) ? '-' . $curYear : '');
		?>
		<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
