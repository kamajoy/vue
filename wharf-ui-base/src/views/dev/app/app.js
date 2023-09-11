// 计算版本对应的hash
export function versionHash(version) {
  if (!version) {
    return null
  }
  return version.tag || version.commit_id
}

// 计算版本差异
export function versionIsDiff(version, another) {
  for (const key of ['branch', 'tag', 'commit_id']) {
    if (version[key] != another[key]) {
      return true
    }
  }
  return false
}
