const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User')

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true,
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: Types.Number,
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true,
  },
},
'Permissions',
  {
    isAdmin: {
      type: Boolean,
      label: 'Can access Keystone',
      index: true,
    },
  }
)

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(
  function canAccessKeystone() {
    return this.isAdmin
  }
)


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin'
User.register()

module.exports = User
