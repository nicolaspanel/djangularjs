__djangularjs__ is a full-stack framework which provides a solid starting point for [Django Web Framework](https://www.djangoproject.com/) and [AngularJS](https://angularjs.org/) based applications. 

The idea is to solve the common issues with connecting those frameworks, support daily development needs and help developers to use best practices.

__STATUS__: under development

# Getting started

## Prerequisites

Make sure you have installed all of the following prerequisites on your __development__ machine:
 - __[vagrant](http://docs.vagrantup.com/v2/installation/)__ - will help you to «Create and configure lightweight, reproducible, and portable development environments.» 
 - __[ansible](http://docs.ansible.com/ansible/intro_installation.html)__ - will help you to manage your servers 
 - __[io.js](https://iojs.org/en/index.html) or __[node.js](https://nodejs.org/)__ - the recommended way to install it is to use [nvm](https://github.com/creationix/nvm)
 - __[bower](http://bower.io/)__ - front-end dependencies manager
   `$ npm install -g bower`
 - __[grunt](http://gruntjs.com/)__ - automation tool
   `$ npm install -g grunt-cli`
 - __[yeoman](http://yeoman.io/)__ and __[generator-djangularjs](https://github.com/nicolaspanel/generator-djangularjs)__ - scafolding tools
    `$ npm install -g yo generator-djangularjs`


## Project initalization

```sh
mkdir <app_name> && cd <app_name>
yo djangularjs
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you will be able to 
 1. setup your development environment 
 2. Install project dependencies
 3. Run your server using grunt

```sh
vagrant up # may take a while
vagrant ssh
cd /vagrant
npm install &&
```

Application should then be available from your browser (see http://localhost:8000/)

## Project structure
TODO


# Credits

djangularjs, while less complex, was inspired by and heavily borrowed from [MEANJS](https://github.com/meanjs/mean)

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
