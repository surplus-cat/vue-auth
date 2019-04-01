import role from '../models/role.js'

const getRoles = async function (ctx) {
  const result = await role.getRoles() // 通过await “同步”地返回查询结果
  ctx.body = {
    success: true,
    result // 将请求的结果放到response的body里返回
  }
}

const getRoleById = async function (ctx) {
  const id = ctx.params.id
  const result = await role.getRoleById(id) // 通过await “同步”地返回查询结果
  ctx.body = {
    success: true,
    result // 将请求的结果放到response的body里返回
  }
}

const createRole = async function (ctx) {
  const data = ctx.request.body
  const success = await role.createRole(data)
  ctx.body = {
    success
  }
}

const removeRole = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  const success = await role.removeRole(id, userId)

  ctx.body = {
    success
  }
}

const updateRole = async function (ctx) {
  const id = ctx.params.id
  let auth = ctx.params.auth

  const success = await role.updateRole(id, auth)

  ctx.body = {
    success
  }
}

export default {
  getRoles,
  getRoleById,
  createRole,
  removeRole,
  updateRole
}
