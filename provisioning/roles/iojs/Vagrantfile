# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure '2' do |config|


# Standalone box
# --------------

	# Provision this machine to obtain a standalone box
	# listening on the default ports.

	config.vm.define 'boxed' do |box|
		box.vm.box = "ubuntu/trusty64"
		# Configure the network topology to your needs
		config.vm.network :private_network, ip: "192.168.33.10"
		# config.vm.network :public_network
		config.vm.provision :ansible do |ansible|
			ansible.playbook       = './boxed.yml'
			ansible.inventory_path = './inventory'
		end
	end


# Test machines
# -------------

	# These test machines will configure the installation with all
	# its extensions enabled, in order to test the validity
	# of the role.

	# Ubuntu machines are available:
	# - "test-ubuntu-trusty"

	def apply_test_ansible_defaults(ansible)
		ansible.playbook       = './test.yml'
		ansible.inventory_path = './inventory'
	end

	config.vm.define 'test-ubuntu-trusty', autostart:false do |box|
		box.vm.box = "ubuntu/trusty64"
		config.vm.network :private_network, ip: "192.168.33.20"
		config.vm.provision :ansible do |ansible|
			apply_test_ansible_defaults ansible
			ansible.extra_vars = {}
		end
	end

end
