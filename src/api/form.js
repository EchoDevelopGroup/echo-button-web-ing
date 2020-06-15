/**
 * 把输入对象包装成FormData
 * @param {object} input 输入对象
 */
export function objectToFormData(input) {
  const form = new FormData()
  for (const k in input) {
    const v = input[k]
    if (v instanceof File) {
      form.append(k, v, v.name)
    } else {
      form.append(k, v)
    }
  }
  return form
}
