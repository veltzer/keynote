<html>
	<body>
		<p>
		This is the web site for keynote
		If you want to see a demo and learn about keynot checkout <a href="../keynotejs/keynote.php?presentation=../presentations/keynote.xml">this</a> presentation.
		<p>
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
