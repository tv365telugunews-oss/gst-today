export function getUser() {
  return localStorage.getItem('adminUser') || ''
}

export function setUser(u) {
  if (u) localStorage.setItem('adminUser', u)
  else localStorage.removeItem('adminUser')
}

export function getRole() {
  return localStorage.getItem('adminRole') || 'editor'
}

export function setRole(r) {
  if (r) localStorage.setItem('adminRole', r)
  else localStorage.removeItem('adminRole')
}

export default { getUser, setUser, getRole, setRole }
