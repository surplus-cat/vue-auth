import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/role.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel)

const getRoles = async function () {
  const rolelist = await Todolist.findAll({ // 查找全部的todolist,
    attributes: ['id', 'name', 'auth'] // 只需返回这三个字段的结果即可
  })

  return rolelist // 返回数据
}

const getRoleById = async function (id) {
  const role = await Todolist.findAll({ // 查找全部的todolist
    where: {
      id: id
    },
    attributes: ['id', 'name', 'auth'] // 只需返回这三个字段的结果即可
  })

  return role // 返回数据
}

const createRole = async function (data) {
  await Todolist.create({
    name: data.name,
    auth: data.auth
  })
  return true
}

const removeRole = async function (id) {
  const result = await Todolist.destroy({
    where: {
      id
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateRole = async function (id, auth) {
  const result = await Todolist.update(
    {
      auth
    },
    {
      where: {
        id
      }
    }
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
  getRoles,
  getRoleById,
  createRole,
  removeRole,
  updateRole
}
