const wlbList = `select c.id, c.name, c.tax_num, AVG(a.rate) as rate, count(a.id) as count, max(a.updated_time) as time
  from wlb_work_record as a
  left join wlb_job_resume as b on b.id = a.job_resume_id
  left join wlb_company as c on c.id = b.company_id
  where a.status = 1 and b.status = 1 and c.status = 1 and (c.name like "%"?"%" or c.tax_num like "%"?"%")
  group by c.id`

const getCompanyInfoByCompanyId = `select c.id, c.name, c.tax_num, AVG(a.rate) as rate, count(a.id) as count, max(a.updated_time) as time
  from wlb_work_record as a
  left join wlb_job_resume as b on b.id = a.job_resume_id
  left join wlb_company as c on c.id = b.company_id
  where a.status = 1 and b.status = 1 and c.status = 1 and c.id = ?
  group by c.id`

const getCommentListByCompanyId = `select a.id, a.job_resume_id, a.company_record, a.attendance_record, a.department_record, b.department, a.leader_record, a.attendance_record, a.salary_record, a.extra_record, a.rate, (case a.anonymous when 0 then '匿名' else d.nick_name end) user_name, d.avatar
  from wlb_work_record as a
  left join wlb_job_resume as b on b.id = a.job_resume_id
  left join wlb_company as c on c.id = b.company_id
  left join sys_user as d on d.id = b.user_id
  where a.status = 1 and b.status = 1 and c.status = 1 and c.id = ?
  order by a.updated_time desc`

const wlbTotal = `select COUNT(*) as total
  from wlb_work_record as a
  left join wlb_job_resume as b on b.id = a.job_resume_id
  left join wlb_company as c on c.id = b.company_id
  where a.status = 1 and b.status = 1 and c.status = 1`

// const myList = `select a.id, c.name, b.department, a.company_record, a.department_record, a.attendance_record, a.leader_record, a.extra_record, a.rate, (case a.anonymous when 1 then '' else d.nick_name end) as user_name
// from wlb_work_record as a
// left join wlb_job_resume as b on b.id = a.job_resume_id
// left join wlb_company as c on c.id = b.company_id
// left join sys_user as d on b.user_id = d.id
// where a.status = 1 and b.status = 1 and c.status = 1 and d.status = 1  `
//
const myListSql = `select a.id, a.job_resume_id, c.name, b.department, a.company_record, a.department_record, a.salary_record, a.attendance_record, a.leader_record, a.extra_record, a.rate, a.anonymous
from wlb_work_record as a
left join wlb_job_resume as b on b.id = a.job_resume_id
left join wlb_company as c on c.id = b.company_id
where a.status = 1 and b.status = 1 and c.status = 1 and b.user_id = ?`

const insertwlb = `insert into wlb_work_record (
  id, job_resume_id, company_record,
  department_record, leader_record, attendance_record,
  salary_record, extra_record, rate,
  anonymous, status, created_by,
  created_time) VALUES
  (?,?,?,?,?,?,?,?,?,?,?,?,now())`

const updatewlb = `update wlb_work_record
  set company_record = ?, department_record = ?,
  leader_record = ?, attendance_record = ?,
  salary_record = ?, extra_record = ?,
  rate = ?, anonymous = ?, updated_by = ?,
  updated_time = now() where id = ?`

const delwlb = `update wlb_work_record set status = 0 where id = ?`

module.exports = {
  wlbList,
  wlbTotal,
  myListSql,
  insertwlb,
  updatewlb,
  delwlb,
  getCompanyInfoByCompanyId,
  getCommentListByCompanyId
}
