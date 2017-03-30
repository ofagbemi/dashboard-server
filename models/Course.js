const keystone = require('keystone')


const Types = keystone.Field.Types

const Course = new keystone.List('Course')

Course.add({
  title: {
    type: String,
    initial: true,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    initial: true,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    initial: true,
    required: true,
    default: Date.now,
  },
  students: {
    type: Types.Relationship,
    ref: 'User',
    many: true,
  },
  instructors: {
    type: Types.Relationship,
    ref: 'User',
    many: true,
  },
})

Course.register()
