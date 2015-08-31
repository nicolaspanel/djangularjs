# -*- mode: ruby -*-
# vi: set ft=ruby :

hosts_config = JSON.parse(File.read("vagrant.config.json"))

Vagrant.configure("2") do |config|
  hosts_config.each_with_index do |(node_name, node_config), index|
    config.vm.define node_name do |machine|
      machine.vm.box = "ubuntu/trusty64"
      machine.vm.hostname = node_name
      machine.vm.network :private_network, ip: node_config['ip']
      machine.vm.synced_folder ".", "/vagrant"
      # machine.vm.synced_folder ".", "/vagrant", type: "nfs" # use nfs for better performance (OSX and Linux only)

      machine.ssh.forward_agent = true
      # machine.ssh.username = "vagrant"
      # machine.ssh.password = "vagrant"
      
      node_config['ports'].each do |port|
        machine.vm.network :forwarded_port, 
          host: port['host'], 
          guest: port['guest'], 
          id: port['id']
      end

      machine.vm.provider "virtualbox" do |v|
          v.name = node_name
          v.memory = node_config['memory']
          v.cpus = node_config['cpus']
      end

      # provision machines with ansible
      machine.vm.provision :ansible do |ansible|
        ansible.playbook = "provisioning/roles.yml"
        ansible.groups = {
          "web_app" => ["machine0"],
          "dev" => ["machine0", "machine1"],
          "all_groups:children" => ["dev"]
        }
        # ansible.ask_vault_pass = "true"
        # ansible.limit = 'all' # Disable default limit
      end
    end
  end

end