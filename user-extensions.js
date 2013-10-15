var manager = new RollupManager();

/*
 *  Enable a Drupal module
 */

manager.addRollupRule({
  name:        'enable_module',
  description: 'enable a Drupal module',
  pre:         'logged in as admin, module exists',
  post:        'module is enabled',
  args: [
    {
      name:          'base_url',
      description:   'the base URL of the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    {
      name: 'module',
      description: 'name of module',
      exampleValues: [
        'webauth',
        'views',
      ]
    },
  ],

  commandMatchers: [
  ],

  getExpandedCommands: function(args) {

    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/admin/build/modules',
    });

    commands.push({
      command: 'check',
      target:  'id=edit-status-' + args.module,
    });

    commands.push({
      command: 'clickAndWait',
      target:  'id=edit-submit',
    });

    commands.push({
      command: 'verifyValue',
      target:  'id=edit-status-' + args.module,
      value:   'on',
    });

    return commands;
  },

});

/*
 *  Disable a Drupal module
 */

manager.addRollupRule({
  name:        'disable_module',
  description: 'disable a Drupal module',
  pre:         'none',
  post:        'module is disabled',
  args: [
    {
      name:          'base_url',
      description:   'the base URL of the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    {
      name: 'module',
      description: 'name of module',
      exampleValues: [
        'webauth',
        'views',
      ]
    },
  ],

  commandMatchers: [
  ],

  getExpandedCommands: function(args) {

    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/admin/build/modules',
    });

    commands.push({
      command: 'uncheck',
      target:  'id=edit-status-' + args.module,
    });

    commands.push({
      command: 'clickAndWait',
      target:  'id=edit-submit',
    });

    commands.push({
      command: 'verifyText',
      target:  'css=div.messages.status',
      value:   'The configuration options have been saved.',
    });

    return commands;
  },

});

/*
 *  Uninstall a Drupal module
 */

manager.addRollupRule({
  name:        'uninstall_module',
  description: 'uninstall a Drupal module',
  pre:         'none',
  post:        'module is uninstalled',
  args: [
    {
      name:          'base_url',
      description:   'the base URL of the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    {
      name: 'module',
      description: 'name of module',
      exampleValues: [
        'webauth',
        'views',
      ]
    },
  ],

  commandMatchers: [
  ],

  getExpandedCommands: function(args) {

    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/admin/build/modules/uninstall',
    });

    commands.push({
      command: 'check',
      target:  'id=edit-uninstall-' + args.module,
    });

    commands.push({
      command: 'clickAndWait',
      target:  'id=edit-submit',
    });


    commands.push({
      command: 'clickAndWait',
      target:  'id=edit-submit',
    });

    commands.push({
      command: 'verifyText',
      target:  'css=div.messages.status',
      value:   'The selected modules have been uninstalled.',
    });

    return commands;
  },

});

/*
 *  Logs in a local Drupal user, often used to log in the admin
 */

manager.addRollupRule({
  name: 'local_user_login',
  description: 'log a use into a Drupal site using Drupal accounts',
  pre:         'none',
  post:        'user is logged in',
  args: [
    {
      name:        'base_url',
      description: 'the base URL for the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    { 
      name:        'username',
      description: 'local username account',
    },
    {
      name:        'password',
      description: 'local user password',
    }
  ],
  commandMatchers: [
  ],

  getExpandedCommands: function(args) {
    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/logout',
    });

    commands.push({
      command: 'open',
      target:  args.base_url + '/user/login',
    });

    commands.push({
      command: 'type',
      target:  'id=edit-name',
      value:   args.username,
    });

    commands.push({
      command: 'type',
      target:  'id=edit-pass',
      value:   args.password,
    });

    commands.push({
      command: 'clickAndWait',
      target:  'id=edit-submit',
    });

    return commands;
  },
});

/*
 *  Add a workgroup to role mapping using the Drupal
 *  WebAuth module.
 *
 */

manager.addRollupRule({
  name: 'webauth_add_mapping',
  description: 'add a workgroup to role mapping',
  pre:         'role must exist',
  post:        'new workgroup is created',
  args: [
    {
      name:        'base_url',
      description: 'the base URL for the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    { 
      name:        'role',
      description: 'local Drupal role',
      exampleValues: [
        'Stanford Staff',
        'SUNet User',
        'administrator',
      ]
    },
    {
      name:        'workgroup',
      description: 'Workgroup Name',
      exampleValues: [
        'stanford:staff',
        'stanford:stanford',
      ]
    }
  ],
  commandMatchers: [
  ],

  getExpandedCommands: function(args) {
    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/admin/settings/webauth/mappings',
    });

    commands.push({
      command: 'select',
      target:  'name=new_rid',
      value:   'label=' + args.role,
    });

    commands.push({
      command: 'type',
      target:  'name=new_group',
      value:    args.workgroup,
    })

    commands.push({
      command: 'clickAndWait',
      target:  'name=new_submit',
    });

    return commands;
  },
});

/*
 *  Very that a user has a particular role
 */

manager.addRollupRule({
  name: 'drupal_verify_user_role',
  description: 'check the role for a user',
  pre:         'none',
  post:        'none',
  args: [
    {
      name:        'base_url',
      description: 'the base URL for the site',
      exampleValues: [
        'https://www.example.com/drupal',
        '${base_url}/${base_dir}',
      ]
    },
    {
      name:        'sunetid',
      description: 'the sunetid of the user',
      exampleValues: [
        'mrmarco',
        'johndoe',
      ]
    },
    { 
      name:        'roleid',
      description: 'local Drupal role ID',
      exampleValues: [ '9', '3', ]
    },
    {
      name:        'status',
      description: 'status of role, on or off',
    },
  ],
  commandMatchers: [
  ],

  getExpandedCommands: function(args) {
    var commands = [];

    commands.push({
      command: 'open',
      target:  args.base_url + '/admin/user/user',
    });

    commands.push({
      command: 'clickAndWait',
      target:  'link=' + args.sunetid,
    });

    commands.push({
      command: 'clickAndWait',
      target:  'link=Edit',
    });

    commands.push({
      command: 'verifyValue',
      target:  'id=edit-roles-' + args.roleid,
      value:   args.status,
    })

    return commands;
  },
});