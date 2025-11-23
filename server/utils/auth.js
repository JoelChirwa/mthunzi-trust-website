export function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem('mthunzi_admin') === '1'
  } catch (e) {
    return false
  }
}

export function setAdminAuthenticated(val = true) {
  try {
    if (val) sessionStorage.setItem('mthunzi_admin', '1')
    else sessionStorage.removeItem('mthunzi_admin')
  } catch (e) {}
}

export function logoutAdmin() {
  try { sessionStorage.removeItem('mthunzi_admin') } catch (e) {}
}
