<?php
ob_start();
$page_title = "Cookie notice";
?>
<p>
	Before you can access this website you must acknowledge that:
	<ul>
		<li>This website only places cookies essential for providing the service (to let you see which posts are yours, edit them, etc.)</li>
		<li>This website does not place tracking cookies</li>
		<li>This website does not share any information with third parties</li>
		<li>You can change your cookie settings at any time under the 'Stuff' menu</li>
		<li>More information can be found under the GDPR entry in the 'Stuff' menu</li>
		<li>If you have any questions, please email admin@minichan.org</li>
	</ul>
</p>
<form method="POST">
	<input type="submit" name="i_accept_cookies" value="Ok" />
</form>
<?php
require('includes/footer.php');