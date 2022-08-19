![](http://i.imgur.com/8SZWa2h.gif)

#So...

On Oct 23 2020 @sardachywy wrote:
It's obvious that the code it's outdated nowadays. I hope someone take care of this in the future.

For now this is what I did to get running minichan:

    Install webpack 1.13.2 (npm install -g webpack@^1.13.2)
    Use PHP 5.6
    Disable strict mode inMySQL (in your my.cnf, add bellow [mysqld]: sql_mode=NO_ENGINE_SUBSTITUTION)

I am using mariadb, so i dont know if exist any other compatibility issues with the new MySQL 8.

# Installation
* Install dependencies with [composer](https://getcomposer.org/doc/00-intro.md) using `composer install`
* Install client-side dependencies with [npm](https://www.npmjs.com/) using `npm install`
* Install webpack `npm install -g webpack`
* Make an empty MySQL database.
* Copy `includes/config.example.php` to `includes/config.php` and get editing.
* Run `php includes/upgrade.php` from the command line.
* Run `webpack -d --watch`
* Enable the apache2 rewrite module: `a2enmod rewrite`
* Optional: Edit `.htaccess`

On a fresh Ubuntu/Debian installation you will likely want `apt-get install apache2 libapache2-mod-php php php-bcmath php-curl php-mysql php-apcu mysql-server mysql-client` and configure your `php.ini` as follows:

````
display_errors = On
display_startup_errors = On
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE
````

Depending on your setup it may also be necessary to configure your `php.ini` to use UTF-8 internally so exotic tripcodes get converted correctly:

````
[mbstring]
mbstring.internal_encoding = UTF-8
````

It is also possible to use nginx, and a sample `rewrite.conf` is available, but this is currently not officially supported.

When deploying to production use `webpack -p`.

# Updating
Update your working tree (git pull?) and run the following commands. See the wiki for scripts used by http://minichan.org

```bash
composer install
npm install
webpack -p
php includes/upgrade.php
```

# "Support"
If you have any questions you can try your luck on the issue tracker or `##minichan @ irc.freenode.net`. Note that development is primarily geared towards running a functional [http://minichan.org](http://minichan.org) so your feature requests may not be a priority. Pull requests are welcome if they are discussed on the issue tracker or IRC (with r04r) first.

And yes. The code is shit. :-)

# Branches
This repository consists of four primary branches, of which all but `master` may have their histories rewritten at any time:

* `master`: The main development branch. The code on this branch should work, but may not be fully functional or stable when development is happening. If you intend to submit pull requests base them off of this branch.
* `testing`: http://test.minichan.org - For testing new changes in a staging setup
* `beta`: http://beta.minichan.org - For testing new changes in a staging setup, with a shared database with http://minichan.org. Database changes will not be tested here.
* `minichan`: http://minichan.org
