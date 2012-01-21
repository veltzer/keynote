<html>
	<head>
		<title>Keynote: No presentation loaded...</title>

		<!-- jQuery - we use this a lot -->
		<script src="toolkits/jquery/jquery.js"></script>

		<!-- syntax highlighter stuff -->
		<!-- -->
		<link href="toolkits/sh/styles/shCore.css" rel="stylesheet" type="text/css"/>
		<link href="toolkits/sh/styles/shThemeDefault.css" rel="stylesheet" type="text/css"/>
		<script src="toolkits/sh/scripts/shCore.js"></script>
		<script src="toolkits/sh/scripts/shAutoloader.js"></script>
		<!-- -->
		
		<!-- hljs stuff -->
		<!--
		<link href="toolkits/hljs/default.min.css" rel="stylesheet" type="text/css"/>
		<script src="toolkits/hljs/highlight.min.js"></script>
		-->

		<!-- my code -->
		<link rel="stylesheet" type="text/css" href="keynote.css" media="screen"/>
		<script src="LayoutCenter.js"></script>
		<script src="keynote.js"></script>

		<?php
			if(array_key_exists('presentation',$_GET)) {
		?>
		<script>
			$(document).ready(function() {
				var mgr=new Mgr({
					'source':'<?php echo $_GET['presentation'] ?>',
					'transition':new FadeoutFadein({'delay':1000})
				});
			});
		</script>
		<?php
			}
		?>
	</head>
	<body>
		<?php
			if(!array_key_exists('presentation',$_GET)) {
				echo "no presentation specified. Add ?presentation=[url]";
			}
		?>
	</body>
</html>
