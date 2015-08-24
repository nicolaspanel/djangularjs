io.js for Ansible
======================
A role for deploying and configuring [io.js](http://iojs.com) on unix hosts using [Ansible](http://www.ansibleworks.com).

It can additionally be used as a playbook for quickly provisioning hosts.

Vagrant machines are provided to produce a boxed install of io.js or a VM for integration testing.


Supports
--------
Supported io.js versions:
- io.js 2.x
- io.js 1.x

Supported targets:
- Ubuntu 14.04 LTS "Trusty Tahr"
- Debian (untested)

Installation methods:
- Packages from [NodeSource](http://iojs.com/docs/install/)


Usage
-----
Clone this repo into your roles directory:

    $ git clone https://github.com/zenoamaro/ansible-iojs.git roles/iojs

And add it to your play's roles:

    - hosts: ...
      roles:
        - iojs
        - ...

See the annotated defaults in [defaults/main.yml](defaults/main.yml) for help in configuration. All provided variables start with `iojs_`.

It is recommended that you pin your io.js version by setting `iojs_version` to something like `1.5.1`, or `1.5.*` as io.js follows semver.

You can also use the role as a playbook. You will be asked which hosts to provision, and you can further configure the play by using `--extra-vars`.

    $ ansible-playbook -i inventory --extra-vars='{...}' main.yml

To provision a standalone box, start the `boxed` VM, which is a Ubuntu 14.04 box. After that, you will have iojs available as `iojs` or `node`.

    $ vagrant up boxed

Run the tests by provisioning the appropriate VM:

    $ vagrant up test-ubuntu-trusty

At the moment, the following test boxes are available:

- `test-ubuntu-trusty`


Still to do
-----------
- RedHat repositories


Changelog
---------
### 0.2.0
- Using iojs 2.x by default.

### 0.1.1
- Supporting debian repositories above 1.x.

### 0.1.0
Initial version.


License
-------
The MIT License (MIT)

Copyright (c) 2015, zenoamaro <zenoamaro@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.