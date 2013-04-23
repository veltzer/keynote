<html>
	<head>
		<title>Keynote: No presentation loaded...</title>

		<!-- prototype -->
		<script src="toolkits/prototype.js"></script>
		<!-- jQuery -->
		<script src="toolkits/jquery/jquery.js"></script>
		<!-- syntax highlighter stuff -->
		<link href="toolkits/sh/styles/shCore.css" rel="stylesheet" type="text/css"/>
		<link href="toolkits/sh/styles/shThemeDefault.css" rel="stylesheet" type="text/css"/>
		<script src="toolkits/sh/scripts/shCore.js"></script>
		<script src="toolkits/sh/scripts/shAutoloader.js"></script>
		<!-- hljs stuff -->
		<!--
		<link href="toolkits/hljs/default.min.css" rel="stylesheet" type="text/css"/>
		<script src="toolkits/hljs/highlight.min.js"></script>
		-->

		<!-- my code -->
		<link rel="stylesheet" type="text/css" href="keynote.css" media="screen"/>
		<!-- minified version -->
		<!--
		<script src="../jsout/keynotejs-test.min.js"></script>
		-->
		<!-- full version -->
		<script src="../jsout/keynotejs-test.js"></script>
		<!--
		<script src="src/Set.js"></script>
		<script src="src/jqutils.js"></script>
		<script src="src/Utils.js"></script>
		<script src="src/TransitionHideShow.js"></script>
		<script src="src/TransitionFadeoutFadein.js"></script>
		<script src="src/TransitionBlend.js"></script>
		<script src="src/LayoutResolver.js"></script>
		<script src="src/LayoutCenter.js"></script>
		<script src="src/LayoutFlow.js"></script>
		<script src="src/LayoutRelative.js"></script>
		<script src="src/Slide.js"></script>
		<script src="src/Mgr.js"></script>
		-->

		<?php
			if(array_key_exists('presentation',$_GET)) {
		?>
		<script>
			$(document).ready(function() {
				var p_source='<?php echo $_GET['presentation'] ?>'
				var p_transition=new TransitionBlend({'delay':1000})
				//var p_transition=new TransitionFadeoutFadein({'delay':1000})
				var mgr=new Mgr({
					source:p_source,
					transition:p_transition
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
