const jobResumeSql = 'select * from wlb_job_resume where user_id = ? and status = 1'
const company = 'select * from wlb_company where status = 1'
const saveCompany = 'insert into wlb_company (id, name, tax_num, status, created_by, created_time) values (?,?,?,1,?,now())'
const saveJobResumeSql = 'insert into wlb_job_resume (id, company_id, department, start_time, end_time, status, created_by, user_id, created_time) VALUES (?,?,?,?,?,1,?,?,now())'
const editJobResumeSql = 'update wlb_job_resume set department = ?, start_time = ?, end_time = ?, updated_by = ?, updated_time = now() where id = ?'
const delJobResumeSql = 'update wlb_job_resume set status = 0, updated_by = ?, updated_time = now() where id = ?'

module.exports = {
  jobResumeSql,
  company,
  saveCompany,
  saveJobResumeSql,
  editJobResumeSql,
  delJobResumeSql
}
