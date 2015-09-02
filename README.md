__DjangularJS__ is a full-stack framework based on [Django](https://www.djangoproject.com/) and [AngularJS](https://angularjs.org/) focused on programmer happiness and sustainable productivity. 

It aims to solve the common issues with connecting those frameworks, support daily development needs and help developers to use best practices.

__Status__: under active development


__Design goals__:
 - [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
 - [Convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
 - Modularity
 - Automation
 

# Getting started

## Conventions

 - __Instructions are to be run from the root directory of your project__
 
 - Instructions like `@host $ ...` should be executed from the host (ie. from your computer) 
 
 - Instructions like `@dev0 $ ...` should be executed from `dev0` (ie. inside vagrant, in the vm hosting your web app)
 
   Use `@host $ vagrant ssh dev0` to connect to `dev0`
   
   Development machines are listed in `provisioning/vagrant.yml` 
   
 - Instructions like `(vagrant)@dev0 $ ...` expect `virtualenv` to be activated.
  
   Use `@dev0 $ cd /vagrant && source bin/activate` to enable `virtualenv`

 
## Prerequisites

Make sure you have installed all of the following prerequisites on your __development__ machine:

 - __[Vagrant](http://docs.vagrantup.com/v2/installation/)__ - easy way to create and configure lightweight, reproducible, and portable development environments.
 
 - __[Ansible](http://docs.ansible.com/ansible/intro_installation.html)__ - tool to manage your servers
 
   Once __Ansible__ is installed (`@host $ ansible --version` to be sure), use `@host $ sudo ansible-galaxy install -r provisioning/requirements.yml` to install third party roles.
  
 - __[io.js](https://iojs.org/en/index.html)__ or __[node.js](https://nodejs.org/)__ (see also [nvm](https://github.com/creationix/nvm))
 
 - __[bower](http://bower.io/)__ - front-end dependencies manager
  
   `@host $ npm install -g bower`
   
 - __[grunt](http://gruntjs.com/)__, __[yeoman](http://yeoman.io/)__ and __[generator-djangularjs](https://github.com/nicolaspanel/generator-djangularjs)__ - automation tools
 
   `@host $ npm install -g grunt-cli yo generator-djangularjs`


__NOTE__: Even if __Vagrant__ and __Ansible__ are recommended, you can use __DjangularJS__ without them (it assumes you know what you are doing).

## Project setup

```sh
@host $ mkdir <project_name> && cd <project_name>
@host $ yo djangularjs
```

The generator will ask you a few questions about your new application and will generate it for you. 


__Warning (for Windows user only)__:  Since Windows does not support [nfs](https://fr.wikipedia.org/wiki/Network_File_System) you have to disable it in your `Vagrantfile`.  Replace  `machine.vm.synced_folder ".", "/vagrant", type: "nfs"` by `machine.vm.synced_folder ".", "/vagrant"` 


Since your have generated the project with the previous command, you should now be able to: 
 1. Setup your development environment 
 2. Install project dependencies
 3. Apply third party apps migrations
 4. Run tests to make sure everything is fine
 5. Build css from Sass
 6. Generate translations for [angular-translate](https://github.com/angular-translate/angular-translate) (see [grunt-djangularjs-translate](https://github.com/nicolaspanel/grunt-djangularjs-translate) for more info)
 7. Run your server using grunt


```sh
# 1. Setup your development environment  
@host $ vagrant up # take a while
@host $ vagrant ssh dev0
@dev0 $ cd /vagrant && . bin/activate # activate virtualenv 

# 2. Install project dependencies
(vagrant)@dev0 $ npm install # install node/iojs dependencies
(vagrant)@dev0 $ bower install # install front-end dependencies
(vagrant)@dev0 $ pip install -r requirements/dev.txt

# 3. Apply third party apps migrations
(vagrant)@dev0 $ python manage.py migrate

# 4. Run tests to make sure everything is fine
(vagrant)@dev0 $ grunt test

# 5. Build css from Sass
(vagrant)@dev0 $ grunt sass

# 6. Generate translations
(vagrant)@dev0 $ grunt translate

# 7. Run your server using grunt
(vagrant)@dev0 $ grunt serve
```

Application should then be available from your browser (see http://localhost:9000/)

__Notes__: 

 1. you need to create a superuser to access admin UI (http://localhost:9000/admin) 
 
   ```sh
   (vagrant)@dev0 $ python manage.py createsuperuser
   ```
   
   See [Django doc](https://docs.djangoproject.com/en/1.8/ref/django-admin/#createsuperuser) for more info.

 2. your development environment comes with 2 machines:
    - `dev0` which hosts your web app
    - `dev1` which hosts external services such as databases, brokers, dumps, etc. (using [Docker](https://www.docker.com/) or not)
   
   You can create as many machines as you like (as long as your computer can grant them memory)
  
   See `provisioning/vagrant.yml` for more information

# Secrets management

__DjangularJS__ store sensitive information such as Django `SECRET_KEY`, passwords, etc. in Ansible group variables (see `provisioning/group_vars/*).

To make sure they stay secret, you have to encrypt them using [Ansible Vault](http://docs.ansible.com/ansible/playbooks_vault.html):

```sh
@host $ ansible-vault encrypt provisioning/group_vars/*
```
  
Since your Ansible configuration now contains encrypted files, you have to configure vagrant to ask you for the password before trying 
to provision your development environment. 
 
To do so, edit `Vagrantfile` and __uncomment the line__ `ansible.ask_vault_pass = "true"`

You should now be able to run `@host $ vagrant provision`


__Note__: 
 - Use `@host $ ansible-vault decrypt provisioning/group_vars/*` to decrypt
 - Once group variables file are encrypted they can be included into your [version control system](https://en.wikipedia.org/wiki/Revision_control)
 - During provisioning, ansible will create a file called `server/settings/.secrets.json`:
   - Make sure this file is ignored from your [version control system](https://en.wikipedia.org/wiki/Revision_control)
   - Don't update it. If your configuration change: 
     - Edit  `provisioning/group_vars/...` files 
     - Run provisioning again using `@host $ vagrant provision`

  
See following files for more information:
 - `provisioning/roles.yml` 
 - `provisioning/group_vars/dev`
 - `provisioning/roles/web-app-conf`
 - `server/settings/conf.json`
 - `server/settings/base.py`

# Quick reference

## Grunt tasks

 - Run server:
    - development mode: `(vagrant)@dev0 $ grunt serve`[1]
    - production like mode (ie with minified assets): `(vagrant)@dev0 $ grunt serve-production-insecure`
 - Run tests: 
    - all: `(vagrant)@dev0 $ grunt test`
    - front-end only: `grunt jshint karma:unit`
    - back-end only: `(vagrant)@dev0 $ grunt django-manage:test`[2]
 - Compile stylesheets: `grunt sass`
 - Check/compile translations: `grunt translate`


[1] `(vagrant)@dev0 $ python manage.py runserver 0.0.0.0:3000` works too

[2] `(vagrant)@dev0 $ python manage.py test --settings=server.settings.tests` works too

## Generators

### AngularJS generators

 - new [module](https://docs.angularjs.org/guide/module): `yo djangularjs:angular-module <module-name>`
 - new [directive](https://docs.angularjs.org/guide/directive): `yo djangularjs:angular-directive <directive-name>`
 - new [filter](https://docs.angularjs.org/guide/filter): `yo djangularjs:angular-filter <filter-name>`
 - new [service](https://docs.angularjs.org/guide/services): `yo djangularjs:angular-service <service-name>`
 - new [controller](https://docs.angularjs.org/guide/controller): `yo djangularjs:angular-controller <controller-name>`
 - new [route](https://github.com/angular-ui/ui-router/wiki): `yo djangularjs:angular-route <route-name>` (will also create a controller and a view for this route)


### Django generators

 - new module (or django app): `yo djangularjs:django-module <module-name>`
 - new [APIView](http://www.django-rest-framework.org/api-guide/views/): `yo djangularjs:django-api-view <view-name>`
 - new [template tag](https://docs.djangoproject.com/en/1.8/howto/custom-template-tags/#writing-custom-template-tags): `yo djangularjs:django-templatetag <templatetag-name>`
 - new [filter](https://docs.djangoproject.com/en/1.8/howto/custom-template-tags/#writing-custom-template-filters): `yo djangularjs:django-filter <filter-name>`


## Project structure

Main files/folders are described below
```
. (project root)
+-- provisioning/                 Ansible configuration (optional but recommended)
|
+-- public/                       AngularJS app (front-end)
|  +-- _/                         contains bower packages (see .bowerrc)
|  +-- core/                      main module (mandatory)
|  +-- angular-module0/
|  |  +-- constants/              contains angular constants for module0 (optional)
|  |  +-- controllers/            contains angular controllers for module0 (optional)
|  |  +-- directives/             contains angular directives for module0 (optional)
|  |  +-- filters/                contains angular filters for module0 (optional)
|  |  +-- i18n/                   contains translations used in module0 (optional)
|  |  +-- img/                    contains images used in module0 (optional)
|  |  +-- modals/                 contains modal views used in module0 (optional)
|  |  +-- services/               contains angular services for module0 (optional)
|  |  +-- styles/                 contains Sass' partials for both views and templates (optional)
|  |  +-- templates/              contains templates (ie partial views) for both directives and modals (optional)
|  |  +-- tests/                  contains module0's tests (optional but recommended)
|  |  |  +-- *.spec.js            unit test (karma + jasmine) (optional)
|  |  |  +-- *.e2e.js             protractor test (karma + jasmine) (optional)
|  |  |  +-- module0.fake-data.js special file use to provide data on for your unit tests (optional)
|  |  +-- views/                  contains views for module0 (optional)
|  |  +-- module0.module.js       configuration file for module0 (mandatory)
|  +-- ...
|  +-- config.js                  global configuration file for the AngularJS app (mandatory)
|  +-- config.scss                global configuration file and entry point for Sass (mandatory)
|
+-- requirements/                 python dependencies for both development and production (mandatory)
|
+-- server/                       Django project (back-end) (mandatory)
|  +-- core/                      main module (mandatory)
|  +-- django-module0
|  |  +-- fixtures/               contains initial/test data for module0 (optional)
|  |  +-- serializers/            contains module0's serialiazers (python module) (optional)
|  |  +-- templates/              contains module0's templates (optional)
|  |  +-- templatetags/           contains templatetags used in module0 (optional)
|  |  +-- tests/                  contains module0's tests (should match test_*.py) (optional but recommended)
|  |  +-- views/                  contains both APIViews and Viewsets (optional)
|  |  +-- urls.py                 lists module0's routes (optional)
|  +-- ...
|  +-- settings/                  special folder containing Django settings (mandatory)
|  +-- urls.py                    lists modules and third party routes (mandatory)
|
+-- package.json                  npm (ie NodeJS) dependencies (mandatory)
+-- bower.json                    front-end (ie bower) dependencies (mandatory)
+-- assets.json                   special file used to locate front-end dependencies (mandatory)
+-- gruntfile.js                  configuration file for Grunt (mandatory)
+-- Vagrantfile                   configuration file for Vagrant (optional but recommended)
```

__NOTE__: You can create as much modules as needed but `core` modules are mandatory for both Django and AngularJS


# Credits

Inspired from [MEANJS](https://github.com/meanjs/mean)


# License

The MIT License (MIT)

Copyright (c) 2015 Nicolas Panel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
